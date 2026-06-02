import type { ReactNode } from 'react';

export function Card({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`chart-card ${className}`}>{children}</div>;
}

export function ChartCard({
  title,
  subtitle,
  children,
  className = '',
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`chart-card ${className}`}>
      <h3>{title}</h3>
      {subtitle && <div className="chart-sub">{subtitle}</div>}
      {!subtitle && <div className="mb-4" />}
      {children}
    </div>
  );
}
