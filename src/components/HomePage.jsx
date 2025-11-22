import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BrandCard from './BrandCard'
import SEO from './SEO'
import StructuredData from './StructuredData'

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
      subtitle: 'Free EQ Ear Training',
      title: 'EQ Ear Trainer',
      description: 'Train your ears to recognize EQ frequencies like a pro.',
      cta: 'Start Training →'
    },
    fr: {
      subtitle: 'Entraînement EQ Gratuit',
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
          url: 'https://elouann.me',
          description: 'Free online EQ ear training tool for audio professionals'
        }}
      />
      <StructuredData
        type="person"
        data={{
          name: 'Elouann',
          url: 'https://elouann.me',
          email: 'domenech@elouann.me',
          jobTitle: 'Web Developer',
          description: 'Creator of EQ Ear Trainer and interactive web applications for audio professionals',
          knowsAbout: ['Web Development', 'Audio Engineering', 'Interactive Design', 'React', 'Web Audio API']
        }}
      />
      <div className="min-h-screen flex flex-col items-center justify-between p-8">
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center gap-16 w-full">
          {/* Hero */}
          <div className="text-center">
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black uppercase mb-4">
              ELOUANN
            </h1>
            <p className="text-xl font-serif italic text-black/60">
              {t.subtitle}
            </p>
          </div>

          {/* Single Card - EQ Trainer */}
          <div className="max-w-2xl w-full">
            <BrandCard
              colorAccent="orange"
              hoverable
              onClick={() => navigate('/eq-trainer')}
            >
              <h2 className="text-4xl font-black uppercase mb-6">
                {t.title}
              </h2>
              <p className="text-xl font-serif italic mb-8 text-black/80">
                {t.description}
              </p>
              <div className="text-center">
                <span className="text-2xl font-black uppercase tracking-wider">
                  {t.cta}
                </span>
              </div>
            </BrandCard>
          </div>
        </div>

        {/* Footer with Email */}
        <div className="w-full text-center py-8 border-t-2 border-black/10">
          <a
            href="mailto:domenech@elouann.me"
            className="text-lg font-serif italic text-black/60 hover:text-black transition-colors"
          >
            domenech@elouann.me
          </a>
        </div>
      </div>
    </>
  )
}
