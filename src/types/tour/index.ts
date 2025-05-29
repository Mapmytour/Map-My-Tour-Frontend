export interface Tour {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  images: TourImage[];
  price: {
    base: number;
    currency: string;
    discounted?: number;
    groupDiscount?: number;
  };
  duration: {
    days: number;
    nights: number;
  };
  category: TourCategory;
  destination: Destination;
  difficulty: 'easy' | 'moderate' | 'challenging' | 'extreme';
  groupSize: {
    min: number;
    max: number;
  };
  included: string[];
  excluded: string[];
  itinerary: ItineraryDay[];
  highlights: string[];
  requirements: string[];
  cancellationPolicy: string;
  guide: Guide;
  availability: TourAvailability[];
  rating: {
    average: number;
    count: number;
  };
  reviews: Review[];
  status: 'active' | 'inactive' | 'draft';
  featured: boolean;
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
  slug: string;
  country: string;
  state?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  image?: string;
  description?: string;
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
  experience: number;
  languages: string[];
  specialization: string[];
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
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  date: string;
  helpful: number;
}

export interface TourFilters {
  categories: string[];
  destinations: string[];
  priceRange: [number, number];
  duration: string[];
  difficulty: string[];
  rating: number;
}