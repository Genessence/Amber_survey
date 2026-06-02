'use client';

import { Doughnut } from 'react-chartjs-2';
import { getSectionContribution } from '@/lib/dashboard/insights';
import type { DashboardData } from '@/lib/dashboard/types';
import { ChartCard } from './Card';
import './chartRegister';

export function SectionContributionChart({ data }: { data: DashboardData }) {
  const items = getSectionContribution(data);

  const chartData = {
    labels: items.map((i) => `Sec ${i.section.label} — ${i.section.shortName}`),
    datasets: [
      {
        data: items.map((i) => i.share),
        backgroundColor: items.map((i) => i.section.color),
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 4,
      },
    ],
  };

  return (
    <ChartCard
      title="Section Contribution Chart"
      subtitle="Proportional share of each section in combined satisfaction scores"
    >
      <div className="relative mx-auto mb-4 h-[220px] max-w-sm">
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            cutout: '55%',
            plugins: {
              legend: {
                position: 'bottom',
                labels: { font: { size: 10 }, padding: 10, boxWidth: 12 },
              },
              tooltip: {
                callbacks: {
                  label: (ctx) => {
                    const item = items[ctx.dataIndex];
                    return `${item.section.shortName}: ${item.score}% score, ${item.share}% share`;
                  },
                },
              },
            },
          }}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-stone-100 text-left text-stone-400">
              <th className="pb-2 font-semibold">Section</th>
              <th className="pb-2 font-semibold">Score</th>
              <th className="pb-2 font-semibold">Share</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.section.id} className="border-b border-stone-50">
                <td className="py-2 font-medium text-stone-800">
                  <span
                    className="mr-2 inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.section.color }}
                  />
                  {item.section.label} — {item.section.shortName}
                </td>
                <td className="py-2">{item.score}%</td>
                <td className="py-2 font-semibold text-stone-700">{item.share}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartCard>
  );
}
