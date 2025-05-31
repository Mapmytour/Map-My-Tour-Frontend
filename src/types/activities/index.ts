// activities/index.ts
export interface Activity {
  id: string;
  name: string;
  description: string;
  
  // Classification
  category: string;
  type: 'adventure' | 'cultural' | 'educational' | 'recreational' | 'wellness';
  
  // Media
  images: ActivityImage[];
  
  // Difficulty & Requirements
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  physicalRequirement: 'low' | 'moderate' | 'high' | 'extreme';
  ageRestriction: {
    min?: number;
    max?: number;
  };
  
  // Duration
  duration: {
    hours: number;
    minutes: number;
  };
  
  // Group
  groupSize: {
    min: number;
    max: number;
  };
  
  // Location
  location: {
    name: string;
    coordinates?: { lat: number; lng: number };
    indoor: boolean;
  };
  
  // Weather
  weatherDependent: boolean;
  
  // Equipment
  equipment: {
    provided: string[];
    required: string[];
    optional: string[];
  };
  
  // Safety
  safetyLevel: 'low' | 'moderate' | 'high';
  safetyMeasures: string[];
  
  // Pricing
  pricing: {
    basePrice: number;
    currency: string;
    included: boolean; // included in tour price
  };
  
  // Booking
  bookingRequired: boolean;
  advanceBooking: number; // days
  
  // Status
  status: 'active' | 'inactive' | 'seasonal';
  availability: ActivityAvailability[];
  
  // Reviews
  rating: {
    average: number;
    count: number;
  };
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface ActivityImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface ActivityAvailability {
  date: string;
  timeSlots: TimeSlot[];
  capacity: number;
  booked: number;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}