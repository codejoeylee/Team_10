'use client';

import { useState, useEffect } from 'react';

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [stats, setStats] = useState({
        totalProducts: 0,
        activeProducts: 0,
        totalViews: 0,
        totalSales: 0,
    });

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();

            if (data.success) {
                const products = data.products;
                const totalProducts = products.length;
                const activeProducts = products.filter((p: any) => p.is_active || p.isActive).length;

                setStats({
                    totalProducts,
                    activeProducts,
                    totalViews: 0, // You can implement view tracking later
                    totalSales: 0, // You can implement sales tracking later
                });
            }
        } catch (err) {
            console.error('Failed to fetch stats');
        }
    };

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-semibold text-stone-900 dark:text-stone-100 mb-2">
                    Welcome back, {user?.name || 'User'}!
                </h1>
                <p className="text-stone-600 dark:text-stone-300">
                    Here's what's happening with your store today
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg p-6">
                    <div className="text-sm text-stone-600 dark:text-stone-300 mb-2">Total Products</div>
                    <div className="text-3xl font-bold text-stone-900 dark:text-stone-100">{stats.totalProducts}</div>
                </div>

                <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg p-6">
                    <div className="text-sm text-stone-600 dark:text-stone-300 mb-2">Active Listings</div>
                    <div className="text-3xl font-bold text-amber-900 dark:text-amber-500">{stats.activeProducts}</div>
                </div>

                <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg p-6">
                    <div className="text-sm text-stone-600 dark:text-stone-300 mb-2">Total Views</div>
                    <div className="text-3xl font-bold text-stone-900 dark:text-stone-100">{stats.totalViews}</div>
                </div>

                <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg p-6">
                    <div className="text-sm text-stone-600 dark:text-stone-300 mb-2">Total Sales</div>
                    <div className="text-3xl font-bold text-green-600 dark:text-green-500">${stats.totalSales}</div>
                </div>
            </div>

            <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a href="/dashboard/productlisting" className="p-4 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-700 transition">
                        <div className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-1">Add Product</div>
                        <div className="text-sm text-stone-600 dark:text-stone-300">List a new item for sale</div>
                    </a>

                    <a href="/dashboard/sellerprofile" className="p-4 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-700 transition">
                        <div className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-1">Edit Profile</div>
                        <div className="text-sm text-stone-600 dark:text-stone-300">Update your seller information</div>
                    </a>

                    <a href="/dashboard/community" className="p-4 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-700 transition">
                        <div className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-1">Community</div>
                        <div className="text-sm text-stone-600 dark:text-stone-300">Connect with other artisans</div>
                    </a>
                </div>
            </div>
        </div>
    );
}
