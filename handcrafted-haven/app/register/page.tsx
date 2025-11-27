'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        role: 'buyer' as 'buyer' | 'seller' | 'admin',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                // Redirect based on user role
                if (data.user.role === 'seller' || data.user.role === 'admin') {
                    router.push('/dashboard');
                } else {
                    router.push('/shop');
                }
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white dark:bg-stone-800 rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif font-semibold text-stone-900 dark:text-stone-100 mb-2">
                        Create Account
                    </h1>
                    <p className="text-stone-600 dark:text-stone-300">
                        Join Handcrafted Haven today
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-900 dark:text-red-100 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900 dark:bg-stone-700 dark:text-stone-100"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900 dark:bg-stone-700 dark:text-stone-100"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            minLength={8}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900 dark:bg-stone-700 dark:text-stone-100"
                            placeholder="••••••••"
                        />
                        <p className="mt-1 text-xs text-stone-500">Minimum 8 characters</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                            I want to
                        </label>
                        <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                            className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900 dark:bg-stone-700 dark:text-stone-100"
                        >
                            <option value="buyer">Buy handcrafted goods</option>
                            <option value="seller">Sell my handcrafted goods</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-6 py-3 bg-amber-900 text-white font-medium rounded-lg hover:bg-amber-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-stone-600 dark:text-stone-300">
                        Already have an account?{' '}
                        <Link href="/login" className="text-amber-900 dark:text-amber-500 font-medium hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>

                <div className="mt-4 text-center">
                    <Link href="/" className="text-sm text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
