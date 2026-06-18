import { getAuthUser } from "@/lib/auth";
import { getAdminSessionFromRequest } from "@/lib/adminSession";

export function getAdminEmails() {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map(email => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email) {
  if (!email) return false;
  const adminEmails = getAdminEmails();
  return adminEmails.includes(email.toLowerCase());
}

export async function requireAdmin(request) {
  const session = getAdminSessionFromRequest(request);
  if (session) {
    return {
      authorized: true,
      user: { email: session.username, isAdminSession: true },
      error: null,
      status: 200,
    };
  }

  const { user, error } = await getAuthUser(request);

  if (error || !user) {
    return { authorized: false, user: null, error: error || "Not authenticated", status: 401 };
  }

  if (!isAdminEmail(user.email)) {
    return { authorized: false, user, error: "Admin access required", status: 403 };
  }

  return { authorized: true, user, error: null, status: 200 };
}
