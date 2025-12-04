import { jstack } from "jstack"
import { auth } from "@feedgot/auth/auth"
import { HTTPException } from "hono/http-exception"
import { headers } from "next/headers"

import { db } from "@feedgot/db"


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

export const publicProcedure = j.procedure.use(databaseMiddleware)
export const privateProcedure = publicProcedure.use(authMiddleware)
