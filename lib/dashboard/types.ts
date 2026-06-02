export type SectionId = 'a' | 'b' | 'c' | 'd' | 'e' | 'f';

export type RiskFlag = {
  key: string;
  label: string;
  section: string;
  score: number;
};

export type DashboardData = {
  total: number;
  totalSuppliers: number;
  totalPlants: number;
  submittedPlants: number;
  period: string;
  scores: Record<SectionId, number>;
  overall: number;
  riskFlags: RiskFlag[];
  passiveRiskCount: number;
  passiveRiskPct: number;
};

export type SectionMeta = {
  id: SectionId;
  label: string;
  shortName: string;
  fullName: string;
  color: string;
};

export type RankedSection = SectionMeta & {
  score: number;
  delta: number;
  rank: number;
};

export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low';

export type RiskCategory = {
  level: SeverityLevel;
  label: string;
  count: number;
  percentage: number;
};

export type ExecutiveSummary = {
  narrative: string;
  strengths: string[];
  concerns: string[];
  actions: string[];
  healthLabel: string;
  healthClass: string;
};

export type SmartInsight = {
  icon: string;
  label: string;
  value: string;
};

export type StrengthItem = {
  title: string;
  subtitle: string;
  score: number;
  type: 'section' | 'question';
};

export type ImprovementItem = {
  rank: number;
  label: string;
  section: string;
  score: number;
  action: string;
  severity: SeverityLevel;
};

export type GapItem = {
  section: SectionMeta;
  score: number;
  delta: number;
};

export type ContributionItem = {
  section: SectionMeta;
  score: number;
  share: number;
};

export type BenchmarkItem = {
  section: SectionMeta;
  score: number;
  vsIndustry: number;
  vsTarget: number;
  status: 'above-both' | 'above-industry' | 'below-industry';
};

export type TrendSeries = {
  period: string;
  overall: number;
  scores: Record<SectionId, number>;
};
