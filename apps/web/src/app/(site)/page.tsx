
import { Hero } from '@/components/home/hero'
import Feature from '@/components/home/feature'
import Faq from '@/components/home/faq'
import BentoFeature from '@/components/home/bento-feature'
// import Pricing from '@/components/home/pricing'
import StatsSection from '@/components/home/cta'


export default async function Home() {
  return (
    <main className="min-h-screen pt-16">
      <Hero />
      <BentoFeature />
      <Feature />
      <Faq />
      <StatsSection />
    </main>
  )
}
