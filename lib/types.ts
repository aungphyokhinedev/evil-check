export type Trait = "machiavellianism" | "narcissism" | "psychopathy";

export type Answer = "yes" | "no";

export interface Question {
  id: number;
  trait: Trait;
  isReverse: boolean;
  question: string;
}

export interface TraitScore {
  trait: Trait;
  score: number;
  max: number;
  percent: number;
}

export interface QuizResult {
  total: number;
  maxTotal: number;
  percent: number;
  traits: TraitScore[];
  dominantTrait: Trait;
}

export type AppScreen = "landing" | "quiz" | "result";
