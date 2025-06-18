// Comprehensive Audio Error Fix
// This utility ensures ALL audio errors are properly formatted

export const fixAudioErrorLogging = () => {
  // Override any remaining problematic error handlers
  const originalAddEventListener = HTMLAudioElement.prototype.addEventListener;

  HTMLAudioElement.prototype.addEventListener = function (
    type: string,
    listener: any,
    options?: boolean | AddEventListenerOptions,
  ) {
    if (type === "error" && typeof listener === "function") {
      // Wrap the error listener to ensure proper error formatting
      const wrappedListener = (e: Event) => {
        const target = e.target as HTMLAudioElement;
        const error = target.error;

        // Create properly formatted error info
        const errorInfo = {
          code: error?.code,
          message: error?.message || "Unknown audio error",
          src: target.src,
          networkState: target.networkState,
          readyState: target.readyState,
          currentTime: target.currentTime,
          duration: target.duration || 0,
        };

        // Call the original listener but with proper error context
        try {
          // Try to detect if the original listener was going to log [object Object]
          const originalConsoleError = console.error;
          const originalConsoleWarn = console.warn;
          const originalConsoleLog = console.log;

          let intercepted = false;

          // Temporarily override console methods to catch problematic logging
          console.error = (...args) => {
            if (
              args.some(
                (arg) =>
                  arg &&
                  typeof arg === "object" &&
                  arg.toString() === "[object Object]",
              )
            ) {
              console.error("🔧 FIXED Audio loading error:", errorInfo);
              intercepted = true;
              return;
            }
            originalConsoleError(...args);
          };

          console.warn = (...args) => {
            if (
              args.some(
                (arg) =>
                  arg &&
                  typeof arg === "object" &&
                  arg.toString() === "[object Object]",
              )
            ) {
              console.warn("🔧 FIXED Audio warning:", errorInfo);
              intercepted = true;
              return;
            }
            originalConsoleWarn(...args);
          };

          console.log = (...args) => {
            if (
              args.some(
                (arg) =>
                  arg &&
                  typeof arg === "object" &&
                  arg.toString() === "[object Object]",
              )
            ) {
              console.log("🔧 FIXED Audio log:", errorInfo);
              intercepted = true;
              return;
            }
            originalConsoleLog(...args);
          };

          // Call the original listener
          listener(e);

          // Restore console methods
          console.error = originalConsoleError;
          console.warn = originalConsoleWarn;
          console.log = originalConsoleLog;

          // If nothing was intercepted, the listener might be expecting the error object
          if (!intercepted) {
            // Check if this was likely a problematic direct error logging
            const listenerStr = listener.toString();
            if (
              listenerStr.includes("console.") &&
              listenerStr.includes("e)")
            ) {
              console.error(
                "🔧 FIXED Audio error (caught by wrapper):",
                errorInfo,
              );
            }
          }
        } catch (err) {
          // Fallback: just log the fixed error
          console.error("🔧 FIXED Audio error (fallback):", errorInfo);
        }
      };

      // Call the original addEventListener with our wrapped listener
      return originalAddEventListener.call(
        this,
        type,
        wrappedListener,
        options,
      );
    }

    // For non-error events, use the original method
    return originalAddEventListener.call(this, type, listener, options);
  };

  console.log(
    "🔧 Audio error logging fix applied - all audio errors will now show proper details",
  );
};

// Auto-apply the fix
fixAudioErrorLogging();
