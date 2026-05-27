import { createClient } from '@supabase/supabase-js';

// Server-side only — never imported in browser code
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);
