import type { Metadata } from "next"
import SignIn from "@/components/auth/SignIn"
import { createPageMetadata } from "@/lib/seo"
import { getServerSession } from "@feedgot/auth/session"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

export const metadata: Metadata = createPageMetadata({
  title: "Sign In",
  description: "Access your Feedgot account.",
  path: "/auth/sign-in",
  indexable: false,
})

export default async function SignInPage({ searchParams }: { searchParams?: { redirect?: string } }) {
  const session = await getServerSession()
  if (session?.user) {
    const raw = searchParams?.redirect || ""
    const dest = raw?.startsWith("/") ? raw : "/start"
    redirect(dest)
  }
  return <SignIn />
}