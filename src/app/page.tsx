"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Difficulty, GameMode, RoundSize } from "@/lib/types";
import DifficultySelector from "@/components/DifficultySelector";
import GameModeSelector from "@/components/GameModeSelector";

export default function Home() {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<Difficulty>("core");
  const [mode, setMode] = useState<GameMode>("rounds");
  const [roundSize, setRoundSize] = useState<RoundSize>(10);

  function startGame() {
    const params = new URLSearchParams({
      difficulty,
      mode,
      ...(mode === "rounds" && { roundSize: roundSize.toString() }),
    });
    router.push(`/quiz?${params.toString()}`);
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-primary mb-2">
          BMW Code Quiz
        </h1>
        <p className="text-base-content/70 text-lg">
          How well do you know BMW internal chassis codes?
        </p>
      </div>

      <div className="card bg-base-200 shadow-xl w-full max-w-md">
        <div className="card-body gap-6">
          <DifficultySelector value={difficulty} onChange={setDifficulty} />
          <GameModeSelector
            mode={mode}
            roundSize={roundSize}
            onModeChange={setMode}
            onRoundSizeChange={setRoundSize}
          />
          <button className="btn btn-primary btn-lg w-full" onClick={startGame}>
            Start Quiz
          </button>
        </div>
      </div>

      <button
        className="btn btn-ghost btn-sm"
        onClick={() => router.push("/leaderboard")}
      >
        View Leaderboard
      </button>
    </div>
  );
}
