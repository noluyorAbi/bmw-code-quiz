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
import { Save, RotateCcw, BarChart3, Check } from "lucide-react";

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

  return (
    <div className="px-6 lg:px-12 max-w-7xl mx-auto py-12">
      <div className="lg:grid lg:grid-cols-12 gap-12 items-start">
        {/* Left: Results */}
        <div className="lg:col-span-8 space-y-8">
          {/* Hero */}
          <div className="animate-fade-up">
            <div className="m-stripe-gradient h-1 w-24 mb-6" />
            <h1 className="text-6xl md:text-8xl font-[family-name:var(--font-display)] font-black italic text-foreground tracking-tighter leading-[0.9]">
              QUIZ COMPLETE!
            </h1>
            <p className="font-mono text-xs tracking-[0.2em] text-primary-container mt-2 uppercase">
              Analysis segment finalized // Module: BMW_QUIZ_01
            </p>
          </div>

          {/* Bento Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-fade-up delay-2">
            <div className="bg-foreground/5 backdrop-blur-xl p-6 border border-border rounded-lg flex flex-col justify-between">
              <span className="text-[10px] font-mono text-muted-foreground tracking-[0.2em] uppercase">
                Final Score
              </span>
              <div className="text-4xl font-[family-name:var(--font-display)] font-black italic text-foreground mt-4">
                {score}/{total}
              </div>
            </div>
            <div className="bg-foreground/5 backdrop-blur-xl p-6 border border-border rounded-lg flex flex-col justify-between">
              <span className="text-[10px] font-mono text-muted-foreground tracking-[0.2em] uppercase">
                Efficiency
              </span>
              <div
                className={cn(
                  "text-4xl font-[family-name:var(--font-display)] font-black italic mt-4",
                  percentage >= 70
                    ? "text-primary"
                    : percentage >= 50
                      ? "text-secondary"
                      : "text-destructive",
                )}
              >
                {percentage}%
              </div>
            </div>
            <div className="bg-foreground/5 backdrop-blur-xl p-6 border border-border rounded-lg flex flex-col justify-between col-span-2 md:col-span-1">
              <span className="text-[10px] font-mono text-muted-foreground tracking-[0.2em] uppercase">
                Best Streak
              </span>
              <div className="text-4xl font-[family-name:var(--font-display)] font-black italic text-foreground mt-4">
                {bestStreak}
              </div>
            </div>
          </div>

          {/* Telemetry Bar */}
          <div className="bg-surface-container-low p-8 rounded-lg animate-fade-up delay-3">
            <h3 className="font-mono text-xs tracking-[0.2em] text-muted-foreground mb-6 uppercase">
              Technical Telemetry
            </h3>
            <div className="flex flex-col md:flex-row gap-12">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  Accuracy Rate
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-bold font-[family-name:var(--font-display)] font-black italic text-foreground">
                    {(percentage / 20).toFixed(1)}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    / 5.0
                  </span>
                </div>
                <div className="w-32 h-1 bg-surface-container-highest rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-container"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  Difficulty
                </span>
                <span className="text-lg font-bold font-[family-name:var(--font-display)] font-black italic text-foreground uppercase">
                  {difficulty}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  Game Mode
                </span>
                <span className="text-lg font-bold font-[family-name:var(--font-display)] font-black italic text-foreground uppercase">
                  {mode}
                </span>
              </div>
            </div>
          </div>

          {/* Leaderboard Entry */}
          {qualifies && !saved && (
            <div className="glass-panel p-6 rounded-xl animate-scale-in delay-4">
              <h3 className="font-[family-name:var(--font-label-font)] text-xs tracking-[0.2em] text-primary uppercase mb-4">
                TOP 10 — ENTER PILOT IDENTIFIER
              </h3>
              <div className="flex gap-3">
                <Input
                  placeholder="DRIVER_NAME"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSave()}
                  maxLength={20}
                  className="flex-1 h-12 font-mono bg-background/50 border-outline-variant rounded"
                />
                <Button
                  onClick={handleSave}
                  className="h-12 px-6 bg-primary-container text-white rounded gap-2"
                >
                  <Save className="h-4 w-4" />
                  SAVE
                </Button>
              </div>
            </div>
          )}
          {saved && (
            <div className="flex items-center gap-2 text-sm text-primary font-mono animate-scale-in">
              <Check className="h-4 w-4" />
              RECORD SAVED TO TELEMETRY DATABASE
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-4 animate-fade-up delay-5">
            <button
              onClick={() => router.push("/")}
              className="bg-primary-container text-white px-8 py-4 rounded font-[family-name:var(--font-label-font)] font-bold flex items-center gap-3 hover:brightness-110 transition-all uppercase tracking-[0.15em] text-sm"
            >
              <RotateCcw className="h-4 w-4" />
              PLAY AGAIN
            </button>
            <button
              onClick={() => router.push("/leaderboard")}
              className="bg-foreground/5 backdrop-blur-md text-foreground border border-border px-8 py-4 rounded font-[family-name:var(--font-label-font)] font-bold hover:bg-foreground/10 transition-all uppercase tracking-[0.15em] text-sm flex items-center gap-3"
            >
              <BarChart3 className="h-4 w-4" />
              LEADERBOARD
            </button>
          </div>
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
