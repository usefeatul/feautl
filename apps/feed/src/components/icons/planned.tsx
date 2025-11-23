import React from 'react'

interface PlannedIconProps {
  className?: string
  size?: number
  color?: string
}

export const PlannedIcon: React.FC<PlannedIconProps> = ({ className = '', size = 18, color = '#f59e0b' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ color }}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  )
}

export default PlannedIcon
