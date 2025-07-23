'use client';

import React, { useState, useEffect, useRef } from 'react';
import ImagePreviewModal from '@/components/ui/ImagePreviewModal';

const ArticleWrapper = ({ children }: { children: React.ReactNode }) => {
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleImageClick = (e: Event) => {
        const target = e.target as HTMLImageElement;
        setActiveImage(target.src);
    };

    useEffect(() => {
        // Kita menggunakan ref untuk mendapatkan div yang berisi konten MDX
        const contentDiv = contentRef.current;
        if (contentDiv) {
            // Temukan semua gambar dan tambahkan event listener
            const images = contentDiv.querySelectorAll('img');
            images.forEach(img => {
                img.addEventListener('click', handleImageClick);
                img.classList.add('cursor-pointer', 'rounded-lg', 'transition-all', 'hover:opacity-90');
            });

            return () => {
                images.forEach(img => {
                    img.removeEventListener('click', handleImageClick);
                });
            };
        }
    }, [children]);

    return (
        <>
            <div ref={contentRef}>
                {children}
            </div>

            <ImagePreviewModal 
                imageUrl={activeImage}
                onClose={() => setActiveImage(null)}
            />
        </>
    );
};

export default ArticleWrapper;
