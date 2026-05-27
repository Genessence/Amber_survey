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

function generateToken(index: number): string {
  return `AMB-${String(index + 1).padStart(4, '0')}`;
}

async function seed() {
  // Check tokens table is empty before seeding
  const { count } = await supabase
    .from('tokens')
    .select('*', { count: 'exact', head: true });

  if (count && count > 0) {
    console.error(`❌ tokens table already has ${count} rows. Aborting to prevent duplicates.`);
    console.error('   If you want to reseed, truncate the tokens table in Supabase first.');
    process.exit(1);
  }

  const filePath = path.join(__dirname, '../data/Supplier_Email_Address.xlsx');
  let wb: XLSX.WorkBook;
  try {
    wb = XLSX.readFile(filePath);
  } catch {
    console.error(`❌ Excel file not found: ${filePath}`);
    console.error('   Run: mkdir -p data && cp /path/to/Supplier_Email_Address.xlsx data/');
    process.exit(1);
  }

  // email → set of plant names (across all sheets), then convert to array
  const emailToPlants = new Map<string, Set<string>>();

  for (const sheetName of wb.SheetNames) {
    const ws = wb.Sheets[sheetName];
    // Use header:1 to get raw arrays — file has no header row, cols are [plant, email]
    const rows = XLSX.utils.sheet_to_json<any[]>(ws, { header: 1 });

    for (const row of rows) {
      const plant = (row[0] || '').toString().trim();
      const email = (row[1] || '').toString().trim().toLowerCase();

      if (!email || !plant) continue;
      if (!email.includes('@')) continue;

      if (!emailToPlants.has(email)) emailToPlants.set(email, new Set<string>());
      emailToPlants.get(email)!.add(plant);
    }
  }

  if (emailToPlants.size === 0) {
    console.error('❌ No valid email/plant pairs found in the Excel file. Check column names.');
    process.exit(1);
  }

  console.log(`Unique emails: ${emailToPlants.size}`);
  console.log(`Total plants:  ${[...emailToPlants.values()].reduce((s, p) => s + p.size, 0)}`);

  const rows = Array.from(emailToPlants.entries()).map(([email, plantSet], i) => ({
    email,
    token: generateToken(i),
    plants: Array.from(plantSet),
    plant_count: plantSet.size,
    email_sent: false,
    submitted: false,
  }));

  // Insert in batches of 50
  for (let i = 0; i < rows.length; i += 50) {
    const batch = rows.slice(i, i + 50);
    const { error } = await supabase.from('tokens').insert(batch);
    if (error) {
      console.error(`Batch ${Math.floor(i / 50) + 1} failed:`, error);
      process.exit(1);
    }
    console.log(`Inserted rows ${i + 1}–${i + batch.length}`);
  }

  console.log('✅ Seed complete.');
}

seed().catch(console.error);
