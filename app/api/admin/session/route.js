import { NextResponse } from "next/server";
import {
  clearAdminCookie,
  createAdminSession,
  getAdminCredentials,
  getAdminSessionFromRequest,
  isAdminPassword,
  setAdminCookie,
} from "@/lib/adminSession";

export async function GET(request) {
  const session = getAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    admin: { username: session.username },
  });
}

export async function POST(request) {
  const credentials = getAdminCredentials();

  if (!credentials.username || !credentials.password) {
    return NextResponse.json(
      { error: "Admin account is not configured" },
      { status: 500 }
    );
  }

  const { username, password } = await request.json();

  if (!isAdminPassword(String(username || ""), String(password || ""))) {
    return NextResponse.json(
      { error: "Invalid admin username or password" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    authenticated: true,
    admin: { username: credentials.username },
  });
  setAdminCookie(response, createAdminSession(credentials.username));
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  clearAdminCookie(response);
  return response;
}
