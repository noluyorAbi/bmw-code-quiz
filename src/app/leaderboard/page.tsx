"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Difficulty } from "@/lib/types";
import { getLeaderboardByDifficulty } from "@/lib/leaderboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import LeaderboardTable from "@/components/LeaderboardTable";

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
    <div className="flex flex-col items-center gap-8 pt-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground">Top scores across all players</p>
      </div>

      <div className="inline-flex rounded-lg border border-border p-1 bg-muted/30">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={cn(
              "rounded-md px-4 py-1.5 text-sm font-medium transition-all",
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

      <Card className="w-full border-border/50 bg-card/50">
        <CardContent className="pt-6">
          <LeaderboardTable entries={entries} />
        </CardContent>
      </Card>

      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground"
        onClick={() => router.push("/")}
      >
        Back to Home
      </Button>
    </div>
  );
}
