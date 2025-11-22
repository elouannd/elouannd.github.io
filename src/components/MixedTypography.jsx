import React from 'react'

export default function MixedTypography({ text, className = '' }) {
  const chars = text.split('')

  return (
    <span className={className}>
      {chars.map((char, index) => {
        // Alternate between sans-serif and serif
        const isSans = index % 2 === 0
        return (
          <span
            key={index}
            className={isSans ? 'font-sans font-black' : 'font-serif italic font-bold'}
          >
            {char}
          </span>
        )
      })}
    </span>
  )
}
