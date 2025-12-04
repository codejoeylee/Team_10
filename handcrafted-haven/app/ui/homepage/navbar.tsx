'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            {/*Navigation bar*/}
            <nav className="py-6 px-4 sm:px-12 border-b border-stone-100 dark:border-stone-800">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <div className="text-2xl font-serif font-semibold text-stone-900 dark:text-stone-100">
                        Handcrafted Haven
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8 text-lg font-medium text-stone-700 dark:text-stone-300">
                        <Link href="/shop" className="hover:text-stone-900 dark:hover:text-stone-100">Shop</Link>
                        <a href="#categories" className="hover:text-stone-900 dark:hover:text-stone-100">Category</a>
                        <Link href="/login" className="hover:text-stone-900 dark:hover:text-stone-100">Log In</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100"
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

                {/* Mobile Navigation Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-stone-100 dark:border-stone-800 pt-4">
                        <div className="flex flex-col space-y-3">
                            <Link
                                href="/shop"
                                className="text-lg font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Shop
                            </Link>
                            <a
                                href="#categories"
                                className="text-lg font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Category
                            </a>
                            <Link
                                href="/login"
                                className="text-lg font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Log In
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}

