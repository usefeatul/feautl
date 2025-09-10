import { cn } from "@/lib/utils";
import { Button } from "@feedgot/ui/components/button";
import Image from "next/image";

export function Hero() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.png"
          alt="Background"
          fill
          className="object-cover opacity-10"
          priority
        />
      </div>
      <div className="max-w-4xl mx-auto text-center space-y-16 relative z-10">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 text-xs text-neutral-400">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            In Development
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white">
              FeedGot
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              The minimal, open-source feedback platform for modern teams
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="px-6 py-2.5 border border-neutral-700 text-neutral-300 text-sm font-medium rounded-md hover:border-neutral-600 transition-colors">
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
