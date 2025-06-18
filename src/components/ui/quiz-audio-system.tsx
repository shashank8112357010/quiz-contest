import {
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
  useCallback, // Import useCallback
} from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Music } from "lucide-react";

// Enhanced sound effects for quiz gameplay
export const QUIZ_SOUNDS = {
  // Background music during quiz
  backgroundMusic: {
    name: "Quiz Background Music",
    url: "/audio/background-music.mp3",
    volume: 0.3,
    loop: true,
  },

  // Answer feedback sounds
  correctAnswer: {
    name: "Correct Answer Clapping",
    url: "/audio/clapping.mp3",
    volume: 0.7,
    loop: false,
  },

  wrongAnswer: {
    name: "Wrong Answer Aww",
    url: "/audio/aww-sound.mp3",
    volume: 0.6,
    loop: false,
  },

  // Additional quiz sounds
  questionStart: {
    name: "Question Start",
    url: "/audio/question-start.mp3",
    volume: 0.4,
    loop: false,
  },

  tick: {
    name: "Tick",
    url: "/audio/tick.mp3",
    volume: 0.6,
    loop: false,
  },

  timeWarning: {
    name: "Time Warning",
    url: "/audio/tick-tock.mp3",
    volume: 0.5,
    loop: false,
  },

  timeUp: {
    name: "Time Up",
    url: "/audio/buzzer.mp3",
    volume: 0.8,
    loop: false,
  },

  quizComplete: {
    name: "Quiz Complete Fanfare",
    url: "/audio/victory-fanfare.mp3",
    volume: 0.8,
    loop: false,
  },
} as const;

interface QuizAudioContextType {
  isEnabled: boolean;
  masterVolume: number;
  backgroundMusicEnabled: boolean;
  soundEffectsEnabled: boolean;
  toggleAudio: () => void;
  setMasterVolume: (volume: number) => void;
  toggleBackgroundMusic: () => void;
  toggleSoundEffects: () => void;
  playSound: (soundKey: keyof typeof QUIZ_SOUNDS) => void;
  startBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
  playCorrectAnswer: () => void;
  playWrongAnswer: () => void;
  playQuestionStart: () => void;
  playTimeWarning: () => void;
  playTimeUp: () => void;
  playQuizComplete: () => void;
  playTick: () => void;
}

const QuizAudioContext = createContext<QuizAudioContextType | undefined>(
  undefined,
);

export const useQuizAudio = () => {
  const context = useContext(QuizAudioContext);
  if (!context) {
    throw new Error("useQuizAudio must be used within QuizAudioProvider");
  }
  return context;
};

interface QuizAudioProviderProps {
  children: ReactNode;
}

export const QuizAudioProvider = ({ children }: QuizAudioProviderProps) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [masterVolume, setMasterVolumeState] = useState(0.7);
  const [backgroundMusicEnabled, setBackgroundMusicEnabled] = useState(true);
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const [audioErrors, setAudioErrors] = useState<Set<string>>(new Set());

  // Initialize audio elements
  useEffect(() => {
    Object.entries(QUIZ_SOUNDS).forEach(([key, sound]) => {
      const audio = new Audio();

      audio.addEventListener("error", (e) => {
        const target = e.target as HTMLAudioElement;
        const error = target.error;
        console.warn(`Audio loading failed for ${key}:`, {
          code: error?.code,
          message: error?.message || "Unknown audio error",
          src: target.src,
          networkState: target.networkState,
          readyState: target.readyState,
        });
        // Register the error. The playSound function will handle the fallback.
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
      audio.volume = sound.volume * masterVolume;
      audio.loop = sound.loop;
      audio.preload = "auto";

      audioRefs.current[key] = audio;

      // Set background music reference
      if (key === "backgroundMusic") {
        backgroundMusicRef.current = audio;
      }
    });

    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
    };
  }, []);

  // Handle user interaction for autoplay
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasUserInteracted(true);
    };

    const events = ["click", "touch", "keydown"];
    events.forEach((event) => {
      document.addEventListener(event, handleFirstInteraction, { once: true });
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleFirstInteraction);
      });
    };
  }, []);

  // Update volumes when master volume changes
  useEffect(() => {
    Object.entries(QUIZ_SOUNDS).forEach(([key, sound]) => {
      const audio = audioRefs.current[key];
      if (audio) {
        audio.volume = sound.volume * masterVolume;
      }
    });
  }, [masterVolume]);

  // Fallback sound generation for missing audio files
  const generateFallbackSound = useCallback(
    (type: "correct" | "wrong" | "warning" | "complete") => {
      if (!isEnabled || !hasUserInteracted) return;

      try {
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        switch (type) {
          case "correct":
            // Happy ascending tone sequence (clapping replacement)
            [523, 659, 784, 1047].forEach((freq, i) => {
              const osc = audioContext.createOscillator();
              const gain = audioContext.createGain();
              osc.connect(gain);
              gain.connect(audioContext.destination);
              osc.frequency.setValueAtTime(
                freq,
                audioContext.currentTime + i * 0.1,
              );
              osc.type = "sine";
              gain.gain.setValueAtTime(
                0.1 * masterVolume,
                audioContext.currentTime + i * 0.1,
              );
              gain.gain.exponentialRampToValueAtTime(
                0.01,
                audioContext.currentTime + i * 0.1 + 0.3,
              );
              osc.start(audioContext.currentTime + i * 0.1);
              osc.stop(audioContext.currentTime + i * 0.1 + 0.3);
            });
            break;

          case "wrong":
            // Sad descending tone (aww replacement)
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(
              200,
              audioContext.currentTime + 0.5,
            );
            oscillator.type = "sawtooth";
            gainNode.gain.setValueAtTime(
              0.2 * masterVolume,
              audioContext.currentTime,
            );
            gainNode.gain.exponentialRampToValueAtTime(
              0.01,
              audioContext.currentTime + 0.5,
            );
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
            break;

          case "warning":
            // Urgent beeping
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.type = "square";
            gainNode.gain.setValueAtTime(
              0.15 * masterVolume,
              audioContext.currentTime,
            );
            gainNode.gain.exponentialRampToValueAtTime(
              0.01,
              audioContext.currentTime + 0.2,
            );
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
            break;

          case "complete":
            // Victory fanfare
            [523, 659, 784, 1047, 1319].forEach((freq, i) => {
              const osc = audioContext.createOscillator();
              const gain = audioContext.createGain();
              osc.connect(gain);
              gain.connect(audioContext.destination);
              osc.frequency.setValueAtTime(
                freq,
                audioContext.currentTime + i * 0.15,
              );
              osc.type = "triangle";
              gain.gain.setValueAtTime(
                0.15 * masterVolume,
                audioContext.currentTime + i * 0.15,
              );
              gain.gain.exponentialRampToValueAtTime(
                0.01,
                audioContext.currentTime + i * 0.15 + 0.4,
              );
              osc.start(audioContext.currentTime + i * 0.15);
              osc.stop(audioContext.currentTime + i * 0.15 + 0.4);
            });
            break;
        }
      } catch (error) {
        console.warn("Web Audio API not supported for fallback sounds");
      }
    },
    [isEnabled, hasUserInteracted, masterVolume],
  );

  const playSound = useCallback(
    (soundKey: keyof typeof QUIZ_SOUNDS) => {
      if (!isEnabled || !soundEffectsEnabled || !hasUserInteracted) return;
      const audio = audioRefs.current[soundKey];
      if (audio && !audioErrors.has(soundKey)) {
        try {
          audio.currentTime = 0;
          audio.play().catch((error) => {
            console.warn(`Failed to play ${soundKey}:`, {
              name: error.name,
              message: error.message,
              code: error.code || "Unknown",
              soundKey,
            });
            setAudioErrors((prev) => new Set(prev).add(soundKey));
            if (soundKey === "correctAnswer") generateFallbackSound("correct");
            else if (soundKey === "wrongAnswer") generateFallbackSound("wrong");
            else if (soundKey === "timeWarning")
              generateFallbackSound("warning");
            else if (soundKey === "quizComplete")
              generateFallbackSound("complete");
          });
        } catch (error: any) {
          console.warn(`Sound playback error for ${soundKey}:`, {
            name: error.name,
            message: error.message,
            code: error.code || "Unknown",
            soundKey,
          });
        }
      } else {
        if (soundKey === "correctAnswer") generateFallbackSound("correct");
        else if (soundKey === "wrongAnswer") generateFallbackSound("wrong");
        else if (soundKey === "timeWarning") generateFallbackSound("warning");
        else if (soundKey === "quizComplete") generateFallbackSound("complete");
      }
    },
    [
      isEnabled,
      soundEffectsEnabled,
      hasUserInteracted,
      audioErrors,
      generateFallbackSound,
    ],
  );

  const startBackgroundMusic = useCallback(() => {
    if (
      !isEnabled ||
      !backgroundMusicEnabled ||
      !hasUserInteracted ||
      !backgroundMusicRef.current
    )
      return;
    try {
      backgroundMusicRef.current.currentTime = 0;
      backgroundMusicRef.current.play().catch((error) => {
        console.warn("Background music play failed:", {
          name: error.name,
          message: error.message,
          code: error.code || "Unknown",
          src: backgroundMusicRef.current?.src,
        });
      });
    } catch (error: any) {
      console.warn("Background music error:", {
        name: error.name,
        message: error.message,
        code: error.code || "Unknown",
      });
    }
  }, [isEnabled, backgroundMusicEnabled, hasUserInteracted]);

  const stopBackgroundMusic = useCallback(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause();
      backgroundMusicRef.current.currentTime = 0;
    }
  }, []);

  const toggleAudio = useCallback(() => {
    setIsEnabled((prev) => {
      const newState = !prev;
      if (newState) {
        if (backgroundMusicEnabled && hasUserInteracted) {
          startBackgroundMusic(); // Relies on memoized startBackgroundMusic
        }
      } else {
        stopBackgroundMusic(); // Relies on memoized stopBackgroundMusic
      }
      return newState;
    });
  }, [
    backgroundMusicEnabled,
    hasUserInteracted,
    startBackgroundMusic,
    stopBackgroundMusic,
  ]);

  const setMasterVolume = useCallback((volume: number) => {
    setMasterVolumeState(Math.max(0, Math.min(1, volume)));
  }, []);

  const toggleBackgroundMusic = useCallback(() => {
    setBackgroundMusicEnabled((prev) => {
      const newState = !prev;
      if (newState && isEnabled && hasUserInteracted) {
        // Check isEnabled here
        startBackgroundMusic();
      } else if (!newState) {
        // If turning off
        stopBackgroundMusic();
      }
      return newState;
    });
  }, [isEnabled, hasUserInteracted, startBackgroundMusic, stopBackgroundMusic]);

  const toggleSoundEffects = useCallback(() => {
    setSoundEffectsEnabled((prev) => !prev);
  }, []);

  // Convenience methods using the memoized playSound
  const playCorrectAnswer = useCallback(
    () => playSound("correctAnswer"),
    [playSound],
  );
  const playWrongAnswer = useCallback(
    () => playSound("wrongAnswer"),
    [playSound],
  );
  const playQuestionStart = useCallback(
    () => playSound("questionStart"),
    [playSound],
  );
  const playTimeWarning = useCallback(
    () => playSound("timeWarning"),
    [playSound],
  );
  const playTimeUp = useCallback(() => playSound("timeUp"), [playSound]);
  const playQuizComplete = useCallback(
    () => playSound("quizComplete"),
    [playSound],
  );
  const playTick = useCallback(() => playSound("tick"), [playSound]);

  const value: QuizAudioContextType = {
    isEnabled,
    masterVolume,
    backgroundMusicEnabled,
    soundEffectsEnabled,
    toggleAudio, // Memoized
    setMasterVolume, // Memoized
    toggleBackgroundMusic, // Memoized
    toggleSoundEffects, // Memoized
    playSound, // Memoized
    startBackgroundMusic, // Memoized
    stopBackgroundMusic, // Memoized
    playCorrectAnswer, // Memoized
    playWrongAnswer, // Memoized
    playQuestionStart, // Memoized
    playTimeWarning, // Memoized
    playTimeUp, // Memoized
    playQuizComplete, // Memoized
    playTick, // Memoized
  };

  return (
    <QuizAudioContext.Provider value={value}>
      {children}
    </QuizAudioContext.Provider>
  );
};

// Audio control panel component
export const QuizAudioControls = () => {
  const {
    isEnabled,
    masterVolume,
    backgroundMusicEnabled,
    soundEffectsEnabled,
    toggleAudio,
    setMasterVolume,
    toggleBackgroundMusic,
    toggleSoundEffects,
  } = useQuizAudio();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <div className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl p-3 flex items-center gap-3">
        {/* Master Audio Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleAudio}
          className={`p-2 ${isEnabled ? "text-white hover:text-electric-300" : "text-red-400 hover:text-red-300"}`}
          title={isEnabled ? "Disable Audio" : "Enable Audio"}
        >
          {isEnabled ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </Button>

        {/* Background Music Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleBackgroundMusic}
          className={`p-2 ${backgroundMusicEnabled ? "text-white hover:text-electric-300" : "text-gray-400 hover:text-gray-300"}`}
          title={
            backgroundMusicEnabled
              ? "Disable Background Music"
              : "Enable Background Music"
          }
          disabled={!isEnabled}
        >
          <Music className="w-4 h-4" />
        </Button>

        {/* Volume Control */}
        {isEnabled && (
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={masterVolume}
            onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
            className="w-16 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            title={`Volume: ${Math.round(masterVolume * 100)}%`}
          />
        )}
      </div>
    </div>
  );
};
