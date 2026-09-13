"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Answer, Question } from "@/lib/types";
import ProgressBar from "./ProgressBar";

interface QuizProps {
  questions: Question[];
  index: number;
  onAnswer: (answer: Answer) => void;
  onBack: () => void;
}

export default function Quiz({ questions, index, onAnswer, onBack }: QuizProps) {
  const question = questions[index];
  const total = questions.length;

  return (
    <section className="mx-auto flex min-h-[100dvh] w-full max-w-2xl flex-col px-6 py-8 sm:py-12">
      <ProgressBar current={index + 1} total={total} />

      <div className="flex flex-1 flex-col justify-center py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-10"
          >
            <p
              className="font-myanmar text-xl leading-[1.75] text-bone sm:text-2xl sm:leading-[1.7]"
              aria-live="polite"
            >
              {question.question}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4" role="group" aria-label="Your answer">
              <button
                type="button"
                onClick={() => onAnswer("yes")}
                className="min-h-14 flex-1 border border-border bg-surface px-6 text-sm font-semibold uppercase tracking-[0.2em] text-bone transition hover:border-ember hover:bg-ember/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => onAnswer("no")}
                className="min-h-14 flex-1 border border-border bg-surface px-6 text-sm font-semibold uppercase tracking-[0.2em] text-bone transition hover:border-ember hover:bg-ember/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
              >
                No
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center gap-4 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="min-h-10 text-xs font-medium uppercase tracking-[0.18em] text-muted transition hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
        >
          {index === 0 ? "← Exit" : "← Back"}
        </button>
        <p className="hidden text-[10px] uppercase tracking-[0.14em] text-muted/70 sm:block">
          Keys: Y / N · Backspace
        </p>
      </div>
    </section>
  );
}
