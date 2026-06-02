'use client';

import { useMemo } from 'react';
import { Radar } from 'react-chartjs-2';
import { PERFORMANCE_TARGET, SECTIONS } from '@/lib/dashboard/constants';
import { wrapSectionLabelMultiline } from '@/lib/dashboard/chartLabels';
import {
  BLUE_MED,
  BRAND_DARK,
  BRAND_PRIMARY,
  GRID_LINE,
} from '@/lib/dashboard/theme';
import type { DashboardData } from '@/lib/dashboard/types';
import { SectionScoresGrid } from './SectionScoresGrid';
import './chartRegister';

export function PerformanceAnalysisRow({ data }: { data: DashboardData }) {
  const scores = useMemo(
    () => SECTIONS.map((s) => data.scores[s.id] ?? 0),
    [data.scores]
  );

  const radarData = {
    labels: SECTIONS.map((s) => s.fullName),
    datasets: [
      {
        data: scores,
        backgroundColor: 'rgba(184, 204, 228, 0.35)',
        borderColor: BRAND_PRIMARY,
        borderWidth: 2,
        pointBackgroundColor: BRAND_PRIMARY,
        pointRadius: 4,
      },
      {
        data: new Array(6).fill(PERFORMANCE_TARGET),
        backgroundColor: 'transparent',
        borderColor: BLUE_MED,
        borderWidth: 1,
        borderDash: [4, 4],
        pointRadius: 0,
        label: 'Target',
      },
    ],
  };

  return (
    <div className="analysis-row">
      <div className="chart-card">
        <h3>Sector-Wise Performance Distribution</h3>
        <div className="chart-sub">How sections compare — radar view</div>
        <div className="chart-wrap tall">
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
                  ticks: {
                    stepSize: 25,
                    color: BRAND_DARK,
                    font: { size: 10, weight: 'bold' },
                  },
                  grid: { color: GRID_LINE },
                  pointLabels: {
                    color: BRAND_DARK,
                    font: { size: 8, weight: 'bold' },
                    padding: 4,
                    callback: (label) => wrapSectionLabelMultiline(String(label)),
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <SectionScoresGrid data={data} />
    </div>
  );
}
