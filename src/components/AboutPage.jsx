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
        title="About Elouann - Web Developer & Audio Enthusiast | ELOUANN"
        description="Learn about Elouann, creator of interactive web applications and audio tools. Passionate about web development, audio engineering, and creative coding."
        keywords="about Elouann, web developer, audio engineer, interactive applications, creative developer"
        canonicalPath="/about"
      />
      <div className="min-h-screen flex items-center justify-center p-8">
      <BrandCard className="max-w-2xl" colorAccent="orange">
        <h1 className="text-5xl font-black uppercase mb-6">About</h1>

        <div className="space-y-4 text-lg mb-8">
          <p className="font-serif italic">
            This is where your bio goes.
          </p>
          <p>
            Talk about who you are, what you do, what drives you.
          </p>
          <p className="font-serif italic">
            Keep it concise. Keep it confident.
          </p>
        </div>

        <BrandButton onClick={() => navigate('/')} variant="orange">
          ← Back to Launchpad
        </BrandButton>
      </BrandCard>
    </div>
    </>
  )
}
