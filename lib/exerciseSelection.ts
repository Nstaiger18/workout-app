"use client";

const KEY = "bbm_selected_exercises_v1";

export interface SelectedExercises {
  squat: string;
  hinge: string;
  push: string;
  pull: string;
}

const defaultSelection: SelectedExercises = {
  squat: "squat",
  hinge: "deadlift",
  push: "bench-press",
  pull: "row"
};

function safeParse(raw: string | null): SelectedExercises {
  if (!raw) return defaultSelection;
  try {
    return JSON.parse(raw);
  } catch {
    return defaultSelection;
  }
}

export function getSelectedExercises(): SelectedExercises {
  if (typeof window === "undefined") return defaultSelection;
  return safeParse(localStorage.getItem(KEY));
}

export function saveSelectedExercises(sel: SelectedExercises) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(sel));
}
