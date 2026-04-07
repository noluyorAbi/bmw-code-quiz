"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Difficulty, GameMode } from "@/lib/types";
import {
  qualifiesForLeaderboard,
  addLeaderboardEntry,
} from "@/lib/leaderboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const score = parseInt(searchParams.get("score") || "0");
  const total = parseInt(searchParams.get("total") || "0");
  const difficulty = (searchParams.get("difficulty") || "core") as Difficulty;
  const mode = (searchParams.get("mode") || "rounds") as GameMode;
  const bestStreak = parseInt(searchParams.get("bestStreak") || "0");

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const qualifies = qualifiesForLeaderboard(score, difficulty);

  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    if (!name.trim()) return;
    addLeaderboardEntry(name.trim(), score, total, difficulty, mode);
    setSaved(true);
  }

  function getMessage(): string {
    if (percentage >= 90) return "BMW Master! Incredible!";
    if (percentage >= 70) return "Great job! You know your BMWs!";
    if (percentage >= 50) return "Not bad! Keep practicing!";
    return "Keep learning — you'll get there!";
  }

  return (
    <div className="flex flex-col items-center gap-8 pt-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Quiz Complete</h1>
        <p className="text-muted-foreground">{getMessage()}</p>
      </div>

      <div className="flex gap-6">
        <div className="text-center">
          <div className="text-5xl font-bold font-mono tracking-tight">
            {score}
            <span className="text-muted-foreground">/{total}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{percentage}% correct</p>
        </div>
        {mode === "endless" && bestStreak > 0 && (
          <div className="text-center border-l border-border pl-6">
            <div className="text-5xl font-bold font-mono tracking-tight text-primary">
              {bestStreak}
            </div>
            <p className="text-sm text-muted-foreground mt-1">best streak</p>
          </div>
        )}
      </div>

      <div
        className={cn(
          "w-full max-w-sm h-1 rounded-full",
          percentage >= 90 && "bg-emerald-500",
          percentage >= 70 && percentage < 90 && "bg-blue-500",
          percentage >= 50 && percentage < 70 && "bg-yellow-500",
          percentage < 50 && "bg-red-500",
        )}
      />

      {qualifies && !saved && (
        <Card className="w-full max-w-sm border-border/50 bg-card/50">
          <CardContent className="pt-6 space-y-3">
            <p className="text-sm font-medium">
              Top 10! Enter your name:
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                maxLength={20}
                className="flex-1"
              />
              <Button onClick={handleSave}>Save</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {saved && (
        <p className="text-sm text-emerald-400">Score saved to leaderboard!</p>
      )}

      <div className="flex gap-3">
        <Button onClick={() => router.push("/")}>Play Again</Button>
        <Button
          variant="outline"
          onClick={() => router.push("/leaderboard")}
        >
          Leaderboard
        </Button>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-20">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
