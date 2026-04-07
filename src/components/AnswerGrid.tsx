"use client";

import { cn } from "@/lib/utils";

interface AnswerGridProps {
  options: string[];
  correctAnswer: string;
  answered: boolean;
  selectedAnswer: string | null;
  onAnswer: (answer: string) => void;
}

export default function AnswerGrid({
  options,
  correctAnswer,
  answered,
  selectedAnswer,
  onAnswer,
}: AnswerGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2.5 w-full">
      {options.map((option) => {
        const isCorrect = option === correctAnswer;
        const isSelected = option === selectedAnswer;
        const isWrong = answered && isSelected && !isCorrect;

        return (
          <button
            key={option}
            className={cn(
              "relative h-12 rounded-xl border text-sm font-mono font-semibold transition-all duration-200",
              !answered &&
                "border-border bg-secondary/30 text-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-primary active:scale-[0.97]",
              answered && isCorrect &&
                "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
              isWrong &&
                "border-red-500/40 bg-red-500/10 text-red-400",
              answered && !isCorrect && !isSelected &&
                "border-border/30 bg-secondary/10 text-muted-foreground/30",
              answered && "cursor-default"
            )}
            onClick={() => !answered && onAnswer(option)}
            disabled={answered}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
