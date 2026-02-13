import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export default function CinematicStream({ content, onComplete }) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const scrollRef = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    // Reset on content change
    indexRef.current = 0;
    setDisplayedContent('');
    setIsTyping(true);
    let cancelled = false;

    const interval = setInterval(() => {
      if (cancelled) return;
      
      if (indexRef.current < content.length) {
        const charToAdd = content.charAt(indexRef.current);
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
          if (onComplete) onComplete();
        }
      }
    }, 10); // 10ms per char = high speed data

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [content, onComplete]);

  return (
    <div className="cinematic-stream-container">
      <div className="stream-content markdown-body" ref={scrollRef}>
        <ReactMarkdown>{displayedContent}</ReactMarkdown>
        {isTyping && <span className="stream-cursor">▋</span>}
      </div>
      
      {/* HUD Decor */}
      <div className="stream-scanline"></div>
      <div className="stream-status">
        <span>DATA_STREAM: {isTyping ? 'RECEIVING...' : 'COMPLETE'}</span>
        <span>PACKETS: {displayedContent.length} / {content.length}</span>
      </div>
    </div>
  );
}
