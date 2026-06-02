import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { fetchAllResponses } from '@/lib/responses';
import { aggregateScores, computePassiveRisk, RISK_QUESTIONS } from '@/lib/scoring';

export async function GET() {
  let rows;

  try {
    rows = await fetchAllResponses();
  } catch {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  const { count: total, error: submissionErr } = await supabase
    .from('emails')
    .select('submission_id', { count: 'exact', head: true })
    .not('submission_id', 'is', null);

  if (submissionErr) {
    return NextResponse.json({ error: 'Submission stats error' }, { status: 500 });
  }

  const { count: totalPlants, error: plantsErr } = await supabase
    .from('emails')
    .select('*', { count: 'exact', head: true });

  if (plantsErr) {
    return NextResponse.json({ error: 'Email stats error' }, { status: 500 });
  }

  const { count: submittedPlants, error: submittedErr } = await supabase
    .from('emails')
    .select('*', { count: 'exact', head: true })
    .eq('submitted', true);

  if (submittedErr) {
    return NextResponse.json({ error: 'Email submission stats error' }, { status: 500 });
  }

  const { a, b, c, d, e, f, overall, riskScores } = aggregateScores(rows);
  const { count: passiveRiskCount, pct: passiveRiskPct } = computePassiveRisk(rows);

  return NextResponse.json({
    total: total ?? 0,
    totalSuppliers: parseInt(process.env.TOTAL_SUPPLIERS ?? '0'),
    period: process.env.SURVEY_PERIOD ?? '—',
    scores: { a, b, c, d, e, f },
    overall,
    riskFlags: RISK_QUESTIONS.map(rq => ({
      key: rq.key,
      label: rq.label,
      section: rq.section,
      score: riskScores[rq.key] ?? 0,
    })),
    totalPlants: totalPlants ?? 0,
    submittedPlants: submittedPlants ?? 0,
    passiveRiskCount,
    passiveRiskPct,
  });
}
