'use client';

import { BlogPost } from '@/types/blog';
import BlogPostCard from './BlogPostCard';
import { Star, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

interface BlogFeaturedSectionProps {
  posts: BlogPost[];
}

export default function BlogFeaturedSection({ posts }: BlogFeaturedSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || posts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % posts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, posts.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % posts.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + posts.length) % posts.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (!posts.length) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Featured Stories
            </h2>
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover our most popular and trending travel stories, handpicked by our editorial team.
          </p>
        </div>

        {/* Main Featured Post Carousel */}
        <div className="relative mb-12">
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${post.featuredImage?.url})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                
                <div className="relative h-full flex items-center">
                  <div className="container mx-auto px-4">
                    <div className="max-w-2xl text-white">
                      {/* Categories */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.categories.slice(0, 2).map((category) => (
                          <span
                            key={category.id}
                            className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                          >
                            {category.icon} {category.name}
                          </span>
                        ))}
                        <span className="px-3 py-1 bg-yellow-500 text-black rounded-full text-sm font-bold">
                          ⭐ Featured
                        </span>
                      </div>
                      
                      <h3 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                        {post.title}
                      </h3>
                      
                      <p className="text-lg md:text-xl text-slate-200 mb-6 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-6 mb-8">
                        <div className="flex items-center gap-3">
                          {post.author.avatar && (
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                              <img
                                src={post.author.avatar.url}
                                alt={post.author.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <span className="font-medium">{post.author.name}</span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-slate-300">
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{post.readingTime} min read</span>
                          {post.viewCount && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" />
                                {post.viewCount > 1000 ? `${(post.viewCount / 1000).toFixed(1)}k` : post.viewCount} views
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <a
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
                      >
                        Read Full Story
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {posts.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Slide Indicators */}
          {posts.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {posts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide 
                      ? 'bg-white' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Auto-play Toggle */}
          {posts.length > 1 && (
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isAutoPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Featured Posts Grid */}
        {posts.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post, index) => (
              <div
                key={post.id}
                className={`transform transition-all duration-300 ${
                  index === currentSlide 
                    ? 'scale-105 ring-2 ring-primary ring-opacity-50' 
                    : 'hover:scale-102'
                }`}
              >
                <BlogPostCard
                  post={post}
                  variant="featured"
                  showExcerpt={true}
                  showAuthor={true}
                  showDate={true}
                  showCategories={true}
                  showReadingTime={true}
                />
              </div>
            ))}
          </div>
        )}

        {/* View All Featured Button */}
        <div className="text-center mt-12">
          <a
            href="/blog?featured=true"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            <Star className="w-5 h-5" />
            Explore All Featured Stories
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}