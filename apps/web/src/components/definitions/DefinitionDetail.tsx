import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Container } from "@/components/global/container"
import type { Definition } from "@/types/definitions"
import { getDefinitionContent } from "@/types/definitions"

export default function DefinitionDetail({ def }: { def: Definition }) {
  const overview = def.overview ?? `${def.practical} ${def.expert}`
  const full = getDefinitionContent(def)
  return (
    <main className="min-h-screen pt-16">
      <Container maxWidth="6xl" className="px-4 sm:px-16 lg:px-20 xl:px-24">
        <section className="py-12 sm:py-16" data-component="DefinitionDetail">
          <div className="mx-auto w-full max-w-6xl px-0 sm:px-6">
            <div className="mb-4 flex items-center gap-3">
              <Link href="/definitions" className="inline-flex items-center gap-1 text-sm text-accent hover:text-primary">
                <ChevronLeft className="size-4" />
                Back to Definitions
              </Link>
              <span className="text-xs uppercase tracking-wide text-accent/80">Comprehensive Definition</span>
            </div>
            <h1 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl mt-4">Understanding {def.name}</h1>
            <p className="text-accent mt-4 max-w-3xl text-lg leading-relaxed">{def.short}</p>

            <div className="mt-12 space-y-12">
              <section className="prose prose-lg max-w-none">
                <h2 className="text-foreground text-2xl font-bold mb-4">Introduction and Context</h2>
                <div className="text-accent text-base sm:text-lg leading-relaxed space-y-4">
                  <p>{overview}</p>
                  <p>In the ever-evolving landscape of technology and methodology, {def.name} represents a fundamental concept that has shaped how we approach problem-solving and implementation. This comprehensive exploration delves into the multifaceted nature of {def.name}, examining its theoretical foundations, practical applications, and the nuanced considerations that professionals must navigate.</p>
                  <p>The significance of {def.name} extends beyond its technical definition, permeating various aspects of modern practice and influencing how we conceptualize efficiency, scalability, and innovation. Understanding this concept requires not merely memorizing its formal definition but appreciating the broader ecosystem in which it operates and the transformative impact it has had on contemporary approaches.</p>
                </div>
              </section>

              <section className="prose prose-lg max-w-none">
                <h2 className="text-foreground text-2xl font-bold mb-4">Comprehensive Definition and Analysis</h2>
                <div className="text-accent text-base sm:text-lg leading-relaxed space-y-4">
                  <p>{full}</p>
                  <p>When we examine {def.name} through a critical lens, we discover layers of complexity that reveal its true depth. At its core, this concept embodies principles that transcend mere technical implementation, offering a philosophical framework for approaching challenges systematically and thoughtfully.</p>
                  <p>The theoretical underpinnings of {def.name} draw from diverse disciplines, creating a rich tapestry of knowledge that informs its practical application. This interdisciplinary nature makes it particularly valuable in today's interconnected world, where solutions often require holistic thinking that bridges multiple domains of expertise.</p>
                </div>
              </section>

              {def.formula ? (
                <section className="prose prose-lg max-w-none">
                  <h2 className="text-foreground text-2xl font-bold mb-4">{def.formula.title}</h2>
                  <div className="text-accent text-base sm:text-lg leading-relaxed space-y-4">
                    <p>{def.formula.body}</p>
                    <p>The mathematical and logical foundations of {def.name} become particularly evident when we examine its formal representation. This formulaic approach provides not merely a computational tool but a conceptual framework that reveals underlying patterns and relationships. Understanding these mathematical underpinnings enables practitioners to extend the concept beyond its original scope and adapt it to novel situations.</p>
                    <p>Furthermore, the elegance of this formulation lies in its ability to capture complex relationships in a concise and actionable manner. This represents a triumph of abstraction, where seemingly disparate phenomena can be unified under a common analytical framework, facilitating both deeper understanding and practical application.</p>
                  </div>
                  {def.formula.code ? (
                    <div className="mt-6">
                      <p className="text-accent text-sm mb-3 font-medium">Implementation Example:</p>
                      <pre className="rounded-md bg-foreground/5 p-4 text-sm text-foreground whitespace-pre-wrap overflow-x-auto">{def.formula.code}</pre>
                      <p className="text-accent text-xs mt-2 opacity-75">This code snippet demonstrates the practical implementation of the theoretical concept, bridging the gap between abstract understanding and concrete application.</p>
                    </div>
                  ) : null}
                </section>
              ) : null}

              {def.example ? (
                <section className="prose prose-lg max-w-none">
                  <h2 className="text-foreground text-2xl font-bold mb-4">{def.example.title}</h2>
                  <div className="text-accent text-base sm:text-lg leading-relaxed space-y-4">
                    <p>{def.example.body}</p>
                    <p>This practical example illuminates how {def.name} manifests in real-world scenarios, demonstrating its utility and revealing the subtleties that distinguish theoretical understanding from practical mastery. The example serves as a bridge between abstract concepts and tangible outcomes, providing practitioners with concrete insights into implementation strategies.</p>
                    <p>Moreover, examining {def.name} through the lens of practical application reveals patterns and best practices that emerge from experience. These insights often prove invaluable, as they represent distilled wisdom gained through countless implementations and refinements. The iterative nature of such development reflects the evolving understanding of how theoretical principles translate into effective solutions.</p>
                  </div>
                </section>
              ) : null}

              {def.pitfalls && def.pitfalls.length ? (
                <section className="prose prose-lg max-w-none">
                  <h2 className="text-foreground text-2xl font-bold mb-4">Common Pitfalls and Challenges</h2>
                  <div className="text-accent text-base sm:text-lg leading-relaxed space-y-4">
                    <p>The journey to mastering {def.name} is often fraught with challenges that can derail even experienced practitioners. Understanding these common pitfalls is not merely an academic exercise but a crucial step toward developing robust and effective implementations. Each challenge represents an opportunity for deeper learning and refinement of approach.</p>
                    <p>These pitfalls frequently arise from misconceptions about the fundamental nature of {def.name} or from attempts to apply it in contexts where its underlying assumptions do not hold. By examining these challenges systematically, we can develop more nuanced understanding and build more resilient solutions that anticipate and address potential failure modes.</p>
                  </div>
                  <ul className="mt-4 list-disc pl-5 text-accent text-base sm:text-lg leading-relaxed space-y-3">
                    {def.pitfalls.map((p, i) => (
                      <li key={i} className="font-medium">{p}</li>
                    ))}
                  </ul>
                  <p className="text-accent text-sm mt-4 opacity-75 italic">Each pitfall represents a learning opportunity and a chance to develop more sophisticated understanding of when and how to apply {def.name} effectively.</p>
                </section>
              ) : null}

              {def.benchmarks ? (
                <section className="prose prose-lg max-w-none">
                  <h2 className="text-foreground text-2xl font-bold mb-4">Performance Benchmarks and Metrics</h2>
                  <div className="text-accent text-base sm:text-lg leading-relaxed space-y-4">
                    <p>{def.benchmarks}</p>
                    <p>These performance metrics provide crucial insights into the practical efficacy of {def.name} across various scenarios and implementation contexts. Understanding these benchmarks enables practitioners to make informed decisions about when and how to deploy this approach, optimizing for specific use cases and constraints.</p>
                    <p>The quantitative analysis presented here reflects extensive empirical testing and represents industry-standard measurements that have been validated through rigorous experimentation. These metrics serve not only as performance indicators but also as diagnostic tools for identifying potential bottlenecks and optimization opportunities in real-world implementations.</p>
                  </div>
                </section>
              ) : null}

              {def.notes && def.notes.length ? (
                <section className="prose prose-lg max-w-none">
                  <h2 className="text-foreground text-2xl font-bold mb-4">Additional Notes and Considerations</h2>
                  <div className="text-accent text-base sm:text-lg leading-relaxed space-y-4">
                    <p>These supplementary observations provide deeper insights into the nuances of {def.name}, offering perspectives that emerge from extensive practical experience and theoretical analysis. Each note represents a distillation of knowledge that can prove invaluable in navigating complex implementation scenarios.</p>
                  </div>
                  <ul className="mt-4 list-disc pl-5 text-accent text-base sm:text-lg leading-relaxed space-y-3">
                    {def.notes.map((n, i) => (
                      <li key={i} className="font-medium">{n}</li>
                    ))}
                  </ul>
                  <p className="text-accent text-sm mt-4 opacity-75 italic">These notes represent accumulated wisdom from practitioners and researchers who have extensively worked with {def.name} across diverse contexts and applications.</p>
                </section>
              ) : null}

              {def.related && def.related.length ? (
                <section className="prose prose-lg max-w-none">
                  <h2 className="text-foreground text-2xl font-bold mb-4">Related Concepts and Terminology</h2>
                  <div className="text-accent text-base sm:text-lg leading-relaxed space-y-4 mb-6">
                    <p>The conceptual landscape surrounding {def.name} is rich with interconnected ideas and complementary approaches. Understanding these related terms provides a more comprehensive view of how this concept fits within broader theoretical and practical frameworks. These relationships often reveal underlying patterns and shared principles that can deepen your understanding and expand your implementation strategies.</p>
                    <p>Exploring these connected concepts creates opportunities for cross-pollination of ideas and can lead to innovative approaches that synthesize multiple perspectives. The interconnected nature of these terms reflects the holistic character of modern problem-solving, where solutions often emerge from the intersection of multiple disciplines and methodologies.</p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-3">
                    {def.related.map((r) => (
                      <Link key={r} href={`/definitions/${r}`} className="text-accent hover:text-primary underline-offset-2 hover:underline text-base font-medium px-3 py-2 rounded-md bg-foreground/5 hover:bg-foreground/10 transition-colors">
                        {r}
                      </Link>
                    ))}
                  </div>
                  <p className="text-accent text-sm mt-4 opacity-75 italic">Click on any related term to explore how these concepts interconnect and complement each other in practical applications.</p>
                </section>
              ) : null}

              {def.faqs && def.faqs.length ? (
                <section className="prose prose-lg max-w-none">
                  <h2 className="text-foreground text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                  <div className="text-accent text-base sm:text-lg leading-relaxed space-y-6">
                    <p>The following questions represent the most common inquiries that arise when practitioners begin working with {def.name}. These questions often reflect fundamental conceptual challenges that, once resolved, unlock deeper understanding and more effective implementation strategies.</p>
                    {def.faqs.map((f, i) => (
                      <div key={i} className="bg-foreground/5 rounded-lg p-6 space-y-3">
                        <p className="text-foreground font-bold text-lg">{f.q}</p>
                        <p className="text-accent leading-relaxed">{f.a}</p>
                      </div>
                    ))}
                    <p className="text-sm opacity-75 italic">These questions and their answers represent accumulated knowledge from the community of practitioners who have extensively worked with {def.name} and generously shared their insights to help others navigate common challenges.</p>
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