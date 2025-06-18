/**
 * Example component demonstrating safe React hooks usage
 * This shows how to avoid hooks order violations when using dynamic imports
 */

import React, { Suspense, lazy } from "react";
import { useRenderTracker, validateHooksOrder } from "@/utils/hooks-safety";

// ✅ Correct: Static imports for hooks
import { useOnboarding } from "@/hooks/use-onboarding";
import { useAchievementToasts } from "@/components/ui/achievement-toast";

// ✅ Correct: Dynamic imports for heavy UI components only
const HeavyComponent = lazy(() => import("./HeavyComponent"));

// ❌ Wrong: Never do this - it violates Rules of Hooks
// const ConditionalHookExample = ({ shouldUseHook }: { shouldUseHook: boolean }) => {
//   if (shouldUseHook) {
//     const hook = useSomeHook(); // VIOLATION: Conditional hook call
//   }
// }

// ✅ Correct: Always call hooks in the same order
const SafeComponentExample: React.FC<{ enableFeature: boolean }> = ({
  enableFeature,
}) => {
  // Development helper to track renders and validate hooks order
  const { renderCount, logProps } = useRenderTracker("SafeComponentExample");

  // Always call hooks in the same order - never conditionally
  const onboardingData = useOnboarding();
  const achievementData = useAchievementToasts();

  // Validate hooks are called in expected order (development only)
  validateHooksOrder("SafeComponentExample", [
    "useRenderTracker",
    "useOnboarding",
    "useAchievementToasts",
  ]);

  // Log props for debugging (development only)
  React.useEffect(() => {
    logProps({ enableFeature });
  }, [enableFeature, logProps]);

  // ✅ Correct: Conditional rendering, not conditional hooks
  const handleFeatureAction = () => {
    if (enableFeature) {
      achievementData.showAchievement("feature_used");
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-bold mb-2">Safe Component Example</h3>
      <p className="text-sm text-gray-600 mb-4">Render count: {renderCount}</p>

      {/* ✅ Correct: Conditional rendering based on data, not conditional hooks */}
      {onboardingData.showTour && (
        <div className="bg-blue-100 p-2 rounded mb-2">
          Onboarding tour is active
        </div>
      )}

      {/* ✅ Correct: Feature toggle through conditional rendering */}
      {enableFeature ? (
        <button
          onClick={handleFeatureAction}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Use Feature
        </button>
      ) : (
        <button
          disabled
          className="bg-gray-300 text-gray-500 px-4 py-2 rounded"
        >
          Feature Disabled
        </button>
      )}

      {/* ✅ Correct: Dynamic component loading with Suspense */}
      <Suspense fallback={<div>Loading heavy component...</div>}>
        <HeavyComponentInner data={achievementData.activeToasts} />
      </Suspense>
    </div>
  );
};

export default SafeComponentExample;

/**
 * Hooks Usage Guidelines:
 *
 * ✅ DO:
 * - Always import hooks statically at the top
 * - Call hooks in the same order every render
 * - Use conditional rendering, not conditional hooks
 * - Import heavy UI components dynamically with lazy()
 * - Wrap dynamic components with Suspense
 * - Use error boundaries for graceful fallbacks
 *
 * ❌ DON'T:
 * - Call hooks inside loops, conditions, or nested functions
 * - Dynamically import hooks
 * - Change the order of hook calls between renders
 * - Use hooks after early returns
 * - Import hooks conditionally
 */

// Example of a placeholder heavy component for demonstration
const HeavyComponentInner: React.FC<{ data: any[] }> = ({ data }) => (
  <div className="mt-4 p-2 bg-gray-100 rounded">
    <p>Heavy Component Loaded</p>
    <p>Data items: {data.length}</p>
  </div>
);
