'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SideNav from '@/app/ui/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full md:w-64 flex-none">
                <SideNav />
            </div>
            <div className="flex-grow p-4 md:p-6 lg:p-12 overflow-y-auto bg-white dark:bg-stone-900">
                {children}
            </div>
        </div>
    );
}
