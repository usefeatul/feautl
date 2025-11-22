"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@feedgot/ui/components/dialog"

export default function PostModal({ open, onOpenChange, title, content, meta }: { open: boolean; onOpenChange: (o: boolean) => void; title: string; content?: string | null; meta?: string }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {meta ? <DialogDescription>{meta}</DialogDescription> : null}
        </DialogHeader>
        {content ? <div className="text-sm leading-relaxed whitespace-pre-wrap">{content}</div> : null}
      </DialogContent>
    </Dialog>
  )
}