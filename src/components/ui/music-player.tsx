import { useState, useRef, useEffect } from "react";
import {
  Volume2,
  VolumeX,
  Music,
  Play,
  Pause,
  AlertTriangle,
  Download,
  ExternalLink,
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [hasAudioError, setHasAudioError] = useState(false);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Enhanced music tracks including the new 8-bit Pixabay track
  const tracks = [
    {
      name: "8-Bit Game Theme",
      url: "/audio/game-music-8bit-upbeat.mp3",
      duration: "3:00",
      fallback: "demo",
      description: "Upbeat console 8-bit background intro theme",
      source: "Pixabay",
      isNew: true,
    },
    {
      name: "Quiz Battle Theme",
      url: "/audio/quiz-battle-theme.mp3",
      duration: "3:24",
      fallback: "demo",
      description: "Intense quiz competition music",
      source: "Custom",
      isNew: false,
    },
    {
      name: "Victory Fanfare",
      url: "/audio/victory-fanfare.mp3",
      duration: "1:45",
      fallback: "demo",
      description: "Celebration and achievement music",
      source: "Custom",
      isNew: false,
    },
    {
      name: "Thinking Time",
      url: "/audio/thinking-time.mp3",
      duration: "2:15",
      fallback: "demo",
      description: "Calm focus and concentration music",
      source: "Custom",
      isNew: false,
    },
    {
      name: "Countdown Rush",
      url: "/audio/countdown-rush.mp3",
      duration: "2:55",
      fallback: "demo",
      description: "Exciting time pressure music",
      source: "Custom",
      isNew: false,
    },
  ];

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  // Generate demo audio tones with different frequencies for each track
  const generateDemoAudio = (trackIndex: number = 0) => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Different frequencies for different tracks
      const frequencies = [440, 523, 659, 784, 880]; // Musical notes
      const frequency = frequencies[trackIndex] || 440;
      const duration = 3;

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = trackIndex === 0 ? "square" : "sine"; // 8-bit style for first track

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

      const handleError = (e: Event) => {
        const target = e.target as HTMLAudioElement;
        const error = target.error;
        console.warn(`Audio loading failed for ${tracks[currentTrack].name}:`, {
          code: error?.code,
          message: error?.message || "Unknown audio error",
          url: tracks[currentTrack].url,
          networkState: target.networkState,
          readyState: target.readyState,
        });
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

      if (isPlaying && isAudioLoaded && !hasAudioError) {
        audio.play().catch((error) => {
          console.warn("Audio play failed:", {
            name: error.name,
            message: error.message,
            code: error.code || "Unknown",
            trackName: tracks[currentTrack].name,
          });
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
      generateDemoAudio(currentTrack);
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
      <audio
        ref={audioRef}
        src={tracks[currentTrack].url}
        preload="none"
        onError={(e) => {
          const target = e.target as HTMLAudioElement;
          const error = target.error;
          console.warn(`Audio error in music player:`, {
            code: error?.code || "Unknown",
            message: error?.message || "Audio file failed to load",
            src: target.src,
            networkState: target.networkState,
            readyState: target.readyState,
            errorType: error
              ? `MediaError code ${error.code}`
              : "No error details available",
          });
          setHasAudioError(true);
        }}
        onCanPlay={() => setHasAudioError(false)}
      />

      <div
        className={`relative transition-all duration-300 ${
          isExpanded ? "w-80" : "w-14"
        }`}
      >
        {/* Main control button with enhanced styling */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-14 h-14 rounded-2xl bg-black/30 backdrop-blur-xl border-2 border-white/20 hover:bg-black/40 transition-all duration-300 shadow-2xl ${
            isPlaying && !hasAudioError ? "animate-pulse glow-electric" : ""
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
            {tracks[currentTrack].isNew && (
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">!</span>
              </div>
            )}
          </div>
        </Button>

        {/* Expanded controls with enhanced UI */}
        {isExpanded && (
          <div className="absolute top-0 right-0 w-80 bg-black/40 backdrop-blur-xl border-2 border-white/20 rounded-2xl p-6 shadow-2xl animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">🎵 Game Music</h3>
              {tracks[currentTrack].isNew && (
                <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                  NEW!
                </div>
              )}
            </div>

            {/* Audio status */}
            {hasAudioError && (
              <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-400/30 rounded-lg">
                <div className="text-yellow-300 text-xs font-semibold flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  Audio file not found - Demo mode
                </div>
                <div className="text-yellow-200 text-xs">
                  Download the track from Pixabay and place it in /public/audio/
                </div>
              </div>
            )}

            {/* Download instructions for new track */}
            {currentTrack === 0 && hasAudioError && (
              <div className="mb-4 p-3 bg-blue-500/20 border border-blue-400/30 rounded-lg">
                <div className="text-blue-300 text-xs font-semibold mb-2 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download 8-Bit Music
                </div>
                <p className="text-blue-200 text-xs mb-2">
                  Get the track from Pixabay and save as:
                </p>
                <code className="text-blue-100 text-xs bg-black/30 px-2 py-1 rounded">
                  /public/audio/game-music-8bit-upbeat.mp3
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2 w-full bg-blue-500/20 border-blue-400/30 text-blue-200 hover:bg-blue-500/30 text-xs"
                  onClick={() =>
                    window.open(
                      "https://pixabay.com/music/upbeat-game-music-player-console-8bit-background-intro-theme-297305/",
                      "_blank",
                    )
                  }
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Open Pixabay Link
                </Button>
              </div>
            )}

            {/* Current track info */}
            <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="text-white font-bold text-sm mb-1 animate-fade-in flex items-center gap-2">
                {hasAudioError ? "🎵 Demo Audio" : "🎵 Now Playing"}
                {tracks[currentTrack].isNew && (
                  <span className="text-xs bg-red-500 text-white px-1 rounded">
                    NEW
                  </span>
                )}
              </div>
              <div className="text-electric-300 text-sm font-semibold">
                {tracks[currentTrack].name}
              </div>
              <div className="text-white/60 text-xs">
                {hasAudioError
                  ? "Generated tone"
                  : tracks[currentTrack].duration}
              </div>
              <div className="text-white/50 text-xs mt-1">
                {tracks[currentTrack].description}
              </div>
              <div className="text-white/40 text-xs">
                Source: {tracks[currentTrack].source}
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
                <div className="text-white/60 text-xs mt-1">
                  {Math.round(volume * 100)}%
                </div>
              </div>
            )}

            {/* Track selection grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {tracks.map((track, index) => (
                <Button
                  key={index}
                  onClick={() => setCurrentTrack(index)}
                  size="sm"
                  variant="outline"
                  className={`text-xs p-3 h-auto relative ${
                    currentTrack === index
                      ? "bg-electric-500/30 border-electric-400 text-electric-200"
                      : "bg-white/5 border-white/20 text-white/80 hover:bg-white/10"
                  }`}
                >
                  {track.isNew && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                  )}
                  <div className="text-center">
                    <div className="font-semibold">
                      {track.name.split(" ").slice(0, 2).join(" ")}
                    </div>
                    <div className="text-xs opacity-60">
                      {hasAudioError ? "Demo" : track.duration}
                    </div>
                    {track.isNew && (
                      <div className="text-xs text-red-400 font-bold mt-1">
                        NEW!
                      </div>
                    )}
                  </div>
                </Button>
              ))}
            </div>

            {/* Music credits */}
            <div className="mb-4 p-3 bg-purple-500/20 border border-purple-400/30 rounded-lg">
              <div className="text-purple-300 text-xs font-semibold mb-1">
                🎵 Music Credits
              </div>
              <div className="text-purple-200 text-xs">
                8-Bit Game Theme from Pixabay.com
                <br />
                Other tracks: Custom generated
              </div>
            </div>

            {/* Close button */}
            <Button
              onClick={() => setIsExpanded(false)}
              size="sm"
              variant="ghost"
              className="w-full text-white/60 hover:text-white hover:bg-white/10"
            >
              Close Player
            </Button>
          </div>
        )}

        {/* Enhanced playing indicator */}
        {isPlaying && !hasAudioError && !isExpanded && (
          <div className="absolute -bottom-2 -right-2 flex gap-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-1 bg-neon-400 rounded-full animate-pulse ${currentTrack === 0 ? "h-6" : "h-4"}`}
                style={{
                  animationDelay: `${i * 0.2}s`,
                  backgroundColor: currentTrack === 0 ? "#10b981" : "#34d399",
                }}
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

        {/* New track indicator */}
        {tracks[currentTrack].isNew && !hasAudioError && !isExpanded && (
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-white text-xs font-bold">NEW</span>
          </div>
        )}
      </div>

      {/* Enhanced sound waves animation for 8-bit track */}
      {isPlaying && !hasAudioError && !isExpanded && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex gap-1">
          {[...Array(currentTrack === 0 ? 7 : 5)].map((_, i) => (
            <div
              key={i}
              className={`w-1 rounded-full animate-bounce ${
                currentTrack === 0 ? "bg-neon-400" : "bg-electric-400"
              }`}
              style={{
                height: `${Math.random() * 20 + 8}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: currentTrack === 0 ? "0.6s" : "0.8s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
