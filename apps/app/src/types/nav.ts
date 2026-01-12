export type NavItem = {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  external?: boolean
}

