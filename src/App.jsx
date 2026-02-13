import React, { useState, useEffect } from 'react';
import DraggableBox from './components/DraggableBox';
import ProjectCard from './components/ProjectCard';
import DocsBox from './components/DocsBox';
import CinematicStream from './components/CinematicStream';

// --- DATA SEPARATION ---

// 1. Summary Data (For the "Dialog Box" in Overview)
// Restored from previous user request
const SUMMARY_DATA = {
  mkly: `
## mkly Markup Language

A human-readable, AI-friendly markup language that compiles to HTML.

### Features
- **Zero-Config**: Works out of the box.
- **Type-Safe**: Schema validation via Zod.
- **Clean Output**: Semantic HTML5.

### Quick Start
\`\`\`bash
npm install @milkly/mkly
\`\`\`
  `,
  untrusted: `
## Untrusted<T> Language

Backend-focused, AI-operable programming language with security-by-construction.

### Core Concepts
- **Untrusted<T>**: Tainted data wrapper.
- **sec4Audit**: Security policy enforcer.
- **Policy-as-Code**: Define security gates.

### Levels
- **NORMAL**: Standard.
- **CRITICAL**: Explicit declassification.
  `
};

// 2. Stream Data (For the "Cinematic Deep Dive")
// Detailed specs for the full-screen terminal experience
const STREAM_DATA = {
  mkly: `
## mkly Data Stream // v1.0.4

INITTIATING PROTOCOL...
Establishing connection to neural link...
Target: HUMAN-READABLE MARKUP LANGUAGE

### > TRANSMISSION START

**mkly** is a next-generation markup language designed for seamless AI-Human collaboration. It compiles directly to semantic HTML5, prioritizing readability and type safety.

### > CORE CAPABILITIES

*   **Zero-Configuration**: Deploys instantly with standard tooling chains.
*   **Type-Safety Enforced**: Rigorous schema validation via Zod intercepts errors pre-compile.
*   **Semantic Output**: Generates clean, accessible HTML5 structures.

### > QUICK START SEQUENCE

\`\`\`bash
npm install @milkly/mkly
# Repo: github.com/HubDev-AI/mkly
\`\`\`

### > STATUS
SYSTEM: OPTIMAL
COMPILER: ACTIVE
  `,
  
  untrusted: `
## Untrusted<T> Security Protocol // v2.1

WARNING: POTENTIAL TAINT DETECTED
INITTIATING SEC4AUDIT SCANS...
Target: BACKEND SECURITY PRIMITIVES

### > TRANSMISSION START

**Untrusted<T>** is a backend-focused, AI-operable programming language primitive that enforces "Security by Construction". It wraps tainted data types to prevent accidental usage in sensitive sinks.

### > SECURITY GATES

*   **Taint Tracking**: Wraps all external inputs in \`Untrusted<T>\`.
*   **sec4Audit Compiler**: Enforces policy-as-code before build.
*   **Explicit Declassification**: Requires intentional developer override for critical operations.

### > THREAT LEVELS

*   **NORMAL**: Standard operation permitted.
*   **CRITICAL**: Requires explicit endorsement signatures.

### > ACCESS REPO
\`\`\`bash
git clone github.com/HubDev-AI/untrusted-compiler
\`\`\`
  `
};

const VIEW_MODES = {
    OVERVIEW: 'overview',
    MKLY: 'mkly',
    UNTRUSTED: 'untrusted'
};

// Atmospheric Ash / Embers
const Particles = () => {
    const [particles, setParticles] = useState([]);
  
    useEffect(() => {
      const interval = setInterval(() => {
        const id = Math.random();
        const startX = Math.random() * 100 + '%';
        const startY = '110%'; 
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
  const [viewMode, setViewMode] = useState(VIEW_MODES.OVERVIEW);
  
  // Dialog State (Restored)
  const [activeDocDialog, setActiveDocDialog] = useState(null);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Update Body Theme based on Mode
  useEffect(() => {
    document.body.className = ''; // Reset
    if (viewMode === VIEW_MODES.MKLY) document.body.classList.add('theme-mkly');
    if (viewMode === VIEW_MODES.UNTRUSTED) document.body.classList.add('theme-untrusted');
  }, [viewMode]);

  // Parallax Logic 
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handlers
  const handleOpenDialog = (key) => {
      setActiveDocDialog(key);
  };
  const handleCloseDialog = () => {
      setActiveDocDialog(null);
  };
  const handleLaunchStream = (key) => {
      // Transition to Stream Mode
      handleCloseDialog();
      if (key === 'mkly') setViewMode(VIEW_MODES.MKLY);
      if (key === 'untrusted') setViewMode(VIEW_MODES.UNTRUSTED);
  };

  return (
    <div className="tron-scene">
      {/* 3D Tunnel Grid (Responsive to Theme) */}
      <div 
        className="tron-grid-container"
        style={{
          transform: `rotateX(${20 - mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg)`
        }}
      >
        <div className="tron-grid tron-grid-floor" />
        <div className="tron-grid tron-grid-ceiling" />
        
        {/* Core Sun */}
        <div className="tron-sun" />
        <div className="tron-horizon-glow" />
      </div>
      
      {/* Drifting Ash */}
      <Particles />

      {/* Global Header HUD */}
      <header style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '70px',
        borderBottom: '2px solid var(--neon-primary)',
        background: 'linear-gradient(to bottom, #110000, rgba(17, 0, 0, 0.8))',
        backdropFilter: 'blur(5px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        boxSizing: 'border-box',
        boxShadow: '0 5px 20px rgba(0,0,0, 0.5)',
        transition: 'border-color 0.5s ease'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1 className="glitch-text" data-text="HUBDEV_AI // SYSTEM_V2" style={{
            margin: 0,
            fontSize: '1.8rem',
            fontWeight: 800,
            color: 'var(--neon-primary)',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            transition: 'color 0.5s ease'
            }}>
            HUBDEV_AI // SYSTEM_V2
            </h1>
            <span style={{ fontSize: '0.7rem', color: '#666', letterSpacing: '2px', marginTop: '4px' }}>
                ACCESS_LEVEL: RESTRICTED
            </span>
        </div>

        <div style={{ display: 'flex', gap: '30px', fontSize: '0.8rem', color: '#888', fontWeight: 'bold' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            MODE: <span style={{ color: '#fff', textShadow: '0 0 5px #fff' }}>{viewMode.toUpperCase()}</span>
          </span>
        </div>
      </header>

      {/* OVERVIEW MODE: Draggable Cards & Restore Dialogs */}
      {viewMode === VIEW_MODES.OVERVIEW && (
        <>
            {/* mkly Project Card */}
            <DraggableBox initialX={100} initialY={150}>
                <div onClick={() => handleOpenDialog('mkly')} style={{ cursor: 'pointer' }}>
                <ProjectCard 
                    title="mkly" 
                    description="TARGET: MARKUP LANGUAGE. CLICK FOR SPECS."
                    links={[]}
                    tags={['MARKUP', 'AI_Interface', 'V1.0']}
                    securityLevel="NORMAL"
                />
                </div>
            </DraggableBox>

            {/* Untrusted<T> Project Card */}
            <DraggableBox initialX={500} initialY={150} isCritical={true}>
                <div onClick={() => handleOpenDialog('untrusted')} style={{ cursor: 'pointer' }}>
                <ProjectCard 
                    title="Untrusted<T>" 
                    description="WARNING: UNTRUSTED UNPUTS. CLICK FOR PROTOCOLS."
                    links={[]}
                    tags={['SEC4AUDIT', '.UT', 'COMPILER']}
                    securityLevel="CRITICAL"
                />
                </div>
            </DraggableBox>

            {/* Ecosystem Data Box */}
            <DraggableBox initialX={100} initialY={600}>
                <div style={{ color: 'var(--text-color)', fontFamily: 'var(--font-tech)' }}>
                <h4 style={{ 
                    margin: '0 0 10px 0', 
                    color: 'var(--neon-primary)', 
                    borderBottom: '1px solid var(--neon-primary)',
                    paddingBottom: '5px',
                    textShadow: '0 0 5px var(--neon-primary)'
                }}>
                    ECOSYSTEM_MANIFEST
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', lineHeight: '1.8' }}>
                    <li>SYSTEM: ONLINE</li>
                    <li>THREAT: ELEVATED</li>
                    <li>GRID: STABLE</li>
                </ul>
                </div>
            </DraggableBox>

            {/* RESTORED DIALOG BOXES */}
            {activeDocDialog && (
                <DocsBox 
                    title={activeDocDialog === 'mkly' ? 'MKLY_SUMMARY' : 'UNTRUSTED_SUMMARY'}
                    content={SUMMARY_DATA[activeDocDialog]}
                    onClose={handleCloseDialog}
                    initialX={window.innerWidth / 2 - 225}
                    initialY={window.innerHeight / 2 - 200}
                    onLaunchStream={() => handleLaunchStream(activeDocDialog)}
                />
            )}
        </>
      )}

      {/* CINEMATIC STREAM MODE: mkly */}
      {viewMode === VIEW_MODES.MKLY && (
          <CinematicStream 
            content={STREAM_DATA.mkly} 
          />
      )}

      {/* CINEMATIC STREAM MODE: untrusted */}
      {viewMode === VIEW_MODES.UNTRUSTED && (
          <CinematicStream 
            content={STREAM_DATA.untrusted} 
          />
      )}

      {/* NAVIGATION BAR */}
      <nav className="nav-bar">
          <button 
            className={`nav-tab ${viewMode === VIEW_MODES.OVERVIEW ? 'active' : ''}`}
            onClick={() => setViewMode(VIEW_MODES.OVERVIEW)}
          >
            Overview
          </button>
          <button 
            className={`nav-tab ${viewMode === VIEW_MODES.MKLY ? 'active' : ''}`}
            onClick={() => setViewMode(VIEW_MODES.MKLY)}
          >
            mkly_Protocol
          </button>
          <button 
            className={`nav-tab ${viewMode === VIEW_MODES.UNTRUSTED ? 'active' : ''}`}
            onClick={() => setViewMode(VIEW_MODES.UNTRUSTED)}
          >
            Untrusted_Sec
          </button>
      </nav>
      
    </div>
  );
}

export default App;
