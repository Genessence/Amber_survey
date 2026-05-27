import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const BATCH_SIZE = 20;

function buildEmailBody(token: string, plants: string[]): string {
  const surveyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/survey?t=${token}`;
  const safePlants = Array.isArray(plants) ? plants : [];
  const plantList = safePlants.length > 1
    ? `\nThis link covers your response for:\n${safePlants.map(p => `  • ${p}`).join('\n')}\n`
    : '';

  return `Dear Valued Supplier,

Greetings from Amber!

We are writing to invite you to participate in our Supplier Satisfaction Survey — an important initiative to understand your experience of working with us and to strengthen our partnership.
${plantList}
As part of Amber's commitment to continuous improvement, we want to hear directly from you — honestly and openly. Your feedback will help us:

  ✅  Improve our procurement and plant processes
  ✅  Strengthen finance and quality interactions
  ✅  Build better sourcing and strategic partnerships
  ✅  Enhance overall supplier experience with Amber

📋 TAKE THE SURVEY HERE:
👉 ${surveyUrl}

⏱ Time Required: Approximately 8 minutes
🔒 Completely Anonymous: No personal or company details are collected
🏢 Independently Managed: This survey is conducted by an independent third-party agency — your responses go directly to them, not to Amber

DEADLINE: Please complete the survey by [DATE — Day 3, 5:00 PM]

This is your opportunity to share your genuine experience — both what is working well and where improvements are needed. All responses are treated with full confidentiality and used only for improving our supplier management practices.

We deeply value your time and partnership. Thank you for helping us become a better business partner for you.

Warm regards,

[Name]
[Designation] | Amber
On behalf of [Third-Party Agency Name]

──────────────────────────────
📌 Need help? Contact [Agency Email] | [Agency Phone]
🔒 This link is unique to you. Please do not forward it.`;
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-cron-secret');
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const batch = typeof body.batch === 'number' ? body.batch : 0;

  const { data: tokens, error } = await supabase
    .from('tokens')
    .select('id, email, token, plants')
    .eq('email_sent', false)
    .range(batch * BATCH_SIZE, (batch + 1) * BATCH_SIZE - 1);

  if (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  if (!tokens || tokens.length === 0) {
    return NextResponse.json({ done: true, message: 'All emails sent' });
  }

  const results = { sent: 0, failed: 0, errors: [] as string[] };

  for (const t of tokens) {
    try {
      await transporter.sendMail({
        from: `"Amber Procurement" <${process.env.GMAIL_USER}>`,
        to: t.email,
        subject: 'Your feedback matters — Amber Supplier Satisfaction Survey [3 Days Only]',
        text: buildEmailBody(t.token, t.plants),
      });

      const { error: updateErr } = await supabase
        .from('tokens')
        .update({ email_sent: true, email_sent_at: new Date().toISOString() })
        .eq('id', t.id);

      if (updateErr) throw new Error(`DB update failed: ${updateErr.message}`);

      results.sent++;
    } catch (err: any) {
      results.failed++;
      results.errors.push(`${t.email}: ${err.message}`);
      console.error(`Failed: ${t.email}:`, err.message);
    }
  }

  const { count: remaining, error: countErr } = await supabase
    .from('tokens')
    .select('*', { count: 'exact', head: true })
    .eq('email_sent', false);

  if (countErr) {
    console.error('Count query error:', countErr.message);
  }

  return NextResponse.json({
    batch,
    sent: results.sent,
    failed: results.failed,
    errors: results.errors,
    remaining: remaining ?? 0,
    nextBatch: (remaining ?? 0) > 0 ? batch + 1 : null,
  });
}
