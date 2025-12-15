import { pgTable, text, timestamp, boolean, json, uuid, index } from 'drizzle-orm/pg-core'
import { board } from './feedback'
import { user } from './auth'

export interface EditorJSBlock {
  id?: string
  type: string
  data: Record<string, any>
}

export interface EditorJSContent {
  time?: number
  version?: string
  blocks: EditorJSBlock[]
}

export const changelog = pgTable(
  'changelog',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    boardId: uuid('board_id')
      .notNull()
      .references(() => board.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    slug: text('slug').notNull(),
    content: json('content').$type<EditorJSContent>().notNull(),
    coverImage: text('cover_image'),
    summary: text('summary'),
    authorId: text('author_id')
      .notNull()
      .references(() => user.id, { onDelete: 'set null' }),
    status: text('status', {
      enum: ['draft', 'published', 'archived'],
    }).notNull().default('draft'),
    tags: json('tags').$type<string[]>().default([]),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    changelogBoardIdIdx: index('changelog_board_id_idx').on(table.boardId),
    changelogStatusIdx: index('changelog_status_idx').on(table.status),
    changelogPublishedAtIdx: index('changelog_published_at_idx').on(table.publishedAt),
    changelogSlugIdx: index('changelog_slug_idx').on(table.slug),
  })
)

export type Changelog = typeof changelog.$inferSelect
export type ChangelogInsert = typeof changelog.$inferInsert


