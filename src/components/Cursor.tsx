
import React, { useEffect, useState } from 'react';

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const addSparkle = (x: number, y: number) => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      
      // Random colors for the sparkles
      const colors = ['#FF80AB', '#CCFFCC', '#FFE082', '#D0A9F5', '#81D4FA'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      sparkle.style.backgroundColor = randomColor;
      sparkle.style.boxShadow = `0 0 6px ${randomColor}, 0 0 12px ${randomColor}`;
      
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 500);
    };

    const updatePosition = (e: MouseEvent) => {
      setVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add sparkles more frequently
      if (Math.random() > 0.5) {
        addSparkle(e.clientX, e.clientY);
      }
    };

    const hideOnLeave = () => setVisible(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseout', hideOnLeave);
    window.addEventListener('mouseover', () => setVisible(true));

    // Make links and clickable elements change cursor size
    const handleLinkHover = () => {
      setIsHovering(true);
    };

    const handleLinkLeave = () => {
      setIsHovering(false);
    };

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseover', handleLinkHover);
      el.addEventListener('mouseout', handleLinkLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseout', hideOnLeave);
      window.removeEventListener('mouseover', () => setVisible(true));

      interactiveElements.forEach(el => {
        el.removeEventListener('mouseover', handleLinkHover);
        el.removeEventListener('mouseout', handleLinkLeave);
      });
    };
  }, []);

  // Y2K style cursor with star shape
  return (
    <>
      <div
        className={`cursor ${visible ? 'opacity-100' : 'opacity-0'} ${isHovering ? 'scale-150' : ''} transition-transform transition-opacity`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          boxShadow: isHovering ? '0 0 15px #FF80AB, 0 0 25px #FF80AB' : '0 0 8px #830c4f, 0 0 15px #830c4f',
          backgroundColor: isHovering ? '#FF80AB' : '#830c4f',
        }}
      />
      
      {/* Additional star cursor that follows with delay */}
      <div 
        className={`fixed w-5 h-5 text-nirvika-sparkle pointer-events-none z-40 ${visible ? 'opacity-70' : 'opacity-0'}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.3s ease-out, top 0.3s ease-out',
          fontSize: '20px',
        }}
      >
        ★
      </div>
    </>
  );
};

export default Cursor;
