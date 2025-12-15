import type { CommandItem } from "./types"
import { heading1Command } from "./heading1"
import { heading2Command } from "./heading2"
import { heading3Command } from "./heading3"
import { bulletListCommand } from "./bullet-list"
import { numberedListCommand } from "./numbered-list"
import { taskListCommand } from "./task-list"
import { quoteCommand } from "./quote"
import { codeBlockCommand } from "./code-block"
import { imageCommand } from "./image"
import { dividerCommand } from "./divider"

export const allCommands: CommandItem[] = [
  heading1Command,
  heading2Command,
  heading3Command,
  bulletListCommand,
  numberedListCommand,
  taskListCommand,
  quoteCommand,
  codeBlockCommand,
  imageCommand,
  dividerCommand,
]

export * from "./types"

