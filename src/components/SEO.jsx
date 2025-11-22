import { useEffect } from 'react'

export default function SEO({
  title = 'ELOUANN - Portfolio & Web Apps',
  description = 'Portfolio and web applications by Elouann. Featuring interactive audio tools, experiments, and creative projects.',
  keywords = 'portfolio, web development, audio tools, interactive apps, Elouann',
  ogImage = '/og-image.png',
  ogType = 'website',
  canonicalPath = ''
}) {
  const siteName = 'ELOUANN'
  const siteUrl = 'https://elouann.me'
  const canonicalUrl = `${siteUrl}${canonicalPath}`

  useEffect(() => {
    // Update document title
    document.title = title

    // Update or create meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // Standard meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    updateMetaTag('author', 'ELOUANN')

    // Open Graph
    updateMetaTag('og:title', title, 'property')
    updateMetaTag('og:description', description, 'property')
    updateMetaTag('og:type', ogType, 'property')
    updateMetaTag('og:url', canonicalUrl, 'property')
    updateMetaTag('og:image', `${siteUrl}${ogImage}`, 'property')
    updateMetaTag('og:site_name', siteName, 'property')

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', `${siteUrl}${ogImage}`)

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', canonicalUrl)

  }, [title, description, keywords, ogImage, ogType, canonicalUrl, siteUrl, siteName])

  return null
}
