import type { DashboardData } from '@/lib/dashboard/types';
import {
  BRAND_DARK,
  BRAND_LIGHT,
  BRAND_PRIMARY,
  BG_PAGE,
} from '@/lib/dashboard/theme';

export function DashboardHeader({ data }: { data: DashboardData }) {
  return (
    <header
      className="px-0 pb-6 pt-8"
      style={{
        background: `linear-gradient(135deg, ${BG_PAGE} 0%, ${BRAND_LIGHT} 50%, ${BRAND_PRIMARY} 100%)`,
        color: BRAND_DARK,
      }}
    >
      <div className="dash-main">
      <div className="flex items-center justify-between gap-4">
  <div>
    <p className="text-[13px]" style={{ color: BRAND_PRIMARY }}>
      Analytical review for period {data.period}
    </p>

    <h1
      className="mt-1 text-[22px] font-semibold tracking-tight"
      style={{ color: BRAND_DARK }}
    >
      Supplier Satisfaction Dashboard
    </h1>

    <p className="mt-1 text-[13px]" style={{ color: BRAND_PRIMARY }}>
      Amber — Survey Results | Compiled by Third-Party Agency
    </p>
  </div>

  <div className="flex items-center gap-3">
    <img
      src="https://vendor.ambercompliancesystem.com/assets/amber-logo-BvJV0paR.png"
      alt="Amber"
      className="h-12 w-auto object-contain"
    />
   
  </div>
</div>
      </div>
    </header>
  );
}
