/**
 * Content Matrix for Programmatic SEO
 *
 * Defines the "Hubs" and relationships for generating SEO pages.
 * Each hub represents a content category with associated pages.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface ContentHub {
    slug: string;
    name: string;
    description: string;
    /** Related hubs for internal linking */
    relatedHubs: string[];
}

export interface CompetitorEntry {
    slug: string;
    name: string;
    website: string;
    tagline: string;
    /** Victory points: areas where Featul wins */
    victoryPoints: string[];
    /** Trade-offs: areas where competitor might win */
    tradeoffs: string[];
    /** Related definition slugs for internal linking */
    relatedDefinitions: string[];
    /** Related tool slugs for internal linking */
    relatedTools: string[];
}

export interface IntegrationEntry {
    slug: string;
    name: string;
    category: "communication" | "project-management" | "analytics" | "automation";
    description: string;
    benefits: string[];
    /** Related definition slugs */
    relatedDefinitions: string[];
}

export interface UseCaseEntry {
    slug: string;
    title: string;
    industry?: string;
    persona?: string;
    painPoints: string[];
    solutions: string[];
    relatedDefinitions: string[];
    relatedTools: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Content Hubs
// ─────────────────────────────────────────────────────────────────────────────

export const CONTENT_HUBS: ContentHub[] = [
    {
        slug: "alternatives",
        name: "Alternatives",
        description: "Compare Featul with other product feedback tools",
        relatedHubs: ["definitions", "tools", "use-cases"],
    },
    {
        slug: "definitions",
        name: "Definitions",
        description: "SaaS metrics and product management terminology",
        relatedHubs: ["tools", "blog"],
    },
    {
        slug: "tools",
        name: "Tools & Calculators",
        description: "Interactive calculators for SaaS metrics",
        relatedHubs: ["definitions", "use-cases"],
    },
    {
        slug: "use-cases",
        name: "Use Cases",
        description: "How teams use Featul for product feedback",
        relatedHubs: ["alternatives", "blog"],
    },
    {
        slug: "integrations",
        name: "Integrations",
        description: "Connect Featul with your favorite tools",
        relatedHubs: ["use-cases", "tools"],
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Competitors (extends existing alternatives)
// ─────────────────────────────────────────────────────────────────────────────

export const COMPETITORS: CompetitorEntry[] = [
    {
        slug: "canny",
        name: "Canny",
        website: "https://canny.io",
        tagline: "Feature request tracking",
        victoryPoints: [
            "EU-hosted by default for GDPR compliance",
            "Unified feedback, roadmap, and changelog in one tool",
            "More affordable for small teams",
        ],
        tradeoffs: [
            "Canny has more enterprise integrations",
            "Longer track record in the market",
        ],
        relatedDefinitions: ["product-feedback", "feature-voting", "roadmap"],
        relatedTools: ["nps-calculator", "churn-rate-calculator"],
    },
    {
        slug: "productboard",
        name: "Productboard",
        website: "https://productboard.com",
        tagline: "Product management platform",
        victoryPoints: [
            "Simpler setup, no learning curve",
            "Privacy-first with EU hosting",
            "Transparent pricing, no hidden costs",
        ],
        tradeoffs: [
            "Productboard offers deeper product analytics",
            "More granular prioritization frameworks",
        ],
        relatedDefinitions: ["prioritization", "customer-feedback", "product-roadmap"],
        relatedTools: ["ltv-calculator", "arr-calculator"],
    },
    {
        slug: "uservoice",
        name: "UserVoice",
        website: "https://uservoice.com",
        tagline: "Product feedback management",
        victoryPoints: [
            "Modern, intuitive interface",
            "Faster implementation time",
            "No enterprise-only pricing tiers",
        ],
        tradeoffs: [
            "UserVoice has longer enterprise experience",
            "More established support resources",
        ],
        relatedDefinitions: ["customer-feedback", "feature-request"],
        relatedTools: ["nps-calculator"],
    },
    {
        slug: "aha",
        name: "Aha!",
        website: "https://aha.io",
        tagline: "Product roadmap software",
        victoryPoints: [
            "Less complex, easier to adopt",
            "Better for customer-facing roadmaps",
            "EU data residency included",
        ],
        tradeoffs: [
            "Aha! offers more strategic planning features",
            "Deeper Jira integration options",
        ],
        relatedDefinitions: ["roadmap", "product-strategy"],
        relatedTools: ["growth-rate-calculator"],
    },
    {
        slug: "pendo",
        name: "Pendo",
        website: "https://pendo.io",
        tagline: "Product experience platform",
        victoryPoints: [
            "Focused on feedback, not analytics bloat",
            "Simpler pricing model",
            "GDPR-compliant by default",
        ],
        tradeoffs: [
            "Pendo offers in-app guides and analytics",
            "Larger ecosystem of integrations",
        ],
        relatedDefinitions: ["product-analytics", "user-engagement"],
        relatedTools: ["retention-calculator", "dau-mau-calculator"],
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Integrations
// ─────────────────────────────────────────────────────────────────────────────

export const INTEGRATIONS: IntegrationEntry[] = [
    {
        slug: "slack",
        name: "Slack",
        category: "communication",
        description: "Get instant notifications and triage feedback directly in Slack",
        benefits: [
            "Real-time alerts for new feedback",
            "Quick triage without leaving Slack",
            "Team collaboration on feature requests",
        ],
        relatedDefinitions: ["customer-feedback", "team-collaboration"],
    },
    {
        slug: "jira",
        name: "Jira",
        category: "project-management",
        description: "Sync feedback items with Jira issues for seamless development tracking",
        benefits: [
            "Two-way sync between feedback and issues",
            "Automatic status updates",
            "Link customer requests to dev work",
        ],
        relatedDefinitions: ["feature-request", "roadmap"],
    },
    {
        slug: "linear",
        name: "Linear",
        category: "project-management",
        description: "Connect feedback to Linear issues for modern development workflows",
        benefits: [
            "Fast, keyboard-driven workflow",
            "Automatic issue creation from feedback",
            "Status sync to close the loop",
        ],
        relatedDefinitions: ["feature-request", "product-development"],
    },
    {
        slug: "intercom",
        name: "Intercom",
        category: "communication",
        description: "Collect feedback directly from customer conversations",
        benefits: [
            "Capture feedback from support chats",
            "Link conversations to feature requests",
            "Close the loop with customers",
        ],
        relatedDefinitions: ["customer-feedback", "customer-support"],
    },
    {
        slug: "zapier",
        name: "Zapier",
        category: "automation",
        description: "Automate workflows with 5,000+ apps",
        benefits: [
            "Connect to any tool in your stack",
            "Automate feedback routing",
            "Trigger actions based on votes",
        ],
        relatedDefinitions: ["automation", "workflow"],
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Use Cases
// ─────────────────────────────────────────────────────────────────────────────

export const USE_CASES: UseCaseEntry[] = [
    {
        slug: "saas-product-feedback",
        title: "Product Feedback for SaaS Companies",
        industry: "SaaS",
        persona: "Product Manager",
        painPoints: [
            "Feedback scattered across email, Slack, and support tickets",
            "No visibility into what customers want most",
            "Difficulty closing the loop on shipped features",
        ],
        solutions: [
            "Centralized feedback board with voting",
            "Priority scoring based on customer value",
            "Automatic changelog notifications",
        ],
        relatedDefinitions: ["product-feedback", "feature-voting", "changelog"],
        relatedTools: ["nps-calculator", "churn-rate-calculator"],
    },
    {
        slug: "startup-roadmap",
        title: "Public Roadmap for Startups",
        industry: "Startup",
        persona: "Founder",
        painPoints: [
            "Building features customers don't want",
            "Lack of transparency with early adopters",
            "No way to validate ideas before building",
        ],
        solutions: [
            "Public roadmap to share priorities",
            "Validate ideas with customer votes",
            "Build trust with transparent development",
        ],
        relatedDefinitions: ["roadmap", "product-validation"],
        relatedTools: ["ltv-calculator", "growth-rate-calculator"],
    },
    {
        slug: "enterprise-changelog",
        title: "Changelog for Enterprise Teams",
        industry: "Enterprise",
        persona: "Customer Success Manager",
        painPoints: [
            "Customers unaware of new features",
            "Release notes lost in email inboxes",
            "No engagement metrics on announcements",
        ],
        solutions: [
            "Beautiful changelog pages for each release",
            "In-app widgets for announcements",
            "Track engagement and feedback on releases",
        ],
        relatedDefinitions: ["changelog", "product-updates"],
        relatedTools: ["retention-calculator"],
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helper functions
// ─────────────────────────────────────────────────────────────────────────────

export function getHubBySlug(slug: string): ContentHub | undefined {
    return CONTENT_HUBS.find((h) => h.slug === slug);
}

export function getCompetitorBySlug(slug: string): CompetitorEntry | undefined {
    return COMPETITORS.find((c) => c.slug === slug);
}

export function getIntegrationBySlug(slug: string): IntegrationEntry | undefined {
    return INTEGRATIONS.find((i) => i.slug === slug);
}

export function getUseCaseBySlug(slug: string): UseCaseEntry | undefined {
    return USE_CASES.find((u) => u.slug === slug);
}

export function getAllCompetitorSlugs(): string[] {
    return COMPETITORS.map((c) => c.slug);
}

export function getAllIntegrationSlugs(): string[] {
    return INTEGRATIONS.map((i) => i.slug);
}

export function getAllUseCaseSlugs(): string[] {
    return USE_CASES.map((u) => u.slug);
}
