import type { CommandItem } from "./types"

export const dividerCommand: CommandItem = {
  id: "divider",
  title: "Divider",
  description: "Visual divider line",
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  ),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setHorizontalRule().run()
  },
}


