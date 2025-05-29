// Base interfaces
export interface BlogImage {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface BlogAuthor {
  id: string;
  name: string;
  email: string;
  avatar?: BlogImage;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    github?: string;
    website?: string;
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  parentId?: string;
  children?: BlogCategory[];
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  color?: string;
}

export interface BlogSEO {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: BlogImage;
  canonical?: string;
  noIndex?: boolean;
  schema?: Record<string, any>;
}

export interface BlogContent {
  id: string;
  type: 'paragraph' | 'heading' | 'image' | 'code' | 'quote' | 'list' | 'embed';
  content: string;
  attributes?: Record<string, any>;
  images?: BlogImage[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: BlogContent[];
  htmlContent?: string; // For simple HTML content
  featuredImage?: BlogImage;
  gallery?: BlogImage[];
  author: BlogAuthor;
  categories: BlogCategory[];
  tags: BlogTag[];
  publishedAt: Date;
  updatedAt: Date;
  createdAt: Date;
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  featured?: boolean;
  readingTime?: number; // in minutes
  viewCount?: number;
  seo: BlogSEO;
  relatedPosts?: string[]; // Post IDs
}

export interface BlogStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
  totalCategories: number;
  totalTags: number;
}

// API Response types
export interface BlogPostsResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface BlogCategoriesResponse {
  categories: BlogCategory[];
  total: number;
}

export interface BlogTagsResponse {
  tags: BlogTag[];
  total: number;
}

// Filter and Search types
export interface BlogFilters {
  category?: string;
  tag?: string;
  author?: string;
  status?: BlogPost['status'];
  featured?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}

export interface BlogSortOptions {
  field: 'publishedAt' | 'updatedAt' | 'title' | 'viewCount';
  order: 'asc' | 'desc';
}

export interface BlogQueryParams {
  page?: number;
  limit?: number;
  filters?: BlogFilters;
  sort?: BlogSortOptions;
}

// Component Props types
export interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact' | 'minimal';
  showExcerpt?: boolean;
  showAuthor?: boolean;
  showDate?: boolean;
  showCategories?: boolean;
  showTags?: boolean;
  showReadingTime?: boolean;
}

export interface BlogListProps {
  posts: BlogPost[];
  loading?: boolean;
  variant?: 'grid' | 'list' | 'masonry';
  columns?: 1 | 2 | 3 | 4;
  showPagination?: boolean;
  showFilters?: boolean;
}

export interface BlogDetailProps {
  post: BlogPost;
  relatedPosts?: BlogPost[];
  showAuthorBio?: boolean;
  showRelatedPosts?: boolean;
  showSocialShare?: boolean;
}

// Navigation and Breadcrumb types
export interface BlogBreadcrumb {
  label: string;
  href: string;
  current?: boolean;
}

export interface BlogNavigation {
  previousPost?: {
    id: string;
    title: string;
    slug: string;
  };
  nextPost?: {
    id: string;
    title: string;
    slug: string;
  };
}

// Archive and Sitemap types
export interface BlogArchive {
  year: number;
  months: {
    month: number;
    monthName: string;
    posts: BlogPost[];
    count: number;
  }[];
}

export interface BlogSitemap {
  posts: {
    slug: string;
    lastModified: Date;
    priority: number;
  }[];
  categories: {
    slug: string;
    lastModified: Date;
    priority: number;
  }[];
}

// Error types
export interface BlogError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Hook return types
export interface UseBlogReturn {
  posts: BlogPost[];
  categories: BlogCategory[];
  tags: BlogTag[];
  loading: boolean;
  error: BlogError | null;
  stats: BlogStats | null;
  fetchPosts: (params?: BlogQueryParams) => Promise<void>;
  fetchPost: (slug: string) => Promise<BlogPost | null>;
  fetchCategories: () => Promise<void>;
  fetchTags: () => Promise<void>;
  searchPosts: (query: string) => Promise<BlogPost[]>;
}

export interface UseBlogPostReturn {
  post: BlogPost | null;
  relatedPosts: BlogPost[];
  navigation: BlogNavigation | null;
  loading: boolean;
  error: BlogError | null;
  fetchPost: (slug: string) => Promise<void>;
}

export interface UseBlogCategoriesReturn {
  categories: BlogCategory[];
  loading: boolean;
  error: BlogError | null;
  fetchCategories: () => Promise<void>;
  getCategoryBySlug: (slug: string) => BlogCategory | null;
}

// RSS and Feed types
export interface BlogRSSItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  guid: string;
  categories: string[];
  author: string;
  content: string;
}

export interface BlogRSSFeed {
  title: string;
  description: string;
  link: string;
  language: string;
  lastBuildDate: string;
  items: BlogRSSItem[];
}

// Schema.org types for SEO
export interface BlogSchema {
  '@context': string;
  '@type': 'BlogPosting';
  headline: string;
  description: string;
  image: string[];
  datePublished: string;
  dateModified: string;
  author: {
    '@type': 'Person';
    name: string;
    url?: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
  keywords: string[];
  articleSection: string[];
  wordCount: number;
}