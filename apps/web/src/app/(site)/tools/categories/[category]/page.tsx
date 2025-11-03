import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Container } from "@/components/container"
import { getCategoryBySlug, getAllCategorySlugs } from "@/config/tools"
import ToolList from "@/components/tools/tool-list"
import {Breadcrumb} from "@feedgot/ui/components/breadcrumb"

type Props = { params: Promise<{ category: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = getCategoryBySlug(category)
  if (!cat) return { title: "Tools Category" }
  return {
    title: `${cat.name} Tools`,
    description: cat.description,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const cat = getCategoryBySlug(category)
  if (!cat) return notFound()

  return (
    <main className="min-h-screen pt-16">
      <Container maxWidth="6xl" className="px-4 sm:px-16 lg:px-20 xl:px-24">
        <section className="py-12 sm:py-16">
          <Breadcrumb items={[{ href: '/tools', label: 'Tools' }, { href: '/tools/categories', label: 'Categories' }, { label: cat.name }]} />
          <h1 className="text-balance font-serif text-3xl font-bold md:text-4xl">{cat.name}</h1>
          <p className="text-muted-foreground mt-4">{cat.description}</p>
          <ToolList categorySlug={cat.slug} tools={cat.tools} />
        </section>
      </Container>
    </main>
  )
}

export function generateStaticParams() {
  return getAllCategorySlugs().map((category) => ({ category }))
}