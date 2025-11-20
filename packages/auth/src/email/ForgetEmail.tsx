import React from "react"
import { render, toPlainText } from "@react-email/render"
import { BrandedEmail, Brand } from "./BrandedEmail"

export function ForgetEmail({ otp, brand }: { otp: string; brand?: Brand }) {
  const eyebrow = "Security"
  const title = "Reset your password"
  const intro = "Hi there!"
  const paragraphs = ["Use this code to reset your password."]
  const outro = "This code expires in 5 minutes."
  return (
    <BrandedEmail
      eyebrow={eyebrow}
      title={title}
      intro={intro}
      paragraphs={paragraphs}
      outro={outro}
      highlight={otp}
      footerText={"If you didn’t request this, you can ignore this email."}
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