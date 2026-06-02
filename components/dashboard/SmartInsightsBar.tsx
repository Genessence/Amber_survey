'use client';

import { buildSmartInsights } from '@/lib/dashboard/insights';
import type { DashboardData } from '@/lib/dashboard/types';
import { InsightPill } from './InsightPill';

export function SmartInsightsBar({ data }: { data: DashboardData }) {
  const insights = buildSmartInsights(data);

  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {insights.map((insight, i) => (
        <InsightPill key={i} icon={insight.icon} label={insight.label} value={insight.value} />
      ))}
    </div>
  );
}
