"use client";

import type { RPE } from "@lib/types";

interface Props {
  value: RPE;
  onChange: (rpe: RPE) => void;
}

const options: RPE[] = [6, 7, 8, 9, 10];

export default function RPESelector({ value, onChange }: Props) {
  return (
    <div className="flex gap-1">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`flex-1 rounded-full px-2 py-1 text-xs ${
            opt === value
              ? "bg-accent text-slate-900"
              : "bg-slate-800 text-textSoft"
          }`}
        >
          RPE {opt}
        </button>
      ))}
    </div>
  );
}
