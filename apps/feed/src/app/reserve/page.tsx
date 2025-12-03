import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"
import ReserveForm from "@/components/reserve/ReserveForm"

export const revalidate = 30

export const metadata: Metadata = createPageMetadata({
  title: "Reserve your subdomain",
  description: "Reserve a Feedgot subdomain and claim it when you sign up.",
  path: "/reserve",
  indexable: true,
})

export default function ReservePage() {
  return <ReserveForm />
}

