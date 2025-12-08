import { Elysia } from "elysia"
import appRouter from "./index"

export const app = new Elysia({ prefix: "/api" })
  .get("/elysia-health", () => "Elysia is working!")
  .mount("/", appRouter.handler.fetch.bind(appRouter.handler))

export type App = typeof app
