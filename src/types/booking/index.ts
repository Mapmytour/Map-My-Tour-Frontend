// booking/index.ts
import { Currency } from '../common';

/* ============================== */
/*           Enums                */
/* ============================== */

export enum BookingStatus {
  Draft = 'draft',
  Pending = 'pending',
  Confirmed = 'confirmed',
  InProgress = 'in-progress',
  Completed = 'completed',
  Cancelled = 'cancelled',
  NoShow = 'no-show',
}

export enum BookingType {
  Tour = 'tour',
  Activity = 'activity',
  Service = 'service',
  Destination = 'destination',
  Itinerary = 'itinerary',
  Package = 'package',
}

export enum ParticipantType {
  Adult = 'adult',
  Child = 'child',
  Infant = 'infant',
  Senior = 'senior',
}

export enum ParticipantStatus {
  Active = 'active',
  Cancelled = 'cancelled',
  NoShow = 'no-show',
  CheckedIn = 'checked-in',
  Completed = 'completed',
}

export enum PaymentStatus {
  Pending = 'pending',
  Partial = 'partial',
  Paid = 'paid',
  Overdue = 'overdue',
  Refunded = 'refunded',
  Failed = 'failed',
}

export enum PaymentMethod {
  CreditCard = 'credit-card',
  DebitCard = 'debit-card',
  BankTransfer = 'bank-transfer',
  PayPal = 'paypal',
  UPI = 'upi',
  Cash = 'cash',
  Wallet = 'wallet',
}

export enum PaymentType {
  Deposit = 'deposit',
  Advance = 'advance',
  Balance = 'balance',
  FullPayment = 'full-payment',
  Refund = 'refund',
  Adjustment = 'adjustment',
}

export enum BookingSource {
  Website = 'website',
  Mobile = 'mobile',
  Phone = 'phone',
  Email = 'email',
  Agent = 'agent',
  WalkIn = 'walk-in',
  Social = 'social',
}

/* ============================== */
/*         Core Models            */
/* ============================== */

export interface Booking {
  id: string;
  bookingNumber: string;

  // What's being booked (Generic)
  bookingType: BookingType;
  entityId: string; // ID of tour, activity, service, etc.
  entityDetails: BookingEntity;

  // Customer Info
  customerId?: string;
  customerDetails: CustomerDetails;

  // Booking Details
  bookingDate: string;
  travelDate: string;
  endDate?: string;
  source: BookingSource;

  // Participants
  participants: BookingParticipant[];
  totalParticipants: number;
  originalParticipants: number; // Track original vs current

  // Pricing & Payments
  pricing: BookingPricing;
  payments: BookingPayment[];
  paymentStatus: PaymentStatus;

  // Status & Tracking
  status: BookingStatus;
  confirmationSent: boolean;
  remindersSent: number;

  // Requirements & Preferences
  specialRequests?: string;
  dietaryRequirements: string[];
  accessibilityNeeds: string[];

  // Policies & Terms
  cancellationPolicy: CancellationPolicy;
  termsAccepted: boolean;
  waiverRequired: boolean;

  // Communication
  notifications: BookingNotification[];
  notes: BookingNote[];

  // Metadata
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  lastModifiedBy?: string;
}

export interface BookingEntity {
  id: string;
  type: BookingType;
  name: string;
  description?: string;

  // Specific details based on type
  tourDetails?: {
    duration: { days: number; nights: number };
    destination: string;
    guide?: string;
  };
  activityDetails?: {
    duration: number; // minutes
    location: string;
    difficulty?: string;
  };
  serviceDetails?: {
    category: string;
    provider: string;
    duration?: number;
  };
  destinationDetails?: {
    country: string;
    region?: string;
  };
  itineraryDetails?: {
    totalDays: number;
    destinations: string[];
  };
}

export interface CustomerDetails {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Address
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };

  // Preferences
  language?: string;
  communicationPreference: 'email' | 'sms' | 'phone' | 'whatsapp';

  // Emergency Contact
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface BookingParticipant {
  id: string;
  type: ParticipantType;
  status: ParticipantStatus;

  // Personal Info
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  age: number;
  gender?: 'male' | 'female' | 'other';
  nationality?: string;

  // Travel Documents
  passport?: {
    number: string;
    expiryDate: string;
    issuingCountry: string;
  };
  visa?: {
    number: string;
    expiryDate: string;
    type: string;
  };

  // Health & Requirements
  medicalConditions: string[];
  allergies: string[];
  dietaryRequirements: string[];
  accessibilityNeeds: string[];
  specialRequests?: string;

  // Emergency Contact
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };

  // Pricing
  basePrice: number;
  discounts: ParticipantDiscount[];
  supplements: ParticipantSupplement[];
  finalPrice: number;

  // Waivers & Agreements
  waiverSigned: boolean;
  waiverDate?: string;
  parentalConsent?: boolean; // for minors

  // Status Tracking
  addedAt: string;
  cancelledAt?: string;
  cancellationReason?: string;
  refundAmount?: number;

  // Check-in/Out
  checkedInAt?: string;
  checkedOutAt?: string;
  noShowAt?: string;
}

export interface BookingPricing {
  // Base Pricing
  baseAmount: number;
  currency: Currency;

  // Breakdown by participant type
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
  seniorPrice: number;

  // Counts
  adultCount: number;
  childCount: number;
  infantCount: number;
  seniorCount: number;

  // Calculations
  subtotal: number;

  // Additional Costs
  taxes: TaxBreakdown[];
  fees: FeeBreakdown[];
  supplements: SupplementBreakdown[];

  // Discounts
  discounts: DiscountBreakdown[];

  // Final Amounts
  totalTaxes: number;
  totalFees: number;
  totalSupplements: number;
  totalDiscounts: number;
  grandTotal: number;

  // Payment Structure
  depositRequired: boolean;
  depositAmount: number;
  balanceAmount: number;

  // Refunds
  refundableAmount: number;
  nonRefundableAmount: number;
  totalRefunded: number;

  // Currency Conversion (if applicable)
  originalCurrency?: Currency;
  exchangeRate?: number;
  conversionDate?: string;
}

export interface BookingPayment {
  id: string;
  amount: number;
  currency: Currency;
  method: PaymentMethod;
  type: PaymentType;
  status: PaymentStatus;

  // Transaction Details
  transactionId?: string;
  gatewayResponse?: string;

  // Timing
  dueDate?: string;
  paidAt?: string;
  createdAt: string;

  // Payment Gateway Details
  gateway?: {
    name: string;
    transactionId: string;
    reference: string;
  };

  // Card Details (masked)
  cardDetails?: {
    lastFour: string;
    brand: string;
    expiryMonth: number;
    expiryYear: number;
  };

  // Refund Info
  refundedAt?: string;
  refundReason?: string;
  refundReference?: string;

  // Failed Payment Info
  failureReason?: string;
  retryCount?: number;
  nextRetryAt?: string;

  // Notes
  notes?: string;
  processedBy?: string;
}

export interface CancellationPolicy {
  id: string;
  name: string;

  // Time-based refund structure
  refundSchedule: {
    daysBeforeTravel: number;
    refundPercentage: number;
    description: string;
  }[];

  // Fees
  cancellationFee: {
    type: 'fixed' | 'percentage';
    amount: number;
    minimum?: number;
    maximum?: number;
  };

  // Non-refundable items
  nonRefundableItems: string[];

  // Special conditions
  forceMajeurePolicy?: string;
  medicalEmergencyPolicy?: string;

  // Process
  howToCancel: string;
  processingTime: string;
  requiredDocuments: string[];
}

export interface BookingNotification {
  id: string;
  type: 'confirmation' | 'reminder' | 'payment' | 'cancellation' | 'update' | 'feedback';
  method: 'email' | 'sms' | 'push' | 'whatsapp';
  status: 'pending' | 'sent' | 'delivered' | 'failed' | 'opened' | 'clicked';

  // Content
  subject?: string;
  message: string;

  // Recipients
  recipients: string[]; // email/phone numbers

  // Timing
  scheduledAt?: string;
  sentAt?: string;
  deliveredAt?: string;

  // Tracking
  trackingId?: string;
  failureReason?: string;

  // Metadata
  createdAt: string;
}

export interface BookingNote {
  id: string;
  type: 'internal' | 'customer' | 'system' | 'payment' | 'support';
  content: string;
  isPublic: boolean;

  // Author
  createdBy: string;
  createdByName: string;

  // Timing
  createdAt: string;

  // Tags/Categories
  tags: string[];
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

/* ============================== */
/*      Supporting Types          */
/* ============================== */

export interface ParticipantDiscount {
  id: string;
  name: string;
  type: 'early-bird' | 'group' | 'loyalty' | 'promo' | 'age-based' | 'student' | 'military';
  amount: number;
  isPercentage: boolean;
  description: string;
}

export interface ParticipantSupplement {
  id: string;
  name: string;
  type: 'room-upgrade' | 'meal-upgrade' | 'activity-add-on' | 'insurance' | 'equipment';
  amount: number;
  description: string;
  optional: boolean;
}

export interface TaxBreakdown {
  name: string;
  rate: number; // percentage
  amount: number;
  type: 'VAT' | 'GST' | 'service-tax' | 'tourism-tax' | 'other';
}

export interface FeeBreakdown {
  name: string;
  amount: number;
  type: 'booking-fee' | 'payment-fee' | 'service-fee' | 'processing-fee' | 'other';
  description?: string;
}

export interface SupplementBreakdown {
  name: string;
  amount: number;
  type: 'upgrade' | 'add-on' | 'insurance' | 'equipment' | 'other';
  participantIds?: string[]; // if applies to specific participants
}

export interface DiscountBreakdown {
  name: string;
  amount: number;
  type: 'early-bird' | 'group' | 'loyalty' | 'promotional' | 'coupon' | 'seasonal';
  isPercentage: boolean;
  participantIds?: string[]; // if applies to specific participants
  code?: string; // coupon/promo code
}

/* ============================== */
/*          Filters               */
/* ============================== */

export interface BookingFilters {
  status?: BookingStatus[];
  bookingType?: BookingType[];
  paymentStatus?: PaymentStatus[];
  source?: BookingSource[];

  // Date ranges
  bookingDateRange?: {
    from: string;
    to: string;
  };
  travelDateRange?: {
    from: string;
    to: string;
  };

  // Customer
  customerId?: string;
  customerEmail?: string;

  // Entity
  entityId?: string;
  entityType?: BookingType;

  // Pricing
  priceRange?: {
    min: number;
    max: number;
    currency?: Currency;
  };

  // Participants
  participantCount?: {
    min: number;
    max: number;
  };

  // Search
  searchQuery?: string;

  // Special flags
  hasSpecialRequests?: boolean;
  requiresWaiver?: boolean;
  hasRefunds?: boolean;
  overdue?: boolean;
}

/* ============================== */
/*      Request/Response Types    */
/* ============================== */

export interface CreateBookingRequest {
  // What's being booked
  bookingType: BookingType;
  entityId: string;

  // Customer
  customerDetails: Omit<CustomerDetails, 'id'>;

  // Dates
  travelDate: string;
  endDate?: string;

  // Participants
  participants: Omit<BookingParticipant, 'id' | 'status' | 'addedAt' | 'finalPrice'>[];

  // Requirements
  specialRequests?: string;
  dietaryRequirements?: string[];
  accessibilityNeeds?: string[];

  // Payment
  paymentMethod?: PaymentMethod;
  paymentType?: PaymentType;

  // Source
  source: BookingSource;

  // Agreements
  termsAccepted: boolean;

  // Promo/Discount codes
  promoCodes?: string[];
}

export interface UpdateBookingRequest {
  id: string;

  // Updateable fields
  travelDate?: string;
  endDate?: string;
  specialRequests?: string;
  dietaryRequirements?: string[];
  accessibilityNeeds?: string[];

  // Status updates
  status?: BookingStatus;

  // Customer updates
  customerDetails?: Partial<CustomerDetails>;

  // Notes
  notes?: string;
}

export interface AddParticipantRequest {
  participant: Omit<BookingParticipant, 'id' | 'status' | 'addedAt' | 'finalPrice'>;
  recalculatePricing?: boolean;
}

export interface CancelParticipantRequest {
  participantId: string;
  reason: string;
  refundAmount?: number;
  notifyCustomer?: boolean;
}

export interface ProcessPaymentRequest {
  bookingId: string;
  amount: number;
  method: PaymentMethod;
  type: PaymentType;

  // Payment details
  paymentDetails?: {
    cardToken?: string;
    bankDetails?: any;
    upiId?: string;
    walletId?: string;
  };

  // Additional info
  notes?: string;
  sendReceipt?: boolean;
}

export interface CancelBookingRequest {
  bookingId: string;
  reason: string;
  refundAmount?: number;
  waiveCancellationFee?: boolean;
  notifyCustomer?: boolean;
  notes?: string;
}

/* ============================== */
/*       Analytics Types          */
/* ============================== */

export interface BookingStats {
  totalBookings: number;
  totalRevenue: number;
  averageBookingValue: number;

  // Status breakdown
  statusBreakdown: {
    status: BookingStatus;
    count: number;
    percentage: number;
  }[];

  // Payment status
  paymentStatusBreakdown: {
    status: PaymentStatus;
    count: number;
    amount: number;
  }[];

  // Source breakdown
  sourceBreakdown: {
    source: BookingSource;
    count: number;
    revenue: number;
  }[];

  // Monthly trends
  monthlyTrends: {
    month: string;
    bookings: number;
    revenue: number;
    averageValue: number;
  }[];

  // Popular entities
  popularEntities: {
    entityId: string;
    entityName: string;
    entityType: BookingType;
    bookings: number;
    revenue: number;
  }[];
}

export default Booking;
