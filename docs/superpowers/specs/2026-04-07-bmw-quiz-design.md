# BMW Internal Names Quiz — Design Spec

## Overview

A client-side Next.js web app that teaches users BMW internal model codes (chassis codes) through an interactive quiz. Users see car images and the official model name, then guess the correct internal code from 4 multiple-choice options.

## Tech Stack

- **Framework:** Next.js (App Router, latest version)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + DaisyUI v5
- **State:** React state + localStorage for persistence
- **Images:** Wikipedia Commons (direct URLs)
- **Backend:** None — fully client-side

## Pages

### `/` — Home

- App title and BMW-themed branding
- Difficulty selector: Core / Comprehensive / Exhaustive (DaisyUI tabs or cards)
- Game mode selector: Rounds / Endless
- Round size picker (10 or 20) — visible only when Rounds mode selected
- Start button
- Link to leaderboard

### `/quiz` — Quiz Screen

- Image carousel (DaisyUI carousel) showing front, side, and rear views
- Official car name displayed prominently (e.g. "BMW 3 Series Sedan (2019-2025)")
- 4 answer buttons in a 2x2 grid, each showing an internal code (e.g. "G20")
- Immediate feedback on selection: correct (green) / wrong (red) + highlight correct answer
- Score counter in top bar
- Progress bar (rounds mode) or question counter (endless mode)
- Brief pause after answer feedback before auto-advancing to next question

### `/results` — End-of-Round Summary

- Final score: correct / total (e.g. "14/20") with percentage
- Visual feedback (DaisyUI alert or stats) based on performance
- If score qualifies for top 10 leaderboard: name input field
- Play again button (returns to home)
- View leaderboard button

### `/leaderboard` — High Scores

- DaisyUI tabs to filter by difficulty tier (Core / Comprehensive / Exhaustive)
- DaisyUI table showing: rank, name, score, game mode, date
- Top 10 entries per difficulty
- Back to home button

## Components

### `ImageCarousel`

- DaisyUI carousel component
- Displays front, side, and rear images of the current car
- Handles missing images gracefully (skip that slide)
- Responsive sizing

### `AnswerGrid`

- 2x2 grid of DaisyUI buttons
- Each button shows an internal code
- On click: disable all buttons, color correct answer green, color wrong selection red
- Auto-advance after ~1.5s delay

### `ScoreBar`

- Shows current score (correct/total)
- Progress bar for rounds mode (question X of Y)
- Question counter for endless mode
- Streak counter for endless mode (consecutive correct answers)
- Quit button for endless mode

### `DifficultySelector`

- DaisyUI tabs or toggle group
- Three options: Core, Comprehensive, Exhaustive
- Shows approximate question count per tier

### `GameModeSelector`

- Toggle between Rounds and Endless
- Rounds mode shows additional round size picker (10 / 20)

### `LeaderboardTable`

- DaisyUI table component
- Filterable by difficulty tabs
- Sorted by score descending
- Shows rank, name, score, mode, date

## Data Model

### Car Entry (`src/data/bmw-cars.ts`)

```typescript
interface BmwCar {
  id: string;
  officialName: string; // e.g. "BMW 3 Series Sedan"
  internalCode: string; // e.g. "G20"
  difficulty: "core" | "comprehensive" | "exhaustive";
  years: string; // e.g. "2019-2025"
  series: string; // e.g. "3 Series" — used for category filtering
  images: {
    front: string; // Wikipedia Commons URL
    side: string;
    rear: string;
  };
}
```

### Data Scope

- **Core (~70 entries):** 1-8 Series mainline generations, X1-X7 mainline generations, Z3/Z4, key M variants
- **Comprehensive (~120+ entries):** Core + i3/i4/i5/i7/iX, Z1/Z8, older classics (E9, 2002, Isetta lineage), 2 Series Active/Gran Tourer
- **Exhaustive (~200+ entries):** Comprehensive + LCI facelifts, body style sub-variants (sedan/touring/coupe/convertible/gran coupe as separate entries, e.g. E90 Sedan vs E91 Touring vs E92 Coupe vs E93 Convertible)

### Leaderboard Entry (localStorage)

```typescript
interface LeaderboardEntry {
  name: string;
  score: number;
  total: number;
  difficulty: "core" | "comprehensive" | "exhaustive";
  mode: "rounds" | "endless";
  date: string; // ISO date string
}
```

Stored as JSON array under `localStorage` key `bmw-quiz-leaderboard`. Top 10 per difficulty tier.

## Quiz Logic

### Question Generation

1. Filter cars by selected difficulty (inclusive — "comprehensive" includes all "core" cars too)
2. Shuffle the filtered car list
3. For each question:
   - Pick the next car from the shuffled list
   - Select 3 wrong answers randomly from the same filtered pool (different internal codes only)
   - Shuffle the 4 options
4. Rounds mode: stop after N questions
5. Endless mode: reshuffle and continue when pool is exhausted

### Answer Validation

- Compare selected code to correct car's `internalCode`
- Correct: +1 score, increment streak (endless)
- Wrong: reset streak (endless), highlight correct answer
- 1.5s delay then advance to next question

### Difficulty Inclusion

- Core mode → only `difficulty: "core"` cars
- Comprehensive mode → `"core"` + `"comprehensive"` cars
- Exhaustive mode → all cars

## Scoring

- **Rounds mode:** Final score = correct / total. Percentage displayed.
- **Endless mode:** Running correct count + current streak + best streak in session.
- No penalty for wrong answers.

## Leaderboard Logic

- After round ends or user quits endless: check if score qualifies for top 10 in that difficulty
- If yes: prompt for name, save to localStorage
- Leaderboard page: tabs per difficulty, table sorted by score descending
- Ties broken by fewer total questions (better accuracy), then by date (newer first)

## Theme & Styling

- DaisyUI `night` theme as base
- BMW blue (`#0066B1`) as primary color override
- Dark backgrounds, clean typography
- Responsive — works on mobile and desktop
- Minimal animations: button feedback, carousel transitions

## Non-Goals

- No backend / database / authentication
- No multiplayer
- No timed mode (may add later)
- No image uploads — all images sourced from Wikipedia Commons URLs
