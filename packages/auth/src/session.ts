import { headers } from "next/headers";
import { auth } from "./auth";
import { db, session as sessionTable } from "@feedgot/db";
import { eq, desc } from "drizzle-orm";

export async function getServerSession() {
  try {
    const headersList = await headers()
    const cookieHeader = headersList.get('cookie')
    const hostHeader = headersList.get('host')
    const originHeader = headersList.get('origin')
    const refererHeader = headersList.get('referer')
    
    console.log(`[getServerSession] Host: ${hostHeader}, Origin: ${originHeader}, Referer: ${refererHeader}`)
    console.log(`[getServerSession] Cookie header exists: ${!!cookieHeader}, length: ${cookieHeader?.length || 0}`)
    console.log(`[getServerSession] Full cookie header: ${cookieHeader || 'none'}`)
    
    // Convert Next.js headers to a format better-auth expects
    const headersObj: Record<string, string> = {}
    headersList.forEach((value, key) => {
      headersObj[key] = value
    })
    
    // Ensure cookie header is properly set
    if (cookieHeader) {
      headersObj['cookie'] = cookieHeader
    }
    
    // Add host header if missing (better-auth might need it)
    if (hostHeader && !headersObj['host']) {
      headersObj['host'] = hostHeader
    }
    
    console.log(`[getServerSession] Cookie names in header:`, cookieHeader ? cookieHeader.split(';').map(c => c.split('=')[0]?.trim()).filter(Boolean) : [])
    
    const session = await auth.api.getSession({
      headers: headersObj as any,
    });
    console.log(`[getServerSession] Session retrieved: ${!!session}, userId: ${(session as any)?.user?.id || 'none'}`)
    return session;
  } catch (error) {
    console.log(`[getServerSession] Error getting session:`, error)
    return null;
  }
}

export async function listServerSessions(): Promise<
  { token: string; userAgent?: string | null; ipAddress?: string | null; createdAt?: string; expiresAt?: string }[]
> {
  try {
    const s = await getServerSession();
    const userId = String((s as any)?.user?.id || "").trim();
    if (!userId) return [];
    const rows = await db
      .select({
        token: sessionTable.token,
        userAgent: sessionTable.userAgent,
        ipAddress: sessionTable.ipAddress,
        createdAt: sessionTable.createdAt,
        expiresAt: sessionTable.expiresAt,
      })
      .from(sessionTable)
      .where(eq(sessionTable.userId, userId))
      .orderBy(desc(sessionTable.createdAt));
    return rows.map((r) => ({
      token: String(r.token),
      userAgent: r.userAgent || null,
      ipAddress: r.ipAddress || null,
      createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : undefined,
      expiresAt: r.expiresAt instanceof Date ? r.expiresAt.toISOString() : undefined,
    }));
  } catch {
    return [];
  }
}
