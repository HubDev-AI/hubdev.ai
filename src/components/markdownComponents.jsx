/* eslint-disable react-refresh/only-export-components */
import React, { useState, useCallback } from 'react';
import { Clipboard, Check } from 'lucide-react';

/**
 * Linkify patterns inside code blocks.
 * Detects github.com URLs, npm @scope/packages, and https:// URLs.
 */
const URL_PATTERNS = [
  { regex: /(github\.com\/[\w-.]+\/[\w-.]+(?:\/[\w-.]*)*)/g, toHref: (m) => `https://${m}` },
  { regex: /(https?:\/\/[^\s]+)/g, toHref: (m) => m },
  { regex: /(@[\w-]+\/[\w-]+)/g, toHref: (m) => `https://www.npmjs.com/package/${m}` },
];

export function linkifyCode(text) {
  const matches = [];
  for (const { regex, toHref } of URL_PATTERNS) {
    let match;
    const re = new RegExp(regex.source, regex.flags);
    while ((match = re.exec(text)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      const overlap = matches.some(m => start < m.end && end > m.start);
      if (!overlap) {
        matches.push({ start, end, text: match[1], href: toHref(match[1]) });
      }
    }
  }

  if (matches.length === 0) return text;

  matches.sort((a, b) => a.start - b.start);

  const parts = [];
  let lastIndex = 0;
  matches.forEach((m, i) => {
    if (m.start > lastIndex) parts.push(text.slice(lastIndex, m.start));
    parts.push(
      <a key={i} href={m.href} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: '3px' }}>
        {m.text}
      </a>
    );
    lastIndex = m.end;
  });
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

/**
 * Copy button for code blocks — themed, animated, semi-transparent
 */
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      // Strip comment lines (lines starting with #) before copying
      const commandOnly = text.split('\n').filter(l => !l.trimStart().startsWith('#')).join('\n').trim();
      await navigator.clipboard.writeText(commandOnly);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silent fail
    }
  }, [text]);

  return (
    <button
      onClick={(e) => { e.stopPropagation(); handleCopy(); }}
      aria-label="Copy to clipboard"
      style={{
        position: 'absolute',
        top: '50%',
        right: '8px',
        transform: 'translateY(-50%)',
        background: 'transparent',
        border: '1px solid',
        borderColor: copied
          ? 'rgba(255, 255, 255, 0.6)'
          : 'var(--neon-primary, rgba(0, 243, 255, 0.3))',
        borderRadius: '4px',
        padding: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: copied ? 1 : 0.4,
        transition: 'all 0.3s ease',
        color: copied
          ? 'rgba(255, 255, 255, 0.9)'
          : 'var(--neon-primary, rgba(0, 243, 255, 0.7))',
        backdropFilter: 'blur(4px)',
        zIndex: 2,
      }}
      onMouseEnter={(e) => {
        if (!copied) {
          e.currentTarget.style.opacity = '0.9';
          e.currentTarget.style.borderColor = 'var(--neon-primary, rgba(0, 243, 255, 0.7))';
          e.currentTarget.style.boxShadow = '0 0 12px var(--neon-primary, rgba(0, 243, 255, 0.2))';
        }
      }}
      onMouseLeave={(e) => {
        if (!copied) {
          e.currentTarget.style.opacity = '0.4';
          e.currentTarget.style.borderColor = 'var(--neon-primary, rgba(0, 243, 255, 0.3))';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      {copied ? (
        <Check size={14} style={{ animation: 'fadeInScale 0.3s ease' }} />
      ) : (
        <Clipboard size={14} />
      )}
    </button>
  );
}

/**
 * Custom ReactMarkdown components:
 *  - <a> opens in new tab with noopener
 *  - <pre> gets a copy button overlay
 *  - <code> inside fenced blocks gets linkified URLs
 */
export const markdownComponents = {
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
  ),
  pre: ({ children }) => {
    // Recursively extract raw text from React element tree
    const extractText = (node) => {
      if (typeof node === 'string') return node;
      if (typeof node === 'number') return String(node);
      if (!node) return '';
      if (Array.isArray(node)) return node.map(extractText).join('');
      if (React.isValidElement(node) && node.props?.children) {
        return extractText(node.props.children);
      }
      return '';
    };

    const rawText = extractText(children).trim();

    return (
      <pre style={{ position: 'relative' }}>
        {rawText && <CopyButton key={rawText} text={rawText} />}
        {children}
      </pre>
    );
  },
  code: ({ children, className }) => {
    if (className) {
      const text = typeof children === 'string' ? children : String(children);
      return <code className={className}>{linkifyCode(text)}</code>;
    }
    return <code className={className}>{children}</code>;
  },
};
