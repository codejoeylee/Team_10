'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '@/lib/useAuth';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    stock: number;
}

export default function ShopPage() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const { addToCart, cartCount } = useCart();
    useAuth(); // This will redirect to login if not authenticated

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();

            if (data.success) {
                setProducts(data.products);
            }
        } catch (err) {
            console.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const categories = ['all', ...new Set(products.map(p => p.category))];
    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-stone-900 flex items-center justify-center">
                <div className="text-lg text-stone-600 dark:text-stone-300">Loading products...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-stone-900">
            {/* Navigation */}
            <nav className="py-4 sm:py-6 px-4 sm:px-12 border-b border-stone-100 dark:border-stone-800">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <Link href="/" className="text-xl sm:text-2xl font-serif font-semibold text-stone-900 dark:text-stone-100">
                        Handcrafted Haven
                    </Link>
                    <div className="flex space-x-4 sm:space-x-8 text-base sm:text-lg font-medium text-stone-700 dark:text-stone-300">
                        <Link href="/shop" className="hover:text-stone-900 dark:hover:text-stone-100">Shop</Link>
                        <Link href="/cart" className="hover:text-stone-900 dark:hover:text-stone-100 relative">
                            <span className="hidden sm:inline">Cart</span>
                            <svg className="w-6 h-6 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-amber-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                localStorage.removeItem('user');
                                router.push('/login');
                            }}
                            className="hover:text-stone-900 dark:hover:text-stone-100 hidden sm:block"
                        >
                            Logout
                        </button>
                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                localStorage.removeItem('user');
                                router.push('/login');
                            }}
                            className="hover:text-stone-900 dark:hover:text-stone-100 sm:hidden"
                            aria-label="Logout"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-12 py-16">
                <div className="mb-12">
                    <h1 className="text-5xl font-serif font-semibold text-stone-900 dark:text-stone-100 mb-4">
                        Shop All Products
                    </h1>
                    <p className="text-xl text-stone-600 dark:text-stone-300">
                        Discover unique handcrafted items from talented artisans
                    </p>
                </div>

                {/* Category Filter */}
                <div className="mb-8 flex gap-3 flex-wrap">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full font-medium transition ${selectedCategory === category
                                ? 'bg-amber-900 text-white'
                                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                                }`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-stone-600 dark:text-stone-300">
                            No products available yet. Check back soon!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="flex flex-col">
                                <Link href={`/shop/${product.id}`} className="group flex-grow">
                                    <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                                        <div className="h-64 bg-stone-100 dark:bg-stone-700 overflow-hidden">
                                            {product.imageUrl ? (
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-stone-400">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-2 group-hover:text-amber-900 dark:group-hover:text-amber-500 transition">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-stone-600 dark:text-stone-300 mb-3 line-clamp-2">
                                                {product.description || 'Handcrafted with care'}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-2xl font-bold text-amber-900 dark:text-amber-500">
                                                    ${Number(product.price).toFixed(2)}
                                                </span>
                                                {product.stock > 0 ? (
                                                    <span className="text-sm text-green-600 dark:text-green-500">
                                                        In Stock
                                                    </span>
                                                ) : (
                                                    <span className="text-sm text-red-600 dark:text-red-500">
                                                        Out of Stock
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <button
                                    onClick={() => {
                                        addToCart({
                                            id: product.id,
                                            name: product.name,
                                            price: Number(product.price),
                                            imageUrl: product.imageUrl || '',
                                        });
                                    }}
                                    disabled={product.stock === 0}
                                    className="w-full mt-3 px-6 py-3 bg-amber-900 text-white font-medium rounded-lg hover:bg-amber-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-stone-50 dark:bg-stone-800 border-t border-stone-200 dark:border-stone-700 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-12 py-12">
                    <div className="text-center text-sm text-stone-500 dark:text-stone-400">
                        &copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
