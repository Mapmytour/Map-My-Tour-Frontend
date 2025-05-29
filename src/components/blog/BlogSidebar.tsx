'use client';

import { useRecentPosts, useBlogCategories, useBlogStats } from '@/hooks/use-blog';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, Calendar, Tag, BookOpen, Eye } from 'lucide-react';
import BlogPostCard from './BlogPostCard';
import Link from 'next/link';
import { useState } from 'react';

export default function BlogSidebar() {
  const { posts: recentPosts, loading: recentLoading } = useRecentPosts(5);
  const { categories, loading: categoriesLoading } = useBlogCategories();
  const { stats, loading: statsLoading } = useBlogStats();
  const [searchQuery, setSearchQuery] = useState('');

  const popularTags = [
    { name: 'Solo Travel', slug: 'solo-travel', count: 12 },
    { name: 'Photography', slug: 'photography', count: 8 },
    { name: 'Budget Travel', slug: 'budget-travel', count: 15 },
    { name: 'Adventure', slug: 'adventure', count: 10 },
    { name: 'Food', slug: 'food', count: 6 },
    { name: 'Culture', slug: 'culture', count: 9 }
  ];

  return (
    <div className="space-y-8">
      {/* Search Widget */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-slate-900">Search Blog</h3>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-primary transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Blog Stats */}
      {!statsLoading && stats && (
        <div className="bg-gradient-to-br from-primary to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-semibold">Blog Stats</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.publishedPosts}</div>
              <div className="text-sm text-blue-100">Published Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.totalCategories}</div>
              <div className="text-sm text-blue-100">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{Math.round(stats.totalViews / 1000)}k</div>
              <div className="text-sm text-blue-100">Total Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.totalTags}</div>
              <div className="text-sm text-blue-100">Tags</div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Posts */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-slate-900">Recent Posts</h3>
        </div>
        
        {recentLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-slate-200 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-slate-200 rounded mb-2"></div>
                    <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {recentPosts.slice(0, 3).map((post) => (
              <BlogPostCard
                key={post.id}
                post={post}
                variant="compact"
                showExcerpt={false}
                showAuthor={false}
                showCategories={false}
              />
            ))}
          </div>
        )}
        
        <div className="mt-6 pt-4 border-t border-slate-100">
          <Link 
            href="/blog" 
            className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1"
          >
            View all posts
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-slate-900">Categories</h3>
        </div>
        
        {categoriesLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-10 bg-slate-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog/categories/${category.slug}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{category.icon}</span>
                  <span className="font-medium text-slate-900 group-hover:text-primary transition-colors">
                    {category.name}
                  </span>
                </div>
                <svg className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Popular Tags */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-center gap-2 mb-6">
          <Tag className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-slate-900">Popular Tags</h3>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/blog/tags/${tag.slug}`}
              className="group"
            >
              <Badge 
                variant="outline" 
                className="hover:bg-primary hover:text-white hover:border-primary transition-colors cursor-pointer"
              >
                #{tag.name} ({tag.count})
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}