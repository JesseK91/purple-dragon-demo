"use client";

import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { clearTrackedEvents, getTrackedEvents, TrackedEvent } from "@/lib/analytics";
import { Download, ExternalLink, Mail, MessageSquare, MousePointerClick, Phone, ShieldCheck, Star } from "lucide-react";

type StoredLead = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  categories?: string[];
  timestamp?: string;
  license?: string;
};

function readStoredLeads(): StoredLead[] {
  try {
    const raw = localStorage.getItem("purple_dragon_leads_list");
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredLead[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function toCsv(leads: StoredLead[]): string {
  const header = ["name", "phone", "email", "sms_opt_in", "interest_tags", "timestamp"];
  const rows = leads.map((lead) => [
    lead.name ?? "",
    lead.phone ?? "",
    lead.email ?? "",
    lead.license === "SMS-OPT-IN" ? "true" : "false",
    (lead.categories ?? []).join("|"),
    lead.timestamp ?? "",
  ]);
  return [header, ...rows]
    .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
    .join("\n");
}

export default function OwnerDashboard() {
  const [events, setEvents] = useState<TrackedEvent[]>([]);
  const [leads, setLeads] = useState<StoredLead[]>([]);
  const [remoteMetrics, setRemoteMetrics] = useState<{
    event_counts?: Record<string, number>;
    lead_captures?: number;
    email_opt_ins?: number;
    sms_ready?: number;
  } | null>(null);

  const refresh = () => {
    setEvents(getTrackedEvents());
    setLeads(readStoredLeads());
  };

  const refreshRemote = async () => {
    try {
      const response = await fetch("/api/owner-metrics", { cache: "no-store" });
      if (!response.ok) return;
      const data = await response.json();
      setRemoteMetrics(data);
    } catch {
      // Keep local fallback.
    }
  };

  useEffect(() => {
    refresh();
    void refreshRemote();
    const onAnalytics = () => {
      refresh();
      void refreshRemote();
    };
    const onStorage = () => refresh();
    window.addEventListener("new-analytics-event", onAnalytics);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("new-analytics-event", onAnalytics);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const metrics = useMemo(() => {
    const count = (name: string) =>
      Number(remoteMetrics?.event_counts?.[name] ?? events.filter((e) => e.eventName === name).length);
    const countPartial = (name: string) => {
      if (remoteMetrics?.event_counts) {
        return Object.entries(remoteMetrics.event_counts).reduce((acc, [eventName, value]) => {
          return eventName.toLowerCase().includes(name.toLowerCase()) ? acc + value : acc;
        }, 0);
      }
      return events.filter((e) => e.eventName.toLowerCase().includes(name.toLowerCase())).length;
    };
    const emailOptIns = leads.filter((lead) => Boolean(lead.email)).length;
    const smsReady = leads.filter((lead) => lead.license === "SMS-OPT-IN" && Boolean(lead.phone)).length;
    return {
      menuClicks: countPartial("menu_click") + countPartial("menu_tap"),
      phoneTaps: countPartial("phone_click") + countPartial("phone_tap"),
      reviewClicks: count("google_review_click"),
      privateFeedback: count("private_feedback_submit"),
      leadCaptures: Number(remoteMetrics?.lead_captures ?? leads.length),
      emailOptIns: Number(remoteMetrics?.email_opt_ins ?? emailOptIns),
      smsReady: Number(remoteMetrics?.sms_ready ?? smsReady),
    };
  }, [events, leads, remoteMetrics]);

  const downloadCsv = () => {
    const csv = toCsv(leads);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "purple-dragon-alert-audience.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-background text-foreground p-8 md:p-12 pb-24">
      <div className="max-w-[1600px] mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-950/20 pb-6">
          <div>
            <p className="mono-label text-purple-400/40 text-[9px] uppercase tracking-[0.2em]">Owner Proof Layer</p>
            <h1 className="boutique-title text-4xl uppercase font-black tracking-tight text-purple-200">{siteConfig.storeName} Capture Dashboard</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={downloadCsv}
              className="mono-label border border-purple-850 px-4 py-2 text-[9px] uppercase flex items-center gap-2 hover:bg-yellow-500 hover:text-black hover:border-yellow-400 transition-all cursor-pointer text-purple-200"
            >
              <Download size={12} />
              Export Audience CSV
            </button>
            <button
              onClick={() => window.open("/", "_self")}
              className="mono-label border border-purple-850 px-4 py-2 text-[9px] uppercase flex items-center gap-2 hover:bg-yellow-500 hover:text-black hover:border-yellow-400 transition-all cursor-pointer text-purple-200"
            >
              <ExternalLink size={12} />
              Open Storefront
            </button>
            <button
              onClick={() => {
                clearTrackedEvents();
                localStorage.removeItem("purple_dragon_leads_list");
                refresh();
              }}
              className="mono-label border border-red-500/30 text-red-300 px-4 py-2 text-[9px] uppercase hover:bg-red-500/10 transition-all cursor-pointer"
            >
              Reset Demo Data
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {[
            { label: "Menu Clicks", value: metrics.menuClicks, icon: MousePointerClick },
            { label: "Phone Taps", value: metrics.phoneTaps, icon: Phone },
            { label: "Review Clicks", value: metrics.reviewClicks, icon: Star },
            { label: "Private Feedback", value: metrics.privateFeedback, icon: ShieldCheck },
            { label: "Lead Captures", value: metrics.leadCaptures, icon: MessageSquare },
            { label: "Email Opt-Ins", value: metrics.emailOptIns, icon: Mail },
            { label: "SMS-Ready", value: metrics.smsReady, icon: MessageSquare },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="bg-[#0d071a]/40 border border-purple-900/30 p-4">
                <div className="flex items-center justify-between text-purple-300/40">
                  <span className="mono-label text-[8px] uppercase">{item.label}</span>
                  <Icon size={12} className="text-purple-400" />
                </div>
                <p className="text-3xl font-black mt-3 text-white">{item.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="border border-purple-900/30 bg-[#090312] p-6">
            <h2 className="boutique-title text-2xl uppercase font-black text-white">SMS-Ready Audience</h2>
            <p className="text-purple-200/60 text-xs mt-2 font-mono">
              This dashboard captures consent and interests. It does not send cannabis SMS directly. Use export to sync with an approved provider.
            </p>
            <div className="mt-5 flex flex-col gap-3 max-h-[420px] overflow-y-auto">
              {leads.length === 0 && (
                <p className="text-purple-300/40 text-xs font-mono border border-purple-900/30 p-4 bg-[#05010a]">No captured contacts in this browser session yet.</p>
              )}
              {leads.map((lead) => (
                <div key={lead.id} className="border border-purple-900/30 p-3 bg-[#05010a]">
                  <p className="text-sm font-bold text-white">{lead.name}</p>
                  <p className="text-[10px] text-purple-300/60 font-mono">{lead.phone || "No phone"} | {lead.email || "No email"}</p>
                  <p className="text-[10px] text-purple-300/60 font-mono">
                    {lead.license === "SMS-OPT-IN" ? "SMS-READY" : "EMAIL-ONLY"} | {(lead.categories ?? []).join(", ") || "No tags"}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="border border-purple-900/30 bg-[#090312] p-6">
            <h2 className="boutique-title text-2xl uppercase font-black text-white">Recent Events</h2>
            <p className="text-purple-200/60 text-xs mt-2 font-mono">
              Event log from the storefront tracking layer. These are owner-facing proof metrics, not vanity traffic.
            </p>
            <div className="mt-5 flex flex-col gap-3 max-h-[420px] overflow-y-auto">
              {events.length === 0 && (
                <p className="text-purple-300/40 text-xs font-mono border border-purple-900/30 p-4 bg-[#05010a]">No storefront events captured yet.</p>
              )}
              {events
                .slice()
                .reverse()
                .map((event, idx) => (
                  <div key={`${event.timestamp}-${idx}`} className="border border-purple-900/30 p-3 bg-[#05010a]">
                    <p className="text-[10px] font-mono uppercase text-purple-200/70">{event.eventName}</p>
                    <p className="text-[10px] font-mono text-purple-300/40">{new Date(event.timestamp).toLocaleString()}</p>
                  </div>
                ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
