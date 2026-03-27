export type RPE = 6 | 7 | 8 | 9 | 10;

export interface SetEntry {
  id: string;
  exerciseId: string;
  date: string; // ISO
  week: number;
  day: number;
  weight: number;
  reps: number;
  rpe: RPE;
}

export interface ConditioningEntry {
  id: string;
  date: string;
  type: "MICT" | "HIIT" | "SIT";
  zone: 1 | 2 | 3 | 4 | 5;
  durationMinutes: number;
  rpe: number;
}

export interface Exercise {
  id: string;
  name: string;
  pattern: "squat" | "hinge" | "push" | "pull" | "other";
}

export interface ProgramDay {
  week: number;
  day: number;
  title: string;
  exercises: {
    exerciseId: string;
    sets: number;
    reps: number;
    targetRPE: RPE;
  }[];
}

export interface Program {
  name: string;
  weeks: ProgramDay[];
}
