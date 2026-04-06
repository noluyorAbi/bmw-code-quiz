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
