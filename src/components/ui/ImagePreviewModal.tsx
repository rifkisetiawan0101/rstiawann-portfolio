'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Definisikan tipe props yang baru dan lebih sederhana
interface ImagePreviewModalProps {
    imageUrl: string | null;
    onClose: () => void;
}

const ImagePreviewModal = ({ imageUrl, onClose }: ImagePreviewModalProps) => {
    return (
        <AnimatePresence>
            {imageUrl && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 600 }}
                        animate={{ opacity: 1, y: 30 }}
                        exit={{ opacity: 0, y: 600 }}
                        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                        className="bg-slate-800 rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col p-4 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button onClick={onClose} className="absolute -top-4 -right-4 bg-slate-700 p-2 rounded-full text-white hover:bg-slate-600 z-10">
                            <X size={24} />
                        </button>
                        <img 
                            src={imageUrl} 
                            alt="Image Preview"
                            className="w-full h-full object-contain"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ImagePreviewModal;
