import { useGameStore, QuizSession, User, AgentState } from "./store";

export interface CoachingMessage {
  type: "encouragement" | "hint" | "explanation" | "motivation" | "strategy";
  message: string;
  action?:
    | "suggest-power"
    | "lower-difficulty"
    | "take-break"
    | "review-category";
  data?: any;
}

export class QuizAgent {
  private static instance: QuizAgent;

  public static getInstance(): QuizAgent {
    if (!QuizAgent.instance) {
      QuizAgent.instance = new QuizAgent();
    }
    return QuizAgent.instance;
  }

  // Analyze user performance and suggest adaptive changes
  analyzePerformance(
    sessions: QuizSession[],
    user: User,
  ): {
    difficulty: "easy" | "medium" | "hard";
    suggestedPowers: string[];
    motivationalLevel: "high" | "medium" | "low";
    strugglingAreas: string[];
  } {
    if (sessions.length === 0) {
      return {
        difficulty: "medium",
        suggestedPowers: [],
        motivationalLevel: "high",
        strugglingAreas: [],
      };
    }

    const recentSessions = sessions.slice(-5); // Last 5 sessions
    const totalQuestions = recentSessions.reduce(
      (sum, session) => sum + session.questions.length,
      0,
    );
    const correctAnswers = recentSessions.reduce(
      (sum, session) =>
        sum +
        session.answers.filter((answer, index) => {
          // This would need to be compared with correct answers from question data
          return answer !== null; // Simplified for now
        }).length,
      0,
    );

    const accuracy = totalQuestions > 0 ? correctAnswers / totalQuestions : 0.5;
    const avgTimePerQuestion =
      recentSessions.reduce(
        (sum, session) => sum + session.timeSpent.reduce((a, b) => a + b, 0),
        0,
      ) / totalQuestions;

    // Determine difficulty adjustment
    let difficulty: "easy" | "medium" | "hard" = "medium";
    if (accuracy < 0.4) {
      difficulty = "easy";
    } else if (accuracy > 0.8 && avgTimePerQuestion < 15) {
      difficulty = "hard";
    }

    // Suggest powers based on performance
    const suggestedPowers: string[] = [];
    if (accuracy < 0.5) {
      suggestedPowers.push("fiftyFifty");
    }
    if (avgTimePerQuestion > 25) {
      suggestedPowers.push("expertPoll");
    }
    if (user.lives <= 1) {
      suggestedPowers.push("flip");
    }

    // Determine motivational level
    let motivationalLevel: "high" | "medium" | "low" = "medium";
    if (accuracy < 0.3 || user.lives <= 1) {
      motivationalLevel = "low";
    } else if (accuracy > 0.7 && user.streak > 3) {
      motivationalLevel = "high";
    }

    // Identify struggling areas (would be more sophisticated with actual question data)
    const strugglingAreas: string[] = [];
    const categoryPerformance = new Map<string, number>();

    recentSessions.forEach((session) => {
      const sessionAccuracy =
        session.answers.filter((a) => a !== null).length /
        session.questions.length;
      if (sessionAccuracy < 0.4) {
        strugglingAreas.push(session.categoryId);
      }
    });

    return {
      difficulty,
      suggestedPowers: [...new Set(suggestedPowers)],
      motivationalLevel,
      strugglingAreas: [...new Set(strugglingAreas)],
    };
  }

  // Generate contextual coaching messages
  generateCoachingMessage(context: {
    questionNumber: number;
    totalQuestions: number;
    isCorrect: boolean;
    timeSpent: number;
    livesRemaining: number;
    currentStreak: number;
    difficulty: string;
    category: string;
  }): CoachingMessage {
    const {
      questionNumber,
      totalQuestions,
      isCorrect,
      timeSpent,
      livesRemaining,
      currentStreak,
      difficulty,
      category,
    } = context;

    // Encouragement messages
    if (isCorrect) {
      if (currentStreak >= 3) {
        return {
          type: "encouragement",
          message: `🔥 Amazing! You're on fire with ${currentStreak} correct answers in a row! Keep this momentum going!`,
        };
      } else if (timeSpent < 10) {
        return {
          type: "encouragement",
          message: `⚡ Lightning fast! You answered that in ${timeSpent} seconds. Your ${category} knowledge is impressive!`,
        };
      } else {
        return {
          type: "encouragement",
          message: `✅ Correct! Well done. You're showing great progress in ${category}.`,
        };
      }
    }

    // Support messages for incorrect answers
    if (!isCorrect) {
      if (livesRemaining <= 1) {
        return {
          type: "motivation",
          message: `💪 Don't give up! This is your last chance. Take a deep breath and trust your instincts.`,
          action: "suggest-power",
        };
      } else if (timeSpent > 25) {
        return {
          type: "strategy",
          message: `⏰ Take your time, but remember - your first instinct is often correct. Try not to overthink it!`,
          action: "suggest-power",
        };
      } else {
        return {
          type: "motivation",
          message: `📚 Not quite right, but you're learning! Every mistake is a step towards mastery in ${category}.`,
        };
      }
    }

    // Progress messages
    if (questionNumber === Math.floor(totalQuestions / 2)) {
      return {
        type: "encouragement",
        message: `🎯 Halfway there! You're doing great. ${livesRemaining} ${livesRemaining === 1 ? "life" : "lives"} remaining.`,
      };
    }

    // Default encouragement
    return {
      type: "encouragement",
      message: `🌟 Keep going! You've got this!`,
    };
  }

  // Suggest when to use powers
  shouldSuggestPower(context: {
    consecutiveWrong: number;
    timeSpent: number;
    livesRemaining: number;
    availablePowers: { [key: string]: number };
    difficulty: string;
  }): { power: string; reason: string } | null {
    const {
      consecutiveWrong,
      timeSpent,
      livesRemaining,
      availablePowers,
      difficulty,
    } = context;

    // Suggest 50-50 if struggling with multiple wrong answers
    if (consecutiveWrong >= 2 && availablePowers.fiftyFifty > 0) {
      return {
        power: "fiftyFifty",
        reason:
          "You've missed a couple questions. A 50-50 might help narrow down the options!",
      };
    }

    // Suggest expert poll if taking too long
    if (timeSpent > 20 && availablePowers.expertPoll > 0) {
      return {
        power: "expertPoll",
        reason:
          "Taking your time is good, but an expert poll could give you the confidence boost you need!",
      };
    }

    // Suggest flip if on last life
    if (livesRemaining <= 1 && availablePowers.flip > 0) {
      return {
        power: "flip",
        reason:
          "This is critical! Use a flip to get a second chance if you get this wrong.",
      };
    }

    return null;
  }

  // Adaptive difficulty adjustment
  adjustDifficulty(performance: {
    accuracy: number;
    avgTime: number;
    streak: number;
  }): "easy" | "medium" | "hard" {
    const { accuracy, avgTime, streak } = performance;

    // Lower difficulty if struggling
    if (accuracy < 0.4 || (accuracy < 0.6 && avgTime > 25)) {
      return "easy";
    }

    // Increase difficulty if performing well
    if (accuracy > 0.8 && avgTime < 15 && streak >= 3) {
      return "hard";
    }

    return "medium";
  }

  // Generate motivational messages based on session state
  generateMotivation(context: {
    livesLost: number;
    streak: number;
    category: string;
    timeOfDay: "morning" | "afternoon" | "evening";
    userLevel: number;
  }): string {
    const { livesLost, streak, category, timeOfDay, userLevel } = context;

    const timeGreeting = {
      morning: "Good morning",
      afternoon: "Good afternoon",
      evening: "Good evening",
    }[timeOfDay];

    if (streak >= 5) {
      return `${timeGreeting}! 🌟 You're absolutely crushing it with ${streak} correct answers! You're becoming a true ${category} expert!`;
    }

    if (livesLost >= 2) {
      return `${timeGreeting}! 💪 Remember, every expert was once a beginner. You're level ${userLevel} already - that shows dedication!`;
    }

    if (userLevel < 5) {
      return `${timeGreeting}! 🚀 Welcome to your quiz journey! Every question makes you smarter, regardless of the answer.`;
    }

    return `${timeGreeting}! 🎯 Ready to expand your ${category} knowledge? Let's make this session count!`;
  }

  // Session memory analysis
  analyzeSessionMemory(sessions: QuizSession[]): {
    preferredCategories: string[];
    bestPerformanceTime: "morning" | "afternoon" | "evening";
    averageSessionLength: number;
    improvingAreas: string[];
    needsWork: string[];
  } {
    if (sessions.length === 0) {
      return {
        preferredCategories: [],
        bestPerformanceTime: "afternoon",
        averageSessionLength: 0,
        improvingAreas: [],
        needsWork: [],
      };
    }

    // Category preferences based on frequency and performance
    const categoryStats = new Map<
      string,
      { count: number; totalScore: number }
    >();
    sessions.forEach((session) => {
      const existing = categoryStats.get(session.categoryId) || {
        count: 0,
        totalScore: 0,
      };
      categoryStats.set(session.categoryId, {
        count: existing.count + 1,
        totalScore: existing.totalScore + session.score,
      });
    });

    const preferredCategories = Array.from(categoryStats.entries())
      .sort(
        (a, b) => b[1].totalScore / b[1].count - a[1].totalScore / a[1].count,
      )
      .slice(0, 3)
      .map(([category]) => category);

    // Time analysis (simplified - would need actual timestamp analysis)
    const bestPerformanceTime: "morning" | "afternoon" | "evening" =
      "afternoon";

    // Average session length
    const averageSessionLength =
      sessions.reduce((sum, session) => {
        const sessionTime =
          session.endTime && session.startTime
            ? (session.endTime.getTime() - session.startTime.getTime()) / 1000
            : 0;
        return sum + sessionTime;
      }, 0) / sessions.length;

    return {
      preferredCategories,
      bestPerformanceTime,
      averageSessionLength,
      improvingAreas: preferredCategories.slice(0, 2),
      needsWork: Array.from(categoryStats.entries())
        .filter(([, stats]) => stats.totalScore / stats.count < 50)
        .map(([category]) => category),
    };
  }
}

// Hook to use the AI agent
export const useQuizAgent = () => {
  const agent = QuizAgent.getInstance();
  const {
    agent: agentState,
    updateAgentState,
    setCoachingMessage,
    setShowCoaching,
  } = useGameStore();

  const provideCoaching = (context: any) => {
    const message = agent.generateCoachingMessage(context);
    setCoachingMessage(message.message);
    setShowCoaching(true);

    // Auto-hide coaching after 4 seconds
    setTimeout(() => {
      setShowCoaching(false);
    }, 4000);

    return message;
  };

  const analyzePerfomance = (sessions: QuizSession[], user: any) => {
    const analysis = agent.analyzePerformance(sessions, user);
    updateAgentState(analysis);
    return analysis;
  };

  const suggestPower = (context: any) => {
    return agent.shouldSuggestPower(context);
  };

  const adjustDifficulty = (performance: any) => {
    const newDifficulty = agent.adjustDifficulty(performance);
    updateAgentState({ adaptiveDifficulty: newDifficulty });
    return newDifficulty;
  };

  return {
    provideCoaching,
    analyzePerfomance,
    suggestPower,
    adjustDifficulty,
    agentState,
  };
};
