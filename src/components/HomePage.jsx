import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BrandCard from './BrandCard'
import MixedTypography from './MixedTypography'
import SEO from './SEO'
import StructuredData from './StructuredData'
import appsData from '../apps.json'

export default function HomePage() {
  const navigate = useNavigate()
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const browserLang = navigator.language || navigator.languages[0]
    if (browserLang.startsWith('fr')) {
      setLanguage('fr')
    }
  }, [])

  const t = {
    en: {
      subtitle: 'Audio Tools & Interactive Apps',
      title: 'EQ Ear Trainer',
      description: 'Train your ears to recognize EQ frequencies like a pro.',
      cta: 'Start Training →'
    },
    fr: {
      subtitle: 'Outils Audio & Apps Interactives',
      title: 'EQ Ear Trainer',
      description: 'Entraînez vos oreilles à reconnaître les fréquences EQ comme un pro.',
      cta: 'Commencer →'
    }
  }[language]

  return (
    <>
      <SEO
        title="Elouann"
        description="Master EQ frequency identification with our free interactive ear trainer. Perfect for audio engineers and music producers. Train your ears with real-time audio processing."
        keywords="EQ ear trainer, frequency recognition, audio training, mixing, mastering, free eq tool, audio engineer, music producer"
        canonicalPath="/"
      />
      <StructuredData
        type="website"
        data={{
          name: 'ELOUANN - EQ Ear Trainer',
          url: 'https://elouann.ca',
          description: 'Free online EQ ear training tool for audio professionals'
        }}
      />
      <StructuredData
        type="person"
        data={{
          name: 'Elouann',
          url: 'https://elouann.ca',
          email: 'domenech@elouann.ca',
          jobTitle: 'Web Developer',
          description: 'Creator of EQ Ear Trainer and interactive web applications for audio professionals',
          knowsAbout: ['Web Development', 'Audio Engineering', 'Interactive Design', 'React', 'Web Audio API']
        }}
      />
      <div className="min-h-screen flex flex-col items-center justify-between p-8 relative">
        {/* Animated Background Layer */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Large decorative shapes with subtle animation */}
          <div className="absolute top-20 -left-20 w-64 h-64 bg-brand-orange/5 border-4 border-black/10 rotate-12 blur-2xl" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-teal/5 border-4 border-black/10 -rotate-12 blur-2xl" />

          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 pattern-dots opacity-30" />
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-1/4 right-16 w-6 h-6 border-4 border-black bg-brand-teal animate-float" />
        <div className="absolute bottom-1/3 left-20 w-4 h-4 border-4 border-black bg-brand-orange rotate-45 animate-float" style={{ animationDelay: '1s' }} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center gap-16 w-full">
          {/* Hero */}
          <div className="text-center">
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black uppercase mb-4">
              <MixedTypography
                text="ELOUANN"
                className="drop-shadow-[8px_8px_0px_rgba(0,0,0,0.1)]"
              />
            </h1>
            <p className="text-xl font-serif italic text-black/60">
              {t.subtitle}
            </p>
          </div>

          {/* App Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl px-4">
            {appsData.map((app, index) => (
              <div key={app.id} className="relative">
                {/* Shadow layer behind card */}
                <div className={`absolute inset-0 bg-brand-${app.color}/10 border-4 border-black/20 translate-x-4 translate-y-4 blur-sm -z-10`} />

                {/* Main card */}
                <BrandCard
                  colorAccent={app.color}
                  hoverable
                  cornerAccent={true}
                  glassVariant="thick"
                  shadowVariant="layered"
                  onClick={() => navigate(app.url)}
                >
                  <h2 className="text-3xl sm:text-4xl font-black uppercase mb-4">
                    {app.name}
                  </h2>
                  <p className="text-lg sm:text-xl font-serif italic text-black/80">
                    {app.description}
                  </p>
                </BrandCard>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Footer with Decorative Accents */}
        <div className="w-full py-8 border-t-4 border-black/10 relative">
          {/* Decorative accent lines */}
          <div className="absolute left-0 top-0 w-24 h-1 bg-brand-orange" />
          <div className="absolute right-0 top-0 w-24 h-1 bg-brand-teal" />

          <div className="text-center">
            <a href="mailto:domenech@elouann.ca" className="group inline-block relative">
              <span className="text-lg font-serif italic text-black/60 group-hover:text-black transition-colors">
                domenech@elouann.ca
              </span>
              {/* Animated underline */}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
