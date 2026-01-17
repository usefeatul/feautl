#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * SEO Validation Script
 *
 * Pre-build check to ensure programmatic pages meet quality standards:
 * 1. Content uniqueness (no duplicate descriptions)
 * 2. Orphan detection (all pages have internal links)
 * 3. Thin content prevention (minimum content length)
 *
 * Run with: bun run validate-seo
 */

import { getAllComparisonPages, getAllIntegrationPages, getAllUseCasePages } from "../src/lib/data/programmatic/generators";
import { getRelatedPages } from "../src/lib/seo/interlink";

// ─────────────────────────────────────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────────────────────────────────────

const MIN_DESCRIPTION_LENGTH = 100;
const MAX_SIMILARITY_THRESHOLD = 0.8; // 80% similarity = warning

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function getWords(text: string): Set<string> {
    return new Set(
        text
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, "")
            .split(/\s+/)
            .filter((w) => w.length > 2)
    );
}

function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
    const intersection = new Set([...a].filter((x) => b.has(x)));
    const union = new Set([...a, ...b]);
    return intersection.size / union.size;
}

// ─────────────────────────────────────────────────────────────────────────────
// Validation Functions
// ─────────────────────────────────────────────────────────────────────────────

interface ValidationResult {
    passed: boolean;
    errors: string[];
    warnings: string[];
}

function validateContentUniqueness(
    pages: Array<{ slug: string; description: string }>
): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    for (let i = 0; i < pages.length; i++) {
        for (let j = i + 1; j < pages.length; j++) {
            const pageI = pages[i];
            const pageJ = pages[j];
            if (!pageI || !pageJ) continue;
            const wordsA = getWords(pageI.description);
            const wordsB = getWords(pageJ.description);
            const similarity = jaccardSimilarity(wordsA, wordsB);

            if (similarity > MAX_SIMILARITY_THRESHOLD) {
                warnings.push(
                    `High similarity (${(similarity * 100).toFixed(0)}%) between "${pageI.slug}" and "${pageJ.slug}"`
                );
            }
        }
    }

    return { passed: errors.length === 0, errors, warnings };
}

function validateThinContent(
    pages: Array<{ slug: string; description: string }>
): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    for (const page of pages) {
        if (page.description.length < MIN_DESCRIPTION_LENGTH) {
            errors.push(
                `Thin content: "${page.slug}" has only ${page.description.length} chars (min: ${MIN_DESCRIPTION_LENGTH})`
            );
        }
    }

    return { passed: errors.length === 0, errors, warnings };
}

function validateInternalLinks(
    pages: Array<{ slug: string; type: "competitor" | "integration" | "use-case" }>
): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    for (const page of pages) {
        const links = getRelatedPages({
            currentSlug: page.slug,
            currentType: page.type,
        });

        if (links.length === 0) {
            errors.push(`Orphan page: "${page.slug}" has no internal links`);
        } else if (links.length < 3) {
            warnings.push(
                `Low linking: "${page.slug}" has only ${links.length} internal links (recommend 3+)`
            );
        }
    }

    return { passed: errors.length === 0, errors, warnings };
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

function main() {
    console.log("\n🔍 SEO Validation\n" + "=".repeat(50) + "\n");

    let hasErrors = false;

    // Gather all pages
    const comparisonPages = getAllComparisonPages();
    const integrationPages = getAllIntegrationPages();
    const useCasePages = getAllUseCasePages();

    console.log(`📊 Pages found:`);
    console.log(`   Comparisons: ${comparisonPages.length}`);
    console.log(`   Integrations: ${integrationPages.length}`);
    console.log(`   Use Cases: ${useCasePages.length}`);
    console.log(`   Total: ${comparisonPages.length + integrationPages.length + useCasePages.length}\n`);

    // Prepare data for validation
    const allDescriptions = [
        ...comparisonPages.map((p) => ({ slug: p.competitor.slug, description: p.meta.description })),
        ...integrationPages.map((p) => ({ slug: p.integration.slug, description: p.meta.description })),
        ...useCasePages.map((p) => ({ slug: p.useCase.slug, description: p.meta.description })),
    ];

    const allPagesForLinking = [
        ...comparisonPages.map((p) => ({ slug: p.competitor.slug, type: "competitor" as const })),
        ...integrationPages.map((p) => ({ slug: p.integration.slug, type: "integration" as const })),
        ...useCasePages.map((p) => ({ slug: p.useCase.slug, type: "use-case" as const })),
    ];

    // Run validations
    console.log("1️⃣  Checking content uniqueness...");
    const uniquenessResult = validateContentUniqueness(allDescriptions);
    printResult(uniquenessResult);
    if (!uniquenessResult.passed) hasErrors = true;

    console.log("\n2️⃣  Checking for thin content...");
    const thinResult = validateThinContent(allDescriptions);
    printResult(thinResult);
    if (!thinResult.passed) hasErrors = true;

    console.log("\n3️⃣  Checking internal links...");
    const linkResult = validateInternalLinks(allPagesForLinking);
    printResult(linkResult);
    if (!linkResult.passed) hasErrors = true;

    // Summary
    console.log("\n" + "=".repeat(50));
    if (hasErrors) {
        console.log("❌ SEO Validation FAILED - fix errors before deploying\n");
        process.exit(1);
    } else {
        console.log("✅ SEO Validation PASSED\n");
        process.exit(0);
    }
}

function printResult(result: ValidationResult) {
    if (result.errors.length === 0 && result.warnings.length === 0) {
        console.log("   ✅ All checks passed");
    }

    for (const error of result.errors) {
        console.log(`   ❌ ${error}`);
    }

    for (const warning of result.warnings) {
        console.log(`   ⚠️  ${warning}`);
    }
}

main();
