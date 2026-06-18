import { NextResponse } from "next/server";
import { formatPlanPrice, getPlanSettings } from "@/lib/plans";

export async function GET() {
  const plans = await getPlanSettings({ activeOnly: true });

  return NextResponse.json({
    plans: plans.map(plan => ({
      ...plan,
      display_price: formatPlanPrice(plan),
    })),
  });
}
