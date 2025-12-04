import appRouter from "@feedgot/api";
import { handle } from "hono/vercel";
import { withCors, handlePreflight } from "@feedgot/auth/trust";
const handler = handle(appRouter.handler);

export const OPTIONS = handlePreflight;

export const GET = async (req: Request) => withCors(req, await handler(req));
export const POST = async (req: Request) => withCors(req, await handler(req));
