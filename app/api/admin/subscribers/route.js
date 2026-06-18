import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { requireAdmin } from "@/lib/admin";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function GET(request) {
  const admin = await requireAdmin(request);
  if (!admin.authorized) {
    return NextResponse.json({ error: admin.error }, { status: admin.status });
  }

  try {
    const { data: subscriptions, error } = await supabase
      .from("subscriptions")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) throw error;

    const { data: profiles } = await supabase
      .from("profiles")
      .select("user_id, agency_name, client_count, source, platforms, onboarded");

    const profileByUser = new Map((profiles || []).map(profile => [profile.user_id, profile]));
    const userIds = (subscriptions || []).map(sub => sub.user_id).filter(Boolean);
    const userById = new Map();

    for (const userId of userIds) {
      try {
        const { data } = await supabase.auth.admin.getUserById(userId);
        if (data?.user) userById.set(userId, data.user);
      } catch {
        // Keep the subscriber row visible even if auth metadata cannot be loaded.
      }
    }

    const subscribers = (subscriptions || []).map(sub => {
      const user = userById.get(sub.user_id);
      const profile = profileByUser.get(sub.user_id);

      return {
        user_id: sub.user_id,
        email: user?.email || null,
        created_at: user?.created_at || null,
        plan: sub.plan || "free",
        status: sub.status || "none",
        stripe_customer_id: sub.stripe_customer_id || null,
        stripe_subscription_id: sub.stripe_subscription_id || null,
        current_period_end: sub.current_period_end || null,
        updated_at: sub.updated_at || null,
        agency_name: profile?.agency_name || null,
        client_count: profile?.client_count || null,
        source: profile?.source || null,
        platforms: profile?.platforms || [],
        onboarded: !!profile?.onboarded,
      };
    });

    return NextResponse.json({ subscribers });
  } catch {
    return NextResponse.json({
      subscribers: [],
      warning: "Subscriber database is not connected yet. Add real Supabase keys to show subscribed clients.",
    });
  }
}
