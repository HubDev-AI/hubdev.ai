import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function DocsBox({ title, content, onClose, initialX = 100, initialY = 100, onLaunchStream, isCritical = false, boxTheme }) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  // ... existing state ...
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const contentRef = useRef(null);

  // ... existing handlers ...
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) setPosition({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
    };
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Derive styles: Prefer boxTheme, then fallback to defaults
  // Default Critical = White-ish (#e0e0e0), Default Normal = var(--neon-primary) (Red)
  const defaultColor = isCritical ? '#e0e0e0' : 'var(--neon-primary)';
  const borderColor = boxTheme?.borderColor || boxTheme?.color || defaultColor;
  const textColor = boxTheme?.textColor || '#d0d0d0'; // Default text #d0d0d0
  const primaryColor = boxTheme?.color || defaultColor;
  
  // Header background logic
  const headerBg = isCritical ? 'rgba(255, 60, 0, 0.15)' : 'rgba(255, 0, 60, 0.15)'; 

  return (
    <div 
      className={`cyber-box-container ${isCritical ? 'critical' : ''}`}
      style={{ 
        left: position.x, 
        top: position.y,
        width: '550px',
        zIndex: 1000 
      }}
    >
      <div 
        className="cyber-box-frame"
        style={{
            borderColor: borderColor
        }}
      >
        {/* Header */}
        <div 
          onMouseDown={handleMouseDown}
          style={{
            padding: '12px 20px',
            borderBottom: `1px solid ${borderColor}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'grab',
            background: headerBg
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
             <div style={{ width: '8px', height: '8px', background: primaryColor, borderRadius: '50%', boxShadow: `0 0 8px ${primaryColor}` }} />
             <span style={{ fontFamily: 'var(--font-tech)', fontSize: '1rem', fontWeight: 'bold', letterSpacing: '2px', color: '#fff', textShadow: '0 0 5px rgba(255,0,0,0.5)' }}>
               {title}
             </span>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: primaryColor, cursor: 'pointer', fontSize: '1.4rem', fontWeight: 'bold', lineHeight: 1 }}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div 
           ref={contentRef}
           className="docs-content markdown-body" 
           style={{ 
             padding: '25px', 
             color: textColor, 
             maxHeight: '450px',
             overflowY: 'auto'
           }}
        >
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        {/* Footer - Custom Button Style */}
        <div style={{
            padding: '20px',
            borderTop: `1px solid ${borderColor}`,
            background: 'rgba(5, 5, 5, 0.9)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px'
        }}>
            {/* Main Terminal Access Button */}
            <button
                onClick={onLaunchStream}
                className="btn-terminal-access"
                style={{
                    '--btn-color': primaryColor,
                    justifyContent: 'center', 
                    width: '100%' 
                }}
            >
                <span className="text">TERMINAL_ACCESS</span>
            </button>
        </div>
      </div>
    </div>
  );
}
