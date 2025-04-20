
import React from 'react';
import Cursor from "@/components/Cursor";
import NavBar from "@/components/NavBar";
import SkillsSection from "@/components/SkillsSection";
import Footer from "@/components/Footer";
import BackgroundAudio from "@/components/BackgroundAudio";

const Skills = () => {
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
      <div className="pt-36 pb-10 bg-nirvika-bg-light bg-gradient-y2k bg-opacity-50">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-5xl font-bold text-nirvika-text mb-6 font-kaoly">My Skills</h1>
          <p className="text-xl text-nirvika-text opacity-80 max-w-2xl mx-auto">
            Discover the skills and expertise I bring to my projects
          </p>
          
          {/* Sparkle elements */}
          <div className="relative inline-block sparkle-element">
            <span className="absolute -top-4 -left-4 text-nirvika-mint animate-sparkle text-xl">★</span>
            <span className="absolute -bottom-4 -right-4 text-nirvika-babyblue animate-sparkle text-xl" style={{ animationDelay: '1s' }}>★</span>
          </div>
        </div>
      </div>
      <SkillsSection />
      <Footer />
    </div>
  );
};

export default Skills;
