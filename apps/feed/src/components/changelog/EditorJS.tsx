"use client"

import { useEffect, useRef, useState } from "react"
import EditorJS, { OutputData } from "@editorjs/editorjs"
import Header from "@editorjs/header"
import List from "@editorjs/list"
import Paragraph from "@editorjs/paragraph"
import Quote from "@editorjs/quote"
import Code from "@editorjs/code"
import ImageTool from "@editorjs/image"
import LinkTool from "@editorjs/link"
import Delimiter from "@editorjs/delimiter"
import Table from "@editorjs/table"

interface EditorJSProps {
  data?: OutputData
  onChange?: (data: OutputData) => void
  placeholder?: string
  readOnly?: boolean
}

export default function EditorJSComponent({
  data,
  onChange,
  placeholder = "Start writing your changelog...",
  readOnly = false,
}: EditorJSProps) {
  const editorRef = useRef<EditorJS | null>(null)
  const holderRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!holderRef.current || editorRef.current) return

    const editor = new EditorJS({
      holder: holderRef.current,
      placeholder,
      readOnly,
      data: data || {
        time: Date.now(),
        blocks: [],
      },
      onChange: async () => {
        if (onChange && editorRef.current) {
          const outputData = await editorRef.current.save()
          onChange(outputData)
        }
      },
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: "Enter a heading",
            levels: [2, 3, 4],
            defaultLevel: 2,
          },
          shortcut: "CMD+SHIFT+H",
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
          config: {
            placeholder,
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
          shortcut: "CMD+SHIFT+L",
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
          shortcut: "CMD+SHIFT+Q",
        },
        code: {
          class: Code,
          config: {
            placeholder: "Enter code",
          },
          shortcut: "CMD+SHIFT+C",
        },
        delimiter: {
          class: Delimiter,
          shortcut: "CMD+SHIFT+D",
        },
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        },
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file: File) {
                // TODO: Implement image upload to your storage
                return {
                  success: 1,
                  file: {
                    url: URL.createObjectURL(file),
                  },
                }
              },
              async uploadByUrl(url: string) {
                return {
                  success: 1,
                  file: {
                    url,
                  },
                }
              },
            },
          },
        },
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: "/api/link", // TODO: Implement link metadata fetching
          },
        },
      },
      onReady: () => {
        setIsReady(true)
      },
    })

    editorRef.current = editor

    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy()
        editorRef.current = null
      }
    }
  }, [])

  // Update editor data when prop changes
  useEffect(() => {
    if (isReady && editorRef.current && data) {
      editorRef.current.render(data).catch((error) => {
        console.error("EditorJS render error:", error)
      })
    }
  }, [data, isReady])

  return (
    <div className="editor-wrapper">
      <div
        ref={holderRef}
        id="editorjs"
        className="prose prose-lg prose-slate dark:prose-invert max-w-none min-h-[500px] focus:outline-none"
      />
      <style jsx global>{`
        .codex-editor__redactor {
          padding-bottom: 150px !important;
        }

        .ce-block__content,
        .ce-toolbar__content {
          max-width: 100%;
          padding: 0 !important;
        }

        .ce-toolbar__actions {
          right: 0;
        }

        .ce-toolbar__plus {
          color: hsl(var(--primary));
          left: -40px;
        }

        .ce-toolbar__plus:hover {
          background-color: hsl(var(--accent));
        }

        .ce-inline-toolbar {
          background-color: hsl(var(--popover));
          border: 1px solid hsl(var(--border));
          box-shadow: 0 4px 12px -2px rgb(0 0 0 / 0.2);
          border-radius: 8px;
        }

        .ce-conversion-toolbar {
          background-color: hsl(var(--popover));
          border: 1px solid hsl(var(--border));
          border-radius: 8px;
        }

        .ce-settings {
          background-color: hsl(var(--popover));
          border: 1px solid hsl(var(--border));
          border-radius: 8px;
        }

        .ce-settings__button,
        .ce-inline-tool {
          color: hsl(var(--foreground));
        }

        .ce-settings__button:hover,
        .ce-inline-tool:hover {
          background-color: hsl(var(--accent));
        }

        .ce-paragraph {
          padding: 0.4rem 0;
          line-height: 1.75;
          font-size: 1.125rem;
          color: hsl(var(--foreground));
        }

        .ce-header {
          padding: 0.8rem 0;
          font-weight: 700;
          line-height: 1.3;
        }

        .ce-header[contentEditable="true"][data-placeholder]:empty::before {
          color: hsl(var(--muted-foreground));
          opacity: 0.5;
        }

        .ce-paragraph[contentEditable="true"][data-placeholder]:empty::before {
          color: hsl(var(--muted-foreground));
          opacity: 0.5;
        }

        .ce-code__textarea {
          background-color: hsl(var(--muted));
          border: 1px solid hsl(var(--border));
          color: hsl(var(--foreground));
          font-family: "Menlo", "Monaco", "Courier New", monospace;
          min-height: 200px;
          border-radius: 6px;
          padding: 1rem;
        }

        .ce-quote {
          border-left: 3px solid hsl(var(--primary));
          padding-left: 1.5rem;
          margin: 1.5rem 0;
          font-style: italic;
          font-size: 1.125rem;
        }

        .cdx-list {
          padding-left: 1.5rem;
        }

        .cdx-block {
          padding: 0.3rem 0;
        }

        .ce-delimiter {
          text-align: center;
          padding: 2rem 0;
        }

        .ce-delimiter:before {
          content: "***";
          color: hsl(var(--muted-foreground));
          font-size: 1.5rem;
          letter-spacing: 0.5rem;
        }

        .tc-table {
          border-collapse: collapse;
          width: 100%;
          margin: 1.5rem 0;
        }

        .tc-table__cell {
          border: 1px solid hsl(var(--border));
          padding: 0.75rem;
        }

        .image-tool__image-picture {
          border-radius: 8px;
          overflow: hidden;
          margin: 1.5rem 0;
        }

        .link-tool__content {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid hsl(var(--border));
          border-radius: 8px;
          background-color: hsl(var(--card));
          text-decoration: none;
          margin: 1rem 0;
          transition: all 0.2s;
        }

        .link-tool__content:hover {
          background-color: hsl(var(--accent));
          border-color: hsl(var(--primary));
        }

        /* Hide the settings button for a cleaner look */
        .ce-toolbar__settings-btn {
          opacity: 0.4;
          transition: opacity 0.2s;
        }

        .ce-block:hover .ce-toolbar__settings-btn {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}


