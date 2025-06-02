import { HeroSection } from "@/components/home/hero-section";
import { FeatureSection } from "@/components/home/feature-section";
import { TestimonialSection } from "@/components/home/testimonial-section";
import { CTASection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection />
        <FeatureSection />
        <TestimonialSection />
        <CTASection />
      </main>
    </div>
  );
}