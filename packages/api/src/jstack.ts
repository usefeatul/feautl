import { jstack } from "jstack"
import { auth } from "@oreilla/auth/auth"
import { HTTPException } from "hono/http-exception"
import { headers } from "next/headers"
import { db } from "@oreilla/db"
import { limitPublic, limitPrivate } from "./services/ratemiliter"


export const j = jstack.init()

const databaseMiddleware = j.middleware(async ({ next }) => {
  return await next({ db: db as any })
})

const authMiddleware = j.middleware(async ({ next, c }) => {
  const session = await auth.api.getSession({
    headers: (c as any)?.req?.raw?.headers || (await headers()),
  })
  if (!session || !session.user) {
    throw new HTTPException(401, { message: "Unauthorized" })
  }
  return await next({ session: session as any })
})

const rateLimitMiddlewarePublic = j.middleware(async ({ next, c }) => {
  const method = String(((c as any)?.req?.raw?.method || (c as any)?.request?.method || "")).toUpperCase()
  if (method === "OPTIONS") return await next()
  const req: Request = (c as any)?.req?.raw || (c as any)?.request
  const res = await limitPublic(req)
  if (!res.success) {
    const retry = Math.max(1, Math.ceil((res.reset - Date.now()) / 1000))
    c.header("Retry-After", String(retry))
    throw new HTTPException(429, { message: "Too Many Requests" })
  }
  c.header("X-RateLimit-Limit", String(res.limit))
  c.header("X-RateLimit-Remaining", String(res.remaining))
  return await next()
})

const rateLimitMiddlewarePrivate = j.middleware(async ({ next, c }) => {
  const method = String(((c as any)?.req?.raw?.method || (c as any)?.request?.method || "")).toUpperCase()
  if (method === "OPTIONS") return await next()
  const req: Request = (c as any)?.req?.raw || (c as any)?.request
  const session = await auth.api.getSession({
    headers: (c as any)?.req?.raw?.headers || (await headers()),
  })
  const userId = String(session?.user?.id || "")
  const res = await limitPrivate(req, userId)
  if (!res.success) {
    const retry = Math.max(1, Math.ceil((res.reset - Date.now()) / 1000))
    c.header("Retry-After", String(retry))
    throw new HTTPException(429, { message: "Too Many Requests" })
  }
  c.header("X-RateLimit-Limit", String(res.limit))
  c.header("X-RateLimit-Remaining", String(res.remaining))
  return await next()
})

export const publicProcedure = j.procedure.use(databaseMiddleware).use(rateLimitMiddlewarePublic)
export const privateProcedure = publicProcedure.use(authMiddleware).use(rateLimitMiddlewarePrivate)
