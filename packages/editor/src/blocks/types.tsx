import type { Editor } from "@tiptap/react"
import type { ReactNode } from "react"

export type CommandRange = { from: number; to: number }

export interface CommandItem {
  id: string
  title: string
  description: string
  icon: ReactNode
  command: (props: { editor: Editor; range: CommandRange }) => void
}

