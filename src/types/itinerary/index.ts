// itinerary/index.ts

import { Currency } from '../common';

/* ============================== */
/*           Enums                */
/* ============================== */

export enum ItineraryStatus {
  Draft = 'draft',
  Confirmed = 'confirmed',
  InProgress = 'in-progress',
  Completed = 'completed',
}

export enum ActivityType {
  Sightseeing = 'sightseeing',
  Adventure = 'adventure',
  Cultural = 'cultural',
  Shopping = 'shopping',
  Relaxation = 'relaxation',
  Transport = 'transport',
  Other = 'other',
}

export enum ActivityStatus {
  Planned = 'planned',
  Confirmed = 'confirmed',
  Completed = 'completed',
  Skipped = 'skipped',
}

export enum MealType {
  Breakfast = 'breakfast',
  Lunch = 'lunch',
  Dinner = 'dinner',
  Snack = 'snack',
}

export enum AccommodationType {
  Hotel = 'hotel',
  Resort = 'resort',
  Guesthouse = 'guesthouse',
  Apartment = 'apartment',
  Other = 'other',
}

export enum NearbyPlaceType {
  Attraction = 'attraction',
  Restaurant = 'restaurant',
  Shop = 'shop',
  Market = 'market',
  Temple = 'temple',
  Museum = 'museum',
  Park = 'park',
  Beach = 'beach',
  Other = 'other',
}

/* ============================== */
/*        Reusable Types          */
/* ============================== */

export interface Coordinates {
  lat: number;
  lng: number;
}

/* ============================== */
/*         Core Models            */
/* ============================== */

export interface Itinerary {
  id: string;
  title: string;
  description: string;

  // Basic Info
  totalDays: number;
  startDate?: string;
  endDate?: string;

  // Association
  tourId?: string;
  bookingId?: string;
  destinationId?: string;
  activityId?: string;
  servicesId?: string;

  // Participants
  totalParticipants: number;
  participants: Participant[];

  // Daily Plan
  days: ItineraryDay[];

  // Pricing
  totalCost: number;
  currency: Currency;
  costPerPerson?: number;

  // Status
  status: ItineraryStatus;

  // Metadata
  createdAt: string;
  updatedAt: string;
}

/* ============================== */
/*        Participant Info        */
/* ============================== */

export interface Participant {
  fullName: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  email?: string;
  phone?: string;
  passportNumber?: string;
  nationality?: string;
  specialRequirements?: string;
}


export interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  description?: string;

  // Location
  city: string;
  mainLocation: ItineraryLocation;

  // Daily Schedule
  activities: ItineraryActivity[];
  meals: ItineraryMeal[];
  accommodation?: ItineraryAccommodation;

  // Nearby Places
  nearbyPlaces: NearbyPlace[];

  // Highlights
  highlights: string[];

  // Notes
  notes?: string;
}

export interface ItineraryLocation {
  name: string;
  address: string;
  city: string;
  country: string;
  coordinates?: Coordinates;
}

export interface ItineraryActivity {
  id: string;
  name: string;
  description: string;

  // Timing
  startTime: string;
  endTime: string;
  duration: number; // in minutes

  // Location
  location: ItineraryLocation;

  // Type & Status
  type: ActivityType;
  status: ActivityStatus;

  // Cost
  cost?: number;
  included: boolean;

  // Requirements
  requirements?: string[];
}

export interface ItineraryMeal {
  type: MealType;
  name: string;
  location: ItineraryLocation;
  time: string;
  cuisineType?: string;
  cost?: number;
  included: boolean;
}

export interface ItineraryAccommodation {
  name: string;
  type: AccommodationType;
  location: ItineraryLocation;
  checkIn: string;
  checkOut: string;
  roomType: string;
  amenities: string[];
  rating?: number | null;
  cost?: number;
}

export interface NearbyPlace {
  name: string;
  type: NearbyPlaceType;
  location: ItineraryLocation;
  distance: string; // e.g., "2 km", "10 min walk"
  description: string;
  openingHours?: string;
  entryFee?: number;
  recommended: boolean;
}

/* ============================== */
/*          Filters               */
/* ============================== */

export interface ItineraryFilters {
  status?: ItineraryStatus[];
  dateRange?: {
    from: string;
    to: string;
  };
  duration?: {
    min: number;
    max: number;
  };
  cities?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
}

export default Itinerary;
