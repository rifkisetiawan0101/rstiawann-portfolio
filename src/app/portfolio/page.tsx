import React from 'react';
import prisma from '@/lib/prisma';
import SectionTitle from '@/components/ui/SectionTitle';
import ProjectList from '@/components/sections/portfolio/ProjectList'; // Komponen ini akan kita buat

// Halaman ini adalah Server Component
export default async function PortfolioPage() {
    // Ambil semua data proyek dari database
    const projects = await prisma.project.findMany({
        orderBy: {
            id: 'asc', // Urutkan berdasarkan ID agar konsisten
        },
    });

    return (
        <main className="container mx-auto px-4 py-20 pt-32">
            <SectionTitle 
                title="My Portfolio" 
                subtitle="An exhibition of my passion and expertise." 
            />
            {/* Teruskan data projects ke Client Component */}
            <ProjectList projects={projects} />
        </main>
    );
}
