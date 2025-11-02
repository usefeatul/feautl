import Link from 'next/link'

type Crumb = { href?: string; label: string }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      {items.map((item, i) => (
        <span key={i}>
          {item.href ? (
            <Link href={item.href} className="hover:text-primary underline underline-offset-4">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
          {i < items.length - 1 && <span className="mx-2">›</span>}
        </span>
      ))}
    </nav>
  )
}