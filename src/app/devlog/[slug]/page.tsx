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
    const siteUrl = "https://rstiawann.vercel.app";
    const postUrl = `${siteUrl}/devlog/${post.slug}`;

    // Generate keywords dari judul, kategori, dan beberapa keyword default
    const keywords = [
        ...post.title.split(' '),
        post.category.replace('_', ' '),
        "Rifki Setiawan",
        "Devlog",
        "Portfolio",
        "Web Development",
        "Game Development"
    ];

    return {
        title: `${post.title} | Rifki Setiawan's Devlog`,
        description: post.excerpt,
        keywords: keywords,
        authors: [{ name: "Rifki Setiawan", url: siteUrl }],
        creator: "Rifki Setiawan",

        alternates: {
            canonical: postUrl, // URL Kanonikal untuk menghindari konten duplikat
        },
        
        // Metadata Open Graph yang lebih kaya untuk artikel
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: postUrl,
            siteName: "Rifki Setiawan's Portfolio",
            images: [
                {
                    url: post.thumbnailUrl,
                    width: 1200,
                    height: 630,
                    alt: `Thumbnail for ${post.title}`,
                },
            ],
            locale: 'en_US',
            type: 'article',
            publishedTime: post.publishedAt.toISOString(),
            modifiedTime: post.updatedAt.toISOString(),
            authors: ['Rifki Setiawan'],
            tags: [post.category.replace('_', ' ')],
        },

        // Metadata Twitter Card yang lebih kaya
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            creator: '@rstiawann_',
            images: {
                url: post.thumbnailUrl,
                alt: `Thumbnail for ${post.title}`,
            },
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
