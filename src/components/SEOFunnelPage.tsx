"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import TextSignupForm from "@/components/TextSignupForm";
import FAQBlock from "@/components/FAQBlock";
import Link from "next/link";
import { track } from "@/lib/analytics";
import { Phone, MapPin, Compass, ShieldAlert, Award } from "lucide-react";
import { SEOPageData } from "@/lib/seo-pages";
import { siteConfig } from "@/lib/site-config";

interface SEOFunnelPageProps {
  data: SEOPageData;
}

export default function SEOFunnelPage({ data }: SEOFunnelPageProps) {
  
  const handleCall = () => {
    track("call_clicked", { source: data.sourceTag });
    window.location.href = `tel:${siteConfig.phone}`;
  };

  const handleDirections = () => {
    track("directions_clicked", { source: data.sourceTag });
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteConfig.address)}`, "_blank");
  };

  const handleMenuClick = () => {
    track("menu_clicked", { source: data.sourceTag });
  };

  const handleClaimDeal = () => {
    track("deal_claim_clicked", { source: data.sourceTag });
    if (data.primaryCta === "Get Directions") {
      handleDirections();
      return;
    }
    // Smooth scroll directly to Text Intake Form
    const element = document.getElementById("vip-signup-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-background relative text-foreground">
      <Navbar cartCount={0} onOpenCart={() => {}} />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-8 max-w-[1400px] mx-auto min-h-[70vh] flex flex-col justify-center border-b border-purple-950/20">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-950/5 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="flex flex-col gap-6 max-w-4xl relative z-10">
          <div className="flex items-center gap-2">
            <Award size={12} className="text-yellow-400" />
            <span className="mono-label text-purple-300/60 !text-[8.5px]">{data.heroBadge}</span>
          </div>
          
          <h1 className="boutique-title text-5xl md:text-7xl uppercase font-black tracking-tighter text-white leading-none">
            {data.h1}
          </h1>
          
          <p className="text-purple-200/60 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
            {data.intro}
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={handleClaimDeal}
              className="mono-label border border-yellow-400 py-3.5 px-8 bg-yellow-500 text-black hover:bg-transparent hover:text-yellow-400 transition-all font-black text-[10px] cursor-pointer"
            >
              {data.primaryCta}
            </button>
            
            <Link
              href="/#menu"
              onClick={handleMenuClick}
              className="mono-label border border-purple-800/30 py-3.5 px-8 text-purple-200 hover:border-yellow-400 hover:bg-purple-950/20 transition-all font-black text-[10px] flex items-center justify-center"
            >
              Shop Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Main Copy Sections & Offer Highlights */}
      <section className="py-24 px-8 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-start">
        
        {/* Core Content Column */}
        <div className="flex flex-col gap-12">
          {data.sections.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <h2 className="mono-label text-white font-bold text-xs uppercase tracking-widest">
                {section.title}
              </h2>
              <p className="text-purple-200/60 text-xs sm:text-sm font-light leading-relaxed font-mono">
                {section.content}
              </p>
              {section.highlight && (
                <div className="border-l-2 border-yellow-500 pl-4 my-2 text-[11px] text-purple-200/80 font-mono italic">
                  {section.highlight}
                </div>
              )}
            </div>
          ))}

          {/* Quick Route/Call Block */}
          <div className="h-[1px] w-full bg-purple-900/20 my-4" />

          <div className="flex flex-col gap-4">
            <span className="mono-label text-purple-400/40 text-[9px] uppercase tracking-widest">Store Info</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Call Trigger */}
              <button
                onClick={handleCall}
                className="flex items-center gap-4 border border-purple-800/30 p-5 bg-purple-950/20 text-left group hover:border-yellow-400 transition-all duration-300"
              >
                <div className="w-10 h-10 border border-purple-800/30 flex items-center justify-center shrink-0 group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                  <Phone size={14} className="text-purple-300 group-hover:text-black" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="mono-label text-purple-300/30 !text-[7px]">Call the Store</span>
                  <span className="mono-label text-white font-black text-[10px] tracking-wider font-mono">{siteConfig.phone}</span>
                </div>
              </button>

              {/* Direction Trigger */}
              <button
                onClick={handleDirections}
                className="flex items-center gap-4 border border-purple-800/30 p-5 bg-purple-950/20 text-left group hover:border-yellow-400 transition-all duration-300"
              >
                <div className="w-10 h-10 border border-purple-800/30 flex items-center justify-center shrink-0 group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                  <MapPin size={14} className="text-purple-300 group-hover:text-black" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="mono-label text-purple-300/30 !text-[7px]">Find Us</span>
                  <span className="mono-label text-white font-black text-[10px] tracking-wider font-mono">{siteConfig.address}</span>
                </div>
              </button>

            </div>
          </div>
        </div>

        {/* Lead Capture Column */}
        <div id="vip-signup-form" className="lg:sticky lg:top-32">
          <TextSignupForm
            sourceTag={data.sourceTag}
            defaultInterest={data.defaultInterest}
            primaryCtaText={data.primaryCta}
          />
        </div>
      </section>

      {/* Collapsible FAQ Block */}
      <section className="py-24 px-8 border-t border-purple-950/20 bg-[#090312]">
        <FAQBlock faqs={data.faqs} />
      </section>

      {/* Cluster Linking Horizontal Segment */}
      <section className="py-16 px-8 max-w-[1400px] mx-auto border-t border-purple-950/20 flex flex-col gap-6 items-center text-center">
        <div className="flex items-center gap-2">
          <Compass size={12} className="text-purple-400" />
          <span className="mono-label text-purple-300/30 text-[8px] uppercase tracking-widest">Popular Patient Links</span>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {data.relatedPages.map((page, idx) => (
            <Link
              key={idx}
              href={`/${page.slug}`}
              className="mono-label border border-purple-800/30 px-5 py-2.5 bg-purple-950/20 text-purple-200/60 hover:border-yellow-400 hover:text-yellow-400 transition-all text-[8px] tracking-wider font-mono"
            >
              {page.title} &rarr;
            </Link>
          ))}
        </div>
      </section>

      {/* Compliance Notice Block */}
      <section className="py-12 px-8 border-t border-purple-950/20 bg-[#05010a]">
        <div className="max-w-[1000px] mx-auto flex items-start gap-4 border border-purple-900/30 bg-[#0d071a]/40 p-6">
          <ShieldAlert size={16} className="text-yellow-500 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <span className="mono-label text-white font-black text-[9px] uppercase tracking-wider">Medical Cannabis Notice</span>
            <p className="text-[10px] text-purple-300/40 leading-relaxed font-mono">
              {siteConfig.storeName} serves Oklahoma medical marijuana patients. Product availability, pricing, batch information, and discounts can change. Bring an active OMMA patient license and photo ID for any purchase.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-purple-950/20 bg-black">
        <div className="max-w-[1400px] mx-auto px-8 flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="flex flex-col gap-3">
            <h4 className="boutique-title text-3xl font-extrabold text-purple-200">{siteConfig.storeName}</h4>
            <p className="mono-label !text-[8px] text-purple-300/30 max-w-[360px] leading-relaxed">
              {siteConfig.address.toUpperCase()} | DISPATCH: {siteConfig.phone}
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-1 text-right">
            <span className="mono-label !text-[7px] text-purple-300/20 tracking-[0.2em] font-mono">OMMA patient license required</span>
            <span className="mono-label !text-[7px] text-purple-300/10 tracking-[0.2em] font-mono">© 2026 {siteConfig.storeName} Cannabis Co.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
