import React from 'react'
import { useNavigate } from 'react-router-dom'
import BrandCard from './BrandCard'

export default function HomePage() {
  const navigate = useNavigate()

  const portals = [
    {
      title: 'About',
      description: 'Who am I?',
      path: '/about',
      color: 'orange'
    },
    {
      title: 'Apps',
      description: 'The Directory',
      path: '/apps',
      color: 'teal'
    },
    {
      title: 'Contact',
      description: 'Get in touch',
      path: '/contact',
      color: 'orange'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 gap-16">
      {/* Hero */}
      <div className="text-center">
        <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black uppercase mb-4">
          ELOUANN
        </h1>
        <p className="text-xl font-serif italic text-white/80">
          Welcome to the Launchpad
        </p>
      </div>

      {/* Portal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {portals.map((portal) => (
          <BrandCard
            key={portal.path}
            colorAccent={portal.color}
            hoverable
            onClick={() => navigate(portal.path)}
          >
            <h2 className="text-3xl font-black uppercase mb-2">
              {portal.title}
            </h2>
            <p className="font-serif italic text-lg text-white/70">
              {portal.description}
            </p>
          </BrandCard>
        ))}
      </div>
    </div>
  )
}
