"use client";

import { useState, useEffect } from "react";
import { getExercises, addCustomExercise } from "@lib/exercises";
import {
  getSelectedExercises,
  saveSelectedExercises,
  SelectedExercises
} from "@lib/exerciseSelection";

export default function ExerciseSettingsPage() {
  const [allExercises, setAllExercises] = useState([]);
  const [selected, setSelected] = useState<SelectedExercises>({
    squat: "",
    hinge: "",
    push: "",
    pull: ""
  });

  const [customName, setCustomName] = useState("");
  const [customPattern, setCustomPattern] = useState<"squat" | "hinge" | "push" | "pull">("squat");

  useEffect(() => {
    setAllExercises(getExercises());
    setSelected(getSelectedExercises());
  }, []);

  const patterns = ["squat", "hinge", "push", "pull"] as const;

  const handleSelect = (pattern: keyof SelectedExercises, id: string) => {
    const updated = { ...selected, [pattern]: id };
    setSelected(updated);
    saveSelectedExercises(updated);
  };

  const handleAddCustom = () => {
    if (!customName.trim()) return;
    const id = addCustomExercise(customName.trim(), customPattern);
    setAllExercises(getExercises());
    handleSelect(customPattern, id);
    setCustomName("");
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold">Exercise Selection</h1>
        <p className="text-xs text-textSoft">
          Choose your preferred exercises for each movement pattern.
        </p>
      </header>

      {patterns.map(pattern => {
        const options = allExercises.filter((ex: any) => ex.pattern === pattern);
        return (
          <div key={pattern} className="card space-y-2">
            <div className="tile-title">{pattern.toUpperCase()}</div>

            <select
              className="w-full rounded-lg bg-slate-800 px-3 py-2 text-sm"
              value={selected[pattern]}
              onChange={e => handleSelect(pattern, e.target.value)}
            >
              {options.map((ex: any) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name}
                </option>
              ))}
            </select>
          </div>
        );
      })}

      <div className="card space-y-3">
        <div className="tile-title">Add Custom Exercise</div>

        <input
          type="text"
          placeholder="Exercise name"
          className="w-full rounded-lg bg-slate-800 px-3 py-2 text-sm"
          value={customName}
          onChange={e => setCustomName(e.target.value)}
        />

        <select
          className="w-full rounded-lg bg-slate-800 px-3 py-2 text-sm"
          value={customPattern}
          onChange={e => setCustomPattern(e.target.value as any)}
        >
          <option value="squat">Squat Pattern</option>
          <option value="hinge">Hinge Pattern</option>
          <option value="push">Push Pattern</option>
          <option value="pull">Pull Pattern</option>
        </select>

        <button onClick={handleAddCustom} className="btn-primary w-full">
          Add Exercise
        </button>
      </div>
    </div>
  );
}
