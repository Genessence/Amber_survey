'use client';



import { useMemo } from 'react';

import { SECTIONS } from '@/lib/dashboard/constants';
import { getSectionBarColor, TEXT_SECONDARY } from '@/lib/dashboard/theme';

import type { DashboardData } from '@/lib/dashboard/types';



export function SectionScoresGrid({ data }: { data: DashboardData }) {

  const scores = useMemo(

    () => SECTIONS.map((s) => data.scores[s.id] ?? 0),

    [data.scores]

  );



  return (

    <div className="chart-card h-full">

      <h3>Section Scores A–F</h3>

      <div className="chart-sub">Score by department area</div>

      <div className="sec-mini-grid">

        {SECTIONS.map((s, i) => {

          const sc = scores[i];

          return (

            <div key={s.id} className="sec-mini-card">

              <div className="sec-mini-label">Section {s.label}</div>

              <div

                className="text-[11px] font-medium leading-snug"

                style={{ color: TEXT_SECONDARY }}

              >

                {s.fullName}

              </div>

              <div className="sec-mini-score">{sc}%</div>

              <div className="sec-bar-wrap">

                <div

                  className="sec-bar"

                  style={{ width: `${sc}%`, backgroundColor: getSectionBarColor(sc) }}

                />

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );

}


