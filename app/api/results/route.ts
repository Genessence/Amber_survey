import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { aggregateScores, RISK_QUESTIONS, type AnswerRow } from '@/lib/scoring';

export async function GET() {
  const { data: rows, error } = await supabase
    .from('responses')
    .select('submission_id, section_key, section_name, question_key, question_text, answer, remark');

  if (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  const { data: tokenStats, error: tokenErr } = await supabase
    .from('tokens')
    .select('plant_count, submitted');

  if (tokenErr) {
    return NextResponse.json({ error: 'Token stats error' }, { status: 500 });
  }

  const totalPlants = tokenStats?.reduce((sum, t) => sum + t.plant_count, 0) ?? 0;
  const submittedPlants = tokenStats
    ?.filter(t => t.submitted)
    .reduce((sum, t) => sum + t.plant_count, 0) ?? 0;

  const { a, b, c, d, e, f, overall, total, riskScores } = aggregateScores((rows ?? []) as AnswerRow[]);

  return NextResponse.json({
    total,
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
    totalPlants,
    submittedPlants,
  });
}
