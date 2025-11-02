import Link from 'next/link'
import { TOOL_CATEGORIES } from '@/config/tools'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@feedgot/ui/components/card'

export default function CategoryList() {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {TOOL_CATEGORIES.map((cat) => (
        <Link key={cat.slug} href={`/tools/categories/${cat.slug}`} className="group block">
          <Card className="overflow-hidden transition-colors group-hover:bg-accent/30">
            <CardHeader className="p-6 sm:p-8">
              <CardTitle className="font-medium">{cat.name}</CardTitle>
              <CardDescription>{cat.description}</CardDescription>
            </CardHeader>
            <CardFooter className="px-6 sm:px-8 pt-0">
              <span className="text-xs text-muted-foreground">{cat.tools.length} tools</span>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}