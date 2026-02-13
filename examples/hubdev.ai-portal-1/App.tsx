import React, { useState, useEffect } from 'react';
import { DraggableWindow } from './components/DraggableWindow';
import { ProjectCard } from './components/ProjectCard';
import { Terminal } from './components/Terminal';
import { DesktopWindow, WindowType } from './types';
import { PROJECTS } from './constants';

type BootState = 'OFF' | 'BIOS' | 'LOADING' | 'DESKTOP';

export default function App() {
  const [bootState, setBootState] = useState<BootState>('OFF');
  const [windows, setWindows] = useState<DesktopWindow[]>([
    {
      id: 'untrusted-window',
      type: WindowType.PROJECT,
      title: 'UNTRUSTED_ENV',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 50, y: 50 },
      size: { width: 550, height: 600 },
      accentColor: 'cyan',
    },
    {
      id: 'mkly-window',
      type: WindowType.PROJECT,
      title: 'MKLY_BUILDER',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 9,
      position: { x: 650, y: 80 },
      size: { width: 550, height: 600 },
      accentColor: 'purple',
    },
  ]);

  const [topZIndex, setTopZIndex] = useState(10);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

  // Boot Sequence Effect
  useEffect(() => {
    // Start boot sequence
    const t1 = setTimeout(() => setBootState('BIOS'), 500);
    const t2 = setTimeout(() => setBootState('LOADING'), 2500);
    const t3 = setTimeout(() => setBootState('DESKTOP'), 4500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const focusWindow = (id: string) => {
    const newZ = topZIndex + 1;
    setTopZIndex(newZ);
    setActiveWindowId(id);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w));
  };

  const moveWindow = (id: string, x: number, y: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, position: { x, y } } : w));
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const minimizeWindow = (id: string) => {
      setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
      setActiveWindowId(null);
  };

  const maximizeWindow = (id: string) => {
      setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
      focusWindow(id);
  };

  const openTerminal = () => {
    const termId = 'terminal-main';
    const existing = windows.find(w => w.id === termId);
    
    if (existing) {
        setWindows(prev => prev.map(w => w.id === termId ? { ...w, isOpen: true, isMinimized: false, zIndex: topZIndex + 1 } : w));
        focusWindow(termId);
    } else {
        const newTerm: DesktopWindow = {
            id: termId,
            type: WindowType.TERMINAL,
            title: 'ROOT_ACCESS',
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: topZIndex + 1,
            position: { x: 200, y: 200 },
            size: { width: 500, height: 350 },
            accentColor: 'red',
        };
        setWindows(prev => [...prev, newTerm]);
        focusWindow(termId);
    }
  };

  const toggleProject = (projectId: string) => {
      const windowId = `${projectId}-window`;
      const existing = windows.find(w => w.id === windowId);
      if (existing) {
          if (!existing.isOpen || existing.isMinimized) {
             focusWindow(windowId);
          } else {
             // If already open and focused, do nothing or bring to front
             focusWindow(windowId);
          }
      }
  }

  // --- RENDERING HELPERS ---

  if (bootState === 'OFF') {
      return <div className="bg-black w-full h-screen"></div>;
  }

  if (bootState === 'BIOS') {
      return (
          <div className="bg-black w-full h-screen font-mono text-xs text-white/70 p-8 cursor-wait">
              <div className="space-y-1">
                  <p>HUBDEV BIOS v4.0.2</p>
                  <p>Check System Health... OK</p>
                  <p>Memory Test: 64GB OK</p>
                  <p>Loading Kernel Modules...</p>
                  <p className="text-cyber-cyan"> > sec4_audit.sys loaded</p>
                  <p className="text-cyber-purple"> > mkly_render.sys loaded</p>
                  <br/>
                  <p className="animate-pulse">Initializing Graphical Shell...</p>
              </div>
          </div>
      );
  }

  if (bootState === 'LOADING') {
      return (
          <div className="bg-black w-full h-screen flex flex-col items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-scanlines opacity-20"></div>
               <div className="w-64 h-1 bg-gray-800 rounded overflow-hidden">
                   <div className="h-full bg-cyber-cyan animate-[width_2s_ease-in-out_forwards]" style={{width: '0%'}}></div>
               </div>
               <p className="mt-4 font-mono text-xs text-cyber-cyan tracking-[0.5em] animate-pulse">AUTHENTICATING</p>
          </div>
      )
  }

  // DESKTOP STATE
  return (
    <div className="relative min-h-screen w-full bg-[#030304] font-display overflow-hidden select-none text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-scanlines opacity-30 z-50 mix-blend-overlay"></div>
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-cyber-grid bg-[size:50px_50px] opacity-10 [transform:perspective(500px)_rotateX(20deg)_scale(1.5)] origin-top animate-[scan_20s_linear_infinite]"></div>
        
        {/* Ambient Glows */}
        <div className="absolute top-[20%] left-[20%] w-[30%] h-[30%] bg-cyber-purple/5 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[30%] h-[30%] bg-cyber-cyan/5 blur-[150px] rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full h-screen flex flex-col">
        
        {/* Status Bar */}
        <header className="flex shrink-0 items-center justify-between px-6 py-2 bg-black/60 backdrop-blur-md border-b border-white/5 z-50">
            <div className="flex items-center gap-4">
                 <div className="text-lg font-bold tracking-tighter text-white flex items-center gap-1 group">
                    <span className="material-symbols-outlined text-cyber-red animate-pulse">hub</span>
                    HUBDEV<span className="text-cyber-cyan">.AI</span>
                 </div>
                 <div className="h-4 w-px bg-white/10"></div>
                 <span className="text-[10px] font-mono text-white/40 tracking-widest">WS_NODE_09</span>
            </div>
            
            <div className="flex items-center gap-6 font-mono text-[10px] text-white/50">
                <span className="hover:text-cyber-cyan transition-colors cursor-help">CPU: 12%</span>
                <span className="hover:text-cyber-purple transition-colors cursor-help">RAM: 8.4GB</span>
                <span className="text-cyber-yellow">SECURE_LINK</span>
            </div>
        </header>

        {/* Desktop Surface */}
        <main className="flex-1 relative overflow-hidden">
            
            {/* Desktop Icons */}
            <div className="absolute left-6 top-8 flex flex-col gap-8 z-0">
                <div 
                    className="group flex flex-col items-center gap-2 cursor-pointer w-20"
                    onClick={() => toggleProject('untrusted')}
                    onDoubleClick={() => toggleProject('untrusted')}
                >
                     <div className="w-14 h-14 bg-black/40 border border-cyber-cyan/30 clip-chamfer flex items-center justify-center group-hover:bg-cyber-cyan/20 group-hover:border-cyber-cyan transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                        <span className="material-symbols-outlined text-cyber-cyan text-2xl">security</span>
                     </div>
                     <span className="text-[9px] font-mono text-center text-cyan-200 bg-black/70 px-1.5 py-0.5 rounded-sm border border-transparent group-hover:border-cyan-500/30">Untrusted.ut</span>
                </div>
                
                <div 
                    className="group flex flex-col items-center gap-2 cursor-pointer w-20"
                    onClick={() => toggleProject('mkly')}
                    onDoubleClick={() => toggleProject('mkly')}
                >
                     <div className="w-14 h-14 bg-black/40 border border-cyber-purple/30 clip-chamfer flex items-center justify-center group-hover:bg-cyber-purple/20 group-hover:border-cyber-purple transition-all duration-300 shadow-[0_0_15px_rgba(188,19,254,0.1)]">
                        <span className="material-symbols-outlined text-cyber-purple text-2xl">dataset</span>
                     </div>
                     <span className="text-[9px] font-mono text-center text-purple-200 bg-black/70 px-1.5 py-0.5 rounded-sm border border-transparent group-hover:border-purple-500/30">Mkly.dat</span>
                </div>

                <div 
                    className="group flex flex-col items-center gap-2 cursor-pointer w-20 opacity-50 hover:opacity-100"
                    onClick={openTerminal}
                >
                     <div className="w-14 h-14 bg-black/40 border border-white/10 clip-chamfer flex items-center justify-center group-hover:bg-white/10 group-hover:border-white transition-all duration-300">
                        <span className="material-symbols-outlined text-white text-2xl">terminal</span>
                     </div>
                     <span className="text-[9px] font-mono text-center text-gray-400 bg-black/70 px-1.5 py-0.5 rounded-sm">Terminal</span>
                </div>
            </div>

            {/* Windows */}
            {windows.map(window => (
                <DraggableWindow
                    key={window.id}
                    window={window}
                    isFocused={activeWindowId === window.id}
                    onFocus={focusWindow}
                    onMove={moveWindow}
                    onClose={closeWindow}
                    onMinimize={minimizeWindow}
                    onMaximize={maximizeWindow}
                >
                    {window.type === WindowType.PROJECT && window.id === 'untrusted-window' && (
                        <ProjectCard project={PROJECTS[0]} />
                    )}
                    {window.type === WindowType.PROJECT && window.id === 'mkly-window' && (
                        <ProjectCard project={PROJECTS[1]} />
                    )}
                    {window.type === WindowType.TERMINAL && (
                        <Terminal />
                    )}
                </DraggableWindow>
            ))}

        </main>

        {/* Taskbar Dock */}
        <footer className="h-12 border-t border-white/10 bg-black/80 backdrop-blur-xl z-50 flex items-center px-4 justify-between">
            <div className="flex items-center gap-2 h-full">
                 <button 
                    onClick={openTerminal}
                    className="h-8 w-8 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-sm transition-colors border border-white/5"
                    title="Start Terminal"
                 >
                    <span className="material-symbols-outlined text-sm text-cyber-red">apps</span>
                 </button>
                 
                 <div className="h-6 w-px bg-white/10 mx-2"></div>

                 {/* Active Tasks */}
                 <div className="flex items-center gap-1">
                    {windows.filter(w => w.isOpen).map(window => (
                        <button
                            key={window.id}
                            onClick={() => window.isMinimized ? focusWindow(window.id) : minimizeWindow(window.id)}
                            className={`
                                h-8 px-3 flex items-center gap-2 border-b-2 transition-all
                                ${activeWindowId === window.id && !window.isMinimized
                                    ? `bg-white/10 border-${window.accentColor === 'yellow' ? 'cyber-yellow' : `cyber-${window.accentColor}`}` 
                                    : 'bg-transparent border-transparent hover:bg-white/5'
                                }
                            `}
                        >
                            <div className={`w-1.5 h-1.5 rounded-full bg-${window.accentColor === 'yellow' ? 'cyber-yellow' : `cyber-${window.accentColor}`}`}></div>
                            <span className={`text-[10px] font-mono uppercase ${window.isMinimized ? 'text-white/30' : 'text-white/80'}`}>
                                {window.title}
                            </span>
                        </button>
                    ))}
                 </div>
            </div>

            <div className="flex items-center gap-3 text-[10px] font-mono text-white/30">
                <span className="animate-pulse">ONLINE</span>
                <span>{new Date().toLocaleTimeString()}</span>
            </div>
        </footer>

      </div>
      
      {/* CRT Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] crt-overlay opacity-10 animate-flicker mix-blend-hard-light"></div>
    </div>
  );
}
