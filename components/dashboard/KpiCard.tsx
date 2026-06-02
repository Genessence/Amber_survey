const pillStyles: Record<string, string> = {
  'pill-green': 'pill-green',
  'pill-blue': 'pill-blue',
  'pill-amber': 'pill-amber',
  'pill-red': 'pill-red',
  'pill-excellent': 'pill-excellent',
  'pill-good': 'pill-good',
  'pill-warning': 'pill-warning',
  'pill-critical': 'pill-critical',
  'pill-brand': 'pill-brand',
};

export function KpiCard({
  label,
  value,
  subtext,
  pill,
  pillClass = 'pill-blue',
  valueClassName = '',
  valueColor,
}: {
  label: string;
  value: string;
  subtext?: string;
  pill?: string;
  pillClass?: string;
  valueClassName?: string;
  valueColor?: string;
}) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div
        className={`stat-val ${valueClassName}`}
        style={valueColor ? { color: valueColor } : undefined}
      >
        {value}
      </div>
      {subtext && <div className="stat-sub">{subtext}</div>}
      {pill && (
        <span className={`stat-pill ${pillStyles[pillClass] ?? 'pill-brand'}`}>{pill}</span>
      )}
    </div>
  );
}
