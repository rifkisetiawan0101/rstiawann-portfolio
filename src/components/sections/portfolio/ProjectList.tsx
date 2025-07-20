'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@prisma/client';
import ProjectCard from './ProjectCard';
import ContributionModal from './ContributionModal';

const ProjectList = ({ projects }: { projects: Project[] }) => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

    const filterGroups = [
        { name: 'All', key: 'All' },
        { name: 'Fullstack Development', key: 'FULLSTACK' },
        { name: 'Game Development', key: 'GAME' },
        { name: 'Other Projects', key: 'OTHER' },
    ];

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'All') {
            return projects;
        }
        return projects.filter(p => p.category === activeFilter);
    }, [activeFilter, projects]);

    return (
        <>
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
                {filterGroups.map(group => (
                    <button
                        key={group.key}
                        onClick={() => setActiveFilter(group.key)}
                        className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeFilter === group.key ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'}`}
                    >
                        {group.name}
                    </button>
                ))}
            </div>
            
            {/* Project Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {filteredProjects.map((p) => (
                        <ProjectCard 
                            key={p.id.toString()} 
                            project={p} 
                            onOpenModal={setActiveModalProject} 
                        />
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Contribution Modal */}
            <AnimatePresence>
                {activeModalProject && (
                    <ContributionModal 
                        project={activeModalProject} 
                        onClose={() => setActiveModalProject(null)} 
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default ProjectList;
