"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Difficulty, GameMode } from "@/lib/types";
import {
  qualifiesForLeaderboard,
  addLeaderboardEntry,
} from "@/lib/leaderboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";
import { RotateCcw, Trophy, Check, Flame } from "lucide-react";

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
    if (percentage >= 90) return "BMW Master!";
    if (percentage >= 70) return "Impressive knowledge!";
    if (percentage >= 50) return "Solid effort!";
    return "Room to grow!";
  }

  function getGradeColor(): string {
    if (percentage >= 90) return "text-emerald-400";
    if (percentage >= 70) return "text-primary";
    if (percentage >= 50) return "text-yellow-400";
    return "text-red-400";
  }

  function getBarColor(): string {
    if (percentage >= 90) return "bg-emerald-500";
    if (percentage >= 70) return "bg-primary";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-red-500";
  }

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-3px)] relative">
      {/* Theme toggle */}
      <div className="absolute top-4 right-0">
        <ThemeToggle />
      </div>

      <div className="flex flex-col items-center gap-8 pt-16 sm:pt-24 w-full max-w-md">
        {/* Message */}
        <div className="text-center opacity-0 animate-fade-up">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-2">
            Quiz Complete
          </p>
          <h1
            className={cn(
              "text-3xl sm:text-4xl font-extrabold tracking-tight",
              getGradeColor()
            )}
            style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
          >
            {getMessage()}
          </h1>
        </div>

        {/* Score display */}
        <div className="flex items-end gap-8 opacity-0 animate-fade-up delay-1">
          <div className="text-center">
            <div className="text-6xl sm:text-7xl font-bold font-mono tracking-tighter animate-count-up">
              {score}
              <span className="text-muted-foreground/40">/{total}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{percentage}% correct</p>
          </div>
          {mode === "endless" && bestStreak > 0 && (
            <div className="text-center border-l border-border pl-8">
              <div className="flex items-center justify-center gap-2">
                <Flame className="h-6 w-6 text-primary" />
                <span className="text-5xl sm:text-6xl font-bold font-mono tracking-tighter text-primary animate-count-up">
                  {bestStreak}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">best streak</p>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full opacity-0 animate-fade-up delay-2">
          <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-1000 ease-out", getBarColor())}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Leaderboard entry */}
        {qualifies && !saved && (
          <div className="w-full glass rounded-2xl p-5 opacity-0 animate-scale-in delay-3">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold">
                Top 10! Enter your name:
              </p>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                maxLength={20}
                className="flex-1 h-10 rounded-xl bg-background/50"
              />
              <Button onClick={handleSave} className="rounded-xl h-10 px-5">
                Save
              </Button>
            </div>
          </div>
        )}

        {saved && (
          <div className="inline-flex items-center gap-2 text-sm text-emerald-400 opacity-0 animate-scale-in">
            <Check className="h-4 w-4" />
            Saved to leaderboard!
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 opacity-0 animate-fade-up delay-4">
          <Button
            onClick={() => router.push("/")}
            className="rounded-xl gap-2"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Play Again
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/leaderboard")}
            className="rounded-xl gap-2"
          >
            <Trophy className="h-3.5 w-3.5" />
            Leaderboard
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
