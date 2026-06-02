'use client';

import type { DashboardData } from '@/lib/dashboard/types';
import { GapAnalysisChart } from './GapAnalysisChart';
import { SectionHeader } from './SectionHeader';

export function ContributionAnalysisRow({ data }: { data: DashboardData }) {
  return (
    <div className="chart-row-full">
      <SectionHeader title="Satisfaction Gap Analysis" />
      <GapAnalysisChart data={data} />
    </div>
  );
}
