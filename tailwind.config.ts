import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            animation: {
                'bounce-medium': 'bounce-medium 1s ease-in-out infinite',
                'shake-vertical': 'shake-vertical 1s ease-in-out infinite',
            },
            keyframes: {
                'bounce-medium': {
                    '0%, 100%': {
                        transform: 'translateY(-25%)',
                        animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
                    },
                    '50%': {
                        transform: 'none',
                        animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
                    },
                },
                'shake-vertical': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '20%': { transform: 'translateY(-6px)' },
                    '40%': { transform: 'translateY(6px)' },
                    '60%': { transform: 'translateY(-4px)' },
                    '80%': { transform: 'translateY(4px)' },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
export default config;
