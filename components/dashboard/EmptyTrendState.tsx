export function EmptyTrendState({ title }: { title: string }) {
  return (
    <div className="flex h-[180px] flex-col items-center justify-center rounded-lg border border-dashed border-stone-200 bg-stone-50">
      <svg
        className="mb-3 h-16 w-full max-w-[200px] opacity-30"
        viewBox="0 0 200 60"
        fill="none"
      >
        <path
          d="M10 45 L50 35 L90 40 L130 20 L190 25"
          stroke="#BA7517"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        {[10, 50, 90, 130, 190].map((x, i) => (
          <circle key={i} cx={x} cy={[45, 35, 40, 20, 25][i]} r="3" fill="#BA7517" opacity="0.5" />
        ))}
      </svg>
      <p className="text-xs font-medium text-stone-500">{title}</p>
      <p className="mt-1 text-[11px] text-stone-400">Historical data will appear here</p>
    </div>
  );
}
