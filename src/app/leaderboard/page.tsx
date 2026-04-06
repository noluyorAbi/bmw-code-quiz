"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Difficulty } from "@/lib/types";
import { getLeaderboardByDifficulty } from "@/lib/leaderboard";
import LeaderboardTable from "@/components/LeaderboardTable";

const tabs: { value: Difficulty; label: string }[] = [
  { value: "core", label: "Core" },
  { value: "comprehensive", label: "Comprehensive" },
  { value: "exhaustive", label: "Exhaustive" },
];

export default function LeaderboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Difficulty>("core");
  const [entries, setEntries] = useState<ReturnType<typeof getLeaderboardByDifficulty>>([]);

  useEffect(() => {
    setEntries(getLeaderboardByDifficulty(activeTab));
  }, [activeTab]);

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-4xl font-bold text-primary">Leaderboard</h1>

      <div role="tablist" className="tabs tabs-boxed">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            className={`tab ${activeTab === tab.value ? "tab-active" : ""}`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl">
        <LeaderboardTable entries={entries} />
      </div>

      <button className="btn btn-ghost" onClick={() => router.push("/")}>
        Back to Home
      </button>
    </div>
  );
}
