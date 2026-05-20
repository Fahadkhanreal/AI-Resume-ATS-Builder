"use client";

import { HeroSection } from "@/components/landing/HeroSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TemplatesSection } from "@/components/landing/TemplatesSection";
import { Footer } from "@/components/landing/Footer";

export function HomePageClient() {
  return (
    <div>
      <HeroSection />
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <StatsSection />
        </div>
      </div>
      <HowItWorks />
      <TemplatesSection />
      <Footer />
    </div>
  );
}
