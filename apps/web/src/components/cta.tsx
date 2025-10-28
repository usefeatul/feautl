import { Container } from "./container";
import { HotkeyLink } from "./hotkey-link";
import { LiveDemo } from "./live-demo";

export default function StatsSection() {
  return (
    <section className="bg-background py-12">
      <Container maxWidth="6xl">
        <div className="mx-auto max-w-6xl px-6 bg-white p-6 rounded-lg shadow-md border border-black/10">
          <h2 className="text-foreground max-w-lg text-balance text-3xl font-semibold lg:text-4xl">
            <span className="text-muted-foreground">Build Modern Websites.</span> Drive Results
          </h2>
          <p className="mt-4 text-lg">
            Libero sapiente aliquam quibusdam aspernatur, praesentium iusto repellendus.
          </p>
          <div className="mt-8 flex gap-3">
            <HotkeyLink href="/signup" hotkeyHref="https://dashboard.feedbot.com" />
            <LiveDemo />
          </div>
        </div>
      </Container>
    </section>
  );
}