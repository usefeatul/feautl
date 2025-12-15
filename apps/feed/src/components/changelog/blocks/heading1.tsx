import type { CommandItem } from "./types"

export const heading1Command: CommandItem = {
  id: "heading1",
  title: "Heading 1",
  description: "Large section heading",
  icon: <span className="font-bold">H1</span>,
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run()
  },
}


