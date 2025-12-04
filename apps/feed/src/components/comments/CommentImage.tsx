"use client"

import React, { useState } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@feedgot/ui/components/dialog"
import { cn } from "@feedgot/ui/lib/utils"

interface CommentImageProps {
  url: string
  alt: string
  className?: string
  size?: "small" | "medium" | "large"
}

export default function CommentImage({ url, alt, className, size = "small" }: CommentImageProps) {
  const [isOpen, setIsOpen] = useState(false)

  const sizeClasses = {
    small: "max-w-[120px] max-h-20",
    medium: "max-w-[200px] max-h-32",
    large: "max-w-xs max-h-40",
  }

  return (
    <>
      <div
        className={cn(
          "relative rounded-md border overflow-hidden bg-muted cursor-pointer hover:opacity-90 transition-opacity",
          sizeClasses[size],
          className
        )}
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setIsOpen(true)
          }
        }}
        aria-label="Click to view full size image"
      >
        <div className="relative aspect-video w-full h-full min-h-[60px]">
          <Image
            src={url}
            alt={alt}
            fill
            className="object-cover"
            unoptimized
            loader={({ src }) => src}
          />
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-[95vw] p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>{alt}</DialogTitle>
          </DialogHeader>
          <div className="relative w-full aspect-video max-h-[85vh] bg-muted">
            <Image
              src={url}
              alt={alt}
              fill
              className="object-contain"
              unoptimized
              loader={({ src }) => src}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

