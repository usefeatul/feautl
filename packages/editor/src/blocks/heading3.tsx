import type { CommandItem } from "./types"

export const heading3Command: CommandItem = {
  id: "heading3",
  title: "Heading 3",
  description: "Small section heading",
  icon: <span className="font-bold">H3</span>,
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run()
  },
}

