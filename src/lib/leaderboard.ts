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
      if (b.score !== a.score) return b.score - a.score;
      if (a.total !== b.total) return a.total - b.total;
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
