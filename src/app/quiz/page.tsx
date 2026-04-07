"use client";

import { useEffect, useState, useCallback, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Difficulty, GameMode, RoundSize, QuizState, BmwCar } from "@/lib/types";
import { getCarsByDifficulty } from "@/data/bmw-cars";
import {
  initQuiz,
  submitAnswer,
  nextQuestion,
  getCurrentCar,
} from "@/lib/quiz-engine";
import { cn } from "@/lib/utils";
import ImageCarousel from "@/components/ImageCarousel";
import AnswerGrid from "@/components/AnswerGrid";
import ScoreBar from "@/components/ScoreBar";
import ThemeToggle from "@/components/ThemeToggle";
import { LogOut } from "lucide-react";

function preloadImages(car: BmwCar): Promise<void> {
  const urls = [car.images.front, car.images.side, car.images.rear].filter(Boolean);
  const unique = [...new Set(urls)];
  return Promise.all(
    unique.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = url;
        })
    )
  ).then(() => {});
}

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
  const [transitioning, setTransitioning] = useState(false);
  const pool = getCarsByDifficulty(difficulty);
  const pendingNextState = useRef<QuizState | null>(null);

  useEffect(() => {
    setQuizState(initQuiz(difficulty));
  }, [difficulty]);

  const handleAnswer = useCallback(
    (answer: string) => {
      if (!quizState || quizState.answered) return;
      const newState = submitAnswer(quizState, answer, pool);
      setQuizState(newState);

      // Precompute next state and start preloading images immediately
      const upcoming = nextQuestion(newState, pool);
      pendingNextState.current = upcoming;
      const nextCar = getCurrentCar(upcoming);
      const preloadPromise = preloadImages(nextCar);

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

        // Fade out
        setTransitioning(true);

        // Wait for both fade-out (300ms) and images to be ready
        Promise.all([
          preloadPromise,
          new Promise((r) => setTimeout(r, 300)),
        ]).then(() => {
          setQuizState(pendingNextState.current);
          pendingNextState.current = null;
          // Small tick to let React render, then fade in
          requestAnimationFrame(() => {
            setTransitioning(false);
          });
        });
      }, 4000);
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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const currentCar = getCurrentCar(quizState);
  const isCorrect = quizState.selectedAnswer === currentCar.internalCode;

  return (
    <div className="flex flex-col h-[calc(100vh-3px)] py-3 gap-3">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <ScoreBar
          score={quizState.score}
          total={quizState.answers.length}
          mode={mode}
          roundSize={roundSize}
          streak={quizState.streak}
        />
        <div className="flex items-center gap-1 ml-3 shrink-0">
          <ThemeToggle />
          {mode === "endless" && !quizState.answered && (
            <button
              onClick={handleQuit}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all hover:text-destructive hover:bg-destructive/10"
              title="End Quiz"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main content — fades out/in between questions */}
      <div
        className={cn(
          "flex gap-5 flex-1 min-h-0 transition-opacity duration-300 ease-in-out",
          transitioning ? "opacity-0" : "opacity-100"
        )}
      >
        {/* Left: images */}
        <div className="w-1/2 min-h-0">
          <ImageCarousel
            images={currentCar.images}
            altText={currentCar.officialName}
          />
        </div>

        {/* Right: info + answers */}
        <div className="w-1/2 flex flex-col gap-4 justify-center">
          <div>
            <p className="text-xs font-medium text-primary uppercase tracking-widest mb-1">
              {currentCar.series}
            </p>
            <h2 className="text-2xl font-bold tracking-tight leading-tight" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
              {currentCar.officialName}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {currentCar.years}
            </p>
          </div>

          <AnswerGrid
            options={quizState.options}
            correctAnswer={currentCar.internalCode}
            answered={quizState.answered}
            selectedAnswer={quizState.selectedAnswer}
            onAnswer={handleAnswer}
          />

          {quizState.answered && (
            <div
              className={cn(
                "rounded-xl border px-4 py-3 text-sm transition-all animate-scale-in",
                isCorrect
                  ? "border-emerald-500/20 bg-emerald-500/5"
                  : "border-red-500/20 bg-red-500/5"
              )}
            >
              <p className="leading-relaxed">
                <span
                  className={cn(
                    "font-bold",
                    isCorrect ? "text-emerald-400" : "text-red-400"
                  )}
                >
                  {isCorrect ? "Correct! " : "Wrong! "}
                </span>
                <span className="font-mono font-bold text-primary">
                  {currentCar.internalCode}
                </span>
                {" — "}
                {currentCar.officialName} ({currentCar.years}).{" "}
                <span className="text-muted-foreground">
                  {getCodeExplanation(
                    currentCar.internalCode,
                    currentCar.series
                  )}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <QuizContent />
    </Suspense>
  );
}
