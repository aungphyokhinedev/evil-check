"use client";

import { motion } from "framer-motion";
import { TRAIT_LABELS } from "@/lib/scoring";
import type { TraitScore } from "@/lib/types";

interface TraitBarsProps {
  traits: TraitScore[];
  compact?: boolean;
}

export default function TraitBars({ traits, compact = false }: TraitBarsProps) {
  return (
    <ul className={`flex w-full flex-col ${compact ? "gap-3" : "gap-5"}`}>
      {traits.map((t, i) => (
        <li key={t.trait}>
          <div className="mb-1.5 flex items-baseline justify-between gap-3 text-xs uppercase tracking-[0.14em]">
            <span className="text-muted">{TRAIT_LABELS[t.trait]}</span>
            <span className="tabular-nums text-bone">
              {t.score}/{t.max}
            </span>
          </div>
          <div className={`w-full overflow-hidden bg-border ${compact ? "h-1" : "h-1.5"}`}>
            <motion.div
              className="h-full bg-ember"
              initial={{ width: 0 }}
              animate={{ width: `${t.percent}%` }}
              transition={{
                duration: 0.9,
                delay: 0.2 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
