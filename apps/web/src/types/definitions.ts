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
    overview: "Monthly Recurring Revenue is predictable subscription revenue recognized for a calendar month. Excludes one‑time charges and accounts for prorations from upgrades or downgrades.",
    why: "MRR is foundational for forecasting cash flow, measuring growth momentum, and planning hiring and marketing investments.",
    pitfalls: [
      "Including one‑time or setup fees",
      "Ignoring proration from plan changes",
      "Mixing trial users with paid subscribers",
      "Counting refunds incorrectly",
      "Double‑counting upgrades as both new and expansion"
    ],
    benchmarks: "Early‑stage: $10k–$100k MRR; growth: $100k–$1M; enterprise: $1M+ (varies by niche).",
    notes: [
      "Track net MRR = new + expansion − contraction − churn",
      "Recognize revenue on service periods, not invoice dates"
    ],
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
    overview: "Annual Recurring Revenue is the annualized value of active subscription contracts. Calculated as 12×MRR or by summing contracted annual values.",
    why: "ARR communicates run‑rate scale for board reporting and long‑range planning, smoothing monthly volatility.",
    pitfalls: [
      "Annualizing a spiky month",
      "Including non‑recurring revenue",
      "Double‑counting multi‑year prepayments",
      "Mixing pipeline with contracted ARR"
    ],
    benchmarks: "Seed: ~$1–3M ARR; Series A: ~$3–10M; varies widely by market.",
    notes: [
      "Use contracted ARR, not forecast",
      "Exclude usage or one‑time fees that are not recurring"
    ],
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
    overview: "ARPU measures average monthly revenue generated per paying customer or account.",
    why: "Reveals pricing power and helps evaluate packaging, upsell impact, and segment profitability.",
    pitfalls: [
      "Including trials or unpaid accounts",
      "Letting enterprise outliers skew means",
      "Not segmenting by plan or cohort",
      "Ignoring refunds or credits"
    ],
    benchmarks: "SMB: $20–$200; mid‑market: $200–$800; enterprise: $800+ (varies).",
    notes: [
      "Compute per account when seat‑based pricing",
      "Track ARPU trend alongside NRR"
    ],
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
    overview: "NRR is the share of revenue retained and expanded from the existing customer cohort over a period.",
    why: "A top signal of product‑market fit and expansion potential. >100% indicates strong upsell/cross‑sell.",
    pitfalls: [
      "Including new logo revenue",
      "Using end‑of‑period counts instead of start baselines",
      "Ignoring downgrades/contraction",
      "Confusing logo churn with revenue churn"
    ],
    benchmarks: "SMB: 90–105%; mid‑market: 100–115%; enterprise: 110–130%+.",
    notes: [
      "Anchor to start‑of‑period cohort",
      "Report GRR alongside NRR for context"
    ],
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
    overview: "CAC is the fully loaded cost to acquire one new paying customer in a period.",
    why: "Core unit economics metric for efficient growth and budget allocation across channels.",
    pitfalls: [
      "Excluding salaries or overhead",
      "Using signups instead of paying customers",
      "Mismatched attribution windows",
      "Ignoring refunds or failed payments"
    ],
    benchmarks: "Target CLTV/CAC ≥ 3 and payback ≤ 12 months for SMB.",
    notes: [
      "Compute by segment and channel",
      "Use new paying customers, not trials"
    ],
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
    overview: "CLTV estimates the total gross‑margin‑adjusted revenue expected from a customer over their lifetime.",
    why: "Guides acquisition spend, pricing strategy, and product investments.",
    pitfalls: [
      "Using revenue instead of margin",
      "Assuming constant churn across cohorts",
      "Ignoring expansion effects",
      "Relying on averages that hide segment differences"
    ],
    benchmarks: "Healthy businesses target CLTV/CAC > 3; absolute CLTV depends on ARPU.",
    notes: [
      "Model cohort‑based CLTV for accuracy",
      "Use confidence intervals when sample sizes are small"
    ],
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
    overview: "The CLTV/CAC ratio compares the value of a customer over time to the cost to acquire them.",
    why: "Simple sanity check for scaling efficiency; investors watch this closely.",
    pitfalls: [
      "Using gross CLTV not margin‑adjusted",
      "Mixing signups with customers",
      "Ignoring payback duration"
    ],
    benchmarks: "Healthy ≈ 3:1; strong 4–5:1; >6:1 may indicate under‑investment.",
    notes: [
      "Track by channel and segment",
      "Interpret alongside churn and payback"
    ],
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
    overview: "Payback period is the number of months required for gross margin from a customer's revenue to cover CAC.",
    why: "Indicates cash efficiency and runway impact; shorter payback reduces funding needs.",
    pitfalls: [
      "Ignoring gross margin",
      "Using revenue instead of contribution",
      "Not accounting for refunds or churn",
      "Averaging across segments without cohorts"
    ],
    benchmarks: "SMB ≤ 12 months; mid‑market ≤ 18; enterprise 18–24 months can be acceptable.",
    notes: [
      "Report median payback, not mean",
      "Segment by plan and acquisition channel"
    ],
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
    overview: "Activation rate is the share of new users who achieve the first value event within a defined onboarding window.",
    why: "Strong leading indicator of retention and monetization.",
    pitfalls: [
      "Vague activation definitions",
      "Too long measurement windows",
      "Optimizing vanity events",
      "Not segmenting by source or platform"
    ],
    benchmarks: "Consumer apps often 40–60%+; B2B tools 20–40% typical (highly variable).",
    notes: [
      "Ensure the activation event predicts retention",
      "Use 7/14/30‑day time‑bounded measurement"
    ],
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
    overview: "Retention rate is the percentage of users/accounts still active at the end of a period relative to the start cohort.",
    why: "Primary signal of product‑market fit and long‑term health.",
    pitfalls: [
      "Comparing different cohorts",
      "Using cumulative instead of period retention",
      "Counting reactivations as retained",
      "Mixing DAU/WAU/MAU baselines"
    ],
    benchmarks: "Benchmarks vary by category; healthy cohorts often flatten after 3–6 months.",
    notes: [
      "Plot cohort curves monthly",
      "Use survival analysis for precision"
    ],
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
    overview: "Churn rate is the share of customers or revenue lost during a period; the inverse of retention.",
    why: "Quantifies leakage and highlights onboarding, product, or billing issues.",
    pitfalls: [
      "Counting upgrades as negative churn",
      "Using end counts instead of start baselines",
      "Not separating involuntary churn",
      "Ignoring seasonality effects"
    ],
    benchmarks: "SMB customer churn 2–6% monthly is common; revenue churn typically lower (varies).",
    notes: [
      "Track logo churn and revenue churn separately",
      "Reduce involuntary churn with dunning and retry logic"
    ],
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
    overview: "Gross margin is revenue minus cost of goods sold divided by revenue.",
    why: "Determines unit economics potential and cash available for growth.",
    pitfalls: [
      "Misclassifying support or infrastructure costs",
      "Excluding third‑party API costs",
      "Including opex in COGS",
      "Ignoring refunds or chargebacks"
    ],
    benchmarks: "Typical SaaS gross margin is 70–90%.",
    notes: [
      "Define COGS consistently",
      "Include support that directly delivers customer value"
    ],
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
    overview: "Net margin is net income divided by revenue, including all operating expenses, taxes, and interest.",
    why: "Summarizes overall profitability beyond unit economics.",
    pitfalls: [
      "One‑time gains or losses distorting margins",
      "Different capitalization policies",
      "Comparing companies with different accounting bases"
    ],
    benchmarks: "Varies by stage; mature SaaS often 10–20%+ net margin.",
    notes: [
      "Use GAAP‑compliant definitions",
      "Compare over trailing twelve months to smooth seasonality"
    ],
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
    overview: "Burn rate is net monthly cash outflow when spending exceeds cash inflow.",
    why: "Determines runway and fundraising timing.",
    pitfalls: [
      "Mixing gross and net burn",
      "Ignoring seasonality",
      "Not separating operating vs investing cash flows"
    ],
    benchmarks: "Contextual; early‑stage teams often $50k–$300k/month (varies widely).",
    notes: [
      "Track trend month‑over‑month",
      "Tie burn planning to hiring and COGS assumptions"
    ],
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
    overview: "Runway is the number of months a company can operate at current net burn before cash hits zero.",
    why: "Helps plan fundraising, pricing changes, and expense reductions.",
    pitfalls: [
      "Using uncertain receivables",
      "Ignoring planned changes to burn",
      "Not modeling multiple scenarios"
    ],
    benchmarks: "Target ≥ 12–18 months runway post‑raise.",
    notes: [
      "Refresh cash forecast monthly",
      "Use conservative assumptions for inflows"
    ],
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
    overview: "Break‑even is the point where contribution margin covers fixed costs; profit begins beyond this point.",
    why: "Clarifies scale needed to reach sustainable operations.",
    pitfalls: [
      "Using gross revenue instead of contribution",
      "Ignoring variable cost changes",
      "Mixing cash and accrual accounting"
    ],
    benchmarks: "Context‑dependent; many SaaS aim to reach break‑even by Series A/B stage.",
    notes: [
      "Focus on contribution margin in SaaS",
      "Account for blended gross margin shifts over time"
    ],
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
    overview: "Cohort analysis groups users and tracks behavior over time to reveal retention and value patterns.",
    why: "Exposes onboarding issues and long‑term behavior masked by averages.",
    pitfalls: [
      "Small cohort noise",
      "Incorrect cohort definitions",
      "Not fixing time windows",
      "Reading curves without normalization"
    ],
    benchmarks: "Healthy products show cohort curves flattening above 30–50% depending on category.",
    notes: [
      "Use percentile curves and medians",
      "Segment cohorts by source and plan"
    ],
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
    overview: "Stickiness is DAU divided by MAU, a proxy for habitual usage.",
    why: "Indicates how frequently users return and engage.",
    pitfalls: [
      "Bots or non‑human activity",
      "Seasonality effects",
      "Different feature adoption across segments"
    ],
    benchmarks: "Consumer social 40–60%+; productivity tools 20–40% typical.",
    notes: [
      "Track weekly stickiness (WAU/MAU) too",
      "Pair stickiness with retention analysis"
    ],
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
    overview: "TTFV is the elapsed time from signup to the first event that delivers meaningful value.",
    why: "Faster time to value correlates with better retention and conversion.",
    pitfalls: [
      "Poor event definition",
      "Ignoring product complexity by segment",
      "Using too broad a measurement window"
    ],
    benchmarks: "Varies by product; aim to reduce by 20–50% via onboarding improvements.",
    notes: [
      "Instrument key events end‑to‑end",
      "Use median rather than mean"
    ],
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
    overview: "ROI expresses the return relative to cost as a percentage and evaluates investment efficiency.",
    why: "Guides resource allocation across marketing, product, and operations.",
    pitfalls: [
      "Attribution errors",
      "Using gross instead of net gains",
      "Ignoring time value of money"
    ],
    benchmarks: "ROMI often 100–300% for strong campaigns; varies widely.",
    notes: [
      "Use incremental lift vs baseline",
      "Apply consistent attribution windows"
    ],
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
    overview: "CPA is the average marketing or ad cost per attributed conversion.",
    why: "Controls acquisition efficiency in paid channels.",
    pitfalls: [
      "Last‑click bias in attribution",
      "Mismatched attribution windows",
      "Counting low‑quality or non‑customer conversions"
    ],
    benchmarks: "Benchmarks depend on ARPU and CLTV; ensure paid CAC remains viable.",
    notes: [
      "Track CPA by channel and creative",
      "Pair with conversion quality metrics"
    ],
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
    overview: "Conversion rate is the share of visitors or users who complete a target action within a time window.",
    why: "Measures funnel performance and highlights growth levers.",
    pitfalls: [
      "Counting duplicate conversions",
      "Not separating qualified traffic",
      "Comparing across different intents or offers"
    ],
    benchmarks: "Typical SaaS signup conversion 2–8%; checkout conversion varies by pricing model.",
    notes: [
      "Build consistent conversion definitions",
      "Analyze by source, device, and region"
    ],
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