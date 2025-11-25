import React from 'react'
import { useNavigate } from 'react-router-dom'
import BrandCard from './BrandCard'
import BrandButton from './BrandButton'
import SEO from './SEO'
import appsData from '../apps.json'

export default function AppsPage() {
  const navigate = useNavigate()

  return (
    <>
      <SEO
        title="Elouann - Apps"
        description="Explore interactive web applications by Elouann. EQ Ear Trainer for audio engineers, creative experiments, and innovative tools for music producers and developers."
        keywords="web apps, interactive tools, EQ trainer, audio apps, creative tools, web applications, music production tools"
        canonicalPath="/apps"
      />
      <div className="min-h-screen p-8 relative">
        {/* Background decorations - more playful! */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-40 right-10 w-32 h-32 border-4 border-black/5 rotate-45 animate-spin-slow" />
          <div className="absolute bottom-60 left-20 w-24 h-24 border-4 border-black/5 -rotate-12" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border-4 border-black/5 bg-brand-teal/10 animate-float" />
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header with animated decorative elements */}
          <div className="mb-12 text-center relative">
            <div className="flex items-center justify-center gap-6 mb-4">
              {/* Animated pulse lines */}
              <div className="h-1 w-20 bg-brand-orange animate-pulse" style={{ animationDuration: '3s' }} />
              <h1 className="text-6xl font-black uppercase relative">
                The Apps
                {/* Tiny corner decoration on title */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-brand-orange border-2 border-black rotate-45" />
              </h1>
              <div className="h-1 w-20 bg-brand-teal animate-pulse" style={{ animationDuration: '3s', animationDelay: '1.5s' }} />
            </div>
            <p className="text-xl font-serif italic text-black/80">
              A directory of things I've built
            </p>
          </div>

          {/* Apps Grid with numbered badges - EXTRA playful! */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {appsData.map((app, index) => (
              <BrandCard
                key={app.id}
                colorAccent={app.color}
                hoverable
                cornerAccent={true}
                glassVariant="thick"
                shadowVariant={index === 0 ? 'layered' : 'default'}
                onClick={() => navigate(app.url)}
                className="relative group"
              >
                {/* BOLD numbered badge with extra flair */}
                <div className="absolute -top-3 -left-3 w-10 h-10 border-4 border-black bg-white flex items-center justify-center shadow-brutal-sm group-hover:shadow-brutal group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all z-10">
                  <span className="font-black text-xl">{String(index + 1).padStart(2, '0')}</span>
                </div>

                <h2 className="text-2xl font-black uppercase mb-3 relative">
                  {app.name}
                  {/* Fun underline that grows on hover */}
                  <div className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-brand-orange to-brand-teal w-0 group-hover:w-full transition-all duration-300" />
                </h2>

                <p className="font-serif italic text-black/70 mb-4 group-hover:text-black transition-colors">
                  {app.description}
                </p>

                {/* Playful arrow that bounces on hover */}
                <div className="text-right">
                  <span className="inline-block font-black text-2xl group-hover:translate-x-2 group-hover:scale-110 transition-all">
                    →
                  </span>
                </div>

                {/* Hidden corner decoration that appears on hover */}
                <div className="absolute bottom-2 right-2 w-3 h-3 bg-gradient-to-br from-brand-orange to-brand-teal border-2 border-black opacity-0 group-hover:opacity-100 rotate-45 transition-opacity" />
              </BrandCard>
            ))}
          </div>

          {/* Back Button with extra personality */}
          <div className="text-center">
            <BrandButton
              onClick={() => navigate('/')}
              variant="teal"
              size="md"
              className="group"
            >
              <span className="inline-block group-hover:-translate-x-1 transition-transform">←</span> Back to Launchpad
            </BrandButton>
          </div>
        </div>
      </div>
    </>
  )
}
