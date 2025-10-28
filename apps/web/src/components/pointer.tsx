"use client"

import Image from "next/image"
import { cn } from "@feedgot/ui/lib/utils"

interface PointerProps {
  className?: string
  alt?: string
}

export function Pointer({ className, alt = "Switch features pointer" }: PointerProps) {
  return (
    <div className={cn("flex justify-center", className)}>
      <Image
        src="/pointer.png"
        alt={alt}
        width={260}
        height={50}
        priority
      />
    </div>
  )
}

export default Pointer