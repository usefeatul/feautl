import { Navbar } from "./components/navbar"
import { Hero } from "./components/hero"

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 relative isolate">      
      <Navbar />
      <Hero />
    </div>
  )
}
