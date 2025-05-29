'use client';

import { useTagPosts } from '@/hooks/use-blog';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import BlogPostCard from '@/components/blog/BlogPostCard';
import BlogSidebar from '@/components/blog/BlogSidebar';
import BlogLoadingSkeleton from '@/components/blog/BlogLoadingSkeleton';
import { Badge } from '@/components/ui/badge';
import { Hash, Grid, List, ArrowUpDown, TrendingUp, Calendar } from 'lucide-react';
import Link from 'next/link';

interface BlogTagPageProps {
  params: {
    slug: string;
  };
}

export default function BlogTagPage({ params }: BlogTagPageProps) {
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'oldest'>('latest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  
  const { 
    posts, 
    tag, 
    loading, 
    error, 
    pagination, 
    refetch 
  } = useTagPosts(params.slug, {
    page: currentPage,
    limit: 12,
    sort: {
      field: sortBy === 'popular' ? 'viewCount' : 'publishedAt',
      order: sortBy === 'oldest' ? 'asc' : 'desc'
    }
  });

  const handleSortChange = (newSort: 'latest' | 'popular' | 'oldest') => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && !posts.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse mb-8">
            <div className="h-32 bg-slate-200 rounded-2xl mb-6"></div>
            <div className="h-8 bg-slate-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-2/3"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <BlogLoadingSkeleton count={6} />
            </div>
            <div className="lg:col-span-1">
              <BlogLoadingSkeleton variant="sidebar" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !tag) {
    return notFound();
  }

  const totalPages = Math.ceil(pagination.total / 12);

  // Calculate stats
  const totalViews = posts.reduce((sum, post) => sum + (post.viewCount || 0), 0);
  const avgReadingTime = posts.length > 0 
    ? Math.round(posts.reduce((sum, post) => sum + (post.readingTime || 0), 0) / posts.length)
    : 0;
  const latestPost = posts.length > 0 
    ? new Date(Math.max(...posts.map(post => post.publishedAt.getTime())))
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Tag Hero Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-2 text-sm text-purple-100 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <span>/</span>
              <Link href="/blog/tags" className="hover:text-white transition-colors">Tags</Link>
              <span>/</span>
              <span className="text-white">#{tag.name}</span>
            </nav>

            {/* Tag Title */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <Hash className="w-12 h-12" />
              <div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  #{tag.name}
                </h1>
                <Badge 
                  variant="secondary" 
                  className="bg-white/20 text-white border-white/30 mt-2"
                >
                  {pagination.total} {pagination.total === 1 ? 'Post' : 'Posts'}
                </Badge>
              </div>
            </div>

            {/* Tag Description */}
            <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-8">
              Explore all posts tagged with <strong>#{tag.name}</strong>. 
              Discover insights, tips, and stories related to this topic.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{pagination.total}</div>
                <div className="text-sm text-purple-100">Total Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {totalViews > 1000 ? `${(totalViews / 1000).toFixed(1)}k` : totalViews}
                </div>
                <div className="text-sm text-purple-100">Total Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{avgReadingTime}</div>
                <div className="text-sm text-purple-100">Avg Read Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {latestPost ? latestPost.getFullYear() : 'N/A'}
                </div>
                <div className="text-sm text-purple-100">Latest Year</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Posts Content */}
          <div className="lg:col-span-3">
            {/* Controls */}
            <div className="bg-white rounded-xl p-6 shadow-sm border mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <Hash className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold text-slate-900">
                    Posts tagged #{tag.name}
                  </h2>
                  <span className="text-sm text-slate-500">
                    ({pagination.total} {pagination.total === 1 ? 'post' : 'posts'})
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-slate-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-white text-purple-600 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      aria-label="Grid view"
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'list'
                          ? 'bg-white text-purple-600 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      aria-label="List view"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="w-4 h-4 text-slate-600" />
                    <select
                      value={sortBy}
                      onChange={(e) => handleSortChange(e.target.value as 'latest' | 'popular' | 'oldest')}
                      className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600/50"
                    >
                      <option value="latest">Latest First</option>
                      <option value="popular">Most Popular</option>
                      <option value="oldest">Oldest First</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Stats */}
            {posts.length > 0 && (
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-6 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5" />
                  <h3 className="font-semibold">Publishing Timeline</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold">
                      {latestPost ? latestPost.toLocaleDateString() : 'N/A'}
                    </div>
                    <div className="text-sm text-purple-100">Latest Post</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">
                      {posts.length > 0 ? new Date(Math.min(...posts.map(post => post.publishedAt.getTime()))).toLocaleDateString() : 'N/A'}
                    </div>
                    <div className="text-sm text-purple-100">First Post</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">
                      {posts.filter(post => {
                        const postDate = new Date(post.publishedAt);
                        const currentDate = new Date();
                        const thirtyDaysAgo = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
                        return postDate >= thirtyDaysAgo;
                      }).length}
                    </div>
                    <div className="text-sm text-purple-100">Last 30 Days</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">
                      {Math.round(posts.length / Math.max(1, Math.ceil((Date.now() - Math.min(...posts.map(post => post.publishedAt.getTime()))) / (1000 * 60 * 60 * 24 * 30))))}
                    </div>
                    <div className="text-sm text-purple-100">Posts/Month</div>
                  </div>
                </div>
              </div>
            )}

            {/* Posts Grid/List */}
            {loading ? (
              <BlogLoadingSkeleton variant={viewMode === 'list' ? 'list' : 'grid'} />
            ) : posts.length > 0 ? (
              <>
                <div className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'
                    : 'space-y-8 mb-12'
                }>
                  {posts.map((post) => (
                    <BlogPostCard
                      key={post.id}
                      post={post}
                      variant={viewMode === 'list' ? 'compact' : 'default'}
                      showExcerpt={true}
                      showAuthor={true}
                      showDate={true}
                      showCategories={true}
                      showReadingTime={true}
                      showTags={false} // Don't show tags since we're in tag view
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-4 py-2 text-sm font-medium rounded-lg ${
                            currentPage === pageNum
                              ? 'bg-purple-600 text-white'
                              : 'text-slate-600 bg-white border border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-6">#️⃣</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">No posts found</h3>
                <p className="text-slate-600 mb-8">
                  We haven't published any posts with the tag #{tag.name} yet. 
                  Check back soon for new content!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    <TrendingUp className="w-5 h-5" />
                    Browse All Posts
                  </Link>
                  <Link
                    href="/blog/tags"
                    className="inline-flex items-center gap-2 bg-slate-100 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
                  >
                    <Hash className="w-5 h-5" />
                    Explore Other Tags
                  </Link>
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