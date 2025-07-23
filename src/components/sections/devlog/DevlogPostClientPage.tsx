'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { DevlogPost } from '@prisma/client';
import ImagePreviewModal from '@/components/ui/ImagePreviewModal';

interface DevlogPostClientPageProps {
    post: DevlogPost;
    categories: { category: string; count: number }[];
    children: React.ReactNode; 
}

const DevlogPostClientPage = ({ post, categories, children }: DevlogPostClientPageProps) => {
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleImageClick = (e: Event) => {
        const target = e.target as HTMLImageElement;
        if (target.width < 100 || target.height < 100) return;
        setActiveImage(target.src);
    };

    useEffect(() => {
        const contentDiv = contentRef.current;
        if (contentDiv) {
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
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                <main className="w-full lg:w-2/3">
                    <article>
                        <header className="mb-8">
                            <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                                <Link href={`/devlog?category=${post.category}`} className="bg-indigo-600/20 text-indigo-300 font-medium px-3 py-1 rounded-full uppercase hover:bg-indigo-600/40 transition-colors">
                                    {post.category.replace('_', ' ')}
                                </Link>
                                <time dateTime={post.publishedAt.toISOString()}>
                                    {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
                                </time>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                {post.title}
                            </h1>
                        </header>

                        <div className="relative w-full aspect-video overflow-hidden rounded-lg mb-8">
                            <Image
                                src={post.thumbnailUrl}
                                alt={`Thumbnail for ${post.title}`}
                                fill
                                priority
                                className="object-cover cursor-pointer"
                                onClick={(e) => handleImageClick(e as any)}
                            />
                        </div>

                        {/* Gunakan ref dan render children (konten MDX) */}
                        <div ref={contentRef}>
                            {children}
                        </div>
                    </article>
                </main>
                <aside className="w-full lg:w-1/3">
                    <div className="sticky top-24">
                        <h3 className="text-lg font-semibold text-white mb-4">Explore More</h3>
                        <ul className="space-y-2">
                            {categories.map(cat => (
                                <li key={cat.category}>
                                    <Link href={`/devlog?category=${cat.category}`} className="flex justify-between items-center text-slate-400 hover:text-indigo-400 transition-colors">
                                        <span className="capitalize">{cat.category.replace('_', ' ').toLowerCase()}</span>
                                        <span className="text-xs bg-slate-700 px-2 py-0.5 rounded-full">{cat.count}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
            <ImagePreviewModal 
                imageUrl={activeImage}
                onClose={() => setActiveImage(null)}
            />
        </>
    );
};

export default DevlogPostClientPage;
