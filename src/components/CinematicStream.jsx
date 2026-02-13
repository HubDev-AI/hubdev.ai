import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { markdownComponents } from './markdownComponents';

export default function CinematicStream({ content, onComplete, skipAnimation = false }) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [phase, setPhase] = useState(skipAnimation ? 'streaming' : 'revealing');
  const scrollRef = useRef(null);
  const indexRef = useRef(0);

  // Lightsaber reveal phase — wait for animation to finish before streaming
  useEffect(() => {
    if (phase !== 'revealing') return;
    const timer = setTimeout(() => setPhase('streaming'), 900); // match CSS animation duration
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    // Don't start streaming until reveal is done
    if (phase !== 'streaming') return;

    // If skipping animation, show everything immediately
    if (skipAnimation) {
      setDisplayedContent(content);
      setIsTyping(false);
      if (onComplete) onComplete(content.length);
      return;
    }

    // Reset on content change
    indexRef.current = 0;
    setDisplayedContent('');
    setIsTyping(true);
    let cancelled = false;

    const interval = setInterval(() => {
      if (cancelled) return;
      
      if (indexRef.current < content.length) {
        indexRef.current++;
        setDisplayedContent(content.substring(0, indexRef.current));
        
        // Auto-scroll to bottom while typing
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        if (!cancelled) {
          setIsTyping(false);
          if (onComplete) onComplete(content.length);
        }
      }
    }, 10); // 10ms per char = high speed data

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [content, onComplete, skipAnimation, phase]);

  return (
    <div className={`cinematic-stream-container ${phase === 'revealing' ? 'revealing' : 'revealed'}`}>
      <div className="stream-content markdown-body" ref={scrollRef}>
        <ReactMarkdown components={markdownComponents}>{displayedContent}</ReactMarkdown>
        {isTyping && <span className="stream-cursor">▋</span>}
      </div>
      
      {/* HUD Decor */}
      <div className="stream-scanline"></div>
      <div className="stream-status">
        <span>DATA_STREAM: {phase === 'revealing' ? 'INITIALIZING...' : isTyping ? 'RECEIVING...' : 'COMPLETE'}</span>
        <span>PACKETS: {displayedContent.length} / {content.length}</span>
      </div>
    </div>
  );
}
