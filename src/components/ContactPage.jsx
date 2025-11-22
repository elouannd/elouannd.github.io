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
        title="Contact Elouann - Get in Touch | ELOUANN"
        description="Get in touch with Elouann for collaboration, projects, or inquiries. Connect via email, GitHub, or social media."
        keywords="contact Elouann, hire developer, collaboration, web developer contact, get in touch"
        canonicalPath="/contact"
      />
      <div className="min-h-screen flex items-center justify-center p-8">
      <BrandCard className="max-w-2xl" colorAccent="teal">
        <h1 className="text-5xl font-black uppercase mb-6">Contact</h1>

        <div className="space-y-6 mb-8">
          <p className="text-lg">
            Want to get in touch?
          </p>

          <div className="space-y-3">
            <div className="glass border-3 border-black p-4">
              <p className="font-bold">Email</p>
              <p className="font-serif italic">your@email.com</p>
            </div>

            <div className="glass border-3 border-black p-4">
              <p className="font-bold">GitHub</p>
              <p className="font-serif italic">@yourusername</p>
            </div>

            <div className="glass border-3 border-black p-4">
              <p className="font-bold">Twitter</p>
              <p className="font-serif italic">@yourusername</p>
            </div>
          </div>
        </div>

        <BrandButton onClick={() => navigate('/')} variant="teal">
          ← Back to Launchpad
        </BrandButton>
      </BrandCard>
    </div>
    </>
  )
}
