import { Metadata } from 'next';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Create Account | Map My Tour',
  description: 'Join Map My Tour today and start planning your perfect travel adventures. Create your free account to access personalized travel recommendations, save destinations, and book amazing experiences.',
  keywords: [
    'register',
    'create account',
    'sign up',
    'join map my tour',
    'travel account',
    'free registration',
    'travel planning',
    'new user',
    'travel community'
  ],
  authors: [{ name: 'Map My Tour' }],
  creator: 'Map My Tour',
  publisher: 'Map My Tour',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Join Map My Tour - Create Your Travel Account',
    description: 'Start planning your perfect travel adventures with Map My Tour. Create your free account today and explore amazing destinations worldwide.',
    type: 'website',
    siteName: 'Map My Tour',
    images: [
      {
        url: '/images/og-register.jpg',
        width: 1200,
        height: 630,
        alt: 'Map My Tour - Create Account',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join Map My Tour - Create Your Travel Account',
    description: 'Start planning your perfect travel adventures. Create your free account today!',
    images: ['/images/twitter-register.jpg'],
    creator: '@mapmytour',
  },
  alternates: {
    canonical: '/public/auth/register',
  },
  other: {
    'theme-color': '#1CA8CB',
    'color-scheme': 'light',
  },
};

export default function RegisterPage() {
  return <RegisterForm />;
}