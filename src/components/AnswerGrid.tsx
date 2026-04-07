"use client";

import { Button } from "@/components/ui/button";
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
    <div className="grid grid-cols-2 gap-3 w-full max-w-lg mx-auto">
      {options.map((option) => (
        <Button
          key={option}
          variant="outline"
          size="lg"
          className={cn(
            "h-14 text-base font-mono font-semibold transition-all duration-200",
            !answered && "hover:border-primary hover:text-primary hover:bg-primary/5",
            answered && option === correctAnswer && "bg-emerald-500/15 border-emerald-500 text-emerald-400",
            answered && option === selectedAnswer && option !== correctAnswer && "bg-red-500/15 border-red-500 text-red-400",
            answered && option !== correctAnswer && option !== selectedAnswer && "opacity-30",
          )}
          onClick={() => !answered && onAnswer(option)}
          disabled={answered}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
