'use client';

import { useBlogSearch, useBlogCategories } from '@/hooks/use-blog';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import BlogPostCard from '@/components/blog/BlogPostCard';
import BlogSidebar from '@/components/blog/BlogSidebar';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, Clock, TrendingUp, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function BlogSearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const { results, loading, error, query, search, clearSearch } = useBlogSearch();
  const { categories } = useBlogCategories();
  
  const [searchInput, setSearchInput] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState<'relevance' | 'latest' | 'popular' | 'oldest'>('relevance');
  const [showFilters, setShowFilters] = useState(false);

  // Perform initial search if query param exists
  useEffect(() => {
    if (initialQuery) {
      search(initialQuery);
      setSearchInput(initialQuery);
    }
  }, [initialQuery, search]);

  // Filter results by category if selected
  const filteredResults = selectedCategory 
    ? results.filter(post => 
        post.categories.some(cat => cat.slug === selectedCategory)
      )
    : results;

  // Sort results
  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      case 'oldest':
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      case 'popular':
        return (b.viewCount || 0) - (a.viewCount || 0);
      case 'relevance':
      default:
        // For relevance, we could implement a more sophisticated scoring system
        // For now, we'll use a simple title match scoring
        const aScore = a.title.toLowerCase().includes(query.toLowerCase()) ? 2 : 1;
        const bScore = b.title.toLowerCase().includes(query.toLowerCase()) ? 2 : 1;
        return bScore - aScore;
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      search(searchInput.trim());
      // Update URL
      const url = new URL(window.location.href);
      url.searchParams.set('q', searchInput.trim());
      window.history.pushState({}, '', url);
    }
  };

  const handleClearSearch = () => {
    clearSearch();
    setSearchInput('');
    setSelectedCategory('');
    // Clear URL params
    const url = new URL(window.location.href);
    url.searchParams.delete('q');
    window.history.pushState({}, '', url);
  };

  const popularSearches = [
    'solo travel', 'budget travel', 'photography', 'backpacking', 
    'food', 'culture', 'adventure', 'beach', 'mountains', 'digital nomad'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Search Hero */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Search className="w-8 h-8" />
              <h1 className="text-4xl md:text-6xl font-bold">Search Blog</h1>
            </div>
            <p className="text-xl text-green-100 mb-8">
              Find exactly what you're looking for in our travel content library.
            </p>
            
            {/* Main Search Form */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for destinations, tips, guides..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full px-6 py-4 pl-14 text-lg rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => setSearchInput('')}
                    className="absolute right-16 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Popular Searches */}
            {!query && (
              <div className="max-w-2xl mx-auto">
                <p className="text-green-100 mb-4">Popular searches:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchInput(term);
                        search(term);
                      }}
                      className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Search Results Header */}
        {query && (
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Search Results for "{query}"
                </h2>
                <p className="text-slate-600">
                  Found {sortedResults.length} {sortedResults.length === 1 ? 'result' : 'results'}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 bg-white border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {(selectedCategory || sortBy !== 'relevance') && (
                    <Badge variant="secondary" className="ml-1">
                      {[selectedCategory && '1', sortBy !== 'relevance' && '1'].filter(Boolean).length}
                    </Badge>
                  )}
                </button>
                
                <button
                  onClick={handleClearSearch}
                  className="flex items-center gap-2 bg-slate-100 text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-3">
                      Filter by Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600/50"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.slug}>
                          {category.icon} {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-3">
                      Sort Results
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'relevance' | 'latest' | 'popular' | 'oldest')}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600/50"
                    >
                      <option value="relevance">Most Relevant</option>
                      <option value="latest">Latest First</option>
                      <option value="popular">Most Popular</option>
                      <option value="oldest">Oldest First</option>
                    </select>
                  </div>
                </div>

                {/* Active Filters */}
                {(selectedCategory || sortBy !== 'relevance') && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-slate-900">Active Filters:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory && (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          Category: {categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}
                          <button
                            onClick={() => setSelectedCategory('')}
                            className="ml-1 hover:text-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      )}
                      {sortBy !== 'relevance' && (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          Sort: {sortBy}
                          <button
                            onClick={() => setSortBy('relevance')}
                            className="ml-1 hover:text-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-white rounded-xl p-6 shadow-sm border">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-slate-200 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="h-6 bg-slate-200 rounded mb-2"></div>
                        <div className="h-4 bg-slate-200 rounded w-3/4 mb-3"></div>
                        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border">
                <div className="text-red-600 text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Search Error</h3>
                <p className="text-slate-600">{error.message}</p>
              </div>
            ) : query ? (
              sortedResults.length > 0 ? (
                <div className="space-y-8">
                  {sortedResults.map((post) => (
                    <BlogPostCard
                      key={post.id}
                      post={post}
                      variant="compact"
                      showExcerpt={true}
                      showAuthor={true}
                      showDate={true}
                      showCategories={true}
                      showReadingTime={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm border">
                  <div className="text-6xl mb-6">🔍</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">No results found</h3>
                  <p className="text-slate-600 mb-8">
                    We couldn't find any posts matching "{query}". 
                    {selectedCategory && " Try removing the category filter or "}
                    Try different keywords or check your spelling.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handleClearSearch}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      Start New Search
                    </button>
                    <Link
                      href="/blog"
                      className="bg-slate-100 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
                    >
                      Browse All Posts
                    </Link>
                  </div>
                </div>
              )
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm border">
                <div className="text-6xl mb-6">🔎</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Start Your Search</h3>
                <p className="text-slate-600 mb-8">
                  Enter keywords above to find relevant blog posts, guides, and travel tips.
                </p>
                
                {/* Search Suggestions */}
                <div className="max-w-2xl mx-auto">
                  <h4 className="font-semibold text-slate-900 mb-4">Search Suggestions:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-slate-900">Popular Topics</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>• Solo travel tips</div>
                        <div>• Budget destinations</div>
                        <div>• Photography guides</div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-slate-900">Recent Trends</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>• Digital nomad</div>
                        <div>• Sustainable travel</div>
                        <div>• Hidden gems</div>
                      </div>
                    </div>
                  </div>
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