import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

function Apps() {
  const { t } = useLanguage();

  return (
    <div className="apps-page page">
      <Link to="/" className="nav-button back-button">{t('common.backToHome')}</Link>
      <h2>{t('apps.title')}</h2>
      <div className="apps-grid">
        {/* Les applications seront ajoutées ici */}
      </div>
    </div>
  );
}

export default Apps;