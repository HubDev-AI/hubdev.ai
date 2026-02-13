import { motion } from 'framer-motion';
import React from 'react';

const DraggableBox = ({ children, initialX = 0, initialY = 0, className = "", isCritical = false }) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ x: initialX, y: initialY }}
      className={`cyber-box-container ${isCritical ? 'critical' : ''} ${className}`}
      style={{ position: 'absolute' }}
      whileHover={{ scale: 1.02, zIndex: 100 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="cyber-box-frame">
        {/* Inner Content Container */}
        <div style={{
          padding: '24px',
          background: 'rgba(0,0,0,0.4)', // Slightly darken inner content for contrast
          backdropFilter: 'blur(2px)',
          position: 'relative',
          overflow: 'hidden' 
        }}>
          {/* Animated Scanline Overlay */}
          <div className="scanline" />
          
          {children}
        </div>
        
        {/* Decorative Corner Markers */}
        <div style={{ 
          position: 'absolute', top: 0, left: 0, width: '15px', height: '15px', 
          borderTop: `2px solid ${isCritical ? 'var(--neon-red)' : 'var(--neon-cyan)'}`, 
          borderLeft: `2px solid ${isCritical ? 'var(--neon-red)' : 'var(--neon-cyan)'}` 
        }} />
        <div style={{ 
          position: 'absolute', bottom: 0, right: 0, width: '15px', height: '15px', 
          borderBottom: `2px solid ${isCritical ? 'var(--neon-red)' : 'var(--neon-cyan)'}`, 
          borderRight: `2px solid ${isCritical ? 'var(--neon-red)' : 'var(--neon-cyan)'}` 
        }} />
      </div>
    </motion.div>
  );
};

export default DraggableBox;
