// destination/index.ts
export interface Destination {
  id: string;
  name: string;
  slug: string;
  country: string;
  state?: string;
  region?: string;
  
  // Location
  coordinates: {
    lat: number;
    lng: number;
  };
  timezone: string;
  
  // Content
  description: string;
  shortDescription: string;
  highlights: string[];
  
  // Media
  images: DestinationImage[];
  coverImage: string;
  
  // Travel Info
  bestTimeToVisit: string[];
  climate: 'tropical' | 'temperate' | 'arid' | 'continental' | 'polar';
  language: string;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
  
  // Practical Info
  visaRequired: boolean;
  safetyLevel: 'very-safe' | 'safe' | 'moderate' | 'caution' | 'high-risk';
  
  // Business
  featured: boolean;
  popular: boolean;
  tourCount: number;
  
  // SEO
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  
  // Status
  status: 'active' | 'inactive' | 'coming-soon';
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface DestinationImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  isPrimary: boolean;
}

export interface DestinationStats {
  totalTours: number;
  averageRating: number;
  totalBookings: number;
  popularityRank: number;
  seasonalTrends: SeasonalTrend[];
}

export interface SeasonalTrend {
  month: number;
  bookings: number;
  averagePrice: number;
  popularityScore: number;
}

export interface DestinationFilters {
  countries: string[];
  climates: string[];
  safetyLevels: string[];
  visaRequired?: boolean;
  featured?: boolean;
  hasActiveTours?: boolean;
}