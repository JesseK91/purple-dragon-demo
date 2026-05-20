"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { deals, Deal } from "@/lib/site-data";
import { resolveActiveMenuUrl, siteConfig } from "@/lib/site-config";
import { track } from "@/lib/analytics";
import { Gift, Sparkles, Check, X, ShieldAlert } from "lucide-react";

export default function DealsSection() {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Flower");
  const [smsConsent, setSmsConsent] = useState(false);
  const [formError, setFormError] = useState("");
  const [claimSuccess, setClaimSuccess] = useState(false);

  useEffect(() => {
    track("deal_view");
  }, []);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("modal-visibility-change", {
        detail: { open: selectedDeal !== null },
      }),
    );
  }, [selectedDeal]);

  const handleClaimClick = (deal: Deal) => {
    track("deal_claim_click", { dealId: deal.id, dealTitle: deal.title });
    setSelectedDeal(deal);
    setClaimSuccess(false);
    setFormError("");
  };

  const handleMenuClick = () => {
    const url = resolveActiveMenuUrl(siteConfig);
    if (!url) {
      track("menu_route_unavailable", { source: "deals", provider: siteConfig.activeMenuProvider });
      return;
    }
    track("deal_menu_click", { provider: siteConfig.activeMenuProvider, url });
    window.open(url, "_blank");
  };

  const handleTextDeals = () => {
    track("deal_text_me_deals_click");
    const el = document.getElementById("text-club");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.dispatchEvent(new CustomEvent("open-restocks"));
  };

  const resetForm = () => {
    setSelectedDeal(null);
    setFirstName("");
    setPhone("");
    setEmail("");
    setCategory("Flower");
    setSmsConsent(false);
    setFormError("");
    setClaimSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!firstName.trim()) {
      setFormError("Please enter your first name.");
      return;
    }
    if (!phone.trim() && !email.trim()) {
      setFormError("Please enter a phone number or an email address.");
      return;
    }
    if (phone.trim() && !smsConsent && !email.trim()) {
      setFormError("Enter an email address or check the text-message consent box.");
      return;
    }

    try {
      const response = await fetch("/api/lead-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: firstName,
          phone: phone || null,
          email: email || null,
          service_type: selectedDeal ? `Deal Claim: ${selectedDeal.title}` : "Deal Claim",
          property_type: "retail",
          urgency: "NORMAL",
          message: selectedDeal
            ? `Deal request for "${selectedDeal.title}" in category ${category}.`
            : `Deal request in category ${category}.`,
          source: "deals_section_claim_modal",
          metadata: {
            deal_id: selectedDeal?.id,
            deal_title: selectedDeal?.title,
            category,
            sms_opt_in: Boolean(phone.trim() && smsConsent),
            email_opt_in: Boolean(email.trim()),
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Deal claim intake failed");
      }

      track("deal_claim_submit", {
        dealId: selectedDeal?.id,
        dealTitle: selectedDeal?.title,
        firstName,
        category,
        smsOptIn: Boolean(phone.trim() && smsConsent),
        emailOptIn: Boolean(email.trim()),
      });

      setClaimSuccess(true);
      setTimeout(resetForm, 3000);
    } catch (error) {
      console.error(error);
      setFormError("Request failed. Please try again.");
    }
  };

  return (
    <section id="deals" className="py-24 px-8 bg-background border-t border-purple-950/20 relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Sparkles size={16} className="text-yellow-400" />
              <span className="mono-label text-purple-400 tracking-[0.3em] uppercase font-mono">Today&apos;s Specials</span>
            </div>
            <h2 className="boutique-title text-4xl sm:text-5xl md:text-6xl xl:text-7xl uppercase font-black tracking-tighter text-white">
              Patient Specials
            </h2>
          </div>
          <p className="max-w-md text-purple-200/80 text-xs font-light leading-relaxed">
            Featured specials for licensed OMMA customers. Claim a deal, check Happy Hour, join alerts, or open the full menu before heading to Gore Blvd.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <motion.div
              key={deal.id}
              whileHover={{ y: -4 }}
              className="group relative bg-purple-950/80/60 border border-purple-900/20 p-8 flex flex-col justify-between gap-8 hover:border-yellow-500/30 hover:bg-purple-950/20 transition-all duration-500 overflow-hidden"
            >
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start gap-4">
                  <span className="mono-label bg-yellow-500 text-black px-3 py-1 font-black text-[9px] tracking-widest uppercase font-mono">
                    {deal.badge}
                  </span>
                  <Gift size={16} className="text-purple-400/20 group-hover:text-yellow-400 transition-colors" />
                </div>
                <h3 className="boutique-title text-2xl font-black text-white group-hover:text-white/95 transition-colors">
                  {deal.title}
                </h3>
                <p className="text-purple-100/90 text-xs leading-relaxed font-light">{deal.description}</p>
              </div>

              <div className="flex flex-col gap-4 mt-auto">
                <span className="text-[9px] text-purple-300/60 font-mono tracking-tight leading-normal border-t border-purple-900/20 pt-4 uppercase">
                  {deal.finePrint}
                </span>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleClaimClick(deal)}
                    className="flex-1 mono-label border border-yellow-400 py-3 bg-yellow-500 text-black hover:bg-transparent hover:text-yellow-400 transition-all font-black text-center text-[9px] cursor-pointer uppercase"
                  >
                    Claim Deal
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleTextDeals}
                      className="mono-label border border-purple-800/30 px-4 py-3 text-purple-200 hover:border-yellow-400 hover:text-yellow-400 hover:bg-purple-950/20 transition-all font-black text-center text-[9px] cursor-pointer uppercase"
                    >
                      Text Me Deals
                    </button>
                    <button
                      onClick={handleMenuClick}
                      disabled={!resolveActiveMenuUrl(siteConfig)}
                      className="mono-label border border-purple-800/30 px-4 py-3 text-purple-200 hover:border-yellow-400 hover:text-yellow-400 hover:bg-purple-950/20 transition-all font-black text-center text-[9px] cursor-pointer uppercase disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Shop Full Menu
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedDeal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDeal(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md bg-purple-950/80 border border-purple-900/30 p-8 flex flex-col gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedDeal(null)}
                className="absolute top-6 right-6 text-purple-300/40 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col gap-2">
                <span className="mono-label text-purple-400 tracking-[0.2em] text-[9px] uppercase font-mono">Deal Request</span>
                <h3 className="boutique-title text-3xl font-black text-white">{selectedDeal.title}</h3>
                <p className="text-purple-100/90 text-xs font-light leading-relaxed">
                  Share your contact preference and we will route your request to the store team. Email is valid. Text alerts are optional.
                </p>
              </div>

              {claimSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8 gap-4 border border-purple-900/20 bg-purple-950/20 rounded-sm"
                >
                  <div className="w-12 h-12 bg-yellow-500 text-black rounded-full flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div className="flex flex-col items-center text-center px-6">
                    <span className="mono-label text-white font-bold text-xs uppercase tracking-widest font-mono">Deal Request Sent</span>
                    <span className="text-[10px] text-purple-200/80 font-mono mt-2 leading-relaxed uppercase">
                      Your request was saved. The store can follow up by your chosen contact method.
                    </span>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {formError && (
                    <div className="flex items-center gap-2 border border-red-500/20 bg-red-500/5 p-3 text-red-400 text-xs font-mono rounded-sm">
                      <ShieldAlert size={14} className="shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5">
                    <label className="mono-label text-purple-400/55 text-[8px] uppercase font-mono">First Name</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Jesse"
                      className="bg-purple-950/10 border border-purple-900/30 px-4 py-3 text-purple-100 text-sm font-mono focus:border-yellow-400 focus:outline-none transition-colors rounded-sm placeholder:text-purple-400/30"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="mono-label text-purple-400/55 text-[8px] uppercase font-mono">Mobile Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. (580) 555-0199"
                      className="bg-purple-950/10 border border-purple-900/30 px-4 py-3 text-purple-100 text-sm font-mono focus:border-yellow-400 focus:outline-none transition-colors rounded-sm placeholder:text-purple-400/30"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="mono-label text-purple-400/55 text-[8px] uppercase font-mono">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. patient@example.com"
                      className="bg-purple-950/10 border border-purple-900/30 px-4 py-3 text-purple-100 text-sm font-mono focus:border-yellow-400 focus:outline-none transition-colors rounded-sm placeholder:text-purple-400/30"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="mono-label text-purple-400/55 text-[8px] uppercase font-mono">Primary Interest</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="bg-purple-950/80 border border-purple-900/30 px-4 py-3 text-purple-100 text-sm font-mono focus:border-yellow-400 focus:outline-none transition-colors rounded-sm cursor-pointer"
                    >
                      <option value="Flower">Flower</option>
                      <option value="Concentrates">Concentrates</option>
                      <option value="Edibles">Edibles</option>
                      <option value="Vapes">Vapes</option>
                      <option value="All">Show Me Everything</option>
                    </select>
                  </div>

                  <div className="flex items-start gap-3 mt-2 border border-purple-900/20 p-4 bg-purple-950/10 rounded-sm">
                    <input
                      id="deal-consent"
                      type="checkbox"
                      checked={smsConsent}
                      onChange={(e) => setSmsConsent(e.target.checked)}
                      className="mt-1 bg-transparent border-purple-900/30 focus:ring-0 rounded-sm cursor-pointer"
                    />
                    <label htmlFor="deal-consent" className="text-[9px] text-purple-200/75 leading-relaxed font-mono uppercase">
                      Optional text alerts: I agree to receive marketing text messages from {siteConfig.storeName} at the phone number provided. Reply STOP to opt out. Email alerts do not require SMS consent.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full mono-label border border-yellow-400 py-4 bg-yellow-500 text-black hover:bg-transparent hover:text-yellow-400 transition-all font-black text-center text-[10px] cursor-pointer uppercase mt-2"
                  >
                    Save Deal Request
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
