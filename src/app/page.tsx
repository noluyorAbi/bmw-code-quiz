"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Difficulty, GameMode, RoundSize } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="flex flex-col items-center gap-10 pt-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          BMW Code Quiz
        </h1>
        <p className="text-muted-foreground text-lg">
          How well do you know BMW internal chassis codes?
        </p>
      </div>

      <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur">
        <CardContent className="space-y-6 pt-6">
          <DifficultySelector value={difficulty} onChange={setDifficulty} />
          <GameModeSelector
            mode={mode}
            roundSize={roundSize}
            onModeChange={setMode}
            onRoundSizeChange={setRoundSize}
          />
          <Button
            size="lg"
            className="w-full text-base font-semibold"
            onClick={startGame}
          >
            Start Quiz
          </Button>
        </CardContent>
      </Card>

      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground"
        onClick={() => router.push("/leaderboard")}
      >
        View Leaderboard
      </Button>
    </div>
  );
}
