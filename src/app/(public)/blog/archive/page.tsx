'use client';

import { useBlogArchive } from '@/hooks/use-blog';
import { Calendar, ChevronDown, ChevronRight, Clock, Eye, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

export default function BlogArchivePage() {
  const { archive, loading, error } = useBlogArchive();
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set());
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());

  const toggleYear = (year: number) => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
      // Also collapse all months for this year
      const monthsToRemove = Array.from(expandedMonths).filter(monthKey => 
        monthKey.startsWith(`${year}-`)
      );
      monthsToRemove.forEach(monthKey => expandedMonths.delete(monthKey));
      setExpandedMonths(new Set(expandedMonths));
    } else {
      newExpanded.add(year);
    }
    setExpandedYears(newExpanded);
  };

  const toggleMonth = (year: number, month: number) => {
    const monthKey = `${year}-${month}`;
    const newExpanded = new Set(expandedMonths);
    if (newExpanded.has(monthKey)) {
      newExpanded.delete(monthKey);
    } else {
      newExpanded.add(monthKey);
    }
    setExpandedMonths(newExpanded);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            {/* Hero Skeleton */}
            <div className="text-center mb-16">
              <div className="h-12 bg-slate-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-6 bg-slate-200 rounded w-2/3 mx-auto mb-8"></div>
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="text-center">
                  <div className="h-8 bg-slate-200 rounded mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded"></div>
                </div>
                <div className="text-center">
                  <div className="h-8 bg-slate-200 rounded mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded"></div>
                </div>
                <div className="text-center">
                  <div className="h-8 bg-slate-200 rounded mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
            
            {/* Archive Skeleton */}
            <div className="max-w-4xl mx-auto space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border">
                  <div className="h-8 bg-slate-200 rounded mb-4"></div>
                  <div className="space-y-3">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="h-6 bg-slate-200 rounded"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Archive</h1>
          <p className="text-slate-600">{error.message}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const totalPosts = archive.reduce((total, year) => 
    total + year.months.reduce((monthTotal, month) => monthTotal + month.count, 0), 0
  );

  const totalYears = archive.length;
  const totalMonths = archive.reduce((total, year) => total + year.months.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Calendar className="w-8 h-8" />
            <h1 className="text-4xl md:text-6xl font-bold">Blog Archive</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Browse our complete collection of articles organized by publication date. 
            Discover timeless content from our archives.
          </p>
          
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm text-blue-100 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white">Archive</span>
          </nav>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{totalPosts}</div>
              <div className="text-sm text-blue-100">Total Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{totalYears}</div>
              <div className="text-sm text-blue-100">Years</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{totalMonths}</div>
              <div className="text-sm text-blue-100">Active Months</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-900">Archive by Date</h2>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setExpandedYears(new Set(archive.map(year => year.year)))}
                className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Expand All
              </button>
              <button
                onClick={() => {
                  setExpandedYears(new Set());
                  setExpandedMonths(new Set());
                }}
                className="text-sm bg-slate-100 text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Archive List */}
          {archive.length > 0 ? (
            <div className="space-y-4">
              {archive.map((yearData) => (
                <div key={yearData.year} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  {/* Year Header */}
                  <button
                    onClick={() => toggleYear(yearData.year)}
                    className="w-full p-6 text-left hover:bg-slate-50 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      {expandedYears.has(yearData.year) ? (
                        <ChevronDown className="w-5 h-5 text-slate-600" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-slate-600" />
                      )}
                      <h3 className="text-2xl font-bold text-slate-900">{yearData.year}</h3>
                      <Badge variant="outline" className="text-blue-600 border-blue-600">
                        {yearData.months.reduce((total, month) => total + month.count, 0)} posts
                      </Badge>
                    </div>
                    <div className="text-sm text-slate-600">
                      {yearData.months.length} {yearData.months.length === 1 ? 'month' : 'months'}
                    </div>
                  </button>

                  {/* Months */}
                  {expandedYears.has(yearData.year) && (
                    <div className="border-t">
                      {yearData.months.map((monthData) => {
                        const monthKey = `${yearData.year}-${monthData.month}`;
                        const isMonthExpanded = expandedMonths.has(monthKey);
                        
                        return (
                          <div key={monthData.month} className="border-b last:border-b-0">
                            {/* Month Header */}
                            <button
                              onClick={() => toggleMonth(yearData.year, monthData.month)}
                              className="w-full p-4 pl-16 text-left hover:bg-slate-50 transition-colors flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                {isMonthExpanded ? (
                                  <ChevronDown className="w-4 h-4 text-slate-500" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-slate-500" />
                                )}
                                <h4 className="text-lg font-semibold text-slate-800">
                                  {monthData.monthName}
                                </h4>
                                <Badge variant="secondary">
                                  {monthData.count} {monthData.count === 1 ? 'post' : 'posts'}
                                </Badge>
                              </div>
                            </button>

                            {/* Posts */}
                            {isMonthExpanded && (
                              <div className="pl-20 pr-6 pb-4">
                                <div className="space-y-3">
                                  {monthData.posts.map((post) => (
                                    <Link
                                      key={post.id}
                                      href={`/blog/${post.slug}`}
                                      className="block group"
                                    >
                                      <article className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition-colors">
                                        <div className="flex items-start justify-between gap-4">
                                          <div className="flex-1 min-w-0">
                                            <h5 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                                              {post.title}
                                            </h5>
                                            <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                                              {post.excerpt}
                                            </p>
                                            <div className="flex items-center gap-4 text-xs text-slate-500">
                                              <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {formatDate(post.publishedAt)}
                                              </span>
                                              <span className="flex items-center gap-1">
                                                <User className="w-3 h-3" />
                                                {post.author.name}
                                              </span>
                                              <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {post.readingTime} min read
                                              </span>
                                              {post.viewCount && (
                                                <span className="flex items-center gap-1">
                                                  <Eye className="w-3 h-3" />
                                                  {post.viewCount}
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                          
                                          {post.featuredImage && (
                                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                              <img
                                                src={post.featuredImage.url}
                                                alt={post.featuredImage.alt}
                                                className="w-full h-full object-cover"
                                              />
                                            </div>
                                          )}
                                        </div>
                                        
                                        {/* Categories */}
                                        {post.categories.length > 0 && (
                                          <div className="flex flex-wrap gap-1 mt-3">
                                            {post.categories.slice(0, 2).map((category) => (
                                              <Badge
                                                key={category.id}
                                                variant="outline"
                                                className="text-xs"
                                                style={{ 
                                                  borderColor: category.color, 
                                                  color: category.color 
                                                }}
                                              >
                                                {category.icon} {category.name}
                                              </Badge>
                                            ))}
                                          </div>
                                        )}
                                      </article>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">📅</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">No archive data available</h3>
              <p className="text-slate-600 mb-8">
                We haven't published any posts yet. Check back soon for new content!
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Calendar className="w-5 h-5" />
                Browse Latest Posts
              </Link>
            </div>
          )}

          {/* Archive Navigation */}
          {archive.length > 0 && (
            <div className="mt-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Explore More Content</h3>
              <p className="text-blue-100 mb-6">
                Browse our content by different organizational methods.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/blog/categories"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Browse by Category
                </Link>
                <Link
                  href="/blog/tags"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
                >
                  Explore Tags
                </Link>
                <Link
                  href="/blog"
                  className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Latest Posts
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}