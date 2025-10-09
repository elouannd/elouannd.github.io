import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './HomePage.css';

const HomePage = () => {
  const { t } = useLanguage();

  return (
    <div className="homepage">
      <div className="homepage-grid">
        {/* Main Hero Card */}
        <motion.div
          className="hero-card glass"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            ease: [0.34, 1.56, 0.64, 1]
          }}
        >
          <div className="hero-content">
            <motion.div
              className="name-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="hero-name">
                <span className="text-gradient">{t('home.title')}</span>
              </h1>
            </motion.div>

          </div>

          {/* Ambient glow effect */}
          <div className="hero-glow" />
        </motion.div>

        {/* Contact Card */}
        <motion.div
          className="contact-card glass"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <div className="contact-content">
            <div className="contact-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div className="contact-info">
              <span className="contact-label">{t('common.contact')}</span>
              <a href="mailto:domenech@elouann.me" className="contact-email">
                domenech@elouann.me
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Background Elements */}
      <div className="bg-decoration">
        <div className="decoration-orb orb-1" />
        <div className="decoration-orb orb-2" />
      </div>
    </div>
  );
};

export default HomePage;
