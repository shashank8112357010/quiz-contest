import { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown, X } from "lucide-react";
import { useLanguageStore } from "@/lib/languages";

export const FeedbackToast = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [feedbackType, setFeedbackType] = useState<"like" | "dislike">("like");
  const { t } = useLanguageStore();

  useEffect(() => {
    const handleFeedbackToast = (event: CustomEvent) => {
      setFeedbackType(event.detail.type);
      setIsVisible(true);

      // Auto hide after 3 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };

    window.addEventListener(
      "show-feedback-toast",
      handleFeedbackToast as EventListener,
    );

    return () => {
      window.removeEventListener(
        "show-feedback-toast",
        handleFeedbackToast as EventListener,
      );
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-in-right">
      <div
        className={`bg-black/90 backdrop-blur-xl border ${
          feedbackType === "like"
            ? "border-green-400/30 text-green-400"
            : "border-red-400/30 text-red-400"
        } rounded-xl p-4 max-w-sm shadow-2xl`}
      >
        <div className="flex items-center gap-3">
          {feedbackType === "like" ? (
            <ThumbsUp className="w-5 h-5 text-green-400" />
          ) : (
            <ThumbsDown className="w-5 h-5 text-red-400" />
          )}
          <span className="text-white font-medium">
            {t("thankYouFeedback")}
          </span>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/60 hover:text-white ml-auto"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
