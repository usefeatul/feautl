"use client"

import { OutputData } from "@editorjs/editorjs"

interface ChangelogRendererProps {
  data: OutputData
  className?: string
}

export default function ChangelogRenderer({ data, className = "" }: ChangelogRendererProps) {
  if (!data || !data.blocks) {
    return null
  }

  return (
    <div className={`changelog-content prose prose-slate dark:prose-invert max-w-none ${className}`}>
      {data.blocks.map((block, index) => {
        switch (block.type) {
          case "header":
            return renderHeader(block, index)
          case "paragraph":
            return renderParagraph(block, index)
          case "list":
            return renderList(block, index)
          case "quote":
            return renderQuote(block, index)
          case "code":
            return renderCode(block, index)
          case "delimiter":
            return renderDelimiter(index)
          case "table":
            return renderTable(block, index)
          case "image":
            return renderImage(block, index)
          case "linkTool":
            return renderLink(block, index)
          default:
            return null
        }
      })}
    </div>
  )
}

function renderHeader(block: any, index: number) {
  const level = block.data.level || 2
  const text = block.data.text || ""
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <Tag key={index} className="font-semibold mb-3 mt-6">
      <span dangerouslySetInnerHTML={{ __html: text }} />
    </Tag>
  )
}

function renderParagraph(block: any, index: number) {
  const text = block.data.text || ""
  if (!text) return null

  return (
    <p key={index} className="mb-4 leading-relaxed">
      <span dangerouslySetInnerHTML={{ __html: text }} />
    </p>
  )
}

function renderList(block: any, index: number) {
  const style = block.data.style || "unordered"
  const items = block.data.items || []

  if (items.length === 0) return null

  if (style === "ordered") {
    return (
      <ol key={index} className="list-decimal pl-6 mb-4 space-y-2">
        {items.map((item: string, i: number) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ol>
    )
  }

  return (
    <ul key={index} className="list-disc pl-6 mb-4 space-y-2">
      {items.map((item: string, i: number) => (
        <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
      ))}
    </ul>
  )
}

function renderQuote(block: any, index: number) {
  const text = block.data.text || ""
  const caption = block.data.caption || ""

  return (
    <blockquote key={index} className="border-l-4 border-primary pl-4 py-2 my-6 italic">
      <div dangerouslySetInnerHTML={{ __html: text }} />
      {caption && (
        <cite className="block text-sm text-muted-foreground mt-2 not-italic">
          — {caption}
        </cite>
      )}
    </blockquote>
  )
}

function renderCode(block: any, index: number) {
  const code = block.data.code || ""

  return (
    <pre key={index} className="bg-muted p-4 rounded-lg overflow-x-auto mb-4 border border-border">
      <code className="text-sm font-mono">{code}</code>
    </pre>
  )
}

function renderDelimiter(index: number) {
  return (
    <div key={index} className="text-center py-6 text-muted-foreground">
      ***
    </div>
  )
}

function renderTable(block: any, index: number) {
  const content = block.data.content || []
  const withHeadings = block.data.withHeadings || false

  if (content.length === 0) return null

  return (
    <div key={index} className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse border border-border">
        {withHeadings && content.length > 0 && (
          <thead>
            <tr className="bg-muted">
              {content[0].map((cell: string, i: number) => (
                <th
                  key={i}
                  className="border border-border px-4 py-2 text-left font-semibold"
                  dangerouslySetInnerHTML={{ __html: cell }}
                />
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {content.slice(withHeadings ? 1 : 0).map((row: string[], rowIndex: number) => (
            <tr key={rowIndex} className="hover:bg-accent/50">
              {row.map((cell: string, cellIndex: number) => (
                <td
                  key={cellIndex}
                  className="border border-border px-4 py-2"
                  dangerouslySetInnerHTML={{ __html: cell }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function renderImage(block: any, index: number) {
  const url = block.data.file?.url || ""
  const caption = block.data.caption || ""
  const stretched = block.data.stretched || false
  const withBorder = block.data.withBorder || false
  const withBackground = block.data.withBackground || false

  if (!url) return null

  return (
    <figure key={index} className="my-6">
      <img
        src={url}
        alt={caption || "Image"}
        className={`
          rounded-lg
          ${stretched ? "w-full" : "max-w-full"}
          ${withBorder ? "border border-border" : ""}
          ${withBackground ? "bg-muted p-4" : ""}
        `}
      />
      {caption && (
        <figcaption className="text-sm text-muted-foreground text-center mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function renderLink(block: any, index: number) {
  const link = block.data.link || ""
  const meta = block.data.meta || {}

  if (!link) return null

  return (
    <a
      key={index}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 p-4 border border-border rounded-lg bg-card hover:bg-accent transition-colors my-4 no-underline"
    >
      {meta.image?.url && (
        <img
          src={meta.image.url}
          alt={meta.title || "Link preview"}
          className="w-20 h-20 object-cover rounded flex-shrink-0"
        />
      )}
      <div className="flex-1 min-w-0">
        {meta.title && (
          <div className="font-medium text-foreground mb-1 truncate">{meta.title}</div>
        )}
        {meta.description && (
          <div className="text-sm text-muted-foreground line-clamp-2">{meta.description}</div>
        )}
        <div className="text-xs text-muted-foreground mt-1 truncate">{link}</div>
      </div>
    </a>
  )
}


