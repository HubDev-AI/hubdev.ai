import React, { useState } from 'react';
import { ProjectData } from '../types';

interface Props {
  project: ProjectData;
}

type Tab = 'SYSTEM' | 'MANUAL' | 'SOURCE';

export const ProjectCard: React.FC<Props> = ({ project }) => {
  const [activeTab, setActiveTab] = useState<Tab>('SYSTEM');

  const accentText = project.accent === 'cyan' ? 'text-cyber-cyan' : project.accent === 'purple' ? 'text-cyber-purple' : 'text-cyber-red';
  const accentBorder = project.accent === 'cyan' ? 'border-cyber-cyan' : project.accent === 'purple' ? 'border-cyber-purple' : 'border-cyber-red';
  const accentBg = project.accent === 'cyan' ? 'bg-cyber-cyan' : project.accent === 'purple' ? 'bg-cyber-purple' : 'bg-cyber-red';

  return (
    <div className="flex flex-col h-full bg-[#0a0a0f]">
        {/* Project Header (Image) */}
        <div className="relative h-40 shrink-0 overflow-hidden border-b border-white/10 group">
             <div 
                className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-80 transition-all duration-700 scale-100 group-hover:scale-105"
                style={{ backgroundImage: `url("${project.imageUrl}")` }}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent`}></div>
            <div className={`absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-transparent to-transparent`}></div>
            
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tighter text-white mb-1 flex items-center gap-2">
                        {project.name}
                        <span className={`text-[10px] px-1.5 py-0.5 border ${accentBorder} ${accentText} rounded-sm opacity-70`}>v1.0</span>
                    </h1>
                    <p className="text-gray-400 font-mono text-xs">{project.description}</p>
                </div>
            </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-2 border-b border-white/10 bg-black/20 sticky top-0 z-10 backdrop-blur-sm">
            {(['SYSTEM', 'MANUAL', 'SOURCE'] as Tab[]).map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                        px-4 py-1.5 text-[10px] font-mono font-bold tracking-wider transition-all clip-chamfer
                        ${activeTab === tab 
                            ? `${accentBg} text-black shadow-[0_0_15px_rgba(0,0,0,0.5)]` 
                            : `text-white/40 hover:text-white hover:bg-white/5`
                        }
                    `}
                >
                    {tab}
                </button>
            ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 custom-scrollbar">
            
            {/* TAB: SYSTEM INFO */}
            {activeTab === 'SYSTEM' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-white/5 border border-white/5 rounded-sm">
                            <span className="block text-[9px] text-white/30 uppercase mb-1">Status</span>
                            <span className={`font-mono text-sm ${accentText} animate-pulse`}>{project.status}</span>
                        </div>
                        <div className="p-3 bg-white/5 border border-white/5 rounded-sm">
                            <span className="block text-[9px] text-white/30 uppercase mb-1">Executable</span>
                            <span className="font-mono text-sm text-gray-300">{project.exe}</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[10px] text-white/40 uppercase tracking-widest mb-3 border-b border-white/10 pb-1">Tech Stack</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {project.techStack.map((tech, i) => (
                                <div key={i} className={`p-2 bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:${accentBorder}/30 transition-colors group`}>
                                    <div className={`text-[8px] ${accentText} opacity-50 mb-1 group-hover:opacity-100`}>{tech.label}</div>
                                    <div className="text-xs font-bold text-gray-200">{tech.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                         <h3 className="text-[10px] text-white/40 uppercase tracking-widest mb-3 border-b border-white/10 pb-1">Module Overview</h3>
                         <p className="font-mono text-xs text-gray-400 leading-relaxed">
                            {project.overview}
                         </p>
                    </div>

                    <a 
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex items-center justify-center w-full py-3 ${accentBg}/10 border ${accentBorder} ${accentText} hover:bg-${accentText}/20 hover:brightness-125 transition-all uppercase font-bold text-xs tracking-widest`}
                    >
                        Initialize Repository
                    </a>
                </div>
            )}

            {/* TAB: MANUAL / SPECS */}
            {activeTab === 'MANUAL' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {project.specs.map((spec, idx) => (
                        <div key={idx} className="relative">
                            <div className="flex items-center gap-2 mb-3">
                                <span className={`w-1 h-1 ${accentBg}`}></span>
                                <h3 className="text-sm font-bold text-white tracking-wide">{spec.title}</h3>
                            </div>
                            
                            <div className="pl-3 border-l border-white/10 ml-0.5 space-y-3">
                                <p className="text-xs text-gray-400 font-mono leading-relaxed">
                                    {spec.content}
                                </p>
                                
                                {spec.list && (
                                    <ul className="space-y-1 mt-2">
                                        {spec.list.map((item, i) => (
                                            <li key={i} className="text-[10px] text-gray-500 font-mono flex items-start gap-2">
                                                <span className="text-white/20 mt-1">›</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {spec.code && (
                                    <div className="mt-3 bg-black border border-white/10 p-3 overflow-x-auto group">
                                        <pre className={`font-mono text-[10px] ${accentText} opacity-80 group-hover:opacity-100 transition-opacity`}>
                                            {spec.code}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* TAB: SOURCE CODE */}
            {activeTab === 'SOURCE' && (
                <div className="font-mono text-xs h-full flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-center justify-between text-[10px] text-gray-500 mb-2 px-2">
                        <span>/src/main{project.techStack[2].value}</span>
                        <span>READ_ONLY</span>
                    </div>
                    <div className="flex-1 bg-[#050505] border border-white/10 p-4 overflow-auto custom-scrollbar relative">
                        {/* Line Numbers Decoration */}
                        <div className="absolute left-0 top-4 bottom-4 w-8 border-r border-white/5 flex flex-col items-end pr-2 text-white/10 select-none">
                            {Array.from({length: 20}).map((_, i) => <div key={i}>{i+1}</div>)}
                        </div>
                        
                        <pre className="pl-8 text-gray-300">
                            <code>{project.commandPreview + '\n\n' + (project.specs[0].code || "// Loading source...")}</code>
                        </pre>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};
