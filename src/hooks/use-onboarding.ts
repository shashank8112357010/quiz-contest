import { useState, useEffect } from "react";
import { useAuth } from "@/components/providers/AuthProvider";

interface OnboardingState {
  hasSeenTour: boolean;
  hasCompletedFirstQuiz: boolean;
  hasUsedPowerup: boolean;
  hasViewedCategories: boolean;
  lastLoginDate: string | null;
}

const ONBOARDING_STORAGE_KEY = "quiz2play_onboarding";

export const useOnboarding = () => {
  const { user, userData } = useAuth();
  const [onboardingState, setOnboardingState] = useState<OnboardingState>({
    hasSeenTour: false,
    hasCompletedFirstQuiz: false,
    hasUsedPowerup: false,
    hasViewedCategories: false,
    lastLoginDate: null,
  });

  const [showTour, setShowTour] = useState(false);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);

  // Load onboarding state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (stored) {
      try {
        const parsedState = JSON.parse(stored);
        setOnboardingState(parsedState);
      } catch (error) {
        console.error("Error parsing onboarding state:", error);
      }
    }
  }, []);

  // Save onboarding state to localStorage
  const saveOnboardingState = (newState: Partial<OnboardingState>) => {
    const updatedState = { ...onboardingState, ...newState };
    setOnboardingState(updatedState);
    localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(updatedState));
  };

  // Check if user should see onboarding tour
  useEffect(() => {
    if (user && userData && !onboardingState.hasSeenTour) {
      // New user or user who hasn't seen the tour
      const timer = setTimeout(() => {
        setShowTour(true);
      }, 1000); // Small delay to let the page load

      return () => clearTimeout(timer);
    }
  }, [user, userData, onboardingState.hasSeenTour]);

  // Check for returning users
  useEffect(() => {
    if (user && userData && onboardingState.hasSeenTour) {
      const lastLogin = onboardingState.lastLoginDate;
      const today = new Date().toDateString();

      if (lastLogin && lastLogin !== today) {
        // Returning user after some time
        const timer = setTimeout(() => {
          setShowWelcomeBack(true);
        }, 500);

        return () => clearTimeout(timer);
      }

      // Update last login date
      saveOnboardingState({ lastLoginDate: today });
    }
  }, [user, userData]);

  const completeTour = () => {
    setShowTour(false);
    saveOnboardingState({
      hasSeenTour: true,
      lastLoginDate: new Date().toDateString(),
    });
  };

  const markFirstQuizCompleted = () => {
    saveOnboardingState({ hasCompletedFirstQuiz: true });
  };

  const markPowerupUsed = () => {
    saveOnboardingState({ hasUsedPowerup: true });
  };

  const markCategoriesViewed = () => {
    saveOnboardingState({ hasViewedCategories: true });
  };

  const dismissWelcomeBack = () => {
    setShowWelcomeBack(false);
  };

  const resetOnboarding = () => {
    localStorage.removeItem(ONBOARDING_STORAGE_KEY);
    setOnboardingState({
      hasSeenTour: false,
      hasCompletedFirstQuiz: false,
      hasUsedPowerup: false,
      hasViewedCategories: false,
      lastLoginDate: null,
    });
  };

  const triggerTour = () => {
    setShowTour(true);
  };

  return {
    onboardingState,
    showTour,
    showWelcomeBack,
    completeTour,
    markFirstQuizCompleted,
    markPowerupUsed,
    markCategoriesViewed,
    dismissWelcomeBack,
    resetOnboarding,
    triggerTour,
  };
};
