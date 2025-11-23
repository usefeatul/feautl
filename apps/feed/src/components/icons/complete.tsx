import React from 'react'

interface CompleteIconProps {
  className?: string
  size?: number
  color?: string
}

export const CompleteIcon: React.FC<CompleteIconProps> = ({ className = '', size = 18, color = '#22c55e' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ color }}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export default CompleteIcon
