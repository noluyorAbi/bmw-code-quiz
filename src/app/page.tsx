"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Difficulty, GameMode, RoundSize } from "@/lib/types";
import DifficultySelector from "@/components/DifficultySelector";
import GameModeSelector from "@/components/GameModeSelector";
import SafeImage from "@/components/SafeImage";
import { ChevronRight, Trophy } from "lucide-react";

const CODE_GENERATIONS = [
  {
    prefix: "E",
    label: "Entwicklung",
    era: "1960s – 2012",
    example: "E30, E46, E90",
    color: "text-foreground",
  },
  {
    prefix: "F",
    label: "Next Generation",
    era: "2010 – 2018",
    example: "F30, F80, F82",
    color: "text-foreground",
  },
  {
    prefix: "G",
    label: "7th Generation",
    era: "2017 – present",
    example: "G20, G80, G82",
    color: "text-foreground",
  },
  {
    prefix: "U",
    label: "FAAR Platform",
    era: "2022 – present",
    example: "U06, U10, U11",
    color: "text-foreground",
  },
  {
    prefix: "I",
    label: "Electric",
    era: "2013 – present",
    example: "I01, I12, I20",
    color: "text-foreground",
  },
  {
    prefix: "NA",
    label: "Neue Klasse",
    era: "2025 – future",
    example: "NA0, NA5",
    color: "text-primary",
  },
];

const FEATURED_CARS = [
  {
    name: "BMW E30",
    code: "E30",
    years: "1982–1994",
    series: "3 Series",
    img: "https://commons.wikimedia.org/w/thumb.php?f=BMW_E30_in_silver_%28facelift%29%2C_front_left_2024-08-18.jpg&w=600",
    desc: "The car that defined the sports sedan. The E30 3 Series established BMW as the ultimate driving machine.",
  },
  {
    name: "BMW E46",
    code: "E46",
    years: "1997–2006",
    series: "3 Series",
    img: "https://commons.wikimedia.org/w/thumb.php?f=BMW_E46_front_20080328.jpg&w=600",
    desc: "Widely regarded as the pinnacle of BMW's naturally aspirated era. The E46 M3 remains a legend.",
  },
  {
    name: "BMW M3 F80",
    code: "F80",
    years: "2014–2018",
    series: "M3",
    img: "https://commons.wikimedia.org/w/thumb.php?f=BMW_M3_%28F80%29_front.jpg&w=600",
    desc: "First turbocharged M3. The S55 twin-turbo inline-6 brought 425 HP and a new era of M performance.",
  },
  {
    name: "BMW M4 G82",
    code: "G82",
    years: "2021–present",
    series: "M4",
    img: "https://commons.wikimedia.org/w/thumb.php?f=2021_BMW_M4_Competition_Automatic_3.0_Front.jpg&w=600",
    desc: "The controversial grille. The S58 engine. 503 HP in Competition spec. Love it or hate it — you know the code.",
  },
  {
    name: "BMW 7 Series G70",
    code: "G70",
    years: "2022–present",
    series: "7 Series",
    img: "https://commons.wikimedia.org/w/thumb.php?f=BMW_7_SERIES_%28G70%29_China_%28resized%29.jpg&w=600",
    desc: "BMW's flagship luxury sedan redefined. Split headlights, theater screen, and up to 544 HP in the i7.",
  },
  {
    name: "BMW Z4 G29",
    code: "G29",
    years: "2018–present",
    series: "Z Series",
    img: "https://commons.wikimedia.org/w/thumb.php?f=BMW_Z4_sDrive30i_%28G29%2C_2019%29_%2852226832452%29.jpg&w=600",
    desc: "BMW's roadster lives on. Shares a platform with the Toyota Supra — but true fans know it as the G29.",
  },
  {
    name: "BMW X5 G05",
    code: "G05",
    years: "2018–present",
    series: "X5",
    img: "https://commons.wikimedia.org/w/thumb.php?f=2020_BMW_X5_G05_xDrive30d_M_Sport%2C_front_right%2C_06-30-2024.jpg&w=600",
    desc: "The Sports Activity Vehicle that started it all — now in its fourth generation with PHEV and M Competition variants.",
  },
  {
    name: "BMW iX I20",
    code: "I20",
    years: "2021–present",
    series: "i Series",
    img: "https://commons.wikimedia.org/w/thumb.php?f=2022_BMW_iX_front.jpg&w=600",
    desc: "BMW's electric flagship SUV. The I20 platform brings up to 610 HP and 300+ miles of range.",
  },
  {
    name: "BMW iX3 NA5",
    code: "NA5",
    years: "2025–present",
    series: "Neue Klasse",
    img: "https://commons.wikimedia.org/w/thumb.php?f=BMW_iX3_NA5_IAA_2025_DSC_1273.jpg&w=600",
    desc: "The first Neue Klasse vehicle. 800V architecture, 900+ km range, and a radical new design language for BMW's electric future.",
  },
];

const POPULAR_CODES = [
  "E21",
  "E30",
  "E36",
  "E46",
  "E90",
  "E39",
  "E60",
  "E38",
  "E34",
  "E92",
  "E31",
  "F30",
  "F80",
  "F82",
  "F10",
  "F87",
  "F90",
  "G20",
  "G80",
  "G82",
  "G42",
  "G70",
  "G87",
  "G60",
  "NA0",
  "NA5",
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
            <h1 className="font-[family-name:var(--font-display)] font-black italic text-4xl sm:text-6xl md:text-8xl tracking-tighter text-foreground leading-none">
              BMW CODE QUIZ
            </h1>
          </div>

          <div className="flex flex-col gap-4 animate-fade-up delay-2">
            <h2 className="font-[family-name:var(--font-label-font)] text-xl text-on-surface-variant font-bold leading-tight uppercase tracking-wide">
              TEST YOUR KNOWLEDGE OF BMW&apos;S INTERNAL CHASSIS CODES
            </h2>
            <p className="text-on-surface-variant max-w-lg text-base opacity-80 leading-relaxed">
              Every BMW ever made has an internal development code — from{" "}
              <strong className="text-foreground">E30</strong> to{" "}
              <strong className="text-foreground">G87</strong>. Can you tell an{" "}
              <strong className="text-foreground">E46</strong> from an{" "}
              <strong className="text-foreground">F30</strong>? Do you know
              which generation the{" "}
              <strong className="text-foreground">M3</strong> became the{" "}
              <strong className="text-foreground">G80</strong>? Decode the
              engineering history of Munich&apos;s finest machines.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mt-6 animate-fade-up delay-4">
            <div className="bg-surface-container-low p-6 rounded-lg">
              <span className="block font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-1">
                DATABASE ENTRIES
              </span>
              <span className="block font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-foreground tabular-nums italic">
                157 VEHICLES
              </span>
            </div>
            <div className="bg-surface-container-low p-6 rounded-lg border-l-4 border-primary-container">
              <span className="block font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-1">
                CHASSIS GENERATIONS
              </span>
              <span className="block font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-primary tabular-nums italic">
                E / F / G / U / I
              </span>
            </div>
          </div>

          <button
            onClick={() => router.push("/leaderboard")}
            className="flex items-center gap-2 py-2 min-h-[44px] text-sm text-muted-foreground hover:text-primary transition-colors mt-2 animate-fade-up delay-5"
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
            From legendary sports sedans to cutting-edge electric SUVs — these
            are some of the 157 BMW models you&apos;ll encounter in the quiz.
            Each one has a story, a chassis code, and a legacy.
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
                  <span className="font-mono text-2xl font-bold text-white">
                    {car.code}
                  </span>
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
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {car.years}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {car.desc}
                </p>
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
          alt="BMW M4 Competition G82 — one of 157 vehicles in the BMW Code Quiz"
          className="w-full h-full object-cover grayscale brightness-75 contrast-125"
          fallbackClassName="w-full h-full bg-surface-container-low"
        />
        <div className="absolute bottom-6 left-6 sm:bottom-12 sm:left-12 z-20 flex flex-col gap-1">
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
            Since the 1960s, BMW has assigned every model an internal chassis
            code during development. The prefix letter indicates the generation
            era, while the number identifies the specific platform. The
            &quot;E&quot; stands for
            <em> Entwicklung</em> — German for &quot;development&quot; — the
            designation used for over 50 years of BMW engineering. Modern BMWs
            use F, G, U, and I prefixes as the lineup expanded beyond the
            original numbering system.
          </p>
        </div>

        {/* Generation Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CODE_GENERATIONS.map((gen, i) => (
            <div
              key={gen.prefix}
              className="bg-surface-container-low p-6 rounded-lg border border-border hover:border-primary-container/30 transition-colors animate-fade-up"
              style={{ animationDelay: `${0.08 * i}s` }}
            >
              <span className={`font-mono text-4xl font-bold ${gen.color}`}>
                {gen.prefix}
              </span>
              <h3 className="font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.2em] text-muted-foreground uppercase mt-3">
                {gen.label}
              </h3>
              <p className="font-mono text-xs text-on-surface-variant mt-1">
                {gen.era}
              </p>
              <p className="font-mono text-[10px] text-muted-foreground mt-2">
                {gen.example}
              </p>
            </div>
          ))}
        </div>

        {/* ──────────────── How to Read a BMW Code ──────────────── */}
        <div>
          <span className="font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.3em] text-primary uppercase">
            DECODING THE SYSTEM
          </span>
          <h2 className="font-[family-name:var(--font-display)] font-black italic text-3xl md:text-4xl tracking-tighter text-foreground mt-2">
            HOW TO READ A BMW CHASSIS CODE
          </h2>
          <p className="text-on-surface-variant max-w-3xl mt-3 leading-relaxed">
            BMW chassis codes follow a consistent structure. Once you understand the pattern, you can decode any BMW
            at a glance. Here&apos;s how each part works — broken down letter by letter, number by number.
          </p>
        </div>

        {/* Visual code anatomy */}
        <div className="space-y-10">
          {/* Example 1: E46 */}
          <div className="bg-surface-container-low p-6 sm:p-8 rounded-xl border border-border">
            <p className="font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-4">
              BASIC CODE — STANDARD MODEL
            </p>
            <div className="flex items-center gap-1 sm:gap-2 mb-6">
              <span className="font-mono text-4xl sm:text-6xl font-bold text-primary">E</span>
              <span className="font-mono text-4xl sm:text-6xl font-bold text-foreground">46</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="font-mono text-lg font-bold text-primary shrink-0 w-8">E</span>
                <div>
                  <p className="font-bold text-foreground">Generation Prefix</p>
                  <p className="text-on-surface-variant">The letter indicates the era. <strong className="text-foreground">E</strong> = Entwicklung (1960s–2012), <strong className="text-foreground">F</strong> = 2010–2018, <strong className="text-foreground">G</strong> = 2017+, <strong className="text-foreground">U</strong> = FAAR platform, <strong className="text-foreground">I</strong> = electric i brand, <strong className="text-foreground">NA</strong> = Neue Klasse.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono text-lg font-bold text-foreground shrink-0 w-8">46</span>
                <div>
                  <p className="font-bold text-foreground">Platform Number</p>
                  <p className="text-on-surface-variant">A sequential development number assigned at BMW&apos;s FIZ research center. The numbers are <em>not</em> related to the series — E46 is the 3 Series, not the 4 Series. Numbers were assigned in the order projects were started.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 2: E90 M3 LCI */}
          <div className="bg-surface-container-low p-6 sm:p-8 rounded-xl border border-border">
            <p className="font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-4">
              EXTENDED CODE — M VARIANT WITH FACELIFT
            </p>
            <div className="flex items-center gap-1 sm:gap-3 mb-6 flex-wrap">
              <span className="font-mono text-4xl sm:text-6xl font-bold text-primary">E</span>
              <span className="font-mono text-4xl sm:text-6xl font-bold text-foreground">90</span>
              <span className="font-mono text-3xl sm:text-5xl font-bold text-destructive ml-2">M3</span>
              <span className="font-mono text-2xl sm:text-4xl font-bold text-secondary ml-2">LCI</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="font-mono text-lg font-bold text-primary shrink-0 w-14">E90</span>
                <div>
                  <p className="font-bold text-foreground">Base Platform</p>
                  <p className="text-on-surface-variant">The fifth-generation 3 Series sedan (2005–2011). This is the platform all variants share — the sedan, Touring, Coup&eacute;, and M3 all start from the E90 architecture.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono text-lg font-bold text-destructive shrink-0 w-14">M3</span>
                <div>
                  <p className="font-bold text-foreground">M Division Variant</p>
                  <p className="text-on-surface-variant">Denotes a high-performance M variant by BMW M GmbH. The M3 uses the S65 V8 engine (414 HP), upgraded brakes, suspension, aerodynamics, and a completely different character from the standard E90.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono text-lg font-bold text-secondary shrink-0 w-14">LCI</span>
                <div>
                  <p className="font-bold text-foreground">Life Cycle Impulse (Facelift)</p>
                  <p className="text-on-surface-variant">BMW&apos;s term for a mid-cycle refresh, typically at year 3–4. Brings updated lights, bumpers, interior, and sometimes new engines. The E90 LCI (2008–2011) got LED taillights and a revised iDrive system.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono text-lg font-bold text-muted-foreground shrink-0 w-14">TIP</span>
                <div>
                  <p className="font-bold text-foreground">Reading It Together</p>
                  <p className="text-on-surface-variant">&quot;E90 M3 LCI&quot; = fifth-gen 3 Series platform, M performance variant, post-facelift. In one glance, a BMW enthusiast knows the exact car: a 2008–2011 M3 sedan with the updated styling.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 3: E36/7 */}
          <div className="bg-surface-container-low p-6 sm:p-8 rounded-xl border border-border">
            <p className="font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-4">
              SLASH NOTATION — BODY VARIANT
            </p>
            <div className="flex items-center gap-1 sm:gap-2 mb-6">
              <span className="font-mono text-4xl sm:text-6xl font-bold text-primary">E</span>
              <span className="font-mono text-4xl sm:text-6xl font-bold text-foreground">36</span>
              <span className="font-mono text-4xl sm:text-6xl font-bold text-muted-foreground">/</span>
              <span className="font-mono text-4xl sm:text-6xl font-bold text-secondary">7</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="font-mono text-lg font-bold text-foreground shrink-0 w-14">E36</span>
                <div>
                  <p className="font-bold text-foreground">Parent Platform</p>
                  <p className="text-on-surface-variant">The third-generation 3 Series (1990–2000). All E36 variants — sedan, coup&eacute;, Touring, Compact, Convertible, and even the Z3 — share this base platform.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono text-lg font-bold text-secondary shrink-0 w-14">/7</span>
                <div>
                  <p className="font-bold text-foreground">Body Style Sub-Code</p>
                  <p className="text-on-surface-variant">The slash number identifies a specific body variant built on the same platform. For the E36: <strong className="text-foreground">/2</strong> = Coup&eacute;, <strong className="text-foreground">/3</strong> = Touring, <strong className="text-foreground">/5</strong> = Compact, <strong className="text-foreground">/2C</strong> = Convertible, <strong className="text-foreground">/7</strong> = Z3 Roadster. The Z3 is mechanically an E36 but with a unique roadster body.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 4: NA5 */}
          <div className="bg-surface-container-low p-6 sm:p-8 rounded-xl border border-primary-container/20">
            <p className="font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.2em] text-primary uppercase mb-4">
              NEUE KLASSE — THE NEW SYSTEM
            </p>
            <div className="flex items-center gap-1 sm:gap-2 mb-6">
              <span className="font-mono text-4xl sm:text-6xl font-bold text-primary">N</span>
              <span className="font-mono text-4xl sm:text-6xl font-bold text-foreground">A</span>
              <span className="font-mono text-4xl sm:text-6xl font-bold text-secondary">5</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="font-mono text-lg font-bold text-primary shrink-0 w-8">N</span>
                <div>
                  <p className="font-bold text-foreground">Neue Klasse</p>
                  <p className="text-on-surface-variant">&quot;N&quot; identifies the Neue Klasse (New Class) electric platform — BMW&apos;s clean-sheet EV architecture launched in 2025. For M variants, &quot;N&quot; becomes &quot;Z&quot; (e.g., ZA0 = electric M3).</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono text-lg font-bold text-foreground shrink-0 w-8">A</span>
                <div>
                  <p className="font-bold text-foreground">Generation</p>
                  <p className="text-on-surface-variant">&quot;A&quot; means first generation of the Neue Klasse. Future generations may use B, C, etc. This replaces the old sequential numbering — the system is now more structured.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono text-lg font-bold text-secondary shrink-0 w-8">5</span>
                <div>
                  <p className="font-bold text-foreground">Body Style</p>
                  <p className="text-on-surface-variant">The digit maps to a body type: <strong className="text-foreground">0</strong> = sedan, <strong className="text-foreground">1</strong> = Touring, <strong className="text-foreground">2</strong> = coup&eacute;, <strong className="text-foreground">3</strong> = convertible, <strong className="text-foreground">5</strong> = SUV (X3-class), <strong className="text-foreground">7</strong> = coup&eacute;-SUV (X4-class), <strong className="text-foreground">8</strong> = long-wheelbase sedan.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick reference table */}
          <div>
            <h3 className="font-[family-name:var(--font-display)] font-bold italic text-lg text-foreground mb-4">
              Quick Reference: Number &rarr; Series Mapping
            </h3>
            <p className="text-on-surface-variant text-sm mb-4">
              In the classic E/F/G system, the numbers are <em>not</em> intuitive — they were assigned sequentially as projects started, not by series.
              Here are some key mappings to memorize:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
              {[
                { codes: "E21 → E30 → E36 → E46 → E90 → F30 → G20", series: "3 Series Sedan" },
                { codes: "E12 → E28 → E34 → E39 → E60 → F10 → G30 → G60", series: "5 Series Sedan" },
                { codes: "E23 → E32 → E38 → E65 → F01 → G11 → G70", series: "7 Series" },
                { codes: "E53 → E70 → F15 → G05", series: "X5" },
                { codes: "E83 → F25 → G01 → G45", series: "X3" },
                { codes: "E36/7 → E85 → E89 → G29", series: "Z Roadster" },
                { codes: "E24 → E63 → F13", series: "6 Series Coupé" },
                { codes: "E31 → G15", series: "8 Series Coupé" },
              ].map((item) => (
                <div key={item.series} className="bg-surface-container-high/50 p-3 rounded-lg border border-border">
                  <p className="font-bold text-foreground text-xs mb-1">{item.series}</p>
                  <p className="font-mono text-[10px] text-on-surface-variant leading-relaxed">{item.codes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Codes */}
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

        {/* ──────────────── BMW History Story ──────────────── */}
        <div>
          <span className="font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.3em] text-primary uppercase">
            THE STORY BEHIND THE CODES
          </span>
          <h2 className="font-[family-name:var(--font-display)] font-black italic text-3xl md:text-4xl tracking-tighter text-foreground mt-2">
            60+ YEARS OF BMW CHASSIS CODES
          </h2>
          <p className="text-on-surface-variant max-w-3xl mt-3 leading-relaxed">
            Every BMW ever built carries an internal development code. To
            enthusiasts, these codes aren&apos;t just numbers — they&apos;re
            identity. Here&apos;s how a simple engineering label became the
            language of an entire car culture.
          </p>
        </div>

        {/* Chapter 1: Origins */}
        <div className="space-y-4">
          <h3 className="font-[family-name:var(--font-display)] font-bold italic text-xl text-foreground flex items-center gap-3">
            <span className="font-mono text-xs text-primary-container bg-primary-container/10 px-2 py-1 rounded">
              01
            </span>
            THE BIRTH OF &quot;E&quot; — ENTWICKLUNG
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-on-surface-variant leading-relaxed">
            <div className="space-y-3">
              <p>
                In 1962, BMW was on the verge of bankruptcy. The company had
                luxury sedans nobody wanted and bubble cars they couldn&apos;t
                keep making. Then came the{" "}
                <strong className="text-foreground">BMW 1500</strong> —
                internally designated{" "}
                <strong className="text-foreground">E115</strong>. It was part
                of the <em>Neue Klasse</em> (New Class), a range of sporty
                sedans that quite literally saved the company.
              </p>
              <p>
                The &quot;E&quot; stood for <em>Entwicklung</em> — German for
                &quot;development.&quot; Every new platform at BMW&apos;s FIZ
                (Forschungs- und Innovationszentrum) research center in Munich
                received an E-number during its development phase. The{" "}
                <strong className="text-foreground">E3</strong> was the
                2500/2800 luxury sedan. The{" "}
                <strong className="text-foreground">E9</strong> was the gorgeous
                3.0 CS coup&eacute;. The{" "}
                <strong className="text-foreground">E10</strong> was the
                legendary 2002 — the car that introduced America to BMW.
              </p>
            </div>
            <div className="space-y-3">
              <p>
                As BMW grew, the numbering became systematic. The{" "}
                <strong className="text-foreground">E12</strong> was the first 5
                Series (1972). The{" "}
                <strong className="text-foreground">E21</strong> was the first 3
                Series (1975). The{" "}
                <strong className="text-foreground">E23</strong> was the first 7
                Series (1977). The{" "}
                <strong className="text-foreground">E24</strong> was the first 6
                Series (1976). Each number was sequential — simply the next
                available code in the development queue.
              </p>
              <p>
                Then came the cars that would make these codes famous: the{" "}
                <strong className="text-foreground">E30 3 Series</strong> (1982)
                — the car that defined &quot;the ultimate driving machine.&quot;
                The <strong className="text-foreground">E28 M5</strong> (1985) —
                the world&apos;s fastest production sedan. The{" "}
                <strong className="text-foreground">E31 8 Series</strong> (1989)
                — BMW&apos;s V12 grand tourer. By the late 1980s, enthusiasts
                didn&apos;t say &quot;I drive a 1988 BMW 325is&quot; — they said
                &quot;I drive an E30.&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Chapter 2: Golden Era */}
        <div className="space-y-4">
          <h3 className="font-[family-name:var(--font-display)] font-bold italic text-xl text-foreground flex items-center gap-3">
            <span className="font-mono text-xs text-primary-container bg-primary-container/10 px-2 py-1 rounded">
              02
            </span>
            THE GOLDEN ERA — E36, E46, E39
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-on-surface-variant leading-relaxed">
            <div className="space-y-3">
              <p>
                The 1990s were BMW&apos;s golden age. The{" "}
                <strong className="text-foreground">E36 3 Series</strong> (1990)
                modernized the lineup with a sleeker design and new multi-link
                rear suspension. The{" "}
                <strong className="text-foreground">E36 M3</strong> with the
                S50/S52 engine became the benchmark sports sedan of its era.
              </p>
              <p>
                Then the <strong className="text-foreground">E46</strong>{" "}
                arrived in 1997 — and many enthusiasts still consider it the
                finest 3 Series ever made. The{" "}
                <strong className="text-foreground">E46 M3</strong> with its
                3.2-liter <strong className="text-foreground">S54</strong>{" "}
                inline-6 producing 343 HP remains one of the most celebrated M
                cars in history. The E46 sold over 3.2 million units.
              </p>
            </div>
            <div className="space-y-3">
              <p>
                Meanwhile, the{" "}
                <strong className="text-foreground">E39 5 Series</strong> (1995)
                was rewriting the rules of the executive sedan. The{" "}
                <strong className="text-foreground">E39 M5</strong> — with its
                4.9-liter S62 V8 producing 394 HP — is still called the greatest
                M5 of all time by many. The{" "}
                <strong className="text-foreground">E38 7 Series</strong> became
                a pop culture icon (featured in a certain James Bond film). And
                the <strong className="text-foreground">E34 M5</strong>, the
                last hand-built M5, became an instant collector&apos;s car.
              </p>
              <p>
                It was during this period that body variant codes proliferated.
                The <strong className="text-foreground">E36/2</strong> was the
                coup&eacute;. The{" "}
                <strong className="text-foreground">E36/3</strong> was the
                Touring wagon. The{" "}
                <strong className="text-foreground">E36/5</strong> was the
                Compact. The <strong className="text-foreground">E36/7</strong>?
                That was the Z3 roadster. Each slash-variant identified a
                different body built on the same platform.
              </p>
            </div>
          </div>
        </div>

        {/* Chapter 3: M Division */}
        <div className="space-y-4">
          <h3 className="font-[family-name:var(--font-display)] font-bold italic text-xl text-foreground flex items-center gap-3">
            <span className="font-mono text-xs text-primary-container bg-primary-container/10 px-2 py-1 rounded">
              03
            </span>
            THE M DIVISION — ENGINEERING EXCESS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-on-surface-variant leading-relaxed">
            <div className="space-y-3">
              <p>
                BMW M GmbH — the motorsport division — takes a standard platform
                and transforms it. Each M car gets its own chassis code, its own
                engine code, and a completely different character. The{" "}
                <strong className="text-foreground">E30 M3</strong> (1986) had
                the S14 four-cylinder — a homologation special for Group A
                touring car racing. Only 17,970 were ever made.
              </p>
              <p>
                The <strong className="text-foreground">E90 M3</strong> (2007)
                broke tradition with a V8 — the legendary S65 4.0-liter
                producing 414 HP and revving to 8,300 RPM. The{" "}
                <strong className="text-foreground">E60 M5</strong> went even
                further with the S85 V10 — a 507 HP engine derived from Formula
                1 technology. It could rev to 8,250 RPM and remains the only
                V10-powered M car.
              </p>
            </div>
            <div className="space-y-3">
              <p>
                The modern era brought the{" "}
                <strong className="text-foreground">F80 M3</strong> and{" "}
                <strong className="text-foreground">F82 M4</strong> (2014) — the
                first turbocharged M3/M4 with the S55 twin-turbo inline-6
                producing 425 HP. The{" "}
                <strong className="text-foreground">F87 M2</strong> (2016)
                became an instant cult classic — a compact, rear-wheel-drive
                coupe that many called the spiritual successor to the E30 M3.
              </p>
              <p>
                Today&apos;s <strong className="text-foreground">G80 M3</strong>{" "}
                and <strong className="text-foreground">G82 M4</strong> with the
                S58 engine produce up to 503 HP in Competition spec. The{" "}
                <strong className="text-foreground">G87 M2</strong> delivers 453
                HP. The <strong className="text-foreground">G90 M5</strong>{" "}
                (2024) is BMW&apos;s first hybrid M5 — combining a twin-turbo V8
                with an electric motor for 717 HP. And waiting in the wings: the{" "}
                <strong className="text-foreground">ZA0</strong> — the fully
                electric M3 on the Neue Klasse platform, rumored at 800+ HP with
                quad motors.
              </p>
            </div>
          </div>
        </div>

        {/* Chapter 4: F, G, U, and the Modern Era */}
        <div className="space-y-4">
          <h3 className="font-[family-name:var(--font-display)] font-bold italic text-xl text-foreground flex items-center gap-3">
            <span className="font-mono text-xs text-primary-container bg-primary-container/10 px-2 py-1 rounded">
              04
            </span>
            F, G, U — THE MODERN ERA
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-on-surface-variant leading-relaxed">
            <div className="space-y-3">
              <p>
                By 2010, BMW had exhausted many E-numbers. The transition to
                &quot;F&quot; wasn&apos;t dramatic — it was simply the next
                letter. The{" "}
                <strong className="text-foreground">F10 5 Series</strong> (2010)
                and <strong className="text-foreground">F30 3 Series</strong>{" "}
                (2011) ushered in the turbo era. The &quot;F&quot; generation
                also brought BMW into the SUV age full force: the{" "}
                <strong className="text-foreground">F15 X5</strong>,{" "}
                <strong className="text-foreground">F16 X6</strong>,
                <strong className="text-foreground">F25 X3</strong>,{" "}
                <strong className="text-foreground">F48 X1</strong>.
              </p>
              <p>
                &quot;G&quot; followed around 2017, built on BMW&apos;s CLAR
                (Cluster Architecture) platform. The
                <strong className="text-foreground">G20 3 Series</strong>,{" "}
                <strong className="text-foreground">G05 X5</strong>,
                <strong className="text-foreground">G70 7 Series</strong> with
                its controversial split headlights. The &quot;G&quot; era also
                brought the{" "}
                <strong className="text-foreground">
                  G42 2 Series Coup&eacute;
                </strong>{" "}
                and the{" "}
                <strong className="text-foreground">G60 5 Series</strong>.
              </p>
            </div>
            <div className="space-y-3">
              <p>
                &quot;U&quot; codes arrived for BMW&apos;s UKL/FAAR
                front-wheel-drive platform compact cars:
                <strong className="text-foreground">U06</strong> (2 Series
                Active Tourer), <strong className="text-foreground">U10</strong>{" "}
                (X2),
                <strong className="text-foreground">U11</strong> (X1). And
                &quot;I&quot; was reserved for the electric i sub-brand:
                <strong className="text-foreground">I01</strong> (i3),{" "}
                <strong className="text-foreground">I12</strong> (i8),
                <strong className="text-foreground">I20</strong> (iX).
              </p>
              <p>
                Then there are the{" "}
                <strong className="text-foreground">LCI</strong> facelifts —{" "}
                <em>Life Cycle Impulse</em> — BMW&apos;s term for mid-cycle
                updates. A typical BMW model runs 7 years; the LCI at year 3-4
                brings updated headlights, taillights, bumpers, and sometimes
                new engines. Telling an{" "}
                <strong className="text-foreground">E90</strong> from an
                <strong className="text-foreground">E90 LCI</strong>, or an{" "}
                <strong className="text-foreground">F30</strong> from an
                <strong className="text-foreground">F30 LCI</strong> —
                that&apos;s where this quiz separates the casual fans from the
                true enthusiasts.
              </p>
            </div>
          </div>
        </div>

        {/* Chapter 5: Neue Klasse */}
        <div className="space-y-4">
          <h3 className="font-[family-name:var(--font-display)] font-bold italic text-xl text-foreground flex items-center gap-3">
            <span className="font-mono text-xs text-primary-container bg-primary-container/10 px-2 py-1 rounded">
              05
            </span>
            NA — THE NEUE KLASSE REVOLUTION
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-on-surface-variant leading-relaxed">
            <div className="space-y-3">
              <p>
                In 2025, BMW broke with 60 years of tradition. The new
                all-electric Neue Klasse platform introduced a completely new
                naming scheme: <strong className="text-foreground">NA</strong>.
                The &quot;N&quot; stands for Neue Klasse, &quot;A&quot; for the
                first generation, and the digit identifies the body style. M
                variants swap &quot;N&quot; for &quot;Z&quot; — so the electric
                M3 becomes <strong className="text-foreground">ZA0</strong>.
              </p>
              <p>
                The first Neue Klasse vehicle — the{" "}
                <strong className="text-foreground">NA5 iX3</strong> — entered
                production in October 2025 at BMW&apos;s new plant in Debrecen,
                Hungary. It features 800V architecture, a completely new
                cylindrical battery cell design developed with Samsung SDI, up
                to 805 km WLTP range, and the ability to charge 372 km of range
                in just 10 minutes.
              </p>
            </div>
            <div className="space-y-3">
              <p>
                The <strong className="text-foreground">NA0 i3 sedan</strong>{" "}
                follows in July 2026, built at BMW&apos;s historic Munich plant
                — the same factory that has produced BMWs since 1922. The NA0
                features up to 108 kWh of battery capacity and approximately 900
                km of WLTP range. Other confirmed codes include{" "}
                <strong className="text-foreground">NA1</strong> (i3 Touring),
                <strong className="text-foreground">NA6</strong> (iX3 Long
                Wheelbase for China),
                <strong className="text-foreground">NA7</strong> (iX4), and{" "}
                <strong className="text-foreground">NA8</strong> (i3 Long
                Wheelbase sedan).
              </p>
              <p>
                The M Division is already preparing:{" "}
                <strong className="text-foreground">ZA0</strong> (electric M3,
                quad-motor, ~800+ HP),
                <strong className="text-foreground">ZA1</strong> (electric M3
                Touring), and <strong className="text-foreground">ZA5</strong>{" "}
                (electric X3 M). After 60 years of E, F, G, U, and I — the NA
                era has begun. And this quiz covers it all.
              </p>
            </div>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="space-y-3">
            <h3 className="font-[family-name:var(--font-display)] font-bold italic text-lg text-foreground">
              Every Series &amp; Generation
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              1 Series through 8 Series. X1 through X7. Z3, Z4. BMW i3, i4, i8,
              iX, iX3. The Isetta, 2002, and E9 3.0 CS. From 1955 to 2025 —
              every era of BMW represented.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-[family-name:var(--font-display)] font-bold italic text-lg text-foreground">
              M Cars &amp; Body Variants
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Every M3 from E30 to G80. Every M5 from E28 to G90. M2, M4, M6,
              M8, X5 M, X6 M, the 1M Coup&eacute;. Plus Touring wagons, Cabrios,
              Compacts, Gran Coup&eacute;s, and Gran Turismos.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-[family-name:var(--font-display)] font-bold italic text-lg text-foreground">
              LCI Facelifts &amp; Deep Cuts
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              The exhaustive difficulty adds 16 LCI variants across the 1, 3, 4,
              5, 7 Series and X models. Long-wheelbase 7 Series (E66, F02, G12).
              The X3 M F97 and X4 M F98. Pure enthusiast territory.
            </p>
          </div>
        </div>
        {/* ──────────────── Complete Series Guide ──────────────── */}
        <div className="pt-8">
          <span className="font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.3em] text-primary uppercase">
            COMPLETE SERIES DATABASE
          </span>
          <h2 className="font-[family-name:var(--font-display)] font-black italic text-3xl md:text-4xl tracking-tighter text-foreground mt-2">
            EVERY BMW SERIES — EVERY GENERATION
          </h2>
          <p className="text-on-surface-variant max-w-3xl mt-3 leading-relaxed">
            This quiz covers every numbered BMW series, every SUV, every roadster, and every electric model.
            Here&apos;s a complete breakdown of what&apos;s inside.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-on-surface-variant leading-relaxed">
          <div className="bg-surface-container-low p-5 rounded-lg border border-border space-y-2">
            <h3 className="font-[family-name:var(--font-display)] font-bold italic text-base text-foreground">BMW 1 Series</h3>
            <p>Four generations: <strong className="text-foreground">E81/E87</strong> (2004), <strong className="text-foreground">F20</strong> (2011), <strong className="text-foreground">F40</strong> (2019). Plus the <strong className="text-foreground">E82</strong> Coup&eacute;, <strong className="text-foreground">E88</strong> Convertible, and the legendary <strong className="text-foreground">E82 1M</strong> Coup&eacute; — only 6,309 ever made.</p>
          </div>
          <div className="bg-surface-container-low p-5 rounded-lg border border-border space-y-2">
            <h3 className="font-[family-name:var(--font-display)] font-bold italic text-base text-foreground">BMW 2 Series</h3>
            <p>Coup&eacute; (<strong className="text-foreground">F22</strong>, <strong className="text-foreground">G42</strong>), Gran Coup&eacute; (<strong className="text-foreground">F44</strong>), Active Tourer (<strong className="text-foreground">F45</strong>, <strong className="text-foreground">U06</strong>), Gran Tourer (<strong className="text-foreground">F46</strong>), and Convertible (<strong className="text-foreground">F23</strong>). The M variants: <strong className="text-foreground">F87 M2</strong> and <strong className="text-foreground">G87 M2</strong>.</p>
          </div>
          <div className="bg-surface-container-low p-5 rounded-lg border border-border space-y-2">
            <h3 className="font-[family-name:var(--font-display)] font-bold italic text-base text-foreground">BMW 3 Series</h3>
            <p>The heart of BMW. Seven generations: <strong className="text-foreground">E21</strong> &rarr; <strong className="text-foreground">E30</strong> &rarr; <strong className="text-foreground">E36</strong> &rarr; <strong className="text-foreground">E46</strong> &rarr; <strong className="text-foreground">E90</strong> &rarr; <strong className="text-foreground">F30</strong> &rarr; <strong className="text-foreground">G20</strong>. Plus every Touring, Coup&eacute;, Convertible, Compact, and Gran Turismo variant. The Neue Klasse <strong className="text-foreground">NA0</strong> electric successor arrives in 2026.</p>
          </div>
          <div className="bg-surface-container-low p-5 rounded-lg border border-border space-y-2">
            <h3 className="font-[family-name:var(--font-display)] font-bold italic text-base text-foreground">BMW 4 Series</h3>
            <p>Born from the 3 Series Coup&eacute; in 2013. Coup&eacute; (<strong className="text-foreground">F32</strong>, <strong className="text-foreground">G22</strong>), Convertible (<strong className="text-foreground">F33</strong>, <strong className="text-foreground">G23</strong>), Gran Coup&eacute; (<strong className="text-foreground">F36</strong>, <strong className="text-foreground">G26</strong>). The <strong className="text-foreground">G22</strong> introduced the controversial large kidney grille design.</p>
          </div>
          <div className="bg-surface-container-low p-5 rounded-lg border border-border space-y-2">
            <h3 className="font-[family-name:var(--font-display)] font-bold italic text-base text-foreground">BMW 5 Series</h3>
            <p>Seven generations of executive sedan: <strong className="text-foreground">E12</strong> &rarr; <strong className="text-foreground">E28</strong> &rarr; <strong className="text-foreground">E34</strong> &rarr; <strong className="text-foreground">E39</strong> &rarr; <strong className="text-foreground">E60</strong> &rarr; <strong className="text-foreground">F10</strong> &rarr; <strong className="text-foreground">G30</strong> &rarr; <strong className="text-foreground">G60</strong>. Plus Touring (<strong className="text-foreground">E61</strong>, <strong className="text-foreground">F11</strong>, <strong className="text-foreground">G31</strong>, <strong className="text-foreground">G61</strong>) and Gran Turismo (<strong className="text-foreground">F07</strong>) variants.</p>
          </div>
          <div className="bg-surface-container-low p-5 rounded-lg border border-border space-y-2">
            <h3 className="font-[family-name:var(--font-display)] font-bold italic text-base text-foreground">BMW 6 &amp; 7 &amp; 8 Series</h3>
            <p>6 Series: <strong className="text-foreground">E24</strong>, <strong className="text-foreground">E63/E64</strong>, <strong className="text-foreground">F06/F12/F13</strong>, <strong className="text-foreground">G32</strong> GT. 7 Series: <strong className="text-foreground">E23</strong> through <strong className="text-foreground">G70</strong> — seven generations of flagship. 8 Series: the iconic <strong className="text-foreground">E31</strong> (1989) and modern <strong className="text-foreground">G14/G15/G16</strong>.</p>
          </div>
          <div className="bg-surface-container-low p-5 rounded-lg border border-border space-y-2">
            <h3 className="font-[family-name:var(--font-display)] font-bold italic text-base text-foreground">BMW X Models (SUVs)</h3>
            <p>X1 (<strong className="text-foreground">E84</strong>, <strong className="text-foreground">F48</strong>, <strong className="text-foreground">U11</strong>), X2 (<strong className="text-foreground">F39</strong>, <strong className="text-foreground">U10</strong>), X3 (<strong className="text-foreground">E83</strong> to <strong className="text-foreground">G45</strong>), X4 (<strong className="text-foreground">F26</strong>, <strong className="text-foreground">G02</strong>), X5 (<strong className="text-foreground">E53</strong> to <strong className="text-foreground">G05</strong>), X6 (<strong className="text-foreground">E71</strong> to <strong className="text-foreground">G06</strong>), X7 (<strong className="text-foreground">G07</strong>). Plus M variants: <strong className="text-foreground">F85</strong>, <strong className="text-foreground">F95</strong>, <strong className="text-foreground">F86</strong>, <strong className="text-foreground">F96</strong>, <strong className="text-foreground">F97</strong>, <strong className="text-foreground">F98</strong>.</p>
          </div>
          <div className="bg-surface-container-low p-5 rounded-lg border border-border space-y-2">
            <h3 className="font-[family-name:var(--font-display)] font-bold italic text-base text-foreground">BMW Z Roadsters</h3>
            <p><strong className="text-foreground">Z1</strong> (1989 — sliding doors), <strong className="text-foreground">E36/7 Z3</strong> (Bond car), <strong className="text-foreground">E85 Z4</strong>, <strong className="text-foreground">E89 Z4</strong> (retractable hardtop), <strong className="text-foreground">G29 Z4</strong> (Supra platform). Plus the <strong className="text-foreground">E52 Z8</strong> — Steve Jobs&apos; favorite car and a future classic.</p>
          </div>
          <div className="bg-surface-container-low p-5 rounded-lg border border-border space-y-2">
            <h3 className="font-[family-name:var(--font-display)] font-bold italic text-base text-foreground">BMW i &amp; Neue Klasse</h3>
            <p><strong className="text-foreground">I01 i3</strong> (2013 — carbon fiber city car), <strong className="text-foreground">I12 i8</strong> (hybrid supercar), <strong className="text-foreground">G26 i4</strong>, <strong className="text-foreground">I20 iX</strong>, <strong className="text-foreground">G08 iX3</strong>. The Neue Klasse: <strong className="text-foreground">NA5</strong> iX3 (in production), <strong className="text-foreground">NA0</strong> i3 sedan (2026), plus upcoming <strong className="text-foreground">NA1</strong>, <strong className="text-foreground">NA7</strong>, <strong className="text-foreground">ZA0</strong>, <strong className="text-foreground">ZA5</strong>.</p>
          </div>
        </div>

        {/* ──────────────── FAQ Section ──────────────── */}
        <div className="pt-8">
          <span className="font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.3em] text-primary uppercase">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-[family-name:var(--font-display)] font-black italic text-3xl md:text-4xl tracking-tighter text-foreground mt-2">
            BMW CHASSIS CODE FAQ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-bold text-foreground">What does the &quot;E&quot; stand for in BMW chassis codes?</h3>
            <p className="text-on-surface-variant">&quot;E&quot; stands for <em>Entwicklung</em>, the German word for &quot;development.&quot; It was used as a prefix for BMW&apos;s internal chassis codes from the 1960s until around 2012. For example, <strong className="text-foreground">E30</strong> is the second-generation 3 Series (1982–1994), <strong className="text-foreground">E46</strong> is the fourth generation (1997–2006), and <strong className="text-foreground">E39</strong> is the fourth-generation 5 Series (1995–2003).</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-foreground">Why did BMW switch from E to F to G codes?</h3>
            <p className="text-on-surface-variant">BMW ran through E-numbers over 50 years. The switch to &quot;F&quot; around 2010 and &quot;G&quot; around 2017 was simply the next available letters. There&apos;s no specific meaning — unlike &quot;E&quot; for Entwicklung, F and G are just sequential identifiers. The latest shift to &quot;NA&quot; for the Neue Klasse (2025+) does carry meaning: &quot;N&quot; for Neue Klasse, &quot;A&quot; for first generation.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-foreground">What does LCI mean on a BMW?</h3>
            <p className="text-on-surface-variant">LCI stands for <em>Life Cycle Impulse</em> — BMW&apos;s term for a mid-cycle facelift. Typically happening 3-4 years into a model&apos;s 7-year lifecycle, an LCI update brings revised headlights, taillights, bumpers, and sometimes new engines. For example, the <strong className="text-foreground">E90 LCI</strong> (2008–2011) updated the E90 3 Series with LED taillights and a refreshed interior.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-foreground">What is BMW&apos;s Neue Klasse?</h3>
            <p className="text-on-surface-variant">Neue Klasse (&quot;New Class&quot;) is BMW&apos;s next-generation electric vehicle platform, launching in 2025. It uses &quot;NA&quot; chassis codes and features 800V architecture, new cylindrical battery cells, and a radical design language. The first model is the <strong className="text-foreground">NA5 iX3</strong>, followed by the <strong className="text-foreground">NA0 i3</strong> sedan. The name is a nod to the original 1962 Neue Klasse sedans that saved BMW from bankruptcy.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-foreground">What&apos;s the difference between an E46 and an F30?</h3>
            <p className="text-on-surface-variant">Both are BMW 3 Series sedans but from different generations. The <strong className="text-foreground">E46</strong> (1997–2006) is the fourth generation — known for its naturally aspirated engines and pure driving feel. The <strong className="text-foreground">F30</strong> (2011–2019) is the sixth generation — turbocharged, more technology-focused, and larger. They look completely different and share no body panels or engines.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-foreground">What are ZA codes in BMW?</h3>
            <p className="text-on-surface-variant">ZA codes are the M performance variants of BMW&apos;s Neue Klasse platform. The &quot;Z&quot; replaces &quot;N&quot; for M Division models: <strong className="text-foreground">ZA0</strong> is the electric M3, <strong className="text-foreground">ZA1</strong> is the electric M3 Touring, <strong className="text-foreground">ZA5</strong> is the electric X3 M. These are expected from 2027 onwards with quad-motor setups producing 800+ HP.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-foreground">Why do BMW enthusiasts use chassis codes instead of model names?</h3>
            <p className="text-on-surface-variant">Because model names repeat across generations. &quot;BMW 3 Series&quot; could mean any car from 1975 to today. But &quot;E30&quot; means exactly one generation (1982–1994). Chassis codes are precise, unambiguous, and efficient. Saying &quot;E46 M3&quot; instantly tells any BMW fan the exact car — no year range needed.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-foreground">Is this quiz free? Do I need to sign up?</h3>
            <p className="text-on-surface-variant">Yes, completely free. No signup, no account, no email required. Just pick your difficulty level, choose a game mode, and start testing your knowledge. Your scores are saved locally in your browser. This is an independent fan project — not affiliated with BMW AG.</p>
          </div>
        </div>

        {/* ──────────────── Glossary ──────────────── */}
        <div className="pt-8">
          <span className="font-[family-name:var(--font-label-font)] text-[10px] tracking-[0.3em] text-primary uppercase">
            REFERENCE GLOSSARY
          </span>
          <h2 className="font-[family-name:var(--font-display)] font-black italic text-3xl md:text-4xl tracking-tighter text-foreground mt-2">
            BMW TERMINOLOGY DECODED
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          {[
            { term: "Entwicklung (E)", def: "German for \"development\" — the original prefix for BMW chassis codes from the 1960s to ~2012." },
            { term: "CLAR Platform", def: "Cluster Architecture — BMW's modular platform underpinning F and G generation models since 2015." },
            { term: "Neue Klasse (NA)", def: "\"New Class\" — BMW's next-gen electric platform (2025+) with 800V architecture and NA/ZA chassis codes." },
            { term: "LCI", def: "Life Cycle Impulse — BMW's term for mid-cycle facelifts, typically 3-4 years into a model's production run." },
            { term: "SAV / SAC", def: "Sports Activity Vehicle / Sports Activity Coupé — BMW's terms for SUVs (X5, X3) and coupe-SUVs (X4, X6)." },
            { term: "Touring", def: "BMW's name for station wagon / estate body style. Available for the 3 and 5 Series across multiple generations." },
            { term: "Gran Coupé", def: "Four-door coupé body style with a fastback roofline. Used for 2, 4, and 8 Series variants." },
            { term: "Gran Turismo (GT)", def: "Raised hatchback variant with more interior space. Used for the 3 Series (F34) and 6 Series (G32)." },
            { term: "BMW M GmbH", def: "BMW's motorsport and performance division, responsible for all M cars. Founded 1972 as BMW Motorsport GmbH." },
            { term: "Hofmeister Kink", def: "The signature reverse-direction bend at the base of the C-pillar window, present on every BMW since the 1960s Neue Klasse." },
            { term: "Kidney Grille", def: "BMW's signature twin-nostril front grille design, a defining visual element since the 1933 BMW 303." },
            { term: "xDrive", def: "BMW's intelligent all-wheel-drive system, available across most modern models since the E53 X5 (1999)." },
          ].map((item) => (
            <div key={item.term} className="bg-surface-container-low/50 p-4 rounded-lg border border-border">
              <dt className="font-mono text-xs font-bold text-primary mb-1">{item.term}</dt>
              <dd className="text-on-surface-variant text-xs leading-relaxed">{item.def}</dd>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
