export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-xl font-semibold">Settings</h1>
        <p className="text-xs text-textSoft">
          Program, exercises, units, and heart rate settings.
        </p>
      </header>

      <div className="card space-y-3">
        <div>
          <div className="tile-title">Program</div>
          <p className="text-sm">Beginner Standard 3-Day</p>
        </div>
		<div>
  <div className="tile-title">Exercises</div>
  <a href="/settings/exercises" className="text-accent text-sm underline">
    Edit exercise selection
  </a>
</div>

        <div>
          <div className="tile-title">Units</div>
          <p className="text-sm text-textSoft">kg (change later)</p>
        </div>
        <div>
          <div className="tile-title">Heart Rate</div>
          <p className="text-xs text-textSoft">
            HRmax = 208 − (0.7 × Age). You can add age input and zone
            calculator here later.
          </p>
        </div>
      </div>
    </div>
  );
}
