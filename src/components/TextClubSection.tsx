"use client";

import TextSignupForm from "@/components/TextSignupForm";
import { MessageSquare, Sparkles } from "lucide-react";

export default function TextClubSection() {
  return (
    <section id="text-club" className="py-24 px-8 bg-background border-t border-purple-950/20 scroll-mt-20 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-start">
        <div className="flex flex-col gap-8 max-w-xl">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <MessageSquare size={16} className="text-purple-400" />
              <span className="mono-label text-purple-400 tracking-[0.3em] uppercase font-mono">Deal Alerts</span>
            </div>
            <h2 className="boutique-title text-4xl sm:text-5xl md:text-6xl uppercase font-black text-white leading-tight">
              Join Alert Preferences
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-purple-100/90 text-sm font-light leading-relaxed">
              Join by email or optionally opt in to text alerts. Receive exclusive updates, priority restock alerts, and daily special announcements directly to your device.
            </p>
            <p className="text-purple-200/80 text-xs font-light leading-relaxed">
              Stay connected with our latest menu updates. Be the first to know when we restock your favorite flower strains, concentrates, and fresh local drops.
            </p>
          </div>

          <div className="flex flex-col gap-4 border-l border-purple-900/30 pl-6 mt-2">
            <span className="mono-label text-yellow-500 text-[9px] uppercase tracking-wider flex items-center gap-2 font-mono">
              <Sparkles size={12} className="text-yellow-400" />
              VIP DISPENSARY ALERTS
            </span>
            <p className="text-[11px] text-purple-200/80 leading-relaxed font-mono uppercase">
              Get notifications sent directly to your phone or email. You can customize your preferences or opt out at any time.
            </p>
          </div>
        </div>

        <TextSignupForm
          sourceTag="source_home_text_club"
          defaultInterest="Fresh Drops"
          primaryCtaText="Save Alert Preferences"
        />
      </div>
    </section>
  );
}
