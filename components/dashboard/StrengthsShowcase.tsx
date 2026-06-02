'use client';

import { getStrengths } from '@/lib/dashboard/insights';
import type { DashboardData } from '@/lib/dashboard/types';
import { Card } from './Card';

export function StrengthsShowcase({ data }: { data: DashboardData }) {
  const strengths = getStrengths(data);

  return (
    <Card>
      <h3 className="text-sm font-semibold text-stone-900">Strengths Showcase</h3>
      <p className="mb-4 mt-1 text-xs text-stone-400">Top 5 highest performing areas</p>
      <div className="space-y-3">
        {strengths.map((item, i) => (
          <div
            key={i}
            className="rounded-lg border border-[#EAF3DE] border-l-[3px] border-l-[#639922] bg-[#FAFDF7] p-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-xs font-semibold text-stone-800">{item.title}</div>
                <div className="mt-0.5 text-[11px] text-stone-500">{item.subtitle}</div>
              </div>
              <span className="shrink-0 text-sm font-bold text-[#639922]">{item.score}%</span>
            </div>
            <div className="mt-2 text-[11px] text-[#27500A]">
              ✓ Success highlight — maintain and replicate best practices
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
