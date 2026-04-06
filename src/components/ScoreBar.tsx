"use client";

import { GameMode } from "@/lib/types";

interface ScoreBarProps {
  score: number;
  total: number;
  mode: GameMode;
  roundSize?: number;
  streak?: number;
}

export default function ScoreBar({
  score,
  total,
  mode,
  roundSize,
  streak,
}: ScoreBarProps) {
  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto mb-6">
      <div className="flex items-center gap-4">
        <div className="badge badge-primary badge-lg">
          Score: {score}/{total}
        </div>
        {mode === "endless" && streak !== undefined && streak > 0 && (
          <div className="badge badge-secondary badge-lg">
            Streak: {streak}
          </div>
        )}
      </div>
      {mode === "rounds" && roundSize && (
        <div className="flex-1 mx-4">
          <progress
            className="progress progress-primary w-full"
            value={total}
            max={roundSize}
          />
          <p className="text-xs text-center text-base-content/60 mt-1">
            Question {total} of {roundSize}
          </p>
        </div>
      )}
      {mode === "endless" && (
        <p className="text-sm text-base-content/60">Questions: {total}</p>
      )}
    </div>
  );
}
