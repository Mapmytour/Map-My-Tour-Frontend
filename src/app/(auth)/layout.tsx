'use client';

import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { useEffect } from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthContext();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login'); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <UserHeader /> */}
      <div className="flex">
        {/* <UserSidebar /> */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
