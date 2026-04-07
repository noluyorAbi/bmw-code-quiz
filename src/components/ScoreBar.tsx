"use client";

import { GameMode } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ScoreBarProps {
  score: number;
  total: number;
  mode: GameMode;
  roundSize?: number;
  streak?: number;
}

export default function ScoreBar({
  score,
  total,
  mode,
  roundSize,
  streak,
}: ScoreBarProps) {
  return (
    <div className="flex items-center justify-between w-full mb-4">
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="text-sm px-3 py-1 font-mono">
          {score}/{total}
        </Badge>
        {mode === "endless" && streak !== undefined && streak > 0 && (
          <Badge className="text-sm px-3 py-1 bg-primary/15 text-primary border-primary/30">
            {streak} streak
          </Badge>
        )}
      </div>
      {mode === "rounds" && roundSize && (
        <div className="flex-1 mx-4 space-y-1">
          <Progress value={(total / roundSize) * 100} className="h-1.5" />
          <p className="text-xs text-center text-muted-foreground">
            {total} / {roundSize}
          </p>
        </div>
      )}
      {mode === "endless" && (
        <span className="text-sm text-muted-foreground">{total} answered</span>
      )}
    </div>
  );
}
