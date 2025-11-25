import React from 'react'

interface TagIconProps {
  className?: string
  size?: number
}

export const TagIcon: React.FC<TagIconProps> = ({ className = '', size = 18 }) => {
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
      <path
        d="m2.25,4.25h5.586c.265,0,.52.105.707.293l5.1065,5.1065c.781.781.781,2.047,0,2.828l-3.172,3.172c-.781.781-2.047.781-2.828,0l-5.1065-5.1065c-.188-.188-.293-.442-.293-.707v-5.586Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      ></path>
      <path
        d="m3.75,1.25h5.586c.265,0,.52.105.707.293l5.7705,5.7705"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      ></path>
      <circle cx="5.75" cy="7.75" r="1.25" fill="currentColor"></circle>
    </svg>
  )
}

export default TagIcon
