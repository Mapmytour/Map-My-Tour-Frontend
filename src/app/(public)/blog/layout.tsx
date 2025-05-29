import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | MapMyTour Blog',
    default: 'Travel Blog | MapMyTour'
  },
  description: 'Discover amazing travel destinations, insider tips, and authentic experiences. Your ultimate guide to exploring the world with MapMyTour.',
  keywords: ['travel blog', 'travel tips', 'destinations', 'travel guide', 'tourism', 'adventure travel', 'budget travel'],
  authors: [{ name: 'MapMyTour Team' }],
  creator: 'MapMyTour',
  publisher: 'MapMyTour',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mappaytour.com'),
  alternates: {
    canonical: '/blog',
    types: {
      'application/rss+xml': [
        { url: '/blog/rss.xml', title: 'MapMyTour Blog RSS Feed' }
      ]
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/blog',
    title: 'Travel Blog | MapMyTour',
    description: 'Discover amazing travel destinations, insider tips, and authentic experiences.',
    siteName: 'MapMyTour',
    images: [
      {
        url: '/images/blog-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MapMyTour Travel Blog'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Blog | MapMyTour',
    description: 'Discover amazing travel destinations, insider tips, and authentic experiences.',
    images: ['/images/blog-og-image.jpg'],
    creator: '@mappaytour'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  }
};

interface BlogLayoutProps {
  children: React.ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Blog Header Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'MapMyTour Travel Blog',
            description: 'Discover amazing travel destinations, insider tips, and authentic experiences',
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mappaytour.com'}/blog`,
            publisher: {
              '@type': 'Organization',
              name: 'MapMyTour',
              logo: {
                '@type': 'ImageObject',
                url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mappaytour.com'}/logo.png`
              }
            },
            inLanguage: 'en-US'
          })
        }}
      />
      
      {/* Blog Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-primary">
                <span className="text-slate-600">MapMyTour</span> Blog
              </h1>
              
              <div className="hidden md:flex items-center space-x-6">
                <a 
                  href="/blog" 
                  className="text-slate-600 hover:text-primary transition-colors"
                >
                  All Posts
                </a>
                <a 
                  href="/blog/categories" 
                  className="text-slate-600 hover:text-primary transition-colors"
                >
                  Categories
                </a>
                <a 
                  href="/blog/tags" 
                  className="text-slate-600 hover:text-primary transition-colors"
                >
                  Tags
                </a>
                <a 
                  href="/blog/archive" 
                  className="text-slate-600 hover:text-primary transition-colors"
                >
                  Archive
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <button className="p-2 text-slate-600 hover:text-primary transition-colors">
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </button>
              
              {/* RSS Feed */}
              <a 
                href="/blog/rss.xml"
                className="p-2 text-slate-600 hover:text-primary transition-colors"
                title="RSS Feed"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z"/>
                </svg>
              </a>
              
              {/* Back to Main Site */}
              <a 
                href="/"
                className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Back to MapMyTour
              </a>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}