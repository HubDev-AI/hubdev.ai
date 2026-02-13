import React, { useState, useEffect } from 'react';
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

// Atmospheric Ash / Embers (Slow Vertical Drift)
// Fitting for the "Red Tunnel"
const Particles = () => {
    const [particles, setParticles] = useState([]);
  
    useEffect(() => {
      const interval = setInterval(() => {
        const id = Math.random();
        // Random placement across screen
        const startX = Math.random() * 100 + '%';
        const startY = '110%'; // Start below screen
        
        // Very slow, random duration
        const duration = 5 + Math.random() * 10 + 's';
        const size = Math.random() * 3 + 'px';
        
        setParticles(prev => [...prev.slice(-50), { id, startX, startY, duration, size }]);
      }, 200); 
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden' }}>
        {particles.map(p => (
           <div 
             key={p.id}
             className="particle-ash"
             style={{ 
               left: p.startX, 
               top: p.startY,
               width: p.size,
               height: p.size,
               animation: `ash-float ${p.duration} linear forwards`
             }} 
           />
        ))}
        <style>{`
          @keyframes ash-float {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            20% { opacity: 0.8; }
            80% { opacity: 0.4; }
            100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
          }
        `}</style>
      </div>
    );
  };

function App() {
  const [activeDoc, setActiveDoc] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Parallax Logic 
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleOpenDocs = (projectKey) => {
    setActiveDoc(projectKey);
  };

  const handleCloseDocs = () => {
    setActiveDoc(null);
  };

  return (
    <div className="tron-scene">
      {/* 3D Red Tunnel Grid */}
      <div 
        className="tron-grid-container"
        style={{
          transform: `rotateX(${20 - mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg)`
        }}
      >
        <div className="tron-grid tron-grid-floor" />
        <div className="tron-grid tron-grid-ceiling" />
        
        {/* Red Sun Core */}
        <div className="tron-sun" />
        
        <div className="tron-horizon-glow" />
      </div>
      
      {/* Drifting Ash */}
      <Particles />

      {/* Ash Texture Overlay */}
      <div className="noise-overlay" />

      {/* Global Header HUD - Industrial Style */}
      <header style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '70px',
        borderBottom: '2px solid var(--neon-red)',
        background: 'linear-gradient(to bottom, #110000, rgba(17, 0, 0, 0.8))',
        backdropFilter: 'blur(5px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        boxSizing: 'border-box',
        boxShadow: '0 5px 20px rgba(255, 0, 0, 0.2)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1 className="glitch-text" data-text="HUBDEV_AI // DILLINGER_GRID" style={{
            margin: 0,
            fontSize: '1.8rem',
            fontWeight: 800,
            color: 'var(--neon-red)',
            letterSpacing: '4px',
            textTransform: 'uppercase'
            }}>
            HUBDEV_AI // DILLINGER_GRID
            </h1>
            <span style={{ fontSize: '0.7rem', color: '#666', letterSpacing: '2px', marginTop: '4px' }}>
                ACCESS_LEVEL: RESTRICTED
            </span>
        </div>

        <div style={{ display: 'flex', gap: '30px', fontSize: '0.8rem', color: '#888', fontWeight: 'bold' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            SYSTEM: <span style={{ color: '#fff', textShadow: '0 0 5px #fff' }}>ONLINE</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             THREAT: <span style={{ color: 'var(--neon-orange)' }}>ELEVATED</span>
          </span>
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
            color: 'var(--neon-red)', 
            borderBottom: '1px solid var(--neon-red)',
            paddingBottom: '5px',
            textShadow: '0 0 5px var(--neon-red)'
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
              <span style={{ color: '#666' }}>BRAND:</span>
              <span style={{ color: '#fff' }}>sec4Audit</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666' }}>COMPILER:</span>
              <span style={{ color: '#fff' }}>sec4Audit CLI</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666' }}>POLICY:</span>
              <span style={{ color: '#fff' }}>audit / explain / gate</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666' }}>EXT:</span>
              <span style={{ color: 'var(--neon-orange)' }}>.ut / .un</span>
            </li>
          </ul>
        </div>
      </DraggableBox>
      
    </div>
  );
}

export default App;
