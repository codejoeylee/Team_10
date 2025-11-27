'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCart } from '../../context/CartContext';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    stock: number;
}

export default function ProductDetailPage() {
    const params = useParams();
    const { addToCart, cartCount } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (params.id) {
            fetchProduct(params.id as string);
        }
    }, [params.id]);

    const fetchProduct = async (id: string) => {
        try {
            const response = await fetch(`/api/products/${id}`);
            const data = await response.json();

            if (data.success) {
                setProduct(data.product);
            }
        } catch (err) {
            console.error('Failed to fetch product');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        if (product) {
            for (let i = 0; i < quantity; i++) {
                addToCart({
                    id: product.id,
                    name: product.name,
                    price: Number(product.price),
                    imageUrl: product.imageUrl || '',
                });
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-stone-900 flex items-center justify-center">
                <div className="text-lg text-stone-600 dark:text-stone-300">Loading...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-white dark:bg-stone-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-4">
                        Product Not Found
                    </h1>
                    <Link href="/shop">
                        <button className="px-6 py-3 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition">
                            Back to Shop
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-stone-900">
            {/* Navigation */}
            <nav className="py-6 px-4 sm:px-12 border-b border-stone-100 dark:border-stone-800">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <Link href="/" className="text-2xl font-serif font-semibold text-stone-900 dark:text-stone-100">
                        Handcrafted Haven
                    </Link>
                    <div className="flex space-x-8 text-lg font-medium text-stone-700 dark:text-stone-300">
                        <Link href="/shop" className="hover:text-stone-900 dark:hover:text-stone-100">Shop</Link>
                        <Link href="/cart" className="hover:text-stone-900 dark:hover:text-stone-100 relative">
                            Cart
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-amber-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <Link href="/login" className="hover:text-stone-900 dark:hover:text-stone-100">Log In</Link>
                    </div>
                </div>
            </nav>

            {/* Product Detail */}
            <main className="max-w-7xl mx-auto px-4 sm:px-12 py-16">
                <Link href="/shop" className="text-amber-900 dark:text-amber-500 hover:underline mb-8 inline-block">
                    ← Back to Shop
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className="bg-stone-100 dark:bg-stone-800 rounded-lg overflow-hidden aspect-square">
                        {product.imageUrl ? (
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-400">
                                No Image Available
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-4">
                            <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100 text-sm font-medium rounded-full">
                                {product.category}
                            </span>
                        </div>

                        <h1 className="text-4xl font-serif font-semibold text-stone-900 dark:text-stone-100 mb-4">
                            {product.name}
                        </h1>

                        <div className="text-3xl font-bold text-amber-900 dark:text-amber-500 mb-6">
                            ${Number(product.price).toFixed(2)}
                        </div>

                        <div className="mb-6">
                            {product.stock > 0 ? (
                                <span className="text-green-600 dark:text-green-500 font-medium">
                                    ✓ In Stock ({product.stock} available)
                                </span>
                            ) : (
                                <span className="text-red-600 dark:text-red-500 font-medium">
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-3">
                                Description
                            </h2>
                            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                                {product.description || 'This beautiful handcrafted item is made with care and attention to detail. Each piece is unique and tells its own story.'}
                            </p>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                                Quantity
                            </label>
                            <div className="flex items-center border border-stone-300 dark:border-stone-600 rounded-lg w-32">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2 hover:bg-stone-100 dark:hover:bg-stone-700 transition"
                                >
                                    −
                                </button>
                                <span className="px-4 py-2 border-x border-stone-300 dark:border-stone-600 text-stone-900 dark:text-stone-100 flex-1 text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    disabled={quantity >= product.stock}
                                    className="px-4 py-2 hover:bg-stone-100 dark:hover:bg-stone-700 transition disabled:opacity-50"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                            className="w-full px-8 py-4 bg-amber-900 text-white font-medium text-lg rounded-lg hover:bg-amber-800 transition disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                        >
                            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>

                        <Link href="/shop">
                            <button className="w-full px-8 py-4 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 font-medium rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 transition">
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
