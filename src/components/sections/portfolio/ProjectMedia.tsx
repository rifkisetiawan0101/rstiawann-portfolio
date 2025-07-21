import React, { useRef, useEffect } from 'react';
import Image from 'next/image';

interface ProjectMediaProps {
    image: string;
    videoUrl?: string;
    isHovering: boolean;
}

const ProjectMedia = ({ image, videoUrl, isHovering }: ProjectMediaProps) => {
    const videoRef = useRef<HTMLIFrameElement>(null);
    
    const getYouTubeId = (url?: string) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };
    
    const videoId = getYouTubeId(videoUrl);

    useEffect(() => {
        if (videoId && videoRef.current) {
            if (isHovering) {
                videoRef.current.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&loop=1&playlist=${videoId}&controls=1&showinfo=0&rel=0`;
            } else {
                videoRef.current.src = '';
            }
        }
    }, [isHovering, videoId]);

    return (
        <div className="relative w-full h-full overflow-hidden">
            <Image 
                src={image} 
                alt="Project Thumbnail" 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovering && videoId ? 'opacity-0' : 'opacity-100'}`}
            />
            {videoId && (
                <iframe
                    ref={videoRef}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Project Video"
                ></iframe>
            )}
        </div>
    );
};

export default ProjectMedia;
