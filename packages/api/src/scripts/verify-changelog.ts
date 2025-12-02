import { db, workspace, board, boardModerator } from "@feedgot/db"
import { normalizePlan, getPlanLimits } from "../shared/plan"

async function main(slug: string) {
  const [ws] = await db.select({ id: workspace.id, plan: workspace.plan }).from(workspace).where(workspace.slug.eq(slug)).limit(1)
  if (!ws) {
    console.log("workspace not found")
    return
  }
  const plan = normalizePlan(String(ws.plan || "free"))
  const limits = getPlanLimits(plan)
  const [b] = await db.select({ id: board.id, isVisible: board.isVisible }).from(board).where(board.workspaceId.eq(ws.id).and(board.systemType.eq("changelog"))).limit(1)
  if (!b) {
    console.log("changelog board not found")
    return
  }
  const [row] = await db.select({ count: db.$count() as unknown as number }).from(boardModerator).where(boardModerator.boardId.eq(b.id)).limit(1)
  console.log(JSON.stringify({ slug, plan, isVisible: Boolean(b.isVisible), moderators: Number(row?.count || 0), maxAllowed: limits.maxChangelogModerators }))
}

// Usage: run via ts-node or tsx
if (process.argv[2]) {
  main(String(process.argv[2])).catch((e) => { console.error(e?.message || e) })
} else {
  console.log("usage: verify-changelog <workspace-slug>")
}

