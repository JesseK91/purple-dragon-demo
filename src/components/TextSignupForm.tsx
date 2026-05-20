"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@/lib/analytics";
import { ShieldCheck, Bell } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

interface TextSignupFormProps {
  sourceTag: string;
  defaultInterest?: string;
  primaryCtaText?: string;
}

export default function TextSignupForm({
  sourceTag,
  defaultInterest = "Fresh Drops",
  primaryCtaText = "Save Alert Preferences"
}: TextSignupFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState(defaultInterest);
  const [smsConsent, setSmsConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const interests = [
    "Flower",
    "Carts",
    "Edibles",
    "Concentrates",
    "Pre-rolls",
    "Budget Deals",
    "Fresh Drops",
    "Birthday Deals",
    "Veteran Specials",
    "First-Time Offers"
  ];

  const handleInterestSelect = (selected: string) => {
    setInterest(selected);
    track("category_interest_selected", { interest: selected, source: sourceTag });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!phone.trim() && !email.trim()) {
      setErrorMessage("Please enter a phone number or an email address.");
      return;
    }

    if (phone.trim() && !smsConsent && !email.trim()) {
      setErrorMessage("Enter an email address or check the text-message consent box.");
      return;
    }

    setIsSubmitting(true);
    track("text_signup_started", { source: sourceTag, interest });

    try {
      const response = await fetch("/api/lead-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          phone: phone || null,
          email: email || null,
          service_type: interest,
          property_type: "retail",
          urgency: "NORMAL",
          message: `Text signup alert preference: ${interest}`,
          source: sourceTag,
          metadata: {
            sms_opt_in: Boolean(phone.trim() && smsConsent),
            email_opt_in: Boolean(email.trim()),
            categories: [interest.toLowerCase().replace(" ", "_")],
          }
        }),
      });

      if (!response.ok) throw new Error("Lead Guard VIP intake failed");

      track("text_signup_completed", {
        source: sourceTag,
        name,
        phone: phone || undefined,
        email: email || undefined,
        interest,
        consentCheckbox: smsConsent
      });
      
      // Save leads locally to localStorage for Owner Growth Dashboard visibility!
      const existingLeads = JSON.parse(localStorage.getItem("purple_dragon_leads_list") || "[]");
      const newLead = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        phone: phone || null,
        email: email || null,
        license: smsConsent ? "SMS-OPT-IN" : "EMAIL-OPT-IN",
        message: `Alert intake from: ${sourceTag}`,
        categories: [interest.toLowerCase().replace(" ", "_")],
        timestamp: new Date().toISOString()
      };
      localStorage.setItem("purple_dragon_leads_list", JSON.stringify([newLead, ...existingLeads]));

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMessage("Signup failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border border-purple-900/30 bg-purple-950/80/20 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/5 blur-[80px] pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="signup-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Bell size={12} className="text-yellow-400 animate-bounce" />
                <span className="mono-label text-purple-300/40 !text-[8px]">Deal Alerts</span>
              </div>
              <h3 className="boutique-title text-3xl font-black text-white uppercase tracking-tight">
                Get Deal Alerts
              </h3>
              <p className="text-purple-100/90 text-xs font-light leading-relaxed">
                Pick what you actually care about. Email is fine. Texts are optional and only apply if you choose to receive them.
              </p>
            </div>

            <div className="h-[1px] w-full bg-purple-900/20" />

            <div className="flex flex-col gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="mono-label text-purple-300/40 !text-[8px]">First Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Justin"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-purple-950/10 border border-purple-800/30 p-3 text-sm text-purple-200 focus:outline-none focus:border-yellow-400 transition-colors font-mono"
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                <label className="mono-label text-purple-300/40 !text-[8px]">Mobile Phone</label>
                <input
                  type="tel"
                  placeholder="e.g. +1 (580) 555-0199"
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
                  placeholder="e.g. patient@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-purple-950/10 border border-purple-800/30 p-3 text-sm text-purple-200 focus:outline-none focus:border-yellow-400 transition-colors font-mono"
                />
              </div>

              {/* Interests Selector */}
              <div className="flex flex-col gap-2 mt-2">
                <label className="mono-label text-purple-300/40 !text-[8px]">What should we send you?</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {interests.map((item) => {
                    const isSelected = interest === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleInterestSelect(item)}
                        className={`border p-2.5 font-mono text-[8px] tracking-wider uppercase transition-all duration-300 ${
                          isSelected
                            ? "bg-yellow-500 text-black border-yellow-400 font-bold"
                            : "bg-purple-950/10 text-purple-300/60 border-purple-800/30 hover:border-yellow-400/50"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SMS Consent Checkbox */}
              <label className="flex items-start gap-3 mt-3 cursor-pointer group select-none">
                <input
                  type="checkbox"
                  checked={smsConsent}
                  onChange={(e) => setSmsConsent(e.target.checked)}
                  className="w-4 h-4 rounded-none border border-purple-800/30 bg-purple-950/10 text-black accent-yellow-400 mt-0.5 shrink-0 cursor-pointer"
                />
                <span className="text-[9px] text-purple-200/80 leading-relaxed font-mono group-hover:text-purple-100 transition-colors">
                  Optional text alerts: I agree to receive marketing text messages from {siteConfig.storeName} at the phone number provided. Message frequency may vary. Reply STOP to opt out. This is not required for email alerts.
                </span>
              </label>
              <p className="text-[9px] text-purple-200/70 leading-relaxed font-mono">
                Email alerts do not require SMS consent. OMMA patient license and photo ID are required for purchases.
              </p>
            </div>

            {errorMessage && (
              <span className="text-[10px] text-red-500 font-mono tracking-tight text-center">{errorMessage}</span>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mono-label border border-yellow-400 py-4 bg-yellow-500 text-black hover:bg-transparent hover:text-yellow-400 transition-all font-black text-center text-[10px] w-full flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Saving...</span>
              ) : (
                primaryCtaText
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="signup-success"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-8 text-center py-8"
          >
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto text-black font-black text-xl shadow-xl border border-yellow-400">
              ✓
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="mono-label text-white font-black tracking-widest text-[13px] uppercase font-mono">
                You're on the list
              </h3>
              <p className="text-purple-100/95 text-xs font-mono leading-relaxed max-w-sm mx-auto uppercase">
                Thanks, <span className="text-white font-bold">{name}</span>. We saved your interest in <span className="text-white font-bold">{interest}</span> alerts.
              </p>
              <div className="border border-purple-900/30 bg-purple-950/80/40 p-4 flex items-center gap-3 max-w-xs mx-auto mt-2">
                <ShieldCheck size={14} className="text-yellow-400 shrink-0" />
                <span className="text-[9px] text-purple-200/80 font-mono leading-relaxed text-left uppercase">
                  Alert Preferences Secured. You will receive updates about {interest} drops at the contact details provided.
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsSuccess(false);
                setName("");
                setPhone("");
                setEmail("");
                setSmsConsent(false);
              }}
              className="mono-label border border-purple-800/30 text-purple-200 hover:border-yellow-400 hover:text-yellow-400 hover:bg-purple-950/20 transition-all font-black text-center text-[9px] cursor-pointer max-w-xs mx-auto w-full mt-4 font-mono uppercase"
            >
              Edit Preferences
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
