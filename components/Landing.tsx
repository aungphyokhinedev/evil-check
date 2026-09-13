"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AboutOverlay from "./AboutOverlay";

interface LandingProps {
  onStart: () => void;
}

export default function Landing({ onStart }: LandingProps) {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 py-16 text-center">
      <AboutOverlay open={aboutOpen} onClose={() => setAboutOpen(false)} />

      <motion.div
        className="mx-auto flex max-w-xl flex-col items-center"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-ember-soft">
          Dark Triad Quiz
        </p>
        <h1 className="font-display text-[clamp(2.75rem,10vw,4.75rem)] font-semibold leading-[0.95] tracking-tight text-bone">
          How Evil
          <br />
          Are You?
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
          Fifty blunt Yes/No questions. Three traits. One score you might not want to
          share — but probably will.
        </p>
        <button
          type="button"
          onClick={onStart}
          className="mt-10 min-h-12 min-w-[200px] bg-ember px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-bone transition hover:bg-ember-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
        >
          Begin
        </button>
        <button
          type="button"
          onClick={() => setAboutOpen(true)}
          className="mt-5 min-h-10 text-sm text-muted underline underline-offset-4 transition hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
        >
          What is this?
        </button>
        <p className="mt-10 max-w-sm text-xs leading-relaxed text-muted/80">
          For entertainment only. Not a clinical assessment or diagnosis of any
          personality disorder.
        </p>
      </motion.div>
    </section>
  );
}
