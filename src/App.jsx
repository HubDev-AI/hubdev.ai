import React, { useState } from 'react';
import DraggableBox from './components/DraggableBox';
import ProjectCard from './components/ProjectCard';
import DocsBox from './components/DocsBox';

// Mock Docs Data
const DOCS_DATA = {
  mkly: `
    ## mkly Markup Language
    
    A human-readable, AI-friendly markup language that compiles to HTML.
    
    ### Features
    - **Zero-Config**: Works out of the box with standard tooling.
    - **Type-Safe**: Schema validation via Zod.
    - **Clean Output**: Generates semantic HTML5.
    
    ### Quick Start
    \`\`\`bash
    npm install @milkly/mkly
    \`\`\`
  `,
  untrusted: `
    ## Untrusted<T> Language
    
    A backend-focused, AI-operable programming language with security-by-construction.
    
    ### Core Concepts
    - **Untrusted<T>**: Tainted data wrapper that prevents accidental usage in sensitive sinks.
    - **sec4Audit**: The official compiler and security policy enforcer.
    - **Policy-as-Code**: Define security gates directly in your codebase.
    
    ### Security Levels
    - **NORMAL**: Standard operation.
    - **CRITICAL**: Requires explicit declassification or endorsement.
  `
};

function App() {
  const [activeDoc, setActiveDoc] = useState(null);

  const handleOpenDocs = (projectKey) => {
    setActiveDoc(projectKey);
  };

  const handleCloseDocs = () => {
    setActiveDoc(null);
  };

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      position: 'relative', 
      background: '#050505',
      overflow: 'hidden'
    }}>
      {/* 3D Perspective Tron Grid */}
      <div className="tron-grid-container">
        <div className="tron-grid" />
        <div className="tron-horizon-glow" />
      </div>
      
      {/* Texture Overlays */}
      <div className="noise-overlay" />

      {/* Global Header HUD */}
      <header style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '60px',
        borderBottom: '1px solid rgba(0, 240, 255, 0.2)',
        background: 'rgba(5, 5, 5, 0.6)',
        backdropFilter: 'blur(5px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        boxSizing: 'border-box'
      }}>
        <h1 className="glitch-text" data-text="HUBDEV_AI // SYSTEM_CORE" style={{
          margin: 0,
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--neon-cyan)',
          letterSpacing: '2px'
        }}>
          HUBDEV_AI // SYSTEM_CORE
        </h1>
        <div style={{ display: 'flex', gap: '20px', fontSize: '0.8rem', color: '#666' }}>
          <span>STATUS: <span style={{ color: 'var(--matrix-green)' }}>ONLINE</span></span>
          <span>SEC_LEVEL: <span style={{ color: 'var(--neon-red)' }}>MAXIMUM</span></span>
        </div>
      </header>

      {/* mkly Project Card */}
      <DraggableBox initialX={100} initialY={150}>
        <div onClick={() => handleOpenDocs('mkly')} style={{ cursor: 'pointer' }}>
          <ProjectCard 
            title="mkly" 
            description="TARGET: HUMAN-READABLE MARKUP. COMPILAION STATUS: ACTIVE. AI-FRIENDLY PROTOCOLS ENGAGED."
            links={[
              { label: 'ACCESS_REPO', url: 'https://github.com/HubDev-AI/mkly' }
            ]}
            tags={['MARKUP', 'AI_Interface', 'V1.0']}
            securityLevel="NORMAL"
          />
        </div>
      </DraggableBox>

      {/* Untrusted<T> Project Card */}
      <DraggableBox initialX={500} initialY={150} isCritical={true}>
        <div onClick={() => handleOpenDocs('untrusted')} style={{ cursor: 'pointer' }}>
          <ProjectCard 
            title="Untrusted<T>" 
            description="WARNING: UNTRUSTED INPUTS DETECTED. ENFORCING SECURITY BOUNDARIES via sec4Audit COMPILER."
            links={[
              { label: 'ACCESS_REPO', url: 'https://github.com/HubDev-AI/untrusted-compiler' }
            ]}
            tags={['SEC4AUDIT', '.UT', 'COMPILER', 'POLICIES']}
            securityLevel="CRITICAL"
          />
        </div>
      </DraggableBox>

      {/* Interactive Docs Viewer */}
      {activeDoc && (
        <DocsBox 
          title={activeDoc === 'mkly' ? 'MKLY_SPEC' : 'UNTRUSTED_LANG_SPEC'}
          content={
            <div style={{ whiteSpace: 'pre-wrap' }}>
              {DOCS_DATA[activeDoc].trim()}
            </div>
          }
          onClose={handleCloseDocs}
          initialX={window.innerWidth / 2 - 200}
          initialY={window.innerHeight / 2 - 200}
        />
      )}

      {/* Ecosystem Data Box */}
      <DraggableBox initialX={100} initialY={600}>
        <div style={{ color: 'var(--text-color)', fontFamily: 'var(--font-tech)' }}>
          <h4 style={{ 
            margin: '0 0 10px 0', 
            color: 'var(--neon-cyan)', 
            borderBottom: '1px solid var(--neon-cyan)',
            paddingBottom: '5px'
          }}>
            ECOSYSTEM_MANIFEST_V2
          </h4>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            margin: 0, 
            fontSize: '0.8rem', 
            lineHeight: '1.8' 
          }}>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#888' }}>BRAND:</span>
              <span>sec4Audit</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#888' }}>COMPILER:</span>
              <span>sec4Audit CLI</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#888' }}>POLICY:</span>
              <span>audit / explain / gate</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#888' }}>EXT:</span>
              <span style={{ color: 'var(--neon-red)' }}>.ut / .un</span>
            </li>
          </ul>
        </div>
      </DraggableBox>
      
    </div>
  );
}

export default App;
