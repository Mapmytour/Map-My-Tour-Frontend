import { Metadata } from 'next';

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
    <div className="min-h-screen flex flex-col">
      {children}
    </div>
  );
}