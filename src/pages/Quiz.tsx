import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Trophy, Zap, Heart } from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    category: "Geography",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    category: "Science",
  },
  {
    id: 3,
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: 2,
    category: "Art",
  },
  {
    id: 4,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswer: 3,
    category: "Geography",
  },
  {
    id: 5,
    question: "In which year did World War II end?",
    options: ["1944", "1945", "1946", "1947"],
    correctAnswer: 1,
    category: "History",
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAnswered, setIsAnswered] = useState(false);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleTimeout();
    }
  }, [timeLeft, isAnswered, gameOver]);

  const handleTimeout = () => {
    setLives(lives - 1);
    if (lives <= 1) {
      setGameOver(true);
      setShowResult(true);
    } else {
      nextQuestion();
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    if (answerIndex === sampleQuestions[currentQuestion].correctAnswer) {
      setScore(score + 100);
    } else {
      setLives(lives - 1);
      if (lives <= 1) {
        setGameOver(true);
        setShowResult(true);
        return;
      }
    }

    setTimeout(() => {
      nextQuestion();
    }, 1500);
  };

  const nextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(30);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setTimeLeft(30);
    setIsAnswered(false);
    setLives(3);
    setGameOver(false);
    setShowResult(false);
  };

  const question = sampleQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

  if (showResult) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-40 min-h-screen flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 max-w-2xl w-full text-center">
            <div className="mb-8">
              {gameOver ? (
                <div className="text-6xl mb-4">💥</div>
              ) : (
                <div className="text-6xl mb-4">🎉</div>
              )}
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                {gameOver ? "Game Over!" : "Quiz Complete!"}
              </h2>
              <div className="text-6xl font-bold bg-gradient-to-r from-neon-400 to-electric-400 bg-clip-text text-transparent mb-4">
                {score}
              </div>
              <p className="text-white/80 text-lg">
                You answered {Math.floor(score / 100)} out of{" "}
                {sampleQuestions.length} questions correctly
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
                  {Math.floor(score / 100)}
                </div>
                <div className="text-white/70 text-sm">Correct Answers</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-2xl font-bold text-magic-400">
                  {(
                    (Math.floor(score / 100) / sampleQuestions.length) *
                    100
                  ).toFixed(0)}
                  %
                </div>
                <div className="text-white/70 text-sm">Accuracy</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={restartQuiz}
                className="bg-gradient-to-r from-neon-500 to-electric-500 hover:from-neon-400 hover:to-electric-400 text-white"
              >
                <Zap className="w-4 h-4 mr-2" />
                Play Again
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => (window.location.href = "/")}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-40 min-h-screen p-4">
        {/* Header */}
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-8 pt-4">
            <Badge className="bg-magic-500/20 border-magic-400 text-magic-100 px-4 py-2">
              <Trophy className="w-4 h-4 mr-2" />
              Quiz Challenge
            </Badge>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(3)].map((_, i) => (
                  <Heart
                    key={i}
                    className={`w-6 h-6 ${i < lives ? "text-danger-400 fill-current" : "text-white/20"}`}
                  />
                ))}
              </div>
              <div className="text-white font-mono text-xl font-bold">
                {score}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/70 text-sm">
                Question {currentQuestion + 1} of {sampleQuestions.length}
              </span>
              <span className="text-white/70 text-sm">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2 bg-white/20" />
          </div>

          {/* Timer */}
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

          {/* Question Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 mb-8">
            <Badge className="bg-electric-500/20 border-electric-400 text-electric-100 px-3 py-1 mb-6">
              {question.category}
            </Badge>
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
                      "bg-neon-500/30 border-neon-400 text-white border-2";
                  } else if (
                    index === selectedAnswer &&
                    index !== question.correctAnswer
                  ) {
                    buttonClass =
                      "bg-danger-500/30 border-danger-400 text-white border-2";
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
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center font-bold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-base">{option}</span>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
