import {
  BlogPost,
  BlogCategory,
  BlogTag,
  BlogAuthor,
  BlogStats,
  BlogPostsResponse,
  BlogCategoriesResponse,
  BlogTagsResponse,
  BlogQueryParams,
  BlogFilters,
  BlogSortOptions,
  BlogError,
  BlogNavigation,
  BlogArchive,
  BlogRSSFeed,
  BlogRSSItem
} from '@/types/blog';

import {
  mockBlogPosts,
  mockCategories,
  mockTags,
  mockAuthors,
  mockBlogStats,
  getBlogPostBySlug,
  getBlogPostsByCategory,
  getBlogPostsByTag,
  getFeaturedBlogPosts,
  getRecentBlogPosts,
  searchBlogPosts,
  getRelatedPosts
} from '@/data/blogData';

class BlogService {
  private simulateDelay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private handleError(error: any): BlogError {
    return {
      code: error.code || 'UNKNOWN_ERROR',
      message: error.message || 'An unexpected error occurred',
      details: error.details || {}
    };
  }

  private applyFilters(posts: BlogPost[], filters?: BlogFilters): BlogPost[] {
    if (!filters) return posts;

    let filteredPosts = [...posts];

    if (filters.category) {
      filteredPosts = filteredPosts.filter(post =>
        post.categories.some(cat => cat.slug === filters.category)
      );
    }

    if (filters.tag) {
      filteredPosts = filteredPosts.filter(post =>
        post.tags.some(tag => tag.slug === filters.tag)
      );
    }

    if (filters.author) {
      filteredPosts = filteredPosts.filter(post =>
        post.author.id === filters.author
      );
    }

    if (filters.status) {
      filteredPosts = filteredPosts.filter(post =>
        post.status === filters.status
      );
    }

    if (filters.featured !== undefined) {
      filteredPosts = filteredPosts.filter(post =>
        post.featured === filters.featured
      );
    }

    if (filters.dateFrom) {
      filteredPosts = filteredPosts.filter(post =>
        post.publishedAt >= filters.dateFrom!
      );
    }

    if (filters.dateTo) {
      filteredPosts = filteredPosts.filter(post =>
        post.publishedAt <= filters.dateTo!
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.content.some(content => 
          content.content.toLowerCase().includes(searchTerm)
        )
      );
    }

    return filteredPosts;
  }

  private applySorting(posts: BlogPost[], sort?: BlogSortOptions): BlogPost[] {
    if (!sort) {
      // Default sorting by publishedAt desc
      return posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
    }

    return posts.sort((a, b) => {
      let aValue, bValue;

      switch (sort.field) {
        case 'publishedAt':
          aValue = a.publishedAt.getTime();
          bValue = b.publishedAt.getTime();
          break;
        case 'updatedAt':
          aValue = a.updatedAt.getTime();
          bValue = b.updatedAt.getTime();
          break;
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'viewCount':
          aValue = a.viewCount || 0;
          bValue = b.viewCount || 0;
          break;
        default:
          aValue = a.publishedAt.getTime();
          bValue = b.publishedAt.getTime();
      }

      if (sort.order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }

  private paginatePosts(
    posts: BlogPost[], 
    page: number = 1, 
    limit: number = 10
  ): { paginatedPosts: BlogPost[]; hasNext: boolean; hasPrev: boolean } {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = posts.slice(startIndex, endIndex);
    
    return {
      paginatedPosts,
      hasNext: endIndex < posts.length,
      hasPrev: startIndex > 0
    };
  }

  // Blog Posts Methods
  async getAllPosts(params?: BlogQueryParams): Promise<BlogPostsResponse> {
    try {
      await this.simulateDelay();
      
      let posts = [...mockBlogPosts.filter(post => post.status === 'published')];
      
      // Apply filters
      if (params?.filters) {
        posts = this.applyFilters(posts, params.filters);
      }
      
      // Apply sorting
      posts = this.applySorting(posts, params?.sort);
      
      // Apply pagination
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const { paginatedPosts, hasNext, hasPrev } = this.paginatePosts(posts, page, limit);
      
      return {
        posts: paginatedPosts,
        total: posts.length,
        page,
        limit,
        hasNext,
        hasPrev
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      await this.simulateDelay(300);
      
      const post = getBlogPostBySlug(slug);
      
      if (post && post.status === 'published') {
        // Simulate view count increment
        post.viewCount = (post.viewCount || 0) + 1;
        return post;
      }
      
      return null;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getFeaturedPosts(): Promise<BlogPost[]> {
    try {
      await this.simulateDelay(200);
      return getFeaturedBlogPosts();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getRecentPosts(limit: number = 5): Promise<BlogPost[]> {
    try {
      await this.simulateDelay(200);
      return getRecentBlogPosts(limit);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getRelatedPosts(postId: string, limit: number = 3): Promise<BlogPost[]> {
    try {
      await this.simulateDelay(200);
      
      const currentPost = mockBlogPosts.find(post => post.id === postId);
      if (!currentPost) return [];
      
      return getRelatedPosts(currentPost, limit);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async searchPosts(query: string): Promise<BlogPost[]> {
    try {
      await this.simulateDelay(300);
      return searchBlogPosts(query);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Categories Methods
  async getAllCategories(): Promise<BlogCategoriesResponse> {
    try {
      await this.simulateDelay(200);
      
      return {
        categories: mockCategories,
        total: mockCategories.length
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getCategoryBySlug(slug: string): Promise<BlogCategory | null> {
    try {
      await this.simulateDelay(200);
      return mockCategories.find(category => category.slug === slug) || null;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getPostsByCategory(categorySlug: string, params?: BlogQueryParams): Promise<BlogPostsResponse> {
    try {
      await this.simulateDelay();
      
      let posts = getBlogPostsByCategory(categorySlug);
      
      // Apply additional filters if provided
      if (params?.filters) {
        posts = this.applyFilters(posts, params.filters);
      }
      
      // Apply sorting
      posts = this.applySorting(posts, params?.sort);
      
      // Apply pagination
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const { paginatedPosts, hasNext, hasPrev } = this.paginatePosts(posts, page, limit);
      
      return {
        posts: paginatedPosts,
        total: posts.length,
        page,
        limit,
        hasNext,
        hasPrev
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Tags Methods
  async getAllTags(): Promise<BlogTagsResponse> {
    try {
      await this.simulateDelay(200);
      
      return {
        tags: mockTags,
        total: mockTags.length
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getTagBySlug(slug: string): Promise<BlogTag | null> {
    try {
      await this.simulateDelay(200);
      return mockTags.find(tag => tag.slug === slug) || null;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getPostsByTag(tagSlug: string, params?: BlogQueryParams): Promise<BlogPostsResponse> {
    try {
      await this.simulateDelay();
      
      let posts = getBlogPostsByTag(tagSlug);
      
      // Apply additional filters if provided
      if (params?.filters) {
        posts = this.applyFilters(posts, params.filters);
      }
      
      // Apply sorting
      posts = this.applySorting(posts, params?.sort);
      
      // Apply pagination
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const { paginatedPosts, hasNext, hasPrev } = this.paginatePosts(posts, page, limit);
      
      return {
        posts: paginatedPosts,
        total: posts.length,
        page,
        limit,
        hasNext,
        hasPrev
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Authors Methods
  async getAllAuthors(): Promise<BlogAuthor[]> {
    try {
      await this.simulateDelay(200);
      return mockAuthors;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getAuthorById(id: string): Promise<BlogAuthor | null> {
    try {
      await this.simulateDelay(200);
      return mockAuthors.find(author => author.id === id) || null;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getPostsByAuthor(authorId: string, params?: BlogQueryParams): Promise<BlogPostsResponse> {
    try {
      await this.simulateDelay();
      
      let posts = mockBlogPosts.filter(post => 
        post.author.id === authorId && post.status === 'published'
      );
      
      // Apply additional filters if provided
      if (params?.filters) {
        posts = this.applyFilters(posts, params.filters);
      }
      
      // Apply sorting
      posts = this.applySorting(posts, params?.sort);
      
      // Apply pagination
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const { paginatedPosts, hasNext, hasPrev } = this.paginatePosts(posts, page, limit);
      
      return {
        posts: paginatedPosts,
        total: posts.length,
        page,
        limit,
        hasNext,
        hasPrev
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Stats Methods
  async getBlogStats(): Promise<BlogStats> {
    try {
      await this.simulateDelay(200);
      return mockBlogStats;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Navigation Methods
  async getPostNavigation(currentSlug: string): Promise<BlogNavigation | null> {
    try {
      await this.simulateDelay(200);
      
      const publishedPosts = mockBlogPosts
        .filter(post => post.status === 'published')
        .sort((a, b) => a.publishedAt.getTime() - b.publishedAt.getTime());
      
      const currentIndex = publishedPosts.findIndex(post => post.slug === currentSlug);
      
      if (currentIndex === -1) return null;
      
      const previousPost = currentIndex > 0 ? publishedPosts[currentIndex - 1] : undefined;
      const nextPost = currentIndex < publishedPosts.length - 1 ? publishedPosts[currentIndex + 1] : undefined;
      
      return {
        previousPost: previousPost ? {
          id: previousPost.id,
          title: previousPost.title,
          slug: previousPost.slug
        } : undefined,
        nextPost: nextPost ? {
          id: nextPost.id,
          title: nextPost.title,
          slug: nextPost.slug
        } : undefined
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Archive Methods
  async getBlogArchive(): Promise<BlogArchive[]> {
    try {
      await this.simulateDelay(300);
      
      const publishedPosts = mockBlogPosts.filter(post => post.status === 'published');
      const archiveMap = new Map<number, Map<number, BlogPost[]>>();
      
      publishedPosts.forEach(post => {
        const year = post.publishedAt.getFullYear();
        const month = post.publishedAt.getMonth();
        
        if (!archiveMap.has(year)) {
          archiveMap.set(year, new Map());
        }
        
        const yearMap = archiveMap.get(year)!;
        if (!yearMap.has(month)) {
          yearMap.set(month, []);
        }
        
        yearMap.get(month)!.push(post);
      });
      
      const archive: BlogArchive[] = [];
      
      archiveMap.forEach((yearMap, year) => {
        const months = Array.from(yearMap.entries()).map(([month, posts]) => ({
          month: month + 1,
          monthName: new Date(year, month).toLocaleString('default', { month: 'long' }),
          posts: posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()),
          count: posts.length
        }));
        
        archive.push({
          year,
          months: months.sort((a, b) => b.month - a.month)
        });
      });
      
      return archive.sort((a, b) => b.year - a.year);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // RSS Feed Methods
  async generateRSSFeed(): Promise<BlogRSSFeed> {
    try {
      await this.simulateDelay(200);
      
      const recentPosts = this.getRecentPosts(20);
      
      const items: BlogRSSItem[] = (await recentPosts).map(post => ({
        title: post.title,
        description: post.excerpt,
        link: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mappaytour.com'}/blog/${post.slug}`,
        pubDate: post.publishedAt.toUTCString(),
        guid: post.id,
        categories: post.categories.map(cat => cat.name),
        author: post.author.email,
        content: post.htmlContent || post.excerpt
      }));
      
      return {
        title: 'MapMyTour Blog',
        description: 'Latest travel guides, tips, and destination insights',
        link: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mappaytour.com'}/blog`,
        language: 'en-US',
        lastBuildDate: new Date().toUTCString(),
        items
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

// Export singleton instance
export const blogService = new BlogService();
export default blogService;