
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from "@/lib/utils";

interface AnimatedDropdownProps {
  trigger: React.ReactNode;
  items: {
    label: string;
    href?: string;
    onClick?: () => void;
  }[];
  className?: string;
}

const AnimatedDropdown: React.FC<AnimatedDropdownProps> = ({ 
  trigger, 
  items,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {/* Trigger button */}
      <button 
        onClick={toggleDropdown}
        className="flex items-center justify-between bg-white/20 backdrop-blur-sm text-nirvika-text px-4 py-2 rounded-md border border-white/30 hover:bg-white/30 transition-all duration-300 w-full"
      >
        <span>{trigger}</span>
        {isOpen ? 
          <ChevronUp className="ml-2 h-4 w-4 text-nirvika-sparkle animate-bounce" /> : 
          <ChevronDown className="ml-2 h-4 w-4" />
        }
      </button>

      {/* Dropdown menu with animation */}
      <div 
        className={cn(
          "absolute mt-2 w-full rounded-md overflow-hidden backdrop-blur-sm border border-white/30 z-50 transition-all duration-300",
          isOpen 
            ? "opacity-100 translate-y-0 max-h-[400px]" 
            : "opacity-0 translate-y-4 max-h-0 pointer-events-none"
        )}
        style={{ 
          background: 'linear-gradient(90deg, hsla(277, 75%, 84%, 0.7) 0%, hsla(297, 50%, 51%, 0.7) 100%)'
        }}
      >
        <div className="py-1 px-1">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href || "#"}
              onClick={() => {
                if (item.onClick) item.onClick();
                setIsOpen(false);
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className={cn(
                "block px-4 py-2 text-nirvika-text hover:text-white rounded-md transition-all duration-300 relative overflow-hidden",
                activeIndex === index ? "bg-white/20" : ""
              )}
            >
              <span className="relative z-10">{item.label}</span>
              
              {/* Background animation on hover */}
              <div 
                className={cn(
                  "absolute inset-0 transition-transform duration-500 bg-gradient-to-r from-nirvika-sparkle/70 to-nirvika-yellow/70",
                  activeIndex === index ? "translate-x-0" : "-translate-x-full"
                )}
              />
              
              {/* Sparkle effects */}
              {activeIndex === index && (
                <>
                  <span className="absolute top-1 right-2 text-white animate-pulse">✨</span>
                  <span className="absolute bottom-1 left-2 text-white animate-pulse" style={{ animationDelay: '0.3s' }}>✨</span>
                </>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedDropdown;
