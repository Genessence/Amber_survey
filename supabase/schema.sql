-- Run this in the Supabase SQL editor (once only)

-- New table: one row per unique supplier email
create table tokens (
  id            uuid        primary key default gen_random_uuid(),
  email         text        not null unique,
  token         text        not null unique,
  plants        text[]      not null,
  plant_count   int         not null default 1,
  email_sent    boolean     not null default false,
  email_sent_at timestamptz,
  submitted     boolean     not null default false,
  submitted_at  timestamptz,
  response_id   text        -- stores the submission_id from responses table
);

-- Add token_id to existing responses table
alter table responses
  add column if not exists token_id uuid references tokens(id);

-- Distinct submission count for dashboard KPIs (run once in Supabase SQL editor)
create or replace function count_distinct_submissions()
returns bigint
language sql
stable
as $$
  select count(distinct submission_id) from responses;
$$;
