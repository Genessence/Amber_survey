'use client';

import { useEffect } from 'react';

const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #F5F4F0;
  color: #1a1a1a;
  min-height: 100vh;
  padding: 2rem 1rem;
}

.container { max-width: 720px; margin: 0 auto; }

.survey-header {
  background: #FAEEDA;
  border-radius: 14px;
  padding: 1.5rem 1.75rem;
  margin-bottom: 1.5rem;
  border: 1px solid #FAC775;
}
.survey-header .logo-row {
  display: flex; align-items: center; gap: 10px; margin-bottom: 10px;
}
.amber-logo {
  width: 38px; height: 38px; background: #BA7517; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  color: #FAEEDA; font-size: 18px; font-weight: 700; letter-spacing: -1px;
}
.survey-header h1 { font-size: 20px; font-weight: 600; color: #412402; margin-bottom: 6px; }
.survey-header p { font-size: 13.5px; color: #854F0B; line-height: 1.6; margin-bottom: 10px; }
.badges { display: flex; flex-wrap: wrap; gap: 8px; }
.badge {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 12px; background: #EF9F27; color: #412402;
  border-radius: 20px; padding: 4px 12px; font-weight: 500;
}

.progress-wrap {
  background: #fff; border-radius: 12px; padding: 1rem 1.25rem;
  margin-bottom: 1.25rem; border: 1px solid #e8e6e0;
}
.progress-info { display: flex; justify-content: space-between; font-size: 13px; color: #666; margin-bottom: 8px; }
.progress-info span:last-child { font-weight: 500; color: #BA7517; }
.progress-bar { height: 6px; background: #F0EDE6; border-radius: 6px; overflow: hidden; }
.progress-fill {
  height: 100%; background: linear-gradient(90deg, #EF9F27, #BA7517);
  border-radius: 6px; transition: width 0.4s ease; width: 0%;
}

.section-card {
  background: #fff; border-radius: 14px; padding: 1.4rem 1.6rem;
  margin-bottom: 1.1rem; border: 1px solid #e8e6e0;
}
.section-card.sourcing { border-color: #CECBF6; }

.section-title {
  font-size: 12px; font-weight: 600; color: #BA7517;
  text-transform: uppercase; letter-spacing: 0.07em;
  margin-bottom: 1.1rem; padding-bottom: 10px;
  border-bottom: 1px solid #FAC775;
  display: flex; align-items: center; gap: 8px;
}
.section-card.sourcing .section-title { color: #534AB7; border-bottom-color: #CECBF6; }
.section-icon {
  width: 26px; height: 26px; border-radius: 6px; background: #FAEEDA;
  display: inline-flex; align-items: center; justify-content: center; font-size: 14px;
}
.section-card.sourcing .section-icon { background: #EEEDFE; }
.new-tag {
  font-size: 10px; background: #EEEDFE; color: #534AB7;
  border-radius: 10px; padding: 2px 8px; font-weight: 600; margin-left: 4px;
}

.q-row { margin-bottom: 1rem; }
.q-row:last-child { margin-bottom: 0; }
.q-label { font-size: 14px; color: #1a1a1a; margin-bottom: 7px; line-height: 1.45; }
.q-num { color: #999; font-size: 13px; margin-right: 4px; }

select {
  width: 100%; padding: 9px 36px 9px 12px; font-size: 14px;
  border: 1px solid #d5d2cb; border-radius: 8px; background-color: #FAFAF8;
  color: #1a1a1a; cursor: pointer; appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 12px center;
  transition: border-color 0.15s, background-color 0.15s;
}
select:focus { outline: none; border-color: #BA7517; box-shadow: 0 0 0 3px rgba(186,117,23,0.12); }
select.answered { border-color: #1D9E75; background-color: #F0FAF5; color: #0F6E56; }

.remark-box { display: none; margin-top: 8px; animation: fadeIn .2s ease; }
.remark-box.visible { display: block; }
@keyframes fadeIn { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }
.remark-label {
  font-size: 12px; font-weight: 500; color: #993C1D; margin-bottom: 5px;
  display: flex; align-items: center; gap: 5px;
}
.remark-label::before { content: '⚠️'; font-size: 11px; }
textarea.remark-input {
  width: 100%; padding: 8px 12px; font-size: 13px;
  border: 1px solid #F0997B; border-radius: 8px; background: #FAECE7;
  color: #1a1a1a; resize: vertical; min-height: 68px;
  font-family: inherit; line-height: 1.5;
}
textarea.remark-input:focus { outline: none; border-color: #D85A30; background: #fff; }
textarea.remark-input::placeholder { color: #C07060; }

.submit-area { text-align: center; padding: 1.5rem 0 0.5rem; }
.btn-submit {
  background: #BA7517; color: #FAEEDA; border: none; border-radius: 10px;
  padding: 13px 44px; font-size: 15px; font-weight: 600; cursor: pointer;
  transition: background 0.15s, transform 0.1s; letter-spacing: 0.01em;
}
.btn-submit:hover { background: #854F0B; }
.btn-submit:active { transform: scale(0.98); }
.btn-submit:disabled { background: #e0ddd6; color: #999; cursor: not-allowed; transform: none; }
.anon-note {
  font-size: 12px; color: #999; margin-top: 14px;
  display: flex; align-items: center; justify-content: center; gap: 5px;
}
.anon-note svg { flex-shrink: 0; }

.completion-box {
  display: none; background: #EAF3DE; border: 1px solid #C0DD97;
  border-radius: 16px; padding: 3rem 2rem; text-align: center;
}
.completion-box .check-icon {
  width: 60px; height: 60px; background: #639922; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;
}
.completion-box h2 { font-size: 22px; font-weight: 600; color: #27500A; margin-bottom: 10px; }
.completion-box p { font-size: 14.5px; color: #3B6D11; line-height: 1.6; max-width: 440px; margin: 0 auto; }

.footer { text-align: center; font-size: 12px; color: #bbb; margin-top: 2rem; padding-bottom: 1rem; }

@media (max-width: 600px) {
  body { padding: 1rem 0.75rem; }
  .section-card { padding: 1.1rem 1.1rem; }
  .survey-header { padding: 1.1rem 1.1rem; }
}
`;

const HTML = `
<div class="container">

  <div class="survey-header">
    <div class="logo-row">
      <img src="/amber-logo.png" alt="Amber Logo" style="height:52px; width:auto; object-fit:contain;" />
    </div>
    <h1>Supplier Satisfaction Survey</h1>
    <p>Your honest feedback helps Amber understand your experience and strengthen our partnership. This survey is fully anonymous — no supplier identity or contact details are collected at any point. All responses are managed exclusively by an independent third-party agency.</p>
    <div class="badges">
      <span class="badge">&#128274; Anonymous &amp; Confidential</span>
      <span class="badge">&#9989; Third-party conducted</span>
      <span class="badge">&#128203; 31 Questions &nbsp;|&nbsp; ~9 min</span>
    </div>
  </div>

  <div class="progress-wrap">
    <div class="progress-info">
      <span>Survey Progress</span>
      <span id="prog-text">0 of 31 answered</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" id="prog-fill"></div>
    </div>
  </div>

  <div id="survey-form" style="display:none">

    <div class="section-card">
      <div class="section-title">
        <span class="section-icon">🤝</span>
        Section A &mdash; General Relationship &amp; Communication
      </div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q1.</span> Overall satisfaction with Amber as a business partner</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="What specifically could Amber improve in the overall relationship?"></textarea></div></div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q2.</span> Clarity and timeliness of communication from Amber's procurement team</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe communication gaps or delays you have experienced…"></textarea></div></div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q3.</span> Ease of raising concerns or escalations with Amber</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe challenges you faced when trying to escalate an issue…"></textarea></div></div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q4.</span> Responsiveness of Amber's point of contact to queries</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe delays or lack of response you experienced…"></textarea></div></div>
    </div>

    <div class="section-card">
      <div class="section-title">
        <span class="section-icon">⚙️</span>
        Section B &mdash; Plant &amp; Procurement Process
      </div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q5.</span> Clarity of purchase order documentation and specifications</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe what was unclear in PO documentation…"></textarea></div></div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q6.</span> Lead time given for order fulfilment (adequacy of notice period)</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe instances where lead time was insufficient…"></textarea></div></div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q7.</span> Consistency and predictability of ordering patterns</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe how ordering patterns have been unpredictable…"></textarea></div></div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q8.</span> Handling of changes or amendments to existing orders</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe issues with order amendments or change handling…"></textarea></div></div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q9.</span> Gate / entry process and logistical handling at Amber's plant</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe issues faced at the plant gate or during logistics…"></textarea></div></div>
    </div>

    <div class="section-card">
      <div class="section-title">
        <span class="section-icon">🧾</span>
        Section C &mdash; Finance &amp; Accounts Department
      </div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q10.</span> Adherence to agreed payment terms and schedule</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Briefly describe the issue with payment terms or schedule…"></textarea></div></div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q11.</span> Accuracy of invoicing, GRN matching, and deduction processes</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe any issues with invoicing, GRN, or deductions…"></textarea></div></div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q12.</span> Turnaround time for resolving invoice disputes or short payments</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe the dispute or delay you experienced…"></textarea></div></div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q13.</span> Communication from Finance team regarding payment status / delays</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe the communication gap you observed…"></textarea></div></div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q14.</span> Fairness in application of penalties, deductions, or credit notes</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe any concerns about penalties or deductions…"></textarea></div></div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q15.</span> Clarity and accuracy of the account reconciliation process with Amber</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe reconciliation issues — e.g. mismatches, delays, lack of statements…"></textarea></div></div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q16.</span> Fairness and timeliness of the reconciliation settlement — are outstanding differences resolved promptly?</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe any unresolved reconciliation differences or unfair settlements…"></textarea></div></div>
    </div>

    <div class="section-card">
      <div class="section-title">
        <span class="section-icon">🔬</span>
        Section D &mdash; Quality Department
      </div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q17.</span> Clarity of quality specifications and standards communicated</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe what was unclear about quality specifications…"></textarea></div></div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q18.</span> Fairness and transparency of the incoming inspection / rejection process</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe any unfair inspection or rejection instances…"></textarea></div></div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q19.</span> Timeliness of quality feedback and non-conformance communication</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe delays or gaps in quality feedback…"></textarea></div></div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q20.</span> Amber's quality team's approachability and technical support</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe how the quality team could be more supportive…"></textarea></div></div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q21.</span> Consistency in applying quality norms across batches / deliveries</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe any inconsistency in quality norms applied…"></textarea></div></div>
    </div>

    <div class="section-card sourcing">
      <div class="section-title">
        <span class="section-icon">📈</span>
        Section E &mdash; Sourcing &amp; Strategic Engagement
        <span class="new-tag">New</span>
      </div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q22.</span> Transparency and fairness in cost settlement discussions with Amber</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe concerns about cost settlement discussions…"></textarea></div></div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q23.</span> Amber's approach to cost structuring — reasonableness of cost breakdown expectations</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe issues with cost structuring expectations…"></textarea></div></div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q24.</span> Collaborative approach to capacity planning — adequacy of advance forecasts shared by Amber</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe forecasting or capacity planning gaps…"></textarea></div></div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q25.</span> Amber's commitment to ESG (Environmental, Social &amp; Governance) monitoring and shared compliance expectations</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe concerns about ESG monitoring or compliance communication…"></textarea></div></div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q26.</span> Frequency and quality of leadership-level meetings / business reviews with Amber</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe what could improve leadership engagement…"></textarea></div></div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q27.</span> Amber's openness to discussing market-driven cost changes and raw material fluctuations</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe how cost change discussions could be improved…"></textarea></div></div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q28.</span> Strategic alignment — does Amber treat you as a long-term sourcing partner?</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe what would make the partnership feel more strategic…"></textarea></div></div>
    </div>

    <div class="section-card">
      <div class="section-title">
        <span class="section-icon">🎯</span>
        Section F &mdash; Overall &amp; Strategic Outlook
      </div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q29.</span> Amber's ability to resolve issues and complaints fairly</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe any unresolved issue or complaint…"></textarea></div></div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q30.</span> Amber's willingness to build a long-term mutually beneficial partnership</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Describe what could make the partnership feel more mutual…"></textarea></div></div>
      <div class="q-row"><div class="q-label"><span class="q-num">Q31.</span> Your overall likelihood to continue the supply relationship with Amber</div>
        <select onchange="handleSelect(this)"><option value="">— Select your response —</option><option>Fully Satisfied</option><option>Satisfied</option><option>Average</option><option>Not Aligned with Amber</option></select>
        <div class="remark-box"><div class="remark-label">Please share your reason or remark</div><textarea class="remark-input" placeholder="Please share what concerns you about continuing the relationship…"></textarea></div></div>
    </div>

    <div class="submit-area">
      <button class="btn-submit" id="submit-btn" disabled onclick="submitSurvey()">Submit My Response</button>
      <div class="anon-note">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        No identifying information is collected. Managed exclusively by an independent third-party agency.
      </div>
    </div>

  </div>

  <div class="completion-box" id="completion">
    <div class="check-icon">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
    </div>
    <h2>Thank you for your feedback!</h2>
    <p>Your anonymous response has been successfully recorded. All findings will be compiled by the third-party agency and shared with Amber's leadership team to drive meaningful improvements in our supplier relationships.</p>
    <p style="margin-top:12px; font-size:13px; color:#639922;">We value your partnership. 🙏</p>
  </div>

  <div class="footer">
    Amber Supplier Satisfaction Survey &nbsp;|&nbsp; Confidential &amp; Anonymous &nbsp;|&nbsp; Conducted by Independent Third-Party Agency
  </div>

</div>
`;

const JS = `
  const TOTAL = 31;

  function handleSelect(sel) {
    if (sel.value !== '') {
      sel.classList.add('answered');
    } else {
      sel.classList.remove('answered');
    }

    const remarkBox = sel.nextElementSibling;
    if (remarkBox && remarkBox.classList.contains('remark-box')) {
      const needsRemark = (sel.value === 'Average' || sel.value === 'Not Aligned with Amber');
      if (needsRemark) {
        remarkBox.classList.add('visible');
        remarkBox.querySelector('textarea').focus();
      } else {
        remarkBox.classList.remove('visible');
        remarkBox.querySelector('textarea').value = '';
      }
    }

    const answered = document.querySelectorAll('select.answered').length;
    const pct = Math.round((answered / TOTAL) * 100);
    document.getElementById('prog-text').textContent = answered + ' of ' + TOTAL + ' answered (' + pct + '%)';
    document.getElementById('prog-fill').style.width = pct + '%';
    document.getElementById('submit-btn').disabled = (answered < TOTAL);
  }

  async function submitSurvey() {
    const btn = document.getElementById('submit-btn');
    btn.disabled = true;
    btn.textContent = 'Submitting…';

    const selects = Array.from(document.querySelectorAll('select'));
    const remarks = Array.from(document.querySelectorAll('textarea.remark-input'));

    const payload = { token: window.__surveyToken };
    selects.forEach((sel, i) => {
      payload['q' + (i + 1)] = sel.value;
    });
    remarks.forEach((ta, i) => {
      payload['q' + (i + 1) + '_remark'] = ta.value.trim() || '';
    });

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.status === 409) {
        btn.disabled = false;
        btn.textContent = 'Submit My Response';
        showTokenError('This survey has already been submitted. Thank you for your participation.');
        return;
      }
      if (!res.ok) throw new Error('server error');

      document.getElementById('survey-form').style.display = 'none';
      document.getElementById('completion').style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      btn.disabled = false;
      btn.textContent = 'Submit My Response';
      alert('Something went wrong. Please try again in a moment.');
    }
  }

  async function initSurvey() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('t');

    if (!token) {
      showTokenError('Invalid survey link. Please use the link from your email.');
      return;
    }

    try {
      const res = await fetch('/api/validate-token?t=' + encodeURIComponent(token));
      const data = await res.json();

      if (!data.valid) {
        if (data.reason === 'already_submitted') {
          showTokenError('This survey has already been submitted. Thank you for your participation.');
        } else {
          showTokenError('This survey link is invalid or has expired. Please contact the survey team.');
        }
        return;
      }

      window.__surveyToken = token;
      document.getElementById('survey-form').style.display = 'block';
    } catch {
      showTokenError('Unable to validate your link. Please try again.');
    }
  }

  function showTokenError(msg) {
    const form = document.getElementById('survey-form');
    if (form) form.style.display = 'none';

    let err = document.getElementById('token-error-screen');
    if (!err) {
      err = document.createElement('div');
      err.id = 'token-error-screen';
      err.style.cssText = 'text-align:center;padding:4rem 2rem;max-width:500px;margin:0 auto';
      err.innerHTML = '<div style="font-size:48px;margin-bottom:1rem">🔒</div>' +
        '<h2 style="font-size:20px;font-weight:600;margin-bottom:.75rem">Survey Unavailable</h2>' +
        '<p id="token-error-msg" style="color:#666;font-size:14px;line-height:1.6"></p>';
      document.body.appendChild(err);
    }
    document.getElementById('token-error-msg').textContent = msg;
    err.style.display = 'block';
  }

  if (document.readyState === 'complete') {
    initSurvey();
  } else {
    window.addEventListener('load', initSurvey);
  }
`;

export default function SurveyPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.textContent = JS;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div dangerouslySetInnerHTML={{ __html: HTML }} />
    </>
  );
}
