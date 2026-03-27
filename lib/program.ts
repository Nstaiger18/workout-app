import { Program } from "./types";

/**
 * This is an ORIGINAL, NON-COPYRIGHTED 15-week structure
 * inspired by the general training pattern of beginner linear progression:
 * - 3 days per week
 * - Squat / Press / Pull patterns
 * - RPE increases across blocks
 * - Deload every 5th week
 */

export const beginnerStandard: Program = {
  name: "Beginner Standard 3-Day",
  weeks: []
};

// Helper to generate a week
function makeWeek(week: number, rpeBase: number) {
  return [
    {
      week,
      day: 1,
      title: "Squat Focus",
      exercises: [
        { exerciseId: "squat", sets: 3, reps: 6, targetRPE: rpeBase as any },
        { exerciseId: "bench-press", sets: 3, reps: 6, targetRPE: (rpeBase + 1) as any },
        { exerciseId: "row", sets: 3, reps: 8, targetRPE: rpeBase as any }
      ]
    },
    {
      week,
      day: 2,
      title: "Bench Focus",
      exercises: [
        { exerciseId: "bench-press", sets: 4, reps: 6, targetRPE: (rpeBase + 1) as any },
        { exerciseId: "deadlift", sets: 2, reps: 5, targetRPE: rpeBase as any },
        { exerciseId: "lat-pulldown", sets: 3, reps: 10, targetRPE: rpeBase as any }
      ]
    },
    {
      week,
      day: 3,
      title: "Deadlift Focus",
      exercises: [
        { exerciseId: "deadlift", sets: 3, reps: 5, targetRPE: (rpeBase + 1) as any },
        { exerciseId: "overhead-press", sets: 3, reps: 6, targetRPE: rpeBase as any },
        { exerciseId: "dumbbell-row", sets: 3, reps: 10, targetRPE: rpeBase as any }
      ]
    }
  ];
}

// Build 15 weeks
const weeks: any[] = [];

// Block 1: Weeks 1–4 (RPE 6–7)
for (let w = 1; w <= 4; w++) {
  weeks.push(...makeWeek(w, 6));
}

// Week 5: Deload (RPE 5)
weeks.push(...makeWeek(5, 5));

// Block 2: Weeks 6–9 (RPE 7–8)
for (let w = 6; w <= 9; w++) {
  weeks.push(...makeWeek(w, 7));
}

// Week 10: Deload (RPE 5)
weeks.push(...makeWeek(10, 5));

// Block 3: Weeks 11–14 (RPE 8–9)
for (let w = 11; w <= 14; w++) {
  weeks.push(...makeWeek(w, 8));
}

// Week 15: Deload (RPE 5)
weeks.push(...makeWeek(15, 5));

beginnerStandard.weeks = weeks;
