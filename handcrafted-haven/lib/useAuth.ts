'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth(redirectTo = '/login') {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push(redirectTo);
        }
    }, [router, redirectTo]);

    const getUser = () => {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    };

    const getToken = () => {
        return localStorage.getItem('token');
    };

    return { getUser, getToken };
}
