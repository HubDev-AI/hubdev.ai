import React, { useState } from 'react';
import { DraggableWindow } from './components/DraggableWindow';
import { ProjectCard } from './components/ProjectCard';
import { Terminal } from './components/Terminal';
import { DesktopWindow, WindowType } from './types';
import { PROJECTS } from './constants';

export default function App() {
  const [windows, setWindows] = useState<DesktopWindow[]>([
    {
      id: 'untrusted-window',
      type: WindowType.PROJECT,
      title: 'UNTRUSTED.EXE', // Renamed from AILANG
      isOpen: true,
      isMinimized: false,
      zIndex: 10,
      position: { x: 50, y: 80 },
      width: 420,
      accentColor: 'cyan',
    },
    {
      id: 'mkly-window',
      type: WindowType.PROJECT,
      title: 'MKLY.DAT', // Renamed from MILKLY
      isOpen: true,
      isMinimized: false,
      zIndex: 9,
      position: { x: 500, y: 120 },
      width: 420,
      accentColor: 'purple',
    },
  ]);

  const [topZIndex, setTopZIndex] = useState(10);

  const focusWindow = (id: string) => {
    const newZ = topZIndex + 1;
    setTopZIndex(newZ);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: newZ } : w));
  };

  const moveWindow = (id: string, x: number, y: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, position: { x, y } } : w));
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
  };

  const openTerminal = () => {
    const termId = 'terminal-main';
    const existing = windows.find(w => w.id === termId);
    
    if (existing) {
        setWindows(prev => prev.map(w => w.id === termId ? { ...w, isOpen: true, zIndex: topZIndex + 1 } : w));
        setTopZIndex(prev => prev + 1);
    } else {
        const newTerm: DesktopWindow = {
            id: termId,
            type: WindowType.TERMINAL,
            title: 'BASH_TERMINAL_V2',
            isOpen: true,
            isMinimized: false,
            zIndex: topZIndex + 1,
            position: { x: 200, y: 200 },
            width: 500,
            height: 350,
            accentColor: 'red',
        };
        setWindows(prev => [...prev, newTerm]);
        setTopZIndex(prev => prev + 1);
    }
  };

  const toggleProject = (projectId: string) => {
      const windowId = `${projectId}-window`;
      const existing = windows.find(w => w.id === windowId);
      if (existing) {
          if (!existing.isOpen) {
             setWindows(prev => prev.map(w => w.id === windowId ? { ...w, isOpen: true, zIndex: topZIndex + 1 } : w));
             setTopZIndex(prev => prev + 1);
          } else {
             focusWindow(windowId);
          }
      }
  }

  return (
    <div className="relative min-h-screen w-full bg-void-black font-display overflow-hidden select-none">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-scanlines opacity-50 z-50 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-cyber-grid bg-[size:40px_40px] opacity-20 [transform:perspective(1000px)_rotateX(20deg)_scale(1.1)] origin-top"></div>
        
        {/* Glow Orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyber-purple/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyber-red/5 blur-[100px] rounded-full"></div>
      </div>

      {/* Main Container / Desktop Surface */}
      <div className="relative z-10 w-full h-screen flex flex-col">
        
        {/* Header / Status Bar */}
        <header className="flex flex-col gap-1 p-4 border-b border-cyber-cyan/20 bg-void-black/80 backdrop-blur-sm z-40">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold tracking-tighter text-white hover:animate-glitch cursor-default">
                        HUBDEV<span className="text-cyber-cyan">.AI</span>
                    </h1>
                    <div className="px-2 py-0.5 border border-cyber-purple/50 text-[10px] text-cyber-purple font-mono bg-cyber-purple/10 clip-chamfer">
                        SYSTEM_V.1.0_BETA
                    </div>
                </div>
                <div className="flex items-center gap-4 font-mono text-[10px] text-white/50">
                    <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-cyber-cyan rounded-full animate-pulse"></span>
                        NET: CONNECTED
                    </span>
                    <span className="text-cyber-yellow">MEM: 64%</span>
                </div>
            </div>
        </header>

        {/* Desktop Area - This is where windows float */}
        <main className="flex-1 relative overflow-hidden p-6">
            
            {/* Background Static Elements (Shortcut Icons) */}
            <div className="absolute left-6 top-6 flex flex-col gap-6 z-0">
                <div className="group cursor-pointer opacity-80 hover:opacity-100" onClick={() => toggleProject('untrusted')}>
                     <div className="w-16 h-16 bg-tech-gray border border-cyber-cyan/30 clip-chamfer flex items-center justify-center mb-2 group-hover:bg-cyber-cyan/10 transition-colors">
                        <span className="material-symbols-outlined text-cyber-cyan text-3xl">terminal</span>
                     </div>
                     <span className="text-[10px] font-mono text-cyan-300 bg-black/50 px-1">UNTRUSTED.EXE</span>
                </div>
                
                <div className="group cursor-pointer opacity-80 hover:opacity-100" onClick={() => toggleProject('mkly')}>
                     <div className="w-16 h-16 bg-tech-gray border border-cyber-purple/30 clip-chamfer flex items-center justify-center mb-2 group-hover:bg-cyber-purple/10 transition-colors">
                        <span className="material-symbols-outlined text-cyber-purple text-3xl">data_object</span>
                     </div>
                     <span className="text-[10px] font-mono text-purple-300 bg-black/50 px-1">MILKLY.DAT</span>
                </div>
            </div>

            {/* Render Windows */}
            {windows.map(window => (
                <DraggableWindow
                    key={window.id}
                    window={window}
                    onFocus={focusWindow}
                    onMove={moveWindow}
                    onClose={closeWindow}
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

        {/* Footer / Taskbar */}
        <footer className="border-t border-white/10 bg-void-black/90 backdrop-blur p-2 z-50">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={openTerminal}
                        className="flex items-center gap-2 px-4 py-2 bg-cyber-red/10 text-cyber-red border border-cyber-red/30 hover:bg-cyber-red hover:text-black transition-all clip-corner-tl font-mono text-xs font-bold uppercase"
                    >
                        <span className="material-symbols-outlined text-sm">power_settings_new</span>
                        Connect_Terminal
                    </button>
                    
                    <div className="h-6 w-px bg-white/10"></div>
                    
                    <div className="flex flex-col text-[9px] font-mono text-white/40">
                         <span>&gt; SYSTEM_LOGS:</span>
                         <span className="text-white/70">AWAITING INPUT...</span>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-[9px] font-mono text-white/30 uppercase tracking-widest">
                    <span>Server: US-EAST-1</span>
                    <span>HubDev.AI // CORP</span>
                </div>
            </div>
        </footer>

      </div>
      
      {/* CRT Flicker Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] crt-overlay opacity-20 animate-flicker"></div>
    </div>
  );
}
