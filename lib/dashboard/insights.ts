import {
  getActionText,
  getRating,
  getSeverityLevel,
  INDUSTRY_BENCHMARK,
  INTERNAL_TARGET,
  RESPONSE_TARGET,
  SECTIONS,
  SEVERITY_LABELS,
} from './constants';
import type {
  BenchmarkItem,
  ContributionItem,
  DashboardData,
  ExecutiveSummary,
  GapItem,
  ImprovementItem,
  RankedSection,
  RiskCategory,
  RiskFlag,
  SmartInsight,
  StrengthItem,
} from './types';

function getSectionScores(data: DashboardData) {
  return SECTIONS.map((s) => ({
    ...s,
    score: data.scores[s.id] ?? 0,
  }));
}

export function rankSections(data: DashboardData): RankedSection[] {
  const overall = data.overall;
  return getSectionScores(data)
    .sort((a, b) => b.score - a.score)
    .map((s, i) => ({
      ...s,
      delta: s.score - overall,
      rank: i + 1,
    }));
}

export function getGapAnalysis(data: DashboardData): GapItem[] {
  return getSectionScores(data).map((s) => ({
    section: s,
    score: s.score,
    delta: s.score - data.overall,
  }));
}

export function getSectionContribution(data: DashboardData): ContributionItem[] {
  const sections = getSectionScores(data);
  const total = sections.reduce((sum, s) => sum + s.score, 0) || 1;
  return sections.map((s) => ({
    section: s,
    score: s.score,
    share: Math.round((s.score / total) * 100),
  }));
}

export function getBenchmarkComparison(data: DashboardData): BenchmarkItem[] {
  return getSectionScores(data).map((s) => {
    const vsIndustry = s.score - INDUSTRY_BENCHMARK;
    const vsTarget = s.score - INTERNAL_TARGET;
    let status: BenchmarkItem['status'] = 'below-industry';
    if (s.score >= INTERNAL_TARGET) status = 'above-both';
    else if (s.score >= INDUSTRY_BENCHMARK) status = 'above-industry';
    return { section: s, score: s.score, vsIndustry, vsTarget, status };
  });
}

export function categorizeRisks(riskFlags: RiskFlag[]): RiskCategory[] {
  const total = riskFlags.length || 1;
  const levels = ['critical', 'high', 'medium', 'low'] as const;
  return levels.map((level) => {
    const count = riskFlags.filter((f) => getSeverityLevel(f.score) === level).length;
    return {
      level,
      label: SEVERITY_LABELS[level],
      count,
      percentage: Math.round((count / total) * 100),
    };
  });
}

export function getImprovementItems(riskFlags: RiskFlag[]): ImprovementItem[] {
  return [...riskFlags]
    .sort((a, b) => a.score - b.score)
    .slice(0, 5)
    .map((f, i) => ({
      rank: i + 1,
      label: f.label,
      section: f.section,
      score: f.score,
      action: getActionText(f.score),
      severity: getSeverityLevel(f.score),
    }));
}

export function getStrengths(data: DashboardData): StrengthItem[] {
  const topSections = rankSections(data)
    .slice(0, 3)
    .map((s) => ({
      title: `Section ${s.label} — ${s.shortName}`,
      subtitle: 'Top-performing department area',
      score: s.score,
      type: 'section' as const,
    }));

  const topFlags = [...data.riskFlags]
    .filter((f) => f.score >= 85)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((f) => ({
      title: f.label,
      subtitle: `Section ${f.section} — strong supplier confidence`,
      score: f.score,
      type: 'question' as const,
    }));

  return [...topSections, ...topFlags].slice(0, 5);
}

export function buildExecutiveSummary(data: DashboardData): ExecutiveSummary {
  const ranked = rankSections(data);
  const best = ranked[0];
  const worst = ranked[ranked.length - 1];
  const [healthLabel, healthClass] = getRating(data.overall);
  const rate =
    data.totalSuppliers > 0
      ? Math.round((data.total / data.totalSuppliers) * 100)
      : 0;

  const emerging = data.riskFlags.filter(
    (f) => f.score >= 70 && f.score < 85
  ).length;

  const narrative = `Supplier satisfaction stands at ${data.overall}% overall for ${data.period}, with ${data.total} responses from ${data.totalSuppliers} suppliers (${rate}% participation). Section ${best.label} (${best.shortName}) leads at ${best.score}%, while Section ${worst.label} (${worst.shortName}) at ${worst.score}% represents the primary improvement opportunity.`;

  const strengths = [
    `${best.shortName} (${best.score}%) exceeds the overall average by ${best.delta > 0 ? '+' : ''}${best.delta} points`,
    `${ranked.filter((s) => s.score >= INDUSTRY_BENCHMARK).length} of 6 sections meet or exceed the industry benchmark (${INDUSTRY_BENCHMARK}%)`,
    `Overall score of ${data.overall}% indicates ${healthLabel.toLowerCase()} supplier relationship health`,
  ];

  const concerns = [
    `${worst.shortName} scores ${worst.score}%, ${Math.abs(worst.delta)} points below overall average`,
    `${data.riskFlags.filter((f) => f.score < 75).length} risk flags below the 75% action threshold`,
    emerging > 0
      ? `${emerging} emerging concern${emerging > 1 ? 's' : ''} in the moderate band (70–84%)`
      : 'No emerging moderate-band concerns detected',
  ];

  const actions = [
    `Prioritize improvement plan for Section ${worst.label} — ${worst.shortName}`,
    `Address lowest-scoring risk area: ${[...data.riskFlags].sort((a, b) => a.score - b.score)[0]?.label ?? 'N/A'}`,
    rate < RESPONSE_TARGET
      ? `Increase survey participation — currently ${rate}% vs ${RESPONSE_TARGET}% target`
      : 'Maintain current supplier engagement practices',
  ];

  return { narrative, strengths, concerns, actions, healthLabel, healthClass };
}

export function buildSmartInsights(data: DashboardData): SmartInsight[] {
  const ranked = rankSections(data);
  const best = ranked[0];
  const worst = ranked[ranked.length - 1];
  const topRisk = [...data.riskFlags].sort((a, b) => a.score - b.score)[0];
  const emerging = data.riskFlags.filter((f) => f.score >= 70 && f.score < 85);
  const [healthLabel] = getRating(data.overall);

  return [
    { icon: '🏆', label: 'Strongest Department', value: `Sec ${best.label} — ${best.shortName} (${best.score}%)` },
    { icon: '⚠️', label: 'Weakest Department', value: `Sec ${worst.label} — ${worst.shortName} (${worst.score}%)` },
    {
      icon: '🎯',
      label: 'Highest Risk Area',
      value: topRisk ? `${topRisk.label} (${topRisk.score}%)` : 'None',
    },
    {
      icon: '📊',
      label: 'Emerging Concerns',
      value: emerging.length > 0 ? `${emerging.length} moderate-band flags` : 'None detected',
    },
    { icon: '💚', label: 'Overall Health', value: healthLabel },
  ];
}
