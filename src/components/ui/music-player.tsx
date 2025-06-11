import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MusicPlayerProps {
  autoPlay?: boolean;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

export const MusicPlayer = ({
  autoPlay = false,
  position = "top-right",
}: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Game music tracks (you can replace these with actual audio files)
  const tracks = [
    {
      name: "Quiz Battle Theme",
      url: "/audio/quiz-battle-theme.mp3", // You'll need to add actual audio files
      duration: "3:24",
    },
    {
      name: "Victory Fanfare",
      url: "/audio/victory-fanfare.mp3",
      duration: "1:45",
    },
    {
      name: "Thinking Time",
      url: "/audio/thinking-time.mp3",
      duration: "2:15",
    },
    {
      name: "Countdown Rush",
      url: "/audio/countdown-rush.mp3",
      duration: "2:55",
    },
  ];

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      audioRef.current.loop = true;

      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isMuted, volume, currentTrack]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`fixed ${positionClasses[position]} z-50 group`}>
      {/* Audio element */}
      <audio ref={audioRef} src={tracks[currentTrack].url} preload="metadata" />

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
            isPlaying ? "animate-pulse" : ""
          }`}
        >
          <div className="relative">
            <Music
              className={`w-6 h-6 text-white ${isPlaying ? "animate-bounce" : ""}`}
            />
            {isPlaying && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-400 rounded-full animate-ping" />
            )}
          </div>
        </Button>

        {/* Expanded controls */}
        {isExpanded && (
          <div className="absolute top-0 right-0 w-64 bg-black/40 backdrop-blur-xl border-2 border-white/20 rounded-2xl p-4 shadow-2xl animate-slide-up">
            {/* Track info */}
            <div className="mb-4">
              <div className="text-white font-bold text-sm mb-1 animate-fade-in">
                🎵 Now Playing
              </div>
              <div className="text-electric-300 text-xs font-semibold">
                {tracks[currentTrack].name}
              </div>
              <div className="text-white/60 text-xs">
                {tracks[currentTrack].duration}
              </div>
            </div>

            {/* Control buttons */}
            <div className="flex items-center gap-2 mb-4">
              <Button
                onClick={togglePlayPause}
                size="sm"
                className={`flex-1 ${
                  isPlaying
                    ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400"
                    : "bg-gradient-to-r from-neon-500 to-electric-500 hover:from-neon-400 hover:to-electric-400"
                } text-white border-0 font-bold`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Play
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
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>
            </div>

            {/* Volume control */}
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
                    <div className="text-xs opacity-60">{track.duration}</div>
                  </div>
                </Button>
              ))}
            </div>

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
        {isPlaying && !isExpanded && (
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
      </div>

      {/* Sound waves animation when playing */}
      {isPlaying && !isExpanded && (
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

// Custom styles for the volume slider
const sliderStyles = `
  .slider::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: linear-gradient(45deg, #10b981, #06b6d4);
    cursor: pointer;
    box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
  }

  .slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: linear-gradient(45deg, #10b981, #06b6d4);
    cursor: pointer;
    border: none;
    box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
  }

  .slider::-webkit-slider-track {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    height: 8px;
  }

  .slider::-moz-range-track {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    height: 8px;
    border: none;
  }
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = sliderStyles;
  document.head.appendChild(styleSheet);
}
