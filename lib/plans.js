import { createClient } from "@supabase/supabase-js";

export const FALLBACK_PLANS = [
  {
    plan_key: "starter",
    name: "Starter",
    price: 49,
    currency: "EUR",
    period: "/ month",
    description: "For consultants & small agencies",
    features: [
      "1 workspace",
      "5 active campaigns",
      "LinkedIn automation",
      "Leads dashboard",
      "CSV export",
      "Basic analytics",
      "Email support",
    ],
    stripe_price_id: process.env.STRIPE_STARTER_PRICE_ID || "",
    sort_order: 1,
    popular: false,
    active: true,
  },
  {
    plan_key: "pro",
    name: "Pro",
    price: 99,
    currency: "EUR",
    period: "/ month",
    description: "For growing agencies",
    features: [
      "5 client workspaces",
      "25 active campaigns",
      "Everything in Starter",
      "Instagram automation",
      "Gmail sequences",
      "Advanced analytics",
      "Priority support",
    ],
    stripe_price_id: process.env.STRIPE_PRO_PRICE_ID || "",
    sort_order: 2,
    popular: true,
    active: true,
  },
  {
    plan_key: "agency",
    name: "Agency",
    price: 199,
    currency: "EUR",
    period: "/ month",
    description: "For full-scale agencies",
    features: [
      "15 client workspaces",
      "75 active campaigns",
      "Everything in Pro",
      "Agency client manager",
      "Automated client reports",
      "White-label dashboard",
      "Dedicated account manager",
    ],
    stripe_price_id: process.env.STRIPE_AGENCY_PRICE_ID || "",
    sort_order: 3,
    popular: false,
    active: true,
  },
  {
    plan_key: "scale",
    name: "Scale",
    price: 399,
    currency: "EUR",
    period: "/ month",
    description: "For agencies scaling lead intelligence",
    features: [
      "Everything in Agency",
      "Lead Radar",
      "AI lead scoring",
      "2,000 monthly scoring credits",
      "ICP profiles per client",
      "Campaign lead sync",
      "Priority strategy support",
    ],
    stripe_price_id: process.env.STRIPE_SCALE_PRICE_ID || "",
    sort_order: 4,
    popular: false,
    active: true,
  },
];

function getSupabase() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    return null;
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
}

export function formatPlanPrice(plan) {
  const currency = plan.currency || "EUR";
  const symbol = currency === "EUR" ? "€" : currency === "USD" ? "$" : `${currency} `;
  return `${symbol}${Number(plan.price || 0)}`;
}

function normalizePlan(plan) {
  return {
    ...plan,
    price: Number(plan.price || 0),
    currency: plan.currency || "EUR",
    period: plan.period || "/ month",
    features: Array.isArray(plan.features) ? plan.features : [],
    active: plan.active !== false,
    popular: !!plan.popular,
    sort_order: Number(plan.sort_order || 0),
  };
}

export async function getPlanSettings({ activeOnly = true } = {}) {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      return FALLBACK_PLANS.filter(plan => !activeOnly || plan.active).map(normalizePlan);
    }

    const { data, error } = await supabase
      .from("plan_settings")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return FALLBACK_PLANS.filter(plan => !activeOnly || plan.active).map(normalizePlan);
    }

    return data
      .map(normalizePlan)
      .filter(plan => !activeOnly || plan.active);
  } catch {
    return FALLBACK_PLANS.filter(plan => !activeOnly || plan.active).map(normalizePlan);
  }
}

export async function getPlanByKey(planKey) {
  const plans = await getPlanSettings({ activeOnly: false });
  return plans.find(plan => plan.plan_key === planKey) || null;
}

export async function getPlanKeyByPriceId(priceId) {
  if (!priceId) return "free";
  const plans = await getPlanSettings({ activeOnly: false });
  const plan = plans.find(item => item.stripe_price_id === priceId);
  return plan?.plan_key || "free";
}

export function fallbackPlanForKey(planKey) {
  return FALLBACK_PLANS.find(plan => plan.plan_key === planKey) || null;
}
