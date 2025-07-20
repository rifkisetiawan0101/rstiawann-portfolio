import React from 'react';
import { personalInfo } from '@/lib/data';

const Footer = () => {
    return (
        <footer className="bg-slate-900/30 border-t border-slate-800 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-slate-500">
                <p>&copy; {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
