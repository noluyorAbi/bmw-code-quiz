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

function getCodeExplanation(code: string, series: string): string {
  const prefix = code.charAt(0);
  const prefixMeaning: Record<string, string> = {
    E: "\"E\" (Entwicklung = Development) was used for BMW chassis codes from the 1960s to ~2012.",
    F: "\"F\" generation codes replaced \"E\" starting around 2010, marking BMW's modern era.",
    G: "\"G\" is the current generation prefix, used since ~2017 for the latest BMW models.",
    U: "\"U\" is used for BMW's newer UKL/FAAR platform-based compact models.",
    I: "\"I\" prefix is reserved for BMW's fully electric \"i\" sub-brand vehicles.",
  };

  const parts: string[] = [];

  if (prefixMeaning[prefix]) {
    parts.push(prefixMeaning[prefix]);
  }

  if (code.includes("LCI")) {
    parts.push("\"LCI\" (Life Cycle Impulse) is BMW's term for a mid-cycle facelift update.");
  }

  if (code.includes("M3") || code.includes("M4") || code.includes("M5") || code.includes("M6") || code.includes("M8") || code.includes("1M")) {
    parts.push("M models are high-performance variants developed by BMW M GmbH.");
  }

  if (series === "Z Series") {
    parts.push("The Z designation stands for \"Zukunft\" (Future), BMW's roadster line.");
  }

  if (series.startsWith("X") && !series.includes("M")) {
    parts.push("The X prefix denotes BMW's SAV (Sports Activity Vehicle) lineup.");
  }

  if (code.includes("Touring")) {
    parts.push("\"Touring\" is BMW's name for their estate/wagon body style.");
  }

  if (code.includes("/")) {
    parts.push("The slash notation indicates a body style variant within the same generation.");
  }

  return parts.join(" ") || `Part of the BMW ${series} lineage.`;
}

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
          "w-full max-w-lg mx-auto rounded-lg border px-4 py-4 text-sm transition-all animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-2",
          quizState.selectedAnswer === currentCar.internalCode
            ? "border-emerald-500/30 bg-emerald-500/10"
            : "border-red-500/30 bg-red-500/10"
        )}>
          <p className={cn(
            "font-bold text-base",
            quizState.selectedAnswer === currentCar.internalCode ? "text-emerald-400" : "text-red-400"
          )}>
            {quizState.selectedAnswer === currentCar.internalCode ? "Correct!" : "Wrong!"}
          </p>
          <p className="text-foreground">
            <span className="font-mono font-bold text-primary text-lg">{currentCar.internalCode}</span>{" "}
            is the internal code for the {currentCar.officialName}, produced {currentCar.years}.
          </p>
          <p className="text-muted-foreground text-xs leading-relaxed">
            {getCodeExplanation(currentCar.internalCode, currentCar.series)}
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
