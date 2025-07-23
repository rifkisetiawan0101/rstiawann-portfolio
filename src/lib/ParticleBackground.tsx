'use client';

import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const ParticleBackground = () => {
    const [init, setInit] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Efek untuk mendeteksi ukuran layar hanya di sisi klien
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640); // 384*2
        checkMobile(); // Cek saat komponen dimuat
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Efek untuk inisialisasi partikel
    useEffect(() => {
        if (isMobile) {
            setInit(false);
            return;
        }

        initParticlesEngine(async (engine: Engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, [isMobile]);

    const particleOptions: ISourceOptions = useMemo(
        () => ({
            background: {
                color: { value: '#0f172a' },
            },
            fpsLimit: 30,
            interactivity: {
                events: {
                    onHover: { enable: true, mode: 'grab' },
                    // PERBAIKAN: 'resize' sekarang harus menjadi objek
                    resize: { enable: true },
                },
                modes: {
                    grab: {
                        distance: 180,
                        links: { opacity: 0.5 },
                    },
                },
            },
            particles: {
                color: { value: ['#6366f1', '#F26467'] },
                links: {
                    color: '#6366f1',
                    distance: 150,
                    enable: true,
                    opacity: 0.5,
                    width: 1,
                },
                collisions: { enable: true },
                move: {
                    direction: 'none',
                    enable: true,
                    outModes: { default: 'bounce' },
                    random: true,
                    speed: 2,
                    straight: false,
                },
                number: {
                    density: { enable: true, area: 800 },
                    value: 80,
                },
                opacity: { value: 0.5 },
                shape: { type: 'triangle' },
                size: {
                    value: { min: 1, max: 4 },
                },
                shadow: {
                    enable: true,
                    color: "#6366f1",
                    blur: 10,
                },
                twinkle: {
                    particles: {
                        enable: true,
                        frequency: 0.05,
                        opacity: 1
                    }
                }
            },
            detectRetina: true,
        }),
        [],
    );

    // Render background statis di mobile
    if (isMobile) {
        return (
            <div
                style={{
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    backgroundColor: '#0f172a',
                    zIndex: -10,
                }}
            />
        );
    }

    // Render partikel di desktop setelah inisialisasi
    if (init) {
        return (
            <Particles
                id="tsparticles"
                options={particleOptions}
                style={{
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    zIndex: -10,
                }}
            />
        );
    }

    return null; 
};

export default ParticleBackground;
