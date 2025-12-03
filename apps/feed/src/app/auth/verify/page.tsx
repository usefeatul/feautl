import type { Metadata } from "next"
import Verify from "@/components/auth/verify"
import { Suspense } from "react"
import { createPageMetadata } from "@/lib/seo"
export const revalidate = 30

export const metadata: Metadata = createPageMetadata({
  title: "Verify Email",
  description: "Verify your Feedgot email.",
  path: "/auth/verify",
  indexable: false,
})

export default function VerifyPage() {
  return (
    <Suspense fallback={null}> 
      <Verify />
    </Suspense>
  )
}