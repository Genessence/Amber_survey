# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # Start dev server (http://localhost:3000)
npm run build     # Production build
npm run start     # Start production server
```

No lint or test scripts are configured.

## Architecture

**Next.js 16.2.6** (App Router) with **React 19** and **TypeScript**. Backend is **Supabase** (Postgres).

### Routes

| Path | File | Purpose |
|------|------|---------|
| `/` | `app/page.tsx` | Redirects to `/survey` |
| `/survey` | `app/survey/page.tsx` | 31-question supplier satisfaction form |
| `/dashboard` | `app/dashboard/page.tsx` | Results dashboard with Chart.js visualizations |
| `POST /api/submit` | `app/api/submit/route.ts` | Stores survey responses |
| `GET /api/results` | `app/api/results/route.ts` | Aggregates scores per section |

### Unusual rendering pattern

Both `/survey` and `/dashboard` are `'use client'` pages that inject all their CSS, HTML, and JavaScript via `dangerouslySetInnerHTML` + `useEffect`-injected `<script>` tags. This is intentional — the survey and dashboard are self-contained interactive pages where UI logic lives in plain JS strings (`CSS`, `HTML`, `JS` constants), not in React components. Do not refactor this pattern unless explicitly asked.

### Data layer (`lib/`)

- `lib/supabase.ts` — server-side Supabase client (service key, never expose to browser)
- `lib/scoring.ts` — `SCORE_MAP` (text answer → 0–100 numeric), `QUESTION_META` (maps q1–q31 to section/text), `aggregateScores()` (averages per section from `AnswerRow[]`), `RISK_QUESTIONS` (8 high-priority questions flagged for the dashboard)

### Database schema

Single table `responses` in Supabase with columns: `submission_id`, `section_key`, `section_name`, `question_key`, `question_text`, `answer`, `remark`. Each survey submission inserts 31 rows (one per question) sharing a UUID `submission_id`.

### Environment variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_KEY` | Service-role key (server only) |
| `SURVEY_PERIOD` | Display string for survey period (e.g. `"May 26–28, 2025"`) |
| `TOTAL_SUPPLIERS` | Denominator for response rate calculation |

`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` is set in `.env.local` but not currently used in code — `lib/supabase.ts` uses only `SUPABASE_SERVICE_KEY`.

### Scoring

Answers map to scores: `Fully Satisfied → 100`, `Satisfied → 75`, `Average → 50`, `Not Aligned with Amber → 0`. Section scores are the arithmetic mean of all question scores within that section across all submissions. The dashboard also accepts manually entered scores (0–100) via its data-entry form.
