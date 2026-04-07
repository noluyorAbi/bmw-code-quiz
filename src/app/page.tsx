"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Difficulty, GameMode, RoundSize } from "@/lib/types";
import DifficultySelector from "@/components/DifficultySelector";
import GameModeSelector from "@/components/GameModeSelector";
import ThemeToggle from "@/components/ThemeToggle";
import { ChevronRight, Trophy } from "lucide-react";

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
    <div className="flex flex-col items-center min-h-[calc(100vh-3px)] relative">
      {/* Theme toggle */}
      <div className="absolute top-4 right-0">
        <ThemeToggle />
      </div>

      {/* Hero */}
      <div className="flex flex-col items-center gap-4 pt-16 sm:pt-24 pb-10 opacity-0 animate-fade-up">
        <h1
          className="text-5xl sm:text-6xl font-bold tracking-tight text-center leading-[1.1]"
          style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
        >
          BMW Code Quiz
        </h1>

        <p className="text-muted-foreground text-base sm:text-lg max-w-lg text-center leading-relaxed">
          How well do you know BMW&apos;s internal chassis codes?
          <br className="hidden sm:block" />
          From the classic E30 to the latest G87 — put your knowledge to the test.
        </p>
      </div>

      {/* Config card */}
      <div className="w-full max-w-md glass rounded-2xl p-6 space-y-6 opacity-0 animate-fade-up delay-2">
        <DifficultySelector value={difficulty} onChange={setDifficulty} />
        <GameModeSelector
          mode={mode}
          roundSize={roundSize}
          onModeChange={setMode}
          onRoundSizeChange={setRoundSize}
        />

        <button
          onClick={startGame}
          className="group w-full relative flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
        >
          Start Quiz
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Footer link */}
      <button
        className="mt-8 mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors opacity-0 animate-fade-up delay-4"
        onClick={() => router.push("/leaderboard")}
      >
        <Trophy className="h-3.5 w-3.5" />
        View Leaderboard
      </button>
    </div>
  );
}
