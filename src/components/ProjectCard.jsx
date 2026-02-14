import React from 'react';
import { Terminal } from 'lucide-react';

const ProjectCard = ({ title, description, localPath, links, tags, securityLevel = "NORMAL" }) => {
  const isCritical = securityLevel === "CRITICAL";
  const statusColor = isCritical ? 'var(--neon-red)' : 'var(--neon-cyan)';

  const sysId = String(
    [...title].reduce((acc, char) => ((acc * 31) + char.charCodeAt(0)) % 100000, 17)
  ).padStart(5, '0');

  // Scrub PII if present (failsafe, though we will pass generic paths from App.jsx)
  const displayPath = localPath ? localPath.replace(/\/Users\/[^/]+/, '~') : '';

  return (
    <div style={{ width: 'min(320px, 100%)', fontFamily: 'var(--font-tech)' }}>
      {/* Header Status Line */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: `1px solid ${statusColor}`,
        paddingBottom: '8px',
        marginBottom: '15px'
      }}>
        <div style={{ fontSize: '0.7rem', color: statusColor, letterSpacing: '2px' }}>
          SYS.ID: {sysId}
        </div>
        <div style={{ 
          background: statusColor, 
          color: '#000', 
          fontSize: '0.65rem', 
          padding: '2px 6px', 
          fontWeight: 'bold' 
        }}>
          {securityLevel}
        </div>
      </div>

      {/* Title & Glitch Effect */}
      <h3 className="glitch-text" data-text={title} style={{ 
        margin: '0 0 10px 0', 
        fontSize: '1.8rem', 
        color: '#fff',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        {title}
      </h3>

      {/* Description */}
      <p style={{ 
        margin: '0 0 20px 0', 
        fontSize: '0.85rem', 
        color: '#aaa', 
        lineHeight: '1.5',
        borderLeft: `2px solid ${statusColor}`,
        paddingLeft: '10px'
      }}>
        {description}
      </p>
      
      {/* Local Path Data Block */}
      {displayPath && (
        <div style={{ marginBottom: '20px', background: 'rgba(255,255,255,0.02)', padding: '10px', border: '1px dashed rgba(255,255,255,0.1)' }}>
          <strong style={{ display: 'block', fontSize: '0.65rem', color: '#666', marginBottom: '6px' }}>MOUNT POINT__</strong>
          <code style={{ 
            display: 'block', 
            color: 'var(--matrix-green)',
            fontSize: '0.7rem', 
            wordBreak: 'break-all'
          }}>
            {displayPath}
          </code>
        </div>
      )}

      {/* Action Links */}
      {links && links.length > 0 && (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          {links.map((link, index) => (
            <a 
              key={index} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: `1px solid ${statusColor}`,
                color: statusColor,
                textDecoration: 'none',
                padding: '8px 12px',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s',
                boxShadow: `0 0 5px ${statusColor}40`
              }}
            >
              <Terminal size={14} />
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Footer Tags */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderTop: '1px dashed #333', paddingTop: '10px' }}>
        {tags && tags.map((tag, index) => (
          <span 
            key={index}
            style={{
              fontSize: '0.65rem',
              color: '#888',
              border: '1px solid #444',
              padding: '2px 6px',
              background: '#111'
            }}
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
