import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

function Contact() {
  const { t } = useLanguage();

  return (
    <div className="contact-page page">
      <Link to="/" className="nav-button back-button">{t('common.backToHome')}</Link>
      <h2>{t('contact.title')}</h2>
      <div className="contact-content">
        {/* Le formulaire de contact sera ajouté ici */}
      </div>
    </div>
  );
}

export default Contact;