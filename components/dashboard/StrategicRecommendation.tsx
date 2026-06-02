'use client';

import { buildExecutiveSummary } from '@/lib/dashboard/insights';
import type { DashboardData } from '@/lib/dashboard/types';

export function StrategicRecommendation({ data }: { data: DashboardData }) {
  const summary = buildExecutiveSummary(data);

  return (
    <div className="strategic-card">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <span className="text-xl" aria-hidden>
          💡
        </span>
        <div>
          <div className="text-sm font-semibold text-[#1a1a1a]">Strategic Recommendation</div>
          <p className="mt-1 text-xs leading-relaxed text-[#666]">{summary.narrative}</p>
        </div>
      </div>
      <button
        type="button"
        className="shrink-0 rounded-lg border border-[#e5e2db] bg-[#FAFAF8] px-4 py-2 text-xs font-semibold text-[#1a1a1a] transition-colors hover:bg-[#F0EDE6]"
      >
        Review Action Plan
      </button>
    </div>
  );
}
