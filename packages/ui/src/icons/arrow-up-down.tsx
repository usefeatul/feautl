import React from 'react'

interface ArrowUpDownIconProps {
  className?: string
  size?: number
}

export const ArrowUpDownIcon: React.FC<ArrowUpDownIconProps> = ({ className = '', size = 18 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={size}
      height={size}
      viewBox="0 0 18 18"
      className={className}
    >
      <polyline
        points="10.25 12.75 12.75 15.25 15.25 12.75"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      ></polyline>
      <line
        x1="12.75"
        y1="15.25"
        x2="12.75"
        y2="6.25"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      ></line>
      <line
        x1="2.75"
        y1="9.75"
        x2="9.25"
        y2="9.75"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      ></line>
      <line
        x1="2.75"
        y1="6.25"
        x2="9.25"
        y2="6.25"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      ></line>
      <line
        x1="2.75"
        y1="2.75"
        x2="12.75"
        y2="2.75"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      ></line>
    </svg>
  )
}

export default ArrowUpDownIcon
