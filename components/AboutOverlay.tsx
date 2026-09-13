"use client";

import { useEffect, useId, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TRAITS_INFO, TRAITS_INTRO_MM } from "@/lib/traits-info";

interface AboutOverlayProps {
  open: boolean;
  onClose: () => void;
}

const TRAIT_INDEX = ["I", "II", "III"] as const;

export default function AboutOverlay({ open, onClose }: AboutOverlayProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", onKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
      prev?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            type="button"
            aria-label="Close overlay backdrop"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(40,20,24,0.55),rgba(0,0,0,0.88))] backdrop-blur-[6px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex max-h-[92dvh] w-full max-w-xl flex-col overflow-hidden sm:max-h-[86dvh]"
            style={{
              background:
                "radial-gradient(ellipse 120% 80% at 50% -20%, rgba(196,30,58,0.22), transparent 50%), linear-gradient(180deg, #141011 0%, #0d0b0c 45%, #0a0809 100%)",
              boxShadow:
                "0 0 0 1px rgba(244,239,232,0.1), 0 24px 80px rgba(0,0,0,0.65), 0 0 60px rgba(196,30,58,0.12)",
            }}
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Top ember hairline */}
            <div
              className="h-px w-full shrink-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(232,74,95,0.85), transparent)",
              }}
            />

            <div className="flex items-start justify-between gap-4 px-7 pb-5 pt-7 sm:px-9 sm:pt-8">
              <div className="text-left">
                <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ember-soft">
                  Dark Triad
                </p>
                <h2
                  id={titleId}
                  className="mt-2 font-display text-[clamp(1.85rem,5vw,2.35rem)] font-semibold leading-none tracking-tight text-bone"
                >
                  What is this?
                </h2>
                <div className="mt-4 h-px w-12 bg-ember" />
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="group relative mt-1 flex h-10 w-10 shrink-0 items-center justify-center text-muted transition hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
                aria-label="Close"
              >
                <span
                  className="absolute inset-0 border border-border transition group-hover:border-ember/50"
                  aria-hidden
                />
                <span className="relative text-lg leading-none" aria-hidden>
                  ×
                </span>
              </button>
            </div>

            <div className="relative min-h-0 flex-1 overflow-y-auto px-7 pb-12 sm:px-9">
              <p className="font-myanmar max-w-prose text-[0.95rem] leading-[1.95] text-muted sm:text-base">
                {TRAITS_INTRO_MM}
              </p>

              <ul className="mt-9 flex flex-col gap-0">
                {TRAITS_INFO.map((t, i) => (
                  <motion.li
                    key={t.trait}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.12 + i * 0.08,
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative border-t border-border/80 py-7 first:border-t-0 first:pt-2"
                  >
                    <div className="flex gap-5 sm:gap-6">
                      <span
                        className="font-display mt-1 shrink-0 text-sm tracking-[0.12em] text-ember/80"
                        aria-hidden
                      >
                        {TRAIT_INDEX[i]}
                      </span>
                      <div className="min-w-0 flex-1 text-left">
                        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-ember-soft">
                          {t.labelEn}
                        </p>
                        <h3 className="font-myanmar mt-2.5 text-lg font-medium leading-snug text-bone sm:text-xl">
                          {t.nameMm.replace(/\s*\([^)]*\)\s*$/, "")}
                        </h3>
                        <p className="font-myanmar mt-3.5 text-[0.95rem] leading-[1.95] text-muted sm:text-base">
                          {t.bodyMm}
                        </p>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <p className="mt-2 border-t border-border/60 pt-6 text-center text-[10px] uppercase tracking-[0.2em] text-muted/70">
                Entertainment only
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
