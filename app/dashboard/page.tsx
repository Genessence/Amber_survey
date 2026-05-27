'use client';

import { useEffect } from 'react';

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#F2F0EB;color:#1a1a1a;min-height:100vh}

.header{background:linear-gradient(135deg,#412402 0%,#633806 50%,#BA7517 100%);padding:2rem 2rem 1.5rem;color:#FAEEDA}
.header-inner{max-width:1200px;margin:0 auto}
.header-top{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:1rem;margin-bottom:1.25rem}
.header h1{font-size:22px;font-weight:600;letter-spacing:-.02em}
.header p{font-size:13px;opacity:.75;margin-top:3px}
.header-badges{display:flex;gap:8px;flex-wrap:wrap}
.hbadge{background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:20px;padding:4px 12px;font-size:12px;font-weight:500}
.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;max-width:1200px;margin:-2rem auto 0;padding:0 2rem;position:relative;z-index:10}
.stat-card{background:#fff;border-radius:12px;padding:1.25rem;border:1px solid #e5e2db;box-shadow:0 2px 8px rgba(0,0,0,.06)}
.stat-label{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#999;margin-bottom:6px}
.stat-val{font-size:28px;font-weight:600;color:#1a1a1a;line-height:1}
.stat-sub{font-size:12px;color:#999;margin-top:4px}
.stat-pill{display:inline-block;font-size:11px;font-weight:600;border-radius:20px;padding:2px 8px;margin-top:6px}
.pill-green{background:#EAF3DE;color:#27500A}
.pill-amber{background:#FAEEDA;color:#633806}
.pill-red{background:#FCEBEB;color:#791F1F}
.pill-blue{background:#E6F1FB;color:#0C447C}

.main{max-width:1200px;margin:2rem auto;padding:0 2rem}
.section-title{font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#BA7517;margin-bottom:1rem;display:flex;align-items:center;gap:8px}
.section-title::after{content:'';flex:1;height:1px;background:#e5e2db}

.chart-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:2rem}
.chart-card{background:#fff;border-radius:14px;padding:1.25rem 1.5rem;border:1px solid #e5e2db}
.chart-card.full{grid-column:1/-1}
.chart-card h3{font-size:14px;font-weight:600;color:#1a1a1a;margin-bottom:4px}
.chart-card .chart-sub{font-size:12px;color:#999;margin-bottom:1rem}
.chart-wrap{position:relative;height:220px}
.chart-wrap.tall{height:300px}

.risk-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;margin-bottom:2rem}
.risk-card{background:#fff;border-radius:12px;padding:1rem 1.25rem;border:1px solid #e5e2db}
.risk-card.critical{border-left:3px solid #E24B4A}
.risk-card.warning{border-left:3px solid #EF9F27}
.risk-card.good{border-left:3px solid #639922}
.risk-section{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#999;margin-bottom:4px}
.risk-q{font-size:13px;font-weight:500;color:#1a1a1a;margin-bottom:8px;line-height:1.4}
.risk-bar-wrap{height:6px;background:#F0EDE6;border-radius:6px;overflow:hidden;margin-bottom:6px}
.risk-bar{height:100%;border-radius:6px;transition:width .6s ease}
.risk-score{font-size:12px;color:#666}

.data-entry{background:#fff;border-radius:14px;padding:1.5rem;border:1px solid #e5e2db;margin-bottom:2rem}
.data-entry h3{font-size:15px;font-weight:600;color:#1a1a1a;margin-bottom:.75rem}
.input-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-bottom:1rem}
.input-group label{display:block;font-size:11px;font-weight:600;color:#999;text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px}
.input-group input{width:100%;padding:8px 10px;border:1px solid #e0ddd6;border-radius:8px;font-size:14px;color:#1a1a1a;background:#FAFAF8}
.input-group input:focus{outline:none;border-color:#BA7517}
.btn-update{background:#BA7517;color:#FAEEDA;border:none;border-radius:8px;padding:9px 20px;font-size:13px;font-weight:600;cursor:pointer;transition:background .15s}
.btn-update:hover{background:#854F0B}
.btn-reset{background:#F0EDE6;color:#666;border:none;border-radius:8px;padding:9px 16px;font-size:13px;font-weight:500;cursor:pointer;margin-left:8px}
.note{font-size:12px;color:#999;margin-top:.5rem}

.section-scores{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-bottom:2rem}
.sec-card{background:#fff;border-radius:12px;padding:1rem;text-align:center;border:1px solid #e5e2db}
.sec-letter{font-size:20px;font-weight:700;margin-bottom:4px}
.sec-name{font-size:10px;color:#999;font-weight:500;margin-bottom:8px;line-height:1.3}
.sec-score{font-size:24px;font-weight:600;line-height:1}
.sec-pct{font-size:11px;color:#999;margin-top:2px}
.score-ring{width:48px;height:48px;margin:0 auto 8px;position:relative}
.score-ring svg{transform:rotate(-90deg)}

.footer{text-align:center;padding:2rem;font-size:12px;color:#bbb}

@media(max-width:700px){
  .stat-row{grid-template-columns:1fr 1fr}
  .chart-grid{grid-template-columns:1fr}
  .section-scores{grid-template-columns:repeat(3,1fr)}
}
`;

const HTML = `
<div class="header">
  <div class="header-inner">
    <div class="header-top">
      <div>
        <h1>Supplier Satisfaction Dashboard</h1>
        <p>Amber — Survey Results &nbsp;|&nbsp; Compiled by Third-Party Agency</p>
      </div>
      <div class="header-badges">
        <span class="hbadge" id="badge-date">Survey Period: —</span>
        <span class="hbadge" id="badge-resp">Responses: —</span>
        <span class="hbadge">🔒 Anonymous</span>
      </div>
    </div>
  </div>
</div>

<div class="stat-row">
  <div class="stat-card">
    <div class="stat-label">Overall Score</div>
    <div class="stat-val" id="s-overall">—</div>
    <div class="stat-sub">out of 100</div>
    <div class="stat-pill" id="s-rating">Enter data below</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">Response Rate</div>
    <div class="stat-val" id="s-rate">—</div>
    <div class="stat-sub" id="s-rate-sub">suppliers responded</div>
    <div class="stat-pill pill-blue" id="s-rate-pill">—</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">Strongest Area</div>
    <div class="stat-val" style="font-size:16px" id="s-best">—</div>
    <div class="stat-sub">highest section score</div>
    <div class="stat-pill pill-green" id="s-best-score">—</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">Needs Attention</div>
    <div class="stat-val" style="font-size:16px" id="s-worst">—</div>
    <div class="stat-sub">lowest section score</div>
    <div class="stat-pill pill-red" id="s-worst-score">—</div>
  </div>
</div>

<div class="main">

  <div class="data-entry" style="margin-top:2rem">
    <h3>📥 Enter Section Average Scores (0–100)</h3>
    <p style="font-size:13px;color:#666;margin-bottom:1rem">Scores are loaded automatically from live survey data. You can also enter scores manually below.</p>
    <div class="input-grid">
      <div class="input-group"><label>Section A — Relationship</label><input type="number" id="in-a" min="0" max="100" value="78" placeholder="e.g. 78"/></div>
      <div class="input-group"><label>Section B — Procurement</label><input type="number" id="in-b" min="0" max="100" value="65" placeholder="e.g. 65"/></div>
      <div class="input-group"><label>Section C — Finance</label><input type="number" id="in-c" min="0" max="100" value="55" placeholder="e.g. 55"/></div>
      <div class="input-group"><label>Section D — Quality</label><input type="number" id="in-d" min="0" max="100" value="72" placeholder="e.g. 72"/></div>
      <div class="input-group"><label>Section E — Sourcing</label><input type="number" id="in-e" min="0" max="100" value="60" placeholder="e.g. 60"/></div>
      <div class="input-group"><label>Section F — Overall</label><input type="number" id="in-f" min="0" max="100" value="70" placeholder="e.g. 70"/></div>
    </div>
    <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
      <div class="input-group" style="min-width:140px"><label>Total Suppliers</label><input type="number" id="in-total" value="45" min="1"/></div>
      <div class="input-group" style="min-width:140px"><label>Responses Received</label><input type="number" id="in-resp" value="38" min="0"/></div>
      <div class="input-group" style="min-width:180px"><label>Survey Period</label><input type="text" id="in-period" value="May 12–14, 2025" placeholder="e.g. May 12-14, 2025"/></div>
    </div>
    <div style="margin-top:1rem">
      <button class="btn-update" onclick="updateDashboard()">🔄 Update Dashboard</button>
      <button class="btn-reset" onclick="resetToSample()">↺ Reset to Sample</button>
    </div>
    <p class="note">* Dashboard auto-loads live data from the API. Use Update Dashboard to apply manual changes.</p>
  </div>

  <div class="section-title">Section-wise Performance</div>
  <div class="section-scores" id="sec-cards"></div>

  <div class="chart-grid">
    <div class="chart-card full">
      <h3>Overall Section Scores</h3>
      <div class="chart-sub">Average satisfaction score per section (out of 100)</div>
      <div class="chart-wrap tall"><canvas id="chart-sections"></canvas></div>
    </div>
    <div class="chart-card">
      <h3>Score Distribution</h3>
      <div class="chart-sub">How sections compare — radar view</div>
      <div class="chart-wrap"><canvas id="chart-radar"></canvas></div>
    </div>
    <div class="chart-card">
      <h3>Performance Benchmark</h3>
      <div class="chart-sub">Section scores vs target threshold (75%)</div>
      <div class="chart-wrap"><canvas id="chart-gauge"></canvas></div>
    </div>
  </div>

  <div class="section-title">Risk Flags &amp; Action Areas</div>
  <div class="risk-grid" id="risk-grid"></div>

  <div class="chart-grid">
    <div class="chart-card">
      <h3>Response Rate</h3>
      <div class="chart-sub">Supplier participation in the survey</div>
      <div class="chart-wrap"><canvas id="chart-rate"></canvas></div>
    </div>
    <div class="chart-card">
      <h3>Score Interpretation Guide</h3>
      <div class="chart-sub">How to read section scores</div>
      <div style="margin-top:.5rem">
        <div style="display:flex;align-items:center;gap:10px;padding:.6rem 0;border-bottom:1px solid #F0EDE6">
          <div style="width:12px;height:12px;border-radius:3px;background:#639922;flex-shrink:0"></div>
          <div><div style="font-size:13px;font-weight:500">85–100 — Excellent</div><div style="font-size:12px;color:#666">Suppliers are highly satisfied. Maintain current practices.</div></div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;padding:.6rem 0;border-bottom:1px solid #F0EDE6">
          <div style="width:12px;height:12px;border-radius:3px;background:#378ADD;flex-shrink:0"></div>
          <div><div style="font-size:13px;font-weight:500">70–84 — Good</div><div style="font-size:12px;color:#666">Strong performance. Minor improvements can be made.</div></div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;padding:.6rem 0;border-bottom:1px solid #F0EDE6">
          <div style="width:12px;height:12px;border-radius:3px;background:#EF9F27;flex-shrink:0"></div>
          <div><div style="font-size:13px;font-weight:500">50–69 — Needs Improvement</div><div style="font-size:12px;color:#666">Specific gaps exist. Create an action plan.</div></div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;padding:.6rem 0">
          <div style="width:12px;height:12px;border-radius:3px;background:#E24B4A;flex-shrink:0"></div>
          <div><div style="font-size:13px;font-weight:500">Below 50 — Critical</div><div style="font-size:12px;color:#666">Immediate action required. Escalate to leadership.</div></div>
        </div>
      </div>
    </div>
  </div>

</div>
<div class="footer">Amber Supplier Satisfaction Survey — Confidential Dashboard &nbsp;|&nbsp; Generated by Third-Party Agency &nbsp;|&nbsp; For Internal Use Only</div>
`;

const JS = `
const SECTIONS = [
  {id:'a', label:'A', name:'Relationship &\\nCommunication', shortName:'Relationship', color:'#BA7517'},
  {id:'b', label:'B', name:'Plant &\\nProcurement', shortName:'Procurement', color:'#185FA5'},
  {id:'c', label:'C', name:'Finance &\\nAccounts', shortName:'Finance', color:'#534AB7'},
  {id:'d', label:'D', name:'Quality\\nDepartment', shortName:'Quality', color:'#993556'},
  {id:'e', label:'E', name:'Sourcing &\\nStrategy', shortName:'Sourcing', color:'#712B13'},
  {id:'f', label:'F', name:'Overall\\nOutlook', shortName:'Overall', color:'#3B6D11'},
];

let chartSections, chartRadar, chartGauge, chartRate;

function getColor(score){
  if(score>=85) return '#639922';
  if(score>=70) return '#378ADD';
  if(score>=50) return '#EF9F27';
  return '#E24B4A';
}
function getRating(score){
  if(score>=85) return ['Excellent','pill-green'];
  if(score>=70) return ['Good','pill-blue'];
  if(score>=50) return ['Needs Improvement','pill-amber'];
  return ['Critical','pill-red'];
}

function getScores(){
  return SECTIONS.map(s => parseInt(document.getElementById('in-'+s.id).value)||0);
}

function updateDashboard(){
  const scores = getScores();
  const overall = Math.round(scores.reduce((a,b)=>a+b,0)/scores.length);
  const total = parseInt(document.getElementById('in-total').value)||0;
  const resp = parseInt(document.getElementById('in-resp').value)||0;
  const period = document.getElementById('in-period').value||'—';
  const rate = total>0?Math.round((resp/total)*100):0;

  document.getElementById('badge-date').textContent = 'Survey Period: '+period;
  document.getElementById('badge-resp').textContent = resp+' Responses';

  document.getElementById('s-overall').textContent = overall+'%';
  const [rLabel, rClass] = getRating(overall);
  const ratingEl = document.getElementById('s-rating');
  ratingEl.textContent = rLabel;
  ratingEl.className = 'stat-pill '+rClass;

  document.getElementById('s-rate').textContent = rate+'%';
  document.getElementById('s-rate-sub').textContent = resp+' of '+total+' suppliers';
  const ratePill = document.getElementById('s-rate-pill');
  ratePill.textContent = rate>=75?'Target Met':'Below Target (75%)';
  ratePill.className = 'stat-pill '+(rate>=75?'pill-green':'pill-amber');

  const maxIdx = scores.indexOf(Math.max(...scores));
  const minIdx = scores.indexOf(Math.min(...scores));
  document.getElementById('s-best').textContent = 'Section '+SECTIONS[maxIdx].label+' — '+SECTIONS[maxIdx].shortName;
  document.getElementById('s-best-score').textContent = scores[maxIdx]+'%';
  document.getElementById('s-worst').textContent = 'Section '+SECTIONS[minIdx].label+' — '+SECTIONS[minIdx].shortName;
  document.getElementById('s-worst-score').textContent = scores[minIdx]+'%';

  const secCards = document.getElementById('sec-cards');
  secCards.innerHTML = SECTIONS.map((s,i)=>{
    const sc = scores[i];
    const col = getColor(sc);
    const circ = 2*Math.PI*20;
    const dash = (sc/100)*circ;
    return '<div class="sec-card"><svg class="score-ring" width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="none" stroke="#F0EDE6" stroke-width="5"/><circle cx="24" cy="24" r="20" fill="none" stroke="'+col+'" stroke-width="5" stroke-dasharray="'+dash.toFixed(1)+' '+circ.toFixed(1)+'" stroke-linecap="round"/></svg><div class="sec-letter" style="color:'+col+'">'+s.label+'</div><div class="sec-name">'+s.shortName+'</div><div class="sec-score">'+sc+'%</div></div>';
  }).join('');

  updateCharts(scores, rate, resp, total);
  updateRiskGrid(scores);
}

function updateCharts(scores, rate, resp, total){
  if(chartSections) chartSections.destroy();
  chartSections = new Chart(document.getElementById('chart-sections').getContext('2d'),{
    type:'bar',
    data:{
      labels: SECTIONS.map(s=>'Sec '+s.label+' — '+s.shortName),
      datasets:[{
        data:scores,
        backgroundColor:scores.map(s=>getColor(s)+'33'),
        borderColor:scores.map(getColor),
        borderWidth:2,
        borderRadius:8,
      },{
        type:'line',
        label:'Target (75%)',
        data:new Array(6).fill(75),
        borderColor:'#E24B4A',
        borderWidth:1.5,
        borderDash:[6,4],
        pointRadius:0,
        fill:false,
        tension:0,
      }]
    },
    options:{
      responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>ctx.datasetIndex===0?ctx.parsed.y+'% score':ctx.parsed.y+'% target'}}},
      scales:{
        y:{min:0,max:100,grid:{color:'rgba(0,0,0,.05)'},ticks:{callback:v=>v+'%',font:{size:11}}},
        x:{grid:{display:false},ticks:{font:{size:11}}}
      }
    }
  });

  if(chartRadar) chartRadar.destroy();
  chartRadar = new Chart(document.getElementById('chart-radar').getContext('2d'),{
    type:'radar',
    data:{
      labels:SECTIONS.map(s=>s.shortName),
      datasets:[{
        data:scores,
        backgroundColor:'rgba(186,117,23,.15)',
        borderColor:'#BA7517',
        borderWidth:2,
        pointBackgroundColor:'#BA7517',
        pointRadius:4,
      },{
        data:new Array(6).fill(75),
        backgroundColor:'rgba(226,75,74,.05)',
        borderColor:'rgba(226,75,74,.4)',
        borderWidth:1,
        borderDash:[4,4],
        pointRadius:0,
        label:'Target'
      }]
    },
    options:{
      responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false}},
      scales:{r:{min:0,max:100,ticks:{stepSize:25,font:{size:10}},grid:{color:'rgba(0,0,0,.08)'},pointLabels:{font:{size:11}}}}
    }
  });

  if(chartGauge) chartGauge.destroy();
  const above = scores.filter(s=>s>=75).length;
  const below = scores.filter(s=>s<75).length;
  chartGauge = new Chart(document.getElementById('chart-gauge').getContext('2d'),{
    type:'doughnut',
    data:{
      labels:['Above Target (>=75%)','Below Target (<75%)'],
      datasets:[{data:[above,below],backgroundColor:['#639922','#E24B4A'],borderWidth:0,borderRadius:6}]
    },
    options:{
      responsive:true,maintainAspectRatio:false,cutout:'65%',
      plugins:{legend:{position:'bottom',labels:{font:{size:11},padding:12}},
        tooltip:{callbacks:{label:ctx=>ctx.label+': '+ctx.parsed+' section(s)'}}}
    }
  });

  if(chartRate) chartRate.destroy();
  const notResp = total - resp;
  chartRate = new Chart(document.getElementById('chart-rate').getContext('2d'),{
    type:'doughnut',
    data:{
      labels:['Responded','Not Responded'],
      datasets:[{data:[resp, notResp>0?notResp:0],backgroundColor:['#BA7517','#F0EDE6'],borderWidth:0,borderRadius:6}]
    },
    options:{
      responsive:true,maintainAspectRatio:false,cutout:'65%',
      plugins:{
        legend:{position:'bottom',labels:{font:{size:11},padding:12}},
        tooltip:{callbacks:{label:ctx=>ctx.label+': '+ctx.parsed+' suppliers'}}
      }
    }
  });
}

function updateRiskGrid(scores){
  const grid = document.getElementById('risk-grid');
  const ranked = SECTIONS.map((s,i)=>({...s, score:scores[i]})).sort((a,b)=>a.score-b.score);

  grid.innerHTML = ranked.map(s=>{
    const cls = s.score<50?'critical':s.score<75?'warning':'good';
    const icon = s.score<50?'🚨':s.score<75?'⚠️':'✅';
    const action = s.score<50?'Immediate action required — escalate to leadership':
                   s.score<75?'Create improvement action plan within 2 weeks':
                   'Maintain current practices — share as best practice';
    return '<div class="risk-card '+cls+'"><div class="risk-section">'+icon+' Section '+s.label+' — '+s.shortName+'</div><div class="risk-bar-wrap"><div class="risk-bar" style="width:'+s.score+'%;background:'+getColor(s.score)+'"></div></div><div class="risk-score">'+s.score+'% &nbsp;|&nbsp; '+getRating(s.score)[0]+'</div><div style="font-size:12px;color:#666;margin-top:8px;line-height:1.4">'+action+'</div></div>';
  }).join('');
}

function resetToSample(){
  const sample = [78,65,55,72,60,70];
  SECTIONS.forEach((s,i)=>document.getElementById('in-'+s.id).value=sample[i]);
  document.getElementById('in-total').value=45;
  document.getElementById('in-resp').value=38;
  document.getElementById('in-period').value='May 12–14, 2025';
  updateDashboard();
}

async function fetchLiveScores() {
  try {
    const res = await fetch('/api/results');
    if (!res.ok) throw new Error();
    const data = await res.json();

    document.getElementById('in-a').value = data.scores.a;
    document.getElementById('in-b').value = data.scores.b;
    document.getElementById('in-c').value = data.scores.c;
    document.getElementById('in-d').value = data.scores.d;
    document.getElementById('in-e').value = data.scores.e;
    document.getElementById('in-f').value = data.scores.f;

    document.getElementById('in-resp').value  = data.submittedPlants;
    document.getElementById('in-total').value = data.totalPlants;
    document.getElementById('in-period').value = data.period;

    updateDashboard();
  } catch {
    updateDashboard();
  }
}

if (document.readyState === 'complete') {
  fetchLiveScores();
} else {
  window.addEventListener('load', fetchLiveScores);
}
`;

export default function DashboardPage() {
  useEffect(() => {
    const chartScript = document.createElement('script');
    chartScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js';
    chartScript.onload = () => {
      const dashScript = document.createElement('script');
      dashScript.id = 'dashboard-logic';
      dashScript.textContent = JS;
      document.body.appendChild(dashScript);
    };
    document.head.appendChild(chartScript);

    return () => {
      if (document.head.contains(chartScript)) document.head.removeChild(chartScript);
      const dashScript = document.getElementById('dashboard-logic');
      if (dashScript?.parentNode) dashScript.parentNode.removeChild(dashScript);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div dangerouslySetInnerHTML={{ __html: HTML }} />
    </>
  );
}
