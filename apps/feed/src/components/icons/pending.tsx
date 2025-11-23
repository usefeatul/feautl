import React from 'react'

interface PendingIconProps {
  className?: string
  size?: number
  color?: string
}

export const PendingIcon: React.FC<PendingIconProps> = ({ className = '', size = 18, color = '#9ca3af' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ color }}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  )
}

export default PendingIcon
