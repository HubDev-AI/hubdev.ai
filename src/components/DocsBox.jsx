import React from 'react';
import DraggableBox from './DraggableBox';
import { X } from 'lucide-react';

const DocsBox = ({ title, content, onClose, initialX = 0, initialY = 0 }) => {
  return (
    <DraggableBox initialX={initialX} initialY={initialY} className="docs-box" style={{ zIndex: 1000 }}>
      <div style={{ width: '400px', fontFamily: 'var(--font-tech)' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: '1px solid var(--neon-cyan)',
          paddingBottom: '10px',
          marginBottom: '15px'
        }}>
          <h3 style={{ 
            margin: 0, 
            color: 'var(--neon-cyan)', 
            fontSize: '1.2rem', 
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            DOCS // {title}
          </h3>
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent drag start
              onClose();
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--neon-red)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '5px'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--neon-red)'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="docs-content">
          {content}
        </div>
        
        {/* Footer Decoration */}
        <div style={{ 
          marginTop: '15px', 
          borderTop: '1px dashed #333', 
          paddingTop: '5px',
          fontSize: '0.6rem',
          color: '#666',
          textAlign: 'right'
        }}>
          END_OF_FILE
        </div>
      </div>
    </DraggableBox>
  );
};

export default DocsBox;
