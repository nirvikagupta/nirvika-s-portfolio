import React, { useEffect, useState } from 'react';

const PresenceBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  
  useEffect(() => {
    const tabId = `${Date.now()}-${Math.random()}`;
    const STORAGE_KEY = 'nirvika-visitors';
    
    const getTabs = () => {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    };
    
    const updateTabs = (tabs) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tabs));
    };
    
    const tabs = getTabs();
    tabs.push(tabId);
    updateTabs(tabs);
    
    const checkOthers = () => {
      const others = getTabs().filter((id) => id !== tabId);
      setShowBanner(others.length > 0);
    };
    
    const interval = setInterval(checkOthers, 1000);
    checkOthers();
    
    const cleanup = () => {
      const remaining = getTabs().filter((id) => id !== tabId);
      updateTabs(remaining);
    };
    
    window.addEventListener('beforeunload', cleanup);
    return () => {
      cleanup();
      clearInterval(interval);
      window.removeEventListener('beforeunload', cleanup);
    };
  }, []);
  
  if (!showBanner || isClosed) return null;
  
  return (
    <div className="bg-pink-200 text-pink-700 font-medium py-2 px-4 flex items-center justify-between fixed top-20 right-0 z-[9999] shadow-md rounded-bl-lg">
      <div className="flex items-center">
        <span className="mr-1">🌸</span> Someone else is also viewing this!
      </div>
      <button 
        onClick={() => setIsClosed(true)}
        className="ml-4 text-pink-700 hover:text-pink-900 focus:outline-none"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};

export default PresenceBanner;