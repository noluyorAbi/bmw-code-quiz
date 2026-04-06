"use client";

import { GameMode, RoundSize } from "@/lib/types";

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
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Game Mode</h2>
      <div className="flex gap-2">
        <button
          className={`btn flex-1 ${
            mode === "rounds" ? "btn-primary" : "btn-ghost border-base-300"
          }`}
          onClick={() => onModeChange("rounds")}
        >
          Rounds
        </button>
        <button
          className={`btn flex-1 ${
            mode === "endless" ? "btn-primary" : "btn-ghost border-base-300"
          }`}
          onClick={() => onModeChange("endless")}
        >
          Endless
        </button>
      </div>
      {mode === "rounds" && (
        <div className="flex gap-2 mt-1">
          <button
            className={`btn btn-sm flex-1 ${
              roundSize === 10 ? "btn-secondary" : "btn-ghost border-base-300"
            }`}
            onClick={() => onRoundSizeChange(10)}
          >
            10 Questions
          </button>
          <button
            className={`btn btn-sm flex-1 ${
              roundSize === 20 ? "btn-secondary" : "btn-ghost border-base-300"
            }`}
            onClick={() => onRoundSizeChange(20)}
          >
            20 Questions
          </button>
        </div>
      )}
    </div>
  );
}
