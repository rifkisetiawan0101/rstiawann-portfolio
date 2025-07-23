import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import type { Metadata } from 'next';
import DevlogPostClientPage from '@/components/sections/devlog/DevlogPostClientPage';
import { MdxContent } from '@/components/mdx/MdxContent';

async function getDevlogPost(slug: string) {
    const post = await prisma.devlogPost.findUnique({ where: { slug } });
    if (!post) notFound();
    return post;
}

async function getCategories() {
    const categories = await prisma.devlogPost.groupBy({
        by: ['category'],
        _count: { category: true },
    });
    return categories.map(c => ({ category: c.category, count: c._count.category }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await getDevlogPost(params.slug);
    
    return {
        title: `${post.title} | Rifki Setiawan's Devlog`,
        description: `A devlog post by Rifki Setiawan about ${post.title}.`,
        openGraph: {
            title: post.title,
            description: `A devlog post by Rifki Setiawan.`,
            type: 'article',
            publishedTime: post.publishedAt.toISOString(),
            url: `https://rstiawann.vercel.app/devlog/${post.slug}`,
            images: [{ url: post.thumbnailUrl }],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: `A devlog post by Rifki Setiawan.`,
            images: [post.thumbnailUrl],
        },
    };
}

// Komponen Halaman (SERVER COMPONENT)
export default async function DevlogPostPage({ params }: { params: { slug: string } }) {
    const post = await getDevlogPost(params.slug);
    const categories = await getCategories();

    return (
        <div className="container mx-auto px-4 py-20">
            <DevlogPostClientPage post={post} categories={categories}>
                <MdxContent slug={params.slug} />
            </DevlogPostClientPage>
        </div>
    );
}
