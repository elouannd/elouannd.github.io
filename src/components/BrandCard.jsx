import React from 'react'

export default function BrandCard({
  children,
  className = '',
  colorAccent = 'orange',
  onClick,
  hoverable = false
}) {
  const accentColors = {
    orange: 'from-brand-orange/10',
    teal: 'from-brand-teal/10',
    none: ''
  }

  const baseClasses = `
    glass glass-noise
    border-4 border-black
    shadow-brutal
    rounded-none
    p-8
    bg-gradient-to-br ${accentColors[colorAccent]} to-transparent
    transition-all duration-200
  `

  const interactiveClasses = hoverable ? `
    cursor-pointer
    hover:shadow-[8px_8px_0px_0px_#000]
    hover:-translate-x-0.5
    hover:-translate-y-0.5
    active:shadow-brutal-pressed
    active:translate-x-1
    active:translate-y-1
  ` : ''

  return (
    <div
      className={`${baseClasses} ${interactiveClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
