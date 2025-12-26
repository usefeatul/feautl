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
      <div className="flex flex-col justify-between gap-6 w-full h-full pt-6 pb-6">
        <div className="space-y-2 max-w-sm">
          <p className="text-lg font-medium tracking-[0.24em] uppercase text-black dark:text-white">
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
                "bg-stone-950",
              )}
            />
            <div
              className={cn(
                "relative",
                "rounded-sm px-9 py-12 h-48 flex items-center justify-center",
                "shadow-[0_18px_40px_rgba(15,23,42,0.9)] transition-transform duration-300",
                "group-hover:-translate-y-2 group-hover:shadow-[0_24px_55px_rgba(15,23,42,1)]",
                "border border-white/10 bg-gradient-to-br from-stone-900 to-stone-800",
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
