export interface Tier {
  min: number;
  max: number;
  title: string;
  blurb: string;
}

export const TIERS: Tier[] = [
  {
    min: 0,
    max: 10,
    title: "Soft Soul",
    blurb: "Your darker impulses stay mostly on the shelf. Empathy still runs the room.",
  },
  {
    min: 11,
    max: 20,
    title: "Mild Shadow",
    blurb: "A little edge shows through — strategic, self-aware, not ruthless.",
  },
  {
    min: 21,
    max: 30,
    title: "Calculated Operator",
    blurb: "You weigh people and outcomes with cool precision. Charm meets calculation.",
  },
  {
    min: 31,
    max: 40,
    title: "Dark Strategist",
    blurb: "The mask fits well. Ambition and detachment are tools you know how to use.",
  },
  {
    min: 41,
    max: 50,
    title: "Apex Villain",
    blurb: "High dark-triad signal. This is entertainment — not a diagnosis — but wow.",
  },
];

export function getTier(totalScore: number): Tier {
  const clamped = Math.max(0, Math.min(50, totalScore));
  return (
    TIERS.find((t) => clamped >= t.min && clamped <= t.max) ?? TIERS[TIERS.length - 1]
  );
}
