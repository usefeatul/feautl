import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSanitize from "rehype-sanitize"

type Props = {
  markdown: string
}

export default function LegalMarkdown({ markdown }: Props) {
  // Cast plugin lists to avoid TS generics mismatch from unified/remark types across dependencies.
  const remarkPlugins = [remarkGfm] as unknown as any[]
  const rehypePlugins = [rehypeSanitize] as unknown as any[]
  return (
    <ReactMarkdown
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
      components={{
        a: ({ href, children }) => {
          const url = typeof href === "string" ? href : ""
          const isExternal = /^https?:\/\//.test(url)
          return (
            <a
              href={url}
              className="text-primary"
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer nofollow" : undefined}
            >
              {children}
            </a>
          )
        },
        img: ({ src, alt }) => {
          const url = typeof src === "string" ? src : ""
          return (
            <img
              src={url}
              alt={(typeof alt === "string" ? alt : undefined) ?? ""}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          )
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  )
}