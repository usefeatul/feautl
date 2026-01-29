import { Container } from "../global/container";
import { Card } from "@featul/ui/components/card";
import { CardAccent, CardTag, AccentBar } from "@featul/ui/components/cardElements";
import { ChartIcon } from "@featul/ui/icons/chart";
import { UsersIcon } from "@featul/ui/icons/users";
import { SetupIcon } from "@featul/ui/icons/setup";
import FeatureCard from "./featureCard";
import Image from "next/image";

export default function Create() {
  return (
    <Container maxWidth="6xl" className="px-4 sm:px-12 lg:px-16 xl:px-18">
      <section>
        <div className="bg-background py-16 sm:py-24">
          <div className="mx-auto w-full px-1 sm:px-6 max-w-5xl ">
            <div>
              <h2 className="text-foreground mt-4 text-2xl sm:text-3xl lg:text-3xl font-semibold">
                Up and running in 30 seconds
              </h2>
              <div className="mt-10 flex items-start gap-2">
                <AccentBar width={8} />
                <p className="text-accent text-sm sm:text-base">
                  Sign up with an email, create your workspace, then add one line
                  of code or share your board link. You're ready to collect feedback.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-8">
              {/* Collect Feedback Card - With two overlapping images */}
              <Card className="relative p-4 sm:p-6 flex flex-col">
                <CardTag />
                <div className="space-y-1 mb-4">
                  <ChartIcon className="size-4 text-primary opacity-100" opacity={1} aria-hidden />
                  <h3 className="text-foreground text-sm sm:text-base font-semibold">Collect Feedback</h3>
                  <CardAccent>
                    Gather ideas and feature requests. Let users vote on what matters most.
                  </CardAccent>
                </div>
                {/* Two overlapping floating images */}
                <div className="relative flex-1 min-h-[180px] sm:min-h-[220px] mt-auto">
                  <div className="absolute left-0 bottom-0 w-[55%] h-[85%] rounded-lg overflow-hidden border border-border/60 shadow-lg bg-background z-10">
                    <Image
                      src="/image/dashboard.png"
                      alt="Feedback votes and statistics"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="absolute right-0 top-0 w-[55%] h-[85%] rounded-lg overflow-hidden border border-border/60 shadow-lg bg-background z-20">
                    <Image
                      src="/image/dashboard.png"
                      alt="User feedback sources and activity"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </Card>

              {/* Public Roadmap Card - With single image */}
              <Card className="relative p-4 sm:p-6 flex flex-col">
                <CardTag />
                <div className="space-y-1 mb-4">
                  <UsersIcon className="size-4 text-primary opacity-100" opacity={1} aria-hidden />
                  <h3 className="text-foreground text-sm sm:text-base font-semibold">Public Roadmap</h3>
                  <CardAccent>
                    Show what's planned, in progress, and shipped. Keep customers informed.
                  </CardAccent>
                </div>
                <div className="relative flex-1 min-h-[140px] sm:min-h-[180px] mt-auto rounded-md overflow-hidden border border-border/50 shadow-sm">
                  <Image
                    src="/image/dashboard.png"
                    alt="Public roadmap showing planned, in-progress, and completed features"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </Card>

              {/* Create Workspace Card (full width) - No image, text only */}
              <Card className="relative p-4 sm:p-6 sm:col-span-2">
                <CardTag />
                <div className="space-y-1">
                  <SetupIcon className="size-4 text-primary opacity-100" opacity={1} aria-hidden />
                  <h3 className="text-foreground text-sm sm:text-base font-semibold">Create workspace</h3>
                  <CardAccent>
                    Get started in seconds — no credit card required. Sign up with an email and you're ready to go.
                  </CardAccent>
                </div>
              </Card>
            </div>

            <FeatureCard withinContainer={false} />
            <div className="mt-10 flex items-start gap-2">
              <AccentBar width={8} />
              <p className="text-accent/80 text-sm">
                Seriously, it's that simple. Most teams collect feedback within minutes of signup.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}