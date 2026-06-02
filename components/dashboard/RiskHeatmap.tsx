'use client';

import { getHeatmapColor, getRating } from '@/lib/dashboard/constants';
import type { DashboardData } from '@/lib/dashboard/types';
import { Card } from './Card';

export function RiskHeatmap({ data }: { data: DashboardData }) {
  const sorted = [...data.riskFlags].sort((a, b) => a.score - b.score);

  return (
    <Card>
      <h3 className="text-sm font-semibold text-stone-900">Risk Heatmap</h3>
      <p className="mb-4 mt-1 text-xs text-stone-400">
        Color-coded risk flags sorted by severity
      </p>
      <div className="mb-3 flex flex-wrap gap-3 text-[10px] text-stone-500">
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-[#E24B4A]" /> Critical (&lt;50)
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-[#EF9F27]" /> Warning (50–69)
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-[#F5C542]" /> Moderate (70–84)
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-[#639922]" /> Healthy (≥85)
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {sorted.map((flag) => {
          const [rating] = getRating(flag.score);
          return (
            <div
              key={flag.key}
              className="group relative rounded-lg p-3 text-white transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: getHeatmapColor(flag.score) }}
              title={`${flag.label} — ${flag.score}%`}
            >
              <div className="text-[10px] font-semibold uppercase opacity-80">
                Sec {flag.section}
              </div>
              <div className="mt-1 text-[11px] font-medium leading-snug">{flag.label}</div>
              <div className="mt-2 text-lg font-bold">{flag.score}%</div>
              <div className="text-[10px] opacity-80">{rating}</div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
