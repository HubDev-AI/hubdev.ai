import React from 'react';

const Hologram = () => {
  return (
    <div className="hologram-container">
      <div className="holo-ring ring-1"></div>
      <div className="holo-ring ring-2"></div>
      <div className="holo-ring ring-3"></div>
      <div className="holo-core"></div>
      <div className="holo-scan"></div>
      
      <div className="holo-label">SYSTEM_MONITOR</div>

      <style>{`
        .hologram-container {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 120px;
          height: 120px;
          pointer-events: none;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .holo-ring {
          position: absolute;
          border: 1px solid var(--neon-primary);
          border-radius: 50%;
          box-shadow: 0 0 5px var(--neon-primary);
          opacity: 0.6;
        }

        .ring-1 {
          width: 100%;
          height: 100%;
          border-bottom-color: transparent;
          animation: holo-spin 4s linear infinite;
        }

        .ring-2 {
          width: 80%;
          height: 80%;
          border-left-color: transparent;
          border-right-color: transparent;
          animation: holo-spin 3s linear infinite reverse;
        }

        .ring-3 {
          width: 60%;
          height: 60%;
          border-top-color: transparent;
          border-style: dashed;
          animation: holo-spin 6s linear infinite;
        }

        .holo-core {
          width: 20%;
          height: 20%;
          background: var(--neon-primary);
          border-radius: 50%;
          box-shadow: 0 0 20px var(--neon-primary);
          animation: holo-pulse 2s ease-in-out infinite alternate;
        }
        
        /* Conical Scan Effect */
        .holo-scan {
           position: absolute;
           top: 50%;
           left: 50%;
           width: 100%;
           height: 100%; /* Height of the beam */
           background: conic-gradient(
             from 0deg, 
             transparent 0deg, 
             transparent 20deg, 
             rgba(255, 255, 255, 0.1) 40deg, 
             transparent 50deg
           );
           transform-origin: top left; /* Pivot from center */
           margin-top: -50%;
           margin-left: -50%;
           border-radius: 50%;
           animation: holo-spin 5s linear infinite;
           opacity: 0.3;
           pointer-events: none;
           clip-path: circle(50%);
        }

        .holo-label {
          position: absolute;
          bottom: -25px;
          font-family: var(--font-tech);
          font-size: 0.7rem;
          color: var(--neon-primary);
          letter-spacing: 2px;
          text-shadow: 0 0 5px var(--neon-primary);
          white-space: nowrap;
          animation: text-flicker 3s infinite;
        }

        @keyframes holo-spin {
          0% { transform: rotate3d(1, 1, 1, 0deg); }
          100% { transform: rotate3d(1, 1, 1, 360deg); }
        }

        @keyframes holo-pulse {
          0% { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(1.2); opacity: 1; }
        }
        
        @keyframes text-flicker {
            0%, 100% { opacity: 1; }
            5% { opacity: 0.2; }
            10% { opacity: 1; }
            15% { opacity: 0.8; }
            50% { opacity: 1; }
            55% { opacity: 0.5; }
            60% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Hologram;
