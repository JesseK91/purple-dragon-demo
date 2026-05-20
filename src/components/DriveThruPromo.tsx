"use client";

import { Car, GlassWater, Landmark, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { track } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

export default function DriveThruPromo() {
  const handleVibeClick = () => {
    track("drive_thru_section_click");
    const el = document.getElementById("menu");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 px-8 bg-background border-t border-purple-950/20 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-purple-950/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row items-stretch gap-12">
        {/* Pitch Content */}
        <div className="flex-1 flex flex-col justify-center gap-6">
          <div className="flex items-center gap-3">
            <Sparkles size={16} className="text-yellow-400" />
            <span className="mono-label tracking-[0.3em] uppercase text-purple-400">
              QUICK PICKUP
            </span>
          </div>

          <h2 className="boutique-title text-4xl sm:text-5xl xl:text-6xl font-black text-white uppercase tracking-tight leading-none">
            CURBSIDE PICKUP & <br />
            <span className="text-yellow-400">FAST CHECKOUT</span>
          </h2>

          <p className="text-purple-100/90 text-sm font-light leading-relaxed max-w-xl">
            We do things differently at {siteConfig.storeName}. Skip the wait with curbside pickup, or step inside to browse the front head shop, ATM, and the live menu before you place your order.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 border border-purple-900/40 flex items-center justify-center bg-purple-950/40 text-yellow-400 shrink-0 rounded-sm">
                <Car size={20} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-sm tracking-tight text-white uppercase font-display">Curbside Pickup</span>
                <span className="text-[11px] text-purple-200/80 leading-relaxed font-mono uppercase">Quick pickup for pre-orders and live menu items</span>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 border border-purple-900/40 flex items-center justify-center bg-purple-950/40 text-yellow-400 shrink-0 rounded-sm">
                <GlassWater size={20} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-sm tracking-tight text-white uppercase font-display">Head Shop Access</span>
                <span className="text-[11px] text-purple-200/80 leading-relaxed font-mono uppercase">Papers, accessories, rigs, and store merch</span>
              </div>
            </div>

            <div className="flex gap-4 items-start col-span-1 sm:col-span-2">
              <div className="w-12 h-12 border border-purple-900/40 flex items-center justify-center bg-purple-950/40 text-yellow-400 shrink-0 rounded-sm">
                <Landmark size={20} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-sm tracking-tight text-white uppercase font-display">ATM on Premises</span>
                <span className="text-[11px] text-purple-200/80 leading-relaxed font-mono uppercase">Secure cash access inside the store for quick checkout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Callout Box */}
        <div className="lg:w-2/5 flex flex-col justify-between border border-purple-900/20 bg-background/90 p-8 md:p-12 relative overflow-hidden rounded-sm shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 right-0 w-28 h-24 border-b border-l border-purple-900/20 bg-purple-950/20 flex items-center justify-center text-yellow-400 font-mono text-[9px] uppercase tracking-widest">
            FAST PASS
          </div>

          <div className="flex flex-col gap-4 mt-8 lg:mt-16">
            <span className="mono-label text-[9px] text-purple-400 font-mono">ORDER AHEAD BENEFITS</span>
            <h3 className="boutique-title text-2xl font-black text-white uppercase tracking-tight leading-tight">
              Order Online, Pick Up in Seconds
            </h3>
            <p className="text-[11px] text-purple-200/80 leading-normal font-mono uppercase">
              Submit your curbside pre-order via the live menu below. We will package your selection, then verify your OMMA patient card and photo ID at pickup.
            </p>
          </div>

          <div className="mt-8 lg:mt-16 pt-6 border-t border-purple-900/20">
            <button
              onClick={handleVibeClick}
              className="mono-label border border-yellow-400/40 hover:border-yellow-400 py-3.5 px-6 bg-yellow-500/5 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all font-black text-[9px] cursor-pointer uppercase w-full text-center"
            >
              Shop Featured Menu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
