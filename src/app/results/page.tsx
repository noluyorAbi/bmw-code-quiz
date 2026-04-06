"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Difficulty, GameMode } from "@/lib/types";
import {
  qualifiesForLeaderboard,
  addLeaderboardEntry,
} from "@/lib/leaderboard";

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
    return "Keep learning! You'll get there!";
  }

  function getAlertClass(): string {
    if (percentage >= 90) return "alert-success";
    if (percentage >= 70) return "alert-info";
    if (percentage >= 50) return "alert-warning";
    return "alert-error";
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-4xl font-bold text-primary">Quiz Complete!</h1>

      <div className="stats shadow bg-base-200">
        <div className="stat">
          <div className="stat-title">Score</div>
          <div className="stat-value text-primary">
            {score}/{total}
          </div>
          <div className="stat-desc">{percentage}% correct</div>
        </div>
        {mode === "endless" && bestStreak > 0 && (
          <div className="stat">
            <div className="stat-title">Best Streak</div>
            <div className="stat-value text-secondary">{bestStreak}</div>
          </div>
        )}
      </div>

      <div className={`alert ${getAlertClass()} max-w-md`}>
        <span>{getMessage()}</span>
      </div>

      {qualifies && !saved && (
        <div className="card bg-base-200 w-full max-w-md">
          <div className="card-body">
            <h3 className="card-title text-sm">
              You made the top 10! Enter your name:
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Your name"
                className="input input-bordered flex-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                maxLength={20}
              />
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {saved && (
        <div className="alert alert-success max-w-md">
          <span>Score saved to leaderboard!</span>
        </div>
      )}

      <div className="flex gap-3">
        <button
          className="btn btn-primary"
          onClick={() => router.push("/")}
        >
          Play Again
        </button>
        <button
          className="btn btn-ghost"
          onClick={() => router.push("/leaderboard")}
        >
          Leaderboard
        </button>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center"><span className="loading loading-spinner loading-lg" /></div>}>
      <ResultsContent />
    </Suspense>
  );
}
