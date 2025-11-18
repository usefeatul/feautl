import React from 'react'

type ShieldIconProps = React.SVGProps<SVGSVGElement> & { opacity?: number }

export function ShieldIcon({ width = 18, height = 18, opacity = 0.4, ...rest }: ShieldIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 18 18" {...rest}>
      <title>shield</title>
      <path
        d="M9 1l6 3v5c0 4-3.5 7-6 8-2.5-1-6-4-6-8V4l6-3z"
        fill="currentColor"
        fillOpacity={opacity}
      />
    </svg>
  )
}

export default ShieldIcon