import React, { useEffect, useRef } from 'react';
import { Sparkles, Star, Heart } from 'lucide-react';

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0', 'animate-fadeUp');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Main About Section */}
      <section
        id="about"
        className="h-[400px] bg-gradient-to-r from-pink-200 via-purple-100 to-pink-200 relative overflow-hidden"
        ref={sectionRef}
      >
        {/* Animated sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-sparkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              <Sparkles className="w-4 h-4 text-pink-400" />
            </div>
          ))}
        </div>

        {/* Layered visual elements */}
        <div className="absolute top-[100px] left-[200px] transform scale-[2.20] z-[1] hover:scale-[2.3] transition-transform duration-300">
          <img src="/heartbgnirv.png" alt="Heart Graphic" className="h-[200px] w-auto object-contain drop-shadow-lg" />
        </div>

        <div className="absolute bottom-[0px] left-[620px] z-[2]">
          <p className="text-[#b84c65] opacity-[45%] text-[100px] font-bold font-tan-buster tracking-wide uppercase leading-none">
            NIRVIKA
          </p>
        </div>

        <div className="absolute top-[140px] left-[560px] transform scale-[3.3] z-[3] hover:scale-[3.4] transition-all duration-300 hover:rotate-[-5deg]">
          <img src="/filmstrip.png" alt="Filmstrip" className="h-[120px] w-auto object-contain drop-shadow-xl" />
        </div>

        <div className="absolute top-[-120px] left-[750px] z-[4] animate-float-text">
          <img src="/stars.png" alt="Stars Decoration" className="w-[600px] h-auto object-contain" />
        </div>

        <div className="absolute top-[50px] left-[300px] transform scale-[1.8] z-[4] hover:scale-[1.9] transition-all duration-300">
          <img src="/gradpinknirv.png" alt="Decorative" className="h-[260px] w-auto object-contain animate-pulse" />
        </div>

        <section className="h-[400px] bg-transparent relative overflow-hidden">
          <div className="absolute right-[0px] top-[50%] transform -translate-y-1/2 z-10 scale-[1.5] hover:scale-[1.6] transition-all duration-300 hover:rotate-2">
            <img src="/magnews.png" alt="Mag News" className="h-[300px] w-auto object-contain drop-shadow-2xl" style={{ backgroundColor: 'transparent' }} />
          </div>
        </section>

        <div className="absolute inset-0 pointer-events-none z-30">
          <Star className="absolute top-10 left-10 w-6 h-6 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
          <Heart className="absolute bottom-10 right-10 w-6 h-6 text-pink-400 animate-bounce" />
          <Star className="absolute top-20 right-20 w-4 h-4 text-purple-400 animate-pulse" />
        </div>

        {/* About Me Text */}
        <div className="container px-4 mx-auto h-full flex items-center opacity-0 translate-y-10 transition-all duration-1000 ease-out relative z-20">
          <div className="w-full max-w-2xl backdrop-blur-sm bg-white/30 p-6 rounded-xl border border-white/50 shadow-xl">
            <h2 className="text-2xl font-bold mb-2 text-gray-800 font-tan-newyork bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-sm text-gray-700 mb-2 text-shadow">
              Hey! I’m Nirvika, a 19-year-old undergrad at IIIT-Delhi, studying Computer Science and Design.
              I did my schooling at Gyeonggi Suwon International School, where I first fell in love with graphic
              design while working on our yearbook team. Tools like Photoshop, InDesign, and Illustrator were
              my creative playground—and still are.
            </p>
            <p className="text-sm text-gray-700 mb-2 text-shadow">
              Now at IIITD, I’m diving deeper into the world of tech and design, building everything from coding
              projects in Python, Java, and C++ to front-end experiments with HTML, CSS, and JavaScript.
              I’m all about exploring creative ways to solve real-world problems—and design, for me, is exactly that:
              a blend of imagination and intention.
            </p>
            <p className="text-sm text-gray-700 mb-2 text-shadow">
              My design style? Think Y2K, bold, playful, and unapologetically fun, just like me. When I’m not glued to
              my laptop, you’ll probably find me dancing, playing badminton or volleyball, or trying out new recipes
              in the kitchen.
            </p>
            <p className="text-sm text-gray-700 mb-2 text-shadow">
              Let’s connect and create something awesome together! ✨
            </p>
            <a 
              href="/contact" 
              className="mt-4 bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white text-sm font-medium px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg inline-block transform hover:scale-105 hover:-translate-y-1"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* Snapshot Section */}
      <section 
        id="snapshot" 
        className="relative bg-gradient-to-r from-pink-200 via-purple-100 to-pink-200 py-20 px-6 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-sparkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              <Sparkles className="w-4 h-4 text-pink-400" />
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center transform hover:scale-[1.02] transition-all duration-500">
          <div className="backdrop-blur-sm bg-white/30 p-10 rounded-3xl border-2 border-white/40 shadow-2xl hover:shadow-pink-200/50 transition-all duration-300">
          <h3 
          className="text-3xl md:text-4xl font-amoria mb-6 tracking-wide glitch"
          data-text="Creative Snapshot"
          >
          Creative Snapshot
          </h3>

            <div className="absolute top-5 right-5 transform hover:rotate-180 transition-all duration-500 cursor-pointer">
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="absolute bottom-5 left-5 transform hover:scale-150 transition-all duration-500 cursor-pointer">
              <Heart className="w-8 h-8 text-pink-400" />
            </div>

            <div className="space-y-6">
              <p className="text-md md:text-lg text-gray-800 leading-relaxed font-medium hover:text-pink-700 transition-colors duration-300">
              Hey! I’m Nirvika, a 19-year-old undergrad at IIIT-Delhi, studying Computer Science and Design. I did my schooling at Gyeonggi Suwon International School, where I first fell in love with graphic design while working on our yearbook team. Tools like Photoshop, InDesign, and Illustrator were my creative playground—and still are.
              </p>

              <p className="text-md md:text-lg text-gray-800 leading-relaxed font-medium hover:text-pink-700 transition-colors duration-300">
              Now at IIITD, I’m diving deeper into the world of tech and design, building everything from coding projects in Python, Java, and C++ to front-end experiments with HTML, CSS, and JavaScript. I’m all about exploring creative ways to solve real-world problems—and design, for me, is exactly that: a blend of imagination and intention.
              </p>

              <p className="text-md md:text-lg text-gray-800 leading-relaxed font-medium hover:text-pink-700 transition-colors duration-300">
              My design style? Think Y2K, bold, playful, and unapologetically fun, just like me. When I’m not glued to my laptop, you’ll probably find me dancing, playing badminton or volleyball, or trying out new recipes in the kitchen.

              </p>

              <p className="text-md md:text-lg text-gray-800 leading-relaxed font-medium hover:text-pink-700 transition-colors duration-300">
              Let’s connect and create something awesome together! ✨
              </p>

            </div>
            <button
              className="mt-8 bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 
                       text-white text-sm font-medium px-6 py-2 rounded-full transition-all duration-300 
                       shadow-md hover:shadow-lg transform hover:scale-105 hover:-translate-y-1"
                        onClick={() => {
            const el = document.getElementById('snapshot');
            el?.classList.add('animate-pulse');

            // Add glow effect to button
            const btn = document.getElementById('magic-btn');
            btn?.classList.add('ring-4', 'ring-pink-300', 'ring-offset-2', 'shadow-xl');

            setTimeout(() => {
              el?.classList.remove('animate-pulse');
              btn?.classList.remove('ring-4', 'ring-pink-300', 'ring-offset-2', 'shadow-xl');
            }, 1000);

            // Create floating sparkles
            const sparkleContainer = document.createElement('div');
            sparkleContainer.className = 'absolute inset-0 z-50 pointer-events-none';
            document.body.appendChild(sparkleContainer);

            for (let i = 0; i < 12; i++) {
              const sparkle = document.createElement('div');
              sparkle.className = 'magic-sparkle';
              sparkle.style.left = `${50 + Math.random() * 100 - 50}%`;
              sparkle.style.top = `${window.innerHeight / 2}px`;

              sparkle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>`;

              sparkleContainer.appendChild(sparkle);

              setTimeout(() => sparkle.remove(), 1200);
            }

            // Clean up container
            setTimeout(() => sparkleContainer.remove(), 1300);
          }}
            >
              
              ✨ Spark Some Magic ✨
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;