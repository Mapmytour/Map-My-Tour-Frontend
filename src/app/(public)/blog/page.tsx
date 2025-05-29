'use client';

import { useState, useEffect } from 'react';
import { useBlog, useFeaturedPosts, useBlogCategories } from '@/hooks/use-blog';
import { BlogPost, BlogCategory } from '@/types/blog';
import BlogPostCard from '@/components/blog/BlogPostCard';
import BlogSidebar from '@/components/blog/BlogSidebar';
import BlogFeaturedSection from '@/components/blog/BlogFeaturedSection';
import BlogLoadingSkeleton from '@/components/blog/BlogLoadingSkeleton';

export default function BlogPage() {
  const { posts, loading, error, fetchPosts } = useBlog();
  const { posts: featuredPosts, loading: featuredLoading } = useFeaturedPosts();
  const { categories } = useBlogCategories();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'oldest'>('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Filter and sort posts
  const filteredPosts = posts.filter(post => {
    if (!selectedCategory) return true;
    return post.categories.some(cat => cat.slug === selectedCategory);
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      case 'oldest':
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      case 'popular':
        return (b.viewCount || 0) - (a.viewCount || 0);
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const currentPosts = sortedPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: 'latest' | 'popular' | 'oldest') => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Blog</h1>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Amazing Travel Stories
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Explore the world through our curated collection of travel guides, insider tips, and authentic experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search destinations, tips..."
              className="flex-1 px-4 py-3 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {!featuredLoading && featuredPosts.length > 0 && (
        <BlogFeaturedSection posts={featuredPosts} />
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters and Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <h2 className="text-2xl font-bold text-slate-900">Latest Posts</h2>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleCategoryChange('')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      !selectedCategory 
                        ? 'bg-primary text-white' 
                        : 'bg-white text-slate-600 hover:bg-slate-50 border'
                    }`}
                  >
                    All
                  </button>
                  {categories.slice(0, 5).map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.slug)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category.slug
                          ? 'bg-primary text-white'
                          : 'bg-white text-slate-600 hover:bg-slate-50 border'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value as 'latest' | 'popular' | 'oldest')}
                  className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="latest">Latest</option>
                  <option value="popular">Most Popular</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>

            {/* Posts Grid */}
            {loading ? (
              <BlogLoadingSkeleton />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {currentPosts.map((post) => (
                    <BlogPostCard
                      key={post.id}
                      post={post}
                      variant="default"
                      showExcerpt={true}
                      showAuthor={true}
                      showDate={true}
                      showCategories={true}
                      showReadingTime={true}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg ${
                          currentPage === page
                            ? 'bg-primary text-white'
                            : 'text-slate-600 bg-white border border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}

                {/* No Posts Message */}
                {currentPosts.length === 0 && !loading && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">No posts found</h3>
                    <p className="text-slate-600">
                      {selectedCategory 
                        ? `No posts found in the selected category. Try browsing all posts.`
                        : 'No blog posts available at the moment.'
                      }
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
            <p className="text-slate-300 mb-8">
              Get the latest travel tips, destination guides, and exclusive content delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button className="bg-primary hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}