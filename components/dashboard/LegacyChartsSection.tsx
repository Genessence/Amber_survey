'use client';

import { useMemo } from 'react';
import { Doughnut, Radar } from 'react-chartjs-2';
import {
  getActionText,
  getScoreColor,
  getRating,
  PERFORMANCE_TARGET,
  SECTIONS,
} from '@/lib/dashboard/constants';
import type { DashboardData } from '@/lib/dashboard/types';
import { ChartCard } from './Card';
import { SectionHeader } from './SectionHeader';
import './chartRegister';

function ScoreRing({ score }: { score: number }) {
  const col = getScoreColor(score);
  const circ = 2 * Math.PI * 20;
  const dash = (score / 100) * circ;

  return (
    <svg className="mx-auto mb-2 h-12 w-12 -rotate-90" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="20" fill="none" stroke="#F0EDE6" strokeWidth="5" />
      <circle
        cx="24"
        cy="24"
        r="20"
        fill="none"
        stroke={col}
        strokeWidth="5"
        strokeDasharray={`${dash.toFixed(1)} ${circ.toFixed(1)}`}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LegacyChartsSection({ data }: { data: DashboardData }) {
  const scores = useMemo(
    () => SECTIONS.map((s) => data.scores[s.id] ?? 0),
    [data.scores]
  );

  const radarData = {
    labels: SECTIONS.map((s) => s.shortName),
    datasets: [
      {
        data: scores,
        backgroundColor: 'rgba(186,117,23,.15)',
        borderColor: '#BA7517',
        borderWidth: 2,
        pointBackgroundColor: '#BA7517',
        pointRadius: 4,
      },
      {
        data: new Array(6).fill(PERFORMANCE_TARGET),
        backgroundColor: 'rgba(226,75,74,.05)',
        borderColor: 'rgba(226,75,74,.4)',
        borderWidth: 1,
        borderDash: [4, 4],
        pointRadius: 0,
        label: 'Target',
      },
    ],
  };

  const notResp = Math.max(data.totalSuppliers - data.total, 0);
  const rateData = {
    labels: ['Responded', 'Not Responded'],
    datasets: [
      {
        data: [data.total, notResp],
        backgroundColor: ['#BA7517', '#F0EDE6'],
        borderWidth: 0,
        borderRadius: 6,
      },
    ],
  };

  const rankedFlags = [...data.riskFlags].sort((a, b) => a.score - b.score);

  return (
    <>
      <SectionHeader title="Section-wise Performance" />
      <div className="mb-8 grid grid-cols-3 gap-2.5 sm:grid-cols-6">
        {SECTIONS.map((s, i) => {
          const sc = scores[i];
          const col = getScoreColor(sc);
          return (
            <div
              key={s.id}
              className="rounded-xl border border-surface-border bg-white p-4 text-center"
            >
              <ScoreRing score={sc} />
              <div className="text-xl font-bold" style={{ color: col }}>
                {s.label}
              </div>
              <div className="text-[10px] font-medium text-stone-400">{s.shortName}</div>
              <div className="mt-1 text-2xl font-semibold text-stone-900">{sc}%</div>
            </div>
          );
        })}
      </div>

      <ChartCard title="Score Distribution" subtitle="How sections compare — radar view">
        <div className="relative mx-auto h-[280px] max-w-lg">
          <Radar
            data={radarData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                r: {
                  min: 0,
                  max: 100,
                  ticks: { stepSize: 25, font: { size: 10 } },
                  grid: { color: 'rgba(0,0,0,.08)' },
                  pointLabels: { font: { size: 11 } },
                },
              },
            }}
          />
        </div>
      </ChartCard>

      <div className="mb-8 mt-8">
        <ChartCard title="Response Rate" subtitle="Supplier participation in the survey">
          <div className="relative mx-auto h-[220px] max-w-sm">
            <Doughnut
              data={rateData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                  legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 12 } },
                  tooltip: {
                    callbacks: {
                      label: (ctx: { label?: string; parsed: number }) =>
                        `${ctx.label}: ${ctx.parsed} suppliers`,
                    },
                  },
                },
              }}
            />
          </div>
        </ChartCard>
      </div>

      <SectionHeader title="Risk Flags & Action Areas" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rankedFlags.map((f) => {
          const cls =
            f.score < 50
              ? 'border-l-[#E24B4A]'
              : f.score < 75
                ? 'border-l-[#EF9F27]'
                : 'border-l-[#639922]';
          const icon = f.score < 50 ? '🚨' : f.score < 75 ? '⚠️' : '✅';
          const [rating] = getRating(f.score);
          return (
            <div
              key={f.key}
              className={`rounded-xl border border-surface-border border-l-[3px] bg-white p-4 ${cls}`}
            >
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-stone-400">
                {icon} Section {f.section}
              </div>
              <div className="mb-2 text-[13px] font-medium leading-snug text-stone-900">
                {f.label}
              </div>
              <div className="mb-1.5 h-1.5 overflow-hidden rounded-full bg-stone-100">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${f.score}%`,
                    backgroundColor: getScoreColor(f.score),
                  }}
                />
              </div>
              <div className="text-xs text-stone-500">
                {f.score}% &nbsp;|&nbsp; {rating}
              </div>
              <div className="mt-2 text-xs leading-relaxed text-stone-500">
                {getActionText(f.score)}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
