'use client';

import { Doughnut } from 'react-chartjs-2';
import { categorizeRisks } from '@/lib/dashboard/insights';
import type { DashboardData } from '@/lib/dashboard/types';
import { Card } from './Card';
import './chartRegister';

const levelColors: Record<string, string> = {
  critical: '#E24B4A',
  high: '#EF9F27',
  medium: '#F5C542',
  low: '#639922',
};

export function RiskSeverityMatrix({ data }: { data: DashboardData }) {
  const categories = categorizeRisks(data.riskFlags);

  const chartData = {
    labels: categories.map((c) => c.label),
    datasets: [
      {
        data: categories.map((c) => c.count),
        backgroundColor: categories.map((c) => levelColors[c.level]),
        borderWidth: 0,
        borderRadius: 4,
      },
    ],
  };

  return (
    <Card>
      <h3 className="text-sm font-semibold text-stone-900">Risk Severity Matrix</h3>
      <p className="mb-4 mt-1 text-xs text-stone-400">
        Distribution of risk flags by severity level
      </p>
      <div className="relative mx-auto mb-4 h-[160px] max-w-[200px]">
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
              legend: { display: false },
            },
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => (
          <div
            key={cat.level}
            className="rounded-lg border border-surface-border p-3 text-center"
            style={{ borderLeftWidth: 3, borderLeftColor: levelColors[cat.level] }}
          >
            <div className="text-[10px] font-semibold uppercase tracking-wide text-stone-400">
              {cat.label}
            </div>
            <div className="mt-1 text-2xl font-bold text-stone-900">{cat.count}</div>
            <div className="text-xs text-stone-500">{cat.percentage}% of flags</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
