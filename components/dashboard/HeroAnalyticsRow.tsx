'use client';

import { Doughnut } from 'react-chartjs-2';
import {
  BORDER,
  BRAND_DARK,
  getOverallKpiLabel,
  getOverallKpiPillClass,
  getResponseGaugeColor,
  getSatisfactionGaugeColor,
  TEXT_SECONDARY,
} from '@/lib/dashboard/theme';
import type { DashboardData } from '@/lib/dashboard/types';
import { RiskMitigationMatrix } from './RiskMitigationMatrix';
import './chartRegister';

function OverallRing({ score }: { score: number }) {
  const col = getSatisfactionGaugeColor(score);
  const circ = 2 * Math.PI * 52;
  const dash = (score / 100) * circ;

  return (
    <div className="relative mx-auto mb-1" style={{ width: 120, height: 120 }}>
      <svg className="overall-ring-lg -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="52" fill="none" stroke={BORDER} strokeWidth="8" />
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke={col}
          strokeWidth="8"
          strokeDasharray={`${dash.toFixed(1)} ${circ.toFixed(1)}`}
          strokeLinecap="round"
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center text-[22px] font-semibold"
        style={{ color: BRAND_DARK }}
      >
        {score}%
      </div>
    </div>
  );
}

export function HeroAnalyticsRow({ data }: { data: DashboardData }) {
  const pillClass = getOverallKpiPillClass(data.overall);
  const pillLabel = getOverallKpiLabel(data.overall);
  const notResp = Math.max(data.totalSuppliers - data.total, 0);
  const rate =
    data.totalSuppliers > 0
      ? Math.round((data.total / data.totalSuppliers) * 100)
      : 0;

  const rateData = {
    labels: ['Responded', 'Not Responded'],
    datasets: [
      {
        data: [data.total, notResp],
        backgroundColor: [getResponseGaugeColor(rate), BORDER],
        borderWidth: 0,
        borderRadius: 6,
      },
    ],
  };

  const summaryText =
    data.overall >= 85
      ? 'Aggregate health across all sectors remains above the 85% target threshold.'
      : data.overall >= 70
        ? 'Overall satisfaction is in the good range with room for targeted improvements.'
        : 'Overall satisfaction requires attention — review priority improvement areas below.';

  return (
    <div className="hero-stack">
      <div className="hero-top-row">
        <div className="hero-col hero-col-compact text-center">
          <div className="flex flex-col items-center gap-1">
            <div className="stat-label">Overall Satisfaction Score</div>
            <OverallRing score={data.overall} />
            <span className={`stat-pill ${pillClass}`}>{pillLabel}</span>
            <p className="mt-2 text-xs leading-relaxed" style={{ color: TEXT_SECONDARY }}>
              {summaryText}
            </p>
          </div>
        </div>

        <div className="hero-col hero-col-compact text-center">
          <div className="flex flex-col items-center gap-1">
            <div className="stat-label">Response Rate</div>
            <div className="hero-chart-wrap">
              <Doughnut
                data={rateData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: '70%',
                  plugins: {
                    legend: { display: false },
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
            <div className="stat-sub">
              {data.total} of {data.totalSuppliers} suppliers
            </div>
            <span className="stat-pill pill-brand">Data Validity: High</span>
          </div>
        </div>
      </div>

      <div className="hero-col">
        <RiskMitigationMatrix data={data} />
      </div>
    </div>
  );
}
