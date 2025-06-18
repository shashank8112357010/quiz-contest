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
      console.log("🎯 Triggering onboarding tour for new user:", user.uid);
      const timer = setTimeout(() => {
        setShowTour(true);
      }, 2000); // Slightly longer delay to ensure everything is loaded

      return () => clearTimeout(timer);
    } else if (user && userData && onboardingState.hasSeenTour) {
      console.log("✅ User has already seen onboarding tour");
    }
  }, [user, userData, onboardingState.hasSeenTour]);

  // Additional check for completely new users (first time authentication)
  useEffect(() => {
    if (user && userData) {
      // Check if this is a brand new user (just created account)
      const userCreationTime = new Date(userData.createdAt || 0).getTime();
      const now = new Date().getTime();
      const timeDifference = now - userCreationTime;

      // If user was created within the last 5 minutes and hasn't seen tour
      if (timeDifference < 5 * 60 * 1000 && !onboardingState.hasSeenTour) {
        console.log("🆕 Brand new user detected, forcing onboarding tour");
        const timer = setTimeout(() => {
          setShowTour(true);
        }, 3000);

        return () => clearTimeout(timer);
      }
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

    // Trigger achievement for completing tour
    const event = new CustomEvent("achievement", { detail: "first_tour" });
    window.dispatchEvent(event);

    // Redirect to profile page after onboarding
    setTimeout(() => {
      window.location.href = "/profile";
    }, 1500); // Give time for achievement notification to show
  };

  const markFirstQuizCompleted = () => {
    if (!onboardingState.hasCompletedFirstQuiz) {
      saveOnboardingState({ hasCompletedFirstQuiz: true });
      const event = new CustomEvent("achievement", { detail: "first_quiz" });
      window.dispatchEvent(event);
    }
  };

  const markPowerupUsed = () => {
    if (!onboardingState.hasUsedPowerup) {
      saveOnboardingState({ hasUsedPowerup: true });
      const event = new CustomEvent("achievement", { detail: "power_user" });
      window.dispatchEvent(event);
    }
  };

  const markCategoriesViewed = () => {
    if (!onboardingState.hasViewedCategories) {
      saveOnboardingState({ hasViewedCategories: true });
      const event = new CustomEvent("achievement", {
        detail: "category_explorer",
      });
      window.dispatchEvent(event);
    }
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
