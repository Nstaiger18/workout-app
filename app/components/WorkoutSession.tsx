"use client";

import { useState, useEffect } from "react";
import { beginnerStandard } from "@lib/program";
import { getSelectedExercises } from "@lib/exerciseSelection";
import { getExercises } from "@lib/exercises";
import { getSets, saveSet } from "@lib/storage";
import type { RPE, SetEntry } from "@lib/types";
import RPESelector from "./RPESelector";
import { v4 as uuid } from "uuid";

function todayISO() {
  return new Date().toISOString();
}

// Auto-progression logic
function getNextWeight({
  exerciseId,
  targetRPE,
  defaultReps
}: {
  exerciseId: string;
  targetRPE: number;
  defaultReps: number;
}) {
  const history = getSets()
    .filter(s => s.exerciseId === exerciseId)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  if (history.length === 0) return 0;

  const last = history[0];

  const actualRPE = last.rpe;
  const weight = last.weight;

  if (!weight || weight <= 0) return 0;

  if (actualRPE === targetRPE) return Math.round(weight * 1.02);
  if (actualRPE < targetRPE) return Math.round(weight * 1.03);
  if (actualRPE > targetRPE) return Math.round(weight * 0.97);

  return weight;
}

export default function WorkoutSession() {
  const [week, setWeek] = useState(1);
  const [dayIndex, setDayIndex] = useState(1);

  const [day, setDay] = useState<any>(null);
  const [resolvedExercises, setResolvedExercises] = useState<any[]>([]);
  const [sets, setSets] = useState<any[]>([]);
  const [exerciseMap, setExerciseMap] = useState<Record<string, string>>({});

  // Load everything when week/day changes
  useEffect(() => {
    const selected = getSelectedExercises();
    const registry = getExercises();

    // Build map: id → display name
    const map: Record<string, string> = {};
    registry.forEach(ex => (map[ex.id] = ex.name));
    setExerciseMap(map);

    // Load program day
    const programDay = beginnerStandard.weeks.find(
      w => w.week === week && w.day === dayIndex
    );

    if (!programDay) {
      setDay(null);
      return;
    }

    setDay(programDay);

    // Resolve exercise IDs using user selections
    const resolved = programDay.exercises.map(ex => {
      const pattern = ex.exerciseId as keyof typeof selected;
      const chosen = selected[pattern] || ex.exerciseId;

      const suggestedWeight = getNextWeight({
        exerciseId: chosen,
        targetRPE: ex.targetRPE,
        defaultReps: ex.reps
      });

      return {
        ...ex,
        exerciseId: chosen,
        suggestedWeight
      };
    });

    setResolvedExercises(resolved);

    // Build initial set rows
    const initialSets = resolved.flatMap(ex =>
      Array.from({ length: ex.sets }).map((_, i) => ({
        exerciseId: ex.exerciseId,
        setIndex: i,
        weight: ex.suggestedWeight || 0,
        reps: ex.reps,
        rpe: ex.targetRPE
      }))
    );

    setSets(initialSets);
  }, [week, dayIndex]);

  if (!day) {
    return (
      <div className="text-textSoft">
        No session found for Week {week}, Day {dayIndex}.
      </div>
    );
  }

  const handleChange = (
    idx: number,
    field: "weight" | "reps" | "rpe",
    value: number
  ) => {
    setSets(prev => {
      const copy = [...prev];
      // @ts-ignore
      copy[idx][field] = value;
      return copy;
    });
  };

  const handleSave = () => {
    const date = todayISO();

    const entries: SetEntry[] = sets.map(s => ({
      id: uuid(),
      exerciseId: s.exerciseId,
      date,
      week,
      day: dayIndex,
      weight: s.weight,
      reps: s.reps,
      rpe: s.rpe
    }));

    entries.forEach(saveSet);
    alert("Session saved successfully");
  };

  return (
    <div className="space-y-4">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          className="text-textSoft"
          onClick={() => setWeek(w => Math.max(1, w - 1))}
        >
          ◀ Week {week - 1}
        </button>

        <div className="text-center">
          <div className="text-lg font-semibold">Week {week}</div>
          <div className="flex gap-2 mt-1">
            {[1, 2, 3].map(d => (
              <button
                key={d}
                onClick={() => setDayIndex(d)}
                className={`px-3 py-1 rounded-full text-xs ${
                  d === dayIndex
                    ? "bg-accent text-slate-900"
                    : "bg-slate-800 text-textSoft"
                }`}
              >
                Day {d}
              </button>
            ))}
          </div>
        </div>

        <button
          className="text-textSoft"
          onClick={() => setWeek(w => Math.min(15, w + 1))}
        >
          Week {week + 1} ▶
        </button>
      </div>

      <header>
        <h1 className="text-xl font-semibold">{day.title}</h1>
        <p className="text-xs text-textSoft">
          Week {week} · Day {dayIndex} · Beginner Standard
        </p>
      </header>

      {resolvedExercises.map(ex => {
        const exSets = sets.filter(s => s.exerciseId === ex.exerciseId);

        return (
          <div key={ex.exerciseId} className="card space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="tile-title">Exercise</div>
                <div className="text-base font-semibold">
                  {exerciseMap[ex.exerciseId] || ex.exerciseId}
                </div>
              </div>
              <div className="text-xs text-textSoft">
                {ex.sets} × {ex.reps} @ RPE {ex.targetRPE}
              </div>
            </div>

            {/* Suggested weight */}
            {ex.suggestedWeight > 0 && (
              <div className="text-xs text-accent">
                Suggested: {ex.suggestedWeight} kg
              </div>
            )}

            <div className="space-y-2">
              {exSets.map((s, idx) => {
                const globalIndex = sets.findIndex(
                  all =>
                    all.exerciseId === s.exerciseId &&
                    all.setIndex === s.setIndex
                );

                return (
                  <div
                    key={s.exerciseId + s.setIndex}
                    className="flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2"
                  >
                    <div className="w-8 text-xs text-textSoft">
                      Set {s.setIndex + 1}
                    </div>

                    <input
                      type="number"
                      className="w-16 rounded-md bg-slate-800 px-2 py-1 text-xs"
                      value={s.weight || ""}
                      placeholder="kg"
                      onChange={e =>
                        handleChange(
                          globalIndex,
                          "weight",
                          Number(e.target.value)
                        )
                      }
                    />

                    <input
                      type="number"
                      className="w-14 rounded-md bg-slate-800 px-2 py-1 text-xs"
                      value={s.reps}
                      onChange={e =>
                        handleChange(
                          globalIndex,
                          "reps",
                          Number(e.target.value)
                        )
                      }
                    />

                    <div className="flex-1">
                      <RPESelector
                        value={s.rpe}
                        onChange={r =>
                          handleChange(globalIndex, "rpe", r as number)
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <button onClick={handleSave} className="btn-primary w-full">
        Finish Session
      </button>
    </div>
  );
}
