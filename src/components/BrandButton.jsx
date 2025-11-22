import React from 'react'

export default function BrandButton({
  children,
  onClick,
  className = '',
  variant = 'orange',
  type = 'button'
}) {
  const variants = {
    orange: 'bg-brand-orange/20 hover:bg-brand-orange/30',
    teal: 'bg-brand-teal/20 hover:bg-brand-teal/30',
    glass: 'glass'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        ${variants[variant]}
        border-4 border-black
        shadow-brutal
        px-6 py-3
        font-bold uppercase tracking-wide
        text-black
        transition-all duration-150
        hover:shadow-[8px_8px_0px_0px_#000]
        hover:-translate-x-0.5
        hover:-translate-y-0.5
        active:shadow-brutal-pressed
        active:translate-x-1
        active:translate-y-1
        ${className}
      `}
    >
      {children}
    </button>
  )
}
