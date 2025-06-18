import { useEffect, useState } from "react";

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  shape: "circle" | "triangle" | "square" | "star" | "diamond" | "hexagon";
  color: string;
  speed: number;
}

export const AnimatedBackground = () => {
  const [shapes, setShapes] = useState<FloatingShape[]>([]);

  useEffect(() => {
    const generateShapes = () => {
      const newShapes: FloatingShape[] = [];
      const shapeTypes: FloatingShape["shape"][] = [
        "circle",
        "triangle",
        "square",
        "star",
        "diamond",
        "hexagon",
      ];
      const colors = [
        "text-electric-400/40",
        "text-neon-400/40",
        "text-magic-400/40",
        "text-gold-400/40",
        "text-quiz-400/40",
        "text-pink-400/40",
        "text-purple-400/40",
        "text-cyan-400/40",
      ];

      for (let i = 0; i < 10; i++) { // Reduced from 25 to 10
        newShapes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 80 + 30,
          delay: Math.random() * 5,
          speed: Math.random() * 2 + 1,
          shape: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      setShapes(newShapes);
    };

    generateShapes();
  }, []);

  const renderShape = (shape: FloatingShape) => {
    const baseClasses = `absolute opacity-60 animate-float ${shape.color} hover:scale-110 transition-transform duration-300`;
    const style = {
      left: `${shape.x}%`,
      top: `${shape.y}%`,
      animationDelay: `${shape.delay}s`,
      animationDuration: `${shape.speed + 2}s`,
      fontSize: `${shape.size}px`,
      filter: "drop-shadow(0 0 10px currentColor)",
    };

    switch (shape.shape) {
      case "circle":
        return (
          <div
            key={shape.id}
            className={`${baseClasses} rounded-full border-4 border-current glow-animation`}
            style={{
              ...style,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
            }}
          />
        );
      case "triangle":
        return (
          <div
            key={shape.id}
            className={`${baseClasses} glow-animation`}
            style={style}
          >
            ▲
          </div>
        );
      case "square":
        return (
          <div
            key={shape.id}
            className={`${baseClasses} border-4 border-current rotate-45 glow-animation`}
            style={{
              ...style,
              width: `${shape.size * 0.7}px`,
              height: `${shape.size * 0.7}px`,
            }}
          />
        );
      case "star":
        return (
          <div
            key={shape.id}
            className={`${baseClasses} glow-animation animate-spin`}
            style={{ ...style, animationDuration: "10s" }}
          >
            ★
          </div>
        );
      case "diamond":
        return (
          <div
            key={shape.id}
            className={`${baseClasses} glow-animation`}
            style={style}
          >
            ◆
          </div>
        );
      case "hexagon":
        return (
          <div
            key={shape.id}
            className={`${baseClasses} glow-animation`}
            style={style}
          >
            ⬡
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Vibrant gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" />
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/50 via-blue-900/50 to-purple-900/50" />
      <div className="absolute inset-0 bg-gradient-to-bl from-emerald-900/30 via-teal-900/30 to-cyan-900/30" />

      {/* Animated mesh gradient overlay */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-gradient-to-r from-electric-600/20 via-transparent to-magic-600/20 animate-pulse" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-neon-600/20 via-transparent to-quiz-600/20 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Floating shapes with enhanced visibility */}
      {shapes.map(renderShape)}

      {/* Enhanced question mark decorations with glow */}
      <div className="absolute top-20 left-10 text-8xl text-white/30 animate-bounce-subtle drop-shadow-lg">
        <span className="inline-block animate-pulse text-electric-400/60">
          ?
        </span>
      </div>
      <div
        className="absolute top-40 right-20 text-6xl text-white/30 animate-bounce-subtle drop-shadow-lg"
        style={{ animationDelay: "1s" }}
      >
        <span className="inline-block animate-pulse text-neon-400/60">?</span>
      </div>
      <div
        className="absolute bottom-40 left-20 text-7xl text-white/30 animate-bounce-subtle drop-shadow-lg"
        style={{ animationDelay: "2s" }}
      >
        <span className="inline-block animate-pulse text-magic-400/60">?</span>
      </div>
      <div
        className="absolute bottom-20 right-10 text-5xl text-white/30 animate-bounce-subtle drop-shadow-lg"
        style={{ animationDelay: "0.5s" }}
      >
        <span className="inline-block animate-pulse text-gold-400/60">?</span>
      </div>

      {/* Enhanced glowing orbs with animation */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-electric-500/30 rounded-full blur-2xl animate-pulse-slow glow-animation" />
      <div
        className="absolute top-3/4 right-1/4 w-48 h-48 bg-magic-500/30 rounded-full blur-2xl animate-pulse-slow glow-animation"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-3/4 w-32 h-32 bg-neon-500/30 rounded-full blur-2xl animate-pulse-slow glow-animation"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-1/4 left-1/2 w-36 h-36 bg-quiz-500/30 rounded-full blur-2xl animate-pulse-slow glow-animation"
        style={{ animationDelay: "3s" }}
      />

      {/* Animated light rays */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-96 h-2 bg-gradient-to-r from-transparent via-electric-400/20 to-transparent rotate-45 animate-pulse" />
        <div
          className="absolute top-1/3 -right-10 w-96 h-2 bg-gradient-to-r from-transparent via-neon-400/20 to-transparent -rotate-45 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/3 -left-10 w-96 h-2 bg-gradient-to-r from-transparent via-magic-400/20 to-transparent rotate-45 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Sparkling particles */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => ( // Reduced from 20 to 10
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Edge vignette for focus */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
    </div>
  );
};
