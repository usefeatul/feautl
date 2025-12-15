import type { CommandItem } from "./types"

export const heading2Command: CommandItem = {
  id: "heading2",
  title: "Heading 2",
  description: "Medium section heading",
  icon: <span className="font-bold">H2</span>,
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run()
  },
}


