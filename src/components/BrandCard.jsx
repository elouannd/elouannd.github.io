import React from 'react'

export default function BrandCard({
  children,
  className = '',
  colorAccent = 'orange',
  onClick,
  hoverable = false,
  cornerAccent = false,
  glassVariant = 'default',
  shadowVariant = 'default',
}) {
  const accentColors = {
    orange: 'from-brand-orange/10',
    teal: 'from-brand-teal/10',
    none: ''
  }

  const glassClasses = {
    default: 'glass glass-noise',
    thick: 'glass-thick glass-noise',
    light: 'glass-light glass-noise',
    'tinted-orange': 'glass-tinted-orange glass-noise',
    'tinted-teal': 'glass-tinted-teal glass-noise',
  }

  const shadowClasses = {
    default: 'shadow-brutal',
    lg: 'shadow-brutal-lg',
    xl: 'shadow-brutal-xl',
    layered: 'shadow-brutal-layered',
    colored: colorAccent === 'orange' ? 'shadow-brutal-colored-orange' : 'shadow-brutal-colored-teal',
  }

  const baseClasses = `
    ${glassClasses[glassVariant]}
    border-4 border-black
    ${shadowClasses[shadowVariant]}
    rounded-none
    p-8
    bg-gradient-to-br ${accentColors[colorAccent]} to-transparent
    transition-all duration-200
    relative
  `

  const interactiveClasses = hoverable ? `
    cursor-pointer
    hover:shadow-brutal-lg
    hover:-translate-x-1
    hover:-translate-y-1
    hover:rotate-1
    active:shadow-brutal-pressed
    active:translate-x-0.5
    active:translate-y-0.5
    active:rotate-0
  ` : ''

  return (
    <div
      className={`${baseClasses} ${interactiveClasses} ${className}`}
      onClick={onClick}
    >
      {cornerAccent && (
        <>
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-brand-orange border-2 border-black z-10" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-brand-teal border-2 border-black z-10" />
        </>
      )}
      {children}
    </div>
  )
}
