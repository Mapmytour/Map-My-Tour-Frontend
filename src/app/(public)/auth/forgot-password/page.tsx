import { Metadata } from 'next';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Reset Password | Map My Tour',
  description: 'Forgot your Map My Tour password? Reset it securely in just a few simple steps. Enter your email address to receive password reset instructions.',
  keywords: [
    'reset password',
    'forgot password',
    'password recovery',
    'account recovery',
    'map my tour',
    'secure reset',
    'password help',
    'account access',
    'login help'
  ],
  authors: [{ name: 'Map My Tour' }],
  creator: 'Map My Tour',
  publisher: 'Map My Tour',
  robots: {
    index: false, // Don't index password reset pages for security
    follow: false,
  },
  openGraph: {
    title: 'Reset Your Map My Tour Password',
    description: 'Securely reset your Map My Tour password in just a few simple steps.',
    type: 'website',
    siteName: 'Map My Tour',
    images: [
      {
        url: '/images/og-forgot-password.jpg',
        width: 1200,
        height: 630,
        alt: 'Map My Tour - Reset Password',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reset Your Map My Tour Password',
    description: 'Securely reset your password in just a few simple steps.',
    images: ['/images/twitter-forgot-password.jpg'],
    creator: '@mapmytour',
  },
  alternates: {
    canonical: '/public/auth/forgot-password',
  },
  other: {
    'theme-color': '#1CA8CB',
    'color-scheme': 'light',
    'referrer': 'strict-origin-when-cross-origin', // Extra security for password reset
  },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}