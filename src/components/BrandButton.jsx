import React from 'react'

export default function BrandButton({
  children,
  onClick,
  className = '',
  variant = 'orange',
  type = 'button',
  size = 'md',
  fullWidth = false,
}) {
  const variants = {
    orange: 'bg-brand-orange/20 hover:bg-brand-orange/30',
    teal: 'bg-brand-teal/20 hover:bg-brand-teal/30',
    glass: 'glass'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        ${variants[variant]}
        border-4 border-black
        shadow-brutal
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        font-bold uppercase tracking-wide
        text-black
        transition-all duration-150
        hover:shadow-brutal-lg
        hover:-translate-x-1
        hover:-translate-y-1
        hover:scale-[1.02]
        hover:-rotate-1
        active:shadow-brutal-pressed
        active:translate-x-0.5
        active:translate-y-0.5
        active:scale-[0.98]
        active:rotate-0
        ${className}
      `}
    >
      {children}
    </button>
  )
}
