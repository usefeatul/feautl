import React from 'react'

interface IntegrationIconProps {
  className?: string
  size?: number
}

export const IntegrationIcon: React.FC<IntegrationIconProps> = ({ className = '', size = 24 }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 18 18"
      className={className}
    >
      <path 
        d="M14.25,3h-5.75c-.414,0-.75,.336-.75,.75,0,.551-.449,1-1,1s-1-.449-1-1c0-.414-.336-.75-.75-.75h-1.25c-1.517,0-2.75,1.233-2.75,2.75v6.5c0,1.517,1.233,2.75,2.75,2.75h1.25c.414,0,.75-.336,.75-.75,0-.551,.449-1,1-1s1,.449,1,1c0,.414,.336,.75,.75,.75h5.75c1.517,0,2.75-1.233,2.75-2.75V5.75c0-1.517-1.233-2.75-2.75-2.75ZM6.75,11.188c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75,.75,.336,.75,.75-.336,.75-.75,.75Zm0-2.875c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75,.75,.336,.75,.75-.336,.75-.75,.75Z" 
        fill="currentColor"
      />
    </svg>
  )
}

export default IntegrationIcon
