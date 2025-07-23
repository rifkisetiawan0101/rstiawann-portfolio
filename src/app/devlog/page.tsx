import React from 'react';
import prisma from '@/lib/prisma';
import { DevlogCategory } from '@prisma/client';
import SectionTitle from '@/components/ui/SectionTitle';
import DevlogListPage from '@/components/sections/devlog/DevlogListPage';

// Halaman ini adalah Server Component
export default async function DevlogPage({ 
    searchParams 
}: { 
    searchParams: { q?: string; category?: string } 
}) {
    const query = searchParams.q;
    const category = searchParams.category as DevlogCategory;

    // Ambil data di server berdasarkan parameter URL
    const posts = await prisma.devlogPost.findMany({
        where: {
            AND: [
                query ? {
                    OR: [
                        { title: { contains: query, mode: 'insensitive' } },
                        { excerpt: { contains: query, mode: 'insensitive' } },
                    ]
                } : {},
                category ? { category: category } : {},
            ]
        },
        orderBy: {
            publishedAt: 'desc',
        },
    });

    return (
        <main className="container mx-auto px-4 py-20 min-h-screen">
            <SectionTitle 
                title="Developer Log" 
                subtitle="Thoughts, tutorials, and behind-the-scenes of my projects." 
            />
            <DevlogListPage posts={posts} />
        </main>
    );
}
