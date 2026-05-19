"use client";

import { motion } from "framer-motion";
import { resolveActiveMenuUrl, siteConfig } from "@/lib/site-config";
import { track } from "@/lib/analytics";
import { Car, Smartphone, CheckSquare, PhoneCall, ExternalLink, Sparkles } from "lucide-react";

export default function CurbsideSection() {
  const handleStartCurbside = () => {
    track("curbside_start_order_click");
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpenFullMenu = () => {
    const url = resolveActiveMenuUrl(siteConfig);
    if (!url) {
      track("menu_route_unavailable", { source: "curbside", provider: siteConfig.activeMenuProvider });
      return;
    }
    track("curbside_open_full_menu_click", { provider: siteConfig.activeMenuProvider, url });
    window.open(url, "_blank");
  };

  const handleCallStore = () => {
    track("curbside_call_store_click", { phone: siteConfig.phone });
    window.open(`tel:${siteConfig.phone.replace(/\s+/g, "")}`, "_self");
  };

  const steps = [
    {
      step: "1",
      icon: CheckSquare,
      title: "Build your order",
      copy: "Choose items from the live menu preview below and enter your medical intake details.",
    },
    {
      step: "2",
      icon: Smartphone,
      title: "Get confirmation",
      copy: "Our dispensary staff confirms stock, applies batch discounts, and sends curbside spot instructions.",
    },
    {
      step: "3",
      icon: Car,
      title: "Curbside handoff",
      copy: "Pull up, show your OMMA patient card and photo ID, and stay comfortable in your car while we load.",
    },
  ];

  return (
    <section id="curbside" className="border-t border-purple-950/20 bg-[#05010a] py-24 scroll-mt-20 relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-8 flex flex-col gap-16">
        
        {/* Curbside Info Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Car size={16} className="text-purple-400" />
              <span className="mono-label text-purple-400 tracking-[0.3em] uppercase font-mono">Curbside Pickup System</span>
            </div>
            <h2 className="boutique-title text-4xl sm:text-5xl md:text-6xl uppercase font-black tracking-tighter text-white">
              Order ahead. Pull up. Stay in the car.
            </h2>
          </div>
          
          <div className="flex flex-col gap-4 border-l border-purple-900/40 pl-6 lg:pl-10">
            <span className="mono-label text-yellow-500 text-[9px] uppercase tracking-widest flex items-center gap-1.5 font-mono">
              <Sparkles size={12} className="text-yellow-400" />
              PREMIUM SERVICE STANDARD
            </span>
            <p className="text-purple-200/60 text-xs font-light leading-relaxed max-w-lg">
              Your time is valuable. Our curbside fulfillment system is designed to get you verified and on your way quickly without making pickup feel complicated.
            </p>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-purple-900/20 border border-purple-900/20">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="bg-[#0c0517] p-8 min-h-52 flex flex-col justify-between group hover:bg-purple-950/20 transition-all duration-300">
                <div className="flex justify-between items-start">
                  <span className="mono-label text-purple-300/40 !text-[8px] uppercase tracking-wider font-mono">
                    Step {item.step}
                  </span>
                  <Icon size={16} className="text-purple-400/40 group-hover:text-yellow-400 transition-colors" />
                </div>
                <div className="flex flex-col gap-2 mt-8">
                  <h3 className="boutique-title text-2xl font-black text-white uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-purple-200/50 leading-relaxed font-light">
                    {item.copy}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Group */}
        <div className="flex flex-wrap gap-4 border border-purple-900/20 p-6 bg-purple-950/10 rounded-sm justify-between items-center">
          <div className="flex flex-col gap-1">
            <span className="mono-label text-white font-bold text-[9px] uppercase tracking-widest font-mono">Ready to Order?</span>
            <span className="text-[10px] text-purple-300/50 font-mono uppercase">Secure your medical selection immediately on Gore Blvd.</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleStartCurbside}
              className="mono-label border border-yellow-400 bg-yellow-500 text-black hover:bg-transparent hover:text-yellow-400 transition-all font-black text-[9px] cursor-pointer uppercase"
            >
              Start Curbside Order
            </button>
            <button
              onClick={handleOpenFullMenu}
              disabled={!resolveActiveMenuUrl(siteConfig)}
              className="mono-label border border-purple-800/30 py-3.5 px-6 text-purple-200 hover:border-yellow-400 hover:bg-purple-950/20 transition-all font-black text-[9px] cursor-pointer uppercase flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Open Full Menu <ExternalLink size={10} />
            </button>
            <button
              onClick={handleCallStore}
              className="mono-label border border-purple-800/30 py-3.5 px-6 text-purple-300/60 hover:text-white hover:bg-purple-950/20 transition-all font-black text-[9px] cursor-pointer uppercase flex items-center gap-2"
            >
              Call Store <PhoneCall size={10} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
