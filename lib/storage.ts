"use client";

import { SetEntry, ConditioningEntry } from "./types";

const SETS_KEY = "bbm_sets_v1";
const COND_KEY = "bbm_cond_v1";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getSets(): SetEntry[] {
  if (typeof window === "undefined") return [];
  return safeParse<SetEntry[]>(localStorage.getItem(SETS_KEY), []);
}

export function saveSet(entry: SetEntry) {
  if (typeof window === "undefined") return;
  const all = getSets();
  const updated = [...all.filter(s => s.id !== entry.id), entry];
  localStorage.setItem(SETS_KEY, JSON.stringify(updated));
}

export function getConditioning(): ConditioningEntry[] {
  if (typeof window === "undefined") return [];
  return safeParse<ConditioningEntry[]>(localStorage.getItem(COND_KEY), []);
}

export function saveConditioning(entry: ConditioningEntry) {
  if (typeof window === "undefined") return;
  const all = getConditioning();
  const updated = [...all.filter(c => c.id !== entry.id), entry];
  localStorage.setItem(COND_KEY, JSON.stringify(updated));
}
