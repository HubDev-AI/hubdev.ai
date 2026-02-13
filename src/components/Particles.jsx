import React, { useState, useEffect } from 'react';

// Atmospheric Ash / Embers
// Extracted from App.jsx Internal Implementation
const Particles = () => {
    const [particles, setParticles] = useState([]);
  
    useEffect(() => {
      const interval = setInterval(() => {
        const id = Math.random();
        const startX = Math.random() * 100 + '%';
        const startY = '110%'; 
        const duration = 5 + Math.random() * 10 + 's';
        const size = Math.random() * 3 + 'px';
        // Slice -50 to match App.jsx exactly
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

export default Particles;
