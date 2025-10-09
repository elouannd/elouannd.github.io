import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './LanguageToggle.css';

function LanguageToggle() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      className="language-toggle glass"
      onClick={toggleLanguage}
      aria-label={t('language.toggle')}
      title={t('language.toggle')}
    >
      <span className={`lang-option ${language === 'fr' ? 'active' : ''}`}>FR</span>
      <span className="divider">|</span>
      <span className={`lang-option ${language === 'en' ? 'active' : ''}`}>EN</span>
    </button>
  );
}

export default LanguageToggle;
