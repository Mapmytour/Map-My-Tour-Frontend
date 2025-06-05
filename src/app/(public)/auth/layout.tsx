import { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import AuthRedirect from '@/components/auth/AuthRedirect';

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
};

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <AuthProvider>
      <AuthRedirect redirectTo="/">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </AuthRedirect>
    </AuthProvider>
  );
}