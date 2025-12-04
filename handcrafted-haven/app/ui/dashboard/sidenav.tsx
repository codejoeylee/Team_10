'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function SideNav() {
    const router = useRouter();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    const isActive = (path: string) => pathname === path;

    const navLinks = [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/dashboard/productlisting', label: 'Product Listing' },
        { href: '/dashboard/sellerprofile', label: 'Seller Profile' },
        { href: '/dashboard/community', label: 'Community' },
    ];

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700">
                <Link href="/" className="text-xl font-serif font-semibold text-stone-900 dark:text-stone-100">
                    Handcrafted Haven
                </Link>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 text-stone-700 dark:text-stone-300"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-stone-50 dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700">
                    <div className="flex flex-col p-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`rounded-lg px-4 py-3 transition-colors ${isActive(link.href)
                                        ? 'bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100 font-medium'
                                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 rounded-lg px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Desktop Sidebar */}
            <div className="hidden md:flex h-full flex-col bg-stone-50 dark:bg-stone-800 border-r border-stone-200 dark:border-stone-700">
                <Link href="/" className="flex items-center p-6 border-b border-stone-200 dark:border-stone-700">
                    <h2 className="text-xl font-serif font-semibold text-stone-900 dark:text-stone-100">
                        Handcrafted Haven
                    </h2>
                </Link>
                <div className="flex flex-col gap-2 p-4 flex-grow">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${isActive(link.href)
                                    ? 'bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100 font-medium'
                                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 hover:text-stone-900 dark:hover:text-stone-100'
                                }`}
                        >
                            <span>{link.label}</span>
                        </Link>
                    ))}
                </div>

                {/* Logout Button at Bottom */}
                <div className="p-4 border-t border-stone-200 dark:border-stone-700">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
}
