'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { personalInfo } from '@/lib/data';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Definisikan link navigasi yang lebih sederhana
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "Devlog", href: "/devlog" },
    ];

    // Fungsi untuk menangani klik link (hanya untuk menutup menu mobile)
    const handleLinkClick = () => {
        setIsOpen(false);
    };

    // Render link navigasi
    const renderNavLinks = (isMobile = false) => {
        return navLinks.map((item) => {
            // Logika 'isActive' sekarang hanya berdasarkan pathname
            const isActive = pathname === item.href;
            
            return (
                <Link
                    key={item.name}
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`
                        transition-colors duration-300
                        ${isMobile 
                            ? 'block px-3 py-2 rounded-md text-base font-medium' 
                            : 'px-3 py-2 rounded-md text-sm font-medium'
                        }
                        ${isActive
                            ? 'bg-indigo-600 text-white' 
                            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                        }
                    `}
                >
                    {item.name}
                </Link>
            );
        });
    };

    return (
        <header className="bg-slate-900/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" onClick={handleLinkClick} className="text-white font-bold text-xl">
                            {"rstiawann"}
                        </Link>
                    </div>
                    {/* Navigasi Desktop */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {renderNavLinks()}
                        </div>
                    </div>
                    {/* Tombol Menu Mobile */}
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} type="button" className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700">
                            <span className="sr-only">Open menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
            {/* Menu Mobile */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {renderNavLinks(true)}
                </div>
            </div>
        </header>
    );
};

export default Header;
