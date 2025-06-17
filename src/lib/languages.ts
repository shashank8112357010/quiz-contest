export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const supportedLanguages: Language[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇵🇹",
  },
];

export interface Translations {
  // Header
  home: string;
  categories: string;
  leaderboard: string;
  gratifications: string;
  faq: string;
  login: string;
  signOut: string;
  changeCategory: string;

  // Quiz
  question: string;
  questionsInBank: string;
  played: string;
  complete: string;
  timeUp: string;
  gameOver: string;
  quizComplete: string;
  finalScore: string;
  correctAnswers: string;
  accuracy: string;
  playAgain: string;
  tryOtherCategory: string;
  backToHome: string;

  // Daily limit
  dailyLimitReached: string;
  dailyLimitMessage: string;
  comeBackTomorrow: string;
  questionsRemaining: string;

  // Feedback
  likePortal: string;
  dislikePortal: string;
  thankYouFeedback: string;

  // Common
  loading: string;
  continue: string;
  cancel: string;
  ok: string;
}

export const translations: Record<string, Translations> = {
  en: {
    home: "Home",
    categories: "Categories",
    leaderboard: "Leaderboard",
    gratifications: "Gratifications",
    faq: "FAQ",
    login: "Login",
    signOut: "Sign Out",
    changeCategory: "Change Category",

    question: "Question",
    questionsInBank: "Questions in bank",
    played: "played",
    complete: "Complete",
    timeUp: "Time Up!",
    gameOver: "Game Over!",
    quizComplete: "Quiz Complete!",
    finalScore: "Final Score",
    correctAnswers: "Correct Answers",
    accuracy: "Accuracy",
    playAgain: "Play Again",
    tryOtherCategory: "Try Other Category",
    backToHome: "Back to Home",

    dailyLimitReached: "Daily Limit Reached!",
    dailyLimitMessage:
      "You have completed your daily question limit. Come back tomorrow to continue your quiz journey!",
    comeBackTomorrow: "Come Back Tomorrow",
    questionsRemaining: "questions remaining today",

    likePortal: "Like Portal",
    dislikePortal: "Dislike Portal",
    thankYouFeedback: "Thank you for your feedback!",

    loading: "Loading...",
    continue: "Continue",
    cancel: "Cancel",
    ok: "OK",
  },
  ar: {
    home: "الرئيسية",
    categories: "الفئات",
    leaderboard: "لوحة المتصدرين",
    gratifications: "المكافآت",
    faq: "الأسئلة الشائعة",
    login: "تسجيل الدخول",
    signOut: "تسجيل الخروج",
    changeCategory: "تغيير الفئة",

    question: "سؤال",
    questionsInBank: "أسئلة في البنك",
    played: "تم لعبها",
    complete: "مكتمل",
    timeUp: "انتهى الوقت!",
    gameOver: "انتهت اللعبة!",
    quizComplete: "اكتمل الاختبار!",
    finalScore: "النتيجة النهائية",
    correctAnswers: "الإجابات الصحيحة",
    accuracy: "الدقة",
    playAgain: "العب مرة أخرى",
    tryOtherCategory: "جرب فئة أخرى",
    backToHome: "العودة للرئيسية",

    dailyLimitReached: "تم الوصول للحد اليومي!",
    dailyLimitMessage:
      "لقد أكملت حصتك اليومية من الأسئلة. عد غداً لمواصلة ��حلة الاختبار!",
    comeBackTomorrow: "عد غداً",
    questionsRemaining: "أسئلة متبقية اليوم",

    likePortal: "أعجبني البوابة",
    dislikePortal: "لم يعجبني البوابة",
    thankYouFeedback: "شكراً لك على ملاحظاتك!",

    loading: "جاري التحميل...",
    continue: "متابعة",
    cancel: "إلغاء",
    ok: "موافق",
  },
  pt: {
    home: "Início",
    categories: "Categorias",
    leaderboard: "Classificação",
    gratifications: "Gratificações",
    faq: "FAQ",
    login: "Entrar",
    signOut: "Sair",
    changeCategory: "Alterar Categoria",

    question: "Pergunta",
    questionsInBank: "Perguntas no banco",
    played: "jogadas",
    complete: "Completo",
    timeUp: "Tempo Esgotado!",
    gameOver: "Fim de Jogo!",
    quizComplete: "Quiz Completo!",
    finalScore: "Pontuação Final",
    correctAnswers: "Respostas Corretas",
    accuracy: "Precisão",
    playAgain: "Jogar Novamente",
    tryOtherCategory: "Tentar Outra Categoria",
    backToHome: "Voltar ao Início",

    dailyLimitReached: "Limite Diário Atingido!",
    dailyLimitMessage:
      "Você completou seu limite diário de perguntas. Volte amanhã para continuar sua jornada de quiz!",
    comeBackTomorrow: "Volte Amanhã",
    questionsRemaining: "perguntas restantes hoje",

    likePortal: "Curtir Portal",
    dislikePortal: "Não Curtir Portal",
    thankYouFeedback: "Obrigado pelo seu feedback!",

    loading: "Carregando...",
    continue: "Continuar",
    cancel: "Cancelar",
    ok: "OK",
  },
};

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Language store
export const useLanguageStore = create(
  persist(
    (set, get) => ({
      currentLanguage: "en",
      setLanguage: (language: string) => set({ currentLanguage: language }),
      t: (key: keyof Translations): string => {
        const currentLang = get().currentLanguage;
        return translations[currentLang]?.[key] || translations.en[key] || key;
      },
    }),
    {
      name: "quiz2play-language",
    },
  ),
);

// Daily question limit utilities
export interface DailyQuestionLimit {
  date: string;
  questionsPlayed: number;
  maxQuestionsPerDay: number;
  accumulatedQuestions: number;
}

// 90-day contest utilities
export interface ContestProgress {
  contestStartDate: string;
  totalQuestionsPlayed: number;
  dayNumber: number;
  maxContestDays: number;
  maxQuestionsPerContest: number;
}

export const DAILY_QUESTION_LIMIT = 10;

export const getDailyQuestionData = (): DailyQuestionLimit => {
  const today = new Date().toDateString();
  const saved = localStorage.getItem("quiz2play-daily-limit");

  if (saved) {
    const data = JSON.parse(saved);
    if (data.date === today) {
      return data;
    } else {
      // New day - reset and accumulate unused questions
      const unusedQuestions = Math.max(
        0,
        data.maxQuestionsPerDay - data.questionsPlayed,
      );
      return {
        date: today,
        questionsPlayed: 0,
        maxQuestionsPerDay: DAILY_QUESTION_LIMIT,
        accumulatedQuestions: Math.min(
          50,
          data.accumulatedQuestions + unusedQuestions,
        ), // Cap at 50
      };
    }
  }

  return {
    date: today,
    questionsPlayed: 0,
    maxQuestionsPerDay: DAILY_QUESTION_LIMIT,
    accumulatedQuestions: 0,
  };
};

export const updateDailyQuestionCount = (questionsPlayed: number): void => {
  const data = getDailyQuestionData();
  data.questionsPlayed += questionsPlayed;
  localStorage.setItem("quiz2play-daily-limit", JSON.stringify(data));
};

export const getAvailableQuestions = (): number => {
  const data = getDailyQuestionData();
  return Math.max(
    0,
    data.maxQuestionsPerDay + data.accumulatedQuestions - data.questionsPlayed,
  );
};

export const canPlayQuiz = (): boolean => {
  return getAvailableQuestions() > 0;
};
