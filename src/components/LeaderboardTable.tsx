"use client";

import { LeaderboardEntry } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Trophy } from "lucide-react";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

export default function LeaderboardTable({ entries }: LeaderboardTableProps) {
  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
        <Trophy className="h-8 w-8 text-muted-foreground/30" />
        <p className="text-sm">No scores yet. Be the first!</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {/* Header */}
      <div className="grid grid-cols-[2.5rem_1fr_5rem_4rem_5.5rem] gap-3 px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        <span>#</span>
        <span>Name</span>
        <span>Score</span>
        <span>Mode</span>
        <span className="text-right">Date</span>
      </div>

      {/* Rows */}
      {entries.map((entry, i) => {
        const pct = Math.round((entry.score / entry.total) * 100);
        return (
          <div
            key={`${entry.name}-${entry.date}`}
            className={cn(
              "grid grid-cols-[2.5rem_1fr_5rem_4rem_5.5rem] gap-3 px-5 py-3.5 items-center text-sm transition-colors hover:bg-accent/30",
              i === 0 && "bg-primary/3"
            )}
          >
            <span className={cn(
              "font-mono font-bold text-xs",
              i === 0 ? "text-primary" : i < 3 ? "text-foreground" : "text-muted-foreground"
            )}>
              {i + 1}
            </span>
            <span className="font-medium truncate">
              {i === 0 && <span className="text-primary mr-1">&#9670;</span>}
              {entry.name}
            </span>
            <span className="font-mono text-xs">
              {entry.score}/{entry.total}{" "}
              <span className="text-muted-foreground">({pct}%)</span>
            </span>
            <span className="capitalize text-xs text-muted-foreground">
              {entry.mode}
            </span>
            <span className="text-right text-xs text-muted-foreground tabular-nums">
              {new Date(entry.date).toLocaleDateString()}
            </span>
          </div>
        );
      })}
    </div>
  );
}
