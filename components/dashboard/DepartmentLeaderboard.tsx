'use client';

import { Bar } from 'react-chartjs-2';
import { getScoreColor } from '@/lib/dashboard/constants';
import { rankSections } from '@/lib/dashboard/insights';
import type { DashboardData } from '@/lib/dashboard/types';
import { ChartCard } from './Card';
import { DeltaIndicator } from './DeltaIndicator';
import { MedalRank } from './MedalRank';
import './chartRegister';

export function DepartmentLeaderboard({ data }: { data: DashboardData }) {
  const ranked = rankSections(data);
  const maxScore = Math.max(...ranked.map((r) => r.score), 100);

  const chartData = {
    labels: ranked.map((r) => `Sec ${r.label} — ${r.shortName}`),
    datasets: [
      {
        data: ranked.map((r) => r.score),
        backgroundColor: ranked.map((r) => getScoreColor(r.score) + '33'),
        borderColor: ranked.map((r) => getScoreColor(r.score)),
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  return (
    <ChartCard
      title="Department Ranking Leaderboard"
      subtitle="Sections ranked by score with variance from overall average"
    >
      <div className="mb-4 space-y-2">
        {ranked.map((r) => (
          <div key={r.id} className="flex items-center gap-3">
            <MedalRank rank={r.rank} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-xs font-medium text-stone-800">
                  Section {r.label} — {r.shortName}
                </span>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-sm font-semibold text-stone-900">{r.score}%</span>
                  <DeltaIndicator delta={r.delta} />
                </div>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-stone-100">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(r.score / maxScore) * 100}%`,
                    backgroundColor: getScoreColor(r.score),
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative h-[220px]">
        <Bar
          data={chartData}
          options={{
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: {
                min: 0,
                max: 100,
                grid: { color: 'rgba(0,0,0,0.05)' },
                ticks: { callback: (v) => `${v}%`, font: { size: 10 } },
              },
              y: { grid: { display: false }, ticks: { font: { size: 10 } } },
            },
          }}
        />
      </div>
    </ChartCard>
  );
}
