import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { requireAdmin } from "@/lib/admin";
import { FALLBACK_PLANS, getPlanSettings } from "@/lib/plans";

const PLAN_KEYS = new Set(FALLBACK_PLANS.map(plan => plan.plan_key));

function getSupabase() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    return null;
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
}

function cleanFeatures(value) {
  if (Array.isArray(value)) {
    return value.map(item => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split("\n")
      .map(item => item.trim())
      .filter(Boolean);
  }

  return [];
}

function cleanPlan(rawPlan) {
  const planKey = String(rawPlan.plan_key || "").trim().toLowerCase();

  if (!PLAN_KEYS.has(planKey)) {
    throw new Error(`Invalid plan key: ${planKey}`);
  }

  return {
    plan_key: planKey,
    name: String(rawPlan.name || "").trim(),
    price: Number(rawPlan.price || 0),
    currency: String(rawPlan.currency || "EUR").trim().toUpperCase(),
    period: String(rawPlan.period || "/ month").trim(),
    description: String(rawPlan.description || "").trim(),
    features: cleanFeatures(rawPlan.features),
    stripe_price_id: String(rawPlan.stripe_price_id || "").trim() || null,
    popular: !!rawPlan.popular,
    active: rawPlan.active !== false,
    sort_order: Number(rawPlan.sort_order || 0),
  };
}

export async function GET(request) {
  const admin = await requireAdmin(request);
  if (!admin.authorized) {
    return NextResponse.json({ error: admin.error }, { status: admin.status });
  }

  const plans = await getPlanSettings({ activeOnly: false });
  const warning = getSupabase()
    ? ""
    : "Package database is not connected yet. Showing default packages.";

  return NextResponse.json({ plans, warning });
}

export async function PUT(request) {
  const admin = await requireAdmin(request);
  if (!admin.authorized) {
    return NextResponse.json({ error: admin.error }, { status: admin.status });
  }

  try {
    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: "Package database is not connected yet. Add real Supabase keys before saving package changes." },
        { status: 503 }
      );
    }

    const { plans } = await request.json();

    if (!Array.isArray(plans)) {
      return NextResponse.json({ error: "Expected plans array" }, { status: 400 });
    }

    const cleaned = plans.map(cleanPlan);

    for (const plan of cleaned) {
      if (!plan.name || plan.price < 0) {
        return NextResponse.json({ error: "Plan name and valid price are required" }, { status: 400 });
      }
    }

    const { data, error } = await supabase
      .from("plan_settings")
      .upsert(cleaned, { onConflict: "plan_key" })
      .select()
      .order("sort_order", { ascending: true });

    if (error) throw error;

    return NextResponse.json({ success: true, plans: data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
