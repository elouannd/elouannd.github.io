import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const GlassCard = ({
  children,
  className = '',
  withGradientBorder = false,
  withGlow = false,
  hoverable = true,
  as: Component = 'div',
  ...props
}) => {
  const baseClasses = withGradientBorder ? 'glass-gradient' : 'glass-card';
  const additionalClasses = [
    className,
    withGlow ? 'warm-glow' : '',
  ].filter(Boolean).join(' ');

  const combinedClasses = `${baseClasses} ${additionalClasses}`.trim();

  const hoverAnimation = hoverable ? {
    initial: { y: 0 },
    whileHover: {
      y: -4,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 17
      }
    },
    whileTap: { scale: 0.98 }
  } : {};

  return (
    <motion.div
      className={combinedClasses}
      {...hoverAnimation}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1]
      }}
      {...props}
    >
      {withGradientBorder ? (
        <Component className="glass-gradient-inner">
          {children}
        </Component>
      ) : (
        children
      )}
    </motion.div>
  );
};

GlassCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  withGradientBorder: PropTypes.bool,
  withGlow: PropTypes.bool,
  hoverable: PropTypes.bool,
  as: PropTypes.elementType
};

export default GlassCard;
