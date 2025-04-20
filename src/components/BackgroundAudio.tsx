
import React, { useState, useEffect, useRef } from 'react';

interface BackgroundAudioProps {
  autoplay?: boolean;
}

const BackgroundAudio: React.FC<BackgroundAudioProps> = ({ autoplay = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (autoplay) {
      // Attempt to autoplay, but browser policies might prevent it
      const audioPromise = audioRef.current?.play();
      
      if (audioPromise !== undefined) {
        audioPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay was prevented, show controls instead
            setIsPlaying(false);
          });
      }
    }
  }, [autoplay]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} loop>
        <source src="https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      
      <button 
        onClick={togglePlay} 
        className="bg-nirvika-primary hover:bg-nirvika-secondary text-nirvika-text rounded-full p-3 shadow-lg transition-all duration-300 y2k-border flex items-center justify-center w-12 h-12"
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
      >
        {isPlaying ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default BackgroundAudio;
