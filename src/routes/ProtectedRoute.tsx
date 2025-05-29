'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { UserRole } from '@/types/auth';
import { Shield, Lock, Loader2, AlertCircle } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: UserRole;
  fallbackPath?: string;
  showLoading?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAuth = true,
  requiredRole,
  fallbackPath = '/auth/login',
  showLoading = true,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading, getCurrentUser } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setIsChecking(true);

      // If we don't require auth, allow access
      if (!requireAuth) {
        setHasAccess(true);
        setIsChecking(false);
        return;
      }

      // If we're not authenticated, redirect
      if (!isAuthenticated) {
        router.replace(fallbackPath);
        setIsChecking(false);
        return;
      }

      // If we don't have user data, try to fetch it
      if (!user) {
        try {
          await getCurrentUser();
        } catch (error) {
          console.error('Failed to get user:', error);
          router.replace(fallbackPath);
          setIsChecking(false);
          return;
        }
      }

      // Check role requirements
      if (requiredRole && user?.role !== requiredRole) {
        setHasAccess(false);
        setIsChecking(false);
        return;
      }

      setHasAccess(true);
      setIsChecking(false);
    };

    checkAuth();
  }, [isAuthenticated, user, requireAuth, requiredRole, router, fallbackPath, getCurrentUser]);

  // Show loading state
  if ((isLoading || isChecking) && showLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
              <h3 className="text-xl font-semibold text-gray-900">
                Verifying Access
              </h3>
            </div>
            <p className="text-gray-600">
              Please wait while we verify your authentication...
            </p>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show access denied for role-based restrictions
  if (!hasAccess && requiredRole && user && user.role !== requiredRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 text-center space-y-6 max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <h3 className="text-xl font-semibold text-gray-900">
                Access Denied
              </h3>
            </div>
            <p className="text-gray-600">
              You don't have permission to access this page. 
              {requiredRole && (
                <>
                  <br />
                  <span className="font-medium">Required role: {requiredRole}</span>
                  <br />
                  <span className="font-medium">Your role: {user?.role}</span>
                </>
              )}
            </p>
          </div>
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => router.back()}
              className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Go Back
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full py-3 px-6 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show children if access is granted
  if (hasAccess) {
    return <>{children}</>;
  }

  // Fallback - should not reach here normally
  return null;
}

// Higher-order component for protecting routes
export function withProtectedRoute<P extends object>(
  Component: React.ComponentType<P>,
  options: Omit<ProtectedRouteProps, 'children'> = {}
) {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}

// Specific role-based protection components
export function AdminRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRole="admin" fallbackPath="/user/profile">
      {children}
    </ProtectedRoute>
  );
}

export function UserRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRole="user">
      {children}
    </ProtectedRoute>
  );
}

// Guest route (redirect authenticated users away)
export function GuestRoute({ 
  children, 
  redirectPath = '/user/profile' 
}: { 
  children: React.ReactNode;
  redirectPath?: string;
}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectPath);
    }
  }, [isAuthenticated, router, redirectPath]);

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}