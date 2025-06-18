import { useState, useEffect } from "react";
import {
  checkAndResetDailyUnlock,
  isDailyLimitReached,
  incrementQuestionsUnlocked,
} from "@/lib/phoneAuth";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Clock,
  Trophy,
  Zap,
  Heart,
  ArrowLeft,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Question, getRandomQuestions } from "@/data/questions";
import { categories } from "@/pages/Categories";
import {
  QuestionExplanation,
  CompactExplanation,
  ExplanationSummary,
} from "@/components/ui/question-explanation";
import { GameStatusBar } from "@/components/ui/game-status-bar";
import { DailyLimitModal } from "@/components/ui/daily-limit-modal";
import { FeedbackToast } from "@/components/ui/feedback-toast";
import { useQuizAudio } from "@/components/ui/quiz-audio-system";
import {
  useLanguageStore,
  updateDailyQuestionCount,
  getContestProgress,
  updateContestProgress,
} from "@/lib/languages";
import { useAuth } from "@/components/providers/AuthProvider";

const Quiz = () => {
  const { categoryId, day } = useParams<{
    categoryId?: string;
    day?: string;
  }>();
  const parsedDay = day ? parseInt(day, 10) : undefined;
  const TOTAL_DAYS = 90;

  const { user } = useAuth();
  const { t } = useLanguageStore();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAnswered, setIsAnswered] = useState(false);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [showDailyLimitModal, setShowDailyLimitModal] = useState(false);
  const [questionsPlayedThisSession, setQuestionsPlayedThisSession] =
    useState(0);
  const [contestProgress, setContestProgress] = useState(() =>
    getContestProgress(),
  );
  const [firestoreUser, setFirestoreUser] = useState(user);
  const [loadingUnlock, setLoadingUnlock] = useState(true);

  const {
    startBackgroundMusic,
    stopBackgroundMusic,
    playCorrectAnswer,
    playWrongAnswer,
    playQuestionStart,
    playTimeWarning,
    playTimeUp,
    playQuizComplete,
    playTick,
  } = useQuizAudio();

  const category = categories.find((cat) => cat.id === categoryId);
  const categoryName = category?.name || "General Knowledge";
  const categoryColor = category?.color || "from-brand-500 to-electric-500";

  useEffect(() => {
    let isMounted = true;

    const loadQuiz = async () => {
      setLoadingUnlock(true);

      if (user?.uid) {
        const updatedUser = await checkAndResetDailyUnlock(user.uid);
        if (!isMounted) return;
        setFirestoreUser(updatedUser);
        if (updatedUser && isDailyLimitReached(updatedUser)) {
          setShowDailyLimitModal(true);
          setLoadingUnlock(false);
          return;
        }
      }

      const userId =
        user?.uid ||
        localStorage.getItem("anonymous-user-id") ||
        generateAnonymousId();
      let categoryQuestions = [];

      if (parsedDay !== undefined) {
        const defaultCategory = "gk"; // This is typically 'general-knowledge' or similar
        // Fetch 10 questions for the specified daily category
        categoryQuestions = getRandomQuestions(defaultCategory, 10, userId);
      } else {
        // Fetch 10 questions for the selected category, or "gk" if none selected
        categoryQuestions = getRandomQuestions(categoryId || "gk", 10, userId);
      }

      if (isMounted) {
        setQuestions(categoryQuestions);
        setUserAnswers(new Array(categoryQuestions.length).fill(null));
        setQuestionStartTime(Date.now());
        setContestProgress(getContestProgress());
        setLoadingUnlock(false);
        startBackgroundMusic();
      }
    };

    loadQuiz();

    return () => {
      isMounted = false;
      stopBackgroundMusic();
    };
  }, [
    categoryId,
    parsedDay,
    user?.uid,
    startBackgroundMusic,
    stopBackgroundMusic,
  ]);

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered && !gameOver && questions.length > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      if (timeLeft === 10 || timeLeft === 5) {
        playTimeWarning();
      }
      if ([5, 4, 3, 2, 1].includes(timeLeft)) {
        playTick();
      }
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered && questions.length > 0) {
      playTimeUp();
      handleTimeout();
    }
  }, [
    timeLeft,
    isAnswered,
    gameOver,
    questions,
    playTimeWarning,
    playTimeUp,
    playTick,
  ]);

  const handleTimeout = () => {
    setLives(lives - 1);
    setIsAnswered(true);
    setShowExplanation(true);
    if (lives <= 1) {
      setGameOver(true);
      setTimeout(() => setShowResult(true), 3000);
    } else {
      setTimeout(() => {
        setShowExplanation(false);
        nextQuestion();
      }, 4000);
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    if (isAnswered || questions.length === 0) return;
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setShowExplanation(true);
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newAnswers);
    if (isCorrect) {
      const points = questions[currentQuestion].points || 10;
      setScore(score + points);
      setCorrectAnswers(correctAnswers + 1);
      playCorrectAnswer();
    } else {
      setLives(lives - 1);
      playWrongAnswer();
      if (lives <= 1) {
        setGameOver(true);
        stopBackgroundMusic();
        setTimeout(() => setShowResult(true), 4000);
        return;
      }
    }
    setTimeout(
      () => {
        setShowExplanation(false);
        nextQuestion();
      },
      isCorrect ? 3000 : 4000,
    );
  };

  const nextQuestion = async () => {
    setQuestionsPlayedThisSession((prev) => prev + 1);
    updateDailyQuestionCount(1);
    updateContestProgress(1);
    setContestProgress(getContestProgress());
    if (user) await incrementQuestionsUnlocked(user.uid);
    if (user) {
      const updatedUser = await checkAndResetDailyUnlock(user.uid);
      setFirestoreUser(updatedUser);
      if (
        updatedUser &&
        isDailyLimitReached(updatedUser) &&
        currentQuestion < questions.length - 1
      ) {
        setShowDailyLimitModal(true);
        return;
      }
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(30);
      setQuestionStartTime(Date.now());
      playQuestionStart();
    } else {
      stopBackgroundMusic();
      playQuizComplete();
      setShowResult(true);
    }
  };

  const restartQuiz = async () => {
    if (user) {
      const updatedUser = await checkAndResetDailyUnlock(user.uid);
      setFirestoreUser(updatedUser);
      if (updatedUser && isDailyLimitReached(updatedUser)) {
        setShowDailyLimitModal(true);
        return;
      }
    }
    // const userId = user?.uid || localStorage.getItem("anonymous-user-id") || generateAnonymousId();
    // The userId was previously used as a seed, but getRandomQuestions no longer uses it.
    // Fetch 10 questions for the selected category, or "gk" if none selected
    const categoryQuestions = getRandomQuestions(categoryId || "gk", 10);
    setQuestions(categoryQuestions);
    setUserAnswers(new Array(categoryQuestions.length).fill(null)); // Use actual length
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setTimeLeft(30);
    setIsAnswered(false);
    setLives(3);
    setGameOver(false);
    setShowResult(false);
    setCorrectAnswers(0);
    setShowExplanation(false);
    setQuestionStartTime(Date.now());
    setQuestionsPlayedThisSession(0);
    setContestProgress(getContestProgress());
    startBackgroundMusic();
  };

  const goToCategories = () => {
    window.location.href = "/categories";
  };

  const goHome = () => {
    window.location.href = "/";
  };

  const generateAnonymousId = () => {
    const id =
      "anon_" +
      Math.random().toString(36).substr(2, 9) +
      Date.now().toString(36);
    localStorage.setItem("anonymous-user-id", id);
    return id;
  };

  if (
    parsedDay !== undefined &&
    (isNaN(parsedDay) || parsedDay < 1 || parsedDay > TOTAL_DAYS)
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-400 mb-4">
            Invalid Quiz Day
          </h1>
          <p className="text-lg text-white mb-6">
            Please select a valid day between 1 and {TOTAL_DAYS}.
          </p>
          <button
            className="px-4 py-2 bg-electric-500 text-white rounded"
            onClick={() => (window.location.href = "/rewards")}
          >
            Go to Rewards
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-40 min-h-screen flex items-center justify-center pt-16">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-electric-400 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading quiz questions...</p>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    const accuracy =
      questions.length > 0 ? (correctAnswers / questions.length) * 100 : 0;
    return (
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-40 min-h-screen p-4 pt-20">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 mb-8 text-center">
              <div className="mb-8">
                {gameOver ? (
                  <div className="text-6xl mb-4">💥</div>
                ) : (
                  <div className="text-6xl mb-4">🎉</div>
                )}
                <h2 className="text-3xl font-display font-bold text-white mb-4">
                  {gameOver ? "Game Over!" : "Quiz Complete!"}
                </h2>
                <Badge
                  className={`bg-gradient-to-r ${categoryColor} text-white px-4 py-2 mb-4`}
                >
                  {categoryName}
                </Badge>
                <div className="text-6xl font-bold bg-gradient-to-r from-neon-400 to-electric-400 bg-clip-text text-transparent mb-4">
                  {score}
                </div>
                <p className="text-white/80 text-lg">
                  You answered {correctAnswers} out of {questions.length}{" "}
                  questions correctly
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-2xl font-bold text-electric-400">
                    {score}
                  </div>
                  <div className="text-white/70 text-sm">Final Score</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-2xl font-bold text-neon-400">
                    {correctAnswers}
                  </div>
                  <div className="text-white/70 text-sm">Correct Answers</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-2xl font-bold text-magic-400">
                    {accuracy.toFixed(0)}%
                  </div>
                  <div className="text-white/70 text-sm">Accuracy</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button
                  onClick={restartQuiz}
                  className="bg-gradient-to-r from-neon-500 to-electric-500 hover:from-neon-400 hover:to-electric-400 text-white"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={goToCategories}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Try Other Category
                </Button>
              </div>
              <Button
                variant="ghost"
                className="text-white/70 hover:text-white"
                onClick={goHome}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-electric-400" />
                <h3 className="text-2xl font-bold text-white">
                  Learning Review
                </h3>
              </div>
              <ExplanationSummary
                questions={questions}
                userAnswers={userAnswers}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AnimatedBackground />
      <div className="relative z-10">
        <div className="fixed bottom-6 right-6 z-50 lg:hidden">
          <Button
            onClick={goToCategories}
            className="bg-gradient-to-r from-electric-500 to-neon-500 hover:from-electric-400 hover:to-neon-400 text-white shadow-2xl shadow-electric-500/30 rounded-full w-14 h-14 p-0 group"
            size="icon"
          >
            <div className="flex flex-col items-center">
              <Zap className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </div>
          </Button>
        </div>
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0 mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={goToCategories}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <Badge
                  className={`bg-gradient-to-r ${categoryColor} text-white px-4 py-2`}
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  {categoryName}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 text-xs px-4 py-2 h-auto font-semibold transition-all duration-300 shadow-lg shadow-electric-500/20"
                  onClick={goToCategories}
                >
                  <Zap className="w-3 h-3 mr-1" />
                  {t("changeCategory")}
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-3 lg:gap-4 w-full lg:w-auto justify-between lg:justify-end">
              <div className="bg-gradient-to-r from-magic-500/20 to-electric-500/20 backdrop-blur-sm rounded-xl border border-magic-400/30 px-4 py-2 shadow-lg shadow-magic-500/10">
                <div className="text-white text-sm font-bold text-center">
                  <span className="text-magic-300">{currentQuestion + 1}</span>{" "}
                  played /{" "}
                  <span className="text-electric-300">
                    {category?.questionCount || 125}
                  </span>
                </div>
                <div className="text-white/60 text-xs text-center">
                  Questions in bank
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(3)].map((_, i) => (
                  <Heart
                    key={i}
                    className={`w-6 h-6 ${i < lives ? "text-danger-400 fill-current" : "text-white/20"}`}
                  />
                ))}
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 px-3 py-2">
                <div className="text-white font-mono text-lg font-bold text-center">
                  {score}
                </div>
                <div className="text-white/60 text-xs text-center">Score</div>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/70 text-sm">
                {t("question")} {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-white/70 text-sm">
                {Math.round(progress)}% {t("complete")}
              </span>
            </div>
            <Progress value={progress} className="h-2 bg-white/20" />
          </div>
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 px-6 py-4">
              <div className="flex items-center gap-3">
                <Clock
                  className={`w-6 h-6 ${timeLeft <= 10 ? "text-danger-400" : "text-electric-400"}`}
                />
                <div
                  className={`text-3xl font-mono font-bold ${timeLeft <= 10 ? "text-danger-400" : "text-white"}`}
                >
                  {timeLeft}s
                </div>
              </div>
            </div>
          </div>
          {showExplanation && (
            <div className="mb-8">
              <CompactExplanation
                question={question}
                isCorrect={selectedAnswer === question.correctAnswer}
              />
              {(currentQuestion + 1) % 5 === 0 && (
                <div className="mt-4 bg-gradient-to-r from-electric-500/10 to-neon-500/10 backdrop-blur-sm rounded-xl border border-electric-400/30 p-4 text-center">
                  <p className="text-white/80 text-sm mb-3">
                    🎯 Want to try a different category?
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gradient-to-r from-electric-500/20 to-neon-500/20 border-electric-400/50 text-electric-100 hover:bg-electric-500/30 hover:border-electric-400 text-xs px-4 py-2 h-auto font-semibold transition-all duration-300"
                    onClick={goToCategories}
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    Explore Other Categories
                  </Button>
                </div>
              )}
            </div>
          )}
          {!showExplanation && (
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <Badge className="bg-electric-500/20 border-electric-400 text-electric-100 px-3 py-1">
                  {question.difficulty}
                </Badge>
                {question.category && (
                  <Badge className="bg-white/10 border-white/20 text-white/80 px-3 py-1">
                    {question.category}
                  </Badge>
                )}
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-8 leading-relaxed">
                {question.question}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option, index) => {
                  let buttonClass =
                    "bg-white/5 border-white/20 text-white hover:bg-white/10 text-left p-6 h-auto min-h-[80px] transition-all duration-200";
                  if (isAnswered) {
                    if (index === question.correctAnswer) {
                      buttonClass =
                        "bg-neon-500/30 border-neon-400 text-white border-2 shadow-lg shadow-neon-500/25";
                    } else if (
                      index === selectedAnswer &&
                      index !== question.correctAnswer
                    ) {
                      buttonClass =
                        "bg-danger-500/30 border-danger-400 text-white border-2 shadow-lg shadow-danger-500/25";
                    } else {
                      buttonClass = "bg-white/5 border-white/20 text-white/50";
                    }
                  }
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className={buttonClass}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={isAnswered}
                    >
                      <div className="flex items-center gap-4 w-full">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center font-bold shrink-0">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-base">{option}</span>
                      </div>
                    </Button>
                  );
                })}
              </div>
              {question.tags && question.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {question.tags.slice(0, 3).map((tag, index) => (
                    <Badge
                      key={index}
                      className="bg-white/5 border-white/20 text-white/60 text-xs"
                    >
                      #{tag.replace("-", " ")}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
