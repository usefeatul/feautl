export type DefinitionFaq = { q: string; a: string };

export type Definition = {
  slug: string;
  name: string;
  synonyms?: string[];
  short: string;
  eli5: string;
  practical: string;
  expert: string;
  overview?: string;
  why?: string;
  pitfalls?: string[];
  benchmarks?: string;
  notes?: string[];
  formula?: { title: string; body: string; code?: string };
  example?: { title: string; body: string };
  faqs?: DefinitionFaq[];
  related?: string[];
};

export const DEFINITIONS: Definition[] = [
  {
    slug: "mrr",
    name: "Monthly Recurring Revenue (MRR)",
    synonyms: ["monthly recurring revenue"],
    short: "Predictable subscription revenue recognized within a month.",
    eli5: "Money you expect every month from subscriptions.",
    practical: "Sum the monthly fees from all active subscriptions in the month.",
    expert: "MRR excludes one‑time charges and includes prorations. Align recognition with billing cycles.",
    formula: { title: "Basic formula", body: "MRR is the sum of all active monthly subscription revenue.", code: "MRR = sum(active subscription fees for month)" },
    example: { title: "Example", body: "50 customers paying $40 → $2,000 MRR." },
    faqs: [
      { q: "Does MRR include setup fees?", a: "No. Exclude one‑time charges." },
      { q: "How to handle upgrades?", a: "Include expansions in the month they occur." },
    ],
    related: ["arr", "arpu", "nrr"],
  },
  {
    slug: "arr",
    name: "Annual Recurring Revenue (ARR)",
    synonyms: ["annualized recurring revenue"],
    short: "Annualized subscription revenue based on current contracts.",
    eli5: "Your subscription money for a whole year.",
    practical: "Multiply stable MRR by 12 or sum annual contracts.",
    expert: "Use contract terms to avoid overstating volatile monthly changes.",
    formula: { title: "Basic formula", body: "ARR is annualized MRR.", code: "ARR = 12 × MRR" },
    example: { title: "Example", body: "$10k MRR → $120k ARR." },
    faqs: [
      { q: "ARR vs revenue?", a: "ARR excludes one‑time and non‑recurring items." },
    ],
    related: ["mrr", "nrr"],
  },
  {
    slug: "arpu",
    name: "Average Revenue Per User (ARPU)",
    synonyms: ["average revenue per account", "arpa"],
    short: "Average monthly revenue per customer or account.",
    eli5: "On average, how much each customer pays per month.",
    practical: "Divide MRR by the number of paying customers.",
    expert: "Segment ARPU by plan and cohort to see pricing leverage.",
    formula: { title: "Formula", body: "ARPU uses current period revenue and active customers.", code: "ARPU = MRR / # active customers" },
    example: { title: "Example", body: "$20k MRR and 500 customers → $40 ARPU." },
    faqs: [
      { q: "Include trials?", a: "Exclude unpaid trials from ARPU." },
    ],
    related: ["mrr", "ltv"],
  },
  {
    slug: "nrr",
    name: "Net Revenue Retention (NRR)",
    synonyms: ["net dollar retention", "ndr"],
    short: "Revenue kept and expanded from existing customers.",
    eli5: "How much revenue you keep from current customers after churn and upgrades.",
    practical: "Start of period MRR adjusted by expansion, contraction, and churn.",
    expert: "Track logo churn separately to avoid masking by large expansions.",
    formula: { title: "Formula", body: "Include expansion, contraction, and churn from existing cohort.", code: "NRR = (MRR start + expansion − contraction − churn) / MRR start × 100%" },
    example: { title: "Example", body: "Start $100k, +$15k expansion, −$5k contraction, −$8k churn → 102%." },
    faqs: [
      { q: "Include new sales?", a: "Exclude new logos. Only existing cohort." },
    ],
    related: ["mrr", "arr", "churn-rate"],
  },
  {
    slug: "cac",
    name: "Customer Acquisition Cost (CAC)",
    synonyms: ["cost to acquire a customer"],
    short: "Average cost to acquire one new customer.",
    eli5: "What you spend to get each new customer.",
    practical: "Divide total sales and marketing costs by new customers in the period.",
    expert: "Match costs and acquisitions by cohort for accuracy.",
    formula: { title: "Formula", body: "Use fully loaded S&M costs.", code: "CAC = Total sales+marketing spend / # new customers" },
    example: { title: "Example", body: "$50k spend, 100 new customers → $500 CAC." },
    faqs: [
      { q: "Include salaries?", a: "Include fully loaded team costs." },
    ],
    related: ["cltv", "payback-period", "cpa"],
  },
  {
    slug: "cltv",
    name: "Customer Lifetime Value (CLTV)",
    synonyms: ["lifetime value", "ltv", "clv"],
    short: "Total revenue expected from a customer over the relationship.",
    eli5: "How much money a customer brings you before they leave.",
    practical: "Divide ARPU by churn or use cohort models.",
    expert: "Use gross margin adjusted LTV for unit economics.",
    formula: { title: "Simple model", body: "Use average ARPU and churn rate.", code: "CLTV = ARPU / churn rate" },
    example: { title: "Example", body: "$40 ARPU, 4% churn → $1,000 CLTV." },
    faqs: [
      { q: "Gross margin?", a: "Multiply by gross margin for profitability." },
    ],
    related: ["cac", "cltv-cac-ratio"],
  },
  {
    slug: "cltv-cac-ratio",
    name: "CLTV/CAC Ratio",
    synonyms: ["ltv to cac"],
    short: "Compares lifetime value to acquisition cost.",
    eli5: "Shows if customers are worth more than they cost to get.",
    practical: "Divide CLTV by CAC and track by segment.",
    expert: "Target 3:1 or better for healthy growth.",
    formula: { title: "Formula", body: "Use margin‑adjusted LTV when possible.", code: "CLTV/CAC = CLTV / CAC" },
    example: { title: "Example", body: "$1,000 LTV, $250 CAC → 4:1." },
    faqs: [
      { q: "What is good?", a: "3:1 is typical; 4–5:1 is strong." },
    ],
    related: ["cltv", "cac", "payback-period"],
  },
  {
    slug: "payback-period",
    name: "CAC Payback Period",
    synonyms: ["payback months"],
    short: "Months to recover CAC from gross margin on revenue.",
    eli5: "How long until a customer pays back what they cost.",
    practical: "Divide CAC by monthly gross margin contribution.",
    expert: "Use cohort cash flows for precision.",
    formula: { title: "Formula", body: "Use margin and net of refunds.", code: "Payback = CAC / (ARPU × gross margin)" },
    example: { title: "Example", body: "$500 CAC, $40 ARPU, 80% margin → 15.6 months." },
    faqs: [
      { q: "Good target?", a: "< 12 months for SMB; enterprise can be longer." },
    ],
    related: ["cac", "cltv-cac-ratio"],
  },
  {
    slug: "activation-rate",
    name: "Activation Rate",
    synonyms: ["onboarding completion"],
    short: "Share of new users reaching a defined first value.",
    eli5: "How many new users get value soon after signup.",
    practical: "Define activation events and measure within a window.",
    expert: "Use feature‑level funnels and segment by source.",
    formula: { title: "Formula", body: "Use new users achieving first value.", code: "Activation = activated users / new users × 100%" },
    example: { title: "Example", body: "1,000 signups, 420 activated → 42%." },
    faqs: [
      { q: "What counts?", a: "Define events that correlate with retention." },
    ],
    related: ["ttfv", "retention-rate"],
  },
  {
    slug: "retention-rate",
    name: "Retention Rate",
    synonyms: ["user retention"],
    short: "Share of users who remain active between periods.",
    eli5: "How many users stay with you over time.",
    practical: "Measure by cohort and period.",
    expert: "Use cohort curves and survival analysis.",
    formula: { title: "Formula", body: "Track active users across periods.", code: "Retention = users active end / users active start × 100%" },
    example: { title: "Example", body: "500 at start, 380 at end → 76%." },
    faqs: [
      { q: "DAU vs MAU?", a: "Choose cadence matching product usage." },
    ],
    related: ["churn-rate", "cohort-analysis"],
  },
  {
    slug: "churn-rate",
    name: "Churn Rate",
    synonyms: ["customer churn", "revenue churn"],
    short: "Share of customers or revenue lost in a period.",
    eli5: "How much you lose from cancellations.",
    practical: "Measure customer churn and revenue churn separately.",
    expert: "Normalize by start counts; exclude upgrades.",
    formula: { title: "Formulas", body: "Use start of period baselines.", code: "Customer churn = lost customers / customers at start × 100%\nRevenue churn = MRR lost / MRR at start × 100%" },
    example: { title: "Example", body: "20 lost of 500 → 4% customer churn." },
    faqs: [
      { q: "Voluntary vs involuntary?", a: "Track failed payments separately." },
    ],
    related: ["nrr", "retention-rate"],
  },
  {
    slug: "gross-margin",
    name: "Gross Margin",
    synonyms: ["gross profit margin"],
    short: "Revenue minus COGS as a percentage of revenue.",
    eli5: "What you keep after direct costs.",
    practical: "Exclude opex; include hosting and support in COGS.",
    expert: "SaaS COGS usually includes infra, support, third‑party APIs.",
    formula: { title: "Formula", body: "Use period revenue and COGS.", code: "Gross margin = (Revenue − COGS) / Revenue × 100%" },
    example: { title: "Example", body: "$100k revenue, $25k COGS → 75%." },
    faqs: [
      { q: "Include salaries?", a: "Include support and infra directly tied to delivery." },
    ],
    related: ["net-margin", "payback-period"],
  },
  {
    slug: "net-margin",
    name: "Net Margin",
    synonyms: ["net profit margin"],
    short: "Net income as a percentage of revenue.",
    eli5: "What you keep after all expenses.",
    practical: "Include opex, taxes, and interest.",
    expert: "Use this for overall profitability, not unit economics.",
    formula: { title: "Formula", body: "Use period net income and revenue.", code: "Net margin = Net income / Revenue × 100%" },
    example: { title: "Example", body: "$20k net income on $100k → 20%." },
    faqs: [
      { q: "SaaS typical?", a: "Net margins vary widely by stage." },
    ],
    related: ["gross-margin"],
  },
  {
    slug: "burn-rate",
    name: "Burn Rate",
    synonyms: ["cash burn"],
    short: "Net cash outflow per month.",
    eli5: "How fast you spend cash each month.",
    practical: "Subtract monthly cash inflows from outflows.",
    expert: "Use operating burn; separate investing and financing flows.",
    formula: { title: "Formula", body: "Use cash basis.", code: "Burn rate = Cash outflows − Cash inflows" },
    example: { title: "Example", body: "$150k out, $90k in → $60k burn." },
    faqs: [
      { q: "Gross vs net?", a: "Track both to see spending cadence." },
    ],
    related: ["runway"],
  },
  {
    slug: "runway",
    name: "Runway",
    synonyms: ["months of runway"],
    short: "Months until cash reaches zero at current burn.",
    eli5: "How many months you can operate before cash runs out.",
    practical: "Divide current cash by monthly burn.",
    expert: "Model scenarios with planned changes.",
    formula: { title: "Formula", body: "Use net burn.", code: "Runway = Cash balance / Monthly burn" },
    example: { title: "Example", body: "$600k cash, $60k burn → 10 months." },
    faqs: [
      { q: "Extend runway?", a: "Reduce burn or increase margin and cash inflows." },
    ],
    related: ["burn-rate"],
  },
  {
    slug: "break-even",
    name: "Break‑even",
    synonyms: ["break even"],
    short: "Point where total revenue equals total costs.",
    eli5: "When you stop losing money and start making it.",
    practical: "Divide fixed costs by contribution margin per unit.",
    expert: "Use SaaS unit economics for recurring models.",
    formula: { title: "Formula", body: "Use contribution margin.", code: "Break‑even units = Fixed costs / (Price − variable cost)" },
    example: { title: "Example", body: "$50k fixed, $20 margin → 2,500 units." },
    faqs: [
      { q: "Revenue break‑even?", a: "Multiply units by price." },
    ],
    related: ["gross-margin", "net-margin"],
  },
  {
    slug: "cohort-analysis",
    name: "Cohort Analysis",
    synonyms: ["cohort retention"],
    short: "Track user behavior over time by cohort.",
    eli5: "Group users by signup month and see how they stick around.",
    practical: "Build monthly retention tables and curves.",
    expert: "Use survival and hazard functions.",
    formula: { title: "Approach", body: "Index cohorts to month 0 and track active share." },
    example: { title: "Example", body: "Jan cohort: 100% → 60% → 45% → 38%." },
    faqs: [
      { q: "Which cohorts?", a: "Signup or first use are common." },
    ],
    related: ["retention-rate", "churn-rate"],
  },
  {
    slug: "stickiness",
    name: "DAU/MAU Stickiness",
    synonyms: ["dau mau"],
    short: "Share of monthly users active daily.",
    eli5: "How often users come back in a month.",
    practical: "Divide DAU by MAU for the month.",
    expert: "Segment by feature usage.",
    formula: { title: "Formula", body: "Use period active counts.", code: "Stickiness = DAU / MAU × 100%" },
    example: { title: "Example", body: "5k DAU, 20k MAU → 25%." },
    faqs: [
      { q: "Good value?", a: "Depends on product category." },
    ],
    related: ["activation-rate", "retention-rate"],
  },
  {
    slug: "ttfv",
    name: "Time to First Value (TTFV)",
    synonyms: ["time to value"],
    short: "Time for new users to reach their first meaningful outcome.",
    eli5: "How long until a new user gets value.",
    practical: "Measure median time from signup to first value event.",
    expert: "Define events that predict retention and expansion.",
    formula: { title: "Approach", body: "Use event timestamps to compute medians." },
    example: { title: "Example", body: "Median 2.4 days from signup to publish." },
    faqs: [
      { q: "Reduce TTFV?", a: "Improve onboarding and guidance." },
    ],
    related: ["activation-rate"],
  },
  {
    slug: "roi",
    name: "Return on Investment (ROI)",
    synonyms: ["return on investment"],
    short: "Gain relative to cost expressed as a percentage.",
    eli5: "How much you made compared to what you spent.",
    practical: "Subtract cost from gain and divide by cost.",
    expert: "Use incremental gains and net costs.",
    formula: { title: "Formula", body: "Use net gains.", code: "ROI = (Gain − Cost) / Cost × 100%" },
    example: { title: "Example", body: "$40k gain on $10k cost → 300%." },
    faqs: [
      { q: "ROMI?", a: "Marketing‑specific ROI variant." },
    ],
    related: ["romi", "cpa", "conversion-rate"],
  },
  {
    slug: "cpa",
    name: "Cost Per Acquisition (CPA)",
    synonyms: ["cost per acquisition"],
    short: "Ad spend divided by attributed conversions.",
    eli5: "Ad cost for each new customer or signup.",
    practical: "Divide attributed spend by conversions in the window.",
    expert: "Use consistent attribution and windows.",
    formula: { title: "Formula", body: "Use attributed conversions.", code: "CPA = Ad spend / # conversions" },
    example: { title: "Example", body: "$5k spend, 200 signups → $25 CPA." },
    faqs: [
      { q: "Signup vs customer?", a: "Define conversion consistently." },
    ],
    related: ["cac", "conversion-rate"],
  },
  {
    slug: "conversion-rate",
    name: "Conversion Rate",
    synonyms: ["cr"],
    short: "Share of visitors who complete a target action.",
    eli5: "How many people do what you want after visiting.",
    practical: "Divide conversions by visits or exposures.",
    expert: "Segment by source and intent.",
    formula: { title: "Formula", body: "Use period counts.", code: "CR = Conversions / Visitors × 100%" },
    example: { title: "Example", body: "1,000 visits, 42 signups → 4.2%." },
    faqs: [
      { q: "Improve CR?", a: "Align offer, UX, and intent." },
    ],
    related: ["cpa", "roi"],
  },
];

export const getDefinitionBySlug = (slug: string): Definition | undefined => {
  const match = DEFINITIONS.find((d) => d.slug === slug)
  if (match) return match
  return DEFINITIONS.find((d) => (d.synonyms || []).includes(slug))
}

export const getPrimarySlug = (slug: string): string | undefined => {
  const d = getDefinitionBySlug(slug)
  return d?.slug
}

export const getAllDefinitionSlugs = (): string[] => DEFINITIONS.map((d) => d.slug)

export const getAllDefinitionParams = (): { term: string }[] => {
  const list: string[] = []
  for (const d of DEFINITIONS) {
    list.push(d.slug)
    for (const s of d.synonyms || []) list.push(s)
  }
  return list.map((term) => ({ term }))
}