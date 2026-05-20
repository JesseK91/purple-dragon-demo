"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DealsSection from "@/components/DealsSection";
import CurbsideSection from "@/components/CurbsideSection";
import DriveThruPromo from "@/components/DriveThruPromo";
import CoffeeBarPromo from "@/components/CoffeeBarPromo";
import FeaturedMenu, { type Product } from "@/components/FeaturedMenu";
import FullMenuRouting from "@/components/FullMenuRouting";
import TextClubSection from "@/components/TextClubSection";
import RewardsSection from "@/components/RewardsSection";
import ReviewFlowSection from "@/components/ReviewFlowSection";
import LocationSection from "@/components/LocationSection";
import ComplianceFooter from "@/components/ComplianceFooter";
import StickyActionBar from "@/components/StickyActionBar";
import { track } from "@/lib/analytics";
import Link from "next/link";

export default function Home() {
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [patientLicense, setPatientLicense] = useState("");
  const [pickupMethod, setPickupMethod] = useState<"in_store" | "drive_thru">("in_store");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openRestocks, setOpenRestocks] = useState(false);

  useEffect(() => {
    track("storefront_home_view");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("restocks") === "true") {
        setOpenRestocks(true);
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  useEffect(() => {
    const handleOpenRestocksEvent = () => setOpenRestocks(true);
    window.addEventListener("open-restocks", handleOpenRestocksEvent);
    return () => window.removeEventListener("open-restocks", handleOpenRestocksEvent);
  }, []);

  const handleAddToCart = (product: Product) => {
    if (!cart.some(item => item.id === product.id)) {
      setCart([...cart, product]);
      track("cart_item_added", { productId: product.id, name: product.name });
    }
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    const item = cart.find(i => i.id === id);
    if (item) {
      track("cart_item_removed", { productId: id, name: item.name });
    }
    setCart(cart.filter(item => item.id !== id));
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0 || !patientName.trim() || !patientLicense.trim()) return;

    setIsSubmitting(true);
    track("cart_checkout_submit", {
      patientName,
      patientLicense,
      pickupMethod,
      itemCount: cart.length,
      total: cart.length * 25,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setCheckoutSuccess(true);
    }, 1500);
  };

  const handleResetCheckout = () => {
    setCart([]);
    setIsCartOpen(false);
    setCheckoutSuccess(false);
    setPatientName("");
    setPatientLicense("");
    setPickupMethod("in_store");
  };

  const cartTotal = cart.length * 25; // Demo placeholder pricing

  return (
    <main className="min-h-screen bg-background relative text-foreground">
      
      {/* Dynamic Navigation Toolbar */}
      <Navbar 
        cartCount={cart.length} 
        onOpenCart={() => setIsCartOpen(true)} 
        onNavigate={(item) => {
          track("nav_click", { item });
          if (item === "Menu") {
            document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
          } else if (item === "Deals") {
            document.getElementById("deals")?.scrollIntoView({ behavior: "smooth" });
          } else if (item === "Rewards") {
            document.getElementById("rewards")?.scrollIntoView({ behavior: "smooth" });
          } else if (item === "Curbside") {
            document.getElementById("curbside")?.scrollIntoView({ behavior: "smooth" });
          } else if (item === "Contact") {
            window.location.href = "/contact";
          }
        }}
      />

      {/* Main Sections Composition */}
      <Hero />
      <DealsSection />
      <CurbsideSection />
      <DriveThruPromo />
      <CoffeeBarPromo />
      
      <FeaturedMenu 
        onAddToPreOrder={handleAddToCart} 
        openRestocksTrigger={openRestocks}
        onResetRestocksTrigger={() => setOpenRestocks(false)}
      />

      <FullMenuRouting />
      <TextClubSection />
      <RewardsSection />
      <ReviewFlowSection />
      <LocationSection />

      {/* Popular Patient Links / SEO Internal Linking Segment */}
      <section className="py-16 px-8 border-t border-purple-950/20 bg-background text-center flex flex-col gap-6">
        <span className="mono-label text-purple-400/50 text-[8px] tracking-[0.3em] uppercase block font-mono">
          Quick Store Links
        </span>
        <h3 className="boutique-title text-2xl font-black text-white uppercase tracking-tight">
          Popular Purple Dragon Links
        </h3>
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mt-2">
          <Link href="/lawton-dispensary-deals" className="mono-label border border-purple-900/30 px-5 py-2.5 bg-purple-950/10 text-purple-300 hover:border-yellow-400 hover:text-yellow-400 transition-all text-[8px] tracking-wider font-mono">
            Today's Deals &rarr;
          </Link>
          <Link href="/birthday-dispensary-deals-lawton" className="mono-label border border-purple-900/30 px-5 py-2.5 bg-purple-950/10 text-purple-300 hover:border-yellow-400 hover:text-yellow-400 transition-all text-[8px] tracking-wider font-mono">
            Birthday Specials &rarr;
          </Link>
          <Link href="/flower-deals-lawton" className="mono-label border border-purple-900/30 px-5 py-2.5 bg-purple-950/10 text-purple-300 hover:border-yellow-400 hover:text-yellow-400 transition-all text-[8px] tracking-wider font-mono">
            Flower Deals &rarr;
          </Link>
          <Link href="/first-time-patients" className="mono-label border border-purple-900/30 px-5 py-2.5 bg-purple-950/10 text-purple-300 hover:border-yellow-400 hover:text-yellow-400 transition-all text-[8px] tracking-wider font-mono">
            First-Time Patients &rarr;
          </Link>
          <Link href="/fort-sill-dispensary" className="mono-label border border-purple-900/30 px-5 py-2.5 bg-purple-950/10 text-purple-300 hover:border-yellow-400 hover:text-yellow-400 transition-all text-[8px] tracking-wider font-mono">
            Near Fort Sill &rarr;
          </Link>
          <Link href="/join" className="mono-label border border-purple-900/30 px-5 py-2.5 bg-purple-950/10 text-purple-300 hover:border-yellow-400 hover:text-yellow-400 transition-all text-[8px] tracking-wider font-mono">
            Join Text Deals &rarr;
          </Link>
          <Link href="/review" className="mono-label border border-purple-900/30 px-5 py-2.5 bg-purple-950/10 text-purple-300 hover:border-yellow-400 hover:text-yellow-400 transition-all text-[8px] tracking-wider font-mono">
            Submit Review &rarr;
          </Link>
        </div>
      </section>
      
      {/* Compliant warned Footer */}
      <ComplianceFooter />

      {/* Sticky Action Bar (mobile-only overlay) */}
      <StickyActionBar isCartOpen={isCartOpen} />

      {/* COMPLIANT PRE-ORDER DRAWER OVERLAY */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[150] flex justify-end">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && !checkoutSuccess && setIsCartOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Drawer Panel */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-md bg-purple-950/80 border-l border-purple-900/30 h-full p-8 flex flex-col justify-between overflow-y-auto z-10"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-purple-900/30 pb-4">
                <div className="flex flex-col gap-1">
                  <span className="mono-label text-purple-400/50 !text-[8px] font-mono">Pickup Order</span>
                  <h3 className="boutique-title text-2xl font-black text-white uppercase">Your Order</h3>
                </div>
                <button 
                  onClick={() => !isSubmitting && setIsCartOpen(false)}
                  className="text-purple-400 hover:text-yellow-400 transition-colors cursor-pointer text-xs uppercase font-mono tracking-widest"
                >
                  Close
                </button>
              </div>

              {!checkoutSuccess ? (
                <div className="flex flex-col gap-6 flex-1 mt-6">
                  {/* Cart Items */}
                  {cart.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-20">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400/40">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                      </svg>
                      <span className="mono-label text-purple-400/60 text-xs font-mono uppercase">Your Order is Empty</span>
                      <p className="text-[10px] text-purple-300/40 max-w-xs leading-normal font-mono uppercase">
                        Add menu items to start an order-ahead request.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 flex-1">
                      <div className="flex flex-col gap-2">
                        {cart.map(item => (
                          <div key={item.id} className="flex justify-between items-center p-4 border border-purple-900/20 bg-purple-950/10">
                            <div className="flex flex-col gap-0.5">
                              <span className="font-bold text-sm tracking-tight text-white">{item.name}</span>
                              <span className="mono-label text-purple-400/50 !text-[7px] font-mono">1x Item // {item.batch}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm font-mono font-bold">$25.00</span>
                              <button 
                                onClick={() => handleRemoveFromCart(item.id)}
                                className="text-red-500/60 hover:text-red-500 font-mono text-[9px] uppercase cursor-pointer"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Pricing Summary */}
                      <div className="border-t border-purple-900/30 pt-4 flex flex-col gap-1.5">
                        <div className="flex justify-between items-center">
                          <span className="mono-label text-purple-400/55 !text-[8px] font-mono">Subtotal</span>
                          <span className="text-sm font-mono font-bold text-white">${cartTotal}.00</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="mono-label text-purple-400/55 !text-[8px] font-mono">Estimated Total</span>
                          <span className="text-sm font-mono font-bold text-white/60">Taxes applied at pickup</span>
                        </div>
                      </div>

                      <div className="h-[1px] w-full bg-purple-900/20 my-2" />

                      {/* Reservation Checkout Form */}
                      <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="mono-label text-purple-400/50 !text-[8px] font-mono">Patient Name</label>
                            <input 
                              type="text"
                              required
                              placeholder="John Doe"
                              value={patientName}
                              onChange={(e) => setPatientName(e.target.value)}
                              className="bg-purple-950/10 border border-purple-900/30 p-2.5 text-xs text-purple-100 focus:outline-none focus:border-yellow-400 transition-colors font-mono"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="mono-label text-purple-400/50 !text-[8px] font-mono">OMMA Patient ID</label>
                            <input 
                              type="text"
                              required
                              placeholder="P-1234567-X"
                              value={patientLicense}
                              onChange={(e) => setPatientLicense(e.target.value)}
                              className="bg-purple-950/10 border border-purple-900/30 p-2.5 text-xs text-purple-100 focus:outline-none focus:border-yellow-400 transition-colors font-mono uppercase"
                            />
                          </div>

                          {/* Pickup Toggle */}
                          <div className="flex flex-col gap-1.5">
                            <label className="mono-label text-purple-400/50 !text-[8px] font-mono">Pickup Method</label>
                            <div className="grid grid-cols-2 gap-2 border border-purple-900/30 p-1 bg-purple-950/10">
                              <button
                                type="button"
                                onClick={() => setPickupMethod("in_store")}
                                className={`mono-label py-2 text-[8px] font-black text-center cursor-pointer transition-colors font-mono ${pickupMethod === "in_store" ? "bg-yellow-500 text-black border-yellow-500" : "text-purple-300/60 hover:text-white"}`}
                              >
                                In-Store Pickup
                              </button>
                              <button
                                type="button"
                                onClick={() => setPickupMethod("drive_thru")}
                                className={`mono-label py-2 text-[8px] font-black text-center cursor-pointer transition-colors font-mono ${pickupMethod === "drive_thru" ? "bg-yellow-500 text-black border-yellow-500" : "text-purple-300/60 hover:text-white"}`}
                              >
                                Curbside Pickup
                              </button>
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="mono-label border border-yellow-400 py-3 mt-2 bg-yellow-500 text-black hover:bg-transparent hover:text-yellow-400 transition-all font-black text-center text-[9px] w-full flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 font-mono"
                        >
                          {isSubmitting ? (
                            <span className="animate-pulse">Saving...</span>
                          ) : (
                            "Send Curbside Order"
                          )}
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              ) : (
                /* Success screen */
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-6 flex-1 justify-center py-6 text-center"
                >
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto text-black font-black text-xl border border-yellow-400">
                    ✓
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <h3 className="mono-label text-white font-black tracking-widest text-[11px] font-mono">
                      Order Sent
                    </h3>
                    <p className="text-[11px] text-purple-400/50 font-mono tracking-tight uppercase">
                      Order ID: #PD-580
                    </p>
                  </div>

                  {/* Simulated Receipt Slip */}
                  <div className="border border-purple-900/30 bg-background p-6 flex flex-col gap-4 font-mono max-w-xs mx-auto w-full text-left">
                    <div className="flex flex-col border-b border-purple-900/20 pb-3 gap-1">
                      <span className="mono-label text-purple-400/50 !text-[7px]">PATIENT INFO</span>
                      <span className="text-white text-xs font-bold uppercase truncate">{patientName}</span>
                      <span className="text-[8px] text-purple-300/60 font-bold uppercase">{patientLicense}</span>
                    </div>

                    <div className="flex flex-col border-b border-purple-900/20 pb-3 gap-1.5">
                      <span className="mono-label text-purple-400/50 !text-[7px]">RESERVED ITEMS</span>
                      {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-[9px] text-purple-200">
                          <span className="uppercase">{item.name}</span>
                          <span>1x Unit</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="mono-label text-purple-400/50 !text-[7px]">CURBSIDE STATUS</span>
                      <span className="text-yellow-400 font-black text-sm tracking-widest">CONFIRMATION PENDING</span>
                      <span className="text-[7.5px] text-purple-300/50 leading-normal uppercase">
                        Bring your OMMA patient card and photo ID. Wait for confirmation before heading over for curbside pickup.
                      </span>
                    </div>

                    {/* Simulated barcode bars */}
                    <div className="flex items-center gap-[2px] h-6 mt-2 opacity-50">
                      <div className="w-1.5 h-full bg-yellow-500" />
                      <div className="w-[1px] h-full bg-yellow-500" />
                      <div className="w-[2px] h-full bg-yellow-500" />
                      <div className="w-1 h-full bg-yellow-500" />
                      <div className="w-[1px] h-full bg-yellow-500" />
                      <div className="w-2 h-full bg-yellow-500" />
                      <div className="w-[1px] h-full bg-yellow-500" />
                      <div className="w-1.5 h-full bg-yellow-500" />
                      <div className="w-[2px] h-full bg-yellow-500" />
                      <div className="w-[3px] h-full bg-yellow-500" />
                    </div>
                  </div>

                  <button
                    onClick={handleResetCheckout}
                    className="mt-6 mono-label border border-yellow-400 py-3 bg-yellow-500 text-black hover:bg-transparent hover:text-yellow-400 transition-all font-black text-center text-[9px] cursor-pointer font-mono"
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
