"use client";

import { LeaderboardEntry } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Trophy, Shield } from "lucide-react";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

export default function LeaderboardTable({ entries }: LeaderboardTableProps) {
  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
        <Trophy className="h-10 w-10 text-outline-variant" />
        <p className="font-mono text-sm uppercase tracking-wider">NO TELEMETRY DATA RECORDED</p>
        <p className="text-xs text-muted-foreground">Complete a quiz to register your first entry.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="grid grid-cols-12 px-6 py-4 mb-2 font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.2em] text-on-surface-variant uppercase border-b border-border">
        <div className="col-span-1">RNK</div>
        <div className="col-span-4">PILOT IDENTIFIER</div>
        <div className="col-span-3">TELEMETRY SCORE</div>
        <div className="col-span-2">MODE</div>
        <div className="col-span-2 text-right">TIMESTAMP</div>
      </div>

      {/* Rows */}
      {entries.map((entry, i) => {
        const pct = Math.round((entry.score / entry.total) * 100);
        const isTop3 = i < 3;

        return (
          <div
            key={`${entry.name}-${entry.date}`}
            className={cn(
              "grid grid-cols-12 px-6 py-5 items-center transition-all mb-1 rounded",
              isTop3
                ? "bg-primary-container/5 border border-primary-container/10 hover:bg-primary-container/10"
                : "bg-surface-container-low/20 hover:bg-foreground/5"
            )}
          >
            {/* Rank */}
            <div className="col-span-1">
              {i === 0 ? (
                <Shield className="h-5 w-5 text-primary" />
              ) : (
                <span className={cn(
                  "font-mono text-sm",
                  isTop3 ? "font-bold text-primary" : "text-muted-foreground"
                )}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
            </div>

            {/* Name */}
            <div className="col-span-4 flex items-center gap-3">
              <div className={cn(
                "w-8 h-8 rounded flex items-center justify-center text-xs font-bold font-mono",
                isTop3 ? "bg-primary-container text-white" : "bg-surface-container-highest text-muted-foreground"
              )}>
                {entry.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className={cn(
                  "font-[family-name:var(--font-display)] italic text-sm tracking-tight",
                  isTop3 ? "text-foreground" : "text-foreground"
                )}>
                  {entry.name.toUpperCase()}
                </p>
                {isTop3 && (
                  <p className="font-[family-name:var(--font-label-font)] text-[9px] text-primary tracking-wider">
                    P{String(i + 1).padStart(2, "0")}_ELITE
                  </p>
                )}
              </div>
            </div>

            {/* Score */}
            <div className="col-span-3">
              <span className="font-mono text-lg font-bold text-primary">{pct}%</span>
              <span className="font-mono text-xs text-muted-foreground ml-2">
                ({entry.score}/{entry.total})
              </span>
            </div>

            {/* Mode */}
            <div className="col-span-2">
              <span className="text-[10px] font-[family-name:var(--font-label-font)] text-on-surface-variant bg-surface-container-highest px-2 py-1 rounded uppercase tracking-wider">
                {entry.mode}
              </span>
            </div>

            {/* Date */}
            <div className="col-span-2 text-right font-mono text-[10px] text-muted-foreground">
              {new Date(entry.date).toISOString().split("T")[0].replace(/-/g, ".")}
            </div>
          </div>
        );
      })}
    </div>
  );
}
