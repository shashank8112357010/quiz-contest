import { useEffect, useState } from "react";

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  shape: "circle" | "triangle" | "square" | "star";
  color: string;
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
      ];
      const colors = [
        "text-brand-400/20",
        "text-electric-400/20",
        "text-neon-400/20",
        "text-magic-400/20",
        "text-fire-400/20",
      ];

      for (let i = 0; i < 15; i++) {
        newShapes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 60 + 20,
          delay: Math.random() * 4,
          shape: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      setShapes(newShapes);
    };

    generateShapes();
  }, []);

  const renderShape = (shape: FloatingShape) => {
    const baseClasses = `absolute opacity-30 animate-float ${shape.color}`;
    const style = {
      left: `${shape.x}%`,
      top: `${shape.y}%`,
      animationDelay: `${shape.delay}s`,
      fontSize: `${shape.size}px`,
    };

    switch (shape.shape) {
      case "circle":
        return (
          <div
            key={shape.id}
            className={`${baseClasses} rounded-full border-2 border-current`}
            style={{
              ...style,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
            }}
          />
        );
      case "triangle":
        return (
          <div key={shape.id} className={baseClasses} style={style}>
            ▲
          </div>
        );
      case "square":
        return (
          <div
            key={shape.id}
            className={`${baseClasses} border-2 border-current`}
            style={{
              ...style,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
            }}
          />
        );
      case "star":
        return (
          <div key={shape.id} className={baseClasses} style={style}>
            ★
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-electric-900 to-magic-900" />

      {/* Floating shapes */}
      {shapes.map(renderShape)}

      {/* Overlay gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-magic-900/30 via-transparent to-electric-900/30" />

      {/* Question mark decorations */}
      <div className="absolute top-20 left-10 text-6xl text-white/10 animate-bounce-subtle">
        ?
      </div>
      <div
        className="absolute top-40 right-20 text-4xl text-white/10 animate-bounce-subtle"
        style={{ animationDelay: "1s" }}
      >
        ?
      </div>
      <div
        className="absolute bottom-40 left-20 text-5xl text-white/10 animate-bounce-subtle"
        style={{ animationDelay: "2s" }}
      >
        ?
      </div>
      <div
        className="absolute bottom-20 right-10 text-3xl text-white/10 animate-bounce-subtle"
        style={{ animationDelay: "0.5s" }}
      >
        ?
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-electric-500/20 rounded-full blur-xl animate-pulse-slow" />
      <div
        className="absolute top-3/4 right-1/4 w-40 h-40 bg-magic-500/20 rounded-full blur-xl animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-3/4 w-24 h-24 bg-neon-500/20 rounded-full blur-xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
};
