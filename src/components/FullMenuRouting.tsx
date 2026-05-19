"use client";

import { resolveActiveMenuUrl, resolveMenuUrl, siteConfig, type MenuProvider } from "@/lib/site-config";
import { track } from "@/lib/analytics";
import { ExternalLink, ShoppingBag, Eye } from "lucide-react";

export default function FullMenuRouting() {
  const handleProviderClick = (provider: MenuProvider) => {
    const url = resolveMenuUrl(provider, siteConfig);
    if (!url) {
      track("menu_route_unavailable", { source: "full_menu_provider", provider });
      return;
    }
    track(`${provider}_menu_click`, { url });
    window.open(url, "_blank");
  };

  const handleOrderPickup = () => {
    const url = resolveActiveMenuUrl(siteConfig);
    if (!url) {
      track("menu_route_unavailable", { source: "full_menu_pickup", provider: siteConfig.activeMenuProvider });
      return;
    }
    track("pickup_order_click", { provider: siteConfig.activeMenuProvider, url });
    window.open(url, "_blank");
  };

  const handleViewDeals = () => {
    track("pickup_view_deals_click");
    document.getElementById("deals")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 px-8 bg-[#090312] border-t border-b border-purple-950/20 relative overflow-hidden">
      {/* Visual Ambient Fog */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.02)_0%,transparent_100%)] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto flex flex-col gap-10 text-center items-center">
        <div className="flex flex-col gap-3 max-w-2xl">
          <span className="mono-label text-purple-400/50 text-[9px] uppercase tracking-[0.3em]">
            Seamless Menu Integrations
          </span>
          <h2 className="boutique-title text-3xl sm:text-4xl md:text-5xl uppercase font-black text-white leading-tight">
            Menu Integrations
          </h2>
          <p className="text-purple-200/60 text-xs font-light leading-relaxed mt-2">
            Use {siteConfig.storeName}&apos;s existing Weedmaps, Dutchie, or Jane menu for live availability and pickup ordering. This site acts as the branded front door for deals, fresh drops, text alerts, reviews, and local trust.
          </p>
        </div>

        {/* Directory Buttons */}
        <div className="flex flex-wrap gap-4 justify-center w-full max-w-4xl mt-4">
          {siteConfig.weedmapsMenuUrl && (
            <button
              onClick={() => handleProviderClick("weedmaps")}
              className="mono-label border border-purple-800/30 px-8 py-5 text-purple-200 bg-purple-950/20 hover:bg-yellow-500 hover:text-black hover:border-yellow-400 transition-all font-black text-[10px] cursor-pointer uppercase flex items-center gap-3 shrink-0"
            >
              Open Weedmaps Menu <ExternalLink size={10} />
            </button>
          )}

          {siteConfig.dutchieMenuUrl && (
            <button
              onClick={() => handleProviderClick("dutchie")}
              className="mono-label border border-purple-800/30 px-8 py-5 text-purple-200 bg-purple-950/20 hover:bg-yellow-500 hover:text-black hover:border-yellow-400 transition-all font-black text-[10px] cursor-pointer uppercase flex items-center gap-3 shrink-0"
            >
              Open Dutchie Menu <ExternalLink size={10} />
            </button>
          )}

          {siteConfig.janeMenuUrl && (
            <button
              onClick={() => handleProviderClick("jane")}
              className="mono-label border border-purple-800/30 px-8 py-5 text-purple-200 bg-purple-950/20 hover:bg-yellow-500 hover:text-black hover:border-yellow-400 transition-all font-black text-[10px] cursor-pointer uppercase flex items-center gap-3 shrink-0"
            >
              Open Jane Menu <ExternalLink size={10} />
            </button>
          )}
        </div>

        <div className="w-full max-w-md h-[1px] bg-purple-900/20 my-4" />

        {/* Immediate CTA Options */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            onClick={handleOrderPickup}
            disabled={!resolveActiveMenuUrl(siteConfig)}
            className="mono-label border border-yellow-400 py-4 px-10 bg-yellow-500 text-black hover:bg-transparent hover:text-yellow-400 transition-all font-black text-[10px] cursor-pointer uppercase flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingBag size={12} /> Order Pickup Now
          </button>
          <button
            onClick={handleViewDeals}
            className="mono-label border border-purple-800/30 py-4 px-10 text-purple-300/80 hover:border-yellow-400 hover:bg-purple-950/20 hover:text-yellow-400 transition-all font-black text-[10px] cursor-pointer uppercase flex items-center justify-center gap-2"
          >
            <Eye size={12} /> View Specials First
          </button>
        </div>

      </div>
    </section>
  );
}
