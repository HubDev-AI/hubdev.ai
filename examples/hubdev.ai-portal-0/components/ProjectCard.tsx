import React from 'react';
import { ProjectData } from '../types';

interface Props {
  project: ProjectData;
  isCompact?: boolean;
}

export const ProjectCard: React.FC<Props> = ({ project, isCompact = false }) => {
  const accentText = project.accent === 'cyan' ? 'text-cyber-cyan' : project.accent === 'purple' ? 'text-cyber-purple' : 'text-cyber-red';
  const accentBorder = project.accent === 'cyan' ? 'border-cyber-cyan' : project.accent === 'purple' ? 'border-cyber-purple' : 'border-cyber-red';
  const accentBg = project.accent === 'cyan' ? 'bg-cyber-cyan' : project.accent === 'purple' ? 'bg-cyber-purple' : 'bg-cyber-red';

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Top Section: Image and Basic Info */}
      <div className={`relative group border ${accentBorder}/30 bg-tech-gray clip-chamfer overflow-hidden`}>
          <div className="flex flex-row h-32">
            <div className={`relative w-1/3 border-r ${accentBorder}/20 overflow-hidden`}>
                <div 
                    className="w-full h-full bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity filter contrast-125"
                    style={{ backgroundImage: `url("${project.imageUrl}")` }}
                />
                <div className={`absolute inset-0 ${accentBg}/20 mix-blend-overlay`}></div>
            </div>
            
            <div className="p-3 flex flex-col justify-between flex-grow w-2/3 relative">
                <div className={`absolute top-0 right-0 w-4 h-4 border-t border-r ${accentBorder}`}></div>
                
                <div>
                    <div className="flex justify-between items-start mb-1">
                        <h4 className="text-white text-lg font-bold tracking-tight uppercase">
                            {project.name.split('.')[0]}<span className={accentText}>{project.exe.replace(project.name.split('.')[0], '')}</span>
                        </h4>
                    </div>
                    <p className="text-gray-400 text-[10px] leading-tight font-mono mb-2">
                        {project.description}
                    </p>
                </div>

                <div className="flex justify-between items-end">
                    <span className={`text-[9px] font-mono ${accentText} animate-pulse`}>STATUS: {project.status}</span>
                </div>
            </div>
        </div>
      </div>

      {/* Details Section */}
      {!isCompact && (
          <div className="space-y-4 font-mono text-xs">
              
              {/* Tech Stack Grid */}
              <div className="grid grid-cols-3 gap-2">
                  {project.techStack.map((tech, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 p-2 flex flex-col items-center justify-center text-center clip-corner-br hover:border-white/30 transition-colors">
                          <span className={`text-[8px] ${accentText} opacity-70 mb-1`}>{tech.label}</span>
                          <span className="text-white font-bold">{tech.value}</span>
                      </div>
                  ))}
              </div>

              {/* Description */}
              <div className="p-3 bg-black/30 border-l-2 border-white/10 text-gray-300 leading-relaxed text-[11px]">
                  {project.longDescription}
              </div>

               {/* Features */}
               <div>
                  <h5 className={`text-[10px] font-bold ${accentText} mb-2 uppercase tracking-wider`}>Key Modules</h5>
                  <ul className="space-y-1">
                      {project.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2 text-gray-400">
                              <span className={`w-1 h-1 ${accentBg}`}></span>
                              {feat}
                          </li>
                      ))}
                  </ul>
               </div>

              {/* Code Snippet / Terminal Preview */}
              <div className="relative group">
                  <div className={`absolute -inset-0.5 ${accentBg} opacity-20 blur group-hover:opacity-40 transition-opacity`}></div>
                  <div className="relative bg-[#0d0d12] border border-white/10 p-3 font-mono text-[10px] text-gray-300 overflow-hidden">
                      {project.commandPreview && (
                          <div className={`mb-2 pb-2 border-b border-white/5 ${accentText}`}>
                              {project.commandPreview}
                          </div>
                      )}
                      <pre className="whitespace-pre-wrap font-mono text-gray-400">
                          {project.codeSnippet}
                      </pre>
                  </div>
              </div>

               {/* Action Button */}
               <a 
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-center w-full py-3 ${accentBg} text-black font-bold uppercase tracking-wider hover:brightness-110 transition-all clip-chamfer shadow-lg`}
               >
                   <span className="material-symbols-outlined text-sm mr-2">code</span>
                   Access Source
               </a>
          </div>
      )}
    </div>
  );
};
