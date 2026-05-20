"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { track } from "@/lib/analytics";
import { Menu, Gift, Phone, MapPin, MessageSquare } from "lucide-react";

interface StickyActionBarProps {
  isCartOpen?: boolean;
}

export default function StickyActionBar({ isCartOpen = false }: StickyActionBarProps) {
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);

  useEffect(() => {
    const onVisibility = (event: Event) => {
      const custom = event as CustomEvent<{ open?: boolean }>;
      setIsAnyModalOpen(Boolean(custom.detail?.open));
    };
    window.addEventListener("modal-visibility-change", onVisibility as EventListener);
    return () => window.removeEventListener("modal-visibility-change", onVisibility as EventListener);
  }, []);

  const handleAction = (action: string) => {
    track(`mobile_${action.toLowerCase().replace(" ", "_")}_tap`);

    if (action === "Menu") {
      document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
    } else if (action === "Deals") {
      document.getElementById("deals")?.scrollIntoView({ behavior: "smooth" });
    } else if (action === "Call") {
      window.open(`tel:${siteConfig.phone.replace(/\s+/g, "")}`, "_self");
    } else if (action === "Directions") {
      window.open(siteConfig.googleMapsUrl, "_blank");
    } else if (action === "Deal Alerts") {
      const el = document.getElementById("text-club");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.dispatchEvent(new CustomEvent("open-restocks"));
      }
    }
  };

  const navItems = [
    { label: "Menu", icon: Menu },
    { label: "Deals", icon: Gift },
    { label: "Call", icon: Phone },
    { label: "Directions", icon: MapPin },
    { label: "Deal Alerts", icon: MessageSquare },
  ];

  const isVisible = !isCartOpen && !isAnyModalOpen;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 w-full z-[80] md:hidden bg-background/90 backdrop-blur-lg border-t border-white/10 px-4 py-3 flex items-center justify-around shadow-[0_-10px_30px_rgba(0,0,0,0.8)]"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => handleAction(item.label)}
                className="flex flex-col items-center justify-center gap-1 text-white/50 hover:text-white transition-colors cursor-pointer py-1 px-3 w-16"
              >
                <Icon size={16} className="text-white/60 group-hover:text-white" />
                <span className="text-[8px] font-mono tracking-wider uppercase font-semibold">
                  {item.label}
                </span>
              </button>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
