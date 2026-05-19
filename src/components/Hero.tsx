"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { resolveActiveMenuUrl, siteConfig } from "@/lib/site-config";
import { track } from "@/lib/analytics";

export default function Hero() {
  const handleShopMenu = () => {
    const url = resolveActiveMenuUrl(siteConfig);
    if (!url) {
      track("menu_route_unavailable", { source: "hero", provider: siteConfig.activeMenuProvider });
      return;
    }
    track("hero_shop_full_menu_click", { provider: siteConfig.activeMenuProvider, url });
    window.open(url, "_blank");
  };

  const handleDirections = () => {
    track("hero_directions_click", { destination: siteConfig.address });
    window.open(siteConfig.googleMapsUrl, "_blank");
  };

  const handleTextDeals = () => {
    track("hero_join_text_deals_click");
    const el = document.getElementById("text-club");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Custom event fallback to trigger modal
      window.dispatchEvent(new CustomEvent("open-restocks"));
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Background Macro Image */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.7 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 flex items-center justify-center"
      >
        <div className="relative w-[110vw] h-[110vh]">
          <Image
            src="/strain-purple.webp"
            alt="The Purple Dragon Cannabis strain"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] opacity-90" />
        </div>
      </motion.div>

      {/* Hero Content Grid */}
      <div className="relative z-10 max-w-[1800px] w-full px-8 grid grid-cols-1 lg:grid-cols-12 items-center gap-12 mt-16 lg:mt-0">
        
        {/* Left Side: Brand & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          <div className="flex flex-col gap-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
            <div className="h-[1px] w-12 bg-yellow-500/50" />
              <span className="mono-label text-yellow-400 tracking-[0.3em] drop-shadow-sm uppercase">
                {siteConfig.address} / {siteConfig.ommaLicense}
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="boutique-title text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.85] text-purple-200"
            >
              {siteConfig.storeName}<br />
              <span className="text-yellow-400 border border-yellow-400/20 px-4 mt-4 inline-block text-xl sm:text-2xl md:text-3xl tracking-widest font-mono uppercase font-black">
                Fresh Drops. Coffee Bar. Curbside Pickup.
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="max-w-xl text-purple-100/85 text-sm leading-relaxed tracking-wide font-light mt-4 drop-shadow-sm"
          >
            Browse {siteConfig.storeName}&apos;s featured flower, cartridges, head shop accessories, and patient specials. Shop the full menu, get directions, or join drop alerts.
          </motion.p>

          {/* Sleek CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="flex flex-wrap gap-4 mt-6 z-10"
          >
            <button 
              onClick={handleShopMenu}
              disabled={!resolveActiveMenuUrl(siteConfig)}
              className="mono-label border border-yellow-400 bg-yellow-500 text-black hover:bg-transparent hover:text-yellow-400 transition-all font-black text-xs cursor-pointer uppercase disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Shop Full Menu
            </button>
            <button 
              onClick={handleDirections}
              className="mono-label border border-purple-800/30 px-6 py-3.5 text-purple-200 hover:border-yellow-400 hover:bg-purple-950/20 transition-all font-black text-xs cursor-pointer uppercase"
            >
              Get Directions
            </button>
            <button 
              onClick={handleTextDeals}
              className="mono-label border border-purple-800/30 px-6 py-3.5 text-purple-300/60 hover:text-white hover:border-white transition-all font-black text-xs cursor-pointer uppercase"
            >
              Join Text Deals
            </button>
          </motion.div>
        </div>

        {/* Right Side: Graphic Logo Showcase */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1.2 }}
          className="lg:col-span-5 hidden lg:flex items-center justify-center relative"
        >
          {/* Decorative glowing purple/gold circle background */}
          <div className="absolute w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[60px]" />
          <div className="absolute w-[350px] h-[350px] bg-yellow-500/5 rounded-full blur-[80px]" />

          <div className="relative w-[400px] h-[400px] border border-purple-900/30 bg-[#0d071a]/40 backdrop-blur-md p-8 flex items-center justify-center group overflow-hidden shadow-[0_0_50px_rgba(147,51,234,0.15)]">
            {/* Corners */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-yellow-500/40" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500/40" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500/40" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-yellow-500/40" />

            <div className="relative w-full h-full">
              <Image
                src="/purple-dragon-mascot.png"
                alt="The Purple Dragon Official Emblem"
                fill
                className="object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </div>
        </motion.div>

      </div>

      {/* Decorative Border */}
      <div className="absolute inset-0 border border-white/5 m-8 pointer-events-none" />
    </section>
  );
}
