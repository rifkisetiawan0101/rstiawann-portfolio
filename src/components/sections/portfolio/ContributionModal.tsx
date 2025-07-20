import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '@prisma/client';
import { X } from 'lucide-react';

interface ContributionModalProps {
    project: Project;
    onClose: () => void;
}

const ContributionModal = ({ project, onClose }: ContributionModalProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                    <X size={24} />
                </button>
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <h4 className="font-semibold text-indigo-400 mt-6 mb-3">My Contributions:</h4>
                <ul className="list-disc list-inside text-slate-300 space-y-2">
                    {project.contributions.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </motion.div>
        </motion.div>
    );
};

export default ContributionModal;
