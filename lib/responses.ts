import { supabase } from '@/lib/supabase';
import type { AnswerRow } from '@/lib/scoring';

const PAGE_SIZE = 1000;

export async function fetchAllResponses(): Promise<AnswerRow[]> {
  const allRows: AnswerRow[] = [];
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from('responses')
      .select('submission_id, section_key, section_name, question_key, question_text, answer, remark')
      .range(from, from + PAGE_SIZE - 1);

    if (error) throw error;
    if (!data?.length) break;

    allRows.push(...(data as AnswerRow[]));
    if (data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  return allRows;
}
