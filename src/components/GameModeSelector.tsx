"use client";

import { GameMode, RoundSize } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Timer, Infinity } from "lucide-react";

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
    <div className="space-y-6">
      {/* Game Engine */}
      <div className="space-y-3">
        <label className="font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          GAME ENGINE
        </label>
        <div className="flex gap-4">
          <button
            onClick={() => onModeChange("rounds")}
            className={cn(
              "flex-1 flex items-center gap-3 p-4 rounded cursor-pointer transition-all",
              mode === "rounds"
                ? "bg-surface-container-high border-b-2 border-primary-container"
                : "bg-surface-container-low hover:bg-surface-container-high/50",
            )}
          >
            <Timer
              className={cn(
                "h-4 w-4",
                mode === "rounds" ? "text-primary" : "text-muted-foreground",
              )}
            />
            <span
              className={cn(
                "font-[family-name:var(--font-label-font)] text-xs uppercase font-bold tracking-[0.15em]",
                mode === "rounds" ? "text-foreground" : "text-muted-foreground",
              )}
            >
              ROUNDS
            </span>
          </button>
          <button
            onClick={() => onModeChange("endless")}
            className={cn(
              "flex-1 flex items-center gap-3 p-4 rounded cursor-pointer transition-all",
              mode === "endless"
                ? "bg-surface-container-high border-b-2 border-primary-container"
                : "bg-surface-container-low hover:bg-surface-container-high/50",
            )}
          >
            <Infinity
              className={cn(
                "h-4 w-4",
                mode === "endless" ? "text-primary" : "text-muted-foreground",
              )}
            />
            <span
              className={cn(
                "font-[family-name:var(--font-label-font)] text-xs uppercase tracking-[0.15em]",
                mode === "endless"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground",
              )}
            >
              ENDLESS
            </span>
          </button>
        </div>
      </div>

      {/* Telemetry Window (Round Size) */}
      {mode === "rounds" && (
        <div className="space-y-3">
          <label className="font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            TELEMETRY WINDOW
          </label>
          <div className="flex gap-2">
            {([10, 20] as const).map((size) => (
              <button
                key={size}
                className={cn(
                  "flex-1 py-3 text-[10px] font-[family-name:var(--font-label-font)] font-bold rounded uppercase transition-all",
                  roundSize === size
                    ? "bg-secondary-foreground text-white"
                    : "border border-outline-variant text-foreground hover:bg-foreground/5",
                )}
                onClick={() => onRoundSizeChange(size)}
              >
                {size} UNITS
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
