import React from 'react';
import { HeroSplit } from '../components/haven/HeroSplit';
import { IntroStorySection } from '../components/haven/IntroStorySection';
import { FeaturedTemplatesSection } from '../components/haven/FeaturedTemplatesSection';
import { ServicesSection } from '../components/haven/ServicesSection';
import { HowItWorksSection } from '../components/haven/HowItWorksSection';
import { WhyHavenSection } from '../components/haven/WhyHavenSection';
import { PricingPreviewSection } from '../components/haven/PricingPreviewSection';
import { FinalCtaSection } from '../components/haven/FinalCtaSection';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col w-full bg-[#06030e]">
      {/* 1. CINEMATIC HERO */}
      <HeroSplit />

      {/* 2. WHAT HAVEN DOES */}
      <IntroStorySection />

      {/* 3. SELECTED TEMPLATES (NEXUS, VINTAGE, ORBIT) */}
      <FeaturedTemplatesSection />

      {/* 4. SERVICES */}
      <ServicesSection />

      {/* 5. HOW IT WORKS */}
      <HowItWorksSection />

      {/* 6. WHY HAVEN */}
      <WhyHavenSection />

      {/* 7. PRICING PREVIEW */}
      <PricingPreviewSection />

      {/* 8. FINAL CTA */}
      <FinalCtaSection />
    </div>
  );
};
