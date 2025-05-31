// tour/index.ts
export interface Tour {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  
  // Media
  images: TourImage[];
  
  // Pricing
  price: {
    amount: number;
    currency: string;
    discountedPrice?: number;
  };
  
  // Duration
  duration: {
    days: number;
    nights: number;
  };
  
  // Classification
  category: TourCategory;
  destination: Destination;
  difficulty: 'easy' | 'moderate' | 'challenging' | 'extreme';
  
  // Group
  groupSize: {
    min: number;
    max: number;
  };
  
  // Content
  included: string[];
  excluded: string[];
  highlights: string[];
  itinerary: ItineraryDay[];
  
  // Guide
  guide: Guide;
  
  // Availability
  availability: TourAvailability[];
  
  // Reviews
  rating: {
    average: number;
    count: number;
  };
  
  // Status
  status: 'active' | 'inactive' | 'draft';
  featured: boolean;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface TourImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface TourCategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  image?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: ('breakfast' | 'lunch' | 'dinner')[];
  accommodation?: string;
}

export interface Guide {
  id: string;
  name: string;
  avatar?: string;
  experience: number; // years
  languages: string[];
  rating: number;
  bio: string;
}

export interface TourAvailability {
  id: string;
  startDate: string;
  endDate: string;
  availableSlots: number;
  bookedSlots: number;
  price?: number;
  status: 'available' | 'limited' | 'sold-out' | 'cancelled';
}

export interface TourFilters {
  categories: string[];
  destinations: string[];
  priceRange: [number, number];
  duration: string[];
  difficulty: string[];
  rating: number;
  dates?: {
    from: string;
    to: string;
  };
}