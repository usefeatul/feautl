import React from "react"
import { render, toPlainText } from "@react-email/render"
import { BrandedEmail, Brand } from "./BrandedEmail"

export function WelcomeEmail({ name, brand }: { name?: string; brand?: Brand }) {
  const eyebrow = "WELCOME"
  const title = brand?.name ? `Welcome to ${brand.name}` : "Welcome to Feedgot"
  const intro = `Hi ${name?.trim() || "there"}!`
  const paragraphs = [
    `I’m ${brand?.name ? `${brand.name}` : "Feedgot"} team, and I want to personally thank you for joining us.`,
    "We’re excited to help you collect and manage user feedback more effectively.",
    `${brand?.name || "Feedgot"} is built by a small team who deeply care about helping you build better products. We’re always here if you need anything, and we’d love to hear your feedback and ideas as you explore the platform.`,
  ]
  const body = "Thanks for signing up. We’re excited to have you on board."
  const ctaText = "Go to your dashboard →"
  const ctaUrl = "https://feedgot.com/dashboard"
  const psText = "P.S. Need any help getting started? Just reply to this email — we read every message and we’re happy to help!"
  const signatureName = brand?.name ? `${brand.name} Team` : "Feedgot Team"
  const addressLines = ["267 Kentlands Boulevard PMB #5123", "Gaithersburg, MD 20878, United States"]
  return (
    <BrandedEmail
      eyebrow={eyebrow}
      title={title}
      intro={intro}
      body={body}
      paragraphs={paragraphs}
      ctaText={ctaText}
      ctaUrl={ctaUrl}
      psText={psText}
      signatureName={signatureName}
      addressLines={addressLines}
      brand={brand}
    />
  )
}

export async function renderWelcomeEmail(name?: string, brand?: Brand) {
  const element = <WelcomeEmail name={name} brand={brand} />
  const html = await render(element)
  const text = toPlainText(html)
  return { html, text }
}