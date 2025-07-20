import prisma from "@/lib/prisma";

// Impor komponen-komponen section
import HeroSection from "@/components/sections/Hero";
import SkillsSection from "@/components/sections/Skills";
import EducationSection from "@/components/sections/Education";
import AchievementsSection from "@/components/sections/Achievements";
import Contacts from "@/components/sections/Contacts";

// Halaman ini adalah Server Component, ditandai dengan 'async'
export default async function HomePage() {
    // Ambil semua data yang dibutuhkan secara paralel untuk efisiensi
    const [skills, education, achievements] = await Promise.all([
        prisma.skill.findMany({
            orderBy: { id: 'asc' }, // Urutkan berdasarkan ID
        }),
        prisma.education.findMany({
            orderBy: { id: 'asc' },
        }),
        prisma.achievement.findMany({
            orderBy: { id: 'desc' }, // Tampilkan pencapaian terbaru lebih dulu
        }),
    ]);

    return (
        <main className="container mx-auto px-4">
            <HeroSection />
            <SkillsSection skills={skills} />
            <EducationSection education={education} />
            <AchievementsSection achievements={achievements} />
            <Contacts /> 
        </main>
    );
}
