import { renderWelcomeEmail } from "./email/welcomeemail"
import { renderVerifyEmail, VerifyType } from "./email/verifyemail"
import type { Brand } from "./email/brandedemail"
import { sendEmail } from "./email/transport"

export async function sendWelcome(to: string, name?: string, brand?: Brand) {
  const { html, text } = await renderWelcomeEmail(name, brand)
  await sendEmail({ to, subject: "Welcome to Feedgot", html, text })
}

export async function sendVerificationOtpEmail(to: string, otp: string, type: VerifyType, brand?: Brand) {
  const subject = type === "email-verification" ? "Verify your Feedgot email" : type === "forget-password" ? "Reset your Feedgot password" : "Your Feedgot sign-in code"
  const { html, text } = await renderVerifyEmail(otp, type, brand)
  await sendEmail({ to, subject, html, text })
}