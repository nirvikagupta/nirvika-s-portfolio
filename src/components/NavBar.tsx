
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedDropdown from './AnimatedDropdown';

const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'About Me', href: '/about' },
    { label: 'Skills', href: '/skills' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-nirvika-primary bg-opacity-95 shadow-md' 
          : 'bg-nirvika-primary bg-opacity-90 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-8">
          {navigationItems.map((item, index) => (
            <NavLink key={index} href={item.href} label={item.label} />
          ))}
        </nav>
        
        {/* Mobile navigation dropdown */}
        <div className="md:hidden w-40">
          <AnimatedDropdown 
            trigger="Menu" 
            items={navigationItems}
          />
        </div>
        
        <Link to="/" className="flex items-center">
          <div className="relative">
            <img 
              src="/lovable-uploads/ac32fd1e-8b60-40c2-8da1-5cb98bb0883b.png" 
              alt="Nirvika's Logo" 
              className="h-12 w-auto animate-pulse"
            />
            <div className="absolute inset-0 bg-nirvika-sparkle opacity-20 blur-md rounded-full animate-pulse"></div>
            <span className="absolute -top-2 -left-2 text-nirvika-sparkle animate-sparkle text-xl">★</span>
            <span className="absolute -bottom-2 -right-2 text-nirvika-sparkle animate-sparkle text-xl" style={{ animationDelay: '0.5s' }}>★</span>
            <span className="absolute top-0 right-0 text-nirvika-yellow animate-sparkle text-xl" style={{ animationDelay: '1s' }}>★</span>
          </div>
        </Link>
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label }) => {
  return (
    <Link
      to={href}
      className="text-nirvika-text font-medium relative group"
    >
      {label}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nirvika-cursor transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
};

export default NavBar;
