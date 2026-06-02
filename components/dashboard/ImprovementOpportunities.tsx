'use client';

import { getImprovementItems } from '@/lib/dashboard/insights';
import type { DashboardData } from '@/lib/dashboard/types';
import { Card } from './Card';
import { SeverityBadge } from './SeverityBadge';

export function ImprovementOpportunities({ data }: { data: DashboardData }) {
  const items = getImprovementItems(data.riskFlags);

  return (
    <Card>
      <h3 className="text-sm font-semibold text-stone-900">Improvement Opportunities</h3>
      <p className="mb-4 mt-1 text-xs text-stone-400">
        Lowest scoring questions prioritized for action
      </p>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.rank}
            className="rounded-lg border border-surface-border p-3"
          >
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-amber-brand-700 text-[10px] font-bold text-white">
                {item.rank}
              </span>
              <SeverityBadge level={item.severity} label={item.severity} />
              <span className="text-[10px] font-semibold uppercase text-stone-400">
                Section {item.section}
              </span>
              {item.severity === 'critical' && (
                <span className="rounded bg-[#FAEEDA] px-1.5 py-0.5 text-[10px] font-semibold text-amber-brand-800">
                  Priority
                </span>
              )}
            </div>
            <div className="text-xs font-medium text-stone-800">{item.label}</div>
            <div className="mt-1 text-sm font-semibold text-stone-900">{item.score}%</div>
            <div className="mt-2 text-[11px] leading-relaxed text-stone-500">{item.action}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
