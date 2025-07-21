'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Definisikan tipe untuk props
interface PdfPreviewModalProps {
    pdfUrl: string | null;
    onClose: () => void;
}

const PdfPreviewModal = ({ pdfUrl, onClose }: PdfPreviewModalProps) => {
    if (!pdfUrl) return null;
    const embedUrl = `${pdfUrl}#toolbar=0&navpanes=0`;

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" 
            onClick={onClose}
        >
            <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 30 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-slate-800 rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col p-4 relative" 
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute -top-4 -right-4 bg-slate-700 p-2 rounded-full text-white hover:bg-slate-600 z-10">
                    <X size={24} />
                </button>
                <iframe 
                    src={embedUrl} 
                    className="w-full h-full border-0 rounded-md" 
                    title="PDF Preview"
                ></iframe>
            </motion.div>
        </motion.div>
    );
};

export default PdfPreviewModal;
