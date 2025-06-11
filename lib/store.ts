import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  age?: number;
  gender?: "male" | "female" | "other";
  avatar?: string;
  coins: number;
  lives: number;
  totalStars: number;
  currentLevel: number;
  unlockedCategories: string[];
  powers: {
    fiftyFifty: number;
    flip: number;
    expertPoll: number;
  };
  streak: number;
  lastLoginDate?: string;
  totalGamesPlayed: number;
  totalCorrectAnswers: number;
  achievements: string[];
}

export interface QuizSession {
  sessionId: string;
  userId: string;
  categoryId: string;
  level: number;
  questions: string[];
  answers: (number | null)[];
  timeSpent: number[];
  score: number;
  stars: number;
  completed: boolean;
  startTime: Date;
  endTime?: Date;
  powersUsed: string[];
  hintsRequested: number;
  coachingReceived: string[];
}

export interface AgentState {
  sessionHistory: QuizSession[];
  currentStreak: number;
  strugglingAreas: string[];
  suggestedPowers: string[];
  motivationalLevel: "high" | "medium" | "low";
  adaptiveDifficulty: "easy" | "medium" | "hard";
  coachingMode: boolean;
  lastHintTime?: Date;
  performancePattern: "improving" | "stable" | "declining";
}

interface GameStore {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  updateUserCoins: (amount: number) => void;
  updateUserLives: (amount: number) => void;
  updateUserLevel: (level: number) => void;
  unlockCategory: (categoryId: string) => void;
  usePower: (powerType: keyof User["powers"]) => void;

  // Current quiz session
  currentSession: QuizSession | null;
  setCurrentSession: (session: QuizSession | null) => void;
  updateSessionAnswer: (
    questionIndex: number,
    answer: number,
    timeSpent: number,
  ) => void;

  // Agent state
  agent: AgentState;
  updateAgentState: (updates: Partial<AgentState>) => void;
  addStruggleArea: (area: string) => void;
  removeStruggleArea: (area: string) => void;
  updateMotivationalLevel: (level: AgentState["motivationalLevel"]) => void;

  // UI state
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  showCoaching: boolean;
  setShowCoaching: (show: boolean) => void;
  coachingMessage: string;
  setCoachingMessage: (message: string) => void;

  // Game mechanics
  availablePowers: string[];
  setAvailablePowers: (powers: string[]) => void;
  isUsingPower: boolean;
  setIsUsingPower: (using: boolean) => void;
  selectedPower: string | null;
  setSelectedPower: (power: string | null) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // User state
      user: null,
      setUser: (user) => set({ user }),
      updateUserCoins: (amount) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, coins: state.user.coins + amount }
            : null,
        })),
      updateUserLives: (amount) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, lives: Math.max(0, state.user.lives + amount) }
            : null,
        })),
      updateUserLevel: (level) =>
        set((state) => ({
          user: state.user ? { ...state.user, currentLevel: level } : null,
        })),
      unlockCategory: (categoryId) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                unlockedCategories: [
                  ...new Set([...state.user.unlockedCategories, categoryId]),
                ],
              }
            : null,
        })),
      usePower: (powerType) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                powers: {
                  ...state.user.powers,
                  [powerType]: Math.max(0, state.user.powers[powerType] - 1),
                },
              }
            : null,
        })),

      // Current quiz session
      currentSession: null,
      setCurrentSession: (session) => set({ currentSession: session }),
      updateSessionAnswer: (questionIndex, answer, timeSpent) =>
        set((state) => {
          if (!state.currentSession) return state;
          const newAnswers = [...state.currentSession.answers];
          const newTimeSpent = [...state.currentSession.timeSpent];
          newAnswers[questionIndex] = answer;
          newTimeSpent[questionIndex] = timeSpent;
          return {
            currentSession: {
              ...state.currentSession,
              answers: newAnswers,
              timeSpent: newTimeSpent,
            },
          };
        }),

      // Agent state
      agent: {
        sessionHistory: [],
        currentStreak: 0,
        strugglingAreas: [],
        suggestedPowers: [],
        motivationalLevel: "high",
        adaptiveDifficulty: "medium",
        coachingMode: true,
        performancePattern: "stable",
      },
      updateAgentState: (updates) =>
        set((state) => ({
          agent: { ...state.agent, ...updates },
        })),
      addStruggleArea: (area) =>
        set((state) => ({
          agent: {
            ...state.agent,
            strugglingAreas: [
              ...new Set([...state.agent.strugglingAreas, area]),
            ],
          },
        })),
      removeStruggleArea: (area) =>
        set((state) => ({
          agent: {
            ...state.agent,
            strugglingAreas: state.agent.strugglingAreas.filter(
              (a) => a !== area,
            ),
          },
        })),
      updateMotivationalLevel: (level) =>
        set((state) => ({
          agent: { ...state.agent, motivationalLevel: level },
        })),

      // UI state
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),
      showCoaching: false,
      setShowCoaching: (show) => set({ showCoaching: show }),
      coachingMessage: "",
      setCoachingMessage: (message) => set({ coachingMessage: message }),

      // Game mechanics
      availablePowers: [],
      setAvailablePowers: (powers) => set({ availablePowers: powers }),
      isUsingPower: false,
      setIsUsingPower: (using) => set({ isUsingPower: using }),
      selectedPower: null,
      setSelectedPower: (power) => set({ selectedPower: power }),
    }),
    {
      name: "quiz2play-storage",
      partialize: (state) => ({
        user: state.user,
        agent: state.agent,
      }),
    },
  ),
);
