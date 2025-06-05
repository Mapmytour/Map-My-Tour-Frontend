'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';

interface AuthRedirectProps {
    children: React.ReactNode;
    redirectTo?: string;
    loadingComponent?: React.ComponentType;
}

export default function AuthRedirect({
    children,
    redirectTo = '/',
    loadingComponent: LoadingComponent
}: AuthRedirectProps) {
    const { isAuthenticated, isLoading } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        // If user is authenticated and not loading, redirect them away from auth pages
        if (isAuthenticated && !isLoading) {
            router.replace(redirectTo);
        }
    }, [isAuthenticated, isLoading, router, redirectTo]);

    // Show loading state while checking authentication
    if (isLoading) {
        if (LoadingComponent) {
            return <LoadingComponent />;
        }

        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // If user is authenticated, don't render children (they'll be redirected)
    if (isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Redirecting...</p>
                </div>
            </div>
        );
    }

    // User is not authenticated, show the auth pages
    return <>{children}</>;
}