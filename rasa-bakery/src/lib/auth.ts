import { drizzle } from 'drizzle-orm/d1';
import { eq, and, gt } from 'drizzle-orm';
import { adminUsers, adminSessions } from './db/schema';

// Hash password using SHA-256
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
  const data = encoder.encode(saltHex + password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return `${saltHex}:${hashHex}`;
}

// Verify password
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const [salt, hash] = storedHash.split(':');
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex === hash;
}

// Generate session token
export function generateSessionToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Create session (7 days)
export async function createSession(db: D1Database, userId: number): Promise<string> {
  const drizzleDb = drizzle(db);
  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  await drizzleDb.insert(adminSessions).values({
    token,
    userId,
    expiresAt,
  });

  return token;
}

// Validate session
export async function validateSession(db: D1Database, token: string): Promise<{ userId: number; user: typeof adminUsers.$inferSelect } | null> {
  const drizzleDb = drizzle(db);
  const now = new Date().toISOString();

  const result = await drizzleDb
    .select()
    .from(adminSessions)
    .innerJoin(adminUsers, eq(adminSessions.userId, adminUsers.id))
    .where(and(
      eq(adminSessions.token, token),
      gt(adminSessions.expiresAt, now)
    ))
    .limit(1);

  if (result.length === 0) return null;

  return {
    userId: result[0].admin_sessions.userId,
    user: result[0].admin_users,
  };
}

// Delete session
export async function deleteSession(db: D1Database, token: string): Promise<void> {
  const drizzleDb = drizzle(db);
  await drizzleDb.delete(adminSessions).where(eq(adminSessions.token, token));
}

// Get session from cookie
export function getSessionFromCookie(request: Request): string | null {
  const cookie = request.headers.get('cookie');
  if (!cookie) return null;

  const match = cookie.match(/admin_session=([^;]+)/);
  return match ? match[1] : null;
}

// Set session cookie header
export function setSessionCookie(token: string): string {
  const maxAge = 7 * 24 * 60 * 60; // 7 days
  return `admin_session=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;
}

// Clear session cookie header
export function clearSessionCookie(): string {
  return 'admin_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0';
}
