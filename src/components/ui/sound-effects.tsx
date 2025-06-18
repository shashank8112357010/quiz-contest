import { useRef, useEffect, useState } from "react";

export interface SoundEffect {
  name: string;
  url: string;
  volume?: number;
}

// Predefined sound effects for the game
export const SOUND_EFFECTS: Record<string, SoundEffect> = {
  // UI Sounds
  click: { name: "Click", url: "/audio/click.mp3", volume: 0.3 },
  hover: { name: "Hover", url: "/audio/hover.mp3", volume: 0.2 },

  // Game Sounds
  correct: { name: "Correct Answer", url: "/audio/correct.mp3", volume: 0.5 },
  incorrect: { name: "Wrong Answer", url: "/audio/incorrect.mp3", volume: 0.4 },
  timeWarning: {
    name: "Time Warning",
    url: "/audio/time-warning.mp3",
    volume: 0.6,
  },
  timeUp: { name: "Time Up", url: "/audio/time-up.mp3", volume: 0.7 },

  // Achievement Sounds
  levelUp: { name: "Level Up", url: "/audio/level-up.mp3", volume: 0.8 },
  achievement: {
    name: "Achievement",
    url: "/audio/achievement.mp3",
    volume: 0.6,
  },
  powerUp: { name: "Power Up", url: "/audio/power-up.mp3", volume: 0.5 },

  // Prize/Reward Sounds
  coinCollect: {
    name: "Coin Collect",
    url: "/audio/coin-collect.mp3",
    volume: 0.4,
  },
  prizeDrop: { name: "Prize Drop", url: "/audio/prize-drop.mp3", volume: 0.7 },
  fanfare: { name: "Victory Fanfare", url: "/audio/fanfare.mp3", volume: 0.8 },

  // Streak Sounds
  streak3: { name: "3 Streak", url: "/audio/streak-3.mp3", volume: 0.5 },
  streak5: { name: "5 Streak", url: "/audio/streak-5.mp3", volume: 0.6 },
  streak10: { name: "10 Streak", url: "/audio/streak-10.mp3", volume: 0.8 },

  // Special Effects
  magic: { name: "Magic", url: "/audio/magic.mp3", volume: 0.5 },
  explosion: { name: "Explosion", url: "/audio/explosion.mp3", volume: 0.6 },
  whoosh: { name: "Whoosh", url: "/audio/whoosh.mp3", volume: 0.4 },
};

interface SoundEffectsControllerProps {
  globalVolume?: number;
  enabled?: boolean;
}

export const SoundEffectsController = ({
  globalVolume = 1,
  enabled = true,
}: SoundEffectsControllerProps) => {
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const [audioErrors, setAudioErrors] = useState<Set<string>>(new Set());

  // Generate simple beep sounds as fallback
  const generateBeep = (frequency: number = 800, duration: number = 0.1) => {
    if (!enabled) return;

    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = "square";

      gainNode.gain.setValueAtTime(
        0.1 * globalVolume,
        audioContext.currentTime,
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + duration,
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);

      return true;
    } catch (error) {
      console.warn("Web Audio API not supported");
      return false;
    }
  };

  useEffect(() => {
    // Preload all sound effects with error handling
    Object.entries(SOUND_EFFECTS).forEach(([key, sound]) => {
      const audio = new Audio();

      // Error handling
      audio.addEventListener("error", (e) => {
        const target = e.target as HTMLAudioElement;
        const error = target.error;
        console.warn(`Sound effect loading failed for ${key}:`, {
          code: error?.code,
          message: error?.message || "Unknown audio error",
          url: sound.url,
          networkState: target.networkState,
          readyState: target.readyState,
        });
        setAudioErrors((prev) => new Set(prev).add(key));
      });

      audio.addEventListener("canplaythrough", () => {
        setAudioErrors((prev) => {
          const newSet = new Set(prev);
          newSet.delete(key);
          return newSet;
        });
      });

      audio.src = sound.url;
      audio.volume = (sound.volume || 0.5) * globalVolume;
      audio.preload = "none"; // Changed to "none" to prevent immediate loading errors
      audioRefs.current[key] = audio;
    });

    return () => {
      // Cleanup
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
    };
  }, [globalVolume]);

  useEffect(() => {
    // Update volumes when global volume changes
    Object.entries(SOUND_EFFECTS).forEach(([key, sound]) => {
      if (audioRefs.current[key]) {
        audioRefs.current[key].volume = (sound.volume || 0.5) * globalVolume;
      }
    });
  }, [globalVolume]);

  const playSound = (soundKey: string, volumeOverride?: number) => {
    if (!enabled) return;

    // If audio file failed to load, use generated beep
    if (audioErrors.has(soundKey)) {
      const frequencies: Record<string, number> = {
        click: 800,
        hover: 600,
        correct: 1000,
        incorrect: 300,
        timeWarning: 400,
        timeUp: 200,
        levelUp: 1200,
        achievement: 1000,
        powerUp: 1400,
        coinCollect: 900,
        prizeDrop: 700,
        fanfare: 1500,
        streak3: 800,
        streak5: 1000,
        streak10: 1200,
        magic: 1100,
        explosion: 150,
        whoosh: 500,
      };

      const frequency = frequencies[soundKey] || 800;
      const duration =
        soundKey.includes("streak") || soundKey === "fanfare" ? 0.3 : 0.1;
      generateBeep(frequency, duration);
      return;
    }

    const audio = audioRefs.current[soundKey];
    if (audio) {
      try {
        audio.currentTime = 0; // Reset to start
        if (volumeOverride !== undefined) {
          audio.volume = volumeOverride * globalVolume;
        }
        audio.play().catch((error) => {
          console.warn(`Failed to play sound ${soundKey}:`, error);
          // Mark as error and try beep fallback
          setAudioErrors((prev) => new Set(prev).add(soundKey));
          const frequencies: Record<string, number> = {
            click: 800,
            correct: 1000,
            incorrect: 300,
          };
          generateBeep(frequencies[soundKey] || 800, 0.1);
        });
      } catch (error) {
        console.warn(`Sound playback error for ${soundKey}:`, error);
      }
    }
  };

  return { playSound, hasAudioSupport: audioErrors.size === 0 };
};

// Hook for using sound effects in components
export const useSoundEffects = (
  enabled: boolean = true,
  volume: number = 1,
) => {
  const { playSound, hasAudioSupport } = SoundEffectsController({
    globalVolume: volume,
    enabled,
  });

  return {
    playSound,
    hasAudioSupport,
    // Convenience methods for common sounds
    playClick: () => playSound("click"),
    playHover: () => playSound("hover"),
    playCorrect: () => playSound("correct"),
    playIncorrect: () => playSound("incorrect"),
    playTimeWarning: () => playSound("timeWarning"),
    playTimeUp: () => playSound("timeUp"),
    playLevelUp: () => playSound("levelUp"),
    playAchievement: () => playSound("achievement"),
    playPowerUp: () => playSound("powerUp"),
    playCoinCollect: () => playSound("coinCollect"),
    playPrizeDrop: () => playSound("prizeDrop"),
    playFanfare: () => playSound("fanfare"),
    playStreak: (streakCount: number) => {
      if (streakCount >= 10) playSound("streak10");
      else if (streakCount >= 5) playSound("streak5");
      else if (streakCount >= 3) playSound("streak3");
    },
    playMagic: () => playSound("magic"),
    playExplosion: () => playSound("explosion"),
    playWhoosh: () => playSound("whoosh"),
  };
};

// Sound effect trigger component for button interactions
export const SoundButton = ({
  children,
  soundType = "click",
  className = "",
  onClick,
  ...props
}: {
  children: React.ReactNode;
  soundType?: keyof typeof SOUND_EFFECTS;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}) => {
  const { playSound } = useSoundEffects();

  const handleClick = () => {
    playSound(soundType);
    onClick?.();
  };

  const handleHover = () => {
    if (soundType === "click") {
      playSound("hover");
    }
  };

  return (
    <button
      className={className}
      onClick={handleClick}
      onMouseEnter={handleHover}
      {...props}
    >
      {children}
    </button>
  );
};

// Audio feedback for different game events
export const GameAudioFeedback = {
  // Quiz events
  answerCorrect: () => {
    const { playCorrect, playCoinCollect } = useSoundEffects();
    playCorrect();
    setTimeout(playCoinCollect, 200); // Delayed coin sound
  },

  answerIncorrect: () => {
    const { playIncorrect } = useSoundEffects();
    playIncorrect();
  },

  streakAchieved: (streakCount: number) => {
    const { playStreak, playFanfare } = useSoundEffects();
    playStreak(streakCount);
    if (streakCount >= 10) {
      setTimeout(playFanfare, 500);
    }
  },

  powerUpUsed: (powerType: string) => {
    const { playPowerUp, playMagic } = useSoundEffects();
    playPowerUp();
    setTimeout(playMagic, 200);
  },

  levelComplete: () => {
    const { playLevelUp, playFanfare } = useSoundEffects();
    playLevelUp();
    setTimeout(playFanfare, 800);
  },

  prizeWon: (prizeValue: "small" | "medium" | "large") => {
    const { playPrizeDrop, playFanfare, playExplosion } = useSoundEffects();

    switch (prizeValue) {
      case "small":
        playPrizeDrop();
        break;
      case "medium":
        playPrizeDrop();
        setTimeout(playFanfare, 300);
        break;
      case "large":
        playExplosion();
        setTimeout(playFanfare, 500);
        break;
    }
  },

  timeWarning: (timeLeft: number) => {
    const { playTimeWarning, playTimeUp } = useSoundEffects();

    if (timeLeft <= 0) {
      playTimeUp();
    } else if (timeLeft <= 10) {
      playTimeWarning();
    }
  },

  uiInteraction: (type: "hover" | "click" | "swipe") => {
    const { playHover, playClick, playWhoosh } = useSoundEffects();

    switch (type) {
      case "hover":
        playHover();
        break;
      case "click":
        playClick();
        break;
      case "swipe":
        playWhoosh();
        break;
    }
  },
};

// Context provider for global sound settings
import { createContext, useContext, ReactNode } from "react";

interface SoundContextType {
  enabled: boolean;
  volume: number;
  toggleSound: () => void;
  setVolume: (volume: number) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [enabled, setEnabled] = useState(true);
  const [volume, setVolumeState] = useState(0.7);

  const toggleSound = () => setEnabled(!enabled);
  const setVolume = (newVolume: number) =>
    setVolumeState(Math.max(0, Math.min(1, newVolume)));

  return (
    <SoundContext.Provider value={{ enabled, volume, toggleSound, setVolume }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSoundContext must be used within a SoundProvider");
  }
  return context;
};
