'use client';

import { RESPONSE_TARGET } from '@/lib/dashboard/constants';
import {
  getOverallKpiColor,
  getOverallKpiLabel,
  getOverallKpiPillClass,
} from '@/lib/dashboard/theme';
import { rankSections } from '@/lib/dashboard/insights';
import type { DashboardData } from '@/lib/dashboard/types';
import { KpiCard } from './KpiCard';

export function TopKpiRow({ data }: { data: DashboardData }) {
  const ranked = rankSections(data);
  const best = ranked[0];
  const worst = ranked[ranked.length - 1];
  const rate =
    data.totalSuppliers > 0
      ? Math.round((data.total / data.totalSuppliers) * 100)
      : 0;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
      <KpiCard
        label="Overall Score"
        value={`${data.overall}%`}
        subtext="out of 100"
        pill={getOverallKpiLabel(data.overall)}
        pillClass={getOverallKpiPillClass(data.overall)}
        valueColor={getOverallKpiColor(data.overall)}
      />
      <KpiCard
        label="Response Rate"
        value={`${rate}%`}
        subtext={`${data.total} of ${data.totalSuppliers} suppliers`}
        pill={rate >= RESPONSE_TARGET ? 'Target Met' : 'Below Target (75%)'}
        pillClass={rate >= RESPONSE_TARGET ? 'pill-brand' : 'pill-warning'}
      />
      <KpiCard
        label="Strongest Area"
        value={best.fullName}
        subtext="highest section score"
        pill={`${best.score}%`}
        pillClass="pill-excellent"
        valueClassName="compact"
      />
      <KpiCard
        label="Needs Attention"
        value={worst.fullName}
        subtext="lowest section score"
        pill={`${worst.score}%`}
        pillClass={getOverallKpiPillClass(worst.score)}
        valueClassName="compact"
      />
    </div>
  );
}
