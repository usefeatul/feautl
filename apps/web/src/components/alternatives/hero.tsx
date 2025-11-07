"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/global/container";
import Image from "next/image";
import { Alternative } from "@/config/alternatives";
import { AlternativeHeroContent } from "./hero-content";
import { getAltDescription } from "@/types/descriptions";
import { PreviewSwitchPill } from "@/components/home/preview-switch";
import { usePreviewHint } from "@/components/home/hooks/usePreviewHint";

export function AlternativeHero({ alt }: { alt: Alternative }) {
  const [active, setActive] = useState<"dashboard" | "roadmap" | "changelog">("dashboard");

  const showPillHint = usePreviewHint(active);

  const imageSrc = {
    dashboard: "/image/image.jpeg",
    roadmap: "/bg.png",
    changelog: "/logo.png",
  }[active];

  return (
    <section className="relative overflow-hidden">
      <Container maxWidth="6xl" className="px-4 sm:px-16 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-6xl px-0 sm:px-6">
          <div className="pt-10 pb-24 sm:pt-16 sm:pb-32">
          <AlternativeHeroContent name={alt.name} description={getAltDescription(alt.slug, 'slug-hash')} />

          {/* Screenshot card */}
          <div className="mt-6 w-full rounded-sm shadow-black shadow-2xl">
            <div className="relative">
              <div className="relative z-0 aspect-[16/9] w-full overflow-hidden bg-muted rounded-sm shadow-2xl shadow-zinc-950/50 translate-y-[3px] outline-none ring-2 ring-border/60 ring-offset-2 ring-offset-background">
                <Image src={imageSrc} alt={`${alt.name} vs Feedgot preview`} fill priority className="object-cover" />
              </div>

              <PreviewSwitchPill active={active} onChange={setActive} showHint={showPillHint} />
            </div>
          </div>
          </div>
        </div>
      </Container>
    </section>
  );
}