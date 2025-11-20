import type { Metadata } from "next"
import SignIn from "@/components/auth/SignIn"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = {
  ...createPageMetadata({ title: "Sign In", description: "Access your Feedgot account.", path: "/auth/sign-in" }),
  robots: { index: false, follow: false },
}

export default function SignInPage() {
  return <SignIn />
}