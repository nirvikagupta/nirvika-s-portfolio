import React, { useEffect, useState, useRef } from 'react';
import AvatarWindow from './AvatarWindow'; // Adjust the path if needed

const Hero: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const originalPositions = useRef<{ top: number; left: number }[]>([]);

  useEffect(() => {
    // Add floating stars when component mounts
    createFloatingStars();

    // Initialize letters for the abstract effect
    if (textRef.current) {
      const text = "Nirvika's Portfolio";
      textRef.current.innerHTML = '';

      // Create individual letter spans
      lettersRef.current = Array.from(text).map((letter, index) => {
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = letter;
        span.style.display = 'inline-block';
        span.style.transition = 'all 0.3s ease';
        span.style.position = 'relative';
        textRef.current?.appendChild(span);
        return span;
      });

      // Store original positions
      originalPositions.current = lettersRef.current.map(letter => {
        const rect = letter.getBoundingClientRect();
        const parentRect = textRef.current?.getBoundingClientRect() || { top: 0, left: 0 };
        return {
          top: rect.top - parentRect.top,
          left: rect.left - parentRect.left,
        };
      });
    }

    return () => {
      // Clean up stars when component unmounts
      document.querySelectorAll('.floating-star').forEach(star => star.remove());
    };
  }, []);

  useEffect(() => {
    if (isHovering) {
      // Apply distortion effect
      const interval = setInterval(() => {
        lettersRef.current.forEach((letter, index) => {
          const randomX = (Math.random() - 0.5) * 10;
          const randomY = (Math.random() - 0.5) * 10;
          const randomRotate = (Math.random() - 0.5) * 8;

          letter.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
          letter.style.color = getRandomColor();
        });
      }, 100);

      return () => clearInterval(interval);
    } else {
      // Reset to original positions
      lettersRef.current.forEach((letter, index) => {
        letter.style.transform = 'translate(0, 0) rotate(0deg)';
        letter.style.color = '#5c3754';
      });
    }
  }, [isHovering]);

  const getRandomColor = () => {
    const colors = ['#5c3754', '#e3a0d6', '#FF80AB', '#D0A9F5', '#81D4FA'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const createFloatingStars = () => {
    const starColors = ['#FF80AB', '#CCFFCC', '#FFE082', '#D0A9F5', '#81D4FA'];
    const container = document.querySelector('.hero-container');

    for (let i = 0; i < 15; i++) {
      const star = document.createElement('div');
      star.className = 'floating-star';
      star.innerHTML = '★';
      star.style.fontSize = `${10 + Math.random() * 15}px`;
      star.style.color = starColors[Math.floor(Math.random() * starColors.length)];
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDuration = `${3 + Math.random() * 7}s`;
      star.style.animationDelay = `${Math.random() * 5}s`;

      if (container) {
        container.appendChild(star);
      }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center hero-container">
      <div className="absolute inset-0 bg-gradient-y2k opacity-20 z-0"></div>

      {/* Avatar Window - Left Side */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-start pl-30 -mt-10">
        <AvatarWindow />
      </div>

      <div className="container px-4 mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Text Content - Right Side */}
        <div className="w-full md:w-1/2 text-center md:text-right animate-fade-in-zoom md:ml-[10rem]">
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 font-kaoly portfolio-title"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div ref={textRef} className="glitch-wrapper inline-block">
              Nirvika's <br />
              Portfolio
            </div>
          </h1>
          <p className="text-xl md:text-2xl text-nirvika-text opacity-90 mb-8 font-tan-newyork">
            Welcome to my creative space
          </p>
          <div className="flex justify-center md:justify-end gap-4">
            <a
              href="#projects"
              className="bg-nirvika-secondary hover:bg-nirvika-accent text-white font-medium px-6 py-3 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg y2k-border"
            >
              View My Work
            </a>
            <a
              href="/contact"
              className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm hover:bg-white hover:bg-opacity-70 text-nirvika-text font-medium px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg y2k-border"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-nirvika-text"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
