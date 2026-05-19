"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQBlockProps {
  faqs: FAQItem[];
}

export default function FAQBlock({ faqs }: FAQBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      {/* Structured data injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="flex flex-col gap-2 text-center md:text-left">
        <span className="mono-label text-white/40 text-[9px] uppercase tracking-[0.3em]">
          Quick Answers
        </span>
        <h3 className="boutique-title text-3xl font-black text-white uppercase tracking-tight">
          Before You Go
        </h3>
      </div>

      <div className="h-[1px] w-full bg-white/10" />

      <div className="flex flex-col border border-white/10 divide-y divide-white/10 bg-black/40">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="flex flex-col">
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/3 transition-colors cursor-pointer select-none"
              >
                <span className="mono-label text-white font-bold text-xs tracking-wider uppercase pr-6">
                  {faq.question}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-white/40 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-white" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-white/60 text-xs font-light leading-relaxed font-mono border-t border-white/5 bg-white/1">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
