export const SCORE_MAP: Record<string, number> = {
  'Fully Satisfied': 100,
  'Satisfied': 75,
  'Average': 50,
  'Not Aligned with Amber': 0,
};

export const QUESTION_META: Record<string, { text: string; sectionKey: string; sectionName: string }> = {
  q1:  { text: 'Overall satisfaction with Amber as a business partner',                                            sectionKey: 'a', sectionName: 'General Relationship & Communication' },
  q2:  { text: 'Clarity and timeliness of communication from Amber\'s procurement team',                          sectionKey: 'a', sectionName: 'General Relationship & Communication' },
  q3:  { text: 'Ease of raising concerns or escalations with Amber',                                              sectionKey: 'a', sectionName: 'General Relationship & Communication' },
  q4:  { text: 'Responsiveness of Amber\'s point of contact to queries',                                          sectionKey: 'a', sectionName: 'General Relationship & Communication' },
  q5:  { text: 'Clarity of purchase order documentation and specifications',                                      sectionKey: 'b', sectionName: 'Plant & Procurement Process' },
  q6:  { text: 'Lead time given for order fulfilment (adequacy of notice period)',                                sectionKey: 'b', sectionName: 'Plant & Procurement Process' },
  q7:  { text: 'Consistency and predictability of ordering patterns',                                             sectionKey: 'b', sectionName: 'Plant & Procurement Process' },
  q8:  { text: 'Handling of changes or amendments to existing orders',                                            sectionKey: 'b', sectionName: 'Plant & Procurement Process' },
  q9:  { text: 'Gate / entry process and logistical handling at Amber\'s plant',                                  sectionKey: 'b', sectionName: 'Plant & Procurement Process' },
  q10: { text: 'Adherence to agreed payment terms and schedule',                                                  sectionKey: 'c', sectionName: 'Finance & Accounts Department' },
  q11: { text: 'Accuracy of invoicing, GRN matching, and deduction processes',                                    sectionKey: 'c', sectionName: 'Finance & Accounts Department' },
  q12: { text: 'Turnaround time for resolving invoice disputes or short payments',                                sectionKey: 'c', sectionName: 'Finance & Accounts Department' },
  q13: { text: 'Communication from Finance team regarding payment status / delays',                               sectionKey: 'c', sectionName: 'Finance & Accounts Department' },
  q14: { text: 'Fairness in application of penalties, deductions, or credit notes',                               sectionKey: 'c', sectionName: 'Finance & Accounts Department' },
  q15: { text: 'Clarity and accuracy of the account reconciliation process with Amber',                           sectionKey: 'c', sectionName: 'Finance & Accounts Department' },
  q16: { text: 'Fairness and timeliness of the reconciliation settlement',                                        sectionKey: 'c', sectionName: 'Finance & Accounts Department' },
  q17: { text: 'Clarity of quality specifications and standards communicated',                                    sectionKey: 'd', sectionName: 'Quality Department' },
  q18: { text: 'Fairness and transparency of the incoming inspection / rejection process',                        sectionKey: 'd', sectionName: 'Quality Department' },
  q19: { text: 'Timeliness of quality feedback and non-conformance communication',                                sectionKey: 'd', sectionName: 'Quality Department' },
  q20: { text: 'Amber\'s quality team\'s approachability and technical support',                                  sectionKey: 'd', sectionName: 'Quality Department' },
  q21: { text: 'Consistency in applying quality norms across batches / deliveries',                               sectionKey: 'd', sectionName: 'Quality Department' },
  q22: { text: 'Transparency and fairness in cost settlement discussions with Amber',                             sectionKey: 'e', sectionName: 'Sourcing & Strategic Engagement' },
  q23: { text: 'Amber\'s approach to cost structuring — reasonableness of cost breakdown expectations',           sectionKey: 'e', sectionName: 'Sourcing & Strategic Engagement' },
  q24: { text: 'Collaborative approach to capacity planning — adequacy of advance forecasts shared by Amber',    sectionKey: 'e', sectionName: 'Sourcing & Strategic Engagement' },
  q25: { text: 'Amber\'s commitment to ESG monitoring and shared compliance expectations',                        sectionKey: 'e', sectionName: 'Sourcing & Strategic Engagement' },
  q26: { text: 'Frequency and quality of leadership-level meetings / business reviews with Amber',               sectionKey: 'e', sectionName: 'Sourcing & Strategic Engagement' },
  q27: { text: 'Amber\'s openness to discussing market-driven cost changes and raw material fluctuations',        sectionKey: 'e', sectionName: 'Sourcing & Strategic Engagement' },
  q28: { text: 'Strategic alignment — does Amber treat you as a long-term sourcing partner?',                    sectionKey: 'e', sectionName: 'Sourcing & Strategic Engagement' },
  q29: { text: 'Amber\'s ability to resolve issues and complaints fairly',                                        sectionKey: 'f', sectionName: 'Overall & Strategic Outlook' },
  q30: { text: 'Amber\'s willingness to build a long-term mutually beneficial partnership',                       sectionKey: 'f', sectionName: 'Overall & Strategic Outlook' },
  q31: { text: 'Your overall likelihood to continue the supply relationship with Amber',                          sectionKey: 'f', sectionName: 'Overall & Strategic Outlook' },
};

export const ALL_Q_KEYS = Object.keys(QUESTION_META);

export const RISK_QUESTIONS = [
  { key: 'q10', label: 'Payment terms adherence',            section: 'C' },
  { key: 'q12', label: 'Invoice dispute resolution time',    section: 'C' },
  { key: 'q13', label: 'Finance communication on delays',    section: 'C' },
  { key: 'q22', label: 'Cost settlement transparency',       section: 'E' },
  { key: 'q24', label: 'Capacity planning collaboration',    section: 'E' },
  { key: 'q6',  label: 'Lead time adequacy for orders',      section: 'B' },
  { key: 'q7',  label: 'Order consistency & predictability', section: 'B' },
  { key: 'q18', label: 'Inspection fairness & transparency', section: 'D' },
];

export type AnswerRow = {
  submission_id: string;
  section_key: string;
  section_name: string;
  question_key: string;
  question_text: string;
  answer: string;
  remark: string | null;
};

function avg(nums: number[]): number {
  if (!nums.length) return 0;
  return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length);
}

export function aggregateScores(rows: AnswerRow[]) {
  if (!rows.length) {
    return { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, overall: 0, total: 0, riskScores: {} };
  }

  const total = new Set(rows.map(r => r.submission_id)).size;

  const bySection: Record<string, number[]> = { a: [], b: [], c: [], d: [], e: [], f: [] };
  for (const row of rows) {
    const score = SCORE_MAP[row.answer];
    if (score !== undefined && row.section_key in bySection) {
      bySection[row.section_key].push(score);
    }
  }

  const a = avg(bySection.a);
  const b = avg(bySection.b);
  const c = avg(bySection.c);
  const d = avg(bySection.d);
  const e = avg(bySection.e);
  const f = avg(bySection.f);
  const overall = avg([a, b, c, d, e, f]);

  const riskScores: Record<string, number> = {};
  for (const rq of RISK_QUESTIONS) {
    const scores = rows
      .filter(r => r.question_key === rq.key)
      .map(r => SCORE_MAP[r.answer])
      .filter((v): v is number => v !== undefined);
    riskScores[rq.key] = avg(scores);
  }

  return { a, b, c, d, e, f, overall, total, riskScores };
}
