import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-4">
      <header className="mb-2">
        <h1 className="text-2xl font-semibold">Today</h1>
        <p className="text-sm text-textSoft">Week 1 · Day 1 · Beginner Standard</p>
      </header>

      <section className="space-y-3">
        <div className="card">
          <div className="tile-title">Lifting</div>
          <div className="mt-1 text-lg font-semibold">Squat · Bench</div>
          <p className="mt-1 text-sm text-textSoft">
            3 × 6 @ RPE 6–7 · 45–60s rest
          </p>
          <div className="mt-3">
            <Link href="/workout" className="btn-primary">
              Start Workout
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="tile-title">Conditioning</div>
          <p className="mt-1 text-sm text-textSoft">
            Zone 2 · 30 min · MICT (steady state)
          </p>
          <div className="mt-3">
            <Link href="/conditioning" className="btn-primary">
              Start Conditioning
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="tile-title">This Week</div>
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-textSoft">
              <span>Lifting</span>
              <span>1 / 3 sessions</span>
            </div>
            <div className="pill-progress mt-1">
              <div className="h-full w-1/3 rounded-full bg-accent" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-textSoft">
              <span>Conditioning</span>
              <span>0 / 3 sessions</span>
            </div>
            <div className="pill-progress mt-1">
              <div className="h-full w-0 rounded-full bg-accentSoft" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
