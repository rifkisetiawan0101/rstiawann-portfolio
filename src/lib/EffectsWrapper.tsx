'use client';

import dynamic from 'next/dynamic';

const ParticleBackground = dynamic(() => import('@/lib/ParticleBackground'), { ssr: false });
const MouseTrail = dynamic(() => import('@/lib/MouseTrail'), { ssr: false });

const EffectsWrapper = () => {
    return (
        <>
            <ParticleBackground />
            <MouseTrail />
        </>
    );
};

export default EffectsWrapper;
