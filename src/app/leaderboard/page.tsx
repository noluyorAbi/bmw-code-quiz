"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Difficulty } from "@/lib/types";
import { getLeaderboardByDifficulty } from "@/lib/leaderboard";
import { cn } from "@/lib/utils";
import LeaderboardTable from "@/components/LeaderboardTable";
import { ArrowLeft } from "lucide-react";

const tabs: { value: Difficulty; label: string }[] = [
  { value: "core", label: "CORE" },
  { value: "comprehensive", label: "COMPREHENSIVE" },
  { value: "exhaustive", label: "EXHAUSTIVE" },
];

export default function LeaderboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Difficulty>("core");
  const [entries, setEntries] = useState<ReturnType<typeof getLeaderboardByDifficulty>>([]);

  useEffect(() => {
    setEntries(getLeaderboardByDifficulty(activeTab));
  }, [activeTab]);

  return (
    <div className="px-6 lg:px-12 max-w-7xl mx-auto py-12">
      {/* Header */}
      <div className="mb-12 animate-fade-up">
        <span className="font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.3em] text-primary uppercase mb-2 block">
          GLOBAL RANKINGS
        </span>
        <h1 className="text-6xl md:text-8xl font-[family-name:var(--font-display)] italic text-foreground tracking-tighter leading-[0.9]">
          TELEMETRY
        </h1>
      </div>

      {/* Difficulty Tabs */}
      <div className="flex flex-wrap gap-4 mb-12 border-b border-border pb-6 animate-fade-up delay-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={cn(
              "font-[family-name:var(--font-label-font)] text-sm tracking-[0.15em] px-6 py-2 transition-all uppercase",
              activeTab === tab.value
                ? "bg-primary-container text-white rounded"
                : "text-on-surface-variant hover:bg-foreground/5"
            )}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="animate-fade-up delay-2">
        <LeaderboardTable entries={entries} />
      </div>

      {/* Back */}
      <button
        className="mt-12 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider animate-fade-up delay-3"
        onClick={() => router.push("/")}
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        RETURN TO BASE
      </button>
    </div>
  );
}
