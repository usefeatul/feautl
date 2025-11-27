import { HTTPException } from "hono/http-exception"
import { eq, and, sql } from "drizzle-orm"
import { j, privateProcedure, publicProcedure } from "../jstack"
import { workspace, workspaceMember, board, brandingConfig, tag, post } from "@feedgot/db"
import { createWorkspaceInputSchema, checkSlugInputSchema } from "../validators/workspace"
import { normalizeStatus } from "../shared/status"

export function createWorkspaceRouter() {
  return j.router({
    bySlug: publicProcedure
      .input(checkSlugInputSchema)
      .get(async ({ ctx, input, c }: any) => {
        const [ws] = await ctx.db
          .select({ id: workspace.id, name: workspace.name, slug: workspace.slug, domain: workspace.domain, logo: workspace.logo, timezone: workspace.timezone })
          .from(workspace)
          .where(eq(workspace.slug, input.slug))
          .limit(1)
        c.header("Cache-Control", "public, max-age=30, stale-while-revalidate=300")
        if (!ws) return c.json({ workspace: null })
        return c.superjson({ workspace: ws })
      }),
    checkSlug: privateProcedure
      .input(checkSlugInputSchema)
      .post(async ({ ctx, input, c }: any) => {
        const existing = await ctx.db
          .select({ id: workspace.id })
          .from(workspace)
          .where(eq(workspace.slug, input.slug))
          .limit(1)
        return c.json({ available: existing.length === 0 })
      }),

    exists: privateProcedure.get(async ({ ctx, c }: any) => {
      const userId = ctx.session.user.id
      const owned = await ctx.db
        .select({ id: workspace.id })
        .from(workspace)
        .where(eq(workspace.ownerId, userId))
        .limit(1)
      const member = await ctx.db
        .select({ id: workspaceMember.id })
        .from(workspaceMember)
        .where(eq(workspaceMember.userId, userId))
        .limit(1)
      return c.json({ hasWorkspace: owned.length > 0 || member.length > 0 })
    }),

    listMine: privateProcedure.get(async ({ ctx, c }: any) => {
      const userId = ctx.session.user.id
      const [owned, member] = await Promise.all([
        ctx.db
          .select({ id: workspace.id, name: workspace.name, slug: workspace.slug, logo: workspace.logo, domain: workspace.domain })
          .from(workspace)
          .where(eq(workspace.ownerId, userId)),
        ctx.db
          .select({ id: workspace.id, name: workspace.name, slug: workspace.slug, logo: workspace.logo, domain: workspace.domain })
          .from(workspace)
          .innerJoin(workspaceMember, eq(workspaceMember.workspaceId, workspace.id))
          .where(eq(workspaceMember.userId, userId)),
      ])

      const all = [...owned, ...member]
      const map = new Map<string, any>()
      for (const w of all) map.set(w.slug, w)
      c.header("Cache-Control", "private, max-age=30, stale-while-revalidate=300")
      return c.superjson({ workspaces: Array.from(map.values()) })
    }),

    statusCounts: publicProcedure
      .input(checkSlugInputSchema)
      .get(async ({ ctx, input, c }: any) => {
        const [ws] = await ctx.db
          .select({ id: workspace.id })
          .from(workspace)
          .where(eq(workspace.slug, input.slug))
          .limit(1)
        if (!ws) return c.json({ counts: {} })

        const rows = await ctx.db
          .select({ status: post.roadmapStatus, count: sql<number>`count(*)` })
          .from(post)
          .innerJoin(board, eq(post.boardId, board.id))
          .where(and(eq(board.workspaceId, ws.id), eq(board.isSystem, false)))
          .groupBy(post.roadmapStatus)

        const counts: Record<string, number> = {}
        for (const r of rows as any[]) {
          const key = normalizeStatus(String(r.status || "pending"))
          counts[key] = (counts[key] || 0) + Number(r.count || 0)
        }
        for (const key of ["planned","progress","review","completed","pending","closed"]) {
          if (typeof counts[key] !== "number") counts[key] = 0
        }
        c.header("Cache-Control", "private, no-store")
        return c.json({ counts })
      }),

    create: privateProcedure
      .input(createWorkspaceInputSchema)
      .post(async ({ ctx, input, c }: any) => {
        const slug = input.slug.toLowerCase()
        const exists = await ctx.db
          .select({ id: workspace.id })
          .from(workspace)
          .where(eq(workspace.slug, slug))
          .limit(1)
        if (exists.length > 0) {
          throw new HTTPException(409, { message: "Slug is already taken" })
        }

        const host = (() => {
          try {
            return new URL(input.domain.trim()).host
          } catch {
            return input.domain.trim()
          }
        })()
        const favicon = `https://www.google.com/s2/favicons?domain=${host}&sz=128`

        let created: any
        try {
          const [ws] = await ctx.db
            .insert(workspace)
            .values({
              name: input.name.trim(),
              slug,
              domain: input.domain.trim(),
              ownerId: ctx.session.user.id,
              timezone: input.timezone,
              logo: favicon,
            })
            .returning()
          created = ws

          await ctx.db.insert(workspaceMember).values({
            workspaceId: ws.id,
            userId: ctx.session.user.id,
            role: "admin",
            permissions: {
              canManageWorkspace: true,
              canManageBilling: true,
              canManageMembers: true,
              canManageBoards: true,
              canModerateAllBoards: true,
              canConfigureBranding: true,
            },
            joinedAt: new Date(),
          })

          await ctx.db.insert(brandingConfig).values({
            workspaceId: ws.id,
          })

          await ctx.db.insert(board).values([
            {
              workspaceId: ws.id,
              name: "Features",
              slug: "features",
              sortOrder: 0,
              createdBy: ctx.session.user.id,
              isSystem: false,
            },
            {
              workspaceId: ws.id,
              name: "Bugs",
              slug: "bugs",
              sortOrder: 1,
              createdBy: ctx.session.user.id,
              isSystem: false,
            },
            {
              workspaceId: ws.id,
              name: "Roadmap",
              slug: "roadmap",
              sortOrder: 2,
              createdBy: ctx.session.user.id,
              isSystem: true,
              systemType: "roadmap",
            },
            {
              workspaceId: ws.id,
              name: "Changelog",
              slug: "changelog",
              sortOrder: 3,
              createdBy: ctx.session.user.id,
              isSystem: true,
              systemType: "changelog",
            },
          ])

          await ctx.db.insert(tag).values([
            { workspaceId: ws.id, name: "UI", slug: "ui" },
            { workspaceId: ws.id, name: "Design", slug: "design" },
            { workspaceId: ws.id, name: "Security", slug: "security" },
            { workspaceId: ws.id, name: "Bugs", slug: "bugs" },
            { workspaceId: ws.id, name: "Support", slug: "support" },
          ])
        } catch (err) {
          if (created?.id) {
            try {
              await ctx.db.delete(workspace).where(eq(workspace.id, created.id))
            } catch {}
          }
          throw new HTTPException(500, { message: "Failed to provision workspace" })
        }

        return c.superjson({ workspace: created })
      }),
  })
}
