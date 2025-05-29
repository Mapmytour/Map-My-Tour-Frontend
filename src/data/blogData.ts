import { 
  BlogPost, 
  BlogCategory, 
  BlogTag, 
  BlogAuthor, 
  BlogImage,
  BlogStats 
} from '@/types/blog';

// Mock Images
export const mockImages: BlogImage[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'Mountain landscape with beautiful sunrise',
    width: 2070,
    height: 1380,
    caption: 'Sunrise over mountain peaks'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73aff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    alt: 'Tropical beach with crystal clear water',
    width: 2071,
    height: 1381,
    caption: 'Paradise beach destination'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'Historic European city street',
    width: 2070,
    height: 1380,
    caption: 'Charming European architecture'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2035&q=80',
    alt: 'Adventure hiking trail',
    width: 2035,
    height: 1357,
    caption: 'Mountain hiking adventure'
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    alt: 'Travel blogger avatar',
    width: 1000,
    height: 1000,
    caption: 'Professional headshot'
  }
];

// Mock Authors
export const mockAuthors: BlogAuthor[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@mappaytour.com',
    avatar: mockImages[4],
    bio: 'Travel enthusiast and professional tour guide with over 10 years of experience exploring hidden gems around the world.',
    socialLinks: {
      twitter: 'https://twitter.com/sarahjohnson',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      website: 'https://sarahjohnson.com'
    }
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@mappaytour.com',
    bio: 'Adventure photographer and travel writer specializing in mountain expeditions and cultural experiences.',
    socialLinks: {
      instagram: 'https://instagram.com/michaelchen',
      linkedin: 'https://linkedin.com/in/michaelchen'
    }
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    email: 'emma@mappaytour.com',
    bio: 'Cultural anthropologist turned travel blogger, passionate about authentic local experiences and sustainable tourism.',
    socialLinks: {
      twitter: 'https://twitter.com/emmarodriguez',
      website: 'https://emmarodriguez.com'
    }
  }
];

// Mock Categories
export const mockCategories: BlogCategory[] = [
  {
    id: '1',
    name: 'Destinations',
    slug: 'destinations',
    description: 'Explore amazing travel destinations around the world',
    color: '#3B82F6',
    icon: '🏖️'
  },
  {
    id: '2',
    name: 'Travel Tips',
    slug: 'travel-tips',
    description: 'Essential tips and tricks for better travel experiences',
    color: '#10B981',
    icon: '💡'
  },
  {
    id: '3',
    name: 'Adventure',
    slug: 'adventure',
    description: 'Thrilling adventures and outdoor activities',
    color: '#F59E0B',
    icon: '🏔️'
  },
  {
    id: '4',
    name: 'Culture',
    slug: 'culture',
    description: 'Discover local cultures and traditions',
    color: '#8B5CF6',
    icon: '🎭'
  },
  {
    id: '5',
    name: 'Food & Cuisine',
    slug: 'food-cuisine',
    description: 'Culinary experiences and local delicacies',
    color: '#EF4444',
    icon: '🍽️'
  },
  {
    id: '6',
    name: 'Budget Travel',
    slug: 'budget-travel',
    description: 'Travel smart without breaking the bank',
    color: '#06B6D4',
    icon: '💰'
  }
];

// Mock Tags
export const mockTags: BlogTag[] = [
  { id: '1', name: 'Solo Travel', slug: 'solo-travel', color: '#3B82F6' },
  { id: '2', name: 'Photography', slug: 'photography', color: '#10B981' },
  { id: '3', name: 'Backpacking', slug: 'backpacking', color: '#F59E0B' },
  { id: '4', name: 'Luxury Travel', slug: 'luxury-travel', color: '#8B5CF6' },
  { id: '5', name: 'Family Travel', slug: 'family-travel', color: '#EF4444' },
  { id: '6', name: 'Digital Nomad', slug: 'digital-nomad', color: '#06B6D4' },
  { id: '7', name: 'Sustainable Tourism', slug: 'sustainable-tourism', color: '#84CC16' },
  { id: '8', name: 'Road Trip', slug: 'road-trip', color: '#F97316' },
  { id: '9', name: 'Beach', slug: 'beach', color: '#06B6D4' },
  { id: '10', name: 'Mountains', slug: 'mountains', color: '#6B7280' }
];

// Mock Blog Posts
export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Hidden Gems in Southeast Asia You Must Visit',
    slug: '10-hidden-gems-southeast-asia',
    excerpt: 'Discover breathtaking destinations off the beaten path in Southeast Asia. From secluded beaches to ancient temples, these hidden gems offer authentic experiences away from tourist crowds.',
    content: [
      {
        id: '1',
        type: 'paragraph',
        content: 'Southeast Asia is renowned for its popular destinations like Thailand\'s beaches, Vietnam\'s bustling cities, and Indonesia\'s islands. However, beyond these well-known spots lie incredible hidden gems waiting to be discovered.'
      },
      {
        id: '2',
        type: 'heading',
        content: '1. Kep, Cambodia'
      },
      {
        id: '3',
        type: 'paragraph',
        content: 'This sleepy coastal town offers incredible seafood, abandoned French colonial villas, and a relaxed atmosphere perfect for those seeking tranquility.'
      },
      {
        id: '4',
        type: 'image',
        content: '',
        images: [mockImages[1]]
      }
    ],
    htmlContent: '<p>Southeast Asia is renowned for its popular destinations...</p>',
    featuredImage: mockImages[0],
    gallery: [mockImages[0], mockImages[1], mockImages[2]],
    author: mockAuthors[0],
    categories: [mockCategories[0], mockCategories[3]],
    tags: [mockTags[0], mockTags[6], mockTags[8]],
    publishedAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-16'),
    createdAt: new Date('2024-01-10'),
    status: 'published',
    featured: true,
    readingTime: 8,
    viewCount: 2547,
    seo: {
      title: '10 Hidden Gems in Southeast Asia - Ultimate Travel Guide',
      description: 'Discover breathtaking hidden destinations in Southeast Asia. From secluded beaches to ancient temples, explore authentic experiences off the beaten path.',
      keywords: ['Southeast Asia', 'hidden gems', 'travel destinations', 'off the beaten path', 'authentic travel'],
      ogImage: mockImages[0]
    },
    relatedPosts: ['2', '3']
  },
  {
    id: '2',
    title: 'Budget Travel Guide: How to Explore Europe for Under $50 a Day',
    slug: 'budget-travel-europe-50-dollars-day',
    excerpt: 'Traveling through Europe doesn\'t have to break the bank. Learn practical strategies to explore European cities, eat well, and find accommodation while staying within a tight budget.',
    content: [
      {
        id: '1',
        type: 'paragraph',
        content: 'Europe has a reputation for being expensive, but with smart planning and insider knowledge, you can explore this incredible continent on a shoestring budget.'
      },
      {
        id: '2',
        type: 'heading',
        content: 'Accommodation Strategies'
      },
      {
        id: '3',
        type: 'list',
        content: 'Hostels in Eastern Europe: $10-15/night\nCouchsurfing opportunities\nHouse-sitting arrangements\nBudget hotels in smaller cities'
      }
    ],
    htmlContent: '<p>Europe has a reputation for being expensive...</p>',
    featuredImage: mockImages[2],
    author: mockAuthors[1],
    categories: [mockCategories[5], mockCategories[1]],
    tags: [mockTags[2], mockTags[0]],
    publishedAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-21'),
    createdAt: new Date('2024-01-18'),
    status: 'published',
    featured: false,
    readingTime: 12,
    viewCount: 1823,
    seo: {
      title: 'Budget Travel Europe: Complete Guide Under $50/Day',
      description: 'Learn how to travel through Europe on a budget. Practical tips for accommodation, food, and transportation to explore Europe for under $50 per day.',
      keywords: ['budget travel', 'Europe travel', 'cheap travel', 'backpacking Europe', 'travel tips'],
      ogImage: mockImages[2]
    },
    relatedPosts: ['1', '4']
  },
  {
    id: '3',
    title: 'The Ultimate Mountain Hiking Adventure: Conquering the Himalayas',
    slug: 'ultimate-mountain-hiking-adventure-himalayas',
    excerpt: 'Embark on the journey of a lifetime through the world\'s highest mountain range. From preparation tips to trail highlights, everything you need to know about Himalayan trekking.',
    content: [
      {
        id: '1',
        type: 'paragraph',
        content: 'The Himalayas represent the ultimate challenge for adventure seekers and nature enthusiasts. This comprehensive guide will prepare you for an unforgettable journey.'
      },
      {
        id: '2',
        type: 'heading',
        content: 'Essential Preparation'
      },
      {
        id: '3',
        type: 'paragraph',
        content: 'Physical fitness is crucial for high-altitude trekking. Start training at least 6 months before your expedition.'
      }
    ],
    htmlContent: '<p>The Himalayas represent the ultimate challenge...</p>',
    featuredImage: mockImages[3],
    author: mockAuthors[1],
    categories: [mockCategories[2], mockCategories[0]],
    tags: [mockTags[9], mockTags[0], mockTags[1]],
    publishedAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-26'),
    createdAt: new Date('2024-01-22'),
    status: 'published',
    featured: true,
    readingTime: 15,
    viewCount: 3421,
    seo: {
      title: 'Himalayan Trekking Guide: Ultimate Mountain Adventure',
      description: 'Complete guide to Himalayan trekking. Learn about preparation, trails, and essential tips for conquering the world\'s highest mountains.',
      keywords: ['Himalayas', 'mountain trekking', 'adventure travel', 'hiking guide', 'high altitude'],
      ogImage: mockImages[3]
    },
    relatedPosts: ['1', '5']
  },
  {
    id: '4',
    title: 'Local Food Adventures: Street Food Guide to Thailand',
    slug: 'local-food-adventures-street-food-thailand',
    excerpt: 'Dive into Thailand\'s incredible street food scene. From Bangkok\'s bustling markets to hidden local gems, discover the authentic flavors that make Thai cuisine world-famous.',
    content: [
      {
        id: '1',
        type: 'paragraph',
        content: 'Thailand\'s street food culture is a vibrant tapestry of flavors, aromas, and traditions that have been passed down through generations.'
      },
      {
        id: '2',
        type: 'heading',
        content: 'Must-Try Street Foods'
      },
      {
        id: '3',
        type: 'list',
        content: 'Pad Thai from street vendors\nSom Tam (papaya salad)\nMango Sticky Rice\nTom Yum soup\nSatay skewers'
      }
    ],
    htmlContent: '<p>Thailand\'s street food culture is a vibrant tapestry...</p>',
    featuredImage: mockImages[1],
    author: mockAuthors[2],
    categories: [mockCategories[4], mockCategories[0]],
    tags: [mockTags[0], mockTags[1]],
    publishedAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-01-29'),
    createdAt: new Date('2024-01-25'),
    status: 'published',
    featured: false,
    readingTime: 10,
    viewCount: 1967,
    seo: {
      title: 'Thailand Street Food Guide: Authentic Local Cuisine',
      description: 'Explore Thailand\'s amazing street food scene. Complete guide to the best local dishes, markets, and authentic Thai flavors.',
      keywords: ['Thailand food', 'street food', 'Thai cuisine', 'local food', 'food travel'],
      ogImage: mockImages[1]
    },
    relatedPosts: ['2', '6']
  },
  {
    id: '5',
    title: 'Digital Nomad\'s Paradise: Best Cities for Remote Work',
    slug: 'digital-nomad-paradise-best-cities-remote-work',
    excerpt: 'Working remotely while traveling the world is more accessible than ever. Discover the top cities that offer perfect conditions for digital nomads.',
    content: [
      {
        id: '1',
        type: 'paragraph',
        content: 'The rise of remote work has opened up incredible opportunities for location-independent professionals to explore the world while maintaining their careers.'
      },
      {
        id: '2',
        type: 'heading',
        content: 'Top Digital Nomad Cities'
      },
      {
        id: '3',
        type: 'paragraph',
        content: 'Lisbon, Portugal offers affordable living, excellent co-working spaces, and a thriving expat community.'
      }
    ],
    htmlContent: '<p>The rise of remote work has opened up incredible opportunities...</p>',
    featuredImage: mockImages[2],
    author: mockAuthors[0],
    categories: [mockCategories[1], mockCategories[0]],
    tags: [mockTags[5], mockTags[0]],
    publishedAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-02'),
    createdAt: new Date('2024-01-28'),
    status: 'published',
    featured: true,
    readingTime: 11,
    viewCount: 2834,
    seo: {
      title: 'Best Cities for Digital Nomads: Remote Work Guide',
      description: 'Discover the top destinations for digital nomads. Complete guide to cities with great wifi, co-working spaces, and nomad communities.',
      keywords: ['digital nomad', 'remote work', 'nomad cities', 'work from anywhere', 'location independent'],
      ogImage: mockImages[2]
    },
    relatedPosts: ['1', '2']
  },
  {
    id: '6',
    title: 'Sustainable Tourism: How to Travel Responsibly',
    slug: 'sustainable-tourism-travel-responsibly',
    excerpt: 'Learn how to minimize your environmental impact while maximizing positive contributions to local communities. A comprehensive guide to responsible travel.',
    content: [
      {
        id: '1',
        type: 'paragraph',
        content: 'Sustainable tourism is about making conscious choices that benefit both the environment and local communities while still enjoying incredible travel experiences.'
      },
      {
        id: '2',
        type: 'heading',
        content: 'Principles of Responsible Travel'
      },
      {
        id: '3',
        type: 'list',
        content: 'Choose eco-friendly accommodations\nSupport local businesses\nRespect local cultures\nMinimize waste and plastic use\nOffset your carbon footprint'
      }
    ],
    htmlContent: '<p>Sustainable tourism is about making conscious choices...</p>',
    featuredImage: mockImages[0],
    author: mockAuthors[2],
    categories: [mockCategories[1], mockCategories[3]],
    tags: [mockTags[6], mockTags[0]],
    publishedAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-06'),
    createdAt: new Date('2024-02-01'),
    status: 'published',
    featured: false,
    readingTime: 9,
    viewCount: 1456,
    seo: {
      title: 'Sustainable Tourism Guide: Travel Responsibly',
      description: 'Learn how to travel sustainably and responsibly. Complete guide to eco-friendly travel, supporting local communities, and minimizing environmental impact.',
      keywords: ['sustainable tourism', 'responsible travel', 'eco-friendly travel', 'green travel', 'ethical tourism'],
      ogImage: mockImages[0]
    },
    relatedPosts: ['1', '4']
  }
];

// Mock Stats
export const mockBlogStats: BlogStats = {
  totalPosts: mockBlogPosts.length,
  publishedPosts: mockBlogPosts.filter(post => post.status === 'published').length,
  draftPosts: mockBlogPosts.filter(post => post.status === 'draft').length,
  totalViews: mockBlogPosts.reduce((total, post) => total + (post.viewCount || 0), 0),
  totalCategories: mockCategories.length,
  totalTags: mockTags.length
};

// Helper functions
export const getBlogPostBySlug = (slug: string): BlogPost | null => {
  return mockBlogPosts.find(post => post.slug === slug) || null;
};

export const getBlogPostsByCategory = (categorySlug: string): BlogPost[] => {
  return mockBlogPosts.filter(post =>
    post.categories.some(category => category.slug === categorySlug)
  );
};

export const getBlogPostsByTag = (tagSlug: string): BlogPost[] => {
  return mockBlogPosts.filter(post =>
    post.tags.some(tag => tag.slug === tagSlug)
  );
};

export const getFeaturedBlogPosts = (): BlogPost[] => {
  return mockBlogPosts.filter(post => post.featured);
};

export const getRecentBlogPosts = (limit: number = 5): BlogPost[] => {
  return mockBlogPosts
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, limit);
};

export const searchBlogPosts = (query: string): BlogPost[] => {
  const searchTerm = query.toLowerCase();
  return mockBlogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.name.toLowerCase().includes(searchTerm)) ||
    post.categories.some(category => category.name.toLowerCase().includes(searchTerm))
  );
};

export const getRelatedPosts = (currentPost: BlogPost, limit: number = 3): BlogPost[] => {
  const relatedPosts = mockBlogPosts.filter(post => {
    if (post.id === currentPost.id) return false;
    
    // Check if posts share categories or tags
    const sharedCategories = post.categories.some(category =>
      currentPost.categories.some(currentCategory => currentCategory.id === category.id)
    );
    
    const sharedTags = post.tags.some(tag =>
      currentPost.tags.some(currentTag => currentTag.id === tag.id)
    );
    
    return sharedCategories || sharedTags;
  });
  
  return relatedPosts.slice(0, limit);
};