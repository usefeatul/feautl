import type { Metadata } from "next"
import { Container } from "@/components/container"
import CategoryList from "@/components/tools/category-list"

export const metadata: Metadata = {
  title: "All Tool Categories",
  description: "Browse every category of tools including revenue, retention, and customer feedback.",
}

export default function ToolsCategoriesPage() {
  return (
    <main className="min-h-screen pt-16">
      <Container maxWidth="6xl" className="px-4 sm:px-16 lg:px-20 xl:px-24">
        <section className="py-12 sm:py-16">
          <h1 className="text-balance font-serif text-3xl font-bold md:text-4xl">Categories</h1>
          <p className="text-muted-foreground mt-4">Find calculators and templates grouped by topic.</p>
          <CategoryList />
        </section>
      </Container>
    </main>
  )
}