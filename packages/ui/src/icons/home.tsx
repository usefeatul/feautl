import React from 'react'

interface HomeIconProps {
  className?: string
  size?: number
}

export const HomeIcon: React.FC<HomeIconProps> = ({ className = '', size = 18 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
    >
      <polyline points="2 13 16 2 30 13" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></polyline>
      <polyline points="13 29 13 20 19 20 19 29" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2"></polyline>
      <path d="m5,16v10c0,1.657,1.343,3,3,3h16c1.657,0,3-1.343,3-3v-10" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></path>
    </svg>
  )
}

export default HomeIcon
