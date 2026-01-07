import React from 'react'

interface CannyIconProps {
  className?: string
  size?: number
}

export const CannyIcon: React.FC<CannyIconProps> = ({ className = '', size = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      fill="currentColor"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.6c4.64 0 8.4 3.76 8.4 8.4 0 4.64-3.76 8.4-8.4 8.4-4.64 0-8.4-3.76-8.4-8.4 0-4.64 3.76-8.4 8.4-8.4zm0 2.4a6 6 0 100 12 6 6 0 000-12z" />
    </svg>
  )
}

export default CannyIcon
