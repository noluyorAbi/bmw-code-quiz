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

const FEATURED_CARS = [
  { name: "BMW E30", code: "E30", years: "1982–1994", series: "3 Series", img: "https://commons.wikimedia.org/w/thumb.php?f=BMW_E30_in_silver_%28facelift%29%2C_front_left_2024-08-18.jpg&w=600", desc: "The car that defined the sports sedan. The E30 3 Series established BMW as the ultimate driving machine." },
  { name: "BMW E46", code: "E46", years: "1997–2006", series: "3 Series", img: "https://commons.wikimedia.org/w/thumb.php?f=BMW_E46_front_20080328.jpg&w=600", desc: "Widely regarded as the pinnacle of BMW's naturally aspirated era. The E46 M3 remains a legend." },
  { name: "BMW M3 F80", code: "F80", years: "2014–2018", series: "M3", img: "https://commons.wikimedia.org/w/thumb.php?f=BMW_M3_%28F80%29_front.jpg&w=600", desc: "First turbocharged M3. The S55 twin-turbo inline-6 brought 425 HP and a new era of M performance." },
  { name: "BMW M4 G82", code: "G82", years: "2021–present", series: "M4", img: "https://commons.wikimedia.org/w/thumb.php?f=2021_BMW_M4_Competition_Automatic_3.0_Front.jpg&w=600", desc: "The controversial grille. The S58 engine. 503 HP in Competition spec. Love it or hate it — you know the code." },
  { name: "BMW 7 Series G70", code: "G70", years: "2022–present", series: "7 Series", img: "https://commons.wikimedia.org/w/thumb.php?f=BMW_7_SERIES_%28G70%29_China_%28resized%29.jpg&w=600", desc: "BMW's flagship luxury sedan redefined. Split headlights, theater screen, and up to 544 HP in the i7." },
  { name: "BMW Z4 G29", code: "G29", years: "2018–present", series: "Z Series", img: "https://commons.wikimedia.org/w/thumb.php?f=BMW_Z4_sDrive30i_%28G29%2C_2019%29_%2852226832452%29.jpg&w=600", desc: "BMW's roadster lives on. Shares a platform with the Toyota Supra — but true fans know it as the G29." },
  { name: "BMW X5 G05", code: "G05", years: "2018–present", series: "X5", img: "https://commons.wikimedia.org/w/thumb.php?f=2020_BMW_X5_G05_xDrive30d_M_Sport%2C_front_right%2C_06-30-2024.jpg&w=600", desc: "The Sports Activity Vehicle that started it all — now in its fourth generation with PHEV and M Competition variants." },
  { name: "BMW iX I20", code: "I20", years: "2021–present", series: "i Series", img: "https://commons.wikimedia.org/w/thumb.php?f=2022_BMW_iX_front.jpg&w=600", desc: "BMW's electric flagship SUV. The I20 platform brings up to 610 HP and 300+ miles of range." },
];

const POPULAR_CODES = [
  "E21", "E30", "E36", "E46", "E90", "E39", "E60", "E38", "E34", "E92", "E31",
  "F30", "F80", "F82", "F10", "F87", "F90",
  "G20", "G80", "G82", "G42", "G70", "G87", "G60",
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
              Do you know which generation the <strong className="text-foreground">M3</strong> became the <strong className="text-foreground">G80</strong>?
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
              <GameModeSelector mode={mode} roundSize={roundSize} onModeChange={setMode} onRoundSizeChange={setRoundSize} />
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

      {/* ──────────────── Featured Cars Showcase ──────────────── */}
      <section className="w-full max-w-6xl px-6 mt-24">
        <div className="mb-10">
          <span className="font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.3em] text-primary uppercase">
            VEHICLE DATABASE PREVIEW
          </span>
          <h2 className="font-[family-name:var(--font-display)] font-black italic text-4xl md:text-5xl tracking-tighter text-foreground mt-2">
            ICONIC CHASSIS CODES
          </h2>
          <p className="text-on-surface-variant max-w-2xl mt-3 leading-relaxed">
            From legendary sports sedans to cutting-edge electric SUVs — these are some of the 155 BMW models
            you&apos;ll encounter in the quiz. Each one has a story, a chassis code, and a legacy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURED_CARS.map((car, i) => (
            <div
              key={car.code}
              className="group bg-surface-container-low rounded-xl overflow-hidden border border-border hover:border-primary-container/30 transition-all animate-fade-up"
              style={{ animationDelay: `${0.05 * i}s` }}
            >
              <div className="aspect-[4/3] overflow-hidden relative bg-[#0c0e11]">
                <SafeImage
                  src={car.img}
                  alt={`${car.name} (${car.code}) — ${car.years}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  fallbackClassName="w-full h-full bg-surface-container-highest"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e11]/70 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="font-mono text-2xl font-bold text-white">{car.code}</span>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="font-[family-name:var(--font-label-font)] text-[8px] tracking-wider text-white/60 bg-black/40 px-1.5 py-0.5 rounded uppercase">
                    {car.series}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-[family-name:var(--font-display)] font-bold italic text-sm text-foreground">
                    {car.name}
                  </h3>
                  <span className="font-mono text-[10px] text-muted-foreground">{car.years}</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">{car.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────── Hero Car Image ──────────────── */}
      <div className="w-full mt-20 relative overflow-hidden h-[450px]">
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
            <span className="font-[family-name:var(--font-label-font)] text-[10px] text-muted-foreground uppercase border border-muted-foreground/20 px-2 py-0.5">S58 ENGINE</span>
            <span className="font-[family-name:var(--font-label-font)] text-[10px] text-muted-foreground uppercase border border-muted-foreground/20 px-2 py-0.5">503 HP</span>
            <span className="font-[family-name:var(--font-label-font)] text-[10px] text-muted-foreground uppercase border border-muted-foreground/20 px-2 py-0.5">0-60: 3.4S</span>
          </div>
        </div>
      </div>

      {/* ──────────────── Generation Guide ──────────────── */}
      <section className="w-full max-w-6xl px-6 py-20 space-y-16">
        <div>
          <span className="font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.3em] text-primary uppercase">
            CHASSIS CODE REFERENCE
          </span>
          <h2 className="font-[family-name:var(--font-display)] font-black italic text-4xl md:text-5xl tracking-tighter text-foreground mt-2">
            BMW&apos;S INTERNAL NAMING SYSTEM
          </h2>
          <p className="text-on-surface-variant max-w-2xl mt-4 leading-relaxed">
            Since the 1960s, BMW has assigned every model an internal chassis code during development. The prefix letter
            indicates the generation era, while the number identifies the specific platform. The &quot;E&quot; stands for
            <em> Entwicklung</em> — German for &quot;development&quot; — the designation used for over 50 years of BMW engineering.
            Modern BMWs use F, G, U, and I prefixes as the lineup expanded beyond the original numbering system.
          </p>
        </div>

        {/* Generation Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CODE_GENERATIONS.map((gen, i) => (
            <div
              key={gen.prefix}
              className="bg-surface-container-low p-6 rounded-lg border border-border hover:border-primary-container/30 transition-colors animate-fade-up"
              style={{ animationDelay: `${0.08 * i}s` }}
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

        {/* Featured Codes */}
        <div className="space-y-4">
          <span className="font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            FEATURED CHASSIS CODES IN THIS QUIZ
          </span>
          <div className="flex flex-wrap gap-2">
            {POPULAR_CODES.map((code) => (
              <span key={code} className="font-mono text-sm font-bold px-3 py-1.5 bg-surface-container-high rounded text-on-surface-variant border border-border hover:text-primary hover:border-primary-container/40 transition-colors cursor-default">
                {code}
              </span>
            ))}
          </div>
        </div>

        {/* ──────────────── BMW History Story ──────────────── */}
        <div>
          <span className="font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.3em] text-primary uppercase">
            THE STORY BEHIND THE CODES
          </span>
          <h2 className="font-[family-name:var(--font-display)] font-black italic text-3xl md:text-4xl tracking-tighter text-foreground mt-2">
            60 YEARS OF BMW CHASSIS CODES
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-on-surface-variant leading-relaxed">
          <div className="space-y-4">
            <p>
              It started in 1962 with the <strong className="text-foreground">BMW 1500 (E115)</strong> — the &quot;Neue Klasse&quot; that saved BMW from bankruptcy.
              The internal designation system using &quot;E&quot; for <em>Entwicklung</em> (development) became standard practice in Munich.
              Every platform, every body variant, every generation received its own code.
            </p>
            <p>
              By the time the legendary <strong className="text-foreground">E30 3 Series</strong> arrived in 1982, these codes had become part of BMW culture.
              Enthusiasts didn&apos;t say &quot;I drive a 1990 BMW 325i&quot; — they said &quot;I drive an E30.&quot;
              The <strong className="text-foreground">E36</strong>, <strong className="text-foreground">E46</strong>, <strong className="text-foreground">E90</strong> —
              each generation of the 3 Series became its own icon.
            </p>
            <p>
              The M Division added another layer. The <strong className="text-foreground">E30 M3</strong> with its S14 engine.
              The <strong className="text-foreground">E46 M3</strong> and its screaming S54 inline-6.
              The <strong className="text-foreground">E60 M5</strong> with the F1-derived V10.
              Every M car earned its chassis code through sheer engineering excess.
            </p>
          </div>
          <div className="space-y-4">
            <p>
              Around 2010, BMW transitioned to &quot;F&quot; codes. The <strong className="text-foreground">F30 3 Series</strong> and <strong className="text-foreground">F80 M3</strong> ushered in
              the turbo era. Then came &quot;G&quot; — the <strong className="text-foreground">G20 3 Series</strong>, the polarizing <strong className="text-foreground">G82 M4</strong>,
              the tech-laden <strong className="text-foreground">G70 7 Series</strong>.
            </p>
            <p>
              BMW&apos;s SUVs — or &quot;Sports Activity Vehicles&quot; — brought the X lineup: <strong className="text-foreground">E53 X5</strong>,
              <strong className="text-foreground">F15 X5</strong>, <strong className="text-foreground">G05 X5</strong>.
              The Z roadsters: <strong className="text-foreground">E36/7 Z3</strong>, <strong className="text-foreground">E85 Z4</strong>, <strong className="text-foreground">G29 Z4</strong>.
              And the electric future: <strong className="text-foreground">I01 i3</strong>, <strong className="text-foreground">I12 i8</strong>, <strong className="text-foreground">I20 iX</strong>.
            </p>
            <p>
              Then there are the <strong className="text-foreground">LCI</strong> facelifts — <em>Life Cycle Impulse</em> — BMW&apos;s term for mid-cycle updates.
              Can you spot an <strong className="text-foreground">E90 LCI</strong> vs a pre-facelift <strong className="text-foreground">E90</strong>?
              What about an <strong className="text-foreground">F30 LCI</strong> vs the original <strong className="text-foreground">F30</strong>?
              This quiz will find out.
            </p>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="space-y-3">
            <h3 className="font-[family-name:var(--font-display)] font-bold italic text-lg text-foreground">
              Every Series &amp; Generation
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              1 Series through 8 Series. X1 through X7. Z3, Z4. BMW i3, i4, i8, iX, iX3.
              The Isetta, 2002, and E9 3.0 CS. From 1955 to 2025 — every era of BMW represented.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-[family-name:var(--font-display)] font-bold italic text-lg text-foreground">
              M Cars &amp; Body Variants
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Every M3 from E30 to G80. Every M5 from E28 to G90. M2, M4, M6, M8, X5 M, X6 M, the 1M Coup&eacute;.
              Plus Touring wagons, Cabrios, Compacts, Gran Coup&eacute;s, and Gran Turismos.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-[family-name:var(--font-display)] font-bold italic text-lg text-foreground">
              LCI Facelifts &amp; Deep Cuts
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              The exhaustive difficulty adds 16 LCI variants across the 1, 3, 4, 5, 7 Series and X models.
              Long-wheelbase 7 Series (E66, F02, G12). The X3 M F97 and X4 M F98. Pure enthusiast territory.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
