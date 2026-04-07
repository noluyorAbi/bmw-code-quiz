"use client";

import { Difficulty } from "@/lib/types";
import { bmwCars } from "@/data/bmw-cars";
import { cn } from "@/lib/utils";
import { Gauge, BookOpen, Layers } from "lucide-react";

interface DifficultySelectorProps {
  value: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

const difficulties: {
  value: Difficulty;
  label: string;
  description: string;
  icon: typeof Gauge;
}[] = [
  { value: "core", label: "Core", description: "Well-known models", icon: Gauge },
  { value: "comprehensive", label: "Comprehensive", description: "Classics & rarities", icon: BookOpen },
  { value: "exhaustive", label: "Exhaustive", description: "Every variant", icon: Layers },
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
    <div className="space-y-2.5">
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
        Difficulty
      </label>
      <div className="grid grid-cols-3 gap-2">
        {difficulties.map((d) => {
          const Icon = d.icon;
          const active = value === d.value;
          return (
            <button
              key={d.value}
              className={cn(
                "group relative flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3.5 text-sm transition-all",
                active
                  ? "border-primary/40 bg-primary/8 text-foreground shadow-sm shadow-primary/5"
                  : "border-transparent bg-secondary/40 text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
              )}
              onClick={() => onChange(d.value)}
            >
              <Icon
                className={cn(
                  "h-4 w-4 transition-colors",
                  active ? "text-primary" : "text-muted-foreground/60 group-hover:text-muted-foreground"
                )}
              />
              <span className="font-semibold text-xs">{d.label}</span>
              <span className="text-[10px] text-muted-foreground font-mono">
                {countCars(d.value)} cars
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
