export interface FeedbackData {
  type: "like" | "dislike";
  timestamp: number;
  userAgent: string;
  page: string;
}

export const submitFeedback = (type: "like" | "dislike"): void => {
  const feedback: FeedbackData = {
    type,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
    page: window.location.pathname,
  };

  // Store feedback locally (in a real app, this would go to a backend)
  const existingFeedback = JSON.parse(
    localStorage.getItem("quiz2play-feedback") || "[]",
  );
  existingFeedback.push(feedback);
  localStorage.setItem("quiz2play-feedback", JSON.stringify(existingFeedback));

  // Show toast notification
  const event = new CustomEvent("show-feedback-toast", {
    detail: { type },
  });
  window.dispatchEvent(event);
};

export const getFeedbackStats = (): { likes: number; dislikes: number } => {
  const feedback = JSON.parse(
    localStorage.getItem("quiz2play-feedback") || "[]",
  );
  return {
    likes: feedback.filter((f: FeedbackData) => f.type === "like").length,
    dislikes: feedback.filter((f: FeedbackData) => f.type === "dislike").length,
  };
};
