"use client"

import { useCallback, useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react"
import { useEditor, EditorContent, type Editor, type JSONContent, ReactRenderer } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Link from "@tiptap/extension-link"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"
import Underline from "@tiptap/extension-underline"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import Image from "@tiptap/extension-image"
import { Extension } from "@tiptap/core"
import Suggestion, { type SuggestionProps, type SuggestionKeyDownProps } from "@tiptap/suggestion"
import { common, createLowlight } from "lowlight"
import { cn } from "@oreilla/ui/lib/utils"
import tippy, { type Instance as TippyInstance } from "tippy.js"
import { allCommands, type CommandItem } from "./blocks"

const lowlight = createLowlight(common)

const getSuggestionItems = (): CommandItem[] => allCommands

// Slash command menu component
interface CommandListProps {
  items: CommandItem[]
  command: (item: CommandItem) => void
}

interface CommandListRef {
  onKeyDown: (props: SuggestionKeyDownProps) => boolean
}

const CommandList = forwardRef<CommandListRef, CommandListProps>(({ items, command }, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = (index: number) => {
    const item = items[index]
    if (item) command(item)
  }

  useEffect(() => {
    setSelectedIndex(0)
  }, [items])

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === "ArrowUp") {
        setSelectedIndex((selectedIndex + items.length - 1) % items.length)
        return true
      }
      if (event.key === "ArrowDown") {
        setSelectedIndex((selectedIndex + 1) % items.length)
        return true
      }
      if (event.key === "Enter") {
        selectItem(selectedIndex)
        return true
      }
      return false
    },
  }))

  if (items.length === 0) {
    return (
      <div className="bg-popover border border-border rounded-lg shadow-lg p-2 text-sm text-muted-foreground">
        No results
      </div>
    )
  }

  return (
    <div className="bg-popover border border-border rounded-lg shadow-lg overflow-hidden min-w-[280px] max-h-[320px] overflow-y-auto">
      {items.map((item, index) => (
        <button
          key={item.title}
          onClick={() => selectItem(index)}
          onMouseEnter={() => setSelectedIndex(index)}
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2.5 text-left transition-colors",
            index === selectedIndex && "bg-accent"
          )}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-muted text-muted-foreground">
            {item.icon}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{item.title}</span>
            <span className="text-xs text-muted-foreground">{item.description}</span>
          </div>
        </button>
      ))}
    </div>
  )
})

CommandList.displayName = "CommandList"

// Slash commands extension
const SlashCommands = Extension.create({
  name: "slashCommands",

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        char: "/",
        items: ({ query }) => {
          return getSuggestionItems().filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
          )
        },
        render: () => {
          let component: ReactRenderer<CommandListRef> | null = null
          let popup: TippyInstance[] | null = null

          return {
            onStart: (props) => {
              component = new ReactRenderer(CommandList, {
                props,
                editor: props.editor,
              })

              if (!props.clientRect) return

              popup = tippy("body", {
                getReferenceClientRect: props.clientRect as () => DOMRect,
                appendTo: () => document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start",
              })
            },
            onUpdate(props) {
              component?.updateProps(props)
              if (!props.clientRect) return
              popup?.[0]?.setProps({
                getReferenceClientRect: props.clientRect as () => DOMRect,
              })
            },
            onKeyDown(props) {
              if (props.event.key === "Escape") {
                popup?.[0]?.hide()
                return true
              }
              return component?.ref?.onKeyDown(props) ?? false
            },
            onExit() {
              popup?.[0]?.destroy()
              component?.destroy()
            },
          }
        },
        command: ({ editor, range, props }) => {
          props.command({ editor, range })
        },
      }),
    ]
  },
})

// Main editor component
export interface NotionEditorProps {
  initialContent?: JSONContent
  onChange?: (content: JSONContent) => void
  className?: string
  placeholder?: string
  autofocus?: boolean
}

export interface NotionEditorRef {
  getContent: () => JSONContent
  setContent: (content: JSONContent) => void
  focus: () => void
  editor: Editor | null
}

export const NotionEditor = forwardRef<NotionEditorRef, NotionEditorProps>(
  ({ initialContent, onChange, className, placeholder = "Start writing, or press '/' for commands...", autofocus = false }, ref) => {
    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          heading: { levels: [1, 2, 3] },
          codeBlock: false,
        }),
        Placeholder.configure({
          placeholder: ({ node }) => {
            if (node.type.name === "heading") {
              return `Heading ${node.attrs.level}`
            }
            return placeholder
          },
          showOnlyWhenEditable: true,
          showOnlyCurrent: true,
        }),
        Link.configure({ openOnClick: false }),
        TaskList,
        TaskItem.configure({ nested: true }),
        Underline,
        CodeBlockLowlight.configure({ lowlight, defaultLanguage: "javascript" }),
        Image.configure({ HTMLAttributes: { class: "rounded-lg max-w-full" } }),
        SlashCommands,
      ],
      content: initialContent || { type: "doc", content: [{ type: "paragraph" }] },
      editorProps: {
        attributes: {
          class: cn(
            "prose prose-neutral dark:prose-invert max-w-none focus:outline-none min-h-[300px]",
            className
          ),
        },
      },
      autofocus,
      onUpdate: ({ editor }) => {
        onChange?.(editor.getJSON())
      },
    })

    useImperativeHandle(ref, () => ({
      getContent: () => editor?.getJSON() || { type: "doc", content: [] },
      setContent: (content) => editor?.commands.setContent(content),
      focus: () => editor?.commands.focus(),
      editor,
    }))

    return (
      <>
        <EditorContent editor={editor} />
        <style jsx global>{`
          .ProseMirror {
            min-height: 300px;
            outline: none;
          }
          .ProseMirror > * + * {
            margin-top: 0.75em;
          }
          .ProseMirror p.is-editor-empty:first-child::before {
            color: var(--muted-foreground);
            content: attr(data-placeholder);
            float: left;
            height: 0;
            pointer-events: none;
            opacity: 0.4;
          }
          .ProseMirror h1 {
            font-size: 2em;
            font-weight: 700;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
          }
          .ProseMirror h2 {
            font-size: 1.5em;
            font-weight: 600;
            margin-top: 1.25em;
            margin-bottom: 0.5em;
          }
          .ProseMirror h3 {
            font-size: 1.25em;
            font-weight: 600;
            margin-top: 1em;
            margin-bottom: 0.5em;
          }
          .ProseMirror ul,
          .ProseMirror ol {
            padding-left: 1.5em;
          }
          .ProseMirror blockquote {
            border-left: 3px solid var(--border);
            padding-left: 1em;
            color: var(--muted-foreground);
            font-style: italic;
          }
          .ProseMirror pre {
            background: #1e1e2e;
            border-radius: 0.5rem;
            padding: 1rem;
            overflow-x: auto;
          }
          .ProseMirror pre code {
            color: #cdd6f4;
            font-size: 0.875rem;
          }
          .ProseMirror code {
            background: var(--muted);
            padding: 0.125rem 0.375rem;
            border-radius: 0.25rem;
            font-size: 0.875em;
          }
          .ProseMirror img {
            max-width: 100%;
            border-radius: 0.5rem;
            margin: 1em 0;
          }
          .ProseMirror hr {
            border: none;
            border-top: 1px solid var(--border);
            margin: 2em 0;
          }
          .ProseMirror a {
            color: var(--primary);
            text-decoration: underline;
            text-underline-offset: 2px;
          }
          .ProseMirror ul[data-type="taskList"] {
            list-style: none;
            padding-left: 0;
          }
          .ProseMirror ul[data-type="taskList"] li {
            display: flex;
            align-items: flex-start;
            gap: 0.5rem;
          }
          .ProseMirror ul[data-type="taskList"] li > label {
            flex-shrink: 0;
            margin-top: 0.25rem;
          }
          .ProseMirror ul[data-type="taskList"] li > div {
            flex: 1;
          }
        `}</style>
      </>
    )
  }
)

NotionEditor.displayName = "NotionEditor"

