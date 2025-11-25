import React from 'react'
import { useNavigate } from 'react-router-dom'
import BrandCard from './BrandCard'
import BrandButton from './BrandButton'
import SEO from './SEO'

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <>
      <SEO
        title="Elouann - About"
        description="Learn about Elouann, creator of interactive web applications and audio tools. Passionate about web development, audio engineering, and creative coding."
        keywords="about Elouann, web developer, audio engineer, interactive applications, creative developer"
        canonicalPath="/about"
      />
      <div className="min-h-screen flex items-center justify-center p-8 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10 pattern-grid opacity-40" />

        {/* Playful floating shapes */}
        <div className="absolute top-20 left-10 w-8 h-8 border-4 border-black bg-brand-orange animate-float" />
        <div className="absolute bottom-32 right-16 w-6 h-6 border-4 border-black bg-brand-teal rotate-45 animate-float" style={{ animationDelay: '1.5s' }} />

        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card - Playful "E" placeholder */}
          <BrandCard
            colorAccent="orange"
            cornerAccent={true}
            glassVariant="thick"
            className="lg:col-span-1 flex flex-col items-center text-center"
          >
            {/* Giant "E" with gradient */}
            <div className="w-full aspect-square border-4 border-black bg-gradient-to-br from-brand-orange/20 via-brand-beige to-brand-teal/20 mb-6 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl font-black text-black/10 hover:text-black/20 transition-colors duration-500 hover:scale-110 hover:rotate-12 cursor-default inline-block">
                  E
                </span>
              </div>
              {/* Tiny corner accent inside the E */}
              <div className="absolute top-2 right-2 w-3 h-3 bg-brand-teal border-2 border-black" />
            </div>

            <h2 className="text-2xl font-black uppercase mb-2">Elouann</h2>
            <p className="font-serif italic text-sm text-black/60">Developer & Creator</p>

            {/* Fun little divider */}
            <div className="mt-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-orange border-2 border-black rotate-45" />
              <div className="w-2 h-2 bg-brand-teal border-2 border-black" />
              <div className="w-2 h-2 bg-brand-orange border-2 border-black rotate-45" />
            </div>
          </BrandCard>

          {/* Bio Card - Enhanced with playful borders */}
          <BrandCard
            colorAccent="teal"
            glassVariant="thick"
            shadowVariant="layered"
            className="lg:col-span-2"
          >
            <h1 className="text-5xl font-black uppercase mb-6 pb-4 border-b-4 border-black/10 relative">
              About
              {/* Tiny decorative square */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-teal border-2 border-black" />
            </h1>

            {/* Enhanced text blocks with alternating styles and playful accents */}
            <div className="space-y-6 mb-8">
              <div className="relative">
                <p className="text-lg font-serif italic bg-white/40 border-l-4 border-brand-orange p-4 hover:bg-white/60 transition-colors">
                  This is where your bio goes.
                </p>
                {/* Corner decoration */}
                <div className="absolute -left-2 -top-2 w-3 h-3 bg-brand-orange border-2 border-black" />
              </div>

              <div className="relative">
                <p className="text-lg p-4 bg-white/20 hover:bg-white/30 transition-colors">
                  Talk about who you are, what you do, what drives you.
                </p>
              </div>

              <div className="relative">
                <p className="text-lg font-serif italic bg-white/40 border-l-4 border-brand-teal p-4 hover:bg-white/60 transition-colors">
                  Keep it concise. Keep it confident.
                </p>
                {/* Corner decoration */}
                <div className="absolute -left-2 -bottom-2 w-3 h-3 bg-brand-teal border-2 border-black rotate-45" />
              </div>
            </div>

            <BrandButton
              onClick={() => navigate('/')}
              variant="orange"
              size="md"
              className="group"
            >
              <span className="inline-block group-hover:-translate-x-1 transition-transform">←</span> Back to Launchpad
            </BrandButton>
          </BrandCard>
        </div>
      </div>
    </>
  )
}
