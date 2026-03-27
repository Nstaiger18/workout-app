export default function ConditioningPage() {
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-xl font-semibold">Conditioning</h1>
        <p className="text-xs text-textSoft">
          Log MICT, HIIT, or SIT sessions with zones and RPE.
        </p>
      </header>

      <div className="card">
        <div className="tile-title">Today</div>
        <p className="mt-1 text-sm text-textSoft">
          Zone 2 · 30 min · MICT (steady state).
        </p>
        <button className="btn-primary mt-3 w-full">Log Session</button>
      </div>
    </div>
  );
}
