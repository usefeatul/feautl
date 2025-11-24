import { pgTable, text, timestamp, boolean, integer, json, uuid } from 'drizzle-orm/pg-core'

export const plan = pgTable('plan', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug', { enum: ['free', 'starter', 'professional'] }).notNull().unique(),
  displayName: text('display_name').notNull(),
  description: text('description'),
  priceMonthly: integer('price_monthly').notNull().default(0),
  priceAnnual: integer('price_annual').notNull().default(0),
  currency: text('currency', { enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'] }).default('USD'),
  isActive: boolean('is_active').default(true),
  isDefault: boolean('is_default').default(false),
  sortOrder: integer('sort_order').default(0),
  stripePriceIdMonthly: text('stripe_price_id_monthly'),
  stripePriceIdAnnual: text('stripe_price_id_annual'),
  trialDays: integer('trial_days').default(0),
  features: json('features')
    .$type<{
      coreFeatures: boolean
      voting: boolean
      comments: boolean
      publicChangelog: boolean
      publicRoadmap: boolean
      customDomain: boolean
      privateBoards: boolean
      guestPosting: boolean
      whiteLabel: boolean
      unlimitedBoards: boolean
      unlimitedAdminRoles: boolean
      unlimitedIntegrations: boolean
      sso: boolean
      advancedSearch: boolean
    }>()
    .notNull()
    .default({
      coreFeatures: true,
      voting: true,
      comments: true,
      publicChangelog: true,
      publicRoadmap: true,
      customDomain: false,
      privateBoards: false,
      guestPosting: false,
      whiteLabel: false,
      unlimitedBoards: false,
      unlimitedAdminRoles: false,
      unlimitedIntegrations: false,
      sso: false,
      advancedSearch: false,
    }),
  limits: json('limits')
    .$type<{
      boards?: number | null
      users?: number | null
      feedbackItems?: number | null
      storageMB?: number | null
      apiCallsPerMonth?: number | null
      overage?: {
        feedbackItemUSD?: number
        apiCallUSD?: number
        memberUSD?: number
        storageGBUSD?: number
      }
    }>(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
})

export type Plan = typeof plan.$inferSelect
