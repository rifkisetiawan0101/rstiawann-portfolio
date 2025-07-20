import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '@prisma/client';
import { Github, Youtube, ExternalLink, BookText, ChevronDown, ChevronUp } from 'lucide-react';
import ProjectMedia from './ProjectMedia';

const ProjectCard = ({ project, onOpenModal }: { project: Project; onOpenModal: (project: Project) => void; }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const overviewText = project.overview || ''; 
    const shortOverview = overviewText.substring(0, 100) + (overviewText.length > 100 ? '...' : '');
    
    // Konversi tipe JsonValue dari Prisma ke objek yang bisa kita gunakan
    const links = project.links as { trailer?: string; github?: string; live?: string; itch?: string; };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
            <div 
                className="bg-slate-800/70 rounded-lg overflow-hidden flex flex-col h-full transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/20"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div className="w-full aspect-video">
                    <ProjectMedia 
                        image={project.image} 
                        videoUrl={links?.trailer} 
                        isHovering={isHovering}
                    />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map(tag => <span key={tag} className="bg-indigo-600/20 text-indigo-300 text-xs font-medium px-2 py-1 rounded-full">{tag}</span>)}
                    </div>
                    
                    <div className="text-slate-400 text-sm mb-4 flex-grow">
                        <p>
                            {isExpanded ? overviewText : shortOverview}
                        </p>
                        {overviewText.length > 100 && (
                            <button onClick={() => setIsExpanded(!isExpanded)} className="text-indigo-400 hover:text-indigo-300 font-semibold mt-2 text-xs inline-flex items-center gap-1">
                                {isExpanded ? 'See Less' : 'See More'}
                                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>
                        )}
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-700/50 flex flex-col gap-3">
                        {project.contributions?.length > 0 && (
                            <button 
                                onClick={() => onOpenModal(project)}
                                className="w-full text-center bg-slate-700 text-slate-200 hover:bg-slate-600 font-semibold text-sm py-2 px-4 rounded-md transition-colors inline-flex items-center justify-center gap-2"
                            >
                                <BookText size={16} /> See Contributions
                            </button>
                        )}
                        <div className="grid grid-cols-3 gap-2 text-sm">
                            {links?.trailer && <a href={links.trailer} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-indigo-400 bg-slate-700/50 hover:bg-slate-700 p-2 rounded-md flex items-center justify-center gap-1.5 transition-colors"><Youtube size={16}/> Trailer</a>}
                            {links?.github && <a href={links.github} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-indigo-400 bg-slate-700/50 hover:bg-slate-700 p-2 rounded-md flex items-center justify-center gap-1.5 transition-colors"><Github size={16}/> Docs</a>}
                            {links?.live && <a href={links.live} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-indigo-400 bg-slate-700/50 hover:bg-slate-700 p-2 rounded-md flex items-center justify-center gap-1.5 transition-colors"><ExternalLink size={16}/> Live</a>}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
