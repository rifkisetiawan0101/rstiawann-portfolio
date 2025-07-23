'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Achievement } from '@prisma/client';
import SectionTitle from '@/components/ui/SectionTitle';
import PdfPreviewModal from '@/components/ui/PdfPreviewModal';

const AchievementsSection = ({ achievements }: { achievements: Achievement[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activePdfUrl, setActivePdfUrl] = useState<string | null>(null);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [direction, setDirection] = useState(1);
    const [containerHeight, setContainerHeight] = useState<number | 'auto'>('auto');
    const slideRef = useRef<HTMLDivElement>(null);

    // Efek untuk mengatur item per halaman berdasarkan ukuran layar
    useEffect(() => {
        const getItemsPerPage = () => {
            if (window.innerWidth < 768) return 1; // mobile
            if (window.innerWidth < 1024) return 2; // tablet
            return 3; // desktop
        };
        const handleResize = () => setItemsPerPage(getItemsPerPage());
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Efek untuk mengatur tinggi container secara dinamis
    useEffect(() => {
        const timer = setTimeout(() => {
            if (slideRef.current) {
                setContainerHeight(slideRef.current.scrollHeight);
            }
        }, 100);
        return () => clearTimeout(timer);
    }, [currentIndex, itemsPerPage, achievements]);

    const totalPages = Math.ceil(achievements.length / itemsPerPage);

    const handleNext = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    }, [totalPages]);

    // Efek untuk auto-play carousel
    useEffect(() => {
        const interval = setInterval(handleNext, 5000);
        return () => clearInterval(interval);
    }, [handleNext]);

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
    };

    const currentAchievements = achievements.slice(
        currentIndex * itemsPerPage,
        (currentIndex + 1) * itemsPerPage
    );

    const slideVariants = {
        enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
        center: { zIndex: 1, x: 0, opacity: 1 },
        exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? '100%' : '-100%', opacity: 0 }),
    };

    return (
        <section id="achievements" className="py-20">
            <SectionTitle title="My Certificates" subtitle="Explore the certificates I've earned so far." />
            
            <div className="container mx-auto px-4 flex flex-col items-center">
                <div className="relative flex items-center justify-center w-full max-w-5xl">
                    <button onClick={handlePrev} className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 bg-slate-700/50 hover:bg-slate-700 p-3 rounded-full text-white transition-all z-20" aria-label="Previous Certificates">
                        <ChevronLeft size={24} />
                    </button>

                    <motion.div 
                        className="relative w-full overflow-hidden"
                        animate={{ height: containerHeight }}
                        transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
                    >
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                ref={slideRef}
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ x: { type: "tween", duration: 0.7, ease: "easeInOut" }, opacity: { duration: 0.7 } }}
                                className="absolute w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {currentAchievements.map((item) => (
                                    <div
                                        key={item.id.toString()}
                                        className="bg-slate-800/80 rounded-xl group cursor-pointer flex flex-col overflow-hidden"
                                        onClick={() => item.certificateImage && setActivePdfUrl(item.certificateImage)}
                                    >
                                        <div className="aspect-video overflow-hidden p-8 bg-slate-700/30">
                                            <Image 
                                                src={item.logo}
                                                alt={`${item.title} preview`}
                                                width={200}
                                                height={112}
                                                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-6 text-center flex flex-col flex-grow">
                                            <h3 className="text-lg font-bold text-white">{item.title}</h3>
                                            <p className="text-slate-400 text-sm mt-2 flex-grow">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    <button onClick={handleNext} className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 bg-slate-700/50 hover:bg-slate-700 p-3 rounded-full text-white transition-all z-20" aria-label="Next Certificates">
                        <ChevronRight size={24} />
                    </button>
                </div>
                <p className="mt-8 text-sm text-indigo-400 italic">
                    *Click any card to preview the certificate
                </p>
            </div>

            <AnimatePresence>
                {activePdfUrl && (
                    <PdfPreviewModal 
                        pdfUrl={activePdfUrl} 
                        onClose={() => setActivePdfUrl(null)} 
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default AchievementsSection;
