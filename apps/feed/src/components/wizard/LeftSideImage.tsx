import Image from "next/image"
import { cn } from "@oreilla/ui/lib/utils"

type LeftSideImageProps = {
  alt?: string
  className?: string
  priority?: boolean
}

export default function LeftSideImage({
  alt = "Workspace preview",
  className,
  priority = true,
}: LeftSideImageProps) {
  return (
    <div className={cn("hidden md:block", className)}>
      <div className="relative w-full">
        <Image
          src="/workspaceimg.png"
          alt={alt}
          fill
          className="object-contain"
          sizes="(min-width: 768px) 640px, 100vw"
          priority={priority}
        />
      </div>
    </div>
  )
}
