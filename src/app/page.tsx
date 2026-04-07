"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Difficulty, GameMode, RoundSize } from "@/lib/types";
import DifficultySelector from "@/components/DifficultySelector";
import GameModeSelector from "@/components/GameModeSelector";
import SafeImage from "@/components/SafeImage";
import { ChevronRight, Trophy } from "lucide-react";

const CODE_GENERATIONS = [
  { prefix: "E", label: "Entwicklung", era: "1960s – 2012", example: "E30, E46, E90", color: "text-foreground" },
  { prefix: "F", label: "Next Generation", era: "2010 – 2018", example: "F30, F80, F82", color: "text-foreground" },
  { prefix: "G", label: "Current Gen", era: "2017 – present", example: "G20, G80, G82", color: "text-primary" },
  { prefix: "U", label: "FAAR Platform", era: "2022 – present", example: "U06, U10, U11", color: "text-foreground" },
  { prefix: "I", label: "Electric", era: "2013 – present", example: "I01, I12, I20", color: "text-foreground" },
];

const POPULAR_CODES = [
  "E30", "E36", "E46", "E90", "E39", "E60", "E38", "E34",
  "F30", "F80", "F82", "F10", "F87", "G20", "G80", "G82", "G87",
];

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
            <h2 className="font-[family-name:var(--font-label-font)] text-xl text-on-surface-variant font-bold leading-tight uppercase tracking-wide">
              TEST YOUR KNOWLEDGE OF BMW&apos;S INTERNAL CHASSIS CODES
            </h2>
            <p className="text-on-surface-variant max-w-lg text-base opacity-80 leading-relaxed">
              Every BMW ever made has an internal development code — from <strong className="text-foreground">E30</strong> to <strong className="text-foreground">G87</strong>.
              Can you tell an <strong className="text-foreground">E46</strong> from an <strong className="text-foreground">F30</strong>?
              Do you know what <strong className="text-foreground">LCI</strong> means, or which generation the <strong className="text-foreground">M3</strong> became the <strong className="text-foreground">G80</strong>?
              Decode the engineering history of Munich&apos;s finest machines.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mt-6 animate-fade-up delay-4">
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
                CHASSIS GENERATIONS
              </span>
              <span className="block font-[family-name:var(--font-display)] text-3xl font-bold text-primary tabular-nums italic">
                E / F / G / U / I
              </span>
            </div>
          </div>

          {/* Leaderboard CTA */}
          <button
            onClick={() => router.push("/leaderboard")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mt-2 animate-fade-up delay-5"
          >
            <Trophy className="h-4 w-4" />
            <span className="font-[family-name:var(--font-label-font)] text-xs tracking-[0.15em] uppercase">
              VIEW GLOBAL LEADERBOARD
            </span>
          </button>
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
        <SafeImage
          src="https://commons.wikimedia.org/w/thumb.php?f=2021_BMW_M4_Competition_Automatic_3.0_Front.jpg&w=1600"
          alt="BMW M4 Competition G82 — one of 155 vehicles in the BMW Code Quiz"
          className="w-full h-full object-cover grayscale brightness-75 contrast-125"
          fallbackClassName="w-full h-full bg-surface-container-low"
        />
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

      {/* SEO Content: Generation Guide */}
      <section className="w-full max-w-6xl px-6 py-20 space-y-16">
        <div className="animate-fade-up">
          <span className="font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.3em] text-primary uppercase">
            CHASSIS CODE REFERENCE
          </span>
          <h2 className="font-[family-name:var(--font-display)] font-black italic text-4xl md:text-5xl tracking-tighter text-foreground mt-2">
            UNDERSTAND BMW&apos;S INTERNAL NAMING SYSTEM
          </h2>
          <p className="text-on-surface-variant max-w-2xl mt-4 leading-relaxed">
            BMW assigns every model an internal chassis code during development. The prefix letter indicates the generation era,
            while the number identifies the specific model. Enthusiasts worldwide use these codes — like E46, F80, or G82 — as
            shorthand for specific BMW generations. This quiz tests whether you can match the car to its code.
          </p>
        </div>

        {/* Generation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CODE_GENERATIONS.map((gen, i) => (
            <div
              key={gen.prefix}
              className="bg-surface-container-low p-6 rounded-lg border border-border hover:border-primary-container/30 transition-colors animate-fade-up"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <span className={`font-mono text-4xl font-bold ${gen.color}`}>{gen.prefix}</span>
              <h3 className="font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.2em] text-muted-foreground uppercase mt-3">
                {gen.label}
              </h3>
              <p className="font-mono text-xs text-on-surface-variant mt-1">{gen.era}</p>
              <p className="font-mono text-[10px] text-muted-foreground mt-2">{gen.example}</p>
            </div>
          ))}
        </div>

        {/* Popular Codes Ticker */}
        <div className="space-y-4">
          <span className="font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            FEATURED CHASSIS CODES IN THIS QUIZ
          </span>
          <div className="flex flex-wrap gap-2">
            {POPULAR_CODES.map((code) => (
              <span
                key={code}
                className="font-mono text-sm font-bold px-3 py-1.5 bg-surface-container-high rounded text-on-surface-variant border border-border hover:text-primary hover:border-primary-container/40 transition-colors cursor-default"
              >
                {code}
              </span>
            ))}
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h3 className="font-[family-name:var(--font-display)] font-bold italic text-lg text-foreground">
              Every Generation
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              From the iconic BMW 2002 (E10) to the latest BMW M2 (G87). Covers all major series: 1 through 8 Series,
              X1 through X7, Z3/Z4 roadsters, and the full i Series electric lineup including i3, i4, i8, iX, and iX3.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-[family-name:var(--font-display)] font-bold italic text-lg text-foreground">
              M Cars &amp; Variants
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Test yourself on every M3 generation (E30 M3 through G80), all M4s, M5s from the E28 to the G90,
              plus M2, M6, M8, X5 M, X6 M, and the legendary 1M Coup&eacute;. Touring, Cabrio, Compact, and Gran Coup&eacute; variants included.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-[family-name:var(--font-display)] font-bold italic text-lg text-foreground">
              LCI Facelifts
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Can you spot the difference between an E46 and an E46 LCI? The exhaustive difficulty includes mid-cycle
              facelifts (Life Cycle Impulse) for the 1, 3, 4, 5, 7 Series and X models — the ultimate test for BMW purists.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
