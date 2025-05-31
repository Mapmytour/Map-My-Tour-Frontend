// service/index.ts
export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  
  // Classification
  category: ServiceCategory;
  type: 'accommodation' | 'transport' | 'activity' | 'guide' | 'equipment' | 'insurance' | 'visa';
  
  // Media
  images: ServiceImage[];
  
  // Pricing
  pricing: {
    basePrice: number;
    currency: string;
    pricingModel: 'per-person' | 'per-group' | 'per-day' | 'flat-rate';
    minimumCharge?: number;
  };
  
  // Availability
  available: boolean;
  seasonality: 'year-round' | 'seasonal' | 'limited';
  advanceBooking: number; // days required
  
  // Capacity
  capacity: {
    min: number;
    max: number;
    optimal: number;
  };
  
  // Location
  location?: {
    name: string;
    address?: string;
    coordinates?: { lat: number; lng: number };
  };
  
  // Features
  features: string[];
  included: string[];
  excluded: string[];
  
  // Requirements
  requirements: string[];
  restrictions: string[];
  ageLimit?: {
    min?: number;
    max?: number;
  };
  
  // Provider
  provider: ServiceProvider;
  
  // Quality
  rating: {
    average: number;
    count: number;
  };
  certifications: string[];
  
  // Business
  featured: boolean;
  popular: boolean;
  
  // Integration
  bookingMethod: 'direct' | 'third-party' | 'manual';
  externalId?: string;
  
  // Status
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface ServiceImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface ServiceProvider {
  id: string;
  name: string;
  type: 'partner' | 'supplier' | 'internal';
  contact: {
    email: string;
    phone: string;
    website?: string;
  };
  rating: {
    reliability: number;
    quality: number;
    communication: number;
  };
  paymentTerms: string;
  contract: {
    startDate: string;
    endDate?: string;
    commissionRate?: number;
  };
}

export interface ServiceBooking {
  id: string;
  serviceId: string;
  bookingId: string;
  
  // Details
  quantity: number;
  participants: number;
  startDate: string;
  endDate?: string;
  duration?: number;
  
  // Pricing
  unitPrice: number;
  totalPrice: number;
  currency: string;
  
  // Special Requirements
  requirements?: string[];
  notes?: string;
  
  // Status
  status: 'requested' | 'confirmed' | 'cancelled' | 'completed';
  confirmationNumber?: string;
  
  // Provider Communication
  providerNotified: boolean;
  confirmationReceived: boolean;
  
  // Metadata
  bookedAt: string;
  updatedAt: string;
}

export interface ServiceAvailability {
  serviceId: string;
  date: string;
  available: boolean;
  capacity: number;
  booked: number;
  price?: number;
  restrictions?: string[];
}

export interface ServiceFilters {
  categories: string[];
  types: string[];
  priceRange: [number, number];
  locations: string[];
  providers: string[];
  rating: number;
  featured?: boolean;
  available?: boolean;
}