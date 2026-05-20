"use client";

import { siteConfig } from "@/lib/site-config";
import { AlertCircle, Link2 } from "lucide-react";
import Link from "next/link";

export default function ComplianceFooter() {
  const complianceWarnings = [
    "OMMA patient license required at pickup.",
    "Medical cannabis use only.",
    "Product availability changes daily.",
    "THC/CBD values vary by batch.",
    "No medical advice is offered or implied on this website.",
    "Keep medical cannabis products out of reach of children.",
    "Product images are for illustrative purposes only.",
  ];

  const seoLinks = [
    { label: "OMMA Patient Deals", href: "/lawton-dispensary-deals" },
    { label: "Birthday Rewards", href: "/birthday-dispensary-deals-lawton" },
    { label: "Flower Specials", href: "/flower-deals-lawton" },
    { label: "First-Time Patients", href: "/first-time-patients" },
    { label: "Near Fort Sill", href: "/fort-sill-dispensary" },
    { label: "Join Deal Alerts", href: "/join" },
    { label: "Submit Patient Review", href: "/review" },
  ];

  return (
    <footer id="store-info" className="py-20 border-t border-purple-950/20 bg-background relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-8 flex flex-col gap-12">
        
        {/* Upper Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Logo Brand Descriptor */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="boutique-title text-3xl font-extrabold tracking-tighter text-white">
              {siteConfig.storeName}
            </h4>
            <span className="mono-label text-purple-400 !text-[8px] font-mono tracking-widest uppercase">
              Lawton Dispensary, Coffee Bar & Head Shop
            </span>
            <p className="text-[10px] text-purple-200/80 leading-relaxed font-mono max-w-sm mt-2 uppercase">
              Serving licensed OMMA patients in Lawton, Fort Sill, and Southwest Oklahoma with curbside and in-store options.
            </p>
          </div>

          {/* Popular Patient Links (SEO Horizontal linking) */}
          <div className="md:col-span-4 flex flex-col gap-4 border-l border-purple-900/20 pl-6 lg:pl-10">
            <span className="mono-label text-purple-400 text-[9px] uppercase tracking-wider flex items-center gap-2 font-mono">
              <Link2 size={12} className="text-purple-400/50" />
              Popular Patient Links
            </span>
            <div className="flex flex-col gap-2.5 mt-2">
              {seoLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="mono-label text-purple-200/80 hover:text-yellow-400 transition-colors text-[9px] font-mono tracking-wider uppercase block"
                >
                  {link.label} &rarr;
                </Link>
              ))}
            </div>
          </div>

          {/* Compliance Labels Area */}
          <div className="md:col-span-4 flex flex-col gap-4 border-l border-purple-900/20 pl-6 lg:pl-10">
            <span className="mono-label text-purple-400 text-[9px] uppercase tracking-wider flex items-center gap-2 font-mono">
              <AlertCircle size={12} className="text-purple-400/50" />
              Compliance Disclaimers
            </span>
            
            <div className="flex flex-col gap-3 mt-2">
              {complianceWarnings.map((warning, index) => (
                <div key={index} className="flex items-start gap-2 text-[9px] text-purple-200/70 font-mono leading-relaxed uppercase">
                  <div className="w-1 h-1 bg-purple-800/30 rounded-full shrink-0 mt-1.5" />
                  <span>{warning}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Lower Legal Line Area */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-purple-900/20 pt-8 mt-4 gap-6">
          <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
            <span className="mono-label text-purple-400 text-[8px] uppercase tracking-widest font-bold font-mono">
              License ID: {siteConfig.ommaLicense}
            </span>
            <span className="hidden md:inline text-purple-200/55">|</span>
            <span className="mono-label text-purple-200/55 text-[8px] uppercase tracking-wider font-mono">
              Oklahoma Medical Marijuana Authority Compliant
            </span>
          </div>

          <div className="flex flex-col items-end gap-1 text-center md:text-right">
            <span className="mono-label !text-[8px] text-purple-200/55 tracking-[0.2em] font-mono uppercase">
              Medical Cannabis, Glass & Accessories
            </span>
            <span className="mono-label !text-[8px] text-purple-200/40 tracking-[0.1em] font-mono">
              © {new Date().getFullYear()} {siteConfig.storeName}. All rights reserved.
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
