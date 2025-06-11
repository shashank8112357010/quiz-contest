import { useState, useRef, useEffect } from "react";
import {
  Volume2,
  VolumeX,
  Music,
  Play,
  Pause,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface MusicPlayerProps {
  autoPlay?: boolean;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

export const MusicPlayer = ({
  autoPlay = false,
  position = "top-right",
}: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false); // Changed to false by default
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [hasAudioError, setHasAudioError] = useState(false);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Demo audio tracks with fallback to generated tones
  const tracks = [
    {
      name: "Quiz Battle Theme",
      url: "/audio/quiz-battle-theme.mp3",
      duration: "3:24",
      fallback: "demo", // Will use generated audio if file missing
    },
    {
      name: "Victory Fanfare",
      url: "/audio/victory-fanfare.mp3",
      duration: "1:45",
      fallback: "demo",
    },
    {
      name: "Thinking Time",
      url: "/audio/thinking-time.mp3",
      duration: "2:15",
      fallback: "demo",
    },
    {
      name: "Countdown Rush",
      url: "/audio/countdown-rush.mp3",
      duration: "2:55",
      fallback: "demo",
    },
  ];

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  // Generate a simple demo audio tone
  const generateDemoAudio = (frequency: number = 440, duration: number = 3) => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
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
    if (audioRef.current) {
      const audio = audioRef.current;

      // Error handling
      const handleError = () => {
        console.warn(`Audio file not found: ${tracks[currentTrack].url}`);
        setHasAudioError(true);
        setIsPlaying(false);
      };

      const handleCanPlay = () => {
        setHasAudioError(false);
        setIsAudioLoaded(true);
      };

      const handleLoadStart = () => {
        setIsAudioLoaded(false);
      };

      audio.addEventListener("error", handleError);
      audio.addEventListener("canplay", handleCanPlay);
      audio.addEventListener("loadstart", handleLoadStart);

      audio.volume = volume;
      audio.muted = isMuted;
      audio.loop = true;

      // Only try to play if audio is loaded and user wants to play
      if (isPlaying && isAudioLoaded && !hasAudioError) {
        audio.play().catch((error) => {
          console.warn("Audio play failed:", error);
          setIsPlaying(false);
        });
      } else {
        audio.pause();
      }

      return () => {
        audio.removeEventListener("error", handleError);
        audio.removeEventListener("canplay", handleCanPlay);
        audio.removeEventListener("loadstart", handleLoadStart);
      };
    }
  }, [isPlaying, isMuted, volume, currentTrack, isAudioLoaded, hasAudioError]);

  const togglePlayPause = () => {
    if (hasAudioError) {
      // Try to play demo audio instead
      generateDemoAudio(220 + currentTrack * 110, 2);
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setHasAudioError(false);
  };

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`fixed ${positionClasses[position]} z-50 group`}>
      {/* Audio element with error handling */}
      <audio
        ref={audioRef}
        src={tracks[currentTrack].url}
        preload="none"
        onError={() => setHasAudioError(true)}
        onCanPlay={() => setHasAudioError(false)}
      />

      {/* Compact music control */}
      <div
        className={`relative transition-all duration-300 ${
          isExpanded ? "w-64" : "w-14"
        }`}
      >
        {/* Main control button */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-14 h-14 rounded-2xl bg-black/30 backdrop-blur-xl border-2 border-white/20 hover:bg-black/40 transition-all duration-300 shadow-2xl ${
            isPlaying && !hasAudioError ? "animate-pulse" : ""
          }`}
        >
          <div className="relative">
            {hasAudioError ? (
              <AlertTriangle className="w-6 h-6 text-yellow-400 animate-bounce" />
            ) : (
              <Music
                className={`w-6 h-6 text-white ${isPlaying ? "animate-bounce" : ""}`}
              />
            )}
            {isPlaying && !hasAudioError && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-400 rounded-full animate-ping" />
            )}
          </div>
        </Button>

        {/* Expanded controls */}
        {isExpanded && (
          <div className="absolute top-0 right-0 w-64 bg-black/40 backdrop-blur-xl border-2 border-white/20 rounded-2xl p-4 shadow-2xl animate-slide-up">
            {/* Audio status */}
            {hasAudioError && (
              <div className="mb-4 p-2 bg-yellow-500/20 border border-yellow-400/30 rounded-lg">
                <div className="text-yellow-300 text-xs font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Audio files not found - Demo mode
                </div>
              </div>
            )}

            {/* Track info */}
            <div className="mb-4">
              <div className="text-white font-bold text-sm mb-1 animate-fade-in">
                🎵 {hasAudioError ? "Demo Audio" : "Now Playing"}
              </div>
              <div className="text-electric-300 text-xs font-semibold">
                {tracks[currentTrack].name}
              </div>
              <div className="text-white/60 text-xs">
                {hasAudioError
                  ? "Generated tone"
                  : tracks[currentTrack].duration}
              </div>
            </div>

            {/* Control buttons */}
            <div className="flex items-center gap-2 mb-4">
              <Button
                onClick={togglePlayPause}
                size="sm"
                className={`flex-1 ${
                  isPlaying && !hasAudioError
                    ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400"
                    : "bg-gradient-to-r from-neon-500 to-electric-500 hover:from-neon-400 hover:to-electric-400"
                } text-white border-0 font-bold`}
              >
                {isPlaying && !hasAudioError ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    {hasAudioError ? "Demo" : "Play"}
                  </>
                )}
              </Button>

              <Button
                onClick={toggleMute}
                size="sm"
                variant="outline"
                className={`bg-white/10 border-white/20 text-white hover:bg-white/20 ${
                  isMuted ? "bg-red-500/20 border-red-400" : ""
                }`}
                disabled={hasAudioError}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>

              <Button
                onClick={nextTrack}
                size="sm"
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                ⏭️
              </Button>
            </div>

            {/* Volume control */}
            {!hasAudioError && (
              <div className="mb-4">
                <div className="text-white/80 text-xs mb-2 font-semibold">
                  Volume
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  disabled={isMuted}
                />
              </div>
            )}

            {/* Track selection */}
            <div className="grid grid-cols-2 gap-2">
              {tracks.map((track, index) => (
                <Button
                  key={index}
                  onClick={() => setCurrentTrack(index)}
                  size="sm"
                  variant="outline"
                  className={`text-xs p-2 h-auto ${
                    currentTrack === index
                      ? "bg-electric-500/30 border-electric-400 text-electric-200"
                      : "bg-white/5 border-white/20 text-white/80 hover:bg-white/10"
                  }`}
                >
                  <div className="text-center">
                    <div className="font-semibold">
                      {track.name.split(" ")[0]}
                    </div>
                    <div className="text-xs opacity-60">
                      {hasAudioError ? "Demo" : track.duration}
                    </div>
                  </div>
                </Button>
              ))}
            </div>

            {/* Audio setup guide */}
            {hasAudioError && (
              <div className="mt-4 p-3 bg-blue-500/20 border border-blue-400/30 rounded-lg">
                <div className="text-blue-300 text-xs">
                  <div className="font-semibold mb-1">📁 Add Audio Files:</div>
                  <div>Place MP3 files in /public/audio/</div>
                  <div className="mt-1 text-blue-200">
                    See README for file names & sources
                  </div>
                </div>
              </div>
            )}

            {/* Close button */}
            <Button
              onClick={() => setIsExpanded(false)}
              size="sm"
              variant="ghost"
              className="w-full mt-3 text-white/60 hover:text-white hover:bg-white/10"
            >
              Close
            </Button>
          </div>
        )}

        {/* Playing indicator */}
        {isPlaying && !hasAudioError && !isExpanded && (
          <div className="absolute -bottom-2 -right-2 flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-4 bg-neon-400 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        )}

        {/* Error indicator */}
        {hasAudioError && !isExpanded && (
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-black text-xs">!</span>
          </div>
        )}
      </div>

      {/* Sound waves animation when playing */}
      {isPlaying && !hasAudioError && !isExpanded && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-electric-400 rounded-full animate-bounce"
              style={{
                height: `${Math.random() * 16 + 8}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: "0.8s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
