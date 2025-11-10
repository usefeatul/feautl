"use client";

import { Container } from "@/components/global/container";
import Image from "next/image";
import { Alternative } from "@/config/alternatives";
import { AlternativeHeroContent } from "./hero-content";
import { getAltDescription } from "@/types/descriptions";

// Distinct layout from the main hero: image-right, content-left
// with tighter alignment and a smaller screenshot.
export function AlternativeHero({ alt }: { alt: Alternative }) {
  const imageSrc = "/image/image.jpeg";

  return (
    <section className="relative overflow-hidden">
      <Container maxWidth="6xl" className="px-4 sm:px-16 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-6xl px-0 sm:px-6">
          <div className="pt-10 pb-24 sm:pt-16 sm:pb-32">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center justify-items-start">
              {/* Right: screenshot (smaller) */}
              <div className="relative order-last lg:order-2 lg:col-span-5 lg:pl-6 self-center max-w-xl mx-auto lg:mx-0">
                <div className="relative z-0 aspect-[4/3] w-full overflow-hidden rounded-md bg-muted   ring-2 ring-border/60 ring-offset-2 ring-offset-background">
                  <Image
                    src={imageSrc}
                    alt={`${alt.name} vs Feedgot preview screenshot`}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Left: content (wider to balance) */}
              <div className="order-first lg:order-1 flex flex-col items-start justify-center lg:pr-6 lg:col-span-7 text-left">
                <AlternativeHeroContent
                  name={alt.name}
                  description={getAltDescription(alt.slug)}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}