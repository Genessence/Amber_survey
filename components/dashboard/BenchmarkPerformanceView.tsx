'use client';

import { Chart as MixedChart } from 'react-chartjs-2';
import {
  getScoreColor,
  INDUSTRY_BENCHMARK,
  INTERNAL_TARGET,
  SECTIONS,
} from '@/lib/dashboard/constants';
import { getBenchmarkComparison } from '@/lib/dashboard/insights';
import type { DashboardData } from '@/lib/dashboard/types';
import { ChartCard } from './Card';
import './chartRegister';

const statusLabels = {
  'above-both': { text: 'Above Both', class: 'bg-[#EAF3DE] text-[#27500A]' },
  'above-industry': { text: 'Above Industry', class: 'bg-[#E6F1FB] text-[#0C447C]' },
  'below-industry': { text: 'Below Industry', class: 'bg-[#FCEBEB] text-[#791F1F]' },
};

export function BenchmarkPerformanceView({ data }: { data: DashboardData }) {
  const items = getBenchmarkComparison(data);

  const chartData = {
    labels: SECTIONS.map((s) => s.shortName),
    datasets: [
      {
        label: 'Section Score',
        data: items.map((i) => i.score),
        backgroundColor: items.map((i) => getScoreColor(i.score) + '55'),
        borderColor: items.map((i) => getScoreColor(i.score)),
        borderWidth: 2,
        borderRadius: 4,
      },
      {
        label: `Industry (${INDUSTRY_BENCHMARK}%)`,
        data: SECTIONS.map(() => INDUSTRY_BENCHMARK),
        type: 'line' as const,
        borderColor: '#378ADD',
        borderWidth: 1.5,
        borderDash: [4, 4],
        pointRadius: 0,
        fill: false,
      },
      {
        label: `Internal Target (${INTERNAL_TARGET}%)`,
        data: SECTIONS.map(() => INTERNAL_TARGET),
        type: 'line' as const,
        borderColor: '#639922',
        borderWidth: 1.5,
        borderDash: [4, 4],
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  return (
    <ChartCard
      title="Benchmark Performance View"
      subtitle={`Section scores vs industry benchmark (${INDUSTRY_BENCHMARK}%) and internal target (${INTERNAL_TARGET}%)`}
    >
      <div className="relative mb-4 h-[280px]">
        <MixedChart
          type="bar"
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'bottom', labels: { font: { size: 10 }, padding: 12 } },
            },
            scales: {
              y: {
                min: 0,
                max: 100,
                grid: { color: 'rgba(0,0,0,0.05)' },
                ticks: { callback: (v) => `${v}%`, font: { size: 10 } },
              },
              x: { grid: { display: false }, ticks: { font: { size: 10 } } },
            },
          }}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item.section.id}
            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusLabels[item.status].class}`}
          >
            Sec {item.section.label}: {statusLabels[item.status].text}
          </span>
        ))}
      </div>
    </ChartCard>
  );
}
