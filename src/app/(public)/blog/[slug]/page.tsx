'use client';

import { use } from 'react';
import { useBlogPost, useBlogSEO } from '@/hooks/use-blog';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Eye, Share2, Bookmark, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import BlogPostCard from '@/components/blog/BlogPostCard';
import BlogSidebar from '@/components/blog/BlogSidebar';
import { useState, useEffect } from 'react';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // Unwrap the params Promise using React.use()
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  
  const { post, relatedPosts, navigation, loading, error } = useBlogPost(slug);
  const seoData = useBlogSEO(post);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const article = document.getElementById('blog-article');
      if (!article) return;

      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      const progress = Math.min(
        Math.max((scrollTop - articleTop + windowHeight / 2) / articleHeight, 0),
        1
      );

      setReadingProgress(progress * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href
        });
      } catch (err) {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
      } catch (err) {
        console.log('Unable to copy to clipboard');
      }
    }
  };

  const renderContent = (content: any) => {
    switch (content.type) {
      case 'paragraph':
        return (
          <p className="text-lg leading-relaxed text-slate-700 mb-6">
            {content.content}
          </p>
        );
      
      case 'heading':
        return (
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6">
            {content.content}
          </h2>
        );
      
      case 'image':
        return content.images?.map((image: any) => (
          <figure key={image.id} className="my-8">
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
            {image.caption && (
              <figcaption className="text-center text-sm text-slate-600 mt-3 italic">
                {image.caption}
              </figcaption>
            )}
          </figure>
        ));
      
      case 'quote':
        return (
          <blockquote className="border-l-4 border-primary pl-6 my-8 bg-slate-50 p-6 rounded-r-lg">
            <p className="text-xl italic text-slate-800 leading-relaxed">
              "{content.content}"
            </p>
          </blockquote>
        );
      
      case 'list':
        const items = content.content.split('\n').filter((item: string) => item.trim());
        return (
          <ul className="space-y-3 my-6">
            {items.map((item: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></span>
                <span className="text-lg text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        );
      
      case 'code':
        return (
          <pre className="bg-slate-900 text-slate-100 p-6 rounded-xl overflow-x-auto my-8">
            <code>{content.content}</code>
          </pre>
        );
      
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            {/* Hero Section Skeleton */}
            <div className="h-96 bg-slate-200 rounded-2xl mb-8"></div>
            <div className="max-w-4xl mx-auto">
              <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-slate-200 rounded w-1/2 mb-8"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-slate-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* SEO Schema */}
      {seoData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seoData.schema) }}
        />
      )}

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24">
        {post.featuredImage && (
          <div className="absolute inset-0">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          </div>
        )}
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-2 text-sm text-white/80 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-white">{post.title}</span>
            </nav>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {post.categories.map((category) => (
                <Badge
                  key={category.id}
                  variant="secondary"
                  className="bg-white/20 backdrop-blur-sm text-white border-white/30"
                >
                  {category.icon} {category.name}
                </Badge>
              ))}
              {post.featured && (
                <Badge className="bg-yellow-500 text-black font-semibold">
                  ⭐ Featured
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-3xl mx-auto">
              {post.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/90">
              <div className="flex items-center gap-3">
                {post.author.avatar && (
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={post.author.avatar.url}
                      alt={post.author.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="text-left">
                  <div className="font-semibold">{post.author.name}</div>
                  <div className="text-sm text-white/70">Author</div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>

              <div className="flex items-center gap-1">
                <Clock className="w-5 h-5" />
                <span>{post.readingTime} min read</span>
              </div>

              {post.viewCount && (
                <div className="flex items-center gap-1">
                  <Eye className="w-5 h-5" />
                  <span>{post.viewCount.toLocaleString()} views</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
              
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                  isBookmarked
                    ? 'bg-yellow-500 text-black'
                    : 'bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white'
                }`}
              >
                <Bookmark className="w-5 h-5" />
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article id="blog-article" className="max-w-none prose prose-lg">
              <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm">
                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  {post.content.map((content, index) => (
                    <div key={index}>
                      {renderContent(content)}
                    </div>
                  ))}
                </div>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Link
                          key={tag.id}
                          href={`/blog/tags/${tag.slug}`}
                          className="group"
                        >
                          <Badge 
                            variant="outline"
                            className="hover:bg-primary hover:text-white hover:border-primary transition-colors"
                          >
                            #{tag.name}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author Bio */}
                <div className="mt-12 pt-8 border-t border-slate-200">
                  <div className="flex items-start gap-6">
                    {post.author.avatar && (
                      <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={post.author.avatar.url}
                          alt={post.author.name}
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        About {post.author.name}
                      </h3>
                      <p className="text-slate-600 mb-4">
                        {post.author.bio || 'Travel enthusiast and content creator sharing amazing experiences from around the world.'}
                      </p>
                      {post.author.socialLinks && (
                        <div className="flex gap-3">
                          {post.author.socialLinks.website && (
                            <a
                              href={post.author.socialLinks.website}
                              className="text-slate-600 hover:text-primary transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Website
                            </a>
                          )}
                          {post.author.socialLinks.twitter && (
                            <a
                              href={post.author.socialLinks.twitter}
                              className="text-slate-600 hover:text-primary transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Twitter
                            </a>
                          )}
                          {post.author.socialLinks.linkedin && (
                            <a
                              href={post.author.socialLinks.linkedin}
                              className="text-slate-600 hover:text-primary transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              LinkedIn
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Navigation */}
            {navigation && (navigation.previousPost || navigation.nextPost) && (
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                {navigation.previousPost && (
                  <Link
                    href={`/blog/${navigation.previousPost.slug}`}
                    className="group bg-white p-6 rounded-xl border hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 text-primary mb-2">
                      <ArrowLeft className="w-5 h-5" />
                      <span className="text-sm font-medium">Previous Post</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                      {navigation.previousPost.title}
                    </h3>
                  </Link>
                )}

                {navigation.nextPost && (
                  <Link
                    href={`/blog/${navigation.nextPost.slug}`}
                    className="group bg-white p-6 rounded-xl border hover:shadow-lg transition-all md:text-right"
                  >
                    <div className="flex items-center justify-end gap-3 text-primary mb-2">
                      <span className="text-sm font-medium">Next Post</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                      {navigation.nextPost.title}
                    </h3>
                  </Link>
                )}
              </div>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Related Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <BlogPostCard
                      key={relatedPost.id}
                      post={relatedPost}
                      variant="default"
                      showExcerpt={true}
                      showAuthor={true}
                      showDate={true}
                      showCategories={true}
                      showReadingTime={true}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}