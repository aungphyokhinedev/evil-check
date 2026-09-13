"use client";

import { useEffect, useState } from "react";
import { TRAIT_LABELS } from "@/lib/scoring";
import type { QuizResult } from "@/lib/types";
import type { Tier } from "@/lib/tiers";

interface ShareCardProps {
  result: QuizResult;
  tier: Tier;
  cardRef: React.RefObject<HTMLDivElement | null>;
}

export default function ShareCard({ result, tier, cardRef }: ShareCardProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 left-[-9999px] z-[-1] overflow-hidden"
    >
      <div
        ref={cardRef}
        style={{
          width: 1080,
          height: 1350,
          backgroundColor: "#0d0b0c",
          color: "#f4efe8",
          fontFamily: "Georgia, 'Times New Roman', serif",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          padding: "72px 64px",
          boxSizing: "border-box",
          backgroundImage:
            "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(196,30,58,0.4), transparent 55%), radial-gradient(ellipse 60% 40% at 85% 100%, rgba(196,30,58,0.15), transparent 50%)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "system-ui, sans-serif",
            fontSize: 22,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#e84a5f",
            fontWeight: 600,
          }}
        >
          How Evil Are You?
        </p>

        <h2
          style={{
            margin: "48px 0 0",
            fontSize: 88,
            lineHeight: 1,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          {tier.title}
        </h2>

        <p
          style={{
            margin: "28px 0 0",
            fontFamily: "system-ui, sans-serif",
            fontSize: 64,
            fontWeight: 700,
            color: "#c41e3a",
            letterSpacing: "-0.03em",
          }}
        >
          {result.total}
          <span style={{ fontSize: 36, color: "#9a9188", fontWeight: 500 }}>
            {" "}
            / {result.maxTotal}
          </span>
        </p>

        <p
          style={{
            margin: "24px 0 0",
            fontFamily: "system-ui, sans-serif",
            fontSize: 28,
            lineHeight: 1.45,
            color: "#9a9188",
            maxWidth: 820,
          }}
        >
          {tier.blurb}
        </p>

        <div style={{ marginTop: 64, display: "flex", flexDirection: "column", gap: 28 }}>
          {result.traits.map((t) => (
            <div key={t.trait}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 22,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                  color: "#9a9188",
                }}
              >
                <span>{TRAIT_LABELS[t.trait]}</span>
                <span style={{ color: "#f4efe8" }}>
                  {t.score}/{t.max}
                </span>
              </div>
              <div
                style={{
                  height: 8,
                  width: "100%",
                  backgroundColor: "rgba(244,239,232,0.12)",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${t.percent}%`,
                    backgroundColor: "#c41e3a",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <p
          style={{
            marginTop: "auto",
            fontFamily: "system-ui, sans-serif",
            fontSize: 20,
            color: "#9a9188",
            letterSpacing: "0.06em",
          }}
        >
          Dominant: {TRAIT_LABELS[result.dominantTrait]} · Entertainment only
        </p>
      </div>
    </div>
  );
}

interface ScoreRingProps {
  percent: number;
  total: number;
  max: number;
}

export function ScoreRing({ percent, total, max }: ScoreRingProps) {
  const size = 200;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const [display, setDisplay] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const duration = 1100;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * total));
      setProgress(eased * percent);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [percent, total]);

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="relative mx-auto h-[200px] w-[200px]"
      role="img"
      aria-label={`Evil score ${total} out of ${max}`}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(244,239,232,0.12)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#c41e3a"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-5xl font-semibold tabular-nums text-bone">
          {display}
        </span>
        <span className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">
          of {max}
        </span>
      </div>
    </div>
  );
}
