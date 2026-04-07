<div align="center">

# BMW Code Quiz

**Test your knowledge of BMW's internal chassis codes**

From the classic E30 to the latest G87 — how well do you really know your BMWs?

> **Disclaimer:** This is an independent fan project for educational purposes. It is **not affiliated with, endorsed by, or sponsored by BMW AG** or any of its subsidiaries. BMW, the BMW logo, M, and all model names are registered trademarks of BMW AG.

<br />

<table>
<tr>
<td><strong>156</strong><br/>Vehicles</td>
<td><strong>3</strong><br/>Difficulty Levels</td>
<td><strong>2</strong><br/>Game Modes</td>
<td><strong>&infin;</strong><br/>Replayability</td>
</tr>
</table>

<br />

[Getting Started](#-getting-started) · [How It Works](#-how-it-works) · [Game Modes](#-game-modes) · [Tech Stack](#-tech-stack) · [Project Structure](#-project-structure)

</div>

<br />

---

<br />

## About

BMW Code Quiz is an interactive web application that challenges players to identify BMW vehicles by their internal development codes (Entwicklungscodes). Every BMW model is assigned an internal chassis code during development — **E** (Entwicklung), **F**, **G**, **U**, or **I** — followed by a number. These codes are how BMW engineers, enthusiasts, and the automotive industry refer to specific generations.

The quiz shows you a BMW model with photos and its official name, and you pick the correct internal code from four options. After each answer, you get a brief explanation of what the code means and where it fits in BMW's lineage.

<br />

## Features

<table>
<tr>
<td width="50%">

### Quiz Engine
- **156 vehicles** across all BMW series, M cars, X models, Z roadsters, i electric vehicles, and classics
- **Multi-angle images** — front, side, and rear views sourced from Wikimedia Commons
- **Smart shuffling** — randomized question order with no repeats until the full pool is exhausted
- **Real-time feedback** — correct/wrong indication with a 4-second explanation window
- **Image preloading** — next question's images load in the background during feedback for seamless transitions

</td>
<td width="50%">

### Experience
- **Three difficulty tiers** — Core (57 cars), Comprehensive (99 cars), Exhaustive (156 cars)
- **Two game modes** — fixed rounds (10 or 20 questions) or endless mode with streak tracking
- **Dark & light themes** — toggle between themes with automatic persistence
- **Local leaderboard** — top 10 scores per difficulty saved to localStorage
- **Code explanations** — learn what E, F, G, U, I prefixes mean, what LCI stands for, and more

</td>
</tr>
</table>

<br />

## How It Works

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Landing     │────▶│  Quiz       │────▶│  Results    │────▶│ Leaderboard │
│  Page        │     │  Page       │     │  Page       │     │  Page       │
│              │     │             │     │             │     │             │
│ • Difficulty │     │ • Car image │     │ • Score     │     │ • Top 10    │
│ • Game mode  │     │ • 4 options │     │ • Streak    │     │ • Per       │
│ • Round size │     │ • Feedback  │     │ • Save name │     │   difficulty│
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

### Quiz Flow

1. **Configure** — Choose difficulty, game mode, and round size on the landing page
2. **Play** — Each question shows a BMW model with up to 3 photo angles. Pick the correct chassis code from 4 options
3. **Learn** — After answering, a 4-second feedback panel explains the code's meaning (generation prefix, LCI facelifts, M variants, series designations)
4. **Transition** — Images for the next question preload during feedback. The UI fades out, swaps content once images are ready, then fades back in
5. **Finish** — In rounds mode, the quiz ends after your chosen number of questions. In endless mode, play until you quit
6. **Compete** — If your score qualifies for the top 10, enter your name for the leaderboard

<br />

## Difficulty Levels

| Level | Cars | Description |
|:------|:----:|:------------|
| **Core** | 57 | The essentials — well-known production models across all major series (1–8, X1–X7, Z3/Z4) |
| **Comprehensive** | 99 | Core + classics (2002, Isetta, Z1, Z8, E9), all M cars (M2–M8, X5 M, X6 M), i Series, body variants (Active Tourer, Gran Coupé), and the new X3 G45 |
| **Exhaustive** | 156 | Everything — adds Touring/Coupé/Convertible/Compact sub-variants, Gran Turismo models, LCI facelifts for major series, long-wheelbase 7 Series, and X Series M variants |

<br />

## Game Modes

<table>
<tr>
<td width="50%">

### Rounds Mode
Play a fixed set of **10 or 20 questions**. Your final score and percentage are shown at the end. Best for quick sessions and comparing scores on the leaderboard.

</td>
<td width="50%">

### Endless Mode
Keep playing until you decide to stop. Tracks your **current streak** and **best streak** — how many correct answers in a row. Best for learning and pushing your limits.

</td>
</tr>
</table>

<br />

## Code Explanation System

After each answer, the quiz explains the chassis code:

| Prefix | Meaning | Era |
|:------:|:--------|:----|
| **E** | *Entwicklung* (Development) | 1960s – ~2012 |
| **F** | Next generation series | ~2010 – ~2018 |
| **G** | Current generation | ~2017 – present |
| **U** | UKL/FAAR platform compacts | ~2022 – present |
| **I** | Electric i sub-brand | 2013 – present |

Additional context is provided for:
- **LCI** (*Life Cycle Impulse*) — BMW's term for mid-cycle facelifts
- **M models** — high-performance variants by BMW M GmbH
- **Z** (*Zukunft* = Future) — roadster designations
- **X** — Sports Activity Vehicle (SAV) lineup
- **Touring** — estate/wagon body style
- **Slash notation** (e.g., E36/7) — body style variants within a generation

<br />

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/bmw-interne-namen.git
cd bmw-interne-namen

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

<br />

## Tech Stack

| Layer | Technology |
|:------|:-----------|
| **Framework** | [Next.js 16](https://nextjs.org) with App Router |
| **Language** | TypeScript 5 |
| **UI** | React 19 |
| **Styling** | Tailwind CSS v4 with `oklch()` color space |
| **Components** | [Base UI](https://base-ui.com) primitives + [shadcn/ui](https://ui.shadcn.com) patterns |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Fonts** | Outfit (body), IBM Plex Mono (chassis codes), Helvetica Neue (headings) |
| **State** | React hooks — no external state library |
| **Storage** | `localStorage` for leaderboard and theme preference |
| **Images** | Wikimedia Commons (remote, no bundled assets) |

<br />

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout — fonts, ThemeProvider, M-stripe
│   ├── globals.css         # Design tokens, dark/light themes, animations
│   ├── page.tsx            # Landing page — config & start
│   ├── quiz/page.tsx       # Quiz page — images, answers, feedback
│   ├── results/page.tsx    # Results — score, streak, leaderboard entry
│   └── leaderboard/page.tsx# Leaderboard — top 10 per difficulty
├── components/
│   ├── ThemeProvider.tsx    # Dark/light mode context + localStorage
│   ├── ThemeToggle.tsx     # Sun/moon toggle button
│   ├── DifficultySelector.tsx
│   ├── GameModeSelector.tsx
│   ├── ImageCarousel.tsx   # Multi-angle car image display
│   ├── AnswerGrid.tsx      # 2×2 answer button grid
│   ├── ScoreBar.tsx        # Score, streak, progress indicator
│   ├── LeaderboardTable.tsx
│   └── ui/                 # Base UI primitives (button, card, badge, etc.)
├── data/
│   └── bmw-cars.ts         # 156 BMW entries with codes, years, series, images
└── lib/
    ├── types.ts            # TypeScript types (BmwCar, QuizState, etc.)
    ├── quiz-engine.ts      # Quiz logic — init, shuffle, submit, next
    ├── leaderboard.ts      # localStorage leaderboard CRUD
    └── utils.ts            # cn() class name utility
```

<br />

## Data

All 156 vehicles are defined in `src/data/bmw-cars.ts`. Each entry contains:

```typescript
{
  id: string           // Unique identifier (e.g., "3-e46")
  officialName: string // Display name (e.g., "BMW 3 Series")
  internalCode: string // The chassis code (e.g., "E46")
  difficulty: string   // "core" | "comprehensive" | "exhaustive"
  years: string        // Production years (e.g., "1997–2006")
  series: string       // Series grouping (e.g., "3 Series")
  images: {
    front: string      // Wikimedia Commons thumbnail URL
    side: string
    rear: string
  }
}
```

Images are loaded directly from Wikimedia Commons via their thumbnail API. No images are bundled in the repository.

<br />

## Design

The UI follows a **BMW Motorsport heritage** aesthetic:

- **M-stripe accent** — the iconic blue/indigo/red stripe runs across the top of every page
- **Dark theme default** — deep carbon-tinted backgrounds with BMW Blue (`oklch(0.58 0.16 250)`) as the primary color
- **Light theme** — warm off-white with proper contrast ratios
- **Grain texture** — subtle SVG noise overlay for depth
- **Glass morphism** — frosted glass effect on configuration cards
- **Smooth transitions** — fade-out/fade-in between questions with image preloading
- **Staggered animations** — elements enter with cascading fade-up timing

<br />

## Disclaimer & License

This is an **independent fan project** created for educational and entertainment purposes.

- **Not affiliated with BMW AG** — This project is not endorsed by, directly affiliated with, maintained, authorized, or sponsored by BMW AG or any of its subsidiaries or affiliates.
- **Trademarks** — BMW, the BMW logo, M, and all model names and designations are registered trademarks of BMW AG.
- **Images** — Vehicle photographs are sourced from [Wikimedia Commons](https://commons.wikimedia.org) and used under their respective licenses (primarily CC BY-SA).
- **Code** — The source code of this project is available under the [MIT License](LICENSE).
