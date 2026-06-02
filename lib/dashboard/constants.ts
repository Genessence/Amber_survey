import type { SectionMeta, SeverityLevel } from './types';
import {
  getOverallKpiLabel,
  getOverallKpiPillClass,
  getRiskMatrixStatus,
  getSectionBarColor,
} from './theme';

export * from './theme';

export const SECTIONS: SectionMeta[] = [
  {
    id: 'a',
    label: 'A',
    shortName: 'Relationship',
    fullName: 'General Relationship & Communication',
    color: '#BA7517',
  },
  {
    id: 'b',
    label: 'B',
    shortName: 'Procurement',
    fullName: 'Plant & Procurement Process',
    color: '#185FA5',
  },
  {
    id: 'c',
    label: 'C',
    shortName: 'Finance',
    fullName: 'Finance & Accounts Department',
    color: '#534AB7',
  },
  {
    id: 'd',
    label: 'D',
    shortName: 'Quality',
    fullName: 'Quality Department',
    color: '#993556',
  },
  {
    id: 'e',
    label: 'E',
    shortName: 'Sourcing',
    fullName: 'Sourcing & Strategic Engagement',
    color: '#712B13',
  },
  {
    id: 'f',
    label: 'F',
    shortName: 'Overall',
    fullName: 'Overall & Strategic Outlook',
    color: '#3B6D11',
  },
];

export const INDUSTRY_BENCHMARK = 85;
export const INTERNAL_TARGET = 90;
export const RESPONSE_TARGET = 75;
export const PERFORMANCE_TARGET = 75;

export const SEVERITY_LABELS: Record<SeverityLevel, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

/** @deprecated Use getSectionBarColor or getOverallKpiColor from theme */
export function getScoreColor(score: number): string {
  return getSectionBarColor(score);
}

export function getRating(score: number): [string, string] {
  return [getOverallKpiLabel(score), getOverallKpiPillClass(score)];
}

export function getSeverityLevel(score: number): SeverityLevel {
  if (score < 50) return 'critical';
  if (score < 70) return 'high';
  if (score < 85) return 'medium';
  return 'low';
}

export function getHeatmapColor(score: number): string {
  return getRiskMatrixStatus(score).color;
}

export function getActionText(score: number): string {
  if (score < 50) return 'Immediate action required — escalate to leadership';
  if (score < 75) return 'Create improvement action plan within 2 weeks';
  return 'Maintain current practices — share as best practice';
}

export function getSectionById(id: string): SectionMeta | undefined {
  return SECTIONS.find((s) => s.id === id);
}
