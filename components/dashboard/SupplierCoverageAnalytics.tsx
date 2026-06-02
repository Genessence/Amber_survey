'use client';

import type { DashboardData } from '@/lib/dashboard/types';
import { KpiCard } from './KpiCard';

export function SupplierCoverageAnalytics({ data }: { data: DashboardData }) {
  const participationRate =
    data.totalSuppliers > 0
      ? Math.round((data.total / data.totalSuppliers) * 100)
      : 0;
  const plantCompletionRate =
    data.totalPlants > 0
      ? Math.round((data.submittedPlants / data.totalPlants) * 100)
      : 0;

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <KpiCard
        label="Total Suppliers"
        value={String(data.totalSuppliers)}
        subtext="Invited supplier pool"
      />
      <KpiCard
        label="Total Plants"
        value={String(data.totalPlants)}
        subtext="Across supplier network"
      />
      <KpiCard
        label="Response Coverage"
        value={String(data.total)}
        subtext={`${participationRate}% participation rate`}
        pill={participationRate >= 75 ? 'Strong Coverage' : 'Expand Outreach'}
        pillClass={participationRate >= 75 ? 'pill-green' : 'pill-amber'}
      />
      <KpiCard
        label="Plant Completion"
        value={`${plantCompletionRate}%`}
        subtext={`${data.submittedPlants} of ${data.totalPlants} plants submitted`}
        pill="Completion Metric"
        pillClass="pill-blue"
      />
    </div>
  );
}
