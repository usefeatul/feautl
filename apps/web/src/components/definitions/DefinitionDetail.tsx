import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Container } from "@/components/global/container"
import type { Definition } from "@/types/definitions"

export default function DefinitionDetail({ def }: { def: Definition }) {
  const overview = def.overview ?? `${def.practical} ${def.expert}`
  return (
    <main className="min-h-screen pt-16">
      <Container maxWidth="6xl" className="px-4 sm:px-16 lg:px-20 xl:px-24">
        <section className="py-12 sm:py-16" data-component="DefinitionDetail">
          <div className="mx-auto w-full max-w-6xl px-0 sm:px-6">
            <div className="mb-4 flex items-center gap-3">
              <Link href="/definitions" className="inline-flex items-center gap-1 text-sm text-accent hover:text-primary">
                <ChevronLeft className="size-4" />
                Back
              </Link>
              <span className="text-xs uppercase tracking-wide text-accent/80">Definition</span>
            </div>
            <h1 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl mt-4">{def.name}</h1>
            <p className="text-accent mt-4 max-w-2xl">{def.short}</p>

            <div className="mt-8 space-y-10">
              <section>
                <h2 className="text-foreground text-lg font-semibold">Overview</h2>
                <p className="text-accent mt-2 text-sm sm:text-base leading-7">{overview}</p>
              </section>

              <section>
                <h2 className="text-foreground text-lg font-semibold">ELI5</h2>
                <p className="text-accent mt-2 text-sm sm:text-base leading-7">{def.eli5}</p>
              </section>

              <section>
                <h2 className="text-foreground text-lg font-semibold">Practical</h2>
                <p className="text-accent mt-2 text-sm sm:text-base leading-7">{def.practical}</p>
              </section>

              <section>
                <h2 className="text-foreground text-lg font-semibold">Expert</h2>
                <p className="text-accent mt-2 text-sm sm:text-base leading-7">{def.expert}</p>
              </section>

              {def.formula ? (
                <section>
                  <h2 className="text-foreground text-lg font-semibold">{def.formula.title}</h2>
                  <p className="text-accent mt-2 text-sm sm:text-base leading-7">{def.formula.body}</p>
                  {def.formula.code ? (
                    <pre className="mt-4 rounded-md bg-foreground/5 p-4 text-sm text-foreground whitespace-pre-wrap">{def.formula.code}</pre>
                  ) : null}
                </section>
              ) : null}

              {def.example ? (
                <section>
                  <h2 className="text-foreground text-lg font-semibold">{def.example.title}</h2>
                  <p className="text-accent mt-2 text-sm sm:text-base leading-7">{def.example.body}</p>
                </section>
              ) : null}

              {def.why ? (
                <section>
                  <h2 className="text-foreground text-lg font-semibold">Why it matters</h2>
                  <p className="text-accent mt-2 text-sm sm:text-base leading-7">{def.why}</p>
                </section>
              ) : null}

              {def.pitfalls && def.pitfalls.length ? (
                <section>
                  <h2 className="text-foreground text-lg font-semibold">Common pitfalls</h2>
                  <ul className="mt-2 list-disc pl-5 text-accent text-sm sm:text-base leading-7 space-y-1">
                    {def.pitfalls.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {def.benchmarks ? (
                <section>
                  <h2 className="text-foreground text-lg font-semibold">Benchmarks</h2>
                  <p className="text-accent mt-2 text-sm sm:text-base leading-7">{def.benchmarks}</p>
                </section>
              ) : null}

              {def.notes && def.notes.length ? (
                <section>
                  <h2 className="text-foreground text-lg font-semibold">Notes</h2>
                  <ul className="mt-2 list-disc pl-5 text-accent text-sm sm:text-base leading-7 space-y-1">
                    {def.notes.map((n, i) => (
                      <li key={i}>{n}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {def.related && def.related.length ? (
                <section>
                  <h2 className="text-foreground text-lg font-semibold">Related terms</h2>
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
                    {def.related.map((r) => (
                      <Link key={r} href={`/definitions/${r}`} className="text-accent hover:text-primary underline-offset-2 hover:underline">
                        {r}
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}

              {def.faqs && def.faqs.length ? (
                <section>
                  <h2 className="text-foreground text-lg font-semibold">FAQs</h2>
                  <div className="mt-4 space-y-4">
                    {def.faqs.map((f, i) => (
                      <div key={i} className="space-y-2">
                        <p className="text-foreground font-medium">{f.q}</p>
                        <p className="text-accent text-sm sm:text-base leading-7">{f.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          </div>
        </section>
      </Container>
    </main>
  )
}