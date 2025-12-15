import { and, eq, sql, desc, asc } from "drizzle-orm"
import { z } from "zod"
import { j, publicProcedure, privateProcedure } from "../jstack"
import { workspace, board, workspaceMember, changelog } from "@oreilla/db"
import { HTTPException } from "hono/http-exception"
import { normalizePlan, getPlanLimits, assertWithinLimit } from "../shared/plan"
import { toSlug } from "../shared/slug"
import { requireBoardManagerBySlug } from "../shared/access"
import {
  createChangelogSchema,
  updateChangelogSchema,
  deleteChangelogSchema,
  getChangelogSchema,
  listChangelogsSchema,
} from "../validators/changelog"

const bySlugSchema = z.object({ slug: z.string().min(2).max(64) })

export function createChangelogRouter() {
  return j.router({
    visible: publicProcedure
      .input(bySlugSchema)
      .get(async ({ ctx, input, c }) => {
        const [ws] = await ctx.db
          .select({ id: workspace.id })
          .from(workspace)
          .where(eq(workspace.slug, input.slug))
          .limit(1)
        if (!ws) return c.superjson({ visible: false })
        const [b] = await ctx.db
          .select({ id: board.id, isVisible: board.isVisible, isPublic: board.isPublic })
          .from(board)
          .where(and(eq(board.workspaceId, ws.id), eq(board.systemType, "changelog")))
          .limit(1)
        const v = Boolean(b?.isVisible) && Boolean(b?.isPublic)
        c.header("Cache-Control", "public, max-age=30, stale-while-revalidate=120")
        return c.superjson({ visible: v })
      }),
    settings: privateProcedure
      .input(bySlugSchema)
      .get(async ({ ctx, input, c }) => {
        const [ws] = await ctx.db
          .select({ id: workspace.id })
          .from(workspace)
          .where(eq(workspace.slug, input.slug))
          .limit(1)
        if (!ws) return c.superjson({ ok: false })

        const [b] = await ctx.db
          .select({ id: board.id, isVisible: board.isVisible })
          .from(board)
          .where(and(eq(board.workspaceId, ws.id), eq(board.systemType, "changelog")))
          .limit(1)

        const tags = Array.isArray((b as any)?.changelogTags) ? (b as any).changelogTags.map((t: any) => ({ id: t.id, name: t.name, slug: t.slug, color: t.color || null, count: 0 })) : []
        return c.superjson({ ok: true, isVisible: Boolean(b?.isVisible), tags })
      }),

    toggleVisibility: privateProcedure
      .input(z.object({ slug: bySlugSchema.shape.slug, isVisible: z.boolean() }))
      .post(async ({ ctx, input, c }) => {
        const ws = await requireBoardManagerBySlug(ctx, input.slug)

        const [b] = await ctx.db
          .select({ id: board.id })
          .from(board)
          .where(and(eq(board.workspaceId, ws.id), eq(board.systemType, "changelog")))
          .limit(1)
        if (!b) throw new HTTPException(404, { message: "Changelog board not found" })

        await ctx.db.update(board).set({ isVisible: input.isVisible, updatedAt: new Date() }).where(eq(board.id, b.id))
        return c.superjson({ ok: true, isVisible: input.isVisible })
      }),

    

    tagsList: privateProcedure
        .input(bySlugSchema)
        .get(async ({ ctx, input, c }) => {
          const [ws] = await ctx.db
            .select({ id: workspace.id })
            .from(workspace)
            .where(eq(workspace.slug, input.slug))
            .limit(1)
          if (!ws) return c.superjson({ tags: [] })
          const [b] = await ctx.db
            .select({ id: board.id, changelogTags: board.changelogTags })
            .from(board)
            .where(and(eq(board.workspaceId, ws.id), eq(board.systemType, "changelog")))
            .limit(1)
          const rows = Array.isArray((b as any)?.changelogTags) ? (b as any).changelogTags.map((t: any) => ({ id: t.id, name: t.name, slug: t.slug, color: t.color || null, count: 0 })) : []
          return c.superjson({ tags: rows })
        }),

    tagsCreate: privateProcedure
        .input(z.object({ slug: bySlugSchema.shape.slug, name: z.string().min(1).max(64), color: z.string().optional() }))
        .post(async ({ ctx, input, c }) => {
          const ws = await requireBoardManagerBySlug(ctx, input.slug)
          const [b] = await ctx.db
            .select({ id: board.id, changelogTags: board.changelogTags })
            .from(board)
            .where(and(eq(board.workspaceId, ws.id), eq(board.systemType, "changelog")))
            .limit(1)
          if (!b) throw new HTTPException(404, { message: "Changelog board not found" })
          const limits = getPlanLimits(String(ws.plan || "free"))
          const current = Array.isArray((b as any)?.changelogTags) ? (b as any).changelogTags.length : 0
          const maxTags = limits.maxChangelogTags
          assertWithinLimit(current, maxTags, (max) => `Changelog tags limit reached (${max})`)
          const slug = toSlug(input.name)
          const id = globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`
          const prev = Array.isArray((b as any)?.changelogTags) ? (b as any).changelogTags : []
          const next = [...prev, { id, name: input.name.trim(), slug, color: input.color || null }]
          await ctx.db.update(board).set({ changelogTags: next, updatedAt: new Date() }).where(eq(board.id, b.id))
          return c.superjson({ ok: true })
        }),

    tagsDelete: privateProcedure
        .input(z.object({ slug: bySlugSchema.shape.slug, tagId: z.string().min(1) }))
        .post(async ({ ctx, input, c }) => {
          const ws = await requireBoardManagerBySlug(ctx, input.slug)
          const [b] = await ctx.db
            .select({ id: board.id, changelogTags: board.changelogTags })
            .from(board)
            .where(and(eq(board.workspaceId, ws.id), eq(board.systemType, "changelog")))
            .limit(1)
          if (!b) throw new HTTPException(404, { message: "Changelog board not found" })
          const prev = Array.isArray((b as any)?.changelogTags) ? (b as any).changelogTags : []
          const next = prev.filter((t: any) => String(t.id) !== String(input.tagId))
          await ctx.db.update(board).set({ changelogTags: next, updatedAt: new Date() }).where(eq(board.id, b.id))
          return c.superjson({ ok: true })
        }),

    entriesList: publicProcedure
        .input(listChangelogsSchema)
        .get(async ({ ctx, input, c }) => {
          const [ws] = await ctx.db
            .select({ id: workspace.id })
            .from(workspace)
            .where(eq(workspace.slug, input.slug))
            .limit(1)
          if (!ws) return c.superjson({ entries: [] })
          
          const [b] = await ctx.db
            .select({ id: board.id, isVisible: board.isVisible, isPublic: board.isPublic })
            .from(board)
            .where(and(eq(board.workspaceId, ws.id), eq(board.systemType, "changelog")))
            .limit(1)
          if (!b || !b.isVisible || !b.isPublic) return c.superjson({ entries: [] })

          // Build where conditions
          const conditions = [eq(changelog.boardId, b.id)]
          if (input.status !== "all") {
            conditions.push(eq(changelog.status, input.status))
          }

          const entries = await ctx.db
            .select({
              id: changelog.id,
              title: changelog.title,
              slug: changelog.slug,
              summary: changelog.summary,
              coverImage: changelog.coverImage,
              tags: changelog.tags,
              status: changelog.status,
              publishedAt: changelog.publishedAt,
              createdAt: changelog.createdAt,
              updatedAt: changelog.updatedAt,
            })
            .from(changelog)
            .where(and(...conditions))
            .orderBy(desc(changelog.publishedAt), desc(changelog.createdAt))
            .limit(input.limit)
            .offset(input.offset)

          c.header("Cache-Control", "public, max-age=15, stale-while-revalidate=60")
          return c.superjson({ entries })
        }),

    create: privateProcedure
        .input(createChangelogSchema)
        .post(async ({ ctx, input, c }) => {
          const ws = await requireBoardManagerBySlug(ctx, input.slug)
          
          const [b] = await ctx.db
            .select({ id: board.id })
            .from(board)
            .where(and(eq(board.workspaceId, ws.id), eq(board.systemType, "changelog")))
            .limit(1)
          if (!b) throw new HTTPException(404, { message: "Changelog board not found" })

          const entrySlug = toSlug(input.title)
          
          const [entry] = await ctx.db
            .insert(changelog)
            .values({
              boardId: b.id,
              title: input.title,
              slug: entrySlug,
              content: input.content,
              coverImage: input.coverImage,
              summary: input.summary,
              tags: input.tags,
              status: input.status,
              authorId: ctx.session.user.id,
              publishedAt: input.status === "published" ? new Date() : null,
            })
            .returning({ id: changelog.id })

          return c.superjson({ ok: true, id: entry.id })
        }),

    update: privateProcedure
        .input(updateChangelogSchema)
        .post(async ({ ctx, input, c }) => {
          const [entry] = await ctx.db
            .select({ 
              id: changelog.id,
              boardId: changelog.boardId,
              status: changelog.status,
            })
            .from(changelog)
            .where(eq(changelog.id, input.id))
            .limit(1)
          
          if (!entry) throw new HTTPException(404, { message: "Changelog not found" })

          // Check if user has access to this changelog's board
          const [b] = await ctx.db
            .select({ workspaceId: board.workspaceId })
            .from(board)
            .where(eq(board.id, entry.boardId))
            .limit(1)
          
          if (!b) throw new HTTPException(404, { message: "Board not found" })

          const [member] = await ctx.db
            .select({ role: workspaceMember.role })
            .from(workspaceMember)
            .where(
              and(
                eq(workspaceMember.workspaceId, b.workspaceId),
                eq(workspaceMember.userId, ctx.session.user.id)
              )
            )
            .limit(1)

          if (!member) throw new HTTPException(403, { message: "Access denied" })

          const updateData: any = {
            updatedAt: new Date(),
          }
          
          if (input.title !== undefined) updateData.title = input.title
          if (input.content !== undefined) updateData.content = input.content
          if (input.coverImage !== undefined) updateData.coverImage = input.coverImage
          if (input.summary !== undefined) updateData.summary = input.summary
          if (input.tags !== undefined) updateData.tags = input.tags
          if (input.status !== undefined) {
            updateData.status = input.status
            // Set publishedAt when status changes to published
            if (input.status === "published" && entry.status !== "published") {
              updateData.publishedAt = new Date()
            }
          }

          await ctx.db
            .update(changelog)
            .set(updateData)
            .where(eq(changelog.id, input.id))

          return c.superjson({ ok: true })
        }),

    delete: privateProcedure
        .input(deleteChangelogSchema)
        .post(async ({ ctx, input, c }) => {
          const [entry] = await ctx.db
            .select({ 
              id: changelog.id,
              boardId: changelog.boardId,
            })
            .from(changelog)
            .where(eq(changelog.id, input.id))
            .limit(1)
          
          if (!entry) throw new HTTPException(404, { message: "Changelog not found" })

          // Check if user has access
          const [b] = await ctx.db
            .select({ workspaceId: board.workspaceId })
            .from(board)
            .where(eq(board.id, entry.boardId))
            .limit(1)
          
          if (!b) throw new HTTPException(404, { message: "Board not found" })

          const [member] = await ctx.db
            .select({ role: workspaceMember.role })
            .from(workspaceMember)
            .where(
              and(
                eq(workspaceMember.workspaceId, b.workspaceId),
                eq(workspaceMember.userId, ctx.session.user.id)
              )
            )
            .limit(1)

          if (!member) throw new HTTPException(403, { message: "Access denied" })

          await ctx.db
            .delete(changelog)
            .where(eq(changelog.id, input.id))

          return c.superjson({ ok: true })
        }),

    get: privateProcedure
        .input(getChangelogSchema)
        .get(async ({ ctx, input, c }) => {
          const [entry] = await ctx.db
            .select()
            .from(changelog)
            .where(eq(changelog.id, input.id))
            .limit(1)
          
          if (!entry) throw new HTTPException(404, { message: "Changelog not found" })

          // Check if user has access to this changelog
          const [b] = await ctx.db
            .select({ workspaceId: board.workspaceId })
            .from(board)
            .where(eq(board.id, entry.boardId))
            .limit(1)
          
          if (!b) throw new HTTPException(404, { message: "Board not found" })

          const [member] = await ctx.db
            .select({ role: workspaceMember.role })
            .from(workspaceMember)
            .where(
              and(
                eq(workspaceMember.workspaceId, b.workspaceId),
                eq(workspaceMember.userId, ctx.session.user.id)
              )
            )
            .limit(1)

          if (!member) throw new HTTPException(403, { message: "Access denied" })

          c.header("Cache-Control", "public, max-age=30, stale-while-revalidate=120")
          return c.superjson({ entry })
        }),
  })
}
