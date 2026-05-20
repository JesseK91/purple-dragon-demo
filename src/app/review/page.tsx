"use client";

import Navbar from "@/components/Navbar";
import ReviewFlowSection from "@/components/ReviewFlowSection";
import { siteConfig } from "@/lib/site-config";

export default function ReviewPage() {
  return (
    <main className="min-h-screen bg-background relative text-foreground">
      <Navbar cartCount={0} onOpenCart={() => {}} />

      {/* Main Container */}
      <section className="pt-32 min-h-[calc(100vh-80px)] flex flex-col justify-center">
        <ReviewFlowSection />
      </section>

      {/* Compliance Footer */}
      <footer className="py-12 border-t border-purple-950/20 bg-background">
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <p className="text-[9px] text-purple-200/70 leading-relaxed font-mono">
            {siteConfig.storeName}, {siteConfig.address}. Patient reviews help local medical cardholders decide where to shop. Thank you for the feedback.
          </p>
        </div>
      </footer>
    </main>
  );
}
