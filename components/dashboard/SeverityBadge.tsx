import type { SeverityLevel } from '@/lib/dashboard/types';

const styles: Record<SeverityLevel, string> = {
  critical: 'bg-[#FCEBEB] text-[#791F1F] border-[#E24B4A]',
  high: 'bg-[#FFF3E0] text-[#8B4513] border-[#EF9F27]',
  medium: 'bg-[#FFFBE6] text-[#7A6200] border-[#F5C542]',
  low: 'bg-[#EAF3DE] text-[#27500A] border-[#639922]',
};

export function SeverityBadge({ level, label }: { level: SeverityLevel; label: string }) {
  return (
    <span
      className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${styles[level]}`}
    >
      {label}
    </span>
  );
}
