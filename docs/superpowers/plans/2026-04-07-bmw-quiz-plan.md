# BMW Internal Names Quiz — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a client-side Next.js quiz app that teaches BMW internal model codes through image-based multiple choice.

**Architecture:** Next.js App Router with 4 pages (home, quiz, results, leaderboard). All state managed client-side with React hooks and localStorage. Car data lives in a static TypeScript data file. Quiz logic is a pure utility module. DaisyUI v5 provides UI components on a dark BMW-themed base.

**Tech Stack:** Next.js (latest), TypeScript, Tailwind CSS v4, DaisyUI v5

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with DaisyUI theme, BMW branding
│   ├── page.tsx                # Home page — difficulty/mode selection, start
│   ├── quiz/
│   │   └── page.tsx            # Quiz page — images, answers, score
│   ├── results/
│   │   └── page.tsx            # Results page — score summary, name entry
│   └── leaderboard/
│       └── page.tsx            # Leaderboard page — high scores table
├── components/
│   ├── ImageCarousel.tsx       # Front/side/rear image carousel
│   ├── AnswerGrid.tsx          # 2x2 answer buttons with feedback
│   ├── ScoreBar.tsx            # Score display + progress/question counter
│   ├── DifficultySelector.tsx  # Core/Comprehensive/Exhaustive tabs
│   ├── GameModeSelector.tsx    # Rounds/Endless toggle + round size
│   └── LeaderboardTable.tsx    # High scores table with difficulty tabs
├── data/
│   └── bmw-cars.ts             # All ~200 BMW car entries with image URLs
├── lib/
│   ├── quiz-engine.ts          # Question generation, answer validation, shuffling
│   ├── leaderboard.ts          # localStorage read/write/qualify logic
│   └── types.ts                # Shared TypeScript types
└── globals.css                 # Tailwind directives + BMW theme overrides
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /Users/alperen/repos/personalRepos/bmw-interne-namen
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --use-npm
```

Select defaults when prompted. This creates the base Next.js project with Tailwind CSS v4.

- [ ] **Step 2: Install DaisyUI v5**

```bash
npm install daisyui@latest
```

- [ ] **Step 3: Configure Tailwind with DaisyUI and BMW theme**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";
@plugin "daisyui" {
  themes: light --default, dark,
    night --prefersdark {
      primary: #0066B1;
      primary-content: #ffffff;
    }
}
```

- [ ] **Step 4: Set up root layout**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BMW Internal Names Quiz",
  description: "Learn BMW chassis codes through an interactive quiz",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="night">
      <body className="min-h-screen bg-base-100">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {children}
        </div>
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Set up placeholder home page**

Replace `src/app/page.tsx` with:

```tsx
export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-primary mb-4">
        BMW Internal Names Quiz
      </h1>
      <p className="text-base-content/70">Coming soon...</p>
    </div>
  );
}
```

- [ ] **Step 6: Verify the app runs**

```bash
npm run dev
```

Open `http://localhost:3000` — should see "BMW Internal Names Quiz" heading with BMW blue color on dark background.

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: scaffold Next.js project with Tailwind CSS and DaisyUI"
```

---

### Task 2: Types & Data — Part 1 (Types + Core Cars)

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/data/bmw-cars.ts` (start with core entries)

- [ ] **Step 1: Create shared types**

Create `src/lib/types.ts`:

```typescript
export type Difficulty = "core" | "comprehensive" | "exhaustive";
export type GameMode = "rounds" | "endless";
export type RoundSize = 10 | 20;

export interface BmwCar {
  id: string;
  officialName: string;
  internalCode: string;
  difficulty: Difficulty;
  years: string;
  series: string;
  images: {
    front: string;
    side: string;
    rear: string;
  };
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  total: number;
  difficulty: Difficulty;
  mode: GameMode;
  date: string;
}

export interface QuizState {
  cars: BmwCar[];
  currentIndex: number;
  score: number;
  streak: number;
  bestStreak: number;
  answers: { carId: string; correct: boolean }[];
  options: string[];
  answered: boolean;
  selectedAnswer: string | null;
}

export interface GameConfig {
  difficulty: Difficulty;
  mode: GameMode;
  roundSize: RoundSize;
}
```

- [ ] **Step 2: Create the BMW car data file with core entries (~70 cars)**

Create `src/data/bmw-cars.ts`. This file will contain all BMW models. Start with the core difficulty tier. Each entry needs Wikipedia Commons image URLs for front, side, and rear views.

```typescript
import { BmwCar } from "@/lib/types";

export const bmwCars: BmwCar[] = [
  // === 1 SERIES ===
  {
    id: "e81",
    officialName: "BMW 1 Series 3-door",
    internalCode: "E81",
    difficulty: "core",
    years: "2004-2012",
    series: "1 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/BMW_E81_front_20081127.jpg/1280px-BMW_E81_front_20081127.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/BMW_1er_%28E81%29_Facelift_20090713_front.jpg/1280px-BMW_1er_%28E81%29_Facelift_20090713_front.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/BMW_E81_rear_20081127.jpg/1280px-BMW_E81_rear_20081127.jpg",
    },
  },
  {
    id: "e87",
    officialName: "BMW 1 Series 5-door",
    internalCode: "E87",
    difficulty: "core",
    years: "2004-2011",
    series: "1 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/BMW_E87_front_20080719.jpg/1280px-BMW_E87_front_20080719.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/BMW_1er_%28E87%29_Facelift_20090713_front.jpg/1280px-BMW_1er_%28E87%29_Facelift_20090713_front.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/BMW_E87_rear_20080719.jpg/1280px-BMW_E87_rear_20080719.jpg",
    },
  },
  {
    id: "f20",
    officialName: "BMW 1 Series 5-door",
    internalCode: "F20",
    difficulty: "core",
    years: "2011-2019",
    series: "1 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/BMW_F20_118i_Sportline_front_20130116.jpg/1280px-BMW_F20_118i_Sportline_front_20130116.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2015_BMW_118i_Sport_1.6_Front.jpg/1280px-2015_BMW_118i_Sport_1.6_Front.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/BMW_F20_118i_Sportline_rear_20130116.jpg/1280px-BMW_F20_118i_Sportline_rear_20130116.jpg",
    },
  },
  {
    id: "f40",
    officialName: "BMW 1 Series",
    internalCode: "F40",
    difficulty: "core",
    years: "2019-2024",
    series: "1 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/BMW_118i_%28F40%29_IMG_2874.jpg/1280px-BMW_118i_%28F40%29_IMG_2874.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/BMW_118i_%28F40%29_IMG_2877.jpg/1280px-BMW_118i_%28F40%29_IMG_2877.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/BMW_118i_%28F40%29_IMG_2878.jpg/1280px-BMW_118i_%28F40%29_IMG_2878.jpg",
    },
  },
  // === 2 SERIES ===
  {
    id: "f22",
    officialName: "BMW 2 Series Coupe",
    internalCode: "F22",
    difficulty: "core",
    years: "2014-2021",
    series: "2 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/2018_BMW_218i_SE_Coupe_1.5_Front.jpg/1280px-2018_BMW_218i_SE_Coupe_1.5_Front.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/2018_BMW_218i_SE_Coupe_1.5_Rear.jpg/1280px-2018_BMW_218i_SE_Coupe_1.5_Rear.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/2018_BMW_218i_SE_Coupe_1.5_Rear.jpg/1280px-2018_BMW_218i_SE_Coupe_1.5_Rear.jpg",
    },
  },
  {
    id: "g42",
    officialName: "BMW 2 Series Coupe",
    internalCode: "G42",
    difficulty: "core",
    years: "2021-present",
    series: "2 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/BMW_220i_Coup%C3%A9_M_Sport_%28G42%29_1X7A6089.jpg/1280px-BMW_220i_Coup%C3%A9_M_Sport_%28G42%29_1X7A6089.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/BMW_220i_Coup%C3%A9_M_Sport_%28G42%29_1X7A6095.jpg/1280px-BMW_220i_Coup%C3%A9_M_Sport_%28G42%29_1X7A6095.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/BMW_220i_Coup%C3%A9_M_Sport_%28G42%29_1X7A6092.jpg/1280px-BMW_220i_Coup%C3%A9_M_Sport_%28G42%29_1X7A6092.jpg",
    },
  },
  // === 3 SERIES ===
  {
    id: "e21",
    officialName: "BMW 3 Series",
    internalCode: "E21",
    difficulty: "core",
    years: "1975-1983",
    series: "3 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/BMW_E21_front_20080331.jpg/1280px-BMW_E21_front_20080331.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/BMW_E21_323i_1.jpg/1280px-BMW_E21_323i_1.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/BMW_E21_rear_20080331.jpg/1280px-BMW_E21_rear_20080331.jpg",
    },
  },
  {
    id: "e30",
    officialName: "BMW 3 Series Sedan",
    internalCode: "E30",
    difficulty: "core",
    years: "1982-1994",
    series: "3 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/BMW_E30_front_20080110.jpg/1280px-BMW_E30_front_20080110.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/BMW_E30_325i_Sedan.jpg/1280px-BMW_E30_325i_Sedan.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/BMW_E30_rear_20081218.jpg/1280px-BMW_E30_rear_20081218.jpg",
    },
  },
  {
    id: "e36",
    officialName: "BMW 3 Series Sedan",
    internalCode: "E36",
    difficulty: "core",
    years: "1990-2000",
    series: "3 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/BMW_E36_front_20080822.jpg/1280px-BMW_E36_front_20080822.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/BMW_328i_%28E36%2C_Lim.%29_%E2%80%93_Frontansicht%2C_17._Juni_2012%2C_D%C3%BCsseldorf.jpg/1280px-BMW_328i_%28E36%2C_Lim.%29_%E2%80%93_Frontansicht%2C_17._Juni_2012%2C_D%C3%BCsseldorf.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/BMW_E36_rear_20080822.jpg/1280px-BMW_E36_rear_20080822.jpg",
    },
  },
  {
    id: "e46",
    officialName: "BMW 3 Series Sedan",
    internalCode: "E46",
    difficulty: "core",
    years: "1997-2006",
    series: "3 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/BMW_E46_front_20080328.jpg/1280px-BMW_E46_front_20080328.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/BMW_E46_sedan.jpg/1280px-BMW_E46_sedan.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/BMW_E46_rear_20080328.jpg/1280px-BMW_E46_rear_20080328.jpg",
    },
  },
  {
    id: "e90",
    officialName: "BMW 3 Series Sedan",
    internalCode: "E90",
    difficulty: "core",
    years: "2004-2013",
    series: "3 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/BMW_E90_front_20080325.jpg/1280px-BMW_E90_front_20080325.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/BMW_E90_320d_rear_20080417.jpg/1280px-BMW_E90_320d_rear_20080417.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/BMW_E90_320d_rear_20080417.jpg/1280px-BMW_E90_320d_rear_20080417.jpg",
    },
  },
  {
    id: "f30",
    officialName: "BMW 3 Series Sedan",
    internalCode: "F30",
    difficulty: "core",
    years: "2011-2019",
    series: "3 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/2018_BMW_320d_xDrive_M_Sport_Shadow_Edition_Automatic_2.0_Front.jpg/1280px-2018_BMW_320d_xDrive_M_Sport_Shadow_Edition_Automatic_2.0_Front.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/BMW_3er_F30_Limousine_Luxury_Line_%28VII%29_%E2%80%93_Frontansicht%2C_24._Juni_2012%2C_D%C3%BCsseldorf.jpg/1280px-BMW_3er_F30_Limousine_Luxury_Line_%28VII%29_%E2%80%93_Frontansicht%2C_24._Juni_2012%2C_D%C3%BCsseldorf.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/2018_BMW_320d_xDrive_M_Sport_Shadow_Edition_Automatic_2.0_Rear.jpg/1280px-2018_BMW_320d_xDrive_M_Sport_Shadow_Edition_Automatic_2.0_Rear.jpg",
    },
  },
  {
    id: "g20",
    officialName: "BMW 3 Series Sedan",
    internalCode: "G20",
    difficulty: "core",
    years: "2019-2025",
    series: "3 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/2019_BMW_320d_M_Sport_2.0_Front.jpg/1280px-2019_BMW_320d_M_Sport_2.0_Front.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/2019_BMW_320d_M_Sport_2.0_Rear.jpg/1280px-2019_BMW_320d_M_Sport_2.0_Rear.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/2019_BMW_320d_M_Sport_2.0_Rear.jpg/1280px-2019_BMW_320d_M_Sport_2.0_Rear.jpg",
    },
  },
  // === 4 SERIES ===
  {
    id: "f32",
    officialName: "BMW 4 Series Coupe",
    internalCode: "F32",
    difficulty: "core",
    years: "2013-2020",
    series: "4 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/BMW_4-Series_Coup%C3%A9_%28F32%29_registered_September_2013_1997cc.jpg/1280px-BMW_4-Series_Coup%C3%A9_%28F32%29_registered_September_2013_1997cc.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/BMW_4-Series_Coup%C3%A9_%28F32%29_registered_September_2013_1997cc.jpg/1280px-BMW_4-Series_Coup%C3%A9_%28F32%29_registered_September_2013_1997cc.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/BMW_4-Series_Coup%C3%A9_%28F32%29_registered_September_2013_1997cc.jpg/1280px-BMW_4-Series_Coup%C3%A9_%28F32%29_registered_September_2013_1997cc.jpg",
    },
  },
  {
    id: "g22",
    officialName: "BMW 4 Series Coupe",
    internalCode: "G22",
    difficulty: "core",
    years: "2020-present",
    series: "4 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/BMW_420i_Coup%C3%A9_M_Sport_%28G22%29_1X7A5998.jpg/1280px-BMW_420i_Coup%C3%A9_M_Sport_%28G22%29_1X7A5998.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/BMW_420i_Coup%C3%A9_M_Sport_%28G22%29_1X7A5998.jpg/1280px-BMW_420i_Coup%C3%A9_M_Sport_%28G22%29_1X7A5998.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/BMW_420i_Coup%C3%A9_M_Sport_%28G22%29_1X7A5998.jpg/1280px-BMW_420i_Coup%C3%A9_M_Sport_%28G22%29_1X7A5998.jpg",
    },
  },
  // === 5 SERIES ===
  {
    id: "e12",
    officialName: "BMW 5 Series",
    internalCode: "E12",
    difficulty: "core",
    years: "1972-1981",
    series: "5 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/BMW_E12_front_20080417.jpg/1280px-BMW_E12_front_20080417.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/BMW_E12_front_20080417.jpg/1280px-BMW_E12_front_20080417.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/BMW_E12_front_20080417.jpg/1280px-BMW_E12_front_20080417.jpg",
    },
  },
  {
    id: "e28",
    officialName: "BMW 5 Series",
    internalCode: "E28",
    difficulty: "core",
    years: "1981-1988",
    series: "5 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/BMW_E28_front_20080417.jpg/1280px-BMW_E28_front_20080417.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/BMW_E28_front_20080417.jpg/1280px-BMW_E28_front_20080417.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/BMW_E28_front_20080417.jpg/1280px-BMW_E28_front_20080417.jpg",
    },
  },
  {
    id: "e34",
    officialName: "BMW 5 Series Sedan",
    internalCode: "E34",
    difficulty: "core",
    years: "1988-1996",
    series: "5 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/BMW_E34_front_20080524.jpg/1280px-BMW_E34_front_20080524.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/BMW_E34_front_20080524.jpg/1280px-BMW_E34_front_20080524.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/BMW_E34_front_20080524.jpg/1280px-BMW_E34_front_20080524.jpg",
    },
  },
  {
    id: "e39",
    officialName: "BMW 5 Series Sedan",
    internalCode: "E39",
    difficulty: "core",
    years: "1995-2004",
    series: "5 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/BMW_E39_front_20080417.jpg/1280px-BMW_E39_front_20080417.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/BMW_E39_front_20080417.jpg/1280px-BMW_E39_front_20080417.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/BMW_E39_front_20080417.jpg/1280px-BMW_E39_front_20080417.jpg",
    },
  },
  {
    id: "e60",
    officialName: "BMW 5 Series Sedan",
    internalCode: "E60",
    difficulty: "core",
    years: "2003-2010",
    series: "5 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/BMW_E60_front_20080417.jpg/1280px-BMW_E60_front_20080417.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/BMW_E60_front_20080417.jpg/1280px-BMW_E60_front_20080417.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/BMW_E60_front_20080417.jpg/1280px-BMW_E60_front_20080417.jpg",
    },
  },
  {
    id: "f10",
    officialName: "BMW 5 Series Sedan",
    internalCode: "F10",
    difficulty: "core",
    years: "2010-2017",
    series: "5 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/BMW_F10_520d_Limousine_front_20100821.jpg/1280px-BMW_F10_520d_Limousine_front_20100821.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/BMW_F10_520d_Limousine_front_20100821.jpg/1280px-BMW_F10_520d_Limousine_front_20100821.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/BMW_F10_520d_Limousine_front_20100821.jpg/1280px-BMW_F10_520d_Limousine_front_20100821.jpg",
    },
  },
  {
    id: "g30",
    officialName: "BMW 5 Series Sedan",
    internalCode: "G30",
    difficulty: "core",
    years: "2017-2023",
    series: "5 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/2018_BMW_520d_SE_Automatic_2.0_Front.jpg/1280px-2018_BMW_520d_SE_Automatic_2.0_Front.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/2018_BMW_520d_SE_Automatic_2.0_Front.jpg/1280px-2018_BMW_520d_SE_Automatic_2.0_Front.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/2018_BMW_520d_SE_Automatic_2.0_Front.jpg/1280px-2018_BMW_520d_SE_Automatic_2.0_Front.jpg",
    },
  },
  {
    id: "g60",
    officialName: "BMW 5 Series Sedan",
    internalCode: "G60",
    difficulty: "core",
    years: "2023-present",
    series: "5 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/BMW_i5_eDrive40_%28G60%29_1X7A5886.jpg/1280px-BMW_i5_eDrive40_%28G60%29_1X7A5886.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/BMW_i5_eDrive40_%28G60%29_1X7A5886.jpg/1280px-BMW_i5_eDrive40_%28G60%29_1X7A5886.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/BMW_i5_eDrive40_%28G60%29_1X7A5886.jpg/1280px-BMW_i5_eDrive40_%28G60%29_1X7A5886.jpg",
    },
  },
  // === 6 SERIES ===
  {
    id: "e24",
    officialName: "BMW 6 Series Coupe",
    internalCode: "E24",
    difficulty: "core",
    years: "1976-1989",
    series: "6 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/BMW_E24_front_20080417.jpg/1280px-BMW_E24_front_20080417.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/BMW_E24_front_20080417.jpg/1280px-BMW_E24_front_20080417.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/BMW_E24_front_20080417.jpg/1280px-BMW_E24_front_20080417.jpg",
    },
  },
  {
    id: "e63",
    officialName: "BMW 6 Series Coupe",
    internalCode: "E63",
    difficulty: "core",
    years: "2003-2010",
    series: "6 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/BMW_E63_front_20080417.jpg/1280px-BMW_E63_front_20080417.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/BMW_E63_front_20080417.jpg/1280px-BMW_E63_front_20080417.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/BMW_E63_front_20080417.jpg/1280px-BMW_E63_front_20080417.jpg",
    },
  },
  {
    id: "f13",
    officialName: "BMW 6 Series Coupe",
    internalCode: "F13",
    difficulty: "core",
    years: "2011-2018",
    series: "6 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/BMW_650i_%28F13%29_%E2%80%93_Frontansicht%2C_17._Juni_2012%2C_D%C3%BCsseldorf.jpg/1280px-BMW_650i_%28F13%29_%E2%80%93_Frontansicht%2C_17._Juni_2012%2C_D%C3%BCsseldorf.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/BMW_650i_%28F13%29_%E2%80%93_Frontansicht%2C_17._Juni_2012%2C_D%C3%BCsseldorf.jpg/1280px-BMW_650i_%28F13%29_%E2%80%93_Frontansicht%2C_17._Juni_2012%2C_D%C3%BCsseldorf.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/BMW_650i_%28F13%29_%E2%80%93_Frontansicht%2C_17._Juni_2012%2C_D%C3%BCsseldorf.jpg/1280px-BMW_650i_%28F13%29_%E2%80%93_Frontansicht%2C_17._Juni_2012%2C_D%C3%BCsseldorf.jpg",
    },
  },
  // === 7 SERIES ===
  {
    id: "e23",
    officialName: "BMW 7 Series",
    internalCode: "E23",
    difficulty: "core",
    years: "1977-1987",
    series: "7 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/BMW_E23_front_20080127.jpg/1280px-BMW_E23_front_20080127.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/BMW_E23_front_20080127.jpg/1280px-BMW_E23_front_20080127.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/BMW_E23_front_20080127.jpg/1280px-BMW_E23_front_20080127.jpg",
    },
  },
  {
    id: "e32",
    officialName: "BMW 7 Series",
    internalCode: "E32",
    difficulty: "core",
    years: "1986-1994",
    series: "7 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/BMW_E32_front_20080623.jpg/1280px-BMW_E32_front_20080623.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/BMW_E32_front_20080623.jpg/1280px-BMW_E32_front_20080623.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/BMW_E32_front_20080623.jpg/1280px-BMW_E32_front_20080623.jpg",
    },
  },
  {
    id: "e38",
    officialName: "BMW 7 Series",
    internalCode: "E38",
    difficulty: "core",
    years: "1994-2001",
    series: "7 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/BMW_E38_front_20080108.jpg/1280px-BMW_E38_front_20080108.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/BMW_E38_front_20080108.jpg/1280px-BMW_E38_front_20080108.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/BMW_E38_front_20080108.jpg/1280px-BMW_E38_front_20080108.jpg",
    },
  },
  {
    id: "e65",
    officialName: "BMW 7 Series",
    internalCode: "E65",
    difficulty: "core",
    years: "2001-2008",
    series: "7 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/BMW_E65_front_20080417.jpg/1280px-BMW_E65_front_20080417.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/BMW_E65_front_20080417.jpg/1280px-BMW_E65_front_20080417.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/BMW_E65_front_20080417.jpg/1280px-BMW_E65_front_20080417.jpg",
    },
  },
  {
    id: "f01",
    officialName: "BMW 7 Series",
    internalCode: "F01",
    difficulty: "core",
    years: "2008-2015",
    series: "7 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/BMW_F01_front_20100403.jpg/1280px-BMW_F01_front_20100403.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/BMW_F01_front_20100403.jpg/1280px-BMW_F01_front_20100403.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/BMW_F01_front_20100403.jpg/1280px-BMW_F01_front_20100403.jpg",
    },
  },
  {
    id: "g11",
    officialName: "BMW 7 Series",
    internalCode: "G11",
    difficulty: "core",
    years: "2015-2022",
    series: "7 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/2016_BMW_730d_Automatic_3.0.jpg/1280px-2016_BMW_730d_Automatic_3.0.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/2016_BMW_730d_Automatic_3.0.jpg/1280px-2016_BMW_730d_Automatic_3.0.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/2016_BMW_730d_Automatic_3.0.jpg/1280px-2016_BMW_730d_Automatic_3.0.jpg",
    },
  },
  {
    id: "g70",
    officialName: "BMW 7 Series",
    internalCode: "G70",
    difficulty: "core",
    years: "2022-present",
    series: "7 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/BMW_i7_xDrive60_%28G70%29_1X7A6159.jpg/1280px-BMW_i7_xDrive60_%28G70%29_1X7A6159.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/BMW_i7_xDrive60_%28G70%29_1X7A6159.jpg/1280px-BMW_i7_xDrive60_%28G70%29_1X7A6159.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/BMW_i7_xDrive60_%28G70%29_1X7A6159.jpg/1280px-BMW_i7_xDrive60_%28G70%29_1X7A6159.jpg",
    },
  },
  // === 8 SERIES ===
  {
    id: "e31",
    officialName: "BMW 8 Series Coupe",
    internalCode: "E31",
    difficulty: "core",
    years: "1990-1999",
    series: "8 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/BMW_840Ci.jpg/1280px-BMW_840Ci.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/BMW_840Ci.jpg/1280px-BMW_840Ci.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/BMW_840Ci.jpg/1280px-BMW_840Ci.jpg",
    },
  },
  {
    id: "g15",
    officialName: "BMW 8 Series Coupe",
    internalCode: "G15",
    difficulty: "core",
    years: "2018-present",
    series: "8 Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/BMW_M850i_xDrive_%28G15%29_IMG_2760.jpg/1280px-BMW_M850i_xDrive_%28G15%29_IMG_2760.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/BMW_M850i_xDrive_%28G15%29_IMG_2760.jpg/1280px-BMW_M850i_xDrive_%28G15%29_IMG_2760.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/BMW_M850i_xDrive_%28G15%29_IMG_2760.jpg/1280px-BMW_M850i_xDrive_%28G15%29_IMG_2760.jpg",
    },
  },
  // === X SERIES ===
  {
    id: "e84",
    officialName: "BMW X1",
    internalCode: "E84",
    difficulty: "core",
    years: "2009-2015",
    series: "X1",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/BMW_X1_xDrive23d_front_20100410.jpg/1280px-BMW_X1_xDrive23d_front_20100410.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/BMW_X1_xDrive23d_front_20100410.jpg/1280px-BMW_X1_xDrive23d_front_20100410.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/BMW_X1_xDrive23d_front_20100410.jpg/1280px-BMW_X1_xDrive23d_front_20100410.jpg",
    },
  },
  {
    id: "f48",
    officialName: "BMW X1",
    internalCode: "F48",
    difficulty: "core",
    years: "2015-2022",
    series: "X1",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/2018_BMW_X1_sDrive18i_SE_1.5_Front.jpg/1280px-2018_BMW_X1_sDrive18i_SE_1.5_Front.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/2018_BMW_X1_sDrive18i_SE_1.5_Front.jpg/1280px-2018_BMW_X1_sDrive18i_SE_1.5_Front.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/2018_BMW_X1_sDrive18i_SE_1.5_Front.jpg/1280px-2018_BMW_X1_sDrive18i_SE_1.5_Front.jpg",
    },
  },
  {
    id: "u11",
    officialName: "BMW X1",
    internalCode: "U11",
    difficulty: "core",
    years: "2022-present",
    series: "X1",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/BMW_X1_xDrive23i_%28U11%29_1X7A5958.jpg/1280px-BMW_X1_xDrive23i_%28U11%29_1X7A5958.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/BMW_X1_xDrive23i_%28U11%29_1X7A5958.jpg/1280px-BMW_X1_xDrive23i_%28U11%29_1X7A5958.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/BMW_X1_xDrive23i_%28U11%29_1X7A5958.jpg/1280px-BMW_X1_xDrive23i_%28U11%29_1X7A5958.jpg",
    },
  },
  {
    id: "e53",
    officialName: "BMW X5",
    internalCode: "E53",
    difficulty: "core",
    years: "1999-2006",
    series: "X5",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/BMW_E53_front_20080524.jpg/1280px-BMW_E53_front_20080524.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/BMW_E53_front_20080524.jpg/1280px-BMW_E53_front_20080524.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/BMW_E53_front_20080524.jpg/1280px-BMW_E53_front_20080524.jpg",
    },
  },
  {
    id: "e70",
    officialName: "BMW X5",
    internalCode: "E70",
    difficulty: "core",
    years: "2006-2013",
    series: "X5",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/BMW_E70_X5_01.jpg/1280px-BMW_E70_X5_01.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/BMW_E70_X5_01.jpg/1280px-BMW_E70_X5_01.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/BMW_E70_X5_01.jpg/1280px-BMW_E70_X5_01.jpg",
    },
  },
  {
    id: "f15",
    officialName: "BMW X5",
    internalCode: "F15",
    difficulty: "core",
    years: "2013-2018",
    series: "X5",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/2018_BMW_X5_xDrive30d_M_Sport_Automatic_3.0_Front.jpg/1280px-2018_BMW_X5_xDrive30d_M_Sport_Automatic_3.0_Front.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/2018_BMW_X5_xDrive30d_M_Sport_Automatic_3.0_Front.jpg/1280px-2018_BMW_X5_xDrive30d_M_Sport_Automatic_3.0_Front.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/2018_BMW_X5_xDrive30d_M_Sport_Automatic_3.0_Front.jpg/1280px-2018_BMW_X5_xDrive30d_M_Sport_Automatic_3.0_Front.jpg",
    },
  },
  {
    id: "g05",
    officialName: "BMW X5",
    internalCode: "G05",
    difficulty: "core",
    years: "2018-present",
    series: "X5",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/2019_BMW_X5_xDrive30d_M_Sport_Automatic_3.0.jpg/1280px-2019_BMW_X5_xDrive30d_M_Sport_Automatic_3.0.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/2019_BMW_X5_xDrive30d_M_Sport_Automatic_3.0.jpg/1280px-2019_BMW_X5_xDrive30d_M_Sport_Automatic_3.0.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/2019_BMW_X5_xDrive30d_M_Sport_Automatic_3.0.jpg/1280px-2019_BMW_X5_xDrive30d_M_Sport_Automatic_3.0.jpg",
    },
  },
  {
    id: "e71",
    officialName: "BMW X6",
    internalCode: "E71",
    difficulty: "core",
    years: "2008-2014",
    series: "X6",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/BMW_X6_xDrive35d_%28E71%29_front_20100928.jpg/1280px-BMW_X6_xDrive35d_%28E71%29_front_20100928.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/BMW_X6_xDrive35d_%28E71%29_front_20100928.jpg/1280px-BMW_X6_xDrive35d_%28E71%29_front_20100928.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/BMW_X6_xDrive35d_%28E71%29_front_20100928.jpg/1280px-BMW_X6_xDrive35d_%28E71%29_front_20100928.jpg",
    },
  },
  {
    id: "e83",
    officialName: "BMW X3",
    internalCode: "E83",
    difficulty: "core",
    years: "2003-2010",
    series: "X3",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/BMW_E83_X3_20090514_front.jpg/1280px-BMW_E83_X3_20090514_front.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/BMW_E83_X3_20090514_front.jpg/1280px-BMW_E83_X3_20090514_front.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/BMW_E83_X3_20090514_front.jpg/1280px-BMW_E83_X3_20090514_front.jpg",
    },
  },
  {
    id: "f25",
    officialName: "BMW X3",
    internalCode: "F25",
    difficulty: "core",
    years: "2010-2017",
    series: "X3",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/BMW_X3_F25_xDrive20d_front_20110928.jpg/1280px-BMW_X3_F25_xDrive20d_front_20110928.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/BMW_X3_F25_xDrive20d_front_20110928.jpg/1280px-BMW_X3_F25_xDrive20d_front_20110928.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/BMW_X3_F25_xDrive20d_front_20110928.jpg/1280px-BMW_X3_F25_xDrive20d_front_20110928.jpg",
    },
  },
  {
    id: "g01",
    officialName: "BMW X3",
    internalCode: "G01",
    difficulty: "core",
    years: "2017-2024",
    series: "X3",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/2018_BMW_X3_xDrive20d_SE_Automatic_2.0_Front.jpg/1280px-2018_BMW_X3_xDrive20d_SE_Automatic_2.0_Front.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/2018_BMW_X3_xDrive20d_SE_Automatic_2.0_Front.jpg/1280px-2018_BMW_X3_xDrive20d_SE_Automatic_2.0_Front.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/2018_BMW_X3_xDrive20d_SE_Automatic_2.0_Front.jpg/1280px-2018_BMW_X3_xDrive20d_SE_Automatic_2.0_Front.jpg",
    },
  },
  // === Z SERIES ===
  {
    id: "e36-7",
    officialName: "BMW Z3",
    internalCode: "E36/7",
    difficulty: "core",
    years: "1996-2002",
    series: "Z Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/BMW_Z3_1.9_Roadster_%28E36-7%29_front.jpg/1280px-BMW_Z3_1.9_Roadster_%28E36-7%29_front.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/BMW_Z3_1.9_Roadster_%28E36-7%29_front.jpg/1280px-BMW_Z3_1.9_Roadster_%28E36-7%29_front.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/BMW_Z3_1.9_Roadster_%28E36-7%29_front.jpg/1280px-BMW_Z3_1.9_Roadster_%28E36-7%29_front.jpg",
    },
  },
  {
    id: "e85",
    officialName: "BMW Z4 Roadster",
    internalCode: "E85",
    difficulty: "core",
    years: "2002-2008",
    series: "Z Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/BMW_Z4_%28E85%29_front_20080723.jpg/1280px-BMW_Z4_%28E85%29_front_20080723.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/BMW_Z4_%28E85%29_front_20080723.jpg/1280px-BMW_Z4_%28E85%29_front_20080723.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/BMW_Z4_%28E85%29_front_20080723.jpg/1280px-BMW_Z4_%28E85%29_front_20080723.jpg",
    },
  },
  {
    id: "e89",
    officialName: "BMW Z4 Roadster",
    internalCode: "E89",
    difficulty: "core",
    years: "2009-2016",
    series: "Z Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/BMW_Z4_sDrive23i_%28E89%29_front_20100411.jpg/1280px-BMW_Z4_sDrive23i_%28E89%29_front_20100411.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/BMW_Z4_sDrive23i_%28E89%29_front_20100411.jpg/1280px-BMW_Z4_sDrive23i_%28E89%29_front_20100411.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/BMW_Z4_sDrive23i_%28E89%29_front_20100411.jpg/1280px-BMW_Z4_sDrive23i_%28E89%29_front_20100411.jpg",
    },
  },
  {
    id: "g29",
    officialName: "BMW Z4 Roadster",
    internalCode: "G29",
    difficulty: "core",
    years: "2018-present",
    series: "Z Series",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/BMW_Z4_M40i_%28G29%29_IMG_2881.jpg/1280px-BMW_Z4_M40i_%28G29%29_IMG_2881.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/BMW_Z4_M40i_%28G29%29_IMG_2881.jpg/1280px-BMW_Z4_M40i_%28G29%29_IMG_2881.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/BMW_Z4_M40i_%28G29%29_IMG_2881.jpg/1280px-BMW_Z4_M40i_%28G29%29_IMG_2881.jpg",
    },
  },
  // === X7 ===
  {
    id: "g07",
    officialName: "BMW X7",
    internalCode: "G07",
    difficulty: "core",
    years: "2019-present",
    series: "X7",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/2019_BMW_X7_xDrive30d_M_Sport_3.0.jpg/1280px-2019_BMW_X7_xDrive30d_M_Sport_3.0.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/2019_BMW_X7_xDrive30d_M_Sport_3.0.jpg/1280px-2019_BMW_X7_xDrive30d_M_Sport_3.0.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/2019_BMW_X7_xDrive30d_M_Sport_3.0.jpg/1280px-2019_BMW_X7_xDrive30d_M_Sport_3.0.jpg",
    },
  },
  // === X4 ===
  {
    id: "f26",
    officialName: "BMW X4",
    internalCode: "F26",
    difficulty: "core",
    years: "2014-2018",
    series: "X4",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/BMW_X4_xDrive35i_%28F26%29_%E2%80%93_Frontansicht%2C_11._August_2014%2C_D%C3%BCsseldorf.jpg/1280px-BMW_X4_xDrive35i_%28F26%29_%E2%80%93_Frontansicht%2C_11._August_2014%2C_D%C3%BCsseldorf.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/BMW_X4_xDrive35i_%28F26%29_%E2%80%93_Frontansicht%2C_11._August_2014%2C_D%C3%BCsseldorf.jpg/1280px-BMW_X4_xDrive35i_%28F26%29_%E2%80%93_Frontansicht%2C_11._August_2014%2C_D%C3%BCsseldorf.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/BMW_X4_xDrive35i_%28F26%29_%E2%80%93_Frontansicht%2C_11._August_2014%2C_D%C3%BCsseldorf.jpg/1280px-BMW_X4_xDrive35i_%28F26%29_%E2%80%93_Frontansicht%2C_11._August_2014%2C_D%C3%BCsseldorf.jpg",
    },
  },
  {
    id: "g02",
    officialName: "BMW X4",
    internalCode: "G02",
    difficulty: "core",
    years: "2018-2025",
    series: "X4",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/2019_BMW_X4_xDrive20d_M_Sport_Automatic_2.0.jpg/1280px-2019_BMW_X4_xDrive20d_M_Sport_Automatic_2.0.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/2019_BMW_X4_xDrive20d_M_Sport_Automatic_2.0.jpg/1280px-2019_BMW_X4_xDrive20d_M_Sport_Automatic_2.0.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/2019_BMW_X4_xDrive20d_M_Sport_Automatic_2.0.jpg/1280px-2019_BMW_X4_xDrive20d_M_Sport_Automatic_2.0.jpg",
    },
  },
  // === X2 ===
  {
    id: "f39",
    officialName: "BMW X2",
    internalCode: "F39",
    difficulty: "core",
    years: "2018-2023",
    series: "X2",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/2018_BMW_X2_xDrive20d_M_Sport_X_Automatic_2.0_Front.jpg/1280px-2018_BMW_X2_xDrive20d_M_Sport_X_Automatic_2.0_Front.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/2018_BMW_X2_xDrive20d_M_Sport_X_Automatic_2.0_Front.jpg/1280px-2018_BMW_X2_xDrive20d_M_Sport_X_Automatic_2.0_Front.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/2018_BMW_X2_xDrive20d_M_Sport_X_Automatic_2.0_Front.jpg/1280px-2018_BMW_X2_xDrive20d_M_Sport_X_Automatic_2.0_Front.jpg",
    },
  },
  {
    id: "f16",
    officialName: "BMW X6",
    internalCode: "F16",
    difficulty: "core",
    years: "2014-2019",
    series: "X6",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/BMW_X6_xDrive50i_%28F16%29_%E2%80%93_Frontansicht%2C_11._August_2014%2C_D%C3%BCsseldorf.jpg/1280px-BMW_X6_xDrive50i_%28F16%29_%E2%80%93_Frontansicht%2C_11._August_2014%2C_D%C3%BCsseldorf.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/BMW_X6_xDrive50i_%28F16%29_%E2%80%93_Frontansicht%2C_11._August_2014%2C_D%C3%BCsseldorf.jpg/1280px-BMW_X6_xDrive50i_%28F16%29_%E2%80%93_Frontansicht%2C_11._August_2014%2C_D%C3%BCsseldorf.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/BMW_X6_xDrive50i_%28F16%29_%E2%80%93_Frontansicht%2C_11._August_2014%2C_D%C3%BCsseldorf.jpg/1280px-BMW_X6_xDrive50i_%28F16%29_%E2%80%93_Frontansicht%2C_11._August_2014%2C_D%C3%BCsseldorf.jpg",
    },
  },
  {
    id: "g06",
    officialName: "BMW X6",
    internalCode: "G06",
    difficulty: "core",
    years: "2019-present",
    series: "X6",
    images: {
      front: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/BMW_X6_xDrive30d_M_Sport_%28G06%29_%E2%80%93_f_30092019.jpg/1280px-BMW_X6_xDrive30d_M_Sport_%28G06%29_%E2%80%93_f_30092019.jpg",
      side: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/BMW_X6_xDrive30d_M_Sport_%28G06%29_%E2%80%93_f_30092019.jpg/1280px-BMW_X6_xDrive30d_M_Sport_%28G06%29_%E2%80%93_f_30092019.jpg",
      rear: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/BMW_X6_xDrive30d_M_Sport_%28G06%29_%E2%80%93_f_30092019.jpg/1280px-BMW_X6_xDrive30d_M_Sport_%28G06%29_%E2%80%93_f_30092019.jpg",
    },
  },
];

// Helper to get cars by difficulty (inclusive)
export function getCarsByDifficulty(difficulty: "core" | "comprehensive" | "exhaustive"): BmwCar[] {
  if (difficulty === "core") return bmwCars.filter((c) => c.difficulty === "core");
  if (difficulty === "comprehensive") return bmwCars.filter((c) => c.difficulty === "core" || c.difficulty === "comprehensive");
  return bmwCars;
}
```

**NOTE TO IMPLEMENTER:** The data file shown above contains ~50 core entries as a starting point. The full file must contain ~200 entries total. During implementation, use web search to find Wikipedia Commons image URLs for each BMW model and expand the file to include:
- All remaining core models (remaining X-series generations, M-car variants)
- Comprehensive tier: i3 (I01), i4 (G26), i5 (G60), i7 (G70), iX (I20), iX1 (U11), Z1 (E30), Z8 (E52), BMW 2002, E9, 2 Series Active Tourer (F45, U06), 2 Series Gran Tourer (F46), 2 Series Gran Coupe (F44)
- Exhaustive tier: All LCI variants, body style sub-variants (E91 Touring, E92 Coupe, E93 Convertible, F31 Touring, F34 GT, F36 Gran Coupe, etc.)

Each entry needs real Wikipedia Commons URLs. Use the same URL pattern: `https://upload.wikimedia.org/wikipedia/commons/thumb/...`

- [ ] **Step 3: Commit**

```bash
git add src/lib/types.ts src/data/bmw-cars.ts
git commit -m "feat: add BMW car types and core data entries with image URLs"
```

---

### Task 3: Quiz Engine

**Files:**
- Create: `src/lib/quiz-engine.ts`

- [ ] **Step 1: Create the quiz engine utility**

Create `src/lib/quiz-engine.ts`:

```typescript
import { BmwCar, QuizState, Difficulty } from "./types";
import { getCarsByDifficulty } from "@/data/bmw-cars";

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function initQuiz(difficulty: Difficulty): QuizState {
  const allCars = getCarsByDifficulty(difficulty);
  const shuffled = shuffle(allCars);
  const options = generateOptions(shuffled[0], allCars);
  return {
    cars: shuffled,
    currentIndex: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    answers: [],
    options,
    answered: false,
    selectedAnswer: null,
  };
}

export function generateOptions(correctCar: BmwCar, pool: BmwCar[]): string[] {
  const wrongCars = pool.filter(
    (c) => c.internalCode !== correctCar.internalCode
  );
  const shuffledWrong = shuffle(wrongCars);
  // Pick 3 unique wrong codes
  const wrongCodes: string[] = [];
  const seen = new Set<string>([correctCar.internalCode]);
  for (const car of shuffledWrong) {
    if (!seen.has(car.internalCode)) {
      wrongCodes.push(car.internalCode);
      seen.add(car.internalCode);
    }
    if (wrongCodes.length === 3) break;
  }
  return shuffle([correctCar.internalCode, ...wrongCodes]);
}

export function submitAnswer(
  state: QuizState,
  answer: string,
  pool: BmwCar[]
): QuizState {
  const currentCar = state.cars[state.currentIndex];
  const isCorrect = answer === currentCar.internalCode;
  const newStreak = isCorrect ? state.streak + 1 : 0;
  return {
    ...state,
    score: isCorrect ? state.score + 1 : state.score,
    streak: newStreak,
    bestStreak: Math.max(state.bestStreak, newStreak),
    answers: [
      ...state.answers,
      { carId: currentCar.id, correct: isCorrect },
    ],
    answered: true,
    selectedAnswer: answer,
  };
}

export function nextQuestion(state: QuizState, pool: BmwCar[]): QuizState {
  let nextIndex = state.currentIndex + 1;
  let cars = state.cars;

  // If we've exhausted the list, reshuffle (for endless mode)
  if (nextIndex >= cars.length) {
    cars = shuffle(pool);
    nextIndex = 0;
  }

  return {
    ...state,
    cars,
    currentIndex: nextIndex,
    options: generateOptions(cars[nextIndex], pool),
    answered: false,
    selectedAnswer: null,
  };
}

export function getCurrentCar(state: QuizState): BmwCar {
  return state.cars[state.currentIndex];
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/quiz-engine.ts
git commit -m "feat: add quiz engine with question generation and answer logic"
```

---

### Task 4: Leaderboard Logic

**Files:**
- Create: `src/lib/leaderboard.ts`

- [ ] **Step 1: Create leaderboard utility**

Create `src/lib/leaderboard.ts`:

```typescript
import { Difficulty, GameMode, LeaderboardEntry } from "./types";

const STORAGE_KEY = "bmw-quiz-leaderboard";
const MAX_ENTRIES_PER_DIFFICULTY = 10;

export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as LeaderboardEntry[];
  } catch {
    return [];
  }
}

export function getLeaderboardByDifficulty(
  difficulty: Difficulty
): LeaderboardEntry[] {
  return getLeaderboard()
    .filter((e) => e.difficulty === difficulty)
    .sort((a, b) => {
      // Sort by score descending
      if (b.score !== a.score) return b.score - a.score;
      // Ties: fewer total questions = better accuracy
      if (a.total !== b.total) return a.total - b.total;
      // Then by date (newer first)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export function qualifiesForLeaderboard(
  score: number,
  difficulty: Difficulty
): boolean {
  const entries = getLeaderboardByDifficulty(difficulty);
  if (entries.length < MAX_ENTRIES_PER_DIFFICULTY) return true;
  return score > entries[entries.length - 1].score;
}

export function addLeaderboardEntry(
  name: string,
  score: number,
  total: number,
  difficulty: Difficulty,
  mode: GameMode
): void {
  const entry: LeaderboardEntry = {
    name,
    score,
    total,
    difficulty,
    mode,
    date: new Date().toISOString(),
  };
  const all = getLeaderboard();
  all.push(entry);

  // Keep only top 10 per difficulty
  const byDifficulty: Record<string, LeaderboardEntry[]> = {};
  for (const e of all) {
    if (!byDifficulty[e.difficulty]) byDifficulty[e.difficulty] = [];
    byDifficulty[e.difficulty].push(e);
  }
  const trimmed: LeaderboardEntry[] = [];
  for (const entries of Object.values(byDifficulty)) {
    entries.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.total !== b.total) return a.total - b.total;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    trimmed.push(...entries.slice(0, MAX_ENTRIES_PER_DIFFICULTY));
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/leaderboard.ts
git commit -m "feat: add leaderboard localStorage logic with top-10 per difficulty"
```

---

### Task 5: Shared Components

**Files:**
- Create: `src/components/ImageCarousel.tsx`
- Create: `src/components/AnswerGrid.tsx`
- Create: `src/components/ScoreBar.tsx`
- Create: `src/components/DifficultySelector.tsx`
- Create: `src/components/GameModeSelector.tsx`

- [ ] **Step 1: Create ImageCarousel component**

Create `src/components/ImageCarousel.tsx`:

```tsx
"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageCarouselProps {
  images: {
    front: string;
    side: string;
    rear: string;
  };
  altText: string;
}

const labels = ["Front", "Side", "Rear"] as const;
const keys = ["front", "side", "rear"] as const;

export default function ImageCarousel({ images, altText }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const validImages = keys.filter((k) => images[k]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-full max-w-2xl aspect-video rounded-xl overflow-hidden bg-base-300">
        {validImages.map((key, i) => (
          <div
            key={key}
            className={`absolute inset-0 transition-opacity duration-300 ${
              i === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={images[key]}
              alt={`${altText} - ${labels[keys.indexOf(key)]}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
              unoptimized
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {validImages.map((key, i) => (
          <button
            key={key}
            className={`btn btn-sm ${
              i === activeIndex ? "btn-primary" : "btn-ghost"
            }`}
            onClick={() => setActiveIndex(i)}
          >
            {labels[keys.indexOf(key)]}
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create AnswerGrid component**

Create `src/components/AnswerGrid.tsx`:

```tsx
"use client";

interface AnswerGridProps {
  options: string[];
  correctAnswer: string;
  answered: boolean;
  selectedAnswer: string | null;
  onAnswer: (answer: string) => void;
}

export default function AnswerGrid({
  options,
  correctAnswer,
  answered,
  selectedAnswer,
  onAnswer,
}: AnswerGridProps) {
  function getButtonClass(option: string): string {
    if (!answered) return "btn btn-outline btn-lg";
    if (option === correctAnswer) return "btn btn-success btn-lg";
    if (option === selectedAnswer && option !== correctAnswer)
      return "btn btn-error btn-lg";
    return "btn btn-outline btn-lg opacity-50";
  }

  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-lg mx-auto">
      {options.map((option) => (
        <button
          key={option}
          className={getButtonClass(option)}
          onClick={() => !answered && onAnswer(option)}
          disabled={answered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create ScoreBar component**

Create `src/components/ScoreBar.tsx`:

```tsx
"use client";

import { GameMode } from "@/lib/types";

interface ScoreBarProps {
  score: number;
  total: number;
  mode: GameMode;
  roundSize?: number;
  streak?: number;
}

export default function ScoreBar({
  score,
  total,
  mode,
  roundSize,
  streak,
}: ScoreBarProps) {
  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto mb-6">
      <div className="flex items-center gap-4">
        <div className="badge badge-primary badge-lg">
          Score: {score}/{total}
        </div>
        {mode === "endless" && streak !== undefined && streak > 0 && (
          <div className="badge badge-secondary badge-lg">
            Streak: {streak}
          </div>
        )}
      </div>
      {mode === "rounds" && roundSize && (
        <div className="flex-1 mx-4">
          <progress
            className="progress progress-primary w-full"
            value={total}
            max={roundSize}
          />
          <p className="text-xs text-center text-base-content/60 mt-1">
            Question {total} of {roundSize}
          </p>
        </div>
      )}
      {mode === "endless" && (
        <p className="text-sm text-base-content/60">Questions: {total}</p>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Create DifficultySelector component**

Create `src/components/DifficultySelector.tsx`:

```tsx
"use client";

import { Difficulty } from "@/lib/types";
import { bmwCars } from "@/data/bmw-cars";

interface DifficultySelectorProps {
  value: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

const difficulties: { value: Difficulty; label: string; description: string }[] =
  [
    { value: "core", label: "Core", description: "Well-known models" },
    {
      value: "comprehensive",
      label: "Comprehensive",
      description: "Core + classics & rarities",
    },
    {
      value: "exhaustive",
      label: "Exhaustive",
      description: "Every variant & facelift",
    },
  ];

function countCars(difficulty: Difficulty): number {
  if (difficulty === "core")
    return bmwCars.filter((c) => c.difficulty === "core").length;
  if (difficulty === "comprehensive")
    return bmwCars.filter(
      (c) => c.difficulty === "core" || c.difficulty === "comprehensive"
    ).length;
  return bmwCars.length;
}

export default function DifficultySelector({
  value,
  onChange,
}: DifficultySelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Difficulty</h2>
      <div className="flex gap-2">
        {difficulties.map((d) => (
          <button
            key={d.value}
            className={`btn flex-1 ${
              value === d.value ? "btn-primary" : "btn-ghost border-base-300"
            }`}
            onClick={() => onChange(d.value)}
          >
            <div className="flex flex-col items-center">
              <span className="font-bold">{d.label}</span>
              <span className="text-xs opacity-70">
                {countCars(d.value)} cars
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create GameModeSelector component**

Create `src/components/GameModeSelector.tsx`:

```tsx
"use client";

import { GameMode, RoundSize } from "@/lib/types";

interface GameModeSelectorProps {
  mode: GameMode;
  roundSize: RoundSize;
  onModeChange: (mode: GameMode) => void;
  onRoundSizeChange: (size: RoundSize) => void;
}

export default function GameModeSelector({
  mode,
  roundSize,
  onModeChange,
  onRoundSizeChange,
}: GameModeSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Game Mode</h2>
      <div className="flex gap-2">
        <button
          className={`btn flex-1 ${
            mode === "rounds" ? "btn-primary" : "btn-ghost border-base-300"
          }`}
          onClick={() => onModeChange("rounds")}
        >
          Rounds
        </button>
        <button
          className={`btn flex-1 ${
            mode === "endless" ? "btn-primary" : "btn-ghost border-base-300"
          }`}
          onClick={() => onModeChange("endless")}
        >
          Endless
        </button>
      </div>
      {mode === "rounds" && (
        <div className="flex gap-2 mt-1">
          <button
            className={`btn btn-sm flex-1 ${
              roundSize === 10 ? "btn-secondary" : "btn-ghost border-base-300"
            }`}
            onClick={() => onRoundSizeChange(10)}
          >
            10 Questions
          </button>
          <button
            className={`btn btn-sm flex-1 ${
              roundSize === 20 ? "btn-secondary" : "btn-ghost border-base-300"
            }`}
            onClick={() => onRoundSizeChange(20)}
          >
            20 Questions
          </button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/
git commit -m "feat: add shared UI components (carousel, answers, score, selectors)"
```

---

### Task 6: Home Page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Implement the home page**

Replace `src/app/page.tsx` with:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Difficulty, GameMode, RoundSize } from "@/lib/types";
import DifficultySelector from "@/components/DifficultySelector";
import GameModeSelector from "@/components/GameModeSelector";

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
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-primary mb-2">
          BMW Code Quiz
        </h1>
        <p className="text-base-content/70 text-lg">
          How well do you know BMW internal chassis codes?
        </p>
      </div>

      <div className="card bg-base-200 shadow-xl w-full max-w-md">
        <div className="card-body gap-6">
          <DifficultySelector value={difficulty} onChange={setDifficulty} />
          <GameModeSelector
            mode={mode}
            roundSize={roundSize}
            onModeChange={setMode}
            onRoundSizeChange={setRoundSize}
          />
          <button className="btn btn-primary btn-lg w-full" onClick={startGame}>
            Start Quiz
          </button>
        </div>
      </div>

      <button
        className="btn btn-ghost btn-sm"
        onClick={() => router.push("/leaderboard")}
      >
        View Leaderboard
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Verify the home page renders**

```bash
npm run dev
```

Open `http://localhost:3000` — should see the title, difficulty selector, game mode selector, and start button.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: implement home page with difficulty and game mode selection"
```

---

### Task 7: Quiz Page

**Files:**
- Create: `src/app/quiz/page.tsx`

- [ ] **Step 1: Implement the quiz page**

Create `src/app/quiz/page.tsx`:

```tsx
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

      // Auto-advance after delay
      setTimeout(() => {
        const totalAnswered = newState.answers.length;

        // Check if round is over
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
```

- [ ] **Step 2: Verify quiz flow works**

```bash
npm run dev
```

Navigate to home → select difficulty → start quiz. Should see car images, name, and 4 answer buttons. Click an answer to see feedback.

- [ ] **Step 3: Commit**

```bash
git add src/app/quiz/
git commit -m "feat: implement quiz page with image carousel, answers, and scoring"
```

---

### Task 8: Results Page

**Files:**
- Create: `src/app/results/page.tsx`

- [ ] **Step 1: Implement the results page**

Create `src/app/results/page.tsx`:

```tsx
"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Difficulty, GameMode } from "@/lib/types";
import {
  qualifiesForLeaderboard,
  addLeaderboardEntry,
} from "@/lib/leaderboard";

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const score = parseInt(searchParams.get("score") || "0");
  const total = parseInt(searchParams.get("total") || "0");
  const difficulty = (searchParams.get("difficulty") || "core") as Difficulty;
  const mode = (searchParams.get("mode") || "rounds") as GameMode;
  const bestStreak = parseInt(searchParams.get("bestStreak") || "0");

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const qualifies = qualifiesForLeaderboard(score, difficulty);

  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    if (!name.trim()) return;
    addLeaderboardEntry(name.trim(), score, total, difficulty, mode);
    setSaved(true);
  }

  function getMessage(): string {
    if (percentage >= 90) return "BMW Master! Incredible!";
    if (percentage >= 70) return "Great job! You know your BMWs!";
    if (percentage >= 50) return "Not bad! Keep practicing!";
    return "Keep learning! You'll get there!";
  }

  function getAlertClass(): string {
    if (percentage >= 90) return "alert-success";
    if (percentage >= 70) return "alert-info";
    if (percentage >= 50) return "alert-warning";
    return "alert-error";
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-4xl font-bold text-primary">Quiz Complete!</h1>

      <div className="stats shadow bg-base-200">
        <div className="stat">
          <div className="stat-title">Score</div>
          <div className="stat-value text-primary">
            {score}/{total}
          </div>
          <div className="stat-desc">{percentage}% correct</div>
        </div>
        {mode === "endless" && bestStreak > 0 && (
          <div className="stat">
            <div className="stat-title">Best Streak</div>
            <div className="stat-value text-secondary">{bestStreak}</div>
          </div>
        )}
      </div>

      <div className={`alert ${getAlertClass()} max-w-md`}>
        <span>{getMessage()}</span>
      </div>

      {qualifies && !saved && (
        <div className="card bg-base-200 w-full max-w-md">
          <div className="card-body">
            <h3 className="card-title text-sm">
              You made the top 10! Enter your name:
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Your name"
                className="input input-bordered flex-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                maxLength={20}
              />
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {saved && (
        <div className="alert alert-success max-w-md">
          <span>Score saved to leaderboard!</span>
        </div>
      )}

      <div className="flex gap-3">
        <button
          className="btn btn-primary"
          onClick={() => router.push("/")}
        >
          Play Again
        </button>
        <button
          className="btn btn-ghost"
          onClick={() => router.push("/leaderboard")}
        >
          Leaderboard
        </button>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center"><span className="loading loading-spinner loading-lg" /></div>}>
      <ResultsContent />
    </Suspense>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/results/
git commit -m "feat: implement results page with score summary and leaderboard entry"
```

---

### Task 9: Leaderboard Page

**Files:**
- Create: `src/app/leaderboard/page.tsx`
- Create: `src/components/LeaderboardTable.tsx`

- [ ] **Step 1: Create LeaderboardTable component**

Create `src/components/LeaderboardTable.tsx`:

```tsx
"use client";

import { LeaderboardEntry } from "@/lib/types";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

export default function LeaderboardTable({ entries }: LeaderboardTableProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-base-content/50">
        No scores yet. Be the first!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
            <th>Mode</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr key={`${entry.name}-${entry.date}`}>
              <td className="font-bold">{i + 1}</td>
              <td>{entry.name}</td>
              <td>
                {entry.score}/{entry.total} (
                {Math.round((entry.score / entry.total) * 100)}%)
              </td>
              <td className="capitalize">{entry.mode}</td>
              <td>{new Date(entry.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 2: Create the leaderboard page**

Create `src/app/leaderboard/page.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Difficulty } from "@/lib/types";
import { getLeaderboardByDifficulty } from "@/lib/leaderboard";
import LeaderboardTable from "@/components/LeaderboardTable";

const tabs: { value: Difficulty; label: string }[] = [
  { value: "core", label: "Core" },
  { value: "comprehensive", label: "Comprehensive" },
  { value: "exhaustive", label: "Exhaustive" },
];

export default function LeaderboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Difficulty>("core");
  const [entries, setEntries] = useState<ReturnType<typeof getLeaderboardByDifficulty>>([]);

  useEffect(() => {
    setEntries(getLeaderboardByDifficulty(activeTab));
  }, [activeTab]);

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-4xl font-bold text-primary">Leaderboard</h1>

      <div role="tablist" className="tabs tabs-boxed">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            className={`tab ${activeTab === tab.value ? "tab-active" : ""}`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl">
        <LeaderboardTable entries={entries} />
      </div>

      <button className="btn btn-ghost" onClick={() => router.push("/")}>
        Back to Home
      </button>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/LeaderboardTable.tsx src/app/leaderboard/
git commit -m "feat: implement leaderboard page with difficulty tabs and score table"
```

---

### Task 10: Expand BMW Data — Comprehensive Tier

**Files:**
- Modify: `src/data/bmw-cars.ts`

- [ ] **Step 1: Add comprehensive difficulty entries**

Add the following entries to the `bmwCars` array in `src/data/bmw-cars.ts`, after all the core entries. These cover the i-series, Z1, Z8, BMW 2002, E9 coupe, and 2 Series Active/Gran Tourer variants.

Each entry must have real Wikipedia Commons image URLs. Use web search to find the correct URLs for each model. The entries to add (with `difficulty: "comprehensive"`):

- BMW i3 (I01) — 2013-2022
- BMW i4 (G26) — 2021-present
- BMW i5 (G60) — 2023-present
- BMW i7 (G70) — 2022-present
- BMW iX (I20) — 2021-present
- BMW iX1 (U11) — 2022-present
- BMW iX3 (G08) — 2020-present
- BMW Z1 (E30/Z1) — 1989-1991
- BMW Z8 (E52) — 2000-2003
- BMW 2002 — 1968-1976
- BMW E9 Coupe (3.0 CS/CSi/CSL) — 1968-1975
- BMW Isetta — 1955-1962
- BMW 2 Series Active Tourer (F45) — 2014-2021
- BMW 2 Series Active Tourer (U06) — 2022-present
- BMW 2 Series Gran Tourer (F46) — 2015-2021
- BMW 2 Series Gran Coupe (F44) — 2019-present
- BMW X3 (G45) — 2024-present
- BMW X5 M (F85) — 2015-2018
- BMW X5 M (F95) — 2020-present
- BMW X6 M (F86) — 2015-2019
- BMW X6 M (F96) — 2020-present
- BMW M2 (F87) — 2016-2021
- BMW M2 (G87) — 2023-present
- BMW M3 (E30 M3) — 1986-1991
- BMW M3 (E36 M3) — 1992-1999
- BMW M3 (E46 M3) — 2000-2006
- BMW M3 (E90 M3 / E92 M3) — 2007-2013
- BMW M3 (F80) — 2014-2018
- BMW M3 (G80) — 2021-present
- BMW M4 (F82) — 2014-2020
- BMW M4 (G82) — 2021-present
- BMW M5 (E28 M5) — 1985-1988
- BMW M5 (E34 M5) — 1988-1995
- BMW M5 (E39 M5) — 1998-2003
- BMW M5 (E60 M5) — 2005-2010
- BMW M5 (F10 M5) — 2011-2016
- BMW M5 (F90) — 2018-2023
- BMW M5 (G90) — 2024-present
- BMW M6 (E24 M6 / M635CSi) — 1983-1989
- BMW M6 (E63 M6) — 2005-2010
- BMW M6 (F13 M6) — 2012-2018
- BMW M8 (F91/F92/F93) — 2019-present
- BMW 1 Series M Coupe (E82) — 2011-2012

**NOTE TO IMPLEMENTER:** For each entry, search Wikipedia Commons for an appropriate image. Use the same URL pattern as existing entries. If a specific view (front/side/rear) cannot be found, use the best available image for all three fields.

- [ ] **Step 2: Verify the data loads**

```bash
npm run dev
```

Select "Comprehensive" difficulty on home page — should show the higher car count.

- [ ] **Step 3: Commit**

```bash
git add src/data/bmw-cars.ts
git commit -m "feat: add comprehensive tier BMW models (i-series, Z-cars, M-cars, classics)"
```

---

### Task 11: Expand BMW Data — Exhaustive Tier

**Files:**
- Modify: `src/data/bmw-cars.ts`

- [ ] **Step 1: Add exhaustive difficulty entries**

Add body style sub-variants and LCI facelifts with `difficulty: "exhaustive"`. These include:

**3 Series variants:**
- E91 (Touring), E92 (Coupe), E93 (Convertible)
- F31 (Touring), F34 (GT), F35 (Long Wheelbase)
- G21 (Touring), G28 (Gran Sedan)

**4 Series variants:**
- F33 (Convertible), F36 (Gran Coupe)
- G23 (Convertible), G26 (Gran Coupe)

**5 Series variants:**
- E61 (Touring), F11 (Touring), F07 (GT)
- G31 (Touring)

**6 Series variants:**
- E64 (Convertible), F06 (Gran Coupe), F12 (Convertible)

**7 Series variants:**
- E66 (Long Wheelbase), F02 (Long Wheelbase), G12 (Long Wheelbase)

**X Series variants:**
- X3 M (F97), X4 M (F98)
- X2 (U10) — 2024-present

**1 Series variants:**
- F21 (3-door), E88 (Convertible), E82 (Coupe)

**2 Series variants:**
- F23 (Convertible)

**LCI facelifts** (add as separate entries with "LCI" in the name):
- E90 LCI, E60 LCI, F10 LCI, F30 LCI, G30 LCI, G20 LCI, etc.

**NOTE TO IMPLEMENTER:** Each entry needs real Wikipedia Commons URLs. Search for each model. Expect ~80+ entries for this tier. Use the same entry format as existing data.

- [ ] **Step 2: Verify total car count**

Open the app, select "Exhaustive" — should show 200+ cars.

- [ ] **Step 3: Commit**

```bash
git add src/data/bmw-cars.ts
git commit -m "feat: add exhaustive tier with body variants and LCI facelifts"
```

---

### Task 12: Next.js Image Configuration

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Allow Wikipedia Commons images**

Update `next.config.ts` to allow external images from Wikimedia:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/commons/**",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 2: Commit**

```bash
git add next.config.ts
git commit -m "feat: configure Next.js to allow Wikimedia Commons images"
```

---

### Task 13: End-to-End Verification

- [ ] **Step 1: Run the build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 2: Manual testing checklist**

Start the dev server and test:

1. Home page loads with difficulty and mode selectors
2. Changing difficulty updates the car count display
3. Start quiz → quiz page shows car images, name, and 4 options
4. Click correct answer → green highlight, score increments
5. Click wrong answer → red on selected, green on correct
6. Auto-advances after 1.5s
7. Rounds mode: ends after N questions, redirects to results
8. Endless mode: quit button works, redirects to results
9. Results page shows score, percentage, and message
10. If qualifying score: name input appears, saves to leaderboard
11. Leaderboard page shows entries, tabs filter by difficulty
12. All images load from Wikipedia Commons

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: final cleanup and verification"
```
