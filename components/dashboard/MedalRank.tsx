export function MedalRank({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-lg" title="1st">🥇</span>;
  if (rank === 2) return <span className="text-lg" title="2nd">🥈</span>;
  if (rank === 3) return <span className="text-lg" title="3rd">🥉</span>;
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-100 text-xs font-semibold text-stone-500">
      {rank}
    </span>
  );
}
