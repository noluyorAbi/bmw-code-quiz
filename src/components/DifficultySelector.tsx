"use client";

import { Difficulty } from "@/lib/types";
import { bmwCars } from "@/data/bmw-cars";

interface DifficultySelectorProps {
  value: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

const difficulties: { value: Difficulty; label: string; description: string }[] =
  [
    { value: "core", label: "Core", description: "Well-known models" },
    {
      value: "comprehensive",
      label: "Comprehensive",
      description: "Core + classics & rarities",
    },
    {
      value: "exhaustive",
      label: "Exhaustive",
      description: "Every variant & facelift",
    },
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
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Difficulty</h2>
      <div className="flex gap-2">
        {difficulties.map((d) => (
          <button
            key={d.value}
            className={`btn flex-1 ${
              value === d.value ? "btn-primary" : "btn-ghost border-base-300"
            }`}
            onClick={() => onChange(d.value)}
          >
            <div className="flex flex-col items-center">
              <span className="font-bold">{d.label}</span>
              <span className="text-xs opacity-70">
                {countCars(d.value)} cars
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
