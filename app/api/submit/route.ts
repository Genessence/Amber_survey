import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { SCORE_MAP, QUESTION_META, ALL_Q_KEYS } from '@/lib/scoring';
import { randomUUID } from 'crypto';

const VALID_VALUES = new Set(Object.keys(SCORE_MAP));

export async function POST(req: NextRequest) {
  const body = await req.json();

  const token = body.token as string;

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  const { data: tokenRow, error: tokenErr } = await supabase
    .from('tokens')
    .select('id, submitted')
    .eq('token', token)
    .single();

  if (tokenErr || !tokenRow) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
  }

  if (tokenRow.submitted) {
    return NextResponse.json({ error: 'Already submitted' }, { status: 409 });
  }

  const invalidFields: string[] = [];
  for (const key of ALL_Q_KEYS) {
    if (!VALID_VALUES.has(body[key])) invalidFields.push(key);
  }
  if (invalidFields.length) {
    return NextResponse.json(
      { error: 'Missing or invalid fields', fields: invalidFields },
      { status: 400 }
    );
  }

  const submission_id = randomUUID();

  const rows = ALL_Q_KEYS.map(key => {
    const meta = QUESTION_META[key];
    return {
      submission_id,
      section_key:   meta.sectionKey,
      section_name:  meta.sectionName,
      question_key:  key,
      question_text: meta.text,
      answer:        body[key] as string,
      remark:        typeof body[`${key}_remark`] === 'string'
                       ? body[`${key}_remark`].slice(0, 1000) || null
                       : null,
      token_id:      tokenRow.id,
    };
  });

  const { error } = await supabase.from('responses').insert(rows);
  if (error) {
    console.error('Supabase insert error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  const { error: tokenUpdateErr } = await supabase
    .from('tokens')
    .update({
      submitted: true,
      submitted_at: new Date().toISOString(),
      response_id: submission_id,
    })
    .eq('id', tokenRow.id);

  if (tokenUpdateErr) {
    console.error('Token update error (responses were saved):', tokenUpdateErr.message);
    // Still return success — responses were saved. The token update is best-effort.
    // A manual fix can be applied if needed.
  }

  return NextResponse.json({ success: true, submission_id });
}
