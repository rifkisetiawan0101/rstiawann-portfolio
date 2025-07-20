'use client';

import React, { useState, useEffect } from 'react';

// Definisikan tipe untuk setiap partikel
interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    randomX: number;
    randomY: number;
}

const MouseTrail = () => {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const newParticle: Particle = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 5 + 1,
                randomX: Math.random(),
                randomY: Math.random(),
            };

            setParticles(prev => [...prev, newParticle]);

            // Hapus partikel dari state setelah animasi selesai
            setTimeout(() => {
                setParticles(prev => prev.filter(p => p.id !== newParticle.id));
            }, 1000); // Durasi harus cocok dengan animasi CSS
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            {particles.map(p => (
                <div
                    key={p.id}
                    className="sparkle"
                    style={{
                        left: `${p.x}px`,
                        top: `${p.y}px`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        // Kirim nilai acak ke CSS
                        '--random-x': p.randomX,
                        '--random-y': p.randomY,
                    } as React.CSSProperties}
                />
            ))}
        </>
    );
};

export default MouseTrail;
