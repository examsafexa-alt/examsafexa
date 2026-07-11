import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { Stats } from "@/components/landing/Stats";
import { CommunityHighlight } from "@/components/landing/CommunityHighlight";
import { SafetySection } from "@/components/landing/SafetySection";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { AppComingSoon } from "@/components/landing/AppComingSoon";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Stats />
      <CommunityHighlight />
      <SafetySection />
      <Testimonials />
      <AppComingSoon />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
