import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('t');

  if (!token) {
    return NextResponse.json({ valid: false, reason: 'missing' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('tokens')
    .select('id, submitted, plant_count')
    .eq('token', token)
    .single();

  if (error) {
    console.error('Token validation DB error:', error.message);
    return NextResponse.json({ valid: false, reason: 'not_found' });
  }
  if (!data) {
    return NextResponse.json({ valid: false, reason: 'not_found' });
  }

  if (data.submitted) {
    return NextResponse.json({ valid: false, reason: 'already_submitted' });
  }

  return NextResponse.json({ valid: true, plant_count: data.plant_count });
}
