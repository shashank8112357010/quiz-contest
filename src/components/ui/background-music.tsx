"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

interface BackgroundMusicProps {
  autoPlay?: boolean;
  loop?: boolean;
  volume?: number;
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
  autoPlay = true,
  loop = true,
  volume = 0.3,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.loop = loop;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => setIsMuted(audio.muted);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("volumechange", handleVolumeChange);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("volumechange", handleVolumeChange);
    };
  }, [volume, loop]);

  // Handle user interaction for autoplay
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasInteracted(true);
      if (autoPlay && audioRef.current && !isPlaying) {
        audioRef.current.play().catch((error) => {
          console.log("Audio autoplay failed:", error);
        });
      }
    };

    // Listen for any user interaction
    const events = ["click", "touchstart", "keydown", "mousedown"];
    events.forEach((event) => {
      document.addEventListener(event, handleFirstInteraction, { once: true });
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleFirstInteraction);
      });
    };
  }, [autoPlay, isPlaying]);

  // Also try to play when component mounts and user has already interacted
  useEffect(() => {
    if (hasInteracted && autoPlay && audioRef.current && !isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Audio autoplay failed:", error);
        });
      }
    }
  }, [hasInteracted, autoPlay, isPlaying]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setHasInteracted(true);

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.log("Audio play failed:", error);
      });
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2">
      {/* Background Music Audio Element */}
      <audio
        ref={audioRef}
        preload="auto"
        className="hidden"
        onLoadedData={() => console.log("Audio loaded successfully")}
        onError={(e) => {
          const target = e.target as HTMLAudioElement;
          const error = target.error;
          console.error("Audio loading error:", {
            code: error?.code,
            message: error?.message || "Unknown audio error",
            src: target.src,
            networkState: target.networkState,
            readyState: target.readyState,
          });
        }}
        onCanPlayThrough={() => {
          if (hasInteracted && autoPlay && !isPlaying) {
            audioRef.current?.play().catch(console.error);
          }
        }}
      >
        <source src="/audio/background-music.mp3" type="audio/mpeg" />
        <source src="/audio/background-music.ogg" type="audio/ogg" />
      </audio>

      {/* Music Control Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="bg-black/70 border-white/20 hover:bg-black/80 backdrop-blur-sm"
        onClick={togglePlayPause}
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? (
          <div className="w-4 h-4 flex gap-1">
            <div className="w-1.5 h-4 bg-white rounded"></div>
            <div className="w-1.5 h-4 bg-white rounded"></div>
          </div>
        ) : (
          <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1"></div>
        )}
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="bg-black/70 border-white/20 hover:bg-black/80 backdrop-blur-sm"
        onClick={toggleMute}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-white" />
        ) : (
          <Volume2 className="w-4 h-4 text-white" />
        )}
      </Button>

      {/* Show play hint if music hasn't started due to autoplay restrictions */}
      {!hasInteracted && (
        <div className="absolute bottom-full right-0 mb-2 bg-black/80 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm border border-white/20 whitespace-nowrap animate-pulse">
          Click play button to enable background music
        </div>
      )}
    </div>
  );
};

// Music Context Provider for global music control
interface MusicContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  togglePlayPause: () => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
}

const MusicContext = React.createContext<MusicContextType | null>(null);

export const useMusicContext = () => {
  const context = React.useContext(MusicContext);
  if (!context) {
    throw new Error("useMusicContext must be used within MusicProvider");
  }
  return context;
};

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.3);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(Math.max(0, Math.min(1, newVolume)));
  };

  const value = {
    isPlaying,
    isMuted,
    volume,
    togglePlayPause,
    toggleMute,
    setVolume,
  };

  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
};
