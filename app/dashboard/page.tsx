'use client';

import { ContributionAnalysisRow } from '@/components/dashboard/ContributionAnalysisRow';
import { DashboardFooter, DashboardShell } from '@/components/dashboard/DashboardShell';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { HeroAnalyticsRow } from '@/components/dashboard/HeroAnalyticsRow';
import { PerformanceAnalysisRow } from '@/components/dashboard/PerformanceAnalysisRow';
import { ScoreLegendToggle } from '@/components/dashboard/ScoreLegendToggle';
import { TopKpiRow } from '@/components/dashboard/TopKpiRow';
import { useDashboardData } from '@/lib/dashboard/useDashboardData';

export default function DashboardPage() {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-amber-brand-700 border-t-transparent" />
            <p className="text-sm text-[#999]">Loading dashboard...</p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  if (error || !data) {
    return (
      <DashboardShell>
        <div className="flex min-h-screen items-center justify-center">
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm font-medium text-red-800">
              {error ?? 'Unable to load dashboard data'}
            </p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <DashboardHeader data={data} />

      <div className="dash-main dash-stack">
        {/* <ScoreLegendToggle /> */}
        <TopKpiRow data={data} />
        <HeroAnalyticsRow data={data} />
        <PerformanceAnalysisRow data={data} />
        <ContributionAnalysisRow data={data} />
      </div>

      <DashboardFooter />
    </DashboardShell>
  );
}
