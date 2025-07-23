'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { DevlogPost } from '@prisma/client';
import { format } from 'date-fns';

// Komponen Card
const DevlogCard = ({ post }: { post: DevlogPost }) => (
    <Link href={`/devlog/${post.slug}`} className="block group py-6 border-b border-slate-800">
        <div className="flex items-start sm:items-center gap-4 sm:gap-6">
            <div className="w-24 h-24 sm:w-48 sm:h-28 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                    src={post.thumbnailUrl}
                    alt={`Thumbnail for ${post.title}`}
                    width={192}
                    height={108}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="flex-1">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400 mb-2">
                    <span className="bg-indigo-600/20 text-indigo-300 font-medium px-3 py-1 rounded-full uppercase">
                        {post.category.replace('_', ' ')}
                    </span>
                    <time dateTime={post.publishedAt.toISOString()}>
                        {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
                    </time>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-400 transition-colors mb-2">
                    {post.title}
                </h3>
                <p className="hidden sm:block text-sm text-slate-400">
                    {post.excerpt}
                </p>
            </div>
        </div>
    </Link>
);

// Komponen Utama Halaman Klien untuk DAFTAR DEVLOG
const DevlogListPage = ({ posts }: { posts: DevlogPost[] }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    
    const activeCategory = searchParams.get('category');
    const categories = ['FRONTEND', 'BACKEND', 'GAME_DEV'];

    const handleFilter = (category: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category) {
            params.set('category', category);
        } else {
            params.delete('category');
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (searchQuery) {
            params.set('q', searchQuery);
        } else {
            params.delete('q');
        }
        router.push(`${pathname}?${params.toString()}`);
    };
    
    const handleReset = () => {
        setSearchQuery('');
        router.push(pathname);
    };

    return (
        <>
            <div className="max-w-3xl mx-auto mb-12">
                <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
                    <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari tips..."
                        className="w-full bg-slate-800/70 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button type="submit" className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-indigo-500 transition-colors">Search</button>
                    <button type="button" onClick={handleReset} className="bg-red-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-500 transition-colors">Reset</button>
                </form>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                    <button onClick={() => handleFilter(null)} className={`text-sm ${!activeCategory ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-white'}`}>Discover</button>
                    {categories.map(cat => (
                        <button 
                            key={cat} 
                            onClick={() => handleFilter(cat)}
                            className={`text-sm capitalize ${activeCategory === cat ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-white'}`}
                        >
                            {cat.replace('_', ' ').toLowerCase()}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-3xl mx-auto">
                {posts.length > 0 ? (
                    posts.map(post => <DevlogCard key={post.id.toString()} post={post} />)
                ) : (
                    <p className="text-center text-slate-400 py-12">No posts found. Try a different search or filter.</p>
                )}
            </div>
        </>
    );
};

export default DevlogListPage;
