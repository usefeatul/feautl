export type PricingPlanKey = 'free' | 'pro' | 'enterprise' | 'self_hosted'

export type PricingPlan = {
  key: PricingPlanKey
  name: string
  price: string
  note: string
  ctaLabel: string
  href: string
  features: string[]
}

export const topPlans: PricingPlan[] = [
  {
    key: 'free',
    name: 'Community',
    price: '$0/mo',
    note: 'Free forever',
    ctaLabel: 'Start for free',
    href: '/signup',
    features: [
      '100 feedback items/month',
      '3 team members',
      '1 feedback board',
      'Voting & commenting',
      'Email notifications',
      'Basic analytics',
    ],
  },
  {
    key: 'pro',
    name: 'Growth',
    price: '$19/mo',
    note: 'Save 20% annually',
    ctaLabel: 'Start 14-day trial',
    href: '/signup',
    features: [
      '1,000 feedback items/month',
      '10 team members',
      'Unlimited boards',
      'Custom categories & tags',
      'Advanced filtering & search',
      'Embeddable widget',
      'Slack/Discord/Webhooks',
    ],
  },
  {
    key: 'enterprise',
    name: 'Scale',
    price: '$49/mo',
    note: 'Save 20% annually',
    ctaLabel: 'Contact sales',
    href: '/contact',
    features: [
      'Unlimited feedback & members',
      'SSO (SAML, OAuth)',
      'Advanced roles & permissions',
      'Jira/Linear/GitHub integrations',
      'White‑label & custom domain',
      '99.9% uptime SLA',
    ],
  },
]

export const selfHostedPlan: PricingPlan = {
  key: 'self_hosted',
  name: 'Freedom (Self‑Hosted)',
  price: 'Open Source',
  note: 'All Enterprise features',
  ctaLabel: 'View docs',
  href: '/docs',
  features: [
    'Full source code access',
    'Complete data control',
    'No usage limits',
    'Custom modifications',
    'Community support',
  ],
}