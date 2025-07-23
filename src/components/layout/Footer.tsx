import React from 'react';
import Link from 'next/link';
import { personalInfo } from '@/lib/data';
import { Github, Linkedin, Instagram, Gamepad2 } from 'lucide-react';

const Footer = () => {
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "Devlog", href: "/devlog" },
    ];

    const socialLinks = [
        { name: "GitHub", href: personalInfo.socials.github, icon: <Github size={20} /> },
        { name: "LinkedIn", href: personalInfo.socials.linkedin, icon: <Linkedin size={20} /> },
        { name: "Instagram", href: personalInfo.socials.instagram, icon: <Instagram size={20} /> },
        { name: "Itch.io", href: personalInfo.socials.itch, icon: <Gamepad2 size={20} /> },
    ];

    return (
        <footer className="bg-slate-900/50 border-t border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-xl font-bold text-white">{personalInfo.name} <span className="text-slate-400 text-sm">(rstiawann)</span></h3>
                        <p className="text-slate-400 mt-2 max-w-xs">
                            A passionate developer crafting digital experiences for the web, games and beyond.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white uppercase tracking-wider">Pages</h4>
                        <ul className="mt-4 space-y-2">
                            {navLinks.map(link => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-slate-400 hover:text-indigo-400 transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white uppercase tracking-wider">Connect</h4>
                        <div className="flex justify-center md:justify-start items-center gap-4 mt-4">
                            {socialLinks.map(social => (
                                <a 
                                    key={social.name} 
                                    href={social.href} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    aria-label={`Visit my ${social.name} profile`}
                                    className="text-slate-400 hover:text-indigo-400 transition-colors"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-800 text-center">
                    <p className="text-slate-400">&copy; {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
