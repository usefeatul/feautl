import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Container } from "@/components/container"
import { getCategoryBySlug, getToolBySlugs, getAllToolParams } from "@/config/tools"
import { TOOL_COMPONENTS } from "@/types/registry"
import ToolTemplate from "@/components/tools/template"
import Breadcrumbs from "@/components/tools/breadcrumbs"

type Props = { params: Promise<{ category: string; tool: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, tool: toolSlug } = await params
  const cat = getCategoryBySlug(category)
  const tool = getToolBySlugs(category, toolSlug)
  if (!cat || !tool) return { title: "Tool" }
  return {
    title: `${tool.name} (Coming Soon)`,
    description: tool.description,
  }
}

 

export default async function ToolPage({ params }: Props) {
  const { category, tool: toolSlug } = await params
  const tool = getToolBySlugs(category, toolSlug)
  if (!tool) return notFound()
  const ToolComponent = TOOL_COMPONENTS[category]?.[toolSlug]

  return (
    <main className="min-h-screen pt-16">
      <Container maxWidth="6xl" className="px-4 sm:px-16 lg:px-20 xl:px-24">
        <section className="py-12 sm:py-16">
          <Breadcrumbs items={[{ href: '/tools', label: 'Tools' }, { href: `/tools/categories/${category}`, label: getCategoryBySlug(category)?.name ?? 'Category' }, { label: tool.name }]} />
          <h1 className="text-balance font-serif text-3xl font-bold md:text-4xl">{tool.name}</h1>
          <p className="text-muted-foreground mt-3">{tool.description}</p>
          {ToolComponent ? <ToolComponent /> : <ToolTemplate tool={tool} />}
        </section>
      </Container>
    </main>
  )
}

export function generateStaticParams() {
  return getAllToolParams()
}