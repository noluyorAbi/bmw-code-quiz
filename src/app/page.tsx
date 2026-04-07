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
    <div className="min-h-screen flex flex-col items-center">
      {/* M-Stripe accent */}
      <div className="w-full max-w-4xl h-1.5 m-stripe-gradient rounded-full mt-8 mb-12 animate-fade-in px-6" />

      <div className="w-full max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        {/* Hero Content */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex flex-col animate-fade-up">
            <span className="font-[family-name:var(--font-label-font)] text-xs tracking-[0.3em] text-primary mb-2 uppercase">
              M-TECHNIC DATA MODULE
            </span>
            <h1 className="font-[family-name:var(--font-display)] font-black italic text-6xl md:text-8xl tracking-tighter text-foreground leading-none">
              BMW CODE QUIZ
            </h1>
          </div>

          <div className="flex flex-col gap-4 animate-fade-up delay-2">
            <p className="font-[family-name:var(--font-label-font)] text-xl text-on-surface-variant font-bold leading-tight uppercase tracking-wide">
              TEST YOUR KNOWLEDGE OF BMW&apos;S INTERNAL CHASSIS CODES
            </p>
            <p className="text-on-surface-variant max-w-lg text-lg opacity-80 leading-relaxed">
              From the classic E30 to the latest G87 — how well do you really know your BMWs?
              Decode the engineering history of Munich&apos;s finest machines.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mt-8 animate-fade-up delay-4">
            <div className="bg-surface-container-low p-6 rounded-lg">
              <span className="block font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-1">
                DATABASE ENTRIES
              </span>
              <span className="block font-[family-name:var(--font-display)] text-3xl font-bold text-foreground tabular-nums italic">
                155 VEHICLES
              </span>
            </div>
            <div className="bg-surface-container-low p-6 rounded-lg border-l-4 border-primary-container">
              <span className="block font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-1">
                M-DIVISION BENCHMARK
              </span>
              <span className="block font-[family-name:var(--font-display)] text-3xl font-bold text-primary tabular-nums italic">
                E / F / G / U / I
              </span>
            </div>
          </div>
        </div>

        {/* Configuration Card */}
        <div className="lg:col-span-5 animate-fade-up delay-3">
          <div className="glass-panel p-8 rounded-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 font-[family-name:var(--font-label-font)] text-[10px] text-foreground/20 tracking-tighter">
              CHASSIS_AUTH_v2.0
            </div>

            <h3 className="font-[family-name:var(--font-label-font)] text-sm tracking-widest text-foreground mb-8 border-b border-border pb-2 uppercase">
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
                className="group w-full py-5 bg-primary-container hover:bg-blue-600 transition-all text-white font-[family-name:var(--font-display)] font-black italic tracking-tighter text-xl rounded flex justify-center items-center gap-3 active:scale-[0.98]"
              >
                START QUIZ
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Car Image */}
      <div className="w-full mt-24 relative overflow-hidden h-[500px] animate-fade-in delay-6">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://commons.wikimedia.org/w/thumb.php?f=BMW_G82_M4_Competition_Frozen_Deep_Grey.jpg&w=1600"
          alt="BMW M4 G82"
          className="w-full h-full object-cover grayscale brightness-75 contrast-125"
        />
        {/* Floating Technical Specs */}
        <div className="absolute bottom-12 left-12 z-20 flex flex-col gap-1">
          <span className="font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.4em] text-primary uppercase">
            CURRENT MODEL STUDY
          </span>
          <span className="font-[family-name:var(--font-display)] font-black text-4xl text-white italic tracking-tighter uppercase">
            CHASSIS G82
          </span>
          <div className="flex gap-4 mt-2">
            <span className="font-[family-name:var(--font-label-font)] text-[10px] text-muted-foreground uppercase border border-muted-foreground/20 px-2 py-0.5">
              S58 ENGINE
            </span>
            <span className="font-[family-name:var(--font-label-font)] text-[10px] text-muted-foreground uppercase border border-muted-foreground/20 px-2 py-0.5">
              503 HP
            </span>
            <span className="font-[family-name:var(--font-label-font)] text-[10px] text-muted-foreground uppercase border border-muted-foreground/20 px-2 py-0.5">
              0-60: 3.4S
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
