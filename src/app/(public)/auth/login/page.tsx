import { Metadata } from 'next';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In | Map My Tour',
  description: 'Sign in to your Map My Tour account to access your personalized travel dashboard, manage bookings, and explore amazing destinations.',
  keywords: [
    'login',
    'sign in',
    'travel account',
    'map my tour',
    'travel dashboard',
    'secure login',
    'user authentication'
  ],
  authors: [{ name: 'Map My Tour' }],
  creator: 'Map My Tour',
  publisher: 'Map My Tour',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Sign In to Map My Tour',
    description: 'Access your personalized travel dashboard and explore amazing destinations with Map My Tour.',
    type: 'website',
    siteName: 'Map My Tour',
    images: [
      {
        url: '/images/og-login.jpg',
        width: 1200,
        height: 630,
        alt: 'Map My Tour - Sign In',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign In to Map My Tour',
    description: 'Access your personalized travel dashboard and explore amazing destinations.',
    images: ['/images/twitter-login.jpg'],
    creator: '@mapmytour',
  },
  alternates: {
    canonical: '/public/auth/login',
  },
  other: {
    'theme-color': '#1CA8CB',
    'color-scheme': 'light',
  },
};

export default function LoginPage() {
  return <LoginForm />;
}