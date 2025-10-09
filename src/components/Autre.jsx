import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

function Autre() {
  const { t } = useLanguage();

  return (
    <div className="autre-page page">
      <Link to="/" className="nav-button back-button">{t('common.backToHome')}</Link>
      <h2>{t('other.title')}</h2>
      <div className="autre-content">
        {/* Le contenu sera ajouté ici */}
      </div>
    </div>
  );
}

export default Autre;