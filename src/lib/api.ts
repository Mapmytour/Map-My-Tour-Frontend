import { APIResponse } from '@/types/APIResponse';
import { useAuthStore } from '@/store/auth-store';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';
const API_VERSION = 'v1';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD_STEP1: '/auth/forgot-password/step1',
    FORGOT_PASSWORD_STEP2: '/auth/forgot-password/step2',
    FORGOT_PASSWORD_STEP3: '/auth/forgot-password/step3',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
    RESEND_VERIFICATION: '/auth/resend-verification',
    CHECK_EMAIL: '/auth/check-email',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    UPLOAD_AVATAR: '/user/avatar',
    DELETE_ACCOUNT: '/user/account',
  },
  INFO: {
    // FAQ Management
    FAQ: '/info/faq',
    FAQ_BY_ID: '/info/faq/:id',
    FAQ_BY_CATEGORY: '/info/faq/category/:category',
    FAQ_SEARCH: '/info/faq/search',
    
    // Policy Management
    PRIVACY_POLICY: '/info/privacy-policy',
    TERMS_CONDITIONS: '/info/terms-conditions',
    REFUND_POLICY: '/info/refund-policy',
    SHIPPING_POLICY: '/info/shipping-policy',
    PAYMENT_SECURITY: '/info/payment-security',
    COOKIE_POLICY: '/info/cookie-policy',
    
    // Guidelines & Information
    TRAVEL_GUIDELINES: '/info/travel-guidelines',
    DISCLAIMER: '/info/disclaimer',
    CUSTOMER_RIGHTS: '/info/customer-rights',
    INSURANCE_LIABILITY: '/info/insurance-liability',
    
    // Contact & Support
    LEGAL_CONTACT: '/info/legal-contact',
    SUPPORT: '/info/support',
    ALL_POLICIES: '/info/policies',
    ALL_CONTACT_INFO: '/info/contact',
  },
  QUOTE: {
    CREATE: '/quote/request',
    GET_BY_ID: '/quote/:id',
    GET_USER_QUOTES: '/quote/user',
    UPDATE: '/quote/:id',
    DELETE: '/quote/:id',
    STATUS_OPTIONS: '/quote/status-options',
    TRAVEL_TYPES: '/quote/travel-types',
    HOTEL_CATEGORIES: '/quote/hotel-categories',
    ROOM_TYPES: '/quote/room-types',
  },
  
  // ========================
  // ACTIVITIES ENDPOINTS
  // ========================
  ACTIVITIES: {
    // Basic CRUD
    GET_ALL: '/activities',
    GET_BY_ID: '/activities/:id',
    CREATE: '/activities',
    UPDATE: '/activities/:id',
    DELETE: '/activities/:id',
    
    // Search and Filter
    SEARCH: '/activities/search',
    FILTER: '/activities/filter',
    BY_CATEGORY: '/activities/category/:category',
    BY_TYPE: '/activities/type/:type',
    BY_DIFFICULTY: '/activities/difficulty/:difficulty',
    BY_LOCATION: '/activities/location/:location',
    
    // Availability
    GET_AVAILABILITY: '/activities/:id/availability',
    UPDATE_AVAILABILITY: '/activities/:id/availability',
    CHECK_SLOT_AVAILABILITY: '/activities/:id/availability/check',
    
    // Media Management
    UPLOAD_IMAGES: '/activities/:id/images',
    DELETE_IMAGE: '/activities/:id/images/:imageId',
    SET_PRIMARY_IMAGE: '/activities/:id/images/:imageId/primary',
    
    // Reviews and Ratings
    GET_REVIEWS: '/activities/:id/reviews',
    ADD_REVIEW: '/activities/:id/reviews',
    UPDATE_REVIEW: '/activities/:id/reviews/:reviewId',
    DELETE_REVIEW: '/activities/:id/reviews/:reviewId',
    
    // Categories and Types
    GET_CATEGORIES: '/activities/categories',
    GET_TYPES: '/activities/types',
    GET_DIFFICULTIES: '/activities/difficulties',
    
    // Bulk Operations
    BULK_UPDATE_STATUS: '/activities/bulk/status',
    BULK_DELETE: '/activities/bulk/delete',
    
    // Statistics
    GET_STATS: '/activities/stats',
    GET_POPULAR: '/activities/popular',
    GET_FEATURED: '/activities/featured',
  },
  
  // ========================
  // BOOKINGS ENDPOINTS
  // ========================
  BOOKINGS: {
    // Basic CRUD
    GET_ALL: '/bookings',
    GET_BY_ID: '/bookings/:id',
    CREATE: '/bookings',
    UPDATE: '/bookings/:id',
    DELETE: '/bookings/:id',
    
    // User-specific bookings
    GET_USER_BOOKINGS: '/bookings/user',
    GET_USER_BOOKING: '/bookings/user/:id',
    
    // Search and Filter
    SEARCH: '/bookings/search',
    FILTER: '/bookings/filter',
    BY_STATUS: '/bookings/status/:status',
    BY_DATE_RANGE: '/bookings/date-range',
    BY_TOUR: '/bookings/tour/:tourId',
    BY_CUSTOMER: '/bookings/customer/:customerId',
    
    // Participants Management
    ADD_PARTICIPANT: '/bookings/:id/participants',
    UPDATE_PARTICIPANT: '/bookings/:id/participants/:participantId',
    REMOVE_PARTICIPANT: '/bookings/:id/participants/:participantId',
    
    // Payment Management
    GET_PAYMENTS: '/bookings/:id/payments',
    ADD_PAYMENT: '/bookings/:id/payments',
    UPDATE_PAYMENT: '/bookings/:id/payments/:paymentId',
    REFUND_PAYMENT: '/bookings/:id/payments/:paymentId/refund',
    
    // Status Management
    UPDATE_STATUS: '/bookings/:id/status',
    CONFIRM_BOOKING: '/bookings/:id/confirm',
    CANCEL_BOOKING: '/bookings/:id/cancel',
    CHECK_IN: '/bookings/:id/check-in',
    COMPLETE: '/bookings/:id/complete',
    
    // Communication
    SEND_CONFIRMATION: '/bookings/:id/confirmation',
    SEND_REMINDER: '/bookings/:id/reminder',
    SEND_CUSTOM_EMAIL: '/bookings/:id/email',
    
    // Waivers and Documents
    UPLOAD_WAIVER: '/bookings/:id/waiver',
    GET_DOCUMENTS: '/bookings/:id/documents',
    GENERATE_VOUCHER: '/bookings/:id/voucher',
    GENERATE_INVOICE: '/bookings/:id/invoice',
    
    // Statistics and Reports
    GET_STATS: '/bookings/stats',
    GET_REVENUE_REPORT: '/bookings/reports/revenue',
    GET_OCCUPANCY_REPORT: '/bookings/reports/occupancy',
    EXPORT_BOOKINGS: '/bookings/export',
    
    // Bulk Operations
    BULK_UPDATE_STATUS: '/bookings/bulk/status',
    BULK_SEND_REMINDERS: '/bookings/bulk/reminders',
  },
  
  // ========================
  // DESTINATIONS ENDPOINTS
  // ========================
  DESTINATIONS: {
    // Basic CRUD
    GET_ALL: '/destinations',
    GET_BY_ID: '/destinations/:id',
    GET_BY_SLUG: '/destinations/slug/:slug',
    CREATE: '/destinations',
    UPDATE: '/destinations/:id',
    DELETE: '/destinations/:id',
    
    // Search and Filter
    SEARCH: '/destinations/search',
    FILTER: '/destinations/filter',
    BY_COUNTRY: '/destinations/country/:country',
    BY_REGION: '/destinations/region/:region',
    BY_CLIMATE: '/destinations/climate/:climate',
    BY_SAFETY_LEVEL: '/destinations/safety/:level',
    
    // Media Management
    UPLOAD_IMAGES: '/destinations/:id/images',
    DELETE_IMAGE: '/destinations/:id/images/:imageId',
    SET_COVER_IMAGE: '/destinations/:id/cover',
    
    // Tours and Activities
    GET_TOURS: '/destinations/:id/tours',
    GET_ACTIVITIES: '/destinations/:id/activities',
    
    // Statistics
    GET_STATS: '/destinations/:id/stats',
    GET_SEASONAL_TRENDS: '/destinations/:id/trends',
    GET_POPULAR_DESTINATIONS: '/destinations/popular',
    GET_FEATURED_DESTINATIONS: '/destinations/featured',
    
    // Content Management
    UPDATE_SEO: '/destinations/:id/seo',
    UPDATE_CONTENT: '/destinations/:id/content',
    
    // Geographic
    NEARBY_DESTINATIONS: '/destinations/:id/nearby',
    BY_COORDINATES: '/destinations/coordinates',
    
    // Bulk Operations
    BULK_UPDATE_STATUS: '/destinations/bulk/status',
    BULK_UPDATE_FEATURED: '/destinations/bulk/featured',
  },
  
  // ========================
  // SERVICES ENDPOINTS
  // ========================
  SERVICES: {
    // Basic CRUD
    GET_ALL: '/services',
    GET_BY_ID: '/services/:id',
    GET_BY_SLUG: '/services/slug/:slug',
    CREATE: '/services',
    UPDATE: '/services/:id',
    DELETE: '/services/:id',
    
    // Search and Filter
    SEARCH: '/services/search',
    FILTER: '/services/filter',
    BY_CATEGORY: '/services/category/:category',
    BY_TYPE: '/services/type/:type',
    BY_PROVIDER: '/services/provider/:providerId',
    BY_LOCATION: '/services/location/:location',
    
    // Categories and Types
    GET_CATEGORIES: '/services/categories',
    CREATE_CATEGORY: '/services/categories',
    UPDATE_CATEGORY: '/services/categories/:id',
    DELETE_CATEGORY: '/services/categories/:id',
    
    // Providers Management
    GET_PROVIDERS: '/services/providers',
    CREATE_PROVIDER: '/services/providers',
    UPDATE_PROVIDER: '/services/providers/:id',
    DELETE_PROVIDER: '/services/providers/:id',
    GET_PROVIDER_SERVICES: '/services/providers/:id/services',
    
    // Availability Management
    GET_AVAILABILITY: '/services/:id/availability',
    UPDATE_AVAILABILITY: '/services/:id/availability',
    CHECK_AVAILABILITY: '/services/:id/availability/check',
    
    // Booking Management
    CREATE_SERVICE_BOOKING: '/services/:id/bookings',
    GET_SERVICE_BOOKINGS: '/services/:id/bookings',
    UPDATE_SERVICE_BOOKING: '/services/:id/bookings/:bookingId',
    CANCEL_SERVICE_BOOKING: '/services/:id/bookings/:bookingId/cancel',
    
    // Media Management
    UPLOAD_IMAGES: '/services/:id/images',
    DELETE_IMAGE: '/services/:id/images/:imageId',
    SET_PRIMARY_IMAGE: '/services/:id/images/:imageId/primary',
    
    // Reviews and Ratings
    GET_REVIEWS: '/services/:id/reviews',
    ADD_REVIEW: '/services/:id/reviews',
    UPDATE_REVIEW: '/services/:id/reviews/:reviewId',
    DELETE_REVIEW: '/services/:id/reviews/:reviewId',
    
    // Statistics
    GET_STATS: '/services/stats',
    GET_POPULAR: '/services/popular',
    GET_FEATURED: '/services/featured',
    GET_PROVIDER_STATS: '/services/providers/:id/stats',
    
    // Bulk Operations
    BULK_UPDATE_STATUS: '/services/bulk/status',
    BULK_UPDATE_PRICING: '/services/bulk/pricing',
  },
  
  // ========================
  // TOURS ENDPOINTS
  // ========================
  TOURS: {
    // Basic CRUD
    GET_ALL: '/tours',
    GET_BY_ID: '/tours/:id',
    GET_BY_SLUG: '/tours/slug/:slug',
    CREATE: '/tours',
    UPDATE: '/tours/:id',
    DELETE: '/tours/:id',
    
    // Search and Filter
    SEARCH: '/tours/search',
    FILTER: '/tours/filter',
    BY_CATEGORY: '/tours/category/:category',
    BY_DESTINATION: '/tours/destination/:destinationId',
    BY_DIFFICULTY: '/tours/difficulty/:difficulty',
    BY_DURATION: '/tours/duration/:days',
    BY_PRICE_RANGE: '/tours/price-range',
    BY_GUIDE: '/tours/guide/:guideId',
    
    // Availability Management
    GET_AVAILABILITY: '/tours/:id/availability',
    CREATE_AVAILABILITY: '/tours/:id/availability',
    UPDATE_AVAILABILITY: '/tours/:id/availability/:availabilityId',
    DELETE_AVAILABILITY: '/tours/:id/availability/:availabilityId',
    CHECK_AVAILABILITY: '/tours/:id/availability/check',
    
    // Itinerary Management
    GET_ITINERARY: '/tours/:id/itinerary',
    UPDATE_ITINERARY: '/tours/:id/itinerary',
    ADD_ITINERARY_DAY: '/tours/:id/itinerary/days',
    UPDATE_ITINERARY_DAY: '/tours/:id/itinerary/days/:day',
    DELETE_ITINERARY_DAY: '/tours/:id/itinerary/days/:day',
    
    // Media Management
    UPLOAD_IMAGES: '/tours/:id/images',
    DELETE_IMAGE: '/tours/:id/images/:imageId',
    SET_PRIMARY_IMAGE: '/tours/:id/images/:imageId/primary',
    REORDER_IMAGES: '/tours/:id/images/reorder',
    
    // Bookings for Tours
    GET_TOUR_BOOKINGS: '/tours/:id/bookings',
    GET_AVAILABILITY_BOOKINGS: '/tours/:id/availability/:availabilityId/bookings',
    
    // Reviews and Ratings
    GET_REVIEWS: '/tours/:id/reviews',
    ADD_REVIEW: '/tours/:id/reviews',
    UPDATE_REVIEW: '/tours/:id/reviews/:reviewId',
    DELETE_REVIEW: '/tours/:id/reviews/:reviewId',
    GET_REVIEW_STATS: '/tours/:id/reviews/stats',
    
    // Categories
    GET_CATEGORIES: '/tours/categories',
    CREATE_CATEGORY: '/tours/categories',
    UPDATE_CATEGORY: '/tours/categories/:id',
    DELETE_CATEGORY: '/tours/categories/:id',
    
    // Guides Management
    GET_GUIDES: '/tours/guides',
    CREATE_GUIDE: '/tours/guides',
    UPDATE_GUIDE: '/tours/guides/:id',
    DELETE_GUIDE: '/tours/guides/:id',
    GET_GUIDE_TOURS: '/tours/guides/:id/tours',
    
    // Destinations for Tours
    GET_TOUR_DESTINATIONS: '/tours/destinations',
    LINK_DESTINATION: '/tours/:id/destinations/:destinationId',
    UNLINK_DESTINATION: '/tours/:id/destinations/:destinationId',
    
    // Pricing and Discounts
    UPDATE_PRICING: '/tours/:id/pricing',
    ADD_DISCOUNT: '/tours/:id/discounts',
    UPDATE_DISCOUNT: '/tours/:id/discounts/:discountId',
    DELETE_DISCOUNT: '/tours/:id/discounts/:discountId',
    
    // Statistics and Analytics
    GET_STATS: '/tours/stats',
    GET_POPULAR: '/tours/popular',
    GET_FEATURED: '/tours/featured',
    GET_TOUR_PERFORMANCE: '/tours/:id/performance',
    GET_REVENUE_ANALYTICS: '/tours/analytics/revenue',
    GET_BOOKING_TRENDS: '/tours/analytics/booking-trends',
    
    // Content Management
    UPDATE_SEO: '/tours/:id/seo',
    DUPLICATE_TOUR: '/tours/:id/duplicate',
    
    // Bulk Operations
    BULK_UPDATE_STATUS: '/tours/bulk/status',
    BULK_UPDATE_FEATURED: '/tours/bulk/featured',
    BULK_UPDATE_PRICING: '/tours/bulk/pricing',
    BULK_ASSIGN_GUIDE: '/tours/bulk/assign-guide',
    
    // Export and Import
    EXPORT_TOURS: '/tours/export',
    IMPORT_TOURS: '/tours/import',
    GET_IMPORT_TEMPLATE: '/tours/import/template',
  },
} as const;

// Request interceptor to add auth token
class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = `${API_BASE_URL}/${API_VERSION}`;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  private getAuthToken(): string | null {
    return useAuthStore.getState().accessToken;
  }

  private async refreshAccessToken(): Promise<boolean> {
    try {
      const { refreshToken } = useAuthStore.getState();
      if (!refreshToken) {
        return false;
      }

      const response = await fetch(`${this.baseURL}${API_ENDPOINTS.AUTH.REFRESH}`, {
        method: 'POST',
        headers: this.defaultHeaders,
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        useAuthStore.getState().updateTokens(data.accessToken, data.refreshToken);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getAuthToken();
    
    const headers = {
      ...this.defaultHeaders,
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    try {
      let response = await fetch(url, {
        ...options,
        headers,
      });

      // If unauthorized and we have a refresh token, try to refresh
      if (response.status === 401 && token) {
        const refreshed = await this.refreshAccessToken();
        if (refreshed) {
          const newToken = this.getAuthToken();
          response = await fetch(url, {
            ...options,
            headers: {
              ...headers,
              Authorization: `Bearer ${newToken}`,
            },
          });
        } else {
          // Refresh failed, clear auth state
          useAuthStore.getState().clearAuth();
          throw new Error('Authentication failed');
        }
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // HTTP Methods
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<APIResponse<T>> {
    const url = params 
      ? `${endpoint}?${new URLSearchParams(params).toString()}`
      : endpoint;
    
    return this.makeRequest<T>(url, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<APIResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<APIResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<APIResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<APIResponse<T>> {
    return this.makeRequest<T>(endpoint, { method: 'DELETE' });
  }

  // File upload method
  async upload<T>(endpoint: string, file: File, data?: Record<string, any>): Promise<APIResponse<T>> {
    const token = this.getAuthToken();
    const formData = new FormData();
    formData.append('file', file);
    
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Upload failed');
    }

    return result;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Utility function to handle API errors
export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};