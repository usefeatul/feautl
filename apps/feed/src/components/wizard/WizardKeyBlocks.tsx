import { cn } from "@oreilla/ui/lib/utils"

type WizardKeyBlocksProps = {
  className?: string
}

const blocks = [
  {
    label: "Collect",
  },
  {
    label: "Ship",
  },
  {
    label: "Announce",
  },
  {
    label: "Prioritize",
  },
]

export default function WizardKeyBlocks({ className }: WizardKeyBlocksProps) {
  return (
    <div
      className={cn("hidden md:flex pr-10 max-w-[520px] h-full", className)}
    >
      <div className="flex flex-col justify-between gap-6 w-full h-full pb-6">
        <div className="space-y-2 max-w-md mt-4">
          <p className="text-lg font-medium tracking-[0.24em] uppercase text-black dark:text-white ">
            Feedback blocks
          </p>
          <p className="text-sm text-accent max-w-sm">
            A simple stack of steps that guide how you collect, ship, announce and prioritize work.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 w-full">
        {blocks.map((block, index) => (
          <div
            key={block.label}
            className={cn(
              "group relative",
            )}
            style={{
              transform: index % 2 === 0 ? "rotate(-1deg)" : "rotate(1deg)",
            }}
          >
            <div
              className={cn(
                "absolute inset-0 rounded-sm translate-x-2 translate-y-2 opacity-70",
                "bg-stone-950 ",
              )}
            />
            <div
              className={cn(
                "relative  ring-1 ring-border/60 ring-offset-1 ring-offset-background",
                "rounded-sm px-7 py-8 h-52 flex items-center justify-center ",
                "border border-white/10 bg-linear-to-br from-stone-900 to-stone-800 dark:from-stone-800 dark:to-stone-900",
              )}
            >
              <div className="flex flex-col items-center gap-3">
                <span className="text-white font-semibold text-lg tracking-[0.22em] uppercase">
                  {block.label}
                </span>
                <span className="h-1 w-10 rounded-full bg-stone-300/80" />
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}
