import { useEffect } from 'react'

export default function StructuredData({ type = 'person', data }) {
  useEffect(() => {
    // Remove existing structured data script if any
    const existingScript = document.querySelector('script[type="application/ld+json"]')
    if (existingScript) {
      existingScript.remove()
    }

    // Create new script element
    const script = document.createElement('script')
    script.type = 'application/ld+json'

    let structuredData

    if (type === 'person') {
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: data.name || 'Elouann',
        url: data.url || 'https://elouann.me',
        sameAs: data.sameAs || [],
        jobTitle: data.jobTitle,
        description: data.description,
        knowsAbout: data.knowsAbout || ['Web Development', 'Audio Engineering', 'Interactive Applications']
      }
    } else if (type === 'webapp') {
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: data.name,
        description: data.description,
        url: data.url,
        applicationCategory: data.category || 'MultimediaApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        author: {
          '@type': 'Person',
          name: 'Elouann',
          url: 'https://elouann.me'
        },
        inLanguage: data.languages || ['en', 'fr'],
        featureList: data.features || []
      }
    } else if (type === 'website') {
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: data.name || 'ELOUANN',
        url: data.url || 'https://elouann.me',
        description: data.description,
        author: {
          '@type': 'Person',
          name: 'Elouann'
        },
        inLanguage: ['en', 'fr']
      }
    } else if (type === 'breadcrumb') {
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      }
    }

    script.textContent = JSON.stringify(structuredData)
    document.head.appendChild(script)

    // Cleanup
    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [type, data])

  return null
}
