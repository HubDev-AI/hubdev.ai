import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export default function CinematicStream({ content, onComplete }) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    let index = 0;
    setDisplayedContent('');
    setIsTyping(true);

    const interval = setInterval(() => {
      // Stream speed: 2 chars per tick for "fast but readable" data stream
      if (index < content.length) {
        setDisplayedContent((prev) => prev + content.charAt(index));
        index++;
        
        // Auto-scroll to bottom while typing
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        setIsTyping(false);
        if (onComplete) onComplete();
      }
    }, 10); // 10ms per char = high speed data

    return () => clearInterval(interval);
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
