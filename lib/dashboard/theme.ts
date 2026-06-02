// Brand
export const BRAND_PRIMARY = '#4F81BD';
export const BRAND_LIGHT = '#B8CCE4';
export const BRAND_DARK = '#1F3A5F';

// Neutrals
export const BG_PAGE = '#F7F9FC';
export const BG_CARD = '#FFFFFF';
export const BORDER = '#E5EAF2';
export const TEXT_SECONDARY = '#6B7280';

// Status
export const SUCCESS = '#2E7D32';
export const SUCCESS_LIGHT = '#66BB6A';
export const WARNING = '#FFB300';
export const WARNING_DARK = '#FB8C00';
export const CRITICAL = '#E53935';
export const NEUTRAL = '#90A4AE';

// Chart-specific blues
export const BLUE_HIGH = '#4F81BD';
export const BLUE_MED = '#6D9EEB';
export const BLUE_LOW = '#B8CCE4';
export const BLUE_BAR_90 = '#4F81BD';
export const BLUE_BAR_85 = '#6D9EEB';
export const BLUE_BAR_80 = '#9CC2E5';
export const BLUE_BAR_BELOW = '#D6E4F0';
export const GRID_LINE = '#D9E2F2';
export const GAP_NEUTRAL = '#B0BEC5';

export type RiskMatrixTier =
  | 'excellent'
  | 'good'
  | 'monitoring'
  | 'attention'
  | 'critical';

export function getOverallKpiColor(score: number): string {
  if (score >= 90) return SUCCESS;
  if (score >= 80) return SUCCESS_LIGHT;
  if (score >= 70) return WARNING;
  return CRITICAL;
}

export function getOverallKpiPillClass(score: number): string {
  if (score >= 90) return 'pill-excellent';
  if (score >= 80) return 'pill-good';
  if (score >= 70) return 'pill-warning';
  return 'pill-critical';
}

export function getOverallKpiLabel(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Good';
  if (score >= 70) return 'Needs Improvement';
  return 'Critical';
}

export function getResponseRateColor(rate: number): string {
  if (rate >= 75) return BLUE_HIGH;
  if (rate >= 50) return BLUE_MED;
  return BLUE_LOW;
}

function gaugeSpectrumColor(value: number): string {
  if (value < 50) return CRITICAL;
  if (value < 70) return WARNING;
  if (value < 85) return BLUE_MED;
  return BRAND_PRIMARY;
}

export function getSatisfactionGaugeColor(score: number): string {
  return gaugeSpectrumColor(score);
}

export function getResponseGaugeColor(rate: number): string {
  return gaugeSpectrumColor(rate);
}

export function getSectionBarColor(score: number): string {
  if (score >= 90) return BLUE_BAR_90;
  if (score >= 85) return BLUE_BAR_85;
  if (score >= 80) return BLUE_BAR_80;
  return BLUE_BAR_BELOW;
}

export function getGapColors(delta: number): { bg: string; border: string } {
  if (delta > 0) return { bg: `${BRAND_PRIMARY}55`, border: BRAND_PRIMARY };
  if (delta < 0) return { bg: `${CRITICAL}55`, border: CRITICAL };
  return { bg: `${GAP_NEUTRAL}55`, border: GAP_NEUTRAL };
}

export function getGapStatusColor(delta: number): string {
  if (delta > 0) return BRAND_PRIMARY;
  if (delta < 0) return CRITICAL;
  return GAP_NEUTRAL;
}

export function getRiskMatrixStatus(score: number): {
  label: string;
  color: string;
  borderClass: RiskMatrixTier;
} {
  if (score >= 90) {
    return { label: 'Excellent', color: SUCCESS, borderClass: 'excellent' };
  }
  if (score >= 80) {
    return { label: 'Good', color: SUCCESS_LIGHT, borderClass: 'good' };
  }
  if (score >= 70) {
    return { label: 'Monitoring', color: WARNING, borderClass: 'monitoring' };
  }
  if (score >= 50) {
    return {
      label: 'Attention Required',
      color: WARNING_DARK,
      borderClass: 'attention',
    };
  }
  return { label: 'Critical', color: CRITICAL, borderClass: 'critical' };
}
