"use client";

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
  function getButtonClass(option: string): string {
    if (!answered) return "btn btn-outline btn-lg";
    if (option === correctAnswer) return "btn btn-success btn-lg";
    if (option === selectedAnswer && option !== correctAnswer)
      return "btn btn-error btn-lg";
    return "btn btn-outline btn-lg opacity-50";
  }

  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-lg mx-auto">
      {options.map((option) => (
        <button
          key={option}
          className={getButtonClass(option)}
          onClick={() => !answered && onAnswer(option)}
          disabled={answered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
