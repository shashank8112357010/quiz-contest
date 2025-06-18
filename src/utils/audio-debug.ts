// Audio Error Debugging Utility
// Add this temporarily to help identify the source of "[object Object]" errors

// Override console.error to catch any remaining problematic logging
const originalConsoleError = console.error;

console.error = function (...args: any[]) {
  // Check if this is an audio error with object logging
  if (
    args.length >= 2 &&
    typeof args[0] === "string" &&
    args[0].includes("Audio") &&
    args[1] &&
    typeof args[1] === "object" &&
    args[1].toString() === "[object Object]"
  ) {
    console.warn("🚨 FOUND PROBLEMATIC AUDIO ERROR LOGGING!");
    console.warn("Error message:", args[0]);
    console.warn("Raw object:", args[1]);

    // Try to extract useful information from the object
    if (args[1].target) {
      const target = args[1].target as HTMLAudioElement;
      const error = target.error;
      console.warn("🔧 FIXED ERROR INFO:", {
        code: error?.code,
        message: error?.message || "Unknown audio error",
        src: target.src,
        networkState: target.networkState,
        readyState: target.readyState,
        stackTrace: new Error().stack,
      });
    }

    // Also log the stack trace to see where this is coming from
    console.warn("📍 Stack trace:", new Error().stack);
    return;
  }

  // Call original console.error for all other messages
  originalConsoleError.apply(console, args);
};

console.log(
  '🔍 Audio error debugging enabled - will catch any "[object Object]" errors',
);

export {}; // Make this a module
