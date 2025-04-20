import React, { useEffect, useState, useRef } from 'react';
import { Sparkle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    skillsBubblingSounds?: HTMLAudioElement[];
  }
}

interface Skill {
  name: string;
  color: string;
}

interface Bubble {
  id: number;
  size: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  color: string;
  isPopped?: boolean;
}

// Interface for burst particles
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  speed: number;
  opacity: number;
}

const skills: Skill[] = [
  { name: "Perseverant", color: "#FEC6A1" },
  { name: "Hardworking and ", color: "#FFDEE2" },
  { name: "Critical Thinker", color: "#E5DEFF" },
  { name: "Creative", color: "#D3E4FD" },
  { name: "Leadership", color: "#F2FCE2" },
  { name: "Communication and Teamwork", color: "#FEF7CD" },
];

const bubbleColors = [
  "rgba(229, 222, 255, 0.6)",
  "rgba(255, 222, 226, 0.6)",
  "rgba(211, 228, 253, 0.6)",
  "rgba(254, 247, 205, 0.6)",
  "rgba(242, 252, 226, 0.6)",
  "rgba(214, 188, 250, 0.6)",
  "rgba(51, 195, 240, 0.6)",
  "rgba(30, 174, 219, 0.6)",
  "rgba(217, 70, 239, 0.6)",
  "rgba(139, 92, 246, 0.6)",
];

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showSkills, setShowSkills] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [burstParticles, setBurstParticles] = useState<Particle[]>([]);
  const popSoundRef = useRef<HTMLAudioElement | null>(null);
  const bubblingAudioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  

  // This effect handles everything related to sound
  useEffect(() => {
    if (window.location.pathname !== '/skills') return;
    bubblingAudioRef.current = new Audio('/bubbling.mp3');
    bubblingAudioRef.current.volume = 0.3;

    window.skillsBubblingSounds = window.skillsBubblingSounds || [];
    window.skillsBubblingSounds.push(bubblingAudioRef.current);

    bubblingAudioRef.current.play().catch(err => {
      console.error("Audio play failed:", err);
    });
  
    
    // Initialize pop sound
    popSoundRef.current = new Audio('/pop.mp3');
    popSoundRef.current.volume = 0.3;
    
    // Fade out bubbling sound after 5 seconds
    const fadeOutStart = setTimeout(() => {
      if (bubblingAudioRef.current) {
        fadeIntervalRef.current = window.setInterval(() => {
          if (bubblingAudioRef.current && bubblingAudioRef.current.volume > 0.05) {
            bubblingAudioRef.current.volume -= 0.05;
          } else {
            if (bubblingAudioRef.current) {
              bubblingAudioRef.current.volume = 0;
              bubblingAudioRef.current.pause();
            }
            if (fadeIntervalRef.current !== null) {
              clearInterval(fadeIntervalRef.current);
              fadeIntervalRef.current = null;
            }
          }
        }, 100);
      }
    }, 3500);
    
    return () => {
      // Immediately stop audio
      if (bubblingAudioRef.current) {
        bubblingAudioRef.current.pause();
        bubblingAudioRef.current.currentTime = 0;
        
        // Remove from global tracker
        window.skillsBubblingSounds = window.skillsBubblingSounds?.filter(
          audio => audio !== bubblingAudioRef.current
        ) || [];
        
        bubblingAudioRef.current = null;
      }
  
      // Clear any fading intervals
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      if (window.location.pathname !== '/skills') {
        if (bubblingAudioRef.current) {
          bubblingAudioRef.current.pause();
          bubblingAudioRef.current.currentTime = 0;
        }
      }
    };
  
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  // This effect handles bubbles and skills visibility
  useEffect(() => {
    // Generate bubbles - increased number to 300 to fill the skills section completely
    const initialBubbles = Array.from({ length: 300 }, (_, i) => ({
      id: i,
      size: 20 + Math.random() * 80,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 5 + Math.random() * 7,
      color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
      isPopped: false
    }));
    setBubbles(initialBubbles);
  
    const skillsTimer = setTimeout(() => {
      setShowSkills(true);
    }, 3500);
  
    return () => {
      clearTimeout(skillsTimer);
    };
  }, []);

  useEffect(() => {
    if (burstParticles.length === 0) return;
    const animateParticles = () => {
      setBurstParticles(prevParticles => 
        prevParticles
          .map(particle => ({
            ...particle,
            x: particle.x + Math.cos(particle.angle) * particle.speed,
            y: particle.y + Math.sin(particle.angle) * particle.speed,
            opacity: particle.opacity - 0.02,
            size: particle.size * 0.97
          }))
          .filter(particle => particle.opacity > 0)
      );
    };
    const animationId = requestAnimationFrame(animateParticles);
    return () => cancelAnimationFrame(animationId);
  }, [burstParticles]);

  const handleBubblePop = (bubbleId: number, event: React.MouseEvent) => {
    const bubbleIndex = bubbles.findIndex(b => b.id === bubbleId);
    if (bubbleIndex === -1 || bubbles[bubbleIndex].isPopped) return;

    const { clientX: x, clientY: y } = event;
    const bubble = bubbles[bubbleIndex];

    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x, y,
      size: 5 + Math.random() * 10,
      color: bubble.color,
      angle: Math.random() * Math.PI * 2,
      speed: 1 + Math.random() * 5,
      opacity: 1
    }));

    setBurstParticles(prev => [...prev, ...newParticles]);
    setBubbles(prev => {
      const updated = [...prev];
      updated[bubbleIndex].isPopped = true;
      return updated;
    });

    if (popSoundRef.current) {
      const soundClone = popSoundRef.current.cloneNode() as HTMLAudioElement;
      soundClone.play().catch(() => {});
    }
  };

  return (
    <section
      id="skills"
      className="py-20 relative overflow-hidden min-h-screen flex items-center justify-center"
      ref={sectionRef}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-nirvika-babyblue to-nirvika-bg-light opacity-70 z-0"></div>

      {/* Bubbles positioned absolutely to cover the entire skills section */}
      <div className="absolute inset-0 overflow-hidden z-10">
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            className={`bubble absolute ${bubble.isPopped ? 'bubble-popped' : ''}`}
            onClick={e => handleBubblePop(bubble.id, e)}
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
              animationDelay: `${bubble.delay}s`,
              animationDuration: `${bubble.duration}s`,
              opacity: bubble.isPopped ? 0 : 0.9,
              zIndex: 5,
              background: bubble.color,
              cursor: 'pointer',
              transition: 'opacity 0.5s ease-out'
            }}
          ></div>
        ))}
      </div>

      {burstParticles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: 0,
            top: 0,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transform: `translate(${particle.x}px, ${particle.y}px)`,
            boxShadow: `0 0 6px ${particle.color}`,
            zIndex: 100
          }}
        />
      ))}

      <div className="container px-4 mx-auto relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className={`skill-bubble transition-all duration-300 ${
                  showSkills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ 
                  transitionDelay: `${3.5 + index * 0.3}s`,
                  backgroundColor: skill.color,
                }}
              >
                <h3 className="text-xl font-medium text-nirvika-text flex items-center justify-center">
                  {skill.name}
                  <Sparkle className="ml-2 text-white animate-sparkle" size={18} />
                </h3>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full opacity-70"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white rounded-full opacity-50"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

(SkillsSection as any).cleanupAudio = () => {
  if (typeof window !== 'undefined') {
    // Stop all bubbling sounds
    window.skillsBubblingSounds?.forEach(audio => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    window.skillsBubblingSounds = [];
  }
};

export default SkillsSection;