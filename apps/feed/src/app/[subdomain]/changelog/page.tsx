export const dynamic = "force-dynamic"

import { DomainSidebar } from "@/components/domain/DomainSidebar"

export default async function ChangelogPage({ params }: { params: Promise<{ subdomain: string }> }) {
  const { subdomain } = await params
  const slug = subdomain
  return (
    <section className="pb-2">
      <div className="lg:grid lg:grid-cols-[minmax(0,1.5fr)_280px] lg:gap-10">
        <div>
          <h1 className="text-lg font-semibold mb-4">Changelog</h1>
          {/* TODO: render public changelog content */}
        </div>
        <div className="mt-10 lg:mt-0">
          <DomainSidebar subdomain={subdomain} slug={slug} />
        </div>
      </div>
    </section>
  )
}
