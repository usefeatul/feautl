import React from 'react'

type ContainerProps = {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  withNavbarOffset?: boolean
}

export function Container({
  children,
  className = '',
  as: Component = 'div',
  withNavbarOffset = false,
}: ContainerProps) {
  const base = 'mx-auto max-w-7xl px-12 sm:px-16 lg:px-20 xl:px-24'
  const offset = withNavbarOffset ? ' pt-16' : ''

  return (
    <Component className={`${base}${offset} ${className}`}>{children}</Component>
  )
}