"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import { TRAIT_LABELS } from "@/lib/scoring";
import { getTier } from "@/lib/tiers";
import type { QuizResult } from "@/lib/types";
import ShareCard, { ScoreRing } from "./ShareCard";
import TraitBars from "./TraitBars";

interface ResultProps {
  result: QuizResult;
  onRetake: () => void;
}

export default function Result({ result, onRetake }: ResultProps) {
  const tier = getTier(result.total);
  const cardRef = useRef<HTMLDivElement>(null);
  const [sharing, setSharing] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const capturePng = useCallback(async () => {
    if (!cardRef.current) throw new Error("Share card not ready");
    return toPng(cardRef.current, {
      cacheBust: true,
      pixelRatio: 1,
      backgroundColor: "#0d0b0c",
    });
  }, []);

  const handleDownload = useCallback(async () => {
    setSharing(true);
    setStatus(null);
    try {
      const dataUrl = await capturePng();
      const link = document.createElement("a");
      link.download = `how-evil-are-you-${result.total}.png`;
      link.href = dataUrl;
      link.click();
      setStatus("Image saved.");
    } catch {
      setStatus("Could not create image. Try again.");
    } finally {
      setSharing(false);
    }
  }, [capturePng, result.total]);

  const handleShare = useCallback(async () => {
    setSharing(true);
    setStatus(null);
    try {
      const dataUrl = await capturePng();
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `how-evil-are-you-${result.total}.png`, {
        type: "image/png",
      });

      if (typeof navigator !== "undefined" && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "How Evil Are You?",
          text: `I'm a ${tier.title} (${result.total}/${result.maxTotal}).`,
        });
        setStatus("Shared.");
        return;
      }

      const link = document.createElement("a");
      link.download = `how-evil-are-you-${result.total}.png`;
      link.href = dataUrl;
      link.click();
      setStatus("Share unavailable here — image downloaded instead.");
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setStatus(null);
      } else {
        setStatus("Could not share. Try Download PNG.");
      }
    } finally {
      setSharing(false);
    }
  }, [capturePng, result.maxTotal, result.total, tier.title]);

  return (
    <section className="mx-auto flex min-h-[100dvh] w-full max-w-2xl flex-col px-6 py-12 sm:py-16">
      <ShareCard result={result} tier={tier} cardRef={cardRef} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center"
      >
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-ember-soft">
          Your result
        </p>
        <h1 className="mt-4 font-display text-[clamp(2.5rem,8vw,3.75rem)] font-semibold leading-none tracking-tight text-bone">
          {tier.title}
        </h1>
        <p className="mt-3 text-sm text-muted">
          Dominant: {TRAIT_LABELS[result.dominantTrait]}
        </p>

        <div className="mt-10">
          <ScoreRing
            percent={result.percent}
            total={result.total}
            max={result.maxTotal}
          />
        </div>

        <p className="mt-8 max-w-md text-base leading-relaxed text-muted">
          {tier.blurb}
        </p>
      </motion.div>

      <div className="mt-12 w-full">
        <TraitBars traits={result.traits} />
      </div>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleShare}
          disabled={sharing}
          className="min-h-12 flex-1 bg-ember px-6 text-sm font-semibold uppercase tracking-[0.18em] text-bone transition hover:bg-ember-soft disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
        >
          {sharing ? "Working…" : "Share image"}
        </button>
        <button
          type="button"
          onClick={handleDownload}
          disabled={sharing}
          className="min-h-12 flex-1 border border-border bg-surface px-6 text-sm font-semibold uppercase tracking-[0.18em] text-bone transition hover:border-ember disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
        >
          Download PNG
        </button>
      </div>

      <button
        type="button"
        onClick={onRetake}
        className="mt-6 min-h-10 self-center text-xs font-medium uppercase tracking-[0.18em] text-muted transition hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
      >
        Retake quiz
      </button>

      {status && (
        <p className="mt-4 text-center text-xs text-muted" role="status">
          {status}
        </p>
      )}

      <p className="mt-10 text-center text-xs leading-relaxed text-muted/80">
        Entertainment only. Not a clinical assessment or diagnosis.
      </p>
    </section>
  );
}
