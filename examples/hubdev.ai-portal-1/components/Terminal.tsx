import React, { useState, useEffect, useRef } from 'react';

export const Terminal: React.FC = () => {
  const [lines, setLines] = useState<string[]>([
    "HUBDEV_OS v1.0.4 [Kernel 4.19.0]",
    "Copyright (c) 2024 HubDev AI Corp.",
    "",
    "Initializing secure connection...",
    "Done.",
    "User: GUEST_ACCESS",
    "Type 'help' for available commands.",
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const newLines = [...lines, `> ${cmd}`];
    
    switch (cmd.toLowerCase().trim()) {
      case 'help':
        newLines.push(
            "Available commands:",
            "  ls           List active modules",
            "  status       Check system integrity",
            "  whoami       Current user session",
            "  clear        Clear terminal",
            "  exit         Close session"
        );
        break;
      case 'ls':
        newLines.push(
            "drwx------  2 root  root  4096 Oct 20 10:42 .",
            "drwxr-xr-x 18 root  root  4096 Oct 20 10:00 ..",
            "-rwx------  1 user  auth  8.2M Oct 20 10:41 AILANG.EXE",
            "-rw-r--r--  1 user  data  2.4M Oct 20 10:41 MILKLY.DAT"
        );
        break;
      case 'status':
        newLines.push(
            "SYSTEM STATUS: OPTIMAL",
            "LATENCY: 12ms",
            "UPTIME: 99.999%",
            "LIQUID COOLING: ACTIVE"
        );
        break;
      case 'clear':
        setLines([]);
        setInput('');
        return;
      case 'whoami':
        newLines.push("GUEST_USER_0921");
        break;
      default:
        if (cmd.trim() !== '') {
            newLines.push(`Command not found: ${cmd}`);
        }
    }
    
    setLines(newLines);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div className="font-mono text-xs h-full flex flex-col bg-black p-1">
      <div className="flex-1 overflow-auto space-y-1 pb-2">
        {lines.map((line, i) => (
          <div key={i} className={line.startsWith('>') ? 'text-cyber-yellow' : 'text-gray-400'}>
            {line}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex items-center gap-2 border-t border-white/10 pt-2">
        <span className="text-cyber-red animate-pulse">{'>'}</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none text-white flex-1 focus:ring-0 placeholder-white/20"
          placeholder="Enter command..."
          autoFocus
        />
      </div>
    </div>
  );
};
