import type { Metadata } from "next"
import SignUp from "@/components/auth/SignUp"
import { createPageMetadata } from "@/lib/seo"

export const dynamic = "force-dynamic"

export const metadata: Metadata = createPageMetadata({
  title: "Create Account",
  description: "Sign up for Feedgot.",
  path: "/auth/sign-up",
  indexable: false,
})

export default function SignUpPage() {
  return <SignUp />
}