"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { track } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [smsConsent, setSmsConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const categories = [
    { key: "flower", label: "Flower" },
    { key: "concentrates", label: "Concentrates" },
    { key: "edibles", label: "Edibles" },
    { key: "vape", label: "Carts & Vapes" },
    { key: "deals", label: "Deals" },
  ];

  const handleCategoryToggle = (key: string) => {
    if (selectedCategories.includes(key)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== key));
    } else {
      setSelectedCategories([...selectedCategories, key]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      setFormError("Full Name is required.");
      return;
    }
    if (!phone && !email) {
      setFormError("Please enter a mobile number or an email address to receive updates.");
      return;
    }
    if (phone.trim() && !smsConsent && !email.trim()) {
      setFormError("Enter an email address or check the text-message consent box.");
      return;
    }
    setFormError("");
    setIsSubmitting(true);
    track("text_signup_started", { source: "contact_page" });

    try {
      const response = await fetch("/api/lead-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          phone: phone || null,
          email: email || null,
          service_type: selectedCategories.join(", ") || "General Inquiry",
          property_type: "retail",
          urgency: "NORMAL",
          message: message || "General Contact Inquiry",
          source: "contact_page",
          metadata: {
            categories: selectedCategories,
            sms_opt_in: Boolean(phone.trim() && smsConsent),
            email_opt_in: Boolean(email.trim()),
          }
        }),
      });

      if (!response.ok) throw new Error("Lead Guard submission failed");

      // Track standard complete event
      track("text_signup_completed", {
        source: "contact_page",
        name,
        phone: phone || undefined,
        email: email || undefined,
        categories: selectedCategories,
        consentCheckbox: smsConsent
      });

      // Standardize lead storage to local database for Growth Dashboard visibility!
      const existingLeads = JSON.parse(localStorage.getItem("purple_dragon_leads_list") || "[]");
      const newLead = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        phone: phone || null,
        email: email || null,
        license: smsConsent ? "SMS-OPT-IN" : "EMAIL-OPT-IN",
        message: message || "General Contact Inquiry",
        categories: selectedCategories,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem("purple_dragon_leads_list", JSON.stringify([newLead, ...existingLeads]));

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setFormError("Signup failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background relative text-foreground">
      <Navbar cartCount={0} onOpenCart={() => {}} />

      {/* Main Content Area */}
      <section className="pt-32 pb-24 px-8 max-w-[1800px] mx-auto min-h-[calc(100vh-80px)] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-start">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-32">
            <div className="flex flex-col gap-4">
              <span className="mono-label text-purple-400/40 text-xs">Store Updates</span>
              <h1 className="boutique-title text-6xl md:text-7xl uppercase font-black tracking-tighter text-white leading-none">
                GET DEALS &amp; DROP ALERTS
              </h1>
            </div>

            <p className="text-purple-100/90 text-sm font-light leading-relaxed max-w-xl">
              Oklahoma menus move fast. Leave a phone number if you want text updates, or use email only. No text signup is required.
            </p>

            <div className="h-[1px] w-full bg-purple-900/20" />

            {/* Direct contact list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <span className="mono-label text-purple-300/20 !text-[8px]">Store Phone</span>
                <span className="mono-label text-white font-black tracking-widest text-xs">{siteConfig.phone}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="mono-label text-purple-300/20 !text-[8px]">Demo Contact</span>
                <span className="mono-label text-white font-black tracking-widest text-xs">jesse@580di.com</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="mono-label text-purple-300/20 !text-[8px]">Location</span>
                <span className="mono-label text-white font-mono text-xs leading-relaxed">
                  {siteConfig.address}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="mono-label text-purple-300/20 !text-[8px]">Curbside Hours</span>
                <span className="mono-label text-white font-mono text-xs leading-relaxed">
                  Mon – Sat: 9am – 10pm<br />Sun: 12pm – 8pm
                </span>
              </div>
            </div>

            {/* Compliance Badge */}
            <div className="border border-purple-800/30 bg-[#0d071a]/40 p-6 flex items-start gap-4 max-w-xl">
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse mt-1" />
              <div className="flex flex-col gap-1">
                <span className="mono-label text-white font-black text-[9px] uppercase tracking-widest">Medical Cannabis Notice</span>
                <p className="text-[10px] text-purple-200/80 leading-relaxed font-mono">
                  This demo signup is for store updates and lead capture. Oklahoma medical marijuana purchases require a valid OMMA patient license and photo ID at pickup.
                </p>
              </div>
            </div>
          </div>

          {/* Lead Leak / Contact Form Column */}
          <div className="border border-purple-800/30 bg-[#0d071a]/20 p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 blur-[100px] pointer-events-none" />

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col gap-2">
                    <span className="mono-label text-purple-400/40 !text-[8px]">Deal Alerts</span>
                    <h2 className="boutique-title text-3xl font-black text-white uppercase tracking-tight">
                      Contact Preferences
                    </h2>
                  </div>

                  <div className="h-[1px] w-full bg-purple-900/20" />

                  <div className="flex flex-col gap-4">
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="mono-label text-purple-300/40 !text-[8px]">Full Name (Required)</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-purple-950/10 border border-purple-800/30 p-3 text-sm text-purple-200 focus:outline-none focus:border-yellow-400 transition-colors font-mono"
                      />
                    </div>

                    {/* Mobile Number */}
                    <div className="flex flex-col gap-1.5">
                      <label className="mono-label text-purple-300/40 !text-[8px]">Mobile Number</label>
                      <input
                        type="tel"
                        placeholder="+1 (580) 555-0199"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-purple-950/10 border border-purple-800/30 p-3 text-sm text-purple-200 focus:outline-none focus:border-yellow-400 transition-colors font-mono"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col gap-1.5">
                      <label className="mono-label text-purple-300/40 !text-[8px]">Email Address</label>
                      <input
                        type="email"
                        placeholder="patient@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-purple-950/10 border border-purple-800/30 p-3 text-sm text-purple-200 focus:outline-none focus:border-yellow-400 transition-colors font-mono"
                      />
                    </div>

                    {/* Preferences Checkboxes */}
                    <div className="flex flex-col gap-2 mt-2">
                      <label className="mono-label text-purple-300/40 !text-[8px] mb-1">Alert Preferences</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {categories.map((cat) => {
                          const active = selectedCategories.includes(cat.key);
                          return (
                            <button
                              key={cat.key}
                              type="button"
                              onClick={() => handleCategoryToggle(cat.key)}
                              className={`flex items-center justify-between border p-3 font-mono text-[9px] tracking-wider uppercase transition-all duration-300 ${
                                active
                                  ? "bg-yellow-500 text-black border-yellow-400 font-bold"
                                  : "bg-purple-950/10 text-purple-300/60 border-purple-800/30 hover:border-yellow-400/50"
                              }`}
                            >
                              <span>{cat.label}</span>
                              <span className="font-bold">{active ? "✓" : "+"}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5 mt-2">
                      <label className="mono-label text-purple-300/40 !text-[8px]">Message (Optional)</label>
                      <textarea
                        rows={3}
                        placeholder="Tell us what kind of alerts you want, or leave a note for the demo walkthrough."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="bg-purple-950/10 border border-purple-800/30 p-3 text-sm text-purple-200 focus:outline-none focus:border-yellow-400 transition-colors font-mono resize-none leading-relaxed"
                      />
                    </div>

                    <label className="flex items-start gap-3 mt-1 cursor-pointer group select-none">
                      <input
                        type="checkbox"
                        checked={smsConsent}
                        onChange={(e) => setSmsConsent(e.target.checked)}
                        className="w-4 h-4 rounded-none border border-purple-800/30 bg-purple-950/10 text-black accent-yellow-400 mt-0.5 shrink-0 cursor-pointer"
                      />
                      <span className="text-[9px] text-purple-300/50 leading-relaxed font-mono group-hover:text-purple-300/80 transition-colors">
                        Optional text alerts: I agree to receive marketing text messages from {siteConfig.storeName} at the phone number provided. Message frequency may vary. Reply STOP to opt out. Email alerts do not require SMS consent.
                      </span>
                    </label>
                  </div>

                  {formError && (
                    <span className="text-[10px] text-red-500 font-mono tracking-tight text-center">{formError}</span>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mono-label border border-yellow-400 py-4 bg-yellow-500 text-black hover:bg-transparent hover:text-yellow-400 transition-all font-black text-center text-[10px] w-full flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Saving...</span>
                    ) : (
                      "Submit Preferences"
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-8 text-center py-12"
                >
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto text-black font-black text-2xl shadow-xl border border-yellow-400">
                    ✓
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <h3 className="mono-label text-yellow-400 font-black tracking-widest text-[14px] uppercase">
                      Preferences Saved
                    </h3>
                    <p className="text-purple-100/90 text-xs font-mono leading-relaxed max-w-sm mx-auto">
                      Thank you, <span className="text-white font-bold">{name}</span>. Your alert preferences were saved.
                    </p>
                    <p className="text-purple-200/80 text-[11px] leading-relaxed font-mono max-w-xs mx-auto">
                      Future alerts can be sent by {smsConsent && phone ? "text" : "email"} to <span className="text-white font-bold">{smsConsent && phone ? phone : email}</span>.
                    </p>
                  </div>

                  <button 
                    onClick={() => {
                      setIsSuccess(false);
                      setName("");
                      setPhone("");
                      setEmail("");
                      setMessage("");
                      setSmsConsent(false);
                      setSelectedCategories([]);
                    }}
                    className="mono-label border border-purple-800/30 text-purple-200 hover:border-yellow-400 hover:bg-purple-950/20 hover:text-yellow-400 transition-all font-black text-center text-[9px] cursor-pointer max-w-xs mx-auto w-full mt-4"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-purple-950/20 bg-black">
        <div className="max-w-[1800px] mx-auto px-8 flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="flex flex-col gap-4">
            <h4 className="boutique-title text-4xl font-extrabold uppercase text-purple-200">{siteConfig.storeName.toUpperCase()}</h4>
            <p className="mono-label !text-[8px] text-purple-200/70 max-w-[320px] leading-relaxed">
              MEDICAL CANNABIS. ACCESSORIES. DEALS. CURBSIDE PICKUP ON GORE.
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-2 text-right">
            <span className="mono-label !text-[8px] text-purple-200/55 tracking-[0.2em] font-mono">Patient Over Profit</span>
            <span className="mono-label !text-[8px] text-purple-200/40 tracking-[0.2em] font-mono">© 2026 {siteConfig.storeName}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
