interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = total === 0 ? 0 : (current / total) * 100;

  return (
    <div className="w-full" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total} aria-label="Quiz progress">
      <div className="mb-2 flex items-baseline justify-between text-xs uppercase tracking-[0.16em] text-muted">
        <span>Question</span>
        <span className="tabular-nums text-bone">
          {current} / {total}
        </span>
      </div>
      <div className="h-[2px] w-full overflow-hidden bg-border">
        <div
          className="h-full bg-ember transition-[width] duration-400 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
