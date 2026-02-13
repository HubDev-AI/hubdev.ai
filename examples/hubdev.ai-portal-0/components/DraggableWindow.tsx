import React, { useRef, useState, useEffect } from 'react';
import { DesktopWindow } from '../types';

interface Props {
  window: DesktopWindow;
  onFocus: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  onClose: (id: string) => void;
  children: React.ReactNode;
}

export const DraggableWindow: React.FC<Props> = ({ window, onFocus, onMove, onClose, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only allow drag from header
    const target = e.target as HTMLElement;
    if (!target.closest('.window-drag-handle')) return;

    onFocus(window.id);
    setIsDragging(true);
    
    // Calculate offset from top-left of window to mouse position
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

  if (!window.isOpen) return null;

  const getBorderColor = () => {
    switch (window.accentColor) {
      case 'cyan': return 'border-cyber-cyan/50 shadow-neon-cyan';
      case 'purple': return 'border-cyber-purple/50 shadow-neon-purple';
      case 'red': return 'border-cyber-red/50 shadow-neon-red';
      default: return 'border-cyber-yellow/50';
    }
  };

  const getBgColor = () => {
      switch (window.accentColor) {
        case 'cyan': return 'bg-cyber-cyan';
        case 'purple': return 'bg-cyber-purple';
        case 'red': return 'bg-cyber-red';
        default: return 'bg-cyber-yellow';
      }
  }

  return (
    <div
      ref={containerRef}
      className={`fixed flex flex-col clip-chamfer bg-tech-dark/95 backdrop-blur-md border ${getBorderColor()} transition-shadow duration-300`}
      style={{
        left: window.position.x,
        top: window.position.y,
        zIndex: window.zIndex,
        width: window.width || 400,
        height: window.height || 'auto',
        maxHeight: '80vh',
      }}
      onMouseDown={() => onFocus(window.id)}
    >
      {/* Header */}
      <div 
        className={`window-drag-handle flex items-center justify-between px-3 py-2 ${getBgColor()}/10 border-b border-${window.accentColor}-500/20 cursor-grab active:cursor-grabbing select-none`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
           <div className={`w-2 h-2 ${getBgColor()} rounded-full animate-pulse`}></div>
           <span className={`text-xs font-mono font-bold uppercase tracking-widest text-${window.accentColor === 'yellow' ? 'cyber-yellow' : `cyber-${window.accentColor}`}`}>
             {window.title}
           </span>
        </div>
        
        <div className="flex items-center gap-2">
           <button 
             onClick={(e) => { e.stopPropagation(); onClose(window.id); }}
             className="text-white/50 hover:text-cyber-red transition-colors"
           >
             <span className="material-symbols-outlined text-sm">close</span>
           </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 custom-scrollbar">
        {children}
      </div>
      
      {/* Resizing Handle Decor (not functional, visual only) */}
      <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-${window.accentColor === 'yellow' ? 'cyber-yellow' : `cyber-${window.accentColor}`}/50`} />
    </div>
  );
};
