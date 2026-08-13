const ScoreGauge = ({ score, size = 'lg' }) => {
  const radius = size === 'lg' ? 54 : 40;
  const stroke = size === 'lg' ? 10 : 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = Math.min(Math.max(score, 0), 100);
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const scoreColor =
    progress >= 75
      ? 'text-emerald-500'
      : progress >= 50
        ? 'text-amber-500'
        : 'text-rose-500';

  const dimension = radius * 2;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: dimension, height: dimension }}>
        <svg width={dimension} height={dimension} className="-rotate-90">
          <circle
            stroke="currentColor"
            className="text-slate-100"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="currentColor"
            className={`${scoreColor} transition-all duration-700 ease-out`}
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`font-bold ${size === 'lg' ? 'text-3xl' : 'text-xl'} text-slate-900`}
          >
            {progress}
          </span>
          <span className="text-xs text-slate-500">/ 100</span>
        </div>
      </div>
      <p className="mt-3 text-center text-sm font-medium text-slate-700">
        Resume–Job Match Score
      </p>
      <p className="mt-1 max-w-xs text-center text-xs text-slate-500">
        How well your resume aligns with the target job description
      </p>
    </div>
  );
};

export default ScoreGauge;
