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
  hero?: {
    contestTitle: string;
    season: string;
    subtitle: string;
  };
  // Header
  home: string;
  categories: string;
  leaderboard: {
    globalTitle: string;
    subtitle: string;
  };
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
    hero: {
      contestTitle: "Super Bonanza Contest",
      season: "(Season - 1)",
      subtitle: "India's biggest quiz contest with mega prizes!",
    },
    leaderboard: {
      globalTitle: "Global Leaderboard",
      subtitle: "Compete with quiz masters worldwide and climb to the top!",
    },
    home: "Home",
    categories: "Categories",
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
    hero: {
      contestTitle: "مسابقة بونانزا الكبرى",
      season: "(الموسم - 1)",
      subtitle: "أكبر مسابقة اختبار في الهند مع جوائز ضخمة!",
    },
    leaderboard: {
      globalTitle: "لوحة المتصدرين العالمية",
      subtitle: "تنافس مع أساتذة الاختبار من جميع أنحاء العالم وتسلق إلى القمة!",
    },
    home: "الرئيسية",
    categories: "الفئات",
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
      "لقد أكملت حصتك اليومية من الأسئلة. عد غداً لمواصلة رحلة الاختبار!",
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
    hero: {
      contestTitle: "Super Bonanza Concurso",
      season: "(Temporada - 1)",
      subtitle: "O maior concurso de perguntas da Índia com grandes prêmios!",
    },
    leaderboard: {
      globalTitle: "Classificação Global",
      subtitle: "Compita com mestres do quiz no mundo todo e chegue ao topo!",
    },
    home: "Início",
    categories: "Categorias",
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
interface LanguageStore {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      currentLanguage: "en",
      setLanguage: (language: string) => set({ currentLanguage: language }),
      t: (key: string): string => {
        const currentLang = get().currentLanguage;
        // Try to resolve nested keys (e.g., 'dashboard.offers.weekendBonus.title')
        const resolve = (obj: any, path: string): any => {
          return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
        };
        return (
          resolve(translations[currentLang], key) ||
          resolve(translations.en, key) ||
          key
        );
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

// 90-day contest utilities
export const CONTEST_DURATION_DAYS = 90;
export const CONTEST_START_DATE = "2024-01-01"; // Set your contest start date

export const getContestProgress = (): ContestProgress => {
  const contestStart = new Date(CONTEST_START_DATE);
  const today = new Date();
  const timeDiff = today.getTime() - contestStart.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

  const saved = localStorage.getItem("quiz2play-contest-progress");
  let totalQuestionsPlayed = 0;

  if (saved) {
    const data = JSON.parse(saved);
    totalQuestionsPlayed = data.totalQuestionsPlayed || 0;
  }

  return {
    contestStartDate: CONTEST_START_DATE,
    totalQuestionsPlayed,
    dayNumber: Math.max(1, Math.min(daysDiff + 1, CONTEST_DURATION_DAYS)),
    maxContestDays: CONTEST_DURATION_DAYS,
    maxQuestionsPerContest: CONTEST_DURATION_DAYS * DAILY_QUESTION_LIMIT, // 900 questions
  };
};

export const updateContestProgress = (questionsPlayed: number): void => {
  const current = getContestProgress();
  const updated = {
    ...current,
    totalQuestionsPlayed: current.totalQuestionsPlayed + questionsPlayed,
  };
  localStorage.setItem("quiz2play-contest-progress", JSON.stringify(updated));
};
