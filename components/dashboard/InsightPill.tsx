export function InsightPill({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex shrink-0 items-center gap-2 rounded-lg border border-surface-border bg-white px-4 py-2.5 shadow-sm">
      <span className="text-base">{icon}</span>
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-wide text-stone-400">
          {label}
        </div>
        <div className="text-xs font-medium text-stone-800">{value}</div>
      </div>
    </div>
  );
}
