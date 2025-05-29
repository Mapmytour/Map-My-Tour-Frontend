'use client';

import { useBlogCategories, useBlog } from '@/hooks/use-blog';
import { Badge } from '@/components/ui/badge';
import { BookOpen, TrendingUp, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import BlogPostCard from '@/components/blog/BlogPostCard';
import { useState, useMemo } from 'react';

export default function BlogCategoriesPage() {
  const { categories, loading: categoriesLoading } = useBlogCategories();
  const { posts, loading: postsLoading } = useBlog();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Calculate category stats
  const categoryStats = useMemo(() => {
    if (!posts.length || !categories.length) return {};

    const stats: Record<string, {
      postCount: number;
      totalViews: number;
      latestPost: Date;
      avgReadingTime: number;
    }> = {};

    categories.forEach(category => {
      const categoryPosts = posts.filter(post =>
        post.categories.some(cat => cat.id === category.id)
      );

      stats[category.id] = {
        postCount: categoryPosts.length,
        totalViews: categoryPosts.reduce((sum, post) => sum + (post.viewCount || 0), 0),
        latestPost: categoryPosts.length > 0 
          ? new Date(Math.max(...categoryPosts.map(post => post.publishedAt.getTime())))
          : new Date(0),
        avgReadingTime: categoryPosts.length > 0 
          ? Math.round(categoryPosts.reduce((sum, post) => sum + (post.readingTime || 0), 0) / categoryPosts.length)
          : 0
      };
    });

    return stats;
  }, [posts, categories]);

  // Get popular posts for selected category
  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return [];
    return posts
      .filter(post => post.categories.some(cat => cat.slug === selectedCategory))
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
      .slice(0, 3);
  }, [posts, selectedCategory]);

  const formatDate = (date: Date) => {
    if (date.getTime() === 0) return 'No posts yet';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  if (categoriesLoading || postsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            {/* Hero Skeleton */}
            <div className="text-center mb-16">
              <div className="h-12 bg-slate-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-6 bg-slate-200 rounded w-2/3 mx-auto"></div>
            </div>
            
            {/* Categories Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border">
                  <div className="h-16 bg-slate-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-slate-200 rounded mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="h-6 bg-slate-200 rounded mb-1"></div>
                      <div className="h-3 bg-slate-200 rounded"></div>
                    </div>
                    <div className="text-center">
                      <div className="h-6 bg-slate-200 rounded mb-1"></div>
                      <div className="h-3 bg-slate-200 rounded"></div>
                    </div>
                    <div className="text-center">
                      <div className="h-6 bg-slate-200 rounded mb-1"></div>
                      <div className="h-3 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <BookOpen className="w-8 h-8" />
            <h1 className="text-4xl md:text-6xl font-bold">Blog Categories</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Explore our diverse collection of travel content organized by topics and interests.
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-8 text-blue-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{categories.length}</div>
              <div className="text-sm">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{posts.length}</div>
              <div className="text-sm">Total Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {posts.reduce((sum, post) => sum + (post.viewCount || 0), 0).toLocaleString()}
              </div>
              <div className="text-sm">Total Views</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category) => {
            const stats = categoryStats[category.id] || {
              postCount: 0,
              totalViews: 0,
              latestPost: new Date(0),
              avgReadingTime: 0
            };

            return (
              <div
                key={category.id}
                className="group bg-white rounded-xl overflow-hidden shadow-sm border hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedCategory(
                  selectedCategory === category.slug ? '' : category.slug
                )}
              >
                {/* Header */}
                <div 
                  className="p-6 text-white relative overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${category.color || '#3B82F6'}, ${category.color || '#3B82F6'}CC)` 
                  }}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-20">
                    <div className="text-6xl">{category.icon}</div>
                  </div>
                  <div className="relative z-10">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90 line-clamp-2">
                      {category.description || 'Discover amazing content in this category.'}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-900">{stats.postCount}</div>
                      <div className="text-xs text-slate-600">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-900">
                        {stats.totalViews > 1000 
                          ? `${(stats.totalViews / 1000).toFixed(1)}k` 
                          : stats.totalViews
                        }
                      </div>
                      <div className="text-xs text-slate-600">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-900">{stats.avgReadingTime}</div>
                      <div className="text-xs text-slate-600">Avg Min</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Latest: {formatDate(stats.latestPost)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="outline"
                      style={{ borderColor: category.color, color: category.color }}
                    >
                      {stats.postCount} {stats.postCount === 1 ? 'Post' : 'Posts'}
                    </Badge>
                    
                    <Link
                      href={`/blog/categories/${category.slug}`}
                      className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View All
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Expansion Panel */}
                {selectedCategory === category.slug && filteredPosts.length > 0 && (
                  <div className="border-t bg-slate-50 p-6">
                    <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Popular Posts
                    </h4>
                    <div className="space-y-3">
                      {filteredPosts.map((post) => (
                        <Link
                          key={post.id}
                          href={`/blog/${post.slug}`}
                          className="block group"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-start gap-3 p-3 bg-white rounded-lg hover:shadow-sm transition-shadow">
                            {post.featuredImage && (
                              <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                                <img
                                  src={post.featuredImage.url}
                                  alt={post.featuredImage.alt}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h5 className="font-medium text-slate-900 group-hover:text-primary transition-colors line-clamp-2 text-sm">
                                {post.title}
                              </h5>
                              <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  {post.viewCount || 0}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {post.readingTime} min
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link
                      href={`/blog/categories/${category.slug}`}
                      className="block text-center mt-4 text-primary hover:text-primary/80 font-medium text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View all {category.name.toLowerCase()} posts →
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-2xl p-12 shadow-sm border">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-slate-600 mb-8">
              Explore all our blog posts or use our search feature to find specific content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog"
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Browse All Posts
              </Link>
              <Link
                href="/blog/tags"
                className="bg-slate-100 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
              >
                Explore Tags
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}