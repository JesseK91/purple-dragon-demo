"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

interface NavbarProps {
  cartCount?: number;
  onOpenCart?: () => void;
  onNavigate?: (item: string) => void;
}

export default function Navbar({ cartCount = 0, onOpenCart, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ["Menu", "Deals", "Curbside", "Rewards", "Contact"];

  const handleNavClick = (item: string) => {
    setIsOpen(false);
    if (onNavigate) {
      onNavigate(item);
    } else {
      const path = typeof window !== "undefined" ? window.location.pathname : "/";
      if (item === "Contact") {
        window.location.href = "/contact";
      } else if (item === "Menu") {
        if (path === "/") {
          document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.href = "/#menu";
        }
      } else if (item === "Curbside") {
        if (path === "/") {
          document.getElementById("curbside")?.scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.href = "/#curbside";
        }
      } else if (item === "Deals") {
        if (path === "/") {
          document.getElementById("deals")?.scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.href = "/#deals";
        }
      } else if (item === "Rewards") {
        if (path === "/") {
          document.getElementById("rewards")?.scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.href = "/#rewards";
        }
      }
    }
  };

  const handleCartClick = () => {
    const path = typeof window !== "undefined" ? window.location.pathname : "/";
    if (onOpenCart && path === "/") {
      onOpenCart();
    } else {
      window.location.href = "/#menu";
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] border-b border-purple-950/20 bg-[#05010a]/80 backdrop-blur-md">
        <div className="max-w-[1800px] mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => {
                if (typeof window !== "undefined") {
                  if (window.location.pathname === "/") {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    window.location.href = "/";
                  }
                }
              }}
            >
              <div className="w-8 h-8 bg-yellow-500 flex items-center justify-center border border-yellow-400">
                <span className="text-black font-mono text-xs font-black italic">PD</span>
              </div>
              <span className="boutique-title text-xl font-extrabold tracking-tighter text-purple-200">
                {siteConfig.storeName}
              </span>
            </motion.div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <button 
                key={item}
                onClick={() => handleNavClick(item)}
                className="mono-label text-purple-300/60 hover:text-yellow-400 transition-colors tracking-widest text-[9px] cursor-pointer font-mono"
              >
                {item}
              </button>
            ))}

            {/* Cart Icon & Count */}
            <div className="flex items-center gap-2 border-l border-purple-900/20 pl-6 h-6">
              <button 
                onClick={handleCartClick}
                className="relative cursor-pointer group flex items-center justify-center p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400 group-hover:text-yellow-400 transition-colors">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 bg-yellow-500 text-black text-[7px] font-bold font-mono w-3.5 h-3.5 flex items-center justify-center rounded-full"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCartClick}
              className="mono-label border border-yellow-400 px-4 py-2 text-[9px] bg-yellow-500 text-black hover:bg-transparent hover:text-yellow-400 transition-all font-black cursor-pointer font-mono"
            >
              Curbside Order
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-6">
            {/* Mobile Cart */}
            <button 
              onClick={handleCartClick}
              className="relative cursor-pointer flex items-center justify-center p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-300">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-yellow-500 text-black text-[7px] font-bold font-mono w-3.5 h-3.5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col gap-1.5 items-end group z-[110]"
            >
              <motion.div 
                animate={{ width: isOpen ? 24 : 20, rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }}
                className="h-[1px] bg-white group-hover:bg-white transition-all" 
              />
              <motion.div 
                animate={{ opacity: isOpen ? 0 : 1 }}
                className="w-24 h-[1px] bg-white/30 group-hover:bg-white transition-all" 
              />
              <motion.div 
                animate={{ width: isOpen ? 24 : 16, rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }}
                className="h-[1px] bg-white group-hover:bg-white transition-all" 
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[90] bg-[#05010a] flex flex-col items-center justify-center p-8 pt-32 md:hidden"
          >
            <div className="flex flex-col items-center gap-12 w-full">
              {navLinks.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="boutique-title text-5xl uppercase font-black tracking-tighter text-white cursor-pointer"
                  onClick={() => {
                    handleNavClick(item);
                  }}
                >
                  {item}
                </motion.button>
              ))}
              
              <div className="mt-20 pt-12 border-t border-white/5 w-full flex flex-col items-center gap-4">
                <span className="mono-label text-white/20 text-[10px]">Pickup Address</span>
                <span className="mono-label text-purple-300/60 text-xs tracking-[0.2em]">{siteConfig.address}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
