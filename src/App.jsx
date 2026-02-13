import React, { useState, useEffect, useRef } from 'react';
import Particles from './components/Particles';
import DraggableBox from './components/DraggableBox';
import ProjectCard from './components/ProjectCard';
import DocsBox from './components/DocsBox';

import CinematicStream from './components/CinematicStream';
import Hologram from './components/Hologram';
import projects from './data'; // Import dynamic data

// View Modes
const VIEW_MODES = {
  OVERVIEW: 'OVERVIEW',
  // Dynamic modes will match project IDs from data
  MKLY: 'mkly',
  UNTRUSTED: 'untrusted'
};

// Map URL path to viewMode
function getViewModeFromPath(pathname) {
  const path = pathname.replace(/^\//, '').toLowerCase();
  const project = projects.find(p => p.id === path);
  return project ? project.id : VIEW_MODES.OVERVIEW;
}

function App() {
  // Initialize viewMode from the current URL path
  const [viewMode, setViewMode] = useState(() => getViewModeFromPath(window.location.pathname));
  const [activeDocDialog, setActiveDocDialog] = useState(null); // project.id
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // --- Box Position Persistence ---
  // Parse initial box positions from URL query params (e.g. ?mkly=100,150&eco=100,600)
  const [boxPositions, setBoxPositions] = useState(() => {
    const defaults = {};
    projects.forEach(p => { defaults[p.id] = { x: p.cardInitialX, y: p.cardInitialY }; });
    defaults.eco = { x: 100, y: 600 };

    const params = new URLSearchParams(window.location.search);
    for (const [key, val] of params.entries()) {
      if (key === 'loaded') continue; // skip stream loaded param
      const parts = val.split(',').map(Number);
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        defaults[key] = { x: parts[0], y: parts[1] };
      }
    }
    return defaults;
  });

  const boxUrlUpdateTimer = useRef(null);
  const handleBoxPositionChange = React.useCallback((id, x, y) => {
    setBoxPositions(prev => {
      const next = { ...prev, [id]: { x, y } };
      // Debounced URL update
      clearTimeout(boxUrlUpdateTimer.current);
      boxUrlUpdateTimer.current = setTimeout(() => {
        const params = new URLSearchParams();
        Object.entries(next).forEach(([k, v]) => {
          params.set(k, `${v.x},${v.y}`);
        });
        window.history.replaceState(null, '', `/?${params.toString()}`);
      }, 300);
      return next;
    });
  }, []);

  // Track which streams have completed their animation (per-project)
  const loadedStreamsRef = useRef((() => {
    const set = new Set();
    // If initial URL has ?loaded, mark the current project as loaded
    const params = new URLSearchParams(window.location.search);
    if (params.has('loaded')) {
      const projectId = getViewModeFromPath(window.location.pathname);
      if (projectId !== VIEW_MODES.OVERVIEW) {
        set.add(projectId);
      }
    }
    return set;
  })());
  // Force re-render trigger when loadedStreams changes
  const [, forceUpdate] = useState(0);
  const loadedStreams = loadedStreamsRef.current;

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

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const newMode = getViewModeFromPath(window.location.pathname);
      setViewMode(newMode);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync URL, document title, and SEO meta tags when viewMode changes
  useEffect(() => {
    const baseUrl = 'https://hubdev.ai';
    const defaultTitle = 'HubDev AI — Next-Gen Developer Tools & Security Primitives';
    const defaultDesc = "Explore HubDev AI's cutting-edge developer tools: mkly, a human-readable markup language that compiles to HTML5, and Untrusted<T>, a backend security primitive enforcing security-by-construction.";

    // Build target URL — include box positions on overview, ?loaded on streams
    let targetPath;
    if (viewMode === VIEW_MODES.OVERVIEW) {
      const params = new URLSearchParams();
      Object.entries(boxPositions).forEach(([k, v]) => {
        params.set(k, `${v.x},${v.y}`);
      });
      const qs = params.toString();
      targetPath = qs ? `/?${qs}` : '/';
    } else {
      targetPath = `/${viewMode}`;
      if (loadedStreams.has(viewMode)) {
        const project = projects.find(p => p.id === viewMode);
        if (project) {
          targetPath = `/${viewMode}?loaded=${project.streamContent.length}`;
        }
      }
    }

    const currentFullPath = window.location.pathname + window.location.search;
    if (currentFullPath !== targetPath) {
      window.history.pushState({ viewMode }, '', targetPath);
    }

    let title, description, url;

    if (viewMode === VIEW_MODES.OVERVIEW) {
      title = defaultTitle;
      description = defaultDesc;
      url = `${baseUrl}/`;
    } else {
      const project = projects.find(p => p.id === viewMode);
      if (project) {
        title = `${project.title} — HubDev AI`;
        description = project.seoDescription || defaultDesc;
        url = `${baseUrl}/${project.id}`;
      } else {
        title = defaultTitle;
        description = defaultDesc;
        url = `${baseUrl}/`;
      }
    }

    // Document title
    document.title = title;

    // Helper to update or create a meta tag
    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (el) {
        el.setAttribute('content', content);
      } else {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        el.setAttribute('content', content);
        document.head.appendChild(el);
      }
    };

    // Update meta tags
    setMeta('name', 'description', description);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', url);

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);

    // Twitter
    setMeta('property', 'twitter:title', title);
    setMeta('property', 'twitter:description', description);
    setMeta('property', 'twitter:url', url);
  }, [viewMode]);

  // Update Body Theme Class and Colors based on viewMode
  useEffect(() => {
    document.body.className = ''; // Reset class
    document.documentElement.style.removeProperty('--neon-primary');
    document.documentElement.style.removeProperty('--neon-accent');

    if (viewMode !== VIEW_MODES.OVERVIEW) {
      const project = projects.find(p => p.id === viewMode);
      if (project) {
        // Apply Theme Class
        if (project.themeClass) {
          document.body.classList.add(project.themeClass);
        }
        // Apply Dynamic Colors from JSON
        if (project.themeColors) {
            document.documentElement.style.setProperty('--neon-primary', project.themeColors.primary);
            document.documentElement.style.setProperty('--neon-accent', project.themeColors.accent);
        }
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
    setActiveDocDialog(null);
    setViewMode(key);
  };

  const handleReturnToOverview = () => {
    setViewMode(VIEW_MODES.OVERVIEW);
  };

  // Find active project data
  const activeDialogProject = activeDocDialog ? projects.find(p => p.id === activeDocDialog) : null;
  const activeStreamProject = viewMode !== VIEW_MODES.OVERVIEW ? projects.find(p => p.id === viewMode) : null;

  // When stream finishes, mark it loaded and update URL
  const handleStreamComplete = React.useCallback((packetCount) => {
    const projectId = window.location.pathname.replace(/^\//, '');
    loadedStreams.add(projectId);
    const path = window.location.pathname;
    window.history.replaceState(null, '', `${path}?loaded=${packetCount}`);
    forceUpdate(n => n + 1);
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
        
        {/* Atmospheric Polish */}
        <div className="vignette"></div>
        <div className="scanline"></div>
      </div>

      {/* 
        Main Content Layer 
      */}
      <main className="ui-layer" role="main" aria-label="HubDev AI Dashboard">
        
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
            <div 
                onClick={handleReturnToOverview} 
                style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
            >
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
                 id={project.id}
                 initialX={boxPositions[project.id]?.x ?? project.cardInitialX} 
                 initialY={boxPositions[project.id]?.y ?? project.cardInitialY}
                 isCritical={project.isCritical}
                 onPositionChange={handleBoxPositionChange}
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
            <DraggableBox
              id="eco"
              initialX={boxPositions.eco?.x ?? 100}
              initialY={boxPositions.eco?.y ?? 600}
              onPositionChange={handleBoxPositionChange}
            >
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
                <>
                    {/* Backdrop overlay - click outside to close */}
                    <div 
                        onClick={handleCloseDialog}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 999,
                            background: 'rgba(0, 0, 0, 0.4)',
                        }}
                    />
                    <DocsBox 
                        title={activeDialogProject.dialogTitle}
                        content={activeDialogProject.summaryContent}
                        onClose={handleCloseDialog}
                        initialX={window.innerWidth / 2 - 275}
                        initialY={window.innerHeight / 2 - 200}
                        onLaunchStream={() => handleLaunchStream(activeDialogProject.id)}
                        isCritical={activeDialogProject.isCritical}
                        boxTheme={activeDialogProject.boxTheme}
                    />
                </>
            )}
            
            {/* Animated Hologram - Overview Only */}
            <Hologram />
          </>
        )}

        {/* 
           VIEW: CINEMATIC STREAM (Project Deep Dive)
        */}
        {activeStreamProject && (
            <CinematicStream 
                content={activeStreamProject.streamContent}
                onComplete={handleStreamComplete}
                skipAnimation={loadedStreams.has(viewMode)}
            />
        )}


        {/* 
           NAVIGATION BAR (Persistent)
           Allows switching between Overview and Stream(s)
        */}
        <nav className="nav-bar" aria-label="Project Navigation">
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

      </main>
    </div>
  );
}

export default App;
