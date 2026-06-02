'use client';

import { buildExecutiveSummary } from '@/lib/dashboard/insights';
import type { DashboardData } from '@/lib/dashboard/types';
import { Card } from './Card';

const pillStyles: Record<string, string> = {
  'pill-green': 'bg-[#EAF3DE] text-[#27500A]',
  'pill-blue': 'bg-[#E6F1FB] text-[#0C447C]',
  'pill-amber': 'bg-[#FAEEDA] text-[#633806]',
  'pill-red': 'bg-[#FCEBEB] text-[#791F1F]',
};

export function ExecutiveSummaryPanel({ data }: { data: DashboardData }) {
  const summary = buildExecutiveSummary(data);

  return (
    <Card className="relative overflow-hidden border-l-4 border-l-amber-brand-700">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-stone-900">Executive Summary</h3>
          <p className="text-xs text-stone-400">AI-generated insights from survey data</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${pillStyles[summary.healthClass]}`}
        >
          {summary.healthLabel}
        </span>
      </div>
      <p className="mb-6 text-sm leading-relaxed text-stone-700">{summary.narrative}</p>
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#27500A]">
            Key Strengths
          </h4>
          <ul className="space-y-2">
            {summary.strengths.map((s, i) => (
              <li key={i} className="flex gap-2 text-xs leading-relaxed text-stone-600">
                <span className="text-[#639922]">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#791F1F]">
            Key Concerns
          </h4>
          <ul className="space-y-2">
            {summary.concerns.map((c, i) => (
              <li key={i} className="flex gap-2 text-xs leading-relaxed text-stone-600">
                <span className="text-[#E24B4A]">!</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-amber-brand-700">
            Recommended Actions
          </h4>
          <ul className="space-y-2">
            {summary.actions.map((a, i) => (
              <li key={i} className="flex gap-2 text-xs leading-relaxed text-stone-600">
                <span className="text-amber-brand-700">→</span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
