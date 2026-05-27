import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const urlSet = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const keySet = !!process.env.SUPABASE_SERVICE_KEY;

  const { count, error } = await supabase
    .from('emails')
    .select('*', { count: 'exact', head: true });

  return NextResponse.json({
    env: { urlSet, keySet },
    emails: {
      count: count ?? null,
      error: error ? { code: error.code, message: error.message } : null,
    },
  });
}
