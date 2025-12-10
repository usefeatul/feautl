import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

type Result = { success: boolean; remaining: number; reset: number; limit: number }

const url = String(process.env.UPSTASH_REDIS_REST_URL || "").trim()
const token = String(process.env.UPSTASH_REDIS_REST_TOKEN || "").trim()

const redis = new Redis({ url, token })

const ratelimitPublic = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(60, "60 s"), analytics: false, prefix: "rl:pub" })
const ratelimitPrivate = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(120, "60 s"), analytics: false, prefix: "rl:priv" })
const ratelimitHealth = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(30, "60 s"), analytics: false, prefix: "rl:health" })

function getIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for") || ""
  const cf = req.headers.get("cf-connecting-ip") || ""
  const fly = req.headers.get("fly-client-ip") || ""
  const real = req.headers.get("x-real-ip") || ""
  const first = String(xff.split(",")[0] || "").trim()
  return first || cf || fly || real || "unknown"
}

export async function limitPublic(req: Request): Promise<Result> {
  return await ratelimitPublic.limit(getIp(req))
}

export async function limitPrivate(req: Request, userId: string): Promise<Result> {
  const key = userId || getIp(req)
  return await ratelimitPrivate.limit(key)
}

export async function limitHealth(req: Request): Promise<Result> {
  return await ratelimitHealth.limit(getIp(req))
}

