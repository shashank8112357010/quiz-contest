/**
 * Dynamic dependency loader and manager
 * Ensures all dependencies are properly loaded and available
 */

// Core React dependencies
export const loadReactDependencies = async () => {
  const [React, ReactDOM] = await Promise.all([
    import("react"),
    import("react-dom"),
  ]);
  return { React, ReactDOM };
};

// UI Component dependencies
export const loadUIComponents = async () => {
  const modules = await Promise.all([
    import("@radix-ui/react-dialog"),
    import("@radix-ui/react-dropdown-menu"),
    import("@radix-ui/react-progress"),
    import("@radix-ui/react-toast"),
    import("@radix-ui/react-avatar"),
    import("@radix-ui/react-slot"),
    import("@radix-ui/react-tabs"),
    import("@radix-ui/react-accordion"),
    import("@radix-ui/react-alert-dialog"),
    import("@radix-ui/react-aspect-ratio"),
    import("@radix-ui/react-tooltip"),
    import("@radix-ui/react-label"),
  ]);

  return {
    Dialog: modules[0],
    DropdownMenu: modules[1],
    Progress: modules[2],
    Toast: modules[3],
    Avatar: modules[4],
    Slot: modules[5],
    Tabs: modules[6],
    Accordion: modules[7],
    AlertDialog: modules[8],
    AspectRatio: modules[9],
    Tooltip: modules[10],
    Label: modules[11],
  };
};

// Firebase dependencies
export const loadFirebaseDependencies = async () => {
  const [firebase, auth, firestore] = await Promise.all([
    import("firebase/app"),
    import("firebase/auth"),
    import("firebase/firestore"),
  ]);
  return { firebase, auth, firestore };
};

// Animation dependencies
export const loadAnimationDependencies = async () => {
  const [framerMotion, confetti] = await Promise.all([
    import("framer-motion"),
    import("react-confetti"),
  ]);
  return { framerMotion, confetti };
};

// Icons
export const loadIconDependencies = async () => {
  const lucideReact = await import("lucide-react");
  return { lucideReact };
};

// Utility dependencies
export const loadUtilityDependencies = async () => {
  const [clsx, tailwindMerge, cva, uuid] = await Promise.all([
    import("clsx"),
    import("tailwind-merge"),
    import("class-variance-authority"),
    import("uuid"),
  ]);
  return { clsx, tailwindMerge, cva, uuid };
};

// State management
export const loadStateManagement = async () => {
  const [zustand, reactQuery] = await Promise.all([
    import("zustand"),
    import("@tanstack/react-query"),
  ]);
  return { zustand, reactQuery };
};

// Router
export const loadRouterDependencies = async () => {
  const router = await import("react-router-dom");
  return { router };
};

// Preload critical dependencies
export const preloadCriticalDependencies = async () => {
  try {
    await Promise.all([
      loadReactDependencies(),
      loadRouterDependencies(),
      loadStateManagement(),
    ]);
    console.log("✅ Critical dependencies preloaded successfully");
  } catch (error) {
    console.error("❌ Failed to preload critical dependencies:", error);
  }
};

// Preload UI dependencies
export const preloadUIDependencies = async () => {
  try {
    await Promise.all([loadUIComponents(), loadIconDependencies()]);
    console.log("✅ UI dependencies preloaded successfully");
  } catch (error) {
    console.error("❌ Failed to preload UI dependencies:", error);
  }
};



// Export all loaders
export const dependencyLoaders = {
  react: loadReactDependencies,
  ui: loadUIComponents,
  firebase: loadFirebaseDependencies,
  animations: loadAnimationDependencies,
  icons: loadIconDependencies,
  utilities: loadUtilityDependencies,
  state: loadStateManagement,
  router: loadRouterDependencies,
};

// Initialize all dependencies
export const initializeDependencies = async () => {
  console.log("🚀 Initializing application dependencies...");

  try {
    // Preload critical dependencies first
    await preloadCriticalDependencies();

    // Preload UI dependencies in background
    preloadUIDependencies();



    console.log("✅ Application dependencies initialized successfully");
  } catch (error) {
    console.error("❌ Failed to initialize dependencies:", error);
    throw error;
  }
};
