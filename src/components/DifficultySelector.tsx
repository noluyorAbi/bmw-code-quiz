"use client";

import { Difficulty } from "@/lib/types";
import { bmwCars } from "@/data/bmw-cars";
import { cn } from "@/lib/utils";

interface DifficultySelectorProps {
  value: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

const difficulties: { value: Difficulty; label: string; description: string }[] = [
  { value: "core", label: "Core", description: "Well-known models" },
  { value: "comprehensive", label: "Comprehensive", description: "Classics & rarities" },
  { value: "exhaustive", label: "Exhaustive", description: "Every variant" },
];

function countCars(difficulty: Difficulty): number {
  if (difficulty === "core")
    return bmwCars.filter((c) => c.difficulty === "core").length;
  if (difficulty === "comprehensive")
    return bmwCars.filter(
      (c) => c.difficulty === "core" || c.difficulty === "comprehensive"
    ).length;
  return bmwCars.length;
}

export default function DifficultySelector({
  value,
  onChange,
}: DifficultySelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        Difficulty
      </label>
      <div className="grid grid-cols-3 gap-2">
        {difficulties.map((d) => (
          <button
            key={d.value}
            className={cn(
              "flex flex-col items-center gap-0.5 rounded-lg border px-3 py-3 text-sm transition-all",
              value === d.value
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-transparent text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground"
            )}
            onClick={() => onChange(d.value)}
          >
            <span className="font-semibold">{d.label}</span>
            <span className="text-xs text-muted-foreground">
              {countCars(d.value)} cars
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
