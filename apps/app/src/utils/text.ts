export function formatTextWithLineBreaks(text: string, maxLineLength: number) {
  if (maxLineLength <= 0) return text
  if (text.length <= maxLineLength) return text

  const lines: string[] = []
  let start = 0

  while (start < text.length) {
    const limit = start + maxLineLength
    if (limit >= text.length) {
      lines.push(text.slice(start))
      break
    }

    let breakpoint = text.lastIndexOf(" ", limit)
    if (breakpoint <= start) {
      breakpoint = limit
    }

    lines.push(text.slice(start, breakpoint))
    start = breakpoint
    if (text[start] === " ") {
      start += 1
    }
  }

  return lines.join("\n")
}

