import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Clock, Calendar, Trophy, ArrowLeft } from "lucide-react";
import {
  useLanguageStore,
  getAvailableQuestions,
  getDailyQuestionData,
} from "@/lib/languages";

interface DailyLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToCategories: () => void;
  onGoHome: () => void;
}

export const DailyLimitModal = ({
  isOpen,
  onClose,
  onGoToCategories,
  onGoHome,
}: DailyLimitModalProps) => {
  const { t } = useLanguageStore();
  const availableQuestions = getAvailableQuestions();
  const dailyData = getDailyQuestionData();

  // Calculate time until tomorrow
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const timeUntilTomorrow = tomorrow.getTime() - now.getTime();
  const hoursUntilTomorrow = Math.floor(timeUntilTomorrow / (1000 * 60 * 60));
  const minutesUntilTomorrow = Math.floor(
    (timeUntilTomorrow % (1000 * 60 * 60)) / (1000 * 60),
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/90 backdrop-blur-xl border border-white/20 text-white max-w-md mx-auto">
        <DialogHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-electric-500 to-magic-500 rounded-full flex items-center justify-center mb-4">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold text-white">
            {t("dailyLimitReached")}
          </DialogTitle>
          <DialogDescription className="text-white/80 mt-4">
            {t("dailyLimitMessage")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {/* Stats */}
          <div className="bg-white/10 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/70">
                {t("question")}s {t("played")} today:
              </span>
              <span className="font-bold text-electric-400">
                {dailyData.questionsPlayed}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Available tomorrow:</span>
              <span className="font-bold text-neon-400">
                {dailyData.maxQuestionsPerDay}
              </span>
            </div>
            {dailyData.accumulatedQuestions > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-white/70">Bonus questions:</span>
                <span className="font-bold text-magic-400">
                  +{dailyData.accumulatedQuestions}
                </span>
              </div>
            )}
          </div>

          {/* Countdown */}
          <div className="bg-gradient-to-r from-electric-500/20 to-magic-500/20 rounded-xl p-4 text-center border border-electric-400/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-electric-400" />
              <span className="text-white/80">Time until reset:</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {hoursUntilTomorrow}h {minutesUntilTomorrow}m
            </div>
          </div>

          {/* Motivational message */}
          <div className="text-center">
            <div className="text-4xl mb-2">🎯</div>
            <p className="text-white/70 text-sm">
              Great job on completing your daily challenge! Come back tomorrow
              for more exciting quizzes and rewards.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-6">
          <Button
            onClick={onGoToCategories}
            className="bg-gradient-to-r from-electric-500 to-magic-500 hover:from-electric-400 hover:to-magic-400 text-white"
          >
            <Trophy className="w-4 h-4 mr-2" />
            Browse Categories
          </Button>
          <Button
            variant="outline"
            onClick={onGoHome}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("backToHome")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
