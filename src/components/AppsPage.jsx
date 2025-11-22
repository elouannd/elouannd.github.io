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
        title="Interactive Apps & Tools - Elouann's Portfolio | ELOUANN"
        description="Explore interactive web applications by Elouann. EQ Ear Trainer for audio engineers, creative experiments, and innovative tools for music producers and developers."
        keywords="web apps, interactive tools, EQ trainer, audio apps, creative tools, web applications, music production tools"
        canonicalPath="/apps"
      />
      <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-black uppercase mb-4">The Apps</h1>
          <p className="text-xl font-serif italic text-white/80">
            A directory of things I've built
          </p>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {appsData.map((app) => (
            <BrandCard
              key={app.id}
              colorAccent={app.color}
              hoverable
              onClick={() => navigate(app.url)}
            >
              <h2 className="text-2xl font-black uppercase mb-2">
                {app.name}
              </h2>
              <p className="font-serif italic text-white/70">
                {app.description}
              </p>
            </BrandCard>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <BrandButton onClick={() => navigate('/')} variant="teal">
            ← Back to Launchpad
          </BrandButton>
        </div>
      </div>
    </div>
    </>
  )
}
