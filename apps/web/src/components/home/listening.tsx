import { Container } from "../global/container";
import { ChartIcon } from "@feedgot/ui/icons/chart";
import { LoveIcon } from "@feedgot/ui/icons/love";
import { SetupIcon } from "@feedgot/ui/icons/setup";
import { Card } from "@feedgot/ui/components/card";

export default function Listening() {
  return (
    <Container maxWidth="6xl" className="px-6 sm:px-16 lg:px-20 xl:px-24">
      <section className="" data-component="Listening">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <h2 className="text-foreground text-balance text-3xl sm:text-4xl font-bold">
            Build what your users actually need.
            <span className="block mt-1">Listen and act.</span>
          </h2>
          <p className="mt-4 text-accent text-md leading-6 text-balance sm:max-w-4xl">
            Feedgot gives every request a single homecaptured, organized, and
            ready to ship. No more buried DMs, scattered emails, or forgotten
            ideas.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            <Card className="overflow-hidden p-6 flex flex-col items-start gap-2">
              <LoveIcon
                aria-hidden
                className="size-[30px] text-rose-400 flex-shrink-0"
              />
              <div>
                <h3 className="text-foreground text-base font-medium">
                  Prioritize what users love
                </h3>
                <p className="text-accent mt-1 text-sm leading-6 sm:max-w-[34ch]">
                  Spot ideas with real momentum, not just the loudest voices.
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden p-6 flex flex-col items-start gap-2">
              <ChartIcon
                aria-hidden
                className="size-[30px] text-emerald-400 flex-shrink-0"
              />
              <div>
                <h3 className="text-foreground text-base font-medium">
                  Reduce churn
                </h3>
                <p className="text-accent mt-1 text-sm leading-6 sm:max-w-[34ch]">
                  Show progress on requests so customers stay and engage.
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden p-6 flex flex-col items-start gap-2">
              <SetupIcon
                aria-hidden
                className="size-[30px] text-blue-400 flex-shrink-0"
                opacity={1}
              />
              <div>
                <h3 className="text-foreground text-base font-medium">
                  Save hours each week
                </h3>
                <p className="text-accent mt-1 text-sm leading-6 sm:max-w-[34ch]">
                  Stop chasing feedback across docs, spreadsheets, and emails.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </Container>
  );
}
