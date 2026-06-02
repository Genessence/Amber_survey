'use client';

import { useEffect, useRef, useState } from 'react';

const bands = [
  { color: '#639922', range: '85–100 — Excellent', desc: 'Suppliers are highly satisfied. Maintain current practices.' },
  { color: '#378ADD', range: '70–84 — Good', desc: 'Strong performance. Minor improvements can be made.' },
  { color: '#EF9F27', range: '50–69 — Needs Improvement', desc: 'Specific gaps exist. Create an action plan.' },
  { color: '#E24B4A', range: 'Below 50 — Critical', desc: 'Immediate action required. Escalate to leadership.' },
];

export function ScoreLegendToggle() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg border border-[#e5e2db] bg-white px-4 py-2.5 text-left shadow-sm transition-colors hover:bg-[#FAFAF8]"
        aria-expanded={open}
        aria-label="Toggle score interpretation legend"
      >
        <span className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#BA7517]">
            Score Legend
          </span>
          <span className="hidden items-center gap-1.5 sm:flex">
            {bands.map((band) => (
              <span
                key={band.range}
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: band.color }}
                title={band.range}
              />
            ))}
          </span>
        </span>
        <span
          className={`text-stone-400 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="mt-2 rounded-xl border border-[#e5e2db] bg-white p-4 shadow-sm">
          <p className="mb-3 text-xs text-stone-400">How to read section scores</p>
          {bands.map((band, i) => (
            <div
              key={i}
              className={`flex items-center gap-2.5 py-2.5 ${i < bands.length - 1 ? 'border-b border-stone-100' : ''}`}
            >
              <div
                className="h-3 w-3 shrink-0 rounded-sm"
                style={{ backgroundColor: band.color }}
              />
              <div>
                <div className="text-[13px] font-medium text-stone-800">{band.range}</div>
                <div className="text-xs text-stone-500">{band.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
