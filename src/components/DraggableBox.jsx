import * as FramerMotion from 'framer-motion';
import React, { useRef } from 'react';

const DraggableBox = ({
  children,
  id,
  initialX = 0,
  initialY = 0,
  className = "",
  isCritical = false,
  onPositionChange,
  draggable = true,
  staticPosition = false
}) => {
  const wasDragged = useRef(false);

  const handleDragStart = () => {
    if (!draggable) return;
    wasDragged.current = true;
  };

  const handleDragEnd = (event, info) => {
    if (!draggable) return;

    // Keep wasDragged true briefly so the click event is suppressed
    setTimeout(() => { wasDragged.current = false; }, 0);

    // Report final position back to parent
    if (onPositionChange && id) {
      const finalX = Math.round(initialX + info.offset.x);
      const finalY = Math.round(initialY + info.offset.y);
      onPositionChange(id, finalX, finalY);
    }
  };

  const handleClick = (e) => {
    if (wasDragged.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <FramerMotion.motion.div
      drag={draggable}
      dragMomentum={false}
      initial={staticPosition ? false : { x: initialX, y: initialY }}
      className={`cyber-box-container ${isCritical ? 'critical' : ''} ${className}`}
      style={{
        position: staticPosition ? 'relative' : 'absolute',
        width: staticPosition ? '100%' : undefined
      }}
      whileHover={{ scale: 1.02, zIndex: 100 }}
      whileTap={{ scale: 0.98 }}
      onDragStart={draggable ? handleDragStart : undefined}
      onDragEnd={draggable ? handleDragEnd : undefined}
      onClickCapture={handleClick}
    >
      <div className="cyber-box-frame">
        {/* Inner Content Container */}
        <div style={{
          padding: '24px',
          background: 'rgba(0,0,0,0.4)',
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
    </FramerMotion.motion.div>
  );
};

export default DraggableBox;
