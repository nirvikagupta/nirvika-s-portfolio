import React, { useState, useEffect } from 'react';

const AvatarWindow: React.FC = () => {
  const [message, setMessage] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [greeting, setGreeting] = useState('Hello!'); // Default greeting before API call

  useEffect(() => {
    // Log something to verify this component is mounting
    console.log("AvatarWindow component mounted");
    
    // Fetch the time based on user's IP
    fetch('https://ipapi.co/json/')
      .then((res) => {
        console.log("IP API response status:", res.status);
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("IP API data received:", data);
        
        // Use the UTC offset from the API to calculate the local time
        const utcOffsetHours = data.utc_offset ? parseInt(data.utc_offset.substring(0, 3), 10) : 0;
        
        // Get current UTC time
        const now = new Date();
        // Calculate user's local time based on UTC offset
        const userLocalHour = (now.getUTCHours() + utcOffsetHours + 24) % 24;
        
        console.log("Calculated local hour:", userLocalHour);
        
        // Determine greeting based on hour
        let greetingMessage = "Good Evening!";
        if (userLocalHour >= 6 && userLocalHour < 12) {
          greetingMessage = "Good Morning!";
        } else if (userLocalHour >= 12 && userLocalHour < 18) {
          greetingMessage = "Good Afternoon!";
        }
        
        console.log("Setting greeting to:", greetingMessage);
        setGreeting(greetingMessage);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
        // Fallback to browser's local time if API fails
        const currentHour = new Date().getHours();
        let fallbackGreeting = "Good Evening!";
        if (currentHour >= 6 && currentHour < 12) {
          fallbackGreeting = "Good Morning!";
        } else if (currentHour >= 12 && currentHour < 18) {
          fallbackGreeting = "Good Afternoon!";
        }
        console.log("Using fallback greeting:", fallbackGreeting);
        setGreeting(fallbackGreeting);
      });
  }, []);

  useEffect(() => {
    if (greeting && typingIndex < greeting.length) {
      const typingTimer = setTimeout(() => {
        setMessage(greeting.substring(0, typingIndex + 1));
        setTypingIndex(typingIndex + 1);
      }, 50);
      return () => clearTimeout(typingTimer);
    }
  }, [typingIndex, greeting]);

  return (
    <div className="relative w-full mt-32 flex justify-start pl-10 md:pl-20 lg:pl-32">
      <div className="bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm rounded-2xl p-5 border-4 border-nirvika-sparkle shadow-xl y2k-border w-fit">
        <div className="relative flex flex-col items-center">
          {/* Avatar */}
          <div className="w-[16rem] md:w-[24rem] lg:w-[28rem] h-[16rem] md:h-[24rem] lg:h-[28rem] mb-4 relative overflow-visible z-10">
            <img 
              src="/lovable-uploads/cd82665a-1b8a-4eb5-83bb-1c7f397d5600.png" 
              alt="Avatar" 
              className="w-full h-full object-contain transition-transform duration-300 hover:scale-105 drop-shadow-lg animate-bounce-slow -translate-x-6" 
            />
          </div>
          {/* Message Bubble */}
          <div className="relative bg-white rounded-2xl p-5 my-4 max-w-lg">
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-nirvika-lavender rounded-full"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-nirvika-babyblue rounded-full"></div>
            <p className="text-nirvika-text font-semibold text-lg leading-relaxed">
              {message} {typingIndex < greeting.length && <span className="animate-ping ml-1">|</span>}
            </p>
          </div>
          {/* Decorative sparkles */}
          <div className="absolute -bottom-4 -left-4 text-nirvika-sparkle animate-sparkle text-xl">★</div>
          <div className="absolute -bottom-4 -right-4 text-nirvika-yellow animate-sparkle text-xl" style={{ animationDelay: '0.8s' }}>★</div>
          <div className="absolute -top-4 -right-8 text-nirvika-lavender animate-sparkle text-xl" style={{ animationDelay: '1.2s' }}>★</div>
        </div>
      </div>
    </div>
  );
};

export default AvatarWindow;