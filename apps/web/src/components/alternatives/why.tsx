import { Container } from "@/components/global/container";
import type { Alternative } from "@/config/alternatives";
import { Shield, Plug, Feather, GaugeCircle, LifeBuoy, Sparkles } from "lucide-react";

export default function WhyBetter({ alt }: { alt: Alternative }) {
  return (
    <Container maxWidth="6xl" className="px-4 sm:px-16 lg:px-20 xl:px-24">
      <section className="py-16" data-component="WhyBetter">
        <div className="mx-auto w-full max-w-6xl px-0 sm:px-6">
          <h2 className="text-foreground text-balance text-3xl sm:text-4xl font-semibold">
            What makes Feedgot different
          </h2>
          <p className="text-accent mt-3 text-sm sm:text-base leading-7 sm:max-w-[70ch]">
            If you’re comparing {alt.name} with Feedgot, here’s how Feedgot’s focus on privacy, speed, and a unified workflow changes day‑to‑day work.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-14">
            <div>
              <div className="flex items-start gap-3">
                <span className="inline-flex size-7 sm:size-8 items-center justify-center rounded-md bg-foreground/5 text-primary ring-1 ring-foreground/10 p-1 sm:p-1.5">
                  <Shield className="size-4 sm:size-5" />
                </span>
                <h3 className="text-foreground text-base sm:text-lg font-medium">Own your feedback</h3>
              </div>
              <div className="text-accent mt-2 text-sm sm:text-base leading-7 space-y-4">
                <p>
                  Keep control over where data lives with EU hosting options and practical GDPR defaults. Teams get clarity on compliance without juggling extra tools.
                </p>
                <p>
                  Data export stays straightforward and portable, so switching or self‑hosting later doesn’t mean starting from zero.
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-start gap-3">
                <span className="inline-flex size-7 sm:size-8 items-center justify-center rounded-md bg-foreground/5 text-primary ring-1 ring-foreground/10 p-1 sm:p-1.5">
                  <Plug className="size-4 sm:size-5" />
                </span>
                <h3 className="text-foreground text-base sm:text-lg font-medium">Start in minutes</h3>
              </div>
              <div className="text-accent mt-2 text-sm sm:text-base leading-7 space-y-4">
                <p>
                  Share a hosted space right away or drop in the widget with a single snippet. Configuration is simple—statuses, tags, and branding are ready out of the box.
                </p>
                <p>
                  Collect feedback where users already are, without redirect loops or complex setup guides.
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-start gap-3">
                <span className="inline-flex size-7 sm:size-8 items-center justify-center rounded-md bg-foreground/5 text-primary ring-1 ring-foreground/10 p-1 sm:p-1.5">
                  <Feather className="size-4 sm:size-5" />
                </span>
                <h3 className="text-foreground text-base sm:text-lg font-medium">Tiny footprint</h3>
              </div>
              <div className="text-accent mt-2 text-sm sm:text-base leading-7 space-y-4">
                <p>
                  The widget loads fast and plays nicely with performance budgets. Assets are lazy‑loaded and cached so pages stay snappy.
                </p>
                <p>
                  Keep UX smooth while still gathering the context you need to prioritize confidently.
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-start gap-3">
                <span className="inline-flex size-7 sm:size-8 items-center justify-center rounded-md bg-foreground/5 text-primary ring-1 ring-foreground/10 p-1 sm:p-1.5">
                  <GaugeCircle className="size-4 sm:size-5" />
                </span>
                <h3 className="text-foreground text-base sm:text-lg font-medium">Clear over complex</h3>
              </div>
              <div className="text-accent mt-2 text-sm sm:text-base leading-7 space-y-4">
                <p>
                  Boards, votes, statuses, roadmaps, and release notes—no maze of features. Feedgot favors signal and ship‑ability over configuration sprawl.
                </p>
                <p>
                  You get a single flow from idea to shipped change, visible to your users at each step.
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-start gap-3">
                <span className="inline-flex size-7 sm:size-8 items-center justify-center rounded-md bg-foreground/5 text-primary ring-1 ring-foreground/10 p-1 sm:p-1.5">
                  <LifeBuoy className="size-4 sm:size-5" />
                </span>
                <h3 className="text-foreground text-base sm:text-lg font-medium">Human support</h3>
              </div>
              <div className="text-accent mt-2 text-sm sm:text-base leading-7 space-y-4">
                <p>
                  Talk to the builders. We keep answers short, practical, and focused on helping you ship. Documentation stays concise, and examples map to common SaaS workflows.
                </p>
                <p>
                  Self‑hosting or cloud—either way, you won’t be left waiting for a forum reply.
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-start gap-3">
                <span className="inline-flex size-7 sm:size-8 items-center justify-center rounded-md bg-foreground/5 text-primary ring-1 ring-foreground/10 p-1 sm:p-1.5">
                  <Sparkles className="size-4 sm:size-5" />
                </span>
                <h3 className="text-foreground text-base sm:text-lg font-medium">Details that add up</h3>
              </div>
              <div className="text-accent mt-2 text-sm sm:text-base leading-7 space-y-4">
                <p>
                  Keyboard‑friendly triage, consistent spacing, and accessible components reduce friction. Roadmap and changelog stay in sync without manual back‑and‑forth.
                </p>
                <p>
                  Small touches make everyday work calmer and keep your team focused on outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}