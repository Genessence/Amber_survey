'use client';

import {
  CRITICAL,
  SUCCESS,
  SUCCESS_LIGHT,
  WARNING,
  WARNING_DARK,
  getRiskMatrixStatus,
} from '@/lib/dashboard/theme';
import type { DashboardData } from '@/lib/dashboard/types';

const LEGEND = [
  { label: 'Excellent', color: SUCCESS },
  { label: 'Good', color: SUCCESS_LIGHT },
  { label: 'Monitoring', color: WARNING },
  { label: 'Attention Required', color: WARNING_DARK },
  { label: 'Critical', color: CRITICAL },
];

export function RiskMitigationMatrix({
  data,
  compact = false,
}: {
  data: DashboardData;
  compact?: boolean;
}) {
  const ranked = [...data.riskFlags].sort((a, b) => a.score - b.score);

  return (
    <>
      {!compact && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="section-title mb-0 flex-1">Risk Mitigation Matrix</div>
          <div className="matrix-legend">
            {LEGEND.map((item) => (
              <span key={item.label}>
                <span
                  className="matrix-legend-dot"
                  style={{ background: item.color }}
                />
                {item.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {compact && (
        <div className="stat-label mb-3">Risk Mitigation Matrix</div>
      )}

      <div className={compact ? 'risk-grid-compact' : 'risk-grid'}>
        {ranked.map((f) => {
          const status = getRiskMatrixStatus(f.score);
          return (
            <div key={f.key} className={`risk-card ${status.borderClass}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="risk-section">
                  {f.label.split(' ').slice(0, 2).join(' ')} ({f.section})
                </div>
                <span
                  className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold"
                  style={{
                    backgroundColor: status.color + '22',
                    color: status.color,
                  }}
                >
                  {f.score}%
                </span>
              </div>
              <div className="risk-q">{f.label}</div>
              <div className="risk-bar-wrap">
                <div
                  className="risk-bar"
                  style={{ width: `${f.score}%`, backgroundColor: status.color }}
                />
              </div>
              {!compact && (
                <div className="risk-score">{status.label}</div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
