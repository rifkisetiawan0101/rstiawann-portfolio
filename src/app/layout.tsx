import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EffectsWrapper from "@/lib/EffectsWrapper";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://rstiawann.vercel.app";
const siteTitle = "Rifki Setiawan (rstiawann_) - Full-Stack & Game Developer Portfolio";
const siteDescription = "Explore the portfolio of Rifki Setiawan (rstiawann_), a Full-Stack Web Developer and Game Developer. Discover projects built with React, Next.js, Unity, and more.";
const siteImage = "https://glmqkytupyqvzybtjltf.supabase.co/storage/v1/object/public/ladahitam-assets/members/rifki/profile-picture-stylized.png";

export const metadata: Metadata = {
    title: siteTitle,
    description: siteDescription,
    keywords: ["Rifki Setiawan", "Rifki Setiawan PNJ", "rstiawann_", "Portfolio Rifki", "Portfolio Rifki Setiawan", "Game Developer", "Full-Stack Developer", "React Portfolio", "Unity Developer"],
    authors: [{ name: "Rifki Setiawan", url: siteUrl }],
    creator: "Rifki Setiawan",
    
    // Metadata Open Graph (untuk Facebook, LinkedIn, dll.)
    openGraph: {
        title: siteTitle,
        description: siteDescription,
        url: siteUrl,
        siteName: "Rifki Setiawan's Portfolio",
        images: [
            {
                url: siteImage,
                width: 480,
                height: 480,
                alt: "Rifki Setiawan Profile Picture",
            },
        ],
        locale: 'en_US',
        type: 'website',
    },

    twitter: {
        card: 'summary_large_image',
        title: siteTitle,
        description: siteDescription,
        creator: '@rstiawann_',
        images: [siteImage],
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    
    alternates: {
        canonical: siteUrl,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="!scroll-smooth">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": "Rifki Setiawan",
                        "url": siteUrl,
                        "image": siteImage,
                        "sameAs": [
                            "https://github.com/rifkisetiawan0101",
                            "https://www.linkedin.com/in/rifki-setiawan-pnj/",
                            "https://itch.io/profile/rstiawann",
                            "https://www.instagram.com/rstiawann_",
                        ],
                        "jobTitle": "Full-Stack & Game Developer",
                        "alumniOf": {
                            "@type": "CollegeOrUniversity",
                            "name": "Politeknik Negeri Jakarta"
                        }
                    })}}
                />
            </head>
            <body className={`${inter.className} bg-slate-900 text-white`}>
                <EffectsWrapper />
                <div className="relative z-10 flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-grow">
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
