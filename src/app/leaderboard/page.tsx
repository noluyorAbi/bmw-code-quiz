"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Difficulty } from "@/lib/types";
import { getLeaderboardByDifficulty } from "@/lib/leaderboard";
import { cn } from "@/lib/utils";
import LeaderboardTable from "@/components/LeaderboardTable";
import ThemeToggle from "@/components/ThemeToggle";
import { ArrowLeft } from "lucide-react";

const tabs: { value: Difficulty; label: string }[] = [
  { value: "core", label: "Core" },
  { value: "comprehensive", label: "Comprehensive" },
  { value: "exhaustive", label: "Exhaustive" },
];

export default function LeaderboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Difficulty>("core");
  const [entries, setEntries] = useState<
    ReturnType<typeof getLeaderboardByDifficulty>
  >([]);

  useEffect(() => {
    setEntries(getLeaderboardByDifficulty(activeTab));
  }, [activeTab]);

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-3px)] relative">
      {/* Theme toggle */}
      <div className="absolute top-4 right-0">
        <ThemeToggle />
      </div>

      <div className="flex flex-col items-center gap-8 pt-12 sm:pt-20 w-full max-w-xl">
        {/* Header */}
        <div className="text-center opacity-0 animate-fade-up">
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">
            Hall of Fame
          </p>
          <h1
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
            style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
          >
            Leaderboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Top scores across all players
          </p>
        </div>

        {/* Tab bar */}
        <div className="inline-flex rounded-xl border border-border bg-muted/30 p-1 opacity-0 animate-fade-up delay-1">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={cn(
                "rounded-lg px-5 py-2 text-sm font-medium transition-all",
                activeTab === tab.value
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="w-full glass rounded-2xl overflow-hidden opacity-0 animate-fade-up delay-2">
          <LeaderboardTable entries={entries} />
        </div>

        {/* Back */}
        <button
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 opacity-0 animate-fade-up delay-3"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Home
        </button>
      </div>
    </div>
  );
}
