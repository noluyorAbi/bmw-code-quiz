"use client";

import { GameMode, RoundSize } from "@/lib/types";
import { cn } from "@/lib/utils";

interface GameModeSelectorProps {
  mode: GameMode;
  roundSize: RoundSize;
  onModeChange: (mode: GameMode) => void;
  onRoundSizeChange: (size: RoundSize) => void;
}

export default function GameModeSelector({
  mode,
  roundSize,
  onModeChange,
  onRoundSizeChange,
}: GameModeSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        Mode
      </label>
      <div className="grid grid-cols-2 gap-2">
        {(["rounds", "endless"] as const).map((m) => (
          <button
            key={m}
            className={cn(
              "rounded-lg border px-4 py-2.5 text-sm font-semibold capitalize transition-all",
              mode === m
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-transparent text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground"
            )}
            onClick={() => onModeChange(m)}
          >
            {m}
          </button>
        ))}
      </div>
      {mode === "rounds" && (
        <div className="grid grid-cols-2 gap-2">
          {([10, 20] as const).map((size) => (
            <button
              key={size}
              className={cn(
                "rounded-md border px-3 py-1.5 text-xs font-medium transition-all",
                roundSize === size
                  ? "border-primary/50 bg-primary/5 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
              onClick={() => onRoundSizeChange(size)}
            >
              {size} questions
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
