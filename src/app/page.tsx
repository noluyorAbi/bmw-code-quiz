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
            <h1 className="font-[family-name:var(--font-display)] font-black italic text-6xl md:text-8xl tracking-tighter text-foreground leading-none">
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
              <span className="block font-[family-name:var(--font-display)] text-3xl font-bold text-foreground tabular-nums italic">
                157 VEHICLES
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
      </section>
    </div>
  );
}
