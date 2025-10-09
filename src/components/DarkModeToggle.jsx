import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import './DarkModeToggle.css';

const DarkModeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      className="dark-mode-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className="toggle-track">
        <motion.div
          className="toggle-thumb"
          layout
          animate={{
            x: isDark ? 28 : 0
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30
          }}
        >
          <span className="toggle-icon">
            {isDark ? '🌙' : '☀️'}
          </span>
        </motion.div>
      </div>
      <span className="sr-only">
        Current theme: {theme}
      </span>
    </motion.button>
  );
};

export default DarkModeToggle;
