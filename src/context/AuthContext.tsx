'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { User } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Auth actions
  login: (credentials: any) => Promise<any>;
  register: (userData: any) => Promise<any>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<any>;
  updateProfile: (data: any) => Promise<any>;
  changePassword: (data: any) => Promise<any>;
  uploadAvatar: (file: File) => Promise<any>;
  verifyEmail: (email: string, otp: string) => Promise<any>;
  resendVerificationEmail: (email: string) => Promise<any>;
  deleteAccount: (password: string) => Promise<any>;
  checkEmailExists: (email: string) => Promise<boolean>;
  checkAuth: () => boolean;
  clearError: () => void;

  // Forgot password methods
  forgotPasswordStep1: (data: any) => Promise<any>;
  forgotPasswordStep2: (data: any) => Promise<any>;
  forgotPasswordStep3: (data: any) => Promise<any>;
  resetPassword: (data: any) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth();

  // Initialize auth state when the app loads
  useEffect(() => {
    if (auth.accessToken && !auth.user) {
      auth.getCurrentUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

// HOC to provide auth context
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    return (
      <AuthProvider>
        <Component {...props} />
      </AuthProvider>
    );
  };
}