import Link from 'next/link'
import type { ToolItem } from '@/config/tools'
import { Card, CardHeader, CardTitle, CardDescription } from '@feedgot/ui/components/card'

export default function ToolList({ categorySlug, tools }: { categorySlug: string; tools: ToolItem[] }) {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <Link key={tool.slug} href={`/tools/categories/${categorySlug}/${tool.slug}`} className="group block">
          <Card className="overflow-hidden transition-colors group-hover:bg-accent/30">
            <CardHeader className="p-6 sm:p-8">
              <CardTitle className="font-medium">{tool.name}</CardTitle>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}