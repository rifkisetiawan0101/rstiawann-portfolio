'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Copy, Linkedin, Github, Instagram, Gamepad2, ArrowDownCircle } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import TypingText from '@/lib/TypingText';
import { personalInfo } from '@/lib/data';
import PdfPreviewModal from '@/components/ui/PdfPreviewModal';

const HeroSection = () => {
    const [isCopied, setIsCopied] = useState(false);
    const [isCvModalOpen, setIsCvModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const copyEmail = () => {
        navigator.clipboard.writeText(personalInfo.email).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }).catch(err => console.error('Gagal menyalin email: ', err));
    };

    return (
    <>
        <section id="home" className="min-h-screen flex items-center pt-16">
            <div className="container mb-12 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="flex justify-center">
                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                            <div className="absolute inset-0 bg-indigo-600 rounded-full blur-2xl opacity-50"></div>
                            <Image 
                                src={personalInfo.profilePicture} 
                                alt="Rifki Setiawan"
                                width={320}
                                height={320}
                                priority // Penting untuk LCP (Largest Contentful Paint)
                                className="relative w-full h-full object-cover rounded-full border-4 border-slate-700" 
                            />
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                            Greetings! I'm <br /> <span className="text-indigo-400">{personalInfo.name}</span>
                        </h1>
                        <div className="mt-4 text-lg lg:text-xl text-slate-200 font-medium h-10 flex justify-center md:justify-start items-center gap-2">
                            <TypingText 
                                text={personalInfo.roles} 
                                className="text-lg lg:text-xl text-indigo-400 font-medium"
                            />
                            <span>Developer</span>
                        </div>
                        <p className="mt-6 text-sm lg:text-base text-slate-300">{personalInfo.bio}</p>
                        <div className="mt-8 flex justify-center md:justify-start items-center gap-4">
                            <span className="text-slate-200">{personalInfo.email}</span>
                            <button 
                                onClick={copyEmail} 
                                className="relative text-slate-300 hover:text-white transition-colors"
                                aria-label="Copy email to clipboard"
                            >
                                <Copy size={18} />
                                {isCopied && (<span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-xs px-2 py-1 rounded">Copied!</span>)}
                            </button>
                        </div>
                        <div className="mt-4 flex justify-center md:justify-start items-center gap-6">
                            <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-indigo-400 transition-colors" aria-label="Visit my LinkedIn profile"><Linkedin size={24} /></a>
                            <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-indigo-400 transition-colors" aria-label="Visit my GitHub profile"><Github size={24} /></a>
                            <a href={personalInfo.socials.itch} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-indigo-400 transition-colors" aria-label="Visit my Itch.io profile"><Gamepad2 size={24} /></a>
                            <a href={personalInfo.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-indigo-400 transition-colors" aria-label="Visit my Instagram profile"><Instagram size={24} /></a>
                        </div>
                        <div className="mt-10 flex text-xs lg:text-base justify-center md:justify-start gap-4">
                            <Link href="/portfolio" className="group bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-md transition-all transform hover:scale-105 inline-flex items-center gap-2">
                                View My Works 
                                <ArrowDownCircle size={18} className="transition-transform group-hover:animate-[shake-vertical_1s_ease-in-out_infinite]" />
                            </Link>
                            {isMobile ? (
                                <a 
                                    href={personalInfo.cvLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="bg-transparent border-2 border-indigo-500 text-indigo-400 font-semibold px-6 py-3 rounded-md hover:bg-indigo-500/20 hover:text-white transition-all animate-[bounce-medium_1s_ease-in-out_infinite]">
                                    View CV
                                </a>
                            ) : (
                                <button 
                                    onClick={() => setIsCvModalOpen(true)}
                                    className="bg-transparent border-2 border-indigo-500 text-indigo-400 font-semibold px-6 py-3 rounded-md hover:bg-indigo-500/20 hover:text-white transition-all animate-[bounce-medium_1s_ease-in-out_infinite]">
                                    View CV
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <AnimatePresence>
            {isCvModalOpen && (
                <PdfPreviewModal 
                    pdfUrl={personalInfo.cvLink} 
                    onClose={() => setIsCvModalOpen(false)} 
                />
            )}
        </AnimatePresence>
    </>
    );
};

export default HeroSection;
