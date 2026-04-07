"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Difficulty, GameMode, RoundSize, QuizState } from "@/lib/types";
import { getCarsByDifficulty } from "@/data/bmw-cars";
import {
  initQuiz,
  submitAnswer,
  nextQuestion,
  getCurrentCar,
} from "@/lib/quiz-engine";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ImageCarousel from "@/components/ImageCarousel";
import AnswerGrid from "@/components/AnswerGrid";
import ScoreBar from "@/components/ScoreBar";

function QuizContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const difficulty = (searchParams.get("difficulty") || "core") as Difficulty;
  const mode = (searchParams.get("mode") || "rounds") as GameMode;
  const roundSize = parseInt(
    searchParams.get("roundSize") || "10"
  ) as RoundSize;

  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const pool = getCarsByDifficulty(difficulty);

  useEffect(() => {
    setQuizState(initQuiz(difficulty));
  }, [difficulty]);

  const handleAnswer = useCallback(
    (answer: string) => {
      if (!quizState || quizState.answered) return;
      const newState = submitAnswer(quizState, answer, pool);
      setQuizState(newState);

      setTimeout(() => {
        const totalAnswered = newState.answers.length;

        if (mode === "rounds" && totalAnswered >= roundSize) {
          const params = new URLSearchParams({
            score: newState.score.toString(),
            total: totalAnswered.toString(),
            difficulty,
            mode,
            bestStreak: newState.bestStreak.toString(),
          });
          router.push(`/results?${params.toString()}`);
          return;
        }

        setQuizState(nextQuestion(newState, pool));
      }, 1500);
    },
    [quizState, pool, mode, roundSize, difficulty, router]
  );

  function handleQuit() {
    if (!quizState) return;
    const params = new URLSearchParams({
      score: quizState.score.toString(),
      total: quizState.answers.length.toString(),
      difficulty,
      mode,
      bestStreak: quizState.bestStreak.toString(),
    });
    router.push(`/results?${params.toString()}`);
  }

  if (!quizState) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const currentCar = getCurrentCar(quizState);

  return (
    <div className="flex flex-col items-center gap-6">
      <ScoreBar
        score={quizState.score}
        total={quizState.answers.length}
        mode={mode}
        roundSize={roundSize}
        streak={quizState.streak}
      />

      <ImageCarousel
        images={currentCar.images}
        altText={currentCar.officialName}
      />

      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">
          {currentCar.officialName}
        </h2>
        <p className="text-sm text-muted-foreground">{currentCar.years}</p>
      </div>

      <AnswerGrid
        options={quizState.options}
        correctAnswer={currentCar.internalCode}
        answered={quizState.answered}
        selectedAnswer={quizState.selectedAnswer}
        onAnswer={handleAnswer}
      />

      {quizState.answered && (
        <div className={cn(
          "w-full max-w-lg mx-auto rounded-lg border px-4 py-3 text-sm transition-all animate-in fade-in slide-in-from-bottom-2 duration-300",
          quizState.selectedAnswer === currentCar.internalCode
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
            : "border-red-500/30 bg-red-500/10 text-red-300"
        )}>
          <p className="font-semibold">
            {quizState.selectedAnswer === currentCar.internalCode ? "Correct!" : "Wrong!"}{" "}
            <span className="text-foreground">The {currentCar.officialName} ({currentCar.years}) has the internal code <span className="font-mono font-bold">{currentCar.internalCode}</span>.</span>
          </p>
        </div>
      )}

      {mode === "endless" && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 text-muted-foreground"
          onClick={handleQuit}
        >
          End Quiz
        </Button>
      )}
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-20">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <QuizContent />
    </Suspense>
  );
}
