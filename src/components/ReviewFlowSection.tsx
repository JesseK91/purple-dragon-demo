"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { track } from "@/lib/analytics";
import { Star, ShieldAlert, Check, X, ShieldCheck } from "lucide-react";

export default function ReviewFlowSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [formError, setFormError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("modal-visibility-change", {
        detail: { open: isModalOpen },
      }),
    );
  }, [isModalOpen]);

  const handleGoogleReview = () => {
    track("google_review_click", { url: siteConfig.googleReviewUrl });
    window.open(siteConfig.googleReviewUrl, "_blank");
  };

  const handlePrivateFeedbackOpen = () => {
    track("private_feedback_open");
    setIsModalOpen(true);
    setSubmitSuccess(false);
    setFormError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim()) {
      setFormError("Please enter your name.");
      return;
    }

    if (!contact.trim()) {
      setFormError("Please provide a phone number or email address.");
      return;
    }

    if (!message.trim()) {
      setFormError("Please write a short description of your experience.");
      return;
    }

    track("private_feedback_submit", {
      name,
      contact,
      message,
      rating,
    });

    setSubmitSuccess(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setName("");
      setContact("");
      setMessage("");
      setRating(5);
      setSubmitSuccess(false);
    }, 4000);
  };

  return (
    <section className="py-24 px-8 bg-[#05010a] border-t border-purple-950/20 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-10 items-center text-center">
        
          <div className="flex flex-col gap-2 max-w-xl">
            <span className="mono-label text-purple-400 text-[9px] uppercase tracking-[0.3em] font-mono">
            How Was Your Visit?
            </span>
            <h2 className="boutique-title text-3xl sm:text-4xl md:text-5xl uppercase font-black text-white leading-tight">
            Tell us how the visit went.
            </h2>
            <p className="text-purple-200/60 text-xs font-light leading-relaxed mt-2">
            Leave a public review or share private feedback with the store team. Both options are available from the same page.
            </p>
          </div>

        {/* Action Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mt-4">
          
          {/* Public Review */}
          <div className="bg-[#0c0517] border border-purple-900/20 p-8 flex flex-col justify-between items-center gap-6 group hover:border-yellow-500/30 hover:bg-purple-950/20 transition-all duration-300">
            <div className="flex flex-col items-center gap-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <h3 className="mono-label text-purple-200 font-bold text-xs uppercase tracking-widest mt-1 font-mono">
                Public Review
              </h3>
              <p className="text-[10px] text-purple-300/50 leading-relaxed font-mono px-4 uppercase">
                Leave a public review to help other shoppers and patients evaluate the store.
              </p>
            </div>
            <button
              onClick={handleGoogleReview}
              className="w-full mono-label border border-yellow-400 py-3 bg-yellow-500 text-black hover:bg-transparent hover:text-yellow-400 transition-all font-black text-[9px] cursor-pointer uppercase"
            >
              Leave a Google Review
            </button>
          </div>

          {/* Private Feedback */}
          <div className="bg-[#0c0517] border border-purple-900/20 p-8 flex flex-col justify-between items-center gap-6 group hover:border-yellow-500/30 hover:bg-purple-950/20 transition-all duration-300">
            <div className="flex flex-col items-center gap-3">
              <ShieldCheck size={24} className="text-purple-400 group-hover:text-yellow-400 transition-colors" />
              <h3 className="mono-label text-purple-200 font-bold text-xs uppercase tracking-widest mt-1 font-mono">
                Private Remarks
              </h3>
              <p className="text-[10px] text-purple-300/50 leading-relaxed font-mono px-4 uppercase">
                If something was off, send private feedback directly to the store team.
              </p>
            </div>
            <button
              onClick={handlePrivateFeedbackOpen}
              className="mono-label border border-purple-800/30 w-full py-3 text-purple-200 hover:border-yellow-400 hover:text-yellow-400 hover:bg-purple-950/20 transition-all font-black text-[9px] cursor-pointer uppercase"
            >
              Send Private Feedback
            </button>
          </div>

        </div>

      </div>

      {/* Private Feedback Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitSuccess && setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md bg-[#0d071a] border border-purple-900/30 p-8 flex flex-col gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-purple-300/40 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col gap-2">
                <span className="mono-label text-purple-400 tracking-[0.2em] text-[8px] uppercase font-mono">Store Team</span>
                <h3 className="boutique-title text-3xl font-black text-white">Private Feedback</h3>
                <p className="text-purple-200/60 text-xs font-light leading-relaxed">
                  Your comments are delivered directly to store management for follow-up.
                </p>
              </div>

              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8 gap-4 border border-purple-900/20 bg-purple-950/20 rounded-sm"
                >
                  <div className="w-12 h-12 bg-yellow-500 text-black rounded-full flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div className="flex flex-col items-center text-center px-6">
                    <span className="mono-label text-white font-bold text-xs uppercase tracking-widest font-mono font-bold">Feedback Logged</span>
                    <span className="text-[10px] text-purple-300/60 font-mono mt-2 leading-relaxed uppercase">
                      Thank you. Your note was saved for the store team to review.
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
                    <label className="mono-label text-purple-400/55 text-[8px] uppercase font-mono">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Jesse Killian"
                      className="bg-purple-950/10 border border-purple-900/30 px-4 py-3 text-purple-100 text-sm font-mono focus:border-yellow-400 focus:outline-none transition-colors rounded-sm placeholder:text-purple-400/30"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="mono-label text-purple-400/55 text-[8px] uppercase font-mono">Contact Endpoint (Phone or Email)</label>
                    <input
                      type="text"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="e.g. (580) 555-0199 or jesse@example.com"
                      className="bg-purple-950/10 border border-purple-900/30 px-4 py-3 text-purple-100 text-sm font-mono focus:border-yellow-400 focus:outline-none transition-colors rounded-sm placeholder:text-purple-400/30"
                    />
                  </div>

                  {/* Rating Selector */}
                  <div className="flex flex-col gap-2">
                    <label className="mono-label text-purple-400/55 text-[8px] uppercase font-mono">Rating</label>
                    <div className="flex gap-2 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className={`w-10 h-10 border flex items-center justify-center font-mono text-xs rounded-sm transition-all cursor-pointer ${
                            rating >= star
                              ? "bg-yellow-500 text-black border-yellow-400 font-bold"
                              : "bg-[#0c0517] text-purple-400 border-purple-900/30 hover:border-yellow-400/50"
                          }`}
                        >
                          {star} <Star size={10} className="ml-0.5 fill-current shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="mono-label text-purple-400/55 text-[8px] uppercase font-mono">Feedback Details</label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Share your experience here..."
                      className="bg-purple-950/10 border border-purple-900/30 px-4 py-3 text-purple-100 text-sm font-mono focus:border-yellow-400 focus:outline-none transition-colors rounded-sm placeholder:text-purple-400/30 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mono-label border border-yellow-400 py-4 bg-yellow-500 text-black hover:bg-transparent hover:text-yellow-400 transition-all font-black text-center text-[10px] cursor-pointer uppercase mt-2"
                  >
                    Submit Private Feedback
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
