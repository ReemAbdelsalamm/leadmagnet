-- LeadMagnet admin foundation
-- Run this in Supabase SQL editor before using editable packages.

create table if not exists public.plan_settings (
  id uuid primary key default gen_random_uuid(),
  plan_key text not null unique,
  name text not null,
  price numeric not null default 0,
  currency text not null default 'EUR',
  period text not null default '/ month',
  description text not null default '',
  features jsonb not null default '[]'::jsonb,
  stripe_price_id text,
  popular boolean not null default false,
  active boolean not null default true,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

insert into public.plan_settings
  (plan_key, name, price, currency, period, description, features, stripe_price_id, popular, active, sort_order)
values
  ('starter', 'Starter', 49, 'EUR', '/ month', 'For consultants & small agencies',
    '["1 workspace","5 active campaigns","LinkedIn automation","Leads dashboard","CSV export","Basic analytics","Email support"]'::jsonb,
    null, false, true, 1),
  ('pro', 'Pro', 99, 'EUR', '/ month', 'For growing agencies',
    '["5 client workspaces","25 active campaigns","Everything in Starter","Instagram automation","Gmail sequences","Advanced analytics","Priority support"]'::jsonb,
    null, true, true, 2),
  ('agency', 'Agency', 199, 'EUR', '/ month', 'For full-scale agencies',
    '["15 client workspaces","75 active campaigns","Everything in Pro","Agency client manager","Automated client reports","White-label dashboard","Dedicated account manager"]'::jsonb,
    null, false, true, 3),
  ('scale', 'Scale', 399, 'EUR', '/ month', 'For agencies scaling lead intelligence',
    '["Everything in Agency","Lead Radar","AI lead scoring","2,000 monthly scoring credits","ICP profiles per client","Campaign lead sync","Priority strategy support"]'::jsonb,
    null, false, true, 4)
on conflict (plan_key) do nothing;

create or replace function public.touch_plan_settings_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists plan_settings_touch_updated_at on public.plan_settings;
create trigger plan_settings_touch_updated_at
before update on public.plan_settings
for each row
execute function public.touch_plan_settings_updated_at();
