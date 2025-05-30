
export type ContactMethod = 'email' | 'phone' | 'whatsapp';

export type TravelType =
  | 'family'
  | 'honeymoon'
  | 'solo'
  | 'group'
  | 'corporate';

export type HotelCategory = 'budget' | 'standard' | 'luxury' | 'any';

export type RoomType = 'single' | 'double' | 'suite';

export interface PersonalInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  preferredContactMethod: ContactMethod;
}

export interface TripDetails {
  destination: string;
  departureCity: string;
  departureDate: Date;
  returnDate: Date;
  flexibleDates: boolean;
  numberOfAdults: number;
  numberOfChildren: number;
  travelType: TravelType;
}

export interface AccommodationPreferences {
  hotelCategory: HotelCategory;
  numberOfRooms: number;
  roomType: RoomType;
}

export interface ActivitiesAndInclusions {
  interestedActivities: string[]; // e.g., ["sightseeing", "hiking"]
  needGuide: boolean;
  includeFlights: boolean;
  includeMeals: boolean;
  specialRequests?: string;
}

export interface Budget {
  estimatedBudget?: string; // e.g., "₹20,000 - ₹30,000"
  isBudgetFlexible: boolean;
}

export interface Consent {
  acceptTerms: boolean;
  subscribeNewsletter: boolean;
}

export interface RequestAQuoteForm {
  personalInfo: PersonalInfo;
  tripDetails: TripDetails;
  accommodationPreferences: AccommodationPreferences;
  activitiesAndInclusions: ActivitiesAndInclusions;
  budget: Budget;
  consent: Consent;
}
