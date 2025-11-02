export type ToolContentSection = {
  title: string
  body: string
  code?: string
}

export type ToolItem = {
  slug: string
  name: string
  description: string
  contentSections?: ToolContentSection[]
}

export type ToolCategory = {
  slug: string
  name: string
  description: string
  tools: ToolItem[]
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    slug: 'revenue',
    name: 'Revenue',
    description: 'MRR and growth metrics calculators.',
    tools: [
      {
        slug: 'mrr-calculator',
        name: 'MRR calculator',
        description: 'Calculate Monthly Recurring Revenue from active subscriptions, model upgrades/downgrades, and forecast growth trends.',
        contentSections: [
          {
            title: 'What is MRR?',
            body: 'Monthly Recurring Revenue (MRR) measures predictable subscription revenue within a month.',
          },
          {
            title: 'Basic formula',
            body: 'MRR = Sum of all active subscription revenue for the month',
            code: 'MRR = sum(active subscriptions for the month)'
          },
        ],
      },
    ],
  },
  {
    slug: 'retention',
    name: 'Retention',
    description: 'Customer and revenue churn tools.',
    tools: [
      {
        slug: 'churn-calculator',
        name: 'Churn calculator',
        description: 'Compute customer and revenue churn rates, track logo vs expansion dynamics, and analyze cohort retention over time.',
        contentSections: [
          {
            title: 'Customer churn',
            body: 'Customer churn rate = (Customers lost during period ÷ Customers at start of period) × 100%'
          },
          {
            title: 'Revenue churn',
            body: 'Revenue churn rate = (MRR lost from churn ÷ MRR at start of period) × 100%'
          },
        ],
      },
    ],
  },
  {
    slug: 'feedback',
    name: 'Customer Feedback',
    description: 'NPS and feedback resources.',
    tools: [
      {
        slug: 'nps-calculator',
        name: 'NPS calculator',
        description: 'Calculate Net Promoter Score, segment by cohorts, and visualize promoters, passives, and detractors distribution.',
        contentSections: [
          {
            title: 'What is NPS?',
            body: 'Net Promoter Score (NPS) measures customer loyalty based on 0–10 ratings.'
          },
          {
            title: 'Calculation',
            body: 'NPS = % Promoters (9–10) − % Detractors (0–6)'
          },
        ],
      },
      {
        slug: 'feedback-templates',
        name: 'Feedback templates',
        description: 'Ready-to-use templates for product surveys, interview scripts, feature request intake, and release feedback — copy, adapt, and ship quickly.',
        contentSections: [
          {
            title: 'What you’ll get',
            body: 'Templates for product feedback surveys, interview scripts, and feature request intake forms.'
          },
        ],
      },
    ],
  },
]

export const getCategoryBySlug = (slug: string) =>
  TOOL_CATEGORIES.find((c) => c.slug === slug)

export const getToolBySlugs = (categorySlug: string, toolSlug: string) => {
  const cat = getCategoryBySlug(categorySlug)
  if (!cat) return undefined
  return cat.tools.find((t) => t.slug === toolSlug)
}

export const getAllCategorySlugs = () => TOOL_CATEGORIES.map((c) => c.slug)

export const getAllToolParams = () =>
  TOOL_CATEGORIES.flatMap((c) => c.tools.map((t) => ({ category: c.slug, tool: t.slug })))