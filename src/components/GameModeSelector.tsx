"use client";

import { GameMode, RoundSize } from "@/lib/types";
import { cn } from "@/lib/utils";
import { IterationCcw, Infinity } from "lucide-react";

interface GameModeSelectorProps {
  mode: GameMode;
  roundSize: RoundSize;
  onModeChange: (mode: GameMode) => void;
  onRoundSizeChange: (size: RoundSize) => void;
}

const modes: { value: GameMode; label: string; icon: typeof IterationCcw }[] = [
  { value: "rounds", label: "Rounds", icon: IterationCcw },
  { value: "endless", label: "Endless", icon: Infinity },
];

export default function GameModeSelector({
  mode,
  roundSize,
  onModeChange,
  onRoundSizeChange,
}: GameModeSelectorProps) {
  return (
    <div className="space-y-2.5">
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
        Mode
      </label>
      <div className="grid grid-cols-2 gap-2">
        {modes.map((m) => {
          const Icon = m.icon;
          const active = mode === m.value;
          return (
            <button
              key={m.value}
              className={cn(
                "group flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all",
                active
                  ? "border-primary/40 bg-primary/8 text-foreground shadow-sm shadow-primary/5"
                  : "border-transparent bg-secondary/40 text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
              )}
              onClick={() => onModeChange(m.value)}
            >
              <Icon
                className={cn(
                  "h-3.5 w-3.5 transition-colors",
                  active ? "text-primary" : "text-muted-foreground/60"
                )}
              />
              {m.label}
            </button>
          );
        })}
      </div>
      {mode === "rounds" && (
        <div className="grid grid-cols-2 gap-2">
          {([10, 20] as const).map((size) => (
            <button
              key={size}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-medium font-mono transition-all",
                roundSize === size
                  ? "border-primary/30 bg-primary/5 text-foreground"
                  : "border-transparent bg-secondary/30 text-muted-foreground hover:text-foreground"
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
