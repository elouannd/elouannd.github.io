import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { useLanguage } from '../contexts/LanguageContext'

export default function UnlinkedPage() {
  const { slug } = useParams()
  const { t } = useLanguage()
  const [html, setHtml] = useState('')
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'notfound' | 'error'

  useEffect(() => {
    let cancelled = false
    async function load() {
      setStatus('loading')
      try {
        const res = await fetch(`/unlinked/${encodeURIComponent(slug)}.html`, { cache: 'no-store' })
        if (!res.ok) {
          setStatus(res.status === 404 ? 'notfound' : 'error')
          return
        }
        const text = await res.text()
        const safe = DOMPurify.sanitize(text, { USE_PROFILES: { html: true } })
        if (!cancelled) {
          setHtml(safe)
          setStatus('ready')
        }
      } catch {
        if (!cancelled) setStatus('error')
      }
    }
    load()
    return () => { cancelled = true }
  }, [slug])

  if (status === 'loading') {
    return (
      <div className="page">
        <Link to="/" className="nav-button back-button">{t('common.backToHome')}</Link>
        <p>{t('unlinked.loading')}</p>
      </div>
    )
  }

  if (status === 'notfound') {
    return (
      <div className="page">
        <Link to="/" className="nav-button back-button">{t('common.backToHome')}</Link>
        <h2>{t('unlinked.notFound.title')}</h2>
        <p>{t('unlinked.notFound.message').replace('{{slug}}', slug)}</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="page">
        <Link to="/" className="nav-button back-button">{t('common.backToHome')}</Link>
        <h2>{t('unlinked.error.title')}</h2>
        <p>{t('unlinked.error.message')}</p>
      </div>
    )
  }

  return (
    <div className="page">
      <Link to="/" className="nav-button back-button">{t('common.backToHome')}</Link>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}