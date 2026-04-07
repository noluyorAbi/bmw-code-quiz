"use client";

import { cn } from "@/lib/utils";
import { ChevronRight, Check, X } from "lucide-react";

interface AnswerGridProps {
  options: string[];
  correctAnswer: string;
  answered: boolean;
  selectedAnswer: string | null;
  onAnswer: (answer: string) => void;
}

export default function AnswerGrid({ options, correctAnswer, answered, selectedAnswer, onAnswer }: AnswerGridProps) {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      {options.map((option) => {
        const isCorrect = option === correctAnswer;
        const isSelected = option === selectedAnswer;
        const isWrong = answered && isSelected && !isCorrect;

        return (
          <button
            key={option}
            className={cn(
              "group p-4 rounded border text-left flex justify-between items-center transition-all duration-200",
              !answered &&
                "bg-surface-container-highest/30 border-border hover:bg-surface-container-highest",
              answered && isCorrect &&
                "bg-primary-container/10 border-primary-container ring-1 ring-primary-container ring-offset-2 ring-offset-background",
              isWrong &&
                "bg-destructive/10 border-destructive/40",
              answered && !isCorrect && !isSelected &&
                "border-border/30 bg-surface-container-highest/10 opacity-30",
              answered && "cursor-default"
            )}
            onClick={() => !answered && onAnswer(option)}
            disabled={answered}
          >
            <span className={cn(
              "font-mono text-lg font-bold tracking-tighter transition-colors",
              !answered && "text-on-surface-variant group-hover:text-foreground",
              answered && isCorrect && "text-foreground",
              isWrong && "text-destructive",
              answered && !isCorrect && !isSelected && "text-muted-foreground"
            )}>
              {option}
            </span>
            {!answered && (
              <ChevronRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
            {answered && isCorrect && (
              <Check className="h-4 w-4 text-primary-container" />
            )}
            {isWrong && (
              <X className="h-4 w-4 text-destructive" />
            )}
          </button>
        );
      })}
    </div>
  );
}
