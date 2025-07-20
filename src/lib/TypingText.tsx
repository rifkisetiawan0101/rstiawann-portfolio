// lib/TypingText.tsx
'use client';

import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

interface TypingTextProps {
    text: (string | number)[];
    className?: string;
}

const TypingText = ({ text, className }: TypingTextProps) => {
    const words = text.filter(item => typeof item === 'string') as string[];
    const delays = text.filter(item => typeof item === 'number') as number[];
    const loopDelay = delays.length > 0 ? delays[0] : 1500;

    const [typedText] = useTypewriter({
        words: words,
        loop: true,
        delaySpeed: loopDelay,
        typeSpeed: 150,
        deleteSpeed: 50,
    });

    return (
        <span className={className}>
            {typedText}
            <Cursor cursorStyle='|' />
        </span>
    );
};

export default TypingText;
