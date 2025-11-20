import { renderWelcomeEmail } from "./email/WelcomeEmail"
import { renderVerifyEmail, VerifyType } from "./email/VerifyEmail"
import { renderForgetEmail } from "./email/ForgetEmail"
import type { Brand } from "./email/BrandedEmail"
import { sendEmail } from "./email/transport"

export async function sendWelcome(to: string, name?: string, brand?: Brand) {
  const { html, text } = await renderWelcomeEmail(name, brand)
  await sendEmail({ to, subject: "Welcome to Feedgot", html, text })
}

export async function sendVerificationOtpEmail(to: string, otp: string, type: VerifyType, brand?: Brand) {
  const subject = type === "email-verification" ? "Verify your Feedgot email" : type === "forget-password" ? "Reset your Feedgot password" : "Your Feedgot sign-in code"
  const { html, text } = type === "forget-password" ? await renderForgetEmail(otp, brand) : await renderVerifyEmail(otp, type, brand)
  await sendEmail({ to, subject, html, text })
}

export async function sendForgetPasswordOtpEmail(to: string, otp: string, brand?: Brand) {
  const subject = "Reset your Feedgot password"
  const { html, text } = await renderForgetEmail(otp, brand)
  await sendEmail({ to, subject, html, text })
}