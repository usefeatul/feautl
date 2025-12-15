import { z } from "zod"

export const editorJSBlockSchema = z.object({
  id: z.string().optional(),
  type: z.string(),
  data: z.record(z.any()),
})

export const editorJSContentSchema = z.object({
  time: z.number().optional(),
  version: z.string().optional(),
  blocks: z.array(editorJSBlockSchema),
})

export const createChangelogSchema = z.object({
  slug: z.string().min(2).max(64),
  title: z.string().min(1).max(200),
  content: editorJSContentSchema,
  coverImage: z.string().url().optional(),
  summary: z.string().max(500).optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
})

export const updateChangelogSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  content: editorJSContentSchema.optional(),
  coverImage: z.string().url().optional().nullable(),
  summary: z.string().max(500).optional().nullable(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
})

export const deleteChangelogSchema = z.object({
  id: z.string().uuid(),
})

export const getChangelogSchema = z.object({
  id: z.string().uuid(),
})

export const listChangelogsSchema = z.object({
  slug: z.string().min(2).max(64),
  status: z.enum(["draft", "published", "archived", "all"]).default("all"),
  limit: z.number().min(1).max(100).default(50),
  offset: z.number().min(0).default(0),
})


