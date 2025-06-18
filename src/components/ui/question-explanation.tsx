import React from "react"; // Moved to top
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Lightbulb,
  Eye,
  EyeOff,
  ExternalLink,
  Brain,
  CheckCircle,
  XCircle,
  Star,
  Clock,
} from "lucide-react";
import { Question } from "@/data/questions";

interface QuestionExplanationProps {
  question: Question;
  userAnswer?: number;
  isCorrect: boolean;
  timeSpent: number;
  showDetailed?: boolean;
}

export const QuestionExplanation = React.memo(function QuestionExplanation({
  question,
  userAnswer,
  isCorrect,
  timeSpent,
  showDetailed = true,
}: QuestionExplanationProps) {
  const [showDetailedExplanation, setShowDetailedExplanation] = useState(false);

  const correctOption = question.options[question.correctAnswer];
  const userOption =
    userAnswer !== undefined ? question.options[userAnswer] : "No answer";

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6 space-y-6">
      {/* Header with result */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isCorrect ? (
            <CheckCircle className="w-8 h-8 text-green-400" />
          ) : (
            <XCircle className="w-8 h-8 text-red-400" />
          )}
          <div>
            <h3
              className={`text-xl font-bold ${
                isCorrect ? "text-green-400" : "text-red-400"
              }`}
            >
              {isCorrect ? "Correct!" : "Incorrect"}
            </h3>
            <p className="text-white/70 text-sm">
              {isCorrect
                ? "Great job! You got it right."
                : "Don't worry, let's learn from this."}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-electric-400">
              +{question.points}
            </div>
            <div className="text-white/60 text-xs">Points</div>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1 text-white/80">
              <Clock className="w-4 h-4" />
              <span className="font-mono font-bold">{timeSpent}s</span>
            </div>
            <div className="text-white/60 text-xs">Time</div>
          </div>
        </div>
      </div>

      {/* Answer comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="font-bold text-green-300">Correct Answer</span>
          </div>
          <p className="text-white font-semibold">{correctOption}</p>
        </div>

        <div
          className={`${
            isCorrect
              ? "bg-green-500/20 border-green-400/30"
              : "bg-red-500/20 border-red-400/30"
          } border rounded-xl p-4`}
        >
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400" />
            )}
            <span
              className={`font-bold ${
                isCorrect ? "text-green-300" : "text-red-300"
              }`}
            >
              Your Answer
            </span>
          </div>
          <p className="text-white font-semibold">{userOption}</p>
        </div>
      </div>

      {/* Basic explanation */}
      <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-blue-400" />
          <span className="font-bold text-blue-300">Quick Explanation</span>
        </div>
        <p className="text-white/90 leading-relaxed">{question.explanation}</p>
      </div>

      {/* Detailed explanation toggle */}
      {showDetailed && question.detailedExplanation && (
        <div>
          <Button
            onClick={() => setShowDetailedExplanation(!showDetailedExplanation)}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 mb-4"
          >
            {showDetailedExplanation ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Hide Detailed Explanation
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Show Detailed Explanation
              </>
            )}
          </Button>

          {showDetailedExplanation && (
            <div className="bg-purple-500/20 border border-purple-400/30 rounded-xl p-6 animate-slide-up">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-6 h-6 text-purple-400" />
                <span className="font-bold text-purple-300 text-lg">
                  Detailed Explanation
                </span>
              </div>

              <div
                className="text-white/90 space-y-4 detailed-explanation"
                dangerouslySetInnerHTML={{
                  __html: question.detailedExplanation,
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* Fun fact */}
      {question.funFact && (
        <div className="bg-gold-500/20 border border-gold-400/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-gold-400" />
            <span className="font-bold text-gold-300">Fun Fact</span>
          </div>
          <p className="text-white/90 italic">{question.funFact}</p>
        </div>
      )}

      {/* Tags and references */}
      <div className="space-y-4">
        {/* Tags */}
        <div>
          <h4 className="text-white/80 font-semibold mb-2">Related Topics:</h4>
          <div className="flex flex-wrap gap-2">
            {question.tags.map((tag, index) => (
              <Badge
                key={index}
                className="bg-electric-500/20 border-electric-400/30 text-electric-200 text-xs"
              >
                #{tag.replace("-", " ")}
              </Badge>
            ))}
          </div>
        </div>

        {/* References */}
        {question.references && question.references.length > 0 && (
          <div>
            <h4 className="text-white/80 font-semibold mb-2">
              Learn More From:
            </h4>
            <div className="space-y-1">
              {question.references.map((reference, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-white/70 text-sm"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{reference}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Study tips */}
      <div className="bg-neon-500/20 border border-neon-400/30 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-5 h-5 text-neon-400" />
          <span className="font-bold text-neon-300">Study Tip</span>
        </div>
        <p className="text-white/90">
          {isCorrect
            ? "Excellent! Try to explain this concept to someone else to reinforce your understanding."
            : "Review the detailed explanation above and try to connect the information to what you already know."}
        </p>
      </div>
    </div>
  );
});

// Compact explanation for in-game display
export const CompactExplanation = React.memo(function CompactExplanation({
  question,
  isCorrect,
}: {
  question: Question;
  isCorrect: boolean;
}) {
  return (
    <div
      className={`p-4 rounded-xl border-2 ${
        isCorrect
          ? "bg-green-500/20 border-green-400"
          : "bg-red-500/20 border-red-400"
      } animate-slide-up`}
    >
      <div className="flex items-start gap-3">
        {isCorrect ? (
          <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
        ) : (
          <XCircle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
        )}
        <div>
          <p
            className={`font-bold mb-2 ${
              isCorrect ? "text-green-300" : "text-red-300"
            }`}
          >
            {isCorrect ? "Correct!" : "Incorrect"}
          </p>
          <p className="text-white/90 text-sm leading-relaxed">
            <strong>Answer:</strong> {question.options[question.correctAnswer]}
          </p>
          <p className="text-white/80 text-sm mt-2">{question.explanation}</p>
          {question.funFact && (
            <p className="text-gold-300 text-xs mt-2 italic">
              💡 {question.funFact}
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

// Results page explanation summary
export const ExplanationSummary = React.memo(function ExplanationSummary({
  questions,
  userAnswers,
}: {
  questions: Question[];
  userAnswers: (number | null)[];
}) {
  const correctCount = userAnswers.filter(
    (answer, index) => answer === questions[index]?.correctAnswer,
  ).length;

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">
          Quiz Review & Learning
        </h3>
        <p className="text-white/80">
          You got{" "}
          <span className="text-green-400 font-bold">{correctCount}</span> out
          of{" "}
          <span className="text-electric-400 font-bold">
            {questions.length}
          </span>{" "}
          questions correct
        </p>
      </div>

      {questions.map((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;

        return (
          <div
            key={question.id}
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-4"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {isCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-400" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-2">
                  Q{index + 1}: {question.question}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <p className="text-green-300">
                    <strong>Correct:</strong>{" "}
                    {question.options[question.correctAnswer]}
                  </p>
                  <p className={isCorrect ? "text-green-300" : "text-red-300"}>
                    <strong>Your answer:</strong>{" "}
                    {userAnswer !== null
                      ? question.options[userAnswer]
                      : "No answer"}
                  </p>
                </div>
                <p className="text-white/80 text-sm">{question.explanation}</p>
                {question.funFact && (
                  <p className="text-gold-300 text-xs mt-2 italic">
                    💡 {question.funFact}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});
