import { Tour } from "../tour";

export interface Booking {
  id: string;
  userId: string;
  tourId: string;
  tour: Tour;
  bookingDate: string;
  travelDate: string;
  participants: Participant[];
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  paymentId?: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  specialRequests?: string;
  emergencyContact: EmergencyContact;
  createdAt: string;
  updatedAt: string;
}

export interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  nationality: string;
  passportNumber?: string;
  medicalConditions?: string;
  dietaryRestrictions?: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface BookingForm {
  tourId: string;
  availabilityId: string;
  participants: Participant[];
  specialRequests?: string;
  emergencyContact: EmergencyContact;
}

export interface CartItem {
  id: string;
  tourId: string;
  tour: Tour;
  availabilityId: string;
  participants: number;
  price: number;
  totalAmount: number;
  addedAt: string;
}

export interface PaymentData {
  amount: number;
  currency: string;
  paymentMethodId: string;
  bookingId: string;
}