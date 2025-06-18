import React from "react";
import { Button } from "./button";
import { Badge } from "./badge";

const TOTAL_DAYS = 90;
const QUESTIONS_PER_DAY = 10;

export interface DailyProgressProps {
  unlockedDays: number; // e.g., 4 if up to Day 4 is unlocked
  completedDays: number[]; // e.g., [1,2,3]
  onPlay: (day: number) => void;
}

export const DailyProgress: React.FC<DailyProgressProps> = ({ unlockedDays, completedDays, onPlay }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {Array.from({ length: TOTAL_DAYS }).map((_, idx) => {
        const day = idx + 1;
        const isUnlocked = day <= unlockedDays;
        const isCompleted = completedDays.includes(day);
        return (
          <div
            key={day}
            className={`rounded-xl border p-4 flex flex-col items-center justify-center shadow-md transition-all duration-200 ${
              isUnlocked ? "bg-gradient-to-br from-electric-900/20 to-white/10 border-electric-400/30" : "bg-slate-800/30 border-slate-700/60 opacity-60"
            }`}
          >
            <Badge className="mb-2">Day {day}</Badge>
            <div className="mb-2 font-bold text-white text-lg">{isCompleted ? "✅ Completed" : isUnlocked ? "Unlocked" : "Locked"}</div>
            {isCompleted ? (
              <Button variant="outline" disabled className="w-full">Claimed</Button>
            ) : isUnlocked ? (
              <Button className="w-full" onClick={() => onPlay(day)}>Play Now</Button>
            ) : (
              <Button variant="outline" disabled className="w-full">Locked</Button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DailyProgress;
