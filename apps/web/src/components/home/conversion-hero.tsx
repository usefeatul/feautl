"use client";

import Link from "next/link";
import { Container } from "../global/container";
import { HotkeyLink } from "../global/hotkey-link";
import { Button } from "@feedgot/ui/components/button";
import { BoardIcon } from "@feedgot/ui/icons/board";
import { RoadmapIcon } from "@feedgot/ui/icons/roadmap";
import { ChangelogIcon } from "@feedgot/ui/icons/changelog";

export function ConversionHero() {
  return (
    <section className="relative" data-component="ConversionHero">
      <Container maxWidth="6xl" className="px-4 sm:px-16 lg:px-20 xl:px-24">
        <div className="w-full px-0 sm:px-6">
          <div className="pt-5 pb-10 sm:pt-8 sm:pb-14">
            <h1 className="text-foreground text-xl sm:text-2xl md:text-3xl font-semibold leading-snug w-full max-w-none">
              Customer feedback that helps you prioritize and ship faster.
              <span className="block mt-1 text-foreground/90 w-full max-w-none">
                Works with a
                <span className="mx-1 inline-flex items-center gap-1 rounded-md bg-foreground/5 px-1 py-0 text-foreground/60 ring-1 ring-foreground/10 align-baseline">
                  <BoardIcon className="size-3" />
                  feedback board
                </span>
                ,
                <span className="mx-1 inline-flex items-center gap-1 rounded-md bg-foreground/5 px-1 py-0 text-foreground/60 ring-1 ring-foreground/10 align-baseline">
                  <RoadmapIcon className="size-3" />
                  public roadmap
                </span>
                , and
                <span className="mx-1 inline-flex items-center gap-1 rounded-md bg-foreground/5 px-1 py-0 text-foreground/60 ring-1 ring-foreground/10 align-baseline">
                  <ChangelogIcon className="size-3" />
                  changelog
                </span>
                .
              </span>
            </h1>
            <p className="mt-3 text-accent text-xs sm:text-sm md:text-sm leading-relaxed max-w-[60ch]">
              Capture requests and votes, keep customers in the loop, and share progress openly—similar to UserJot, Featurebase, Nolt, Canny, and Upvoty, but lightweight and privacy‑first.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <HotkeyLink className="w-full sm:w-auto !h-9 !px-3 rounded-sm" label="Add to your website" />
              <Button asChild variant="outline" size="sm" className="w-full sm:w-auto h-9 px-3 rounded-sm text-accent">
                <Link href="#demo" aria-label="Get a demo">
                  Get a demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}