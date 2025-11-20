import React from 'react'
import type { Metadata } from 'next'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = {
  ...createPageMetadata({ title: 'Dashboard', description: 'Overview of your projects in Feedgot.', path: '/dashboard' }),
  robots: { index: false, follow: false },
}

const Homepage = () => {
  return (
    <div className="">
      hello there dashboard
    </div>
  )
}

export default Homepage

