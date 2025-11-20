import React from "react"
import { render, toPlainText } from "@react-email/render"
import { BrandedEmail, Brand } from "./BrandedEmail"

export function ForgetEmail({ otp, brand }: { otp: string; brand?: Brand }) {
  const eyebrow = "SECURITY"
  const title = "Reset your password"
  const intro = "Hi there!"
  const body = "Use this code to reset your password."
  const paragraphs = ["For your protection, we need to confirm this password reset."]
  const outro = "This code expires in 5 minutes."
  const ctaText = "Reset password →"
  const psText = "If you didn’t request a reset, please ignore this message."
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
      psText={psText}
      signatureName={signatureName}
      addressLines={addressLines}
      brand={brand}
    />
  )
}

export async function renderForgetEmail(otp: string, brand?: Brand) {
  const element = <ForgetEmail otp={otp} brand={brand} />
  const html = await render(element)
  const text = toPlainText(html)
  return { html, text }
}