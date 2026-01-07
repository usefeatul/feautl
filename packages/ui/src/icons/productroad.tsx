import React from 'react'

interface ProductRoadIconProps {
  className?: string
  size?: number
}

export const ProductRoadIcon: React.FC<ProductRoadIconProps> = ({ className = '', size = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      fill="currentColor"
    >
      <path d="M3 3h18v4H3V3zm0 7h12v4H3v-4zm0 7h18v4H3v-4z" />
    </svg>
  )
}

export default ProductRoadIcon
