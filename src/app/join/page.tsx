"use client";

import Navbar from "@/components/Navbar";
import TextSignupForm from "@/components/TextSignupForm";
import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { Bell, Smartphone, Award } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function JoinTextClubPage() {
  
  useEffect(() => {
    // Detect QR campaign parameters (e.g. ?src=qr_counter)
    const params = new URLSearchParams(window.location.search);
    const qrSource = params.get("src");
    if (qrSource) {
      track("qr_scan_source", { source: qrSource });
    }
  }, []);

  return (
    <main className="min-h-screen bg-background relative text-foreground">
      <Navbar cartCount={0} onOpenCart={() => {}} />

      {/* Main Focus Container */}
      <section className="pt-32 pb-24 px-6 max-w-[1200px] mx-auto min-h-screen flex flex-col justify-center items-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-950/5 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center w-full relative z-10 max-w-5xl">
          
          {/* Brand Left Column */}
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <Award size={12} className="text-yellow-400" />
              <span className="mono-label text-purple-300/60 !text-[8.5px]">Deal Alerts</span>
            </div>

            <h1 className="boutique-title text-4xl md:text-5xl uppercase font-black tracking-tighter text-white leading-none">
              Get Deals & Fresh Drops
            </h1>
            
            <p className="text-purple-200/60 text-xs sm:text-sm font-light leading-relaxed max-w-md mx-auto lg:mx-0 font-mono">
              This is the quick signup page for people scanning a counter card, receipt, or QR code. Use email or optionally opt into text alerts, then pick the categories you care about.
            </p>

            <div className="h-[1px] w-full bg-purple-900/20 my-2" />

            <div className="flex flex-col gap-3 items-center lg:items-start">
              <div className="flex items-center gap-3">
                <Smartphone size={14} className="text-purple-400" />
                <span className="mono-label text-purple-200 font-bold text-[9px] tracking-wider font-mono">Deals, drops, and reminders</span>
              </div>
              <div className="flex items-center gap-3">
                <Bell size={14} className="text-purple-400" />
                <span className="mono-label text-purple-200 font-bold text-[9px] tracking-wider font-mono">SMS is optional</span>
              </div>
            </div>
          </div>

          {/* Form Right Column */}
          <div className="border border-purple-900/30 bg-[#0d071a]/40 shadow-2xl p-2">
            <TextSignupForm
              sourceTag="source_qr_join_page"
              defaultInterest="Fresh Drops"
              primaryCtaText="Save Alert Preferences"
            />
          </div>

        </div>
      </section>

      {/* Compliance Notice */}
      <footer className="py-12 border-t border-purple-950/20 bg-[#05010a]">
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <p className="text-[9px] text-purple-300/30 leading-relaxed font-mono">
            {siteConfig.storeName} serves licensed Oklahoma medical marijuana patients. Email alerts do not require SMS consent. Text alerts are optional and require consent. OMMA patient license and photo ID are required for purchases.
          </p>
        </div>
      </footer>
    </main>
  );
}
