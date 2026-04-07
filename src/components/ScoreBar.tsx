"use client";

import { GameMode } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

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
  const progress = mode === "rounds" && roundSize ? (total / roundSize) * 100 : 0;

  return (
    <div className="flex items-center gap-3 flex-1 min-w-0">
      {/* Score */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-sm font-mono font-bold">
          {score}
          <span className="text-muted-foreground/50">/{total}</span>
        </span>
      </div>

      {/* Streak */}
      {mode === "endless" && streak !== undefined && streak > 0 && (
        <div className="flex items-center gap-1 shrink-0 text-primary">
          <Flame className="h-3.5 w-3.5" />
          <span className="text-xs font-bold font-mono">{streak}</span>
        </div>
      )}

      {/* Progress bar for rounds */}
      {mode === "rounds" && roundSize && (
        <div className="flex-1 min-w-0">
          <div className="h-1 rounded-full bg-muted overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full bg-primary transition-all duration-500 ease-out"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Endless counter */}
      {mode === "endless" && (
        <span className="text-xs text-muted-foreground">{total} answered</span>
      )}
    </div>
  );
}
