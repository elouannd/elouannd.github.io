import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import GlassCard from './GlassCard';
import './HomePage.css';

const HomePage = () => {
  const { t } = useLanguage();
  const isDevelopment = import.meta.env.DEV;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <div className="homepage">
      <div className="homepage-container">
        <GlassCard
          className="home-card"
          withGlow={true}
          hoverable={false}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              ease: [0.34, 1.56, 0.64, 1]
            }}
          >
            <h1 className="home-title">
              <span className="text-gradient">{t('home.title')}</span>
            </h1>

            <motion.p
              className="home-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Developer & Designer
            </motion.p>

            {isDevelopment && (
              <motion.nav
                className="home-nav"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {[
                  { to: '/plugins', label: t('nav.plugins') },
                  { to: '/apps', label: t('nav.apps') },
                  { to: '/autre', label: t('nav.other') },
                  { to: '/contact', label: t('nav.contact') }
                ].map((item, index) => (
                  <motion.div key={item.to} variants={itemVariants}>
                    <Link to={item.to} className="nav-link btn btn-glass">
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
            )}
          </motion.div>
        </GlassCard>
      </div>

      <motion.footer
        className="home-footer glass"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <p className="text-muted">
          {t('common.contact')}: <a href="mailto:domenech@elouann.me">domenech@elouann.me</a>
        </p>
      </motion.footer>
    </div>
  );
};

export default HomePage;
