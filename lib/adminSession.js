import crypto from "node:crypto";

export const ADMIN_COOKIE_NAME = "leadmagnet_admin_session";

const SESSION_TTL_SECONDS = 60 * 60 * 8;

function shouldUseSecureCookie() {
  return process.env.NODE_ENV === "production" && process.env.ADMIN_COOKIE_SECURE !== "false";
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.SUPABASE_SERVICE_KEY || "";
}

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || "",
    password: process.env.ADMIN_PASSWORD || "",
  };
}

function base64Url(input) {
  return Buffer.from(input).toString("base64url");
}

function sign(value) {
  return crypto
    .createHmac("sha256", getSessionSecret())
    .update(value)
    .digest("base64url");
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

export function isAdminPassword(username, password) {
  const credentials = getAdminCredentials();

  if (!credentials.username || !credentials.password) {
    return false;
  }

  return (
    safeEqual(username, credentials.username) &&
    safeEqual(password, credentials.password)
  );
}

export function createAdminSession(username) {
  const now = Math.floor(Date.now() / 1000);
  const payload = base64Url(JSON.stringify({
    username,
    iat: now,
    exp: now + SESSION_TTL_SECONDS,
  }));

  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSession(token) {
  if (!token || !getSessionSecret()) {
    return null;
  }

  const [payload, signature] = String(token).split(".");
  if (!payload || !signature || !safeEqual(signature, sign(payload))) {
    return null;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    const now = Math.floor(Date.now() / 1000);

    if (!session.username || !session.exp || session.exp < now) {
      return null;
    }

    const credentials = getAdminCredentials();
    if (!credentials.username || !safeEqual(session.username, credentials.username)) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function getAdminSessionFromRequest(request) {
  const cookieToken =
    request.cookies?.get?.(ADMIN_COOKIE_NAME)?.value ||
    (request.headers.get("cookie") || "")
      .split(";")
      .map(part => part.trim())
      .find(part => part.startsWith(`${ADMIN_COOKIE_NAME}=`))
      ?.slice(ADMIN_COOKIE_NAME.length + 1);

  return verifyAdminSession(cookieToken);
}

export function setAdminCookie(response, token) {
  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: shouldUseSecureCookie(),
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export function clearAdminCookie(response) {
  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: shouldUseSecureCookie(),
    path: "/",
    maxAge: 0,
  });
}
