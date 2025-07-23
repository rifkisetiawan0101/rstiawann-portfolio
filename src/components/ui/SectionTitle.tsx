import React from 'react';

interface SectionTitleProps {
    title: string;
    subtitle: React.ReactNode; 
}

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => {
    return (
        <div className="text-center mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">{title}</h2>
            <p className="text-sm lg:text-base text-slate-400 max-w-2xl mx-auto px-4">{subtitle}</p>
        </div>
    );
};

export default SectionTitle;
