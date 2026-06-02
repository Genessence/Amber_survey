'use client';

import type { TrendSeries } from '@/lib/dashboard/types';
import { ChartCard } from './Card';
import { EmptyTrendState } from './EmptyTrendState';

export function TrendReadySection({ trends }: { trends?: TrendSeries[] }) {
  const hasData = trends && trends.length > 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <ChartCard title="Overall Trend" subtitle="Monthly overall satisfaction score">
        {hasData ? (
          <p className="text-xs text-stone-500">Trend data loaded — chart ready for expansion</p>
        ) : (
          <EmptyTrendState title="Overall satisfaction over time" />
        )}
      </ChartCard>
      <ChartCard title="Section Trends" subtitle="Department scores by period">
        {hasData ? (
          <p className="text-xs text-stone-500">Trend data loaded — chart ready for expansion</p>
        ) : (
          <EmptyTrendState title="Section-wise monthly comparison" />
        )}
      </ChartCard>
      <ChartCard title="Risk Trend" subtitle="Risk flag scores over time">
        {hasData ? (
          <p className="text-xs text-stone-500">Trend data loaded — chart ready for expansion</p>
        ) : (
          <EmptyTrendState title="Risk severity tracking" />
        )}
      </ChartCard>
    </div>
  );
}
