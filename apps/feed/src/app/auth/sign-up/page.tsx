import type { Metadata } from "next"
import SignUp from "@/components/auth/SignUp"
import { createPageMetadata } from "@/lib/seo"
import { getServerSession } from "@feedgot/auth/session"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

export const metadata: Metadata = createPageMetadata({
  title: "Create Account",
  description: "Sign up for Feedgot.",
  path: "/auth/sign-up",
  indexable: false,
})

export default async function SignUpPage({ searchParams }: { searchParams?: { redirect?: string } }) {
  const session = await getServerSession()
  if (session?.user) {
    const raw = searchParams?.redirect || ""
    const dest = raw?.startsWith("/") ? raw : "/start"
    redirect(dest)
  }
  return <SignUp />
}