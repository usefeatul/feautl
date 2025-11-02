import type { NavigationItem } from './homeNav'

export interface FooterNavGroup {
  title: string
  items: NavigationItem[]
}

export interface FooterNavigationConfig {
  groups: FooterNavGroup[]
}

export const footerNavigationConfig: FooterNavigationConfig = {
  groups: [
    {
      title: 'Product',
      items: [
        { name: 'Pricing', href: '/pricing' },
        { name: 'Docs', href: '/docs' },
      ],
    },
    {
      title: 'Alternatives',
      items: [
        { name: 'UserJot', href: '#' },
        { name: 'Featurebase', href: '#' },
        { name: 'Nolt', href: '#' },
        { name: 'Canny', href: '#' },
        { name: 'Upvoty', href: '#' },
      ],
    },
    {
      title: 'Resources',
      items: [
        { name: 'Blog', href: '/blog' },
        { name: 'Tools', href: '/tools' },
        
      ],
    },
    {
      title: 'Legal',
      items: [
        { name: 'Terms', href: '/terms' },
        { name: 'Privacy', href: '/privacy' },
        { name: 'GDPR', href: '/gdpr' },
      ],
    },
  ],
}