"use client";

interface Props {
  completed: number;
  total: number;
  label: string;
}

export default function WeeklyProgress({ completed, total, label }: Props) {
  const pct = total === 0 ? 0 : (completed / total) * 100;

  return (
    <div className="card space-y-2">
      <div className="tile-title">{label}</div>

      <div className="flex items-center justify-between text-xs text-textSoft">
        <span>
          {completed} / {total} sessions
        </span>
        <span>{Math.round(pct)}%</span>
      </div>

      <div className="pill-progress">
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
