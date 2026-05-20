"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { Gift, Award, Calendar, RefreshCcw, Sparkles, Star } from "lucide-react";

export default function RewardsSection() {
  useEffect(() => {
    track("rewards_section_view");
  }, []);

  const handleInterestClick = (cardTitle: string) => {
    track("rewards_interest_click", { benefit: cardTitle });
    // Smooth scroll to Text deals section for automatic enrollment
    document.getElementById("text-club")?.scrollIntoView({ behavior: "smooth" });
  };

  const benefits = [
    {
      title: "Birthday Rewards",
      icon: Calendar,
      copy: "Get a birthday-month perk when one is active.",
    },
    {
      title: "Veteran Specials",
      icon: Award,
      copy: "Check for veteran discounts when they are running.",
    },
    {
      title: "Return-Visit Points",
      icon: RefreshCcw,
      copy: "Earn extra points when you come back within 14 days of your last visit.",
    },
    {
      title: "VIP Special Drops",
      icon: Star,
      copy: "Get limited restock notices for flower, carts, or fresh glass.",
    },
    {
      title: "Points Redemptions",
      icon: Gift,
      copy: "Use points on select in-store and order-ahead purchases.",
    },
  ];

  return (
    <section id="rewards" className="py-24 px-8 bg-background border-t border-purple-950/20 relative overflow-hidden">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.005)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      <div className="max-w-[1800px] mx-auto flex flex-col gap-12">
        
        {/* Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Award size={16} className="text-purple-400" />
              <span className="mono-label text-purple-400 tracking-[0.3em] uppercase font-mono">Patient Loyalty & Perks</span>
            </div>
              <h2 className="boutique-title text-4xl sm:text-5xl md:text-6xl uppercase font-black text-white leading-none">
              Patient Rewards
            </h2>
          </div>

          <div className="flex flex-col gap-5 border-l border-purple-900/30 pl-6 lg:pl-10">
            <div className="flex flex-col gap-2">
              <span className="mono-label text-yellow-500 text-[9px] uppercase tracking-widest flex items-center gap-1.5 font-mono">
                <Sparkles size={12} className="text-yellow-400" />
                LOYALTY BENEFITS
              </span>
              <p className="text-purple-200/60 text-xs font-light leading-relaxed max-w-lg">
                Get rewarded for shopping with us. Earn points on in-store and curbside purchases to redeem for birthday perks, return-visit bonuses, and occasional restock notifications.
              </p>
            </div>
            
            <button
              onClick={() => handleInterestClick("Header CTA")}
              className="mono-label border border-yellow-400 py-3.5 px-6 bg-yellow-500 text-black hover:bg-transparent hover:text-yellow-400 transition-all font-black text-[9px] cursor-pointer uppercase self-start rounded-sm"
            >
              Join Alerts
            </button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {benefits.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                onClick={() => handleInterestClick(card.title)}
                className="bg-purple-950/80 border border-purple-900/20 p-6 flex flex-col justify-between min-h-60 hover:border-yellow-500/30 hover:bg-purple-950/20 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 border border-purple-900/30 flex items-center justify-center rounded-sm bg-purple-950/40 group-hover:border-yellow-500/50 transition-colors">
                    <Icon size={16} className="text-purple-400 group-hover:text-yellow-400 transition-colors" />
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-8">
                  <h3 className="mono-label text-white font-bold text-[10px] uppercase tracking-widest font-mono">
                    {card.title}
                  </h3>
                  <p className="text-[10px] text-purple-300/50 leading-relaxed font-mono uppercase">
                    {card.copy}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
