"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Difficulty, GameMode, RoundSize } from "@/lib/types";
import DifficultySelector from "@/components/DifficultySelector";
import GameModeSelector from "@/components/GameModeSelector";
import { ChevronRight } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<Difficulty>("core");
  const [mode, setMode] = useState<GameMode>("rounds");
  const [roundSize, setRoundSize] = useState<RoundSize>(10);

  function startGame() {
    const params = new URLSearchParams({
      difficulty,
      mode,
      ...(mode === "rounds" && { roundSize: roundSize.toString() }),
    });
    router.push(`/quiz?${params.toString()}`);
  }

  return (
    <div className="px-6 lg:px-12 max-w-7xl mx-auto">
      {/* M-stripe accent */}
      <div className="w-full max-w-4xl h-1.5 m-stripe-gradient rounded-full mt-12 mb-12 animate-fade-in" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Hero Content */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex flex-col animate-fade-up">
            <span className="font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.3em] text-primary mb-2 uppercase">
              M-TECHNIC DATA MODULE
            </span>
            <h1
              className="font-[family-name:var(--font-display)] italic text-6xl md:text-8xl tracking-tighter text-foreground leading-[0.9]"
            >
              BMW CODE
              <br />
              QUIZ
            </h1>
          </div>

          <div className="flex flex-col gap-4 animate-fade-up delay-2">
            <p className="font-[family-name:var(--font-label-font)] text-lg text-on-surface-variant font-bold leading-tight uppercase tracking-wide">
              TEST YOUR KNOWLEDGE OF BMW&apos;S INTERNAL CHASSIS CODES
            </p>
            <p className="text-on-surface-variant max-w-lg text-base opacity-80 leading-relaxed">
              From the classic E30 to the latest G87 — how well do you really know your BMWs?
              Decode the engineering history of Munich&apos;s finest machines.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mt-8 animate-fade-up delay-4">
            <div className="bg-surface-container-low p-6 rounded-lg">
              <span className="block font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-1">
                DATABASE
              </span>
              <span className="block font-[family-name:var(--font-display)] italic text-2xl font-bold text-foreground tabular-nums">
                155 VEHICLES
              </span>
            </div>
            <div className="bg-surface-container-low p-6 rounded-lg border-l-4 border-primary-container">
              <span className="block font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-1">
                GENERATIONS
              </span>
              <span className="block font-[family-name:var(--font-display)] italic text-2xl font-bold text-primary tabular-nums">
                E / F / G / U / I
              </span>
            </div>
          </div>
        </div>

        {/* Configuration Card */}
        <div className="lg:col-span-5 animate-fade-up delay-3">
          <div className="glass-panel p-8 rounded-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 font-[family-name:var(--font-label-font)] text-[10px] text-foreground/10 tracking-tighter">
              CHASSIS_AUTH_v2.0
            </div>

            <h3 className="font-[family-name:var(--font-label-font)] text-sm tracking-[0.15em] text-foreground mb-8 border-b border-border pb-2 uppercase">
              QUIZ CONFIGURATION
            </h3>

            <div className="space-y-8">
              <DifficultySelector value={difficulty} onChange={setDifficulty} />
              <GameModeSelector
                mode={mode}
                roundSize={roundSize}
                onModeChange={setMode}
                onRoundSizeChange={setRoundSize}
              />

              <button
                onClick={startGame}
                className="group w-full py-5 bg-primary-container hover:brightness-110 transition-all text-white font-[family-name:var(--font-display)] italic tracking-tighter text-xl rounded flex justify-center items-center gap-3 active:scale-[0.98]"
              >
                START QUIZ
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-24" />
    </div>
  );
}
