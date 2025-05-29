import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Map My Tour - Discover Your Next Adventure',
  description: 'Plan, track, and share your trips, tours, adventures, and activities with our comprehensive platform.',
  keywords: ['travel', 'tours', 'adventures', 'trips', 'activities', 'trekking'],
  openGraph: {
    title: 'Map My Tour',
    description: 'Discover and plan your next adventure',
    url: 'https://www.mapmytour.in',
    siteName: 'Map My Tour',
    images: [
      {
        url: 'https://www.mapmytour.in/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Map My Tour',
    description: 'Discover and plan your next adventure',
    images: ['https://www.mapmytour.in/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
