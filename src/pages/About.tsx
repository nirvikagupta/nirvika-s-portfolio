
import React from 'react';
import Cursor from "@/components/Cursor";
import NavBar from "@/components/NavBar";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import BackgroundAudio from "@/components/BackgroundAudio";

const About = () => {
  // Disable default cursor
  React.useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'default';
    };
  }, []);

  return (
    <div className="min-h-screen bg-opacity-20">
      <Cursor />
      <NavBar />
      <BackgroundAudio />
      <div className="pt-20 pb-10 bg-nirvika-bg-light bg-gradient-y2k bg-opacity-50">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-5xl font-bold text-nirvika-text mb-6 font-kaoly">About Me</h1>
          <p className="text-xl text-nirvika-text opacity-80 max-w-2xl mx-auto">
            Learn more about who I am and what I do
          </p>
          
          {/* Sparkle elements */}
          <div className="relative inline-block sparkle-element">
            <span className="absolute -top-4 -left-4 text-nirvika-sparkle animate-sparkle text-xl">★</span>
            <span className="absolute -bottom-4 -right-4 text-nirvika-sparkle animate-sparkle text-xl" style={{ animationDelay: '1s' }}>★</span>
          </div>
        </div>
      </div>
      <AboutSection />
      <Footer />
    </div>
  );
};

export default About;
