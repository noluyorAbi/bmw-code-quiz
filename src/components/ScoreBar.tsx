"use client";

import { GameMode } from "@/lib/types";
import { Flame } from "lucide-react";

interface ScoreBarProps {
  score: number;
  total: number;
  mode: GameMode;
  roundSize?: number;
  streak?: number;
}

export default function ScoreBar({ score, total, mode, roundSize, streak }: ScoreBarProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-px bg-surface-container-low rounded overflow-hidden">
      {/* Progress */}
      <div className="p-5 bg-surface-container flex flex-col justify-center">
        <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground uppercase mb-1">
          MISSION PROGRESS
        </span>
        <div className="flex items-baseline gap-3">
          <span className="text-xl font-[family-name:var(--font-display)] italic font-bold tracking-tighter text-foreground">
            Q.{String(total + 1).padStart(2, "0")}
          </span>
          {mode === "rounds" && roundSize && (
            <div className="flex-1 h-1 bg-surface-container-highest rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-container transition-all duration-500 ease-out"
                style={{ width: `${(total / roundSize) * 100}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Score */}
      <div className="p-5 bg-surface-container flex flex-col justify-center">
        <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground uppercase mb-1">
          CURRENT SCORE
        </span>
        <span className="text-xl font-mono font-bold text-primary tracking-tight">
          {score}/{total}
        </span>
      </div>

      {/* Streak */}
      <div className="p-5 bg-surface-container flex flex-col justify-center border-l border-border">
        <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground uppercase mb-1">
          {mode === "endless" ? "WIN STREAK" : "ACCURACY"}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xl font-mono font-bold text-foreground">
            {mode === "endless" ? (streak ?? 0).toString().padStart(2, "0") : total > 0 ? `${Math.round((score / total) * 100)}%` : "—"}
          </span>
          {mode === "endless" && streak !== undefined && streak > 0 && (
            <Flame className="h-4 w-4 text-destructive" />
          )}
        </div>
      </div>
    </section>
  );
}
