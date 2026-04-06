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
