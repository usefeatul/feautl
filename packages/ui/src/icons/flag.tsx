import React from "react"

export function FlagIcon(props: React.SVGProps<SVGSVGElement>) {
  const { width = 24, height = 24, ...rest } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      {...rest}
    >
      <g fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M1.9353 6.5L11.2101 22.5" strokeLinecap="square" />
        <path d="M22.4055 9.66022L17.5 1.5L16.3083 2.44589C15.0039 3.48126 13.3996 4.06718 11.735 4.11624C9.88131 4.17087 8.10922 4.89074 6.7426 6.14428L6.59652 6.27828L11.5965 14.9385L11.9055 14.6551C13.1671 13.4979 14.8029 12.8334 16.514 12.783C18.3047 12.7302 20.01 12.0051 21.2902 10.7519L22.4055 9.66022Z" />
      </g>
    </svg>
  )
}

export default FlagIcon

