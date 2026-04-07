"use client";

import { useEffect, useState, useCallback, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Difficulty,
  GameMode,
  RoundSize,
  QuizState,
  BmwCar,
} from "@/lib/types";
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
import { LogOut, FileText } from "lucide-react";

function preloadImages(car: BmwCar): Promise<void> {
  const urls = [car.images.front, car.images.side, car.images.rear].filter(
    Boolean,
  );
  return Promise.all(
    [...new Set(urls)].map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = url;
        }),
    ),
  ).then(() => {});
}

function getCodeExplanation(code: string, series: string): string {
  const prefix =
    code.startsWith("NA") || code.startsWith("ZA")
      ? code.substring(0, 2)
      : code.charAt(0);
  const prefixMeaning: Record<string, string> = {
    E: '"E" (Entwicklung = Development) was used for BMW chassis codes from the 1960s to ~2012.',
    F: '"F" generation codes replaced "E" starting around 2010, marking BMW\'s modern era.',
    G: '"G" generation codes have been used since ~2017. With the arrival of the Neue Klasse (NA) platform, G-series models represent BMW\'s CLAR-based lineup.',
    U: '"U" is used for BMW\'s newer UKL/FAAR platform-based compact models.',
    I: '"I" prefix is reserved for BMW\'s fully electric "i" sub-brand vehicles.',
    NA: '"NA" is BMW\'s Neue Klasse (New Class) platform code for the next generation of electric vehicles, featuring 800V architecture and a completely new design language.',
    ZA: '"ZA" is the M performance variant code for BMW\'s Neue Klasse platform — the "Z" replaces "N" for M Division models.',
  };
  const parts: string[] = [];
  if (prefixMeaning[prefix]) parts.push(prefixMeaning[prefix]);
  if (code.includes("LCI"))
    parts.push(
      '"LCI" (Life Cycle Impulse) is BMW\'s term for a mid-cycle facelift update.',
    );
  if (/M[345688]|1M/.test(code))
    parts.push(
      "M models are high-performance variants developed by BMW M GmbH.",
    );
  if (series === "Z Series")
    parts.push(
      'The Z designation stands for "Zukunft" (Future), BMW\'s roadster line.',
    );
  if (series.startsWith("X") && !series.includes("M"))
    parts.push(
      "The X prefix denotes BMW's SAV (Sports Activity Vehicle) lineup.",
    );
  if (code.includes("Touring"))
    parts.push('"Touring" is BMW\'s name for their estate/wagon body style.');
  if (code.includes("/"))
    parts.push(
      "The slash notation indicates a body style variant within the same generation.",
    );
  if (series === "Neue Klasse")
    parts.push(
      "Neue Klasse vehicles use BMW's next-generation electric platform with 800V architecture, up to 900+ km range, and a radically new design language.",
    );
  return parts.join(" ") || `Part of the BMW ${series} lineage.`;
}

function QuizContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const difficulty = (searchParams.get("difficulty") || "core") as Difficulty;
  const mode = (searchParams.get("mode") || "rounds") as GameMode;
  const roundSize = parseInt(
    searchParams.get("roundSize") || "10",
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

      const upcoming = nextQuestion(newState, pool);
      pendingNextState.current = upcoming;
      const preloadPromise = preloadImages(getCurrentCar(upcoming));

      setTimeout(() => {
        if (mode === "rounds" && newState.answers.length >= roundSize) {
          const params = new URLSearchParams({
            score: newState.score.toString(),
            total: newState.answers.length.toString(),
            difficulty,
            mode,
            bestStreak: newState.bestStreak.toString(),
          });
          router.push(`/results?${params.toString()}`);
          return;
        }
        setTransitioning(true);
        Promise.all([
          preloadPromise,
          new Promise((r) => setTimeout(r, 300)),
        ]).then(() => {
          setQuizState(pendingNextState.current);
          pendingNextState.current = null;
          requestAnimationFrame(() => setTransitioning(false));
        });
      }, 4000);
    },
    [quizState, pool, mode, roundSize, difficulty, router],
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
    <div className="px-6 lg:px-12 max-w-7xl mx-auto py-6 space-y-6">
      {/* Score Bar */}
      <ScoreBar
        score={quizState.score}
        total={quizState.answers.length}
        mode={mode}
        roundSize={roundSize}
        streak={quizState.streak}
      />

      {/* Main Quiz Grid */}
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-12 gap-8 transition-opacity duration-300",
          transitioning ? "opacity-0" : "opacity-100",
        )}
      >
        {/* Left: Image Display */}
        <div className="lg:col-span-8 space-y-4">
          <ImageCarousel
            images={currentCar.images}
            altText={currentCar.officialName}
            overlayTitle={`INTEL TARGET: ${currentCar.officialName.replace("BMW ", "")}`}
          />
        </div>

        {/* Right: Answers */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div className="p-6 bg-surface-container-low rounded-xl border border-border flex flex-col h-full">
            {/* Car info */}
            <div className="mb-5">
              <span className="font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.2em] text-primary uppercase">
                {currentCar.series}
              </span>
              <h2 className="font-[family-name:var(--font-display)] font-black italic text-2xl text-foreground tracking-tight leading-tight mt-1">
                {currentCar.officialName}
              </h2>
              <span className="font-mono text-xs text-muted-foreground">
                {currentCar.years}
              </span>
            </div>

            {/* Answer heading */}
            <h3 className="text-[10px] font-[family-name:var(--font-label-font)] tracking-[0.2em] text-muted-foreground uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
              SELECT CHASSIS CODE
            </h3>

            <AnswerGrid
              options={quizState.options}
              correctAnswer={currentCar.internalCode}
              answered={quizState.answered}
              selectedAnswer={quizState.selectedAnswer}
              onAnswer={handleAnswer}
            />

            {/* Feedback */}
            {quizState.answered && (
              <div
                className={cn(
                  "mt-6 p-5 rounded-xl border-l-4 shadow-xl animate-scale-in",
                  isCorrect
                    ? "bg-surface-container-highest border-primary-container"
                    : "bg-surface-container-highest border-destructive",
                )}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={cn(
                      "p-2 rounded",
                      isCorrect
                        ? "bg-primary-container/20"
                        : "bg-destructive/20",
                    )}
                  >
                    <FileText
                      className={cn(
                        "h-4 w-4",
                        isCorrect ? "text-primary" : "text-destructive",
                      )}
                    />
                  </div>
                  <div>
                    <h4
                      className={cn(
                        "text-[10px] font-mono tracking-[0.15em] uppercase",
                        isCorrect
                          ? "text-primary-container"
                          : "text-destructive",
                      )}
                    >
                      {isCorrect ? "VERIFIED" : "INCORRECT"} CHASSIS INTEL:{" "}
                      {currentCar.internalCode}
                    </h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                      {getCodeExplanation(
                        currentCar.internalCode,
                        currentCar.series,
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Quit button */}
            {mode === "endless" && !quizState.answered && (
              <button
                onClick={handleQuit}
                className="mt-4 flex items-center gap-2 py-3 min-h-[44px] text-muted-foreground hover:text-destructive transition-colors font-mono text-xs"
              >
                <LogOut className="h-3.5 w-3.5" />
                END SESSION
              </button>
            )}
          </div>
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
