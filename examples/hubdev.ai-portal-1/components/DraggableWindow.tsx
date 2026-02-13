import React, { useRef, useState, useEffect } from 'react';
import { DesktopWindow } from '../types';

interface Props {
  window: DesktopWindow;
  isFocused: boolean;
  onFocus: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  children: React.ReactNode;
}

export const DraggableWindow: React.FC<Props> = ({ 
    window, isFocused, onFocus, onMove, onClose, onMinimize, onMaximize, children 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only allow drag from header
    const target = e.target as HTMLElement;
    if (!target.closest('.window-drag-handle')) return;
    if (window.isMaximized) return; // Disable drag if maximized

    onFocus(window.id);
    setIsDragging(true);
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
    
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        onMove(window.id, e.clientX - dragOffset.x, e.clientY - dragOffset.y);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, window.id, onMove]);

  // Don't render if minimized (App.tsx handles taskbar representation)
  if (!window.isOpen || window.isMinimized) return null;

  const getBorderColor = () => {
    const base = window.accentColor === 'cyan' ? 'cyber-cyan' 
        : window.accentColor === 'purple' ? 'cyber-purple' 
        : window.accentColor === 'red' ? 'cyber-red' : 'cyber-yellow';
    
    return isFocused 
        ? `border-${base}/60 shadow-[0_0_30px_rgba(var(--${base}-rgb),0.2)]` 
        : `border-${base}/20`;
  };

  const getBgColor = () => {
      switch (window.accentColor) {
        case 'cyan': return 'bg-cyber-cyan';
        case 'purple': return 'bg-cyber-purple';
        case 'red': return 'bg-cyber-red';
        default: return 'bg-cyber-yellow';
      }
  }

  const windowStyle = window.isMaximized 
    ? {
        left: 0,
        top: 48, // Below header
        width: '100%',
        height: 'calc(100vh - 96px)', // Minus header and footer
        borderRadius: 0,
    } 
    : {
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
    };

  return (
    <div
      ref={containerRef}
      className={`fixed flex flex-col clip-chamfer bg-[#050508]/95 backdrop-blur-xl border transition-all duration-200 ${getBorderColor()}`}
      style={{
        ...windowStyle,
        zIndex: window.zIndex,
      }}
      onMouseDown={() => onFocus(window.id)}
    >
      {/* Header */}
      <div 
        className={`window-drag-handle flex items-center justify-between px-3 py-2 ${getBgColor()}/5 border-b border-white/5 ${!window.isMaximized ? 'cursor-grab active:cursor-grabbing' : ''} select-none`}
        onMouseDown={handleMouseDown}
        onDoubleClick={() => onMaximize(window.id)}
      >
        <div className="flex items-center gap-3">
           <div className={`flex items-center justify-center w-4 h-4 ${getBgColor()}/10 border border-${window.accentColor === 'yellow' ? 'cyber-yellow' : `cyber-${window.accentColor}`}/30 clip-chamfer`}>
                <div className={`w-1.5 h-1.5 ${getBgColor()} rounded-full ${isFocused ? 'animate-pulse' : ''}`}></div>
           </div>
           <span className={`text-xs font-mono font-bold uppercase tracking-[0.2em] text-${window.accentColor === 'yellow' ? 'cyber-yellow' : `cyber-${window.accentColor}`} drop-shadow-md`}>
             {window.title}
           </span>
        </div>
        
        <div className="flex items-center gap-1">
           <button 
             onClick={(e) => { e.stopPropagation(); onMinimize(window.id); }}
             className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-cyber-cyan hover:bg-white/5 transition-colors"
             title="Minimize"
           >
             <span className="material-symbols-outlined text-[14px]">remove</span>
           </button>
           <button 
             onClick={(e) => { e.stopPropagation(); onMaximize(window.id); }}
             className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-cyber-cyan hover:bg-white/5 transition-colors"
             title="Maximize"
           >
             <span className="material-symbols-outlined text-[12px]">{window.isMaximized ? 'fullscreen_exit' : 'crop_square'}</span>
           </button>
           <button 
             onClick={(e) => { e.stopPropagation(); onClose(window.id); }}
             className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-cyber-red hover:bg-cyber-red/10 transition-colors ml-1"
             title="Close"
           >
             <span className="material-symbols-outlined text-[14px]">close</span>
           </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 overflow-auto custom-scrollbar p-0">
            {children}
        </div>
      </div>
      
      {/* Footer/Status Bar of Window */}
      <div className="h-6 border-t border-white/5 bg-black/40 flex items-center justify-between px-3 text-[9px] font-mono text-white/30">
          <span>{window.isMaximized ? 'FULLSCREEN_MODE' : `${window.size.width}x${window.size.height}`}</span>
          <span>PID: {Math.floor(Math.random() * 9000) + 1000}</span>
      </div>

      {/* Resize Handle (Visual) */}
      {!window.isMaximized && (
        <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-${window.accentColor === 'yellow' ? 'cyber-yellow' : `cyber-${window.accentColor}`}/30 cursor-nwse-resize`} />
      )}
    </div>
  );
};
