import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function DocsBox({ title, content, onClose, initialX = 100, initialY = 100, onLaunchStream }) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  // Ref for the markdown content to ensure clean rendering
  const contentRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div 
      className="cyber-box-container"
      style={{ 
        left: position.x, 
        top: position.y,
        width: '550px', // Increased width for better readability
        zIndex: 1000 // Always on top
      }}
    >
      <div className="cyber-box-frame">
        {/* Header / Drag Handle */}
        <div 
          onMouseDown={handleMouseDown}
          style={{
            padding: '12px 20px',
            borderBottom: '1px solid var(--neon-red)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'grab',
            background: 'rgba(255, 0, 60, 0.15)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
             <div style={{ width: '8px', height: '8px', background: 'var(--neon-red)', borderRadius: '50%', boxShadow: '0 0 8px var(--neon-red)' }} />
             <span style={{ fontFamily: 'var(--font-tech)', fontSize: '1rem', fontWeight: 'bold', letterSpacing: '2px', color: '#fff', textShadow: '0 0 5px rgba(255,0,0,0.5)' }}>
               {title}
             </span>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--neon-red)',
              cursor: 'pointer',
              fontSize: '1.4rem',
              fontWeight: 'bold',
              lineHeight: 1
            }}
          >
            ×
          </button>
        </div>

        {/* Content Area - Summary */}
        <div 
           ref={contentRef}
           className="docs-content markdown-body" 
           style={{ 
             padding: '25px', 
             color: '#d0d0d0',
             maxHeight: '450px',
             overflowY: 'auto'
           }}
        >
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        {/* Footer Actions */}
        <div style={{
            padding: '15px 20px',
            borderTop: '1px solid var(--neon-red)',
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'flex-end'
        }}>
            <button
                onClick={onLaunchStream}
                className="hover-glitch"
                style={{
                    background: 'var(--neon-red)',
                    color: '#000',
                    border: 'none',
                    padding: '8px 20px',
                    fontFamily: 'var(--font-tech)',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 0 10px rgba(255, 0, 60, 0.3)'
                }}
            >
                INITIALIZE_STREAM &gt;&gt;
            </button>
        </div>
      </div>
    </div>
  );
}
