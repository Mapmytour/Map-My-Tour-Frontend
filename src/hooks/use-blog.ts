import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  BlogPost,
  BlogCategory,
  BlogTag,
  BlogAuthor,
  BlogStats,
  BlogError,
  BlogQueryParams,
  BlogNavigation,
  BlogArchive,
  UseBlogReturn,
  UseBlogPostReturn,
  UseBlogCategoriesReturn
} from '@/types/blog';
import { blogService } from '@/service/blog-service';

// Main blog hook
export const useBlog = (initialParams?: BlogQueryParams): UseBlogReturn => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<BlogError | null>(null);
  const [stats, setStats] = useState<BlogStats | null>(null);

  const fetchPosts = useCallback(async (params?: BlogQueryParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogService.getAllPosts(params || initialParams);
      setPosts(response.posts);
    } catch (err) {
      setError(err as BlogError);
    } finally {
      setLoading(false);
    }
  }, [initialParams]);

  const fetchPost = useCallback(async (slug: string): Promise<BlogPost | null> => {
    try {
      setError(null);
      return await blogService.getPostBySlug(slug);
    } catch (err) {
      setError(err as BlogError);
      return null;
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      setError(null);
      const response = await blogService.getAllCategories();
      setCategories(response.categories);
    } catch (err) {
      setError(err as BlogError);
    }
  }, []);

  const fetchTags = useCallback(async () => {
    try {
      setError(null);
      const response = await blogService.getAllTags();
      setTags(response.tags);
    } catch (err) {
      setError(err as BlogError);
    }
  }, []);

  const searchPosts = useCallback(async (query: string): Promise<BlogPost[]> => {
    try {
      setError(null);
      return await blogService.searchPosts(query);
    } catch (err) {
      setError(err as BlogError);
      return [];
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      setError(null);
      const blogStats = await blogService.getBlogStats();
      setStats(blogStats);
    } catch (err) {
      setError(err as BlogError);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
    fetchTags();
    fetchStats();
  }, [fetchPosts, fetchCategories, fetchTags, fetchStats]);

  return {
    posts,
    categories,
    tags,
    loading,
    error,
    stats,
    fetchPosts,
    fetchPost,
    fetchCategories,
    fetchTags,
    searchPosts
  };
};

// Hook for individual blog post
export const useBlogPost = (slug?: string): UseBlogPostReturn => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [navigation, setNavigation] = useState<BlogNavigation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<BlogError | null>(null);

  const fetchPost = useCallback(async (postSlug: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch main post
      const blogPost = await blogService.getPostBySlug(postSlug);
      setPost(blogPost);
      
      if (blogPost) {
        // Fetch related posts
        const related = await blogService.getRelatedPosts(blogPost.id);
        setRelatedPosts(related);
        
        // Fetch navigation
        const nav = await blogService.getPostNavigation(postSlug);
        setNavigation(nav);
      }
    } catch (err) {
      setError(err as BlogError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (slug) {
      fetchPost(slug);
    }
  }, [slug, fetchPost]);

  return {
    post,
    relatedPosts,
    navigation,
    loading,
    error,
    fetchPost
  };
};

// Hook for blog categories
export const useBlogCategories = (): UseBlogCategoriesReturn => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<BlogError | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogService.getAllCategories();
      setCategories(response.categories);
    } catch (err) {
      setError(err as BlogError);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCategoryBySlug = useCallback((slug: string): BlogCategory | null => {
    return categories.find(category => category.slug === slug) || null;
  }, [categories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    getCategoryBySlug
  };
};

// Hook for featured posts
export const useFeaturedPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<BlogError | null>(null);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const featuredPosts = await blogService.getFeaturedPosts();
        setPosts(featuredPosts);
      } catch (err) {
        setError(err as BlogError);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPosts();
  }, []);

  return { posts, loading, error };
};

// Hook for recent posts
export const useRecentPosts = (limit: number = 5) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<BlogError | null>(null);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const recentPosts = await blogService.getRecentPosts(limit);
        setPosts(recentPosts);
      } catch (err) {
        setError(err as BlogError);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, [limit]);

  return { posts, loading, error };
};

// Hook for category posts
export const useCategoryPosts = (categorySlug: string, params?: BlogQueryParams) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [category, setCategory] = useState<BlogCategory | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<BlogError | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    hasNext: false,
    hasPrev: false
  });

  const fetchCategoryPosts = useCallback(async (queryParams?: BlogQueryParams) => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch category info
      const categoryInfo = await blogService.getCategoryBySlug(categorySlug);
      setCategory(categoryInfo);
      
      // Fetch posts
      const response = await blogService.getPostsByCategory(categorySlug, queryParams || params);
      setPosts(response.posts);
      setPagination({
        total: response.total,
        page: response.page,
        limit: response.limit,
        hasNext: response.hasNext,
        hasPrev: response.hasPrev
      });
    } catch (err) {
      setError(err as BlogError);
    } finally {
      setLoading(false);
    }
  }, [categorySlug, params]);

  useEffect(() => {
    if (categorySlug) {
      fetchCategoryPosts();
    }
  }, [categorySlug, fetchCategoryPosts]);

  return {
    posts,
    category,
    loading,
    error,
    pagination,
    refetch: fetchCategoryPosts
  };
};

// Hook for tag posts
export const useTagPosts = (tagSlug: string, params?: BlogQueryParams) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [tag, setTag] = useState<BlogTag | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<BlogError | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    hasNext: false,
    hasPrev: false
  });

  const fetchTagPosts = useCallback(async (queryParams?: BlogQueryParams) => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch tag info
      const tagInfo = await blogService.getTagBySlug(tagSlug);
      setTag(tagInfo);
      
      // Fetch posts
      const response = await blogService.getPostsByTag(tagSlug, queryParams || params);
      setPosts(response.posts);
      setPagination({
        total: response.total,
        page: response.page,
        limit: response.limit,
        hasNext: response.hasNext,
        hasPrev: response.hasPrev
      });
    } catch (err) {
      setError(err as BlogError);
    } finally {
      setLoading(false);
    }
  }, [tagSlug, params]);

  useEffect(() => {
    if (tagSlug) {
      fetchTagPosts();
    }
  }, [tagSlug, fetchTagPosts]);

  return {
    posts,
    tag,
    loading,
    error,
    pagination,
    refetch: fetchTagPosts
  };
};

// Hook for blog search
export const useBlogSearch = () => {
  const [results, setResults] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<BlogError | null>(null);
  const [query, setQuery] = useState('');

  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setQuery(searchQuery);
      const searchResults = await blogService.searchPosts(searchQuery);
      setResults(searchResults);
    } catch (err) {
      setError(err as BlogError);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setResults([]);
    setQuery('');
    setError(null);
  }, []);

  return {
    results,
    loading,
    error,
    query,
    search,
    clearSearch
  };
};

// Hook for blog archive
export const useBlogArchive = () => {
  const [archive, setArchive] = useState<BlogArchive[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<BlogError | null>(null);

  useEffect(() => {
    const fetchArchive = async () => {
      try {
        setLoading(true);
        setError(null);
        const archiveData = await blogService.getBlogArchive();
        setArchive(archiveData);
      } catch (err) {
        setError(err as BlogError);
      } finally {
        setLoading(false);
      }
    };

    fetchArchive();
  }, []);

  return { archive, loading, error };
};

// Hook for blog stats
export const useBlogStats = () => {
  const [stats, setStats] = useState<BlogStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<BlogError | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const blogStats = await blogService.getBlogStats();
        setStats(blogStats);
      } catch (err) {
        setError(err as BlogError);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};

// Utility hook for SEO data
export const useBlogSEO = (post?: BlogPost | null) => {
  return useMemo(() => {
    if (!post) return null;

    return {
      title: post.seo.title || post.title,
      description: post.seo.description || post.excerpt,
      keywords: post.seo.keywords || [],
      ogImage: post.seo.ogImage || post.featuredImage,
      canonical: post.seo.canonical,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: post.featuredImage ? [post.featuredImage.url] : [],
        datePublished: post.publishedAt.toISOString(),
        dateModified: post.updatedAt.toISOString(),
        author: {
          '@type': 'Person',
          name: post.author.name,
          url: post.author.socialLinks?.website
        },
        publisher: {
          '@type': 'Organization',
          name: 'MapMyTour',
          logo: {
            '@type': 'ImageObject',
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mapmytour.in'}/logo.png`
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mapmytour.in'}/blog/${post.slug}`
        },
        keywords: post.tags.map(tag => tag.name),
        articleSection: post.categories.map(cat => cat.name),
        wordCount: post.content.reduce((count, content) => count + content.content.split(' ').length, 0)
      }
    };
  }, [post]);
};