import * as XLSX from 'xlsx';
import { createClient } from '@supabase/supabase-js';
import * as path from 'path';
import * as dotenv from 'dotenv';
import ws from 'ws';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
  { realtime: { transport: ws as any } }
);

async function seedEmails() {
  const { count } = await supabase
    .from('emails')
    .select('*', { count: 'exact', head: true });

  if (count && count > 0) {
    console.error(`❌ emails table already has ${count} rows. Truncate first.`);
    process.exit(1);
  }

  const filePath = path.join(__dirname, '../data/Supplier_Email_Address.xlsx');
  let wb: XLSX.WorkBook;
  try {
    wb = XLSX.readFile(filePath);
  } catch {
    console.error(`❌ File not found: ${filePath}`);
    process.exit(1);
  }

  const rows: { plant: string; email: string }[] = [];

  for (const sheetName of wb.SheetNames) {
    const sheet = wb.Sheets[sheetName];
    const rawRows = XLSX.utils.sheet_to_json<any[]>(sheet, { header: 1 });

    for (const row of rawRows) {
      const plant = (row[0] || '').toString().trim();
      const email = (row[1] || '').toString().trim().toLowerCase();
      if (!plant || !email || !email.includes('@')) continue;
      rows.push({ plant, email });
    }
  }

  if (rows.length === 0) {
    console.error('❌ No valid rows found.');
    process.exit(1);
  }

  console.log(`Total rows to insert: ${rows.length}`);

  for (let i = 0; i < rows.length; i += 50) {
    const batch = rows.slice(i, i + 50);
    const { error } = await supabase.from('emails').insert(batch);
    if (error) {
      console.error(`Batch ${Math.floor(i / 50) + 1} failed:`, error);
      process.exit(1);
    }
    console.log(`Inserted rows ${i + 1}–${i + batch.length}`);
  }

  console.log('✅ Emails seed complete.');
}

seedEmails().catch(console.error);
