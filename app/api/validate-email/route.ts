import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('e')?.toLowerCase().trim();

  if (!email) {
    return NextResponse.json({ valid: false, reason: 'missing' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('emails')
    .select('id, submitted')
    .eq('email', email)
    .limit(1)
    .single();

  if (error) {
    console.error('Email validation DB error:', error.message);
    return NextResponse.json({ valid: false, reason: 'not_found' });
  }

  if (!data) {
    return NextResponse.json({ valid: false, reason: 'not_found' });
  }

  if (data.submitted) {
    return NextResponse.json({ valid: false, reason: 'already_submitted' });
  }

  return NextResponse.json({ valid: true });
}
