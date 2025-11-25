import React from 'react'
import { useNavigate } from 'react-router-dom'
import BrandCard from './BrandCard'
import BrandButton from './BrandButton'
import SEO from './SEO'

export default function ContactPage() {
  const navigate = useNavigate()

  return (
    <>
      <SEO
        title="Elouann - Contact"
        description="Get in touch with Elouann for collaboration, projects, or inquiries. Connect via email, GitHub, or social media."
        keywords="contact Elouann, hire developer, collaboration, web developer contact, get in touch"
        canonicalPath="/contact"
      />
      <div className="min-h-screen flex items-center justify-center p-8 relative">
        {/* Playful dotted background */}
        <div className="absolute inset-0 -z-10 pattern-dots opacity-50" />

        {/* Floating decorative elements */}
        <div className="absolute top-32 right-20 w-8 h-8 border-4 border-black bg-brand-teal rotate-12 animate-float" />
        <div className="absolute bottom-40 left-24 w-6 h-6 border-4 border-black bg-brand-orange animate-float" style={{ animationDelay: '2s' }} />

        <BrandCard className="max-w-3xl" colorAccent="teal" cornerAccent={true} glassVariant="thick" shadowVariant="layered">
          <h1 className="text-5xl font-black uppercase mb-6 pb-4 border-b-4 border-black/10 relative">
            Contact
            {/* Playful corner decoration */}
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-brand-teal border-2 border-black rotate-45" />
          </h1>

          <div className="space-y-6 mb-8">
            <p className="text-lg bg-white/30 border-l-4 border-brand-teal p-4 relative">
              Want to get in touch?
              {/* Tiny accent */}
              <div className="absolute -left-2 top-2 w-2 h-2 bg-brand-teal border-2 border-black" />
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email Card - EXTRA interactive */}
              <a href="mailto:your@email.com" className="block group">
                <div className="glass-thick border-4 border-black p-6 transition-all hover:-translate-y-1 hover:shadow-brutal-lg hover:rotate-1 relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-4 h-4 bg-brand-orange border-2 border-black rotate-45 group-hover:rotate-[405deg] transition-transform duration-500" />
                    <p className="font-bold uppercase tracking-wide text-sm">Email</p>
                  </div>
                  <p className="font-serif italic text-black/70 group-hover:text-black transition-colors">
                    your@email.com
                  </p>
                  {/* Animated underline */}
                  <div className="h-1 bg-brand-orange mt-3 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />

                  {/* Fun corner decoration that appears */}
                  <div className="absolute top-2 right-2 w-3 h-3 bg-brand-orange border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>

              {/* GitHub Card */}
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="block group">
                <div className="glass-thick border-4 border-black p-6 transition-all hover:-translate-y-1 hover:shadow-brutal-lg hover:-rotate-1 relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-4 h-4 bg-brand-teal border-2 border-black group-hover:scale-110 transition-transform" />
                    <p className="font-bold uppercase tracking-wide text-sm">GitHub</p>
                  </div>
                  <p className="font-serif italic text-black/70 group-hover:text-black transition-colors">
                    @yourusername
                  </p>
                  {/* Animated underline */}
                  <div className="h-1 bg-brand-teal mt-3 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />

                  {/* Fun corner decoration */}
                  <div className="absolute top-2 right-2 w-3 h-3 bg-brand-teal border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>

              {/* Twitter Card - Full width with GRADIENT underline! */}
              <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="block group md:col-span-2">
                <div className="glass-thick border-4 border-black p-6 transition-all hover:-translate-y-1 hover:shadow-brutal-lg hover:scale-[1.02] relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-4 h-4 bg-gradient-to-br from-brand-orange to-brand-teal border-2 border-black rounded-sm group-hover:rotate-180 transition-transform duration-500" />
                    <p className="font-bold uppercase tracking-wide text-sm">Twitter</p>
                  </div>
                  <p className="font-serif italic text-black/70 group-hover:text-black transition-colors">
                    @yourusername
                  </p>
                  {/* GRADIENT animated underline - fancy! */}
                  <div className="h-1 bg-gradient-to-r from-brand-orange via-brand-teal to-brand-orange mt-3 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />

                  {/* Multiple corner decorations for extra flair */}
                  <div className="absolute top-2 right-2 w-3 h-3 bg-brand-orange border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 bg-brand-teal border-2 border-black rotate-45 opacity-0 group-hover:opacity-100 transition-opacity delay-75" />
                </div>
              </a>
            </div>
          </div>

          <BrandButton
            onClick={() => navigate('/')}
            variant="teal"
            size="md"
            fullWidth
            className="md:w-auto group"
          >
            <span className="inline-block group-hover:-translate-x-1 transition-transform">←</span> Back to Launchpad
          </BrandButton>
        </BrandCard>
      </div>
    </>
  )
}
