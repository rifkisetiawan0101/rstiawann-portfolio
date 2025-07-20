import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://rstiawann.vercel.app';

    const staticPages = [
        {
            url: `${baseUrl}/`,
            lastModified: new Date(),
            priority: 1.0,
        },
        {
            url: `${baseUrl}/portfolio`,
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: `${baseUrl}/devlog`,
            lastModified: new Date(),
            priority: 0.5,
        },
    ];

    return staticPages;
}
