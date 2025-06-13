"use client";

import AnimatedBackground from "@/components/AnimatedBackground";
import CTASection from "@/components/CTASection";
import FeatureShowcase from "@/components/FeatureShowcase";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import InteractiveDemo from "@/components/InteractiveDemo";
import ParticleSystem from "@/components/ParticleSystem";

export default function HomePage() {
  return (
    <div className='min-h-screen bg-white relative overflow-hidden'>
      <AnimatedBackground />
      <ParticleSystem />

      <div className='relative z-10'>
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Interactive Demo Section */}
        <section className='py-12 relative'>
          <div className='container mx-auto px-4 max-w-7xl'>
            <InteractiveDemo />
          </div>
        </section>

        {/* Feature Showcase */}
        <section className='py-12 relative'>
          <div className='container mx-auto px-4 max-w-7xl'>
            <FeatureShowcase />
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
