import React, { useEffect } from 'react';
import Cursor from "@/components/Cursor";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BackgroundAudio from "@/components/BackgroundAudio";
import { Player } from "@lottiefiles/react-lottie-player";
import AvatarSection from "@/components/AvatarSection";

const Index = () => {
  useEffect(() => {
    document.body.style.cursor = 'none';
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseover', () => {
        document.body.style.cursor = 'none';
      });
    });

    return () => {
      document.body.style.cursor = 'default';
    };
  }, []);

  return (
    <div className="min-h-screen bg-opacity-20 overflow-hidden">
      <Cursor />
      <NavBar />
      <BackgroundAudio />

      <section>
        <Hero />
      </section>

      <AvatarSection/>

      <section>
        <ContactSection />
      </section>

      <Footer />
    </div>
  );
};

export default Index;