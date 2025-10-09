import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="page">
      <Link to="/" className="nav-button back-button">{t('common.backToHome')}</Link>
      <h2>{t('notFound.title')}</h2>
      <p>{t('notFound.message')}</p>
    </div>
  )
}