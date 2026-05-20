"use client";

import { useEffect } from "react";
import { siteConfig } from "@/lib/site-config";
import { track } from "@/lib/analytics";
import { MapPin, Phone, Clock, Compass, ShieldCheck } from "lucide-react";

export default function LocationSection() {
  const handleDirections = () => {
    track("directions_click", { address: siteConfig.address });
    window.open(siteConfig.googleMapsUrl, "_blank");
  };

  const handlePhone = () => {
    track("phone_click", { number: siteConfig.phone });
    window.open(`tel:${siteConfig.phone.replace(/\s+/g, "")}`, "_self");
  };

  const handleMapInteraction = () => {
    track("map_interaction");
    window.open(siteConfig.googleMapsUrl, "_blank");
  };

  const serviceAreas = [
    "Lawton",
    "Fort Sill",
    "Cache",
    "Elgin",
    "Medicine Park",
    "Southwest Oklahoma",
  ];

  return (
    <section id="location" className="py-24 px-8 bg-background border-t border-purple-950/20 scroll-mt-20 relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Info Blocks (Columns 1-5) */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Compass size={16} className="text-purple-400" />
              <span className="mono-label text-purple-400 tracking-[0.3em] uppercase font-mono">Gore Blvd Storefront</span>
            </div>
            <h2 className="boutique-title text-4xl sm:text-5xl uppercase font-black text-white leading-tight">
              Visit us on Gore Blvd
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            
            {/* Address */}
            <div className="flex gap-4">
              <div className="w-8 h-8 border border-purple-900/30 flex items-center justify-center rounded-sm bg-purple-950/40 shrink-0 mt-1">
                <MapPin size={12} className="text-purple-400" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="mono-label text-purple-400/55 text-[8px] uppercase font-mono">Location</span>
                <span className="font-bold text-sm tracking-tight text-white">{siteConfig.address}</span>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="w-8 h-8 border border-purple-900/30 flex items-center justify-center rounded-sm bg-purple-950/40 shrink-0 mt-1">
                <Phone size={12} className="text-purple-400" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="mono-label text-purple-400/55 text-[8px] uppercase font-mono">Phone Line</span>
                <span className="font-bold text-sm tracking-tight text-white">{siteConfig.phone}</span>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <div className="w-8 h-8 border border-purple-900/30 flex items-center justify-center rounded-sm bg-purple-950/40 shrink-0 mt-1">
                <Clock size={12} className="text-purple-400" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="mono-label text-purple-400/55 text-[8px] uppercase font-mono">Curbside & Store Hours</span>
                <span className="font-bold text-sm tracking-tight text-white">Monday – Saturday: 9:00 AM – 10:00 PM</span>
                <span className="text-[10px] text-purple-300/40 font-mono">Sunday: 12:00 PM – 8:00 PM</span>
              </div>
            </div>

          </div>

          <div className="flex gap-3">
            <button
              onClick={handleDirections}
              className="mono-label border border-yellow-400 py-3.5 px-6 bg-yellow-500 text-black hover:bg-transparent hover:text-yellow-400 transition-all font-black text-[9px] cursor-pointer uppercase font-mono"
            >
              Get Directions
            </button>
            <button
              onClick={handlePhone}
              className="mono-label border border-purple-800/30 py-3.5 px-6 text-purple-200 hover:border-yellow-400 hover:text-yellow-400 hover:bg-purple-950/20 transition-all font-black text-[9px] cursor-pointer uppercase font-mono"
            >
              Call Store
            </button>
          </div>
        </div>

        {/* Local SEO & Map Area (Columns 6-12) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* Mock Map Box */}
          <div
            onClick={handleMapInteraction}
            className="w-full h-80 border border-purple-900/30 bg-purple-950/80 relative flex items-center justify-center overflow-hidden cursor-pointer group hover:border-yellow-500/30 transition-all duration-500 rounded-sm"
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                handleMapInteraction();
              }
            }}
          >
            {/* Abstract Grid Line art simulating maps */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(147,51,234,0.02)_1px,transparent_1px),linear-gradient(rgba(147,51,234,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60" />
            <div className="absolute w-20 h-20 bg-purple-900/5 rounded-full blur-2xl top-1/3 left-1/4" />
            <div className="absolute w-28 h-28 bg-purple-900/5 rounded-full blur-2xl bottom-1/3 right-1/4" />

            {/* Simulated Pin */}
            <div className="relative z-10 flex flex-col items-center gap-2 group-hover:scale-105 transition-transform duration-500">
              <div className="w-12 h-12 bg-yellow-500 text-black rounded-full flex items-center justify-center shadow-lg relative">
                <MapPin size={20} />
                <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-25 pointer-events-none" />
              </div>
              <span className="mono-label text-white font-bold text-[9px] uppercase tracking-widest bg-purple-950/80 px-3 py-1 border border-purple-900/30 rounded-sm shadow-md font-mono">
                {siteConfig.storeName}
              </span>
            </div>
            
            <div className="absolute bottom-6 right-6 z-10 text-[8px] text-purple-400/55 font-mono uppercase tracking-widest bg-background/80 backdrop-blur-md px-3 py-1.5 border border-purple-900/20 rounded-sm">
              Click to Open Google Maps
            </div>
          </div>

          {/* Local SEO service area list */}
          <div className="flex flex-col gap-4 border border-purple-900/20 p-6 bg-purple-950/10 rounded-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-purple-400" />
              <span className="mono-label text-white font-bold text-[9px] uppercase tracking-widest font-mono">
                Oklahoma Patient Service Areas
              </span>
            </div>
            
            <p className="text-[10px] text-purple-300/60 leading-relaxed font-mono uppercase">
              Medical cannabis, curbside pickup, coffee bar service, and head shop accessories for licensed Oklahoma patients. Located on Gore Blvd for rapid curbside or in-store visits.
            </p>

            <div className="flex flex-wrap gap-2 mt-1">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="mono-label py-1.5 px-3 border border-purple-900/30 text-purple-300/50 text-[8px] uppercase tracking-wider font-mono rounded-sm hover:border-yellow-400/50 hover:text-yellow-400 transition-colors"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
