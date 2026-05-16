import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ForWhoSection from "@/components/ForWhoSection";
import ServicesSection from "@/components/ServicesSection";
import StepsSection from "@/components/StepsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTABanner from "@/components/CTABanner";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import CookieBanner from "@/components/CookieBanner";

const Index = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ForWhoSection />
      <ServicesSection />
      <StepsSection />
      <TestimonialsSection />
      <CTABanner />
      <AboutSection />
      <FAQSection />
      <ContactForm />
      <Footer />
      <FloatingCTA />
      <CookieBanner />
    </div>
  );
};

export default Index;
