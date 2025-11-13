import React from "react"

export function PointerDownIcon(props: React.SVGProps<SVGSVGElement>) {
  const { width = 18, height = 18, ...rest } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18 18"
      {...rest}
    >
      <title>pointer-down</title>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="9" r="7" strokeOpacity={0.35} strokeWidth={1.5} />
        <polyline points="6.5 8 9 10.5 11.5 8" strokeWidth={1.6} />
      </g>
    </svg>
  )
}

export default PointerDownIcon