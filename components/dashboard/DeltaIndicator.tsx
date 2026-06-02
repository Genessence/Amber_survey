import { CRITICAL, NEUTRAL, SUCCESS } from '@/lib/dashboard/theme';

export function DeltaIndicator({ delta, suffix = 'pts' }: { delta: number; suffix?: string }) {
  const color = delta > 0 ? SUCCESS : delta < 0 ? CRITICAL : NEUTRAL;

  return (
    <span className="text-xs font-semibold" style={{ color }}>
      {delta > 0 ? '+' : ''}
      {delta}
      {suffix ? ` ${suffix}` : ''}
    </span>
  );
}
