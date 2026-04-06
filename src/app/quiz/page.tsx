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
import ImageCarousel from "@/components/ImageCarousel";
import AnswerGrid from "@/components/AnswerGrid";
import ScoreBar from "@/components/ScoreBar";

function QuizContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const difficulty = (searchParams.get("difficulty") || "core") as Difficulty;
  const mode = (searchParams.get("mode") || "rounds") as GameMode;
  const roundSize = parseInt(searchParams.get("roundSize") || "10") as RoundSize;

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
    return <div className="flex justify-center"><span className="loading loading-spinner loading-lg" /></div>;
  }

  const currentCar = getCurrentCar(quizState);

  return (
    <div className="flex flex-col items-center gap-6">
      <ScoreBar
        score={quizState.score}
        total={quizState.answers.length + (quizState.answered ? 0 : 0)}
        mode={mode}
        roundSize={roundSize}
        streak={quizState.streak}
      />

      <ImageCarousel images={currentCar.images} altText={currentCar.officialName} />

      <div className="text-center">
        <h2 className="text-2xl font-bold">
          {currentCar.officialName}
        </h2>
        <p className="text-base-content/60">{currentCar.years}</p>
      </div>

      <AnswerGrid
        options={quizState.options}
        correctAnswer={currentCar.internalCode}
        answered={quizState.answered}
        selectedAnswer={quizState.selectedAnswer}
        onAnswer={handleAnswer}
      />

      {mode === "endless" && (
        <button className="btn btn-ghost btn-sm mt-4" onClick={handleQuit}>
          End Quiz
        </button>
      )}
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={<div className="flex justify-center"><span className="loading loading-spinner loading-lg" /></div>}>
      <QuizContent />
    </Suspense>
  );
}
