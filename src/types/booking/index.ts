// booking/index.ts
export interface Booking {
  id: string;
  bookingNumber: string;
  
  // Tour Info
  tourId: string;
  tourTitle: string;
  availabilityId: string;
  tourStartDate: string;
  tourEndDate: string;
  
  // Customer
  customerId: string;
  
  // Participants
  participants: BookingParticipant[];
  totalParticipants: number;
  
  // Pricing
  pricing: {
    subtotal: number;
    taxes: number;
    fees: number;
    discounts: number;
    total: number;
    currency: string;
  };
  
  // Payment
  payments: BookingPayment[];
  paymentStatus: 'pending' | 'partial' | 'paid' | 'refunded';
  
  // Status
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no-show';
  
  // Special Requests
  specialRequests?: string;
  dietaryRequirements?: string[];
  accessibilityNeeds?: string;
  
  // Communication
  confirmationSent: boolean;
  remindersSent: number;
  
  // Metadata
  bookingDate: string;
  source: 'website' | 'phone' | 'email' | 'agent' | 'walk-in';
  createdAt: string;
  updatedAt: string;
}

export interface BookingParticipant {
  id: string;
  type: 'adult' | 'child' | 'infant';
  
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  
  // Travel Info
  passport?: {
    number: string;
    expiryDate: string;
    nationality: string;
  };
  
  // Emergency Contact
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  
  // Special Needs
  dietaryRequirements?: string[];
  medicalConditions?: string[];
  accessibilityNeeds?: string[];
  
  // Pricing
  price: number;
  discounts: number;
  
  // Status
  status: 'confirmed' | 'cancelled' | 'checked-in' | 'completed';
  
  // Waivers
  waiverSigned: boolean;
  waiverDate?: string;
}

export interface BookingPayment {
  id: string;
  amount: number;
  currency: string;
  method: 'credit-card' | 'debit-card' | 'bank-transfer' | 'paypal' | 'cash';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  paidAt?: string;
  refundedAt?: string;
  type: 'deposit' | 'balance' | 'full-payment' | 'refund';
}

export interface BookingFilters {
  status: string[];
  paymentStatus: string[];
  dateRange: {
    from: string;
    to: string;
  };
  source: string[];
  tourId?: string;
  customerId?: string;
}