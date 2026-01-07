import React from 'react'

interface NoltIconProps {
  className?: string
  size?: number
}

export const NoltIcon: React.FC<NoltIconProps> = ({ className = '', size = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      fill="currentColor"
    >
      <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
    </svg>
  )
}

export default NoltIcon
