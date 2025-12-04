'use client';

import { useCart } from '../context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const router = useRouter();
    const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-white dark:bg-stone-900">
                {/* Navigation */}
                <nav className="py-4 sm:py-6 px-4 sm:px-12 border-b border-stone-100 dark:border-stone-800">
                    <div className="flex justify-between items-center max-w-7xl mx-auto">
                        <Link href="/" className="text-xl sm:text-2xl font-serif font-semibold text-stone-900 dark:text-stone-100">
                            Handcrafted Haven
                        </Link>
                        <div className="flex space-x-4 sm:space-x-8 text-base sm:text-lg font-medium text-stone-700 dark:text-stone-300">
                            <Link href="/shop" className="hover:text-stone-900 dark:hover:text-stone-100">
                                <span className="hidden sm:inline">Shop</span>
                                <svg className="w-6 h-6 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </Link>
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


                {/* Empty Cart */}
                <div className="max-w-7xl mx-auto px-4 sm:px-12 py-16 text-center">
                    <div className="max-w-md mx-auto">
                        <h1 className="text-4xl font-serif font-semibold text-stone-900 dark:text-stone-100 mb-4">
                            Your Cart is Empty
                        </h1>
                        <p className="text-lg text-stone-600 dark:text-stone-300 mb-8">
                            Looks like you haven't added any items to your cart yet.
                        </p>
                        <Link href="/shop">
                            <button className="px-8 py-3 bg-amber-900 text-white font-medium rounded-lg hover:bg-amber-800 transition">
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
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

            {/* Cart Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-12 py-16">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-serif font-semibold text-stone-900 dark:text-stone-100">
                        Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                    </h1>
                    <button
                        onClick={clearCart}
                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium"
                    >
                        Clear Cart
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg p-4 flex gap-4"
                            >
                                {/* Product Image */}
                                <div className="w-24 h-24 bg-stone-100 dark:bg-stone-700 rounded-lg overflow-hidden flex-shrink-0">
                                    {item.imageUrl ? (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                {/* Product Details */}
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-1">
                                        {item.name}
                                    </h3>
                                    <p className="text-amber-900 dark:text-amber-500 font-bold mb-3">
                                        ${item.price.toFixed(2)}
                                    </p>

                                    <div className="flex items-center gap-4">
                                        {/* Quantity Controls */}
                                        <div className="flex items-center border border-stone-300 dark:border-stone-600 rounded-lg">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="px-3 py-1 hover:bg-stone-100 dark:hover:bg-stone-700 transition"
                                            >
                                                −
                                            </button>
                                            <span className="px-4 py-1 border-x border-stone-300 dark:border-stone-600 text-stone-900 dark:text-stone-100">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="px-3 py-1 hover:bg-stone-100 dark:hover:bg-stone-700 transition"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm font-medium"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                {/* Item Total */}
                                <div className="text-right">
                                    <p className="text-lg font-bold text-stone-900 dark:text-stone-100">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg p-6 sticky top-4">
                            <h2 className="text-2xl font-serif font-semibold text-stone-900 dark:text-stone-100 mb-6">
                                Order Summary
                            </h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-stone-600 dark:text-stone-300">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-stone-600 dark:text-stone-300">
                                    <span>Shipping</span>
                                    <span>Calculated at checkout</span>
                                </div>
                                <div className="border-t border-stone-300 dark:border-stone-600 pt-3 flex justify-between text-xl font-bold text-stone-900 dark:text-stone-100">
                                    <span>Total</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <button className="w-full px-6 py-3 bg-amber-900 text-white font-medium rounded-lg hover:bg-amber-800 transition mb-3">
                                Proceed to Checkout
                            </button>

                            <Link href="/shop">
                                <button className="w-full px-6 py-3 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 font-medium rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 transition">
                                    Continue Shopping
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
