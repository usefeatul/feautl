import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = {
  ...createPageMetadata({ title: "Feedgot", description: "Welcome to Feedgot.", path: "/" }),
  robots: { index: false, follow: false },
}

export default function Page() {
  redirect("/auth/sign-in")
}