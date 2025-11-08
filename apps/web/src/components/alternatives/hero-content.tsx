"use client";
import { HotkeyLink } from "@/components/global/hotkey-link";
import { LiveDemo } from "@/components/global/live-demo";

export function AlternativeHeroContent({
  name,
  description,
}: {
  name: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-5xl lg:max-w-6xl text-left mt-14 sm:mt-0">
      {/* Main heading */}
      <h1 className=" text-3xl leading-tight tracking-normal sm:tracking-tight font-extrabold text-foreground text-balance">
        The simple, fast and privacy-first
        <span className="block mt-0">alternative to {name}</span>
      </h1>

      {/* Subtitle */}
      <p className="mt-6 max-w-3xl sm:max-w-4xl lg:max-w-5xl text-xs sm:text-sm md:text-base leading-relaxed text-accent text-balance">
        {description ?? (
          <>
            Compare {name} and Feedgot — transparent by design, focused on
            simplicity and user-first UX. Organized feedback boards,
            auto-syncing roadmaps, and self-writing changelogs.
          </>
        )}
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-4">
        <HotkeyLink
          href="/signup"
          hotkeyHref="https://dashboard.feedbot.com"
          className="w-full sm:w-auto"
          label="Add to your website"
        />
        <LiveDemo className="w-full sm:w-auto text-accent" />
      <p className="mt-3 text-xs sm:text-sm text-accent gap-2  items-center justify-center">
        
        <span className="block sm:inline text-black">no credit card required.</span>
        no obligation. quick setup.
      </p>
      </div>
    </div>
  );
}
