"use client";

import { Exercise } from "./types";

const KEY = "bbm_exercises_v1";

const defaultExercises: Exercise[] = [
  { id: "squat", name: "Squat", pattern: "squat" },
  { id: "front-squat", name: "Front Squat", pattern: "squat" },
  { id: "leg-press", name: "Leg Press", pattern: "squat" },

  { id: "deadlift", name: "Deadlift", pattern: "hinge" },
  { id: "rdl", name: "Romanian Deadlift", pattern: "hinge" },
  { id: "trap-bar-deadlift", name: "Trap Bar Deadlift", pattern: "hinge" },

  { id: "bench-press", name: "Bench Press", pattern: "push" },
  { id: "incline-bench", name: "Incline Bench Press", pattern: "push" },
  { id: "overhead-press", name: "Overhead Press", pattern: "push" },

  { id: "row", name: "Barbell Row", pattern: "pull" },
  { id: "lat-pulldown", name: "Lat Pulldown", pattern: "pull" },
  { id: "dumbbell-row", name: "Dumbbell Row", pattern: "pull" }
];

function safeParse(raw: string | null): Exercise[] {
  if (!raw) return defaultExercises;
  try {
    return JSON.parse(raw);
  } catch {
    return defaultExercises;
  }
}

export function getExercises(): Exercise[] {
  if (typeof window === "undefined") return defaultExercises;
  return safeParse(localStorage.getItem(KEY));
}

export function saveExercises(list: Exercise[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function addCustomExercise(name: string, pattern: Exercise["pattern"]) {
  const id = name.toLowerCase().replace(/\s+/g, "-");
  const all = getExercises();
  const updated = [...all, { id, name, pattern }];
  saveExercises(updated);
  return id;
}
