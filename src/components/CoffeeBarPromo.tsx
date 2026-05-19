"use client";

import { Coffee, CupSoda, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { track } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

export default function CoffeeBarPromo() {
  const handleVibeClick = () => {
    track("coffee_bar_vibe_click");
    window.open(siteConfig.googleMapsUrl, "_blank");
  };

  return (
    <section className="py-24 px-8 bg-[#090312] border-t border-purple-950/20 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row items-stretch gap-12">
        {/* Pitch Content */}
        <div className="flex-1 flex flex-col justify-center gap-6">
          <div className="flex items-center gap-3">
            <Sparkles size={16} className="text-yellow-400" />
            <span className="mono-label tracking-[0.3em] uppercase text-purple-300 font-mono">
              Patient First Experience
            </span>
          </div>

          <h2 className="boutique-title text-4xl sm:text-5xl xl:text-6xl font-black text-white uppercase tracking-tight leading-none">
            Complimentary <br />
            <span className="text-yellow-400">Coffee Bar</span> & Lounge
          </h2>

          <p className="text-purple-200/60 text-sm font-light leading-relaxed max-w-xl">
            At {siteConfig.storeName}, we believe the wait should be as enjoyable as the menu. The lobby features a complimentary coffee bar, fresh refreshments, and a comfortable seating lounge for local Lawton patients.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 border border-purple-800/30 flex items-center justify-center bg-purple-950/30 text-yellow-400 shrink-0">
                <Coffee size={18} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-sm tracking-tight text-white uppercase font-display">Espresso & Coffee</span>
                <span className="text-[11px] text-purple-300/50 leading-relaxed font-mono uppercase">Free coffee bar for patients</span>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 border border-purple-800/30 flex items-center justify-center bg-purple-950/30 text-yellow-400 shrink-0">
                <CupSoda size={18} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-sm tracking-tight text-white uppercase font-display">Cold Refreshments</span>
                <span className="text-[11px] text-purple-300/50 leading-relaxed font-mono uppercase">Water, sodas, and tea selections</span>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 border border-purple-800/30 flex items-center justify-center bg-purple-950/30 text-yellow-400 shrink-0">
                <Users size={18} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-sm tracking-tight text-white uppercase font-display">Comfortable Lounge</span>
                <span className="text-[11px] text-purple-300/50 leading-relaxed font-mono uppercase">Spacious waiting area with ATM access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Callout Box */}
        <div className="lg:w-2/5 flex flex-col justify-between border border-purple-900/30 bg-[#0d071a]/80 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 border-b border-l border-purple-900/30 bg-purple-950/20 flex items-center justify-center text-yellow-400 font-mono text-[9px] uppercase tracking-widest">
            Amenities
          </div>

          <div className="flex flex-col gap-4 mt-8 lg:mt-16">
            <span className="mono-label text-[9px] text-purple-400 font-mono">Gore Blvd Store Amenities</span>
            <h3 className="boutique-title text-2xl font-black text-white uppercase tracking-tight leading-tight">
              A Higher Standard of Service
            </h3>
            <p className="text-[11px] text-purple-300/60 leading-normal font-mono uppercase">
              No rushed transactions. Relax, grab a fresh cup of coffee, check out the attached head shop selection, and chat with our experienced budtenders. We do things local.
            </p>
          </div>

          <div className="mt-8 lg:mt-16 pt-6 border-t border-purple-950/30">
            <button
              onClick={handleVibeClick}
              className="mono-label border border-yellow-400/30 hover:border-yellow-400 py-3.5 px-6 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all font-black text-[9px] cursor-pointer uppercase w-full text-center"
            >
              Get Directions to Store
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
