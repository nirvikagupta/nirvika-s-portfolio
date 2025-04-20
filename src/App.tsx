import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import PresenceBanner from './components/PresenceBanner';


const queryClient = new QueryClient();

// Extended interface for Skills component with cleanup method
interface SkillsSectionComponent extends React.FC {
  cleanupAudio?: () => void;
}

// Robust audio cleanup function
const forceStopAllAudio = () => {
  // Stop all HTML audio elements
  document.querySelectorAll("audio").forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
  
  // Stop Audio constructor instances
  if (window.skillsBubblingSounds) {
    window.skillsBubblingSounds.forEach(audio => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    window.skillsBubblingSounds = [];
  }
  
  // Call Skills component cleanup if available
  const SkillsWithCleanup = Skills as SkillsSectionComponent;
  if (typeof SkillsWithCleanup.cleanupAudio === 'function') {
    SkillsWithCleanup.cleanupAudio();
  }
  
  // Flush audio buffers with silent audio
  try {
    const silentAudio = new Audio("data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAACAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV6urq6urq6urq6urq6urq6urq6urq6urq6v////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAYFAAAAAAAAASAiyxaG/////////////////////+IDkwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=");
    silentAudio.volume = 0.1;
    silentAudio.play().then(() => {
      setTimeout(() => {
        silentAudio.pause();
        silentAudio.remove();
      }, 100);
    }).catch(() => {});
  } catch (e) {
    console.log("Failed to play silent audio", e);
  }
};

// Route change handler component
const RouteChangeHandler = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    forceStopAllAudio();
    
    const handleBeforeUnload = () => forceStopAllAudio();
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location.pathname, navigationType]);

  return null;
};

// Global type extension for audio tracking
declare global {
  interface Window {
    skillsBubblingSounds?: HTMLAudioElement[];
  }
}

// Main App component
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <PresenceBanner />
        <RouteChangeHandler />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;