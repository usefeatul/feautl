import React from "react"

export function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
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
        <path d="m18.73 10h.02s-.42 10.083-.42 10.083c-.045 1.071-.926 1.917-1.998 1.917H7.668c-1.072 0-1.954-.845-1.998-1.917l-.42-10.083h.02" strokeLinecap="square" strokeMiterlimit={10} />
        <line x1={3} y1={6} x2={21} y2={6} strokeLinecap="square" strokeMiterlimit={10} />
        <path d="M9 6V2h6v4" strokeMiterlimit={10} />
      </g>
    </svg>
  )
}

export default TrashIcon

