"use client";

import { Difficulty } from "@/lib/types";
import { bmwCars } from "@/data/bmw-cars";
import { cn } from "@/lib/utils";

interface DifficultySelectorProps {
  value: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

const difficulties: { value: Difficulty; label: string }[] = [
  { value: "core", label: "CORE" },
  { value: "comprehensive", label: "COMPREHENSIVE" },
  { value: "exhaustive", label: "EXHAUSTIVE" },
];

function countCars(difficulty: Difficulty): number {
  if (difficulty === "core")
    return bmwCars.filter((c) => c.difficulty === "core").length;
  if (difficulty === "comprehensive")
    return bmwCars.filter(
      (c) => c.difficulty === "core" || c.difficulty === "comprehensive",
    ).length;
  return bmwCars.length;
}

export default function DifficultySelector({
  value,
  onChange,
}: DifficultySelectorProps) {
  return (
    <div className="space-y-3">
      <label className="font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
        DIFFICULTY LEVEL
      </label>
      <div className="grid grid-cols-3 gap-2">
        {difficulties.map((d) => (
          <button
            key={d.value}
            className={cn(
              "py-3 px-2 text-[10px] font-[family-name:var(--font-label-font)] font-bold tracking-[0.15em] rounded transition-all uppercase",
              value === d.value
                ? "bg-primary text-primary-foreground"
                : "border border-outline-variant text-foreground hover:bg-foreground/5",
            )}
            onClick={() => onChange(d.value)}
          >
            {d.label}
            <span className="block text-[8px] font-mono opacity-60 mt-0.5">
              {countCars(d.value)} UNITS
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
