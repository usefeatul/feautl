import React from "react"
import { render, toPlainText } from "@react-email/render"
import { BrandedEmail, Brand } from "./BrandedEmail"

export type VerifyType = "email-verification" | "forget-password" | "sign-in"

export function VerifyEmail({ otp, type, brand }: { otp: string; type: VerifyType; brand?: Brand }) {
  const eyebrow = "SECURITY"
  const title = type === "email-verification" ? "Verify your email" : type === "forget-password" ? "Reset your password" : "Sign in code"
  const intro = "Hi there!"
  const body = type === "email-verification"
    ? "Use this code to verify your email."
    : type === "forget-password"
    ? "Use this code to reset your password."
    : "Use this code to sign in."
  const paragraphs = [
    type === "email-verification"
      ? "For security, we ask you to verify ownership of this email."
      : type === "forget-password"
      ? "For your protection, we need to confirm this password reset."
      : "Enter the code below to complete sign in.",
  ]
  const outro = "This code expires in 5 minutes."
  const ctaText = type === "forget-password" ? "Reset password →" : "Open Feedgot →"
  const ctaUrl = type === "forget-password" ? "https://feedgot.com/reset" : "https://feedgot.com/dashboard"
  const psText = "If you need help, reply to this email — we’re here to help."
  const signatureName = "Feedgot Security Team"
  const addressLines = ["267 Kentlands Boulevard PMB #5123", "Gaithersburg, MD 20878, United States"]
  return (
    <BrandedEmail
      eyebrow={eyebrow}
      title={title}
      intro={intro}
      body={body}
      paragraphs={paragraphs}
      outro={outro}
      highlight={otp}
      ctaText={ctaText}
      ctaUrl={ctaUrl}
      psText={psText}
      signatureName={signatureName}
      addressLines={addressLines}
      brand={brand}
    />
  )
}

export async function renderVerifyEmail(otp: string, type: VerifyType, brand?: Brand) {
  const element = <VerifyEmail otp={otp} type={type} brand={brand} />
  const html = await render(element)
  const text = toPlainText(html)
  return { html, text }
}