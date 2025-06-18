import { useState, useEffect } from "react";
import { getRandomQuestions } from "@/data/questions";

const QuizTest = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestions = () => {
      try {
        console.log("Loading questions...");
        const testQuestions = getRandomQuestions("gk", 3, "test-user");
        console.log("Loaded questions:", testQuestions);

        setQuestions(testQuestions);
        setError(null);
      } catch (err) {
        console.error("Error loading questions:", err);
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading test questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-center">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-yellow-400 text-center">
          <p>No questions loaded</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">
          Quiz Test - {questions.length} Questions Loaded
        </h1>

        {questions.map((question, index) => (
          <div key={question.id} className="bg-gray-800 rounded-lg p-6 mb-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              {index + 1}. {question.question}
            </h3>
            <div className="space-y-2">
              {question.options.map((option: string, optIndex: number) => (
                <div
                  key={optIndex}
                  className="p-3 bg-gray-700 rounded text-white hover:bg-gray-600 cursor-pointer"
                >
                  {String.fromCharCode(65 + optIndex)}. {option}
                </div>
              ))}
            </div>
            <p className="text-green-400 text-sm mt-2">
              Correct Answer: {question.options[question.correctAnswer]}
            </p>
          </div>
        ))}

        <div className="text-center">
          <button
            onClick={() => (window.location.href = "/quiz")}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Go to Real Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizTest;
