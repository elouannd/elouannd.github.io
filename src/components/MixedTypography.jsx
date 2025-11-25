import React from 'react'

export default function MixedTypography({ text, className = '' }) {
  const chars = text.split('')

  return (
    <span className={className}>
      {chars.map((char, index) => {
        // Alternate between sans-serif and serif
        const isSans = index % 2 === 0
        // Add subtle vertical wave effect
        const yOffset = Math.sin(index) * 2

        return (
          <span
            key={index}
            className={`inline-block ${isSans ? 'font-sans font-black' : 'font-serif italic font-bold'}`}
            style={{
              transform: `translateY(${yOffset}px)`,
            }}
          >
            {char}
          </span>
        )
      })}
    </span>
  )
}
