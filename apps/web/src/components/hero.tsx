import { Container } from "./container";
import Image from "next/image";
import { HeroContent } from "./hero-content";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Container maxWidth="6xl">
        <div className="pt-10 pb-24 sm:pt-16 sm:pb-32">
          <HeroContent />

          {/* Screenshot card */}
          <div className="mt-12 max-w-5xl rounded-2xl border border-border bg-white">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted">
              <Image
                src="/image/image.jpeg"
                alt="Feedgot dashboard preview"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="px-4 py-2 text-center text-xs text-muted-foreground">
              Dashboard • Click to switch between our core features
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
