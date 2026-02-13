import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Cpu, Activity, Lock, Unlock, AlertTriangle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Particles from './components/Particles';
import DraggableBox from './components/DraggableBox';
import ProjectCard from './components/ProjectCard';
import DocsBox from './components/DocsBox';
import CinematicStream from './components/CinematicStream';
import projects from './data'; // Import dynamic data

// View Modes
const VIEW_MODES = {
  OVERVIEW: 'OVERVIEW',
  // Dynamic modes will match project IDs from data
  MKLY: 'mkly',
  UNTRUSTED: 'untrusted'
};



function App() {
  const [viewMode, setViewMode] = useState(VIEW_MODES.OVERVIEW);
  const [activeDocDialog, setActiveDocDialog] = useState(null); // project.id
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle Mouse Move for Parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update Body Theme Class based on viewMode
  useEffect(() => {
    document.body.className = ''; // Reset
    if (viewMode !== VIEW_MODES.OVERVIEW) {
      const project = projects.find(p => p.id === viewMode);
      if (project && project.themeClass) {
        document.body.classList.add(project.themeClass);
      }
    }
  }, [viewMode]);

  const handleOpenDialog = (key) => {
    setActiveDocDialog(key);
  };

  const handleCloseDialog = () => {
    setActiveDocDialog(null);
  };

  const handleLaunchStream = (key) => {
    // 1. Close Dialog
    setActiveDocDialog(null);
    // 2. Switch View Mode to project ID
    setViewMode(key);
  };

  const handleReturnToOverview = () => {
    setViewMode(VIEW_MODES.OVERVIEW);
  };

  // Find active project data
  const activeDialogProject = activeDocDialog ? projects.find(p => p.id === activeDocDialog) : null;
  const activeStreamProject = viewMode !== VIEW_MODES.OVERVIEW ? projects.find(p => p.id === viewMode) : null;

  // Stable handler using useCallback
  const handleStreamComplete = React.useCallback(() => {
    console.log('Stream Complete');
  }, []);



  return (
    <div className="app-container">
      {/* 
        Global Background - Always present but styles change via CSS classes 
      */}
      <div className="tron-scene">
        {/* 3D Tunnel Grid (Responsive to Theme with Tilt) */}
        <div 
          className="tron-grid-container"
          style={{
            transform: `rotateX(${20 - mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg)`
          }}
        >
          <div className="tron-grid tron-grid-floor"></div>
          <div className="tron-grid tron-grid-ceiling"></div>
          
          <div className="tron-sun"></div>
          <div className="tron-horizon-glow"></div>
        </div>
        
        {/* Particles */}
        <Particles />
      </div>

      {/* 
        Main Content Layer 
      */}
      <div className="ui-layer">
        
        {/* Header - Always Visible */}
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

        {/* 
           VIEW: OVERVIEW (Project Cards)
        */}
        {viewMode === VIEW_MODES.OVERVIEW && (
          <>
            {projects.map((project) => (
               <DraggableBox 
                 key={project.id}
                 initialX={project.cardInitialX} 
                 initialY={project.cardInitialY}
                 isCritical={project.isCritical}
               >
                 <div onClick={() => handleOpenDialog(project.id)} style={{ cursor: 'pointer' }}>
                   <ProjectCard 
                     title={project.cardTitle} 
                     description={project.cardDesc}
                     links={[]}
                     tags={project.cardTags}
                     securityLevel={project.cardSecurityLevel}
                   />
                 </div>
               </DraggableBox>
            ))}

            {/* Ecosystem Data Box - STATIC (Not in JSON per request for project separation only) */}
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
            
            {activeDialogProject && (
                <DocsBox 
                    title={activeDialogProject.dialogTitle}
                    content={activeDialogProject.summaryContent}
                    onClose={handleCloseDialog}
                    initialX={window.innerWidth / 2 - 275}
                    initialY={window.innerHeight / 2 - 200}
                    onLaunchStream={() => handleLaunchStream(activeDialogProject.id)}
                    isCritical={activeDialogProject.isCritical}
                />
            )}
          </>
        )}

        {/* 
           VIEW: CINEMATIC STREAM (Project Deep Dive)
        */}
        {activeStreamProject && (
            <CinematicStream 
                content={activeStreamProject.streamContent}
                onComplete={handleStreamComplete}
            />
        )}


        {/* 
           NAVIGATION BAR (Persistent)
           Allows switching between Overview and Stream(s)
        */}
        <nav className="nav-bar">
            <button 
                className={`nav-tab ${viewMode === VIEW_MODES.OVERVIEW ? 'active' : ''}`}
                onClick={handleReturnToOverview}
            >
                Overview
            </button>
            
            {projects.map(project => (
                <button
                    key={project.id}
                    className={`nav-tab ${viewMode === project.id ? 'active' : ''}`}
                    onClick={() => handleLaunchStream(project.id)}
                >
                    {project.navLabel}
                </button>
            ))}
        </nav>

      </div>
    </div>
  );
}

export default App;
