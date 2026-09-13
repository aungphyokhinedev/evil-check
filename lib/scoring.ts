import type { Answer, Question, QuizResult, Trait, TraitScore } from "./types";

const TRAIT_ORDER: Trait[] = [
  "machiavellianism",
  "narcissism",
  "psychopathy",
];

export const TRAIT_LABELS: Record<Trait, string> = {
  machiavellianism: "Machiavellianism",
  narcissism: "Narcissism",
  psychopathy: "Psychopathy",
};

/** Fisher–Yates shuffle — new order each quiz run. */
export function shuffleQuestions(questions: Question[]): Question[] {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/** Evil point for a single answer (0 or 1). */
export function scoreAnswer(question: Question, answer: Answer): number {
  if (question.isReverse) {
    return answer === "no" ? 1 : 0;
  }
  return answer === "yes" ? 1 : 0;
}

export function calculateResult(
  questions: Question[],
  answers: Record<number, Answer>,
): QuizResult {
  const byTrait: Record<Trait, { score: number; max: number }> = {
    machiavellianism: { score: 0, max: 0 },
    narcissism: { score: 0, max: 0 },
    psychopathy: { score: 0, max: 0 },
  };

  let total = 0;

  for (const q of questions) {
    byTrait[q.trait].max += 1;
    const answer = answers[q.id];
    if (!answer) continue;
    const points = scoreAnswer(q, answer);
    byTrait[q.trait].score += points;
    total += points;
  }

  const traits: TraitScore[] = TRAIT_ORDER.map((trait) => {
    const { score, max } = byTrait[trait];
    return {
      trait,
      score,
      max,
      percent: max === 0 ? 0 : Math.round((score / max) * 100),
    };
  });

  const maxTotal = questions.length;
  const dominantTrait = traits.reduce((best, current) =>
    current.percent > best.percent ? current : best,
  ).trait;

  return {
    total,
    maxTotal,
    percent: maxTotal === 0 ? 0 : Math.round((total / maxTotal) * 100),
    traits,
    dominantTrait,
  };
}
