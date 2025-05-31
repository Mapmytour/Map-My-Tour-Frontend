import { apiClient, API_ENDPOINTS } from '@/lib/api';
import {
  Tour,
  TourImage,
  TourCategory,
  TourAvailability,
  TourFilters,
  ItineraryDay,
  Guide,
  Destination,
} from '@/types/tour';
import { APIResponse } from '@/types/APIResponse';

// Request types for tour service
export interface CreateTourRequest {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: {
    amount: number;
    currency: string;
    discountedPrice?: number;
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
  highlights: string[];
  itinerary: ItineraryDay[];
  guide: Guide;
  featured?: boolean;
  status: 'active' | 'inactive' | 'draft';
}

export interface UpdateTourRequest extends Partial<CreateTourRequest> {
  id: string;
}

export interface CreateTourAvailabilityRequest {
  startDate: string;
  endDate: string;
  availableSlots: number;
  price?: number;
  status: 'available' | 'limited' | 'sold-out' | 'cancelled';
}

export interface UpdateTourAvailabilityRequest extends Partial<CreateTourAvailabilityRequest> {
  id: string;
}

export interface CreateCategoryRequest {
  name: string;
  slug: string;
  icon?: string;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {
  id: string;
}

export interface CreateGuideRequest {
  name: string;
  avatar?: string;
  experience: number;
  languages: string[];
  bio: string;
}

export interface UpdateGuideRequest extends Partial<CreateGuideRequest> {
  id: string;
}

export interface TourSearchRequest {
  query: string;
  filters?: TourFilters;
  sortBy?: 'title' | 'price' | 'rating' | 'duration' | 'difficulty' | 'created' | 'popularity';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface UpdateItineraryRequest {
  itinerary: ItineraryDay[];
}

export interface AddItineraryDayRequest {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: ('breakfast' | 'lunch' | 'dinner')[];
  accommodation?: string;
}

export interface UpdateItineraryDayRequest extends Partial<AddItineraryDayRequest> {
  day: number;
}

export interface CheckAvailabilityRequest {
  startDate: string;
  participants: number;
}

export interface UpdatePricingRequest {
  basePrice?: number;
  discountedPrice?: number;
  currency?: string;
}

export interface CreateDiscountRequest {
  name: string;
  type: 'percentage' | 'fixed';
  value: number;
  startDate: string;
  endDate: string;
  conditions?: {
    minParticipants?: number;
    maxParticipants?: number;
    advanceBooking?: number;
    applicableCategories?: string[];
  };
}

export interface UpdateDiscountRequest extends Partial<CreateDiscountRequest> {
  id: string;
}

export interface BulkAssignGuideRequest {
  tourIds: string[];
  guideId: string;
  effectiveDate?: string;
}

export interface TourReviewRequest {
  rating: number;
  comment: string;
  images?: string[];
}

export interface ImportTourRequest {
  file: File;
  skipValidation?: boolean;
  updateExisting?: boolean;
}

class TourService {
  // ========================
  // Basic CRUD Operations
  // ========================

  /**
   * Get all tours with optional filters
   */
  async getAllTours(filters?: TourFilters): Promise<APIResponse<{
    tours: Tour[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }>> {
    try {
      const params = filters ? this.buildFilterParams(filters) : undefined;
      const response = await apiClient.get<{
        tours: Tour[];
        total: number;
        page: number;
        limit: number;
        pages: number;
      }>(API_ENDPOINTS.TOURS.GET_ALL, params);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch tours: ${error}`);
    }
  }

  /**
   * Get tour by ID
   */
  async getTourById(id: string): Promise<APIResponse<Tour>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.GET_BY_ID.replace(':id', id);
      const response = await apiClient.get<Tour>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch tour: ${error}`);
    }
  }

  /**
   * Get tour by slug
   */
  async getTourBySlug(slug: string): Promise<APIResponse<Tour>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.GET_BY_SLUG.replace(':slug', slug);
      const response = await apiClient.get<Tour>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch tour by slug: ${error}`);
    }
  }

  /**
   * Create new tour
   */
  async createTour(data: CreateTourRequest): Promise<APIResponse<Tour>> {
    try {
      const response = await apiClient.post<Tour>(
        API_ENDPOINTS.TOURS.CREATE,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to create tour: ${error}`);
    }
  }

  /**
   * Update tour
   */
  async updateTour(data: UpdateTourRequest): Promise<APIResponse<Tour>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.UPDATE.replace(':id', data.id);
      const { id, ...updateData } = data;
      const response = await apiClient.put<Tour>(endpoint, updateData);
      return response;
    } catch (error) {
      throw new Error(`Failed to update tour: ${error}`);
    }
  }

  /**
   * Delete tour
   */
  async deleteTour(id: string): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.DELETE.replace(':id', id);
      const response = await apiClient.delete<{ message: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete tour: ${error}`);
    }
  }

  // ========================
  // Search and Filter
  // ========================

  /**
   * Search tours
   */
  async searchTours(request: TourSearchRequest): Promise<APIResponse<{
    tours: Tour[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }>> {
    try {
      const response = await apiClient.post<{
        tours: Tour[];
        total: number;
        page: number;
        limit: number;
        pages: number;
      }>(API_ENDPOINTS.TOURS.SEARCH, request);
      return response;
    } catch (error) {
      throw new Error(`Failed to search tours: ${error}`);
    }
  }

  /**
   * Filter tours
   */
  async filterTours(filters: TourFilters): Promise<APIResponse<Tour[]>> {
    try {
      const response = await apiClient.post<Tour[]>(
        API_ENDPOINTS.TOURS.FILTER,
        filters
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to filter tours: ${error}`);
    }
  }

  /**
   * Get tours by category
   */
  async getToursByCategory(category: string): Promise<APIResponse<Tour[]>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.BY_CATEGORY.replace(':category', category);
      const response = await apiClient.get<Tour[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch tours by category: ${error}`);
    }
  }

  /**
   * Get tours by destination
   */
  async getToursByDestination(destinationId: string): Promise<APIResponse<Tour[]>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.BY_DESTINATION.replace(':destinationId', destinationId);
      const response = await apiClient.get<Tour[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch tours by destination: ${error}`);
    }
  }

  /**
   * Get tours by difficulty
   */
  async getToursByDifficulty(difficulty: string): Promise<APIResponse<Tour[]>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.BY_DIFFICULTY.replace(':difficulty', difficulty);
      const response = await apiClient.get<Tour[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch tours by difficulty: ${error}`);
    }
  }

  /**
   * Get tours by duration
   */
  async getToursByDuration(days: number): Promise<APIResponse<Tour[]>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.BY_DURATION.replace(':days', days.toString());
      const response = await apiClient.get<Tour[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch tours by duration: ${error}`);
    }
  }

  /**
   * Get tours by price range
   */
  async getToursByPriceRange(minPrice: number, maxPrice: number, currency: string = 'USD'): Promise<APIResponse<Tour[]>> {
    try {
      const params = {
        min: minPrice.toString(),
        max: maxPrice.toString(),
        currency
      };
      const response = await apiClient.get<Tour[]>(
        API_ENDPOINTS.TOURS.BY_PRICE_RANGE,
        params
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch tours by price range: ${error}`);
    }
  }

  /**
   * Get tours by guide
   */
  async getToursByGuide(guideId: string): Promise<APIResponse<Tour[]>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.BY_GUIDE.replace(':guideId', guideId);
      const response = await apiClient.get<Tour[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch tours by guide: ${error}`);
    }
  }

  // ========================
  // Availability Management
  // ========================

  /**
   * Get tour availability
   */
  async getTourAvailability(id: string, dateRange?: { from: string; to: string }): Promise<APIResponse<TourAvailability[]>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.GET_AVAILABILITY.replace(':id', id);
      const params = dateRange ? { from: dateRange.from, to: dateRange.to } : undefined;
      const response = await apiClient.get<TourAvailability[]>(endpoint, params);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch tour availability: ${error}`);
    }
  }

  /**
   * Create tour availability
   */
  async createTourAvailability(tourId: string, data: CreateTourAvailabilityRequest): Promise<APIResponse<TourAvailability>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.CREATE_AVAILABILITY.replace(':id', tourId);
      const response = await apiClient.post<TourAvailability>(endpoint, data);
      return response;
    } catch (error) {
      throw new Error(`Failed to create tour availability: ${error}`);
    }
  }

  /**
   * Update tour availability
   */
  async updateTourAvailability(tourId: string, data: UpdateTourAvailabilityRequest): Promise<APIResponse<TourAvailability>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.UPDATE_AVAILABILITY
        .replace(':id', tourId)
        .replace(':availabilityId', data.id);
      const { id, ...updateData } = data;
      const response = await apiClient.put<TourAvailability>(endpoint, updateData);
      return response;
    } catch (error) {
      throw new Error(`Failed to update tour availability: ${error}`);
    }
  }

  /**
   * Delete tour availability
   */
  async deleteTourAvailability(tourId: string, availabilityId: string): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.DELETE_AVAILABILITY
        .replace(':id', tourId)
        .replace(':availabilityId', availabilityId);
      const response = await apiClient.delete<{ message: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete tour availability: ${error}`);
    }
  }

  /**
   * Check tour availability
   */
  async checkTourAvailability(id: string, request: CheckAvailabilityRequest): Promise<APIResponse<{
    available: boolean;
    availableSlots: number;
    bookedSlots: number;
    price: number;
    alternativeDates?: string[];
  }>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.CHECK_AVAILABILITY.replace(':id', id);
      const response = await apiClient.post<{
        available: boolean;
        availableSlots: number;
        bookedSlots: number;
        price: number;
        alternativeDates?: string[];
      }>(endpoint, request);
      return response;
    } catch (error) {
      throw new Error(`Failed to check tour availability: ${error}`);
    }
  }

  // ========================
  // Itinerary Management
  // ========================

  /**
   * Get tour itinerary
   */
  async getTourItinerary(id: string): Promise<APIResponse<ItineraryDay[]>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.GET_ITINERARY.replace(':id', id);
      const response = await apiClient.get<ItineraryDay[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch tour itinerary: ${error}`);
    }
  }

  /**
   * Update tour itinerary
   */
  async updateTourItinerary(id: string, data: UpdateItineraryRequest): Promise<APIResponse<ItineraryDay[]>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.UPDATE_ITINERARY.replace(':id', id);
      const response = await apiClient.put<ItineraryDay[]>(endpoint, data);
      return response;
    } catch (error) {
      throw new Error(`Failed to update tour itinerary: ${error}`);
    }
  }

  /**
   * Add itinerary day
   */
  async addItineraryDay(tourId: string, data: AddItineraryDayRequest): Promise<APIResponse<ItineraryDay>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.ADD_ITINERARY_DAY.replace(':id', tourId);
      const response = await apiClient.post<ItineraryDay>(endpoint, data);
      return response;
    } catch (error) {
      throw new Error(`Failed to add itinerary day: ${error}`);
    }
  }

  /**
   * Update itinerary day
   */
  async updateItineraryDay(tourId: string, data: UpdateItineraryDayRequest): Promise<APIResponse<ItineraryDay>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.UPDATE_ITINERARY_DAY
        .replace(':id', tourId)
        .replace(':day', data.day.toString());
      const { day, ...updateData } = data;
      const response = await apiClient.put<ItineraryDay>(endpoint, updateData);
      return response;
    } catch (error) {
      throw new Error(`Failed to update itinerary day: ${error}`);
    }
  }

  /**
   * Delete itinerary day
   */
  async deleteItineraryDay(tourId: string, day: number): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.DELETE_ITINERARY_DAY
        .replace(':id', tourId)
        .replace(':day', day.toString());
      const response = await apiClient.delete<{ message: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete itinerary day: ${error}`);
    }
  }

  // ========================
  // Media Management
  // ========================

  /**
   * Upload tour images
   */
  async uploadTourImages(id: string, files: File[]): Promise<APIResponse<TourImage[]>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.UPLOAD_IMAGES.replace(':id', id);
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });

      const response = await apiClient.upload<TourImage[]>(endpoint, files[0], {
        imageCount: files.length.toString(),
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to upload tour images: ${error}`);
    }
  }

  /**
   * Delete tour image
   */
  async deleteTourImage(id: string, imageId: string): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.DELETE_IMAGE
        .replace(':id', id)
        .replace(':imageId', imageId);
      const response = await apiClient.delete<{ message: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete tour image: ${error}`);
    }
  }

  /**
   * Set primary image
   */
  async setPrimaryImage(id: string, imageId: string): Promise<APIResponse<Tour>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.SET_PRIMARY_IMAGE
        .replace(':id', id)
        .replace(':imageId', imageId);
      const response = await apiClient.put<Tour>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to set primary image: ${error}`);
    }
  }

  /**
   * Reorder tour images
   */
  async reorderTourImages(id: string, imageOrder: string[]): Promise<APIResponse<TourImage[]>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.REORDER_IMAGES.replace(':id', id);
      const response = await apiClient.put<TourImage[]>(endpoint, { imageOrder });
      return response;
    } catch (error) {
      throw new Error(`Failed to reorder tour images: ${error}`);
    }
  }

  // ========================
  // Bookings for Tours
  // ========================

  /**
   * Get tour bookings
   */
  async getTourBookings(id: string, page?: number, limit?: number): Promise<APIResponse<{
    bookings: any[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.GET_TOUR_BOOKINGS.replace(':id', id);
      const params: Record<string, string> = {};
      if (page) params.page = page.toString();
      if (limit) params.limit = limit.toString();

      const response = await apiClient.get<{
        bookings: any[];
        total: number;
        page: number;
        limit: number;
        pages: number;
      }>(endpoint, Object.keys(params).length ? params : undefined);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch tour bookings: ${error}`);
    }
  }

  /**
   * Get availability bookings
   */
  async getAvailabilityBookings(tourId: string, availabilityId: string): Promise<APIResponse<any[]>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.GET_AVAILABILITY_BOOKINGS
        .replace(':id', tourId)
        .replace(':availabilityId', availabilityId);
      const response = await apiClient.get<any[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch availability bookings: ${error}`);
    }
  }

  // ========================
  // Reviews and Ratings
  // ========================

  /**
   * Get tour reviews
   */
  async getTourReviews(id: string, page?: number, limit?: number): Promise<APIResponse<{
    reviews: any[];
    total: number;
    average: number;
    page: number;
    limit: number;
  }>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.GET_REVIEWS.replace(':id', id);
      const params: Record<string, string> = {};
      if (page) params.page = page.toString();
      if (limit) params.limit = limit.toString();

      const response = await apiClient.get<{
        reviews: any[];
        total: number;
        average: number;
        page: number;
        limit: number;
      }>(endpoint, Object.keys(params).length ? params : undefined);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch tour reviews: ${error}`);
    }
  }

  /**
   * Add tour review
   */
  async addTourReview(id: string, review: TourReviewRequest): Promise<APIResponse<any>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.ADD_REVIEW.replace(':id', id);
      const response = await apiClient.post<any>(endpoint, review);
      return response;
    } catch (error) {
      throw new Error(`Failed to add tour review: ${error}`);
    }
  }

  /**
   * Update tour review
   */
  async updateTourReview(id: string, reviewId: string, review: Partial<TourReviewRequest>): Promise<APIResponse<any>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.UPDATE_REVIEW
        .replace(':id', id)
        .replace(':reviewId', reviewId);
      const response = await apiClient.put<any>(endpoint, review);
      return response;
    } catch (error) {
      throw new Error(`Failed to update tour review: ${error}`);
    }
  }

  /**
   * Delete tour review
   */
  async deleteTourReview(id: string, reviewId: string): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.DELETE_REVIEW
        .replace(':id', id)
        .replace(':reviewId', reviewId);
      const response = await apiClient.delete<{ message: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete tour review: ${error}`);
    }
  }

  /**
   * Get review statistics
   */
  async getReviewStats(id: string): Promise<APIResponse<{
    averageRating: number;
    totalReviews: number;
    ratingDistribution: { rating: number; count: number }[];
    recentReviews: any[];
  }>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.GET_REVIEW_STATS.replace(':id', id);
      const response = await apiClient.get<{
        averageRating: number;
        totalReviews: number;
        ratingDistribution: { rating: number; count: number }[];
        recentReviews: any[];
      }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch review statistics: ${error}`);
    }
  }

  // ========================
  // Categories Management
  // ========================

  /**
   * Get tour categories
   */
  async getTourCategories(): Promise<APIResponse<TourCategory[]>> {
    try {
      const response = await apiClient.get<TourCategory[]>(API_ENDPOINTS.TOURS.GET_CATEGORIES);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch tour categories: ${error}`);
    }
  }

  /**
   * Create tour category
   */
  async createTourCategory(data: CreateCategoryRequest): Promise<APIResponse<TourCategory>> {
    try {
      const response = await apiClient.post<TourCategory>(
        API_ENDPOINTS.TOURS.CREATE_CATEGORY,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to create tour category: ${error}`);
    }
  }

  /**
   * Update tour category
   */
  async updateTourCategory(data: UpdateCategoryRequest): Promise<APIResponse<TourCategory>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.UPDATE_CATEGORY.replace(':id', data.id);
      const { id, ...updateData } = data;
      const response = await apiClient.put<TourCategory>(endpoint, updateData);
      return response;
    } catch (error) {
      throw new Error(`Failed to update tour category: ${error}`);
    }
  }

  /**
   * Delete tour category
   */
  async deleteTourCategory(id: string): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.DELETE_CATEGORY.replace(':id', id);
      const response = await apiClient.delete<{ message: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete tour category: ${error}`);
    }
  }

  // ========================
  // Guides Management
  // ========================

  /**
   * Get all guides
   */
  async getGuides(): Promise<APIResponse<Guide[]>> {
    try {
      const response = await apiClient.get<Guide[]>(API_ENDPOINTS.TOURS.GET_GUIDES);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch guides: ${error}`);
    }
  }

  /**
   * Create guide
   */
  async createGuide(data: CreateGuideRequest): Promise<APIResponse<Guide>> {
    try {
      const response = await apiClient.post<Guide>(
        API_ENDPOINTS.TOURS.CREATE_GUIDE,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to create guide: ${error}`);
    }
  }

  /**
   * Update guide
   */
  async updateGuide(data: UpdateGuideRequest): Promise<APIResponse<Guide>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.UPDATE_GUIDE.replace(':id', data.id);
      const { id, ...updateData } = data;
      const response = await apiClient.put<Guide>(endpoint, updateData);
      return response;
    } catch (error) {
      throw new Error(`Failed to update guide: ${error}`);
    }
  }

  /**
   * Delete guide
   */
  async deleteGuide(id: string): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.DELETE_GUIDE.replace(':id', id);
      const response = await apiClient.delete<{ message: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete guide: ${error}`);
    }
  }

  /**
   * Get guide tours
   */
  async getGuideTours(guideId: string): Promise<APIResponse<Tour[]>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.GET_GUIDE_TOURS.replace(':id', guideId);
      const response = await apiClient.get<Tour[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch guide tours: ${error}`);
    }
  }

  // ========================
  // Destinations Management
  // ========================

  /**
   * Get tour destinations
   */
  async getTourDestinations(): Promise<APIResponse<Destination[]>> {
    try {
      const response = await apiClient.get<Destination[]>(API_ENDPOINTS.TOURS.GET_TOUR_DESTINATIONS);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch tour destinations: ${error}`);
    }
  }

  /**
   * Link destination to tour
   */
  async linkDestination(tourId: string, destinationId: string): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.LINK_DESTINATION
        .replace(':id', tourId)
        .replace(':destinationId', destinationId);
      const response = await apiClient.post<{ message: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to link destination: ${error}`);
    }
  }

  /**
   * Unlink destination from tour
   */
  async unlinkDestination(tourId: string, destinationId: string): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.UNLINK_DESTINATION
        .replace(':id', tourId)
        .replace(':destinationId', destinationId);
      const response = await apiClient.delete<{ message: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to unlink destination: ${error}`);
    }
  }

  // ========================
  // Pricing and Discounts
  // ========================

  /**
   * Update tour pricing
   */
  async updateTourPricing(id: string, data: UpdatePricingRequest): Promise<APIResponse<Tour>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.UPDATE_PRICING.replace(':id', id);
      const response = await apiClient.put<Tour>(endpoint, data);
      return response;
    } catch (error) {
      throw new Error(`Failed to update tour pricing: ${error}`);
    }
  }

  /**
   * Add discount
   */
  async addDiscount(tourId: string, data: CreateDiscountRequest): Promise<APIResponse<any>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.ADD_DISCOUNT.replace(':id', tourId);
      const response = await apiClient.post<any>(endpoint, data);
      return response;
    } catch (error) {
      throw new Error(`Failed to add discount: ${error}`);
    }
  }

  /**
   * Update discount
   */
  async updateDiscount(tourId: string, data: UpdateDiscountRequest): Promise<APIResponse<any>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.UPDATE_DISCOUNT
        .replace(':id', tourId)
        .replace(':discountId', data.id);
      const { id, ...updateData } = data;
      const response = await apiClient.put<any>(endpoint, updateData);
      return response;
    } catch (error) {
      throw new Error(`Failed to update discount: ${error}`);
    }
  }

  /**
   * Delete discount
   */
  async deleteDiscount(tourId: string, discountId: string): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.DELETE_DISCOUNT
        .replace(':id', tourId)
        .replace(':discountId', discountId);
      const response = await apiClient.delete<{ message: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete discount: ${error}`);
    }
  }

  // ========================
  // Statistics and Analytics
  // ========================

  /**
   * Get tour statistics
   */
  async getTourStats(): Promise<APIResponse<{
    totalTours: number;
    activeTours: number;
    averageRating: number;
    totalBookings: number;
    popularCategories: { category: string; count: number }[];
    recentTours: Tour[];
  }>> {
    try {
      const response = await apiClient.get<{
        totalTours: number;
        activeTours: number;
        averageRating: number;
        totalBookings: number;
        popularCategories: { category: string; count: number }[];
        recentTours: Tour[];
      }>(API_ENDPOINTS.TOURS.GET_STATS);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch tour statistics: ${error}`);
    }
  }

  /**
   * Get popular tours
   */
  async getPopularTours(limit?: number): Promise<APIResponse<Tour[]>> {
    try {
      const params = limit ? { limit: limit.toString() } : undefined;
      const response = await apiClient.get<Tour[]>(
        API_ENDPOINTS.TOURS.GET_POPULAR,
        params
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch popular tours: ${error}`);
    }
  }

  /**
   * Get featured tours
   */
  async getFeaturedTours(limit?: number): Promise<APIResponse<Tour[]>> {
    try {
      const params = limit ? { limit: limit.toString() } : undefined;
      const response = await apiClient.get<Tour[]>(
        API_ENDPOINTS.TOURS.GET_FEATURED,
        params
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch featured tours: ${error}`);
    }
  }

  /**
   * Get tour performance
   */
  async getTourPerformance(id: string): Promise<APIResponse<{
    totalBookings: number;
    revenue: number;
    averageRating: number;
    occupancyRate: number;
    monthlyPerformance: { month: string; bookings: number; revenue: number }[];
  }>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.GET_TOUR_PERFORMANCE.replace(':id', id);
      const response = await apiClient.get<{
        totalBookings: number;
        revenue: number;
        averageRating: number;
        occupancyRate: number;
        monthlyPerformance: { month: string; bookings: number; revenue: number }[];
      }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch tour performance: ${error}`);
    }
  }

  /**
   * Get revenue analytics
   */
  async getRevenueAnalytics(dateRange?: { from: string; to: string }): Promise<APIResponse<{
    totalRevenue: number;
    averageBookingValue: number;
    dailyRevenue: { date: string; revenue: number }[];
    topPerformingTours: { tourId: string; title: string; revenue: number }[];
  }>> {
    try {
      const params = dateRange ? { from: dateRange.from, to: dateRange.to } : undefined;
      const response = await apiClient.get<{
        totalRevenue: number;
        averageBookingValue: number;
        dailyRevenue: { date: string; revenue: number }[];
        topPerformingTours: { tourId: string; title: string; revenue: number }[];
      }>(API_ENDPOINTS.TOURS.GET_REVENUE_ANALYTICS, params);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch revenue analytics: ${error}`);
    }
  }

  /**
   * Get booking trends
   */
  async getBookingTrends(dateRange?: { from: string; to: string }): Promise<APIResponse<{
    totalBookings: number;
    dailyBookings: { date: string; bookings: number }[];
    seasonalTrends: { month: string; bookings: number }[];
    popularDestinations: { destination: string; bookings: number }[];
  }>> {
    try {
      const params = dateRange ? { from: dateRange.from, to: dateRange.to } : undefined;
      const response = await apiClient.get<{
        totalBookings: number;
        dailyBookings: { date: string; bookings: number }[];
        seasonalTrends: { month: string; bookings: number }[];
        popularDestinations: { destination: string; bookings: number }[];
      }>(API_ENDPOINTS.TOURS.GET_BOOKING_TRENDS, params);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch booking trends: ${error}`);
    }
  }

  // ========================
  // Content Management
  // ========================

  /**
   * Update tour SEO
   */
  async updateTourSEO(id: string, seoData: { metaTitle: string; metaDescription: string; keywords: string[] }): Promise<APIResponse<Tour>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.UPDATE_SEO.replace(':id', id);
      const response = await apiClient.put<Tour>(endpoint, seoData);
      return response;
    } catch (error) {
      throw new Error(`Failed to update tour SEO: ${error}`);
    }
  }

  /**
   * Duplicate tour
   */
  async duplicateTour(id: string, newTitle?: string): Promise<APIResponse<Tour>> {
    try {
      const endpoint = API_ENDPOINTS.TOURS.DUPLICATE_TOUR.replace(':id', id);
      const response = await apiClient.post<Tour>(endpoint, { newTitle });
      return response;
    } catch (error) {
      throw new Error(`Failed to duplicate tour: ${error}`);
    }
  }

  // ========================
  // Bulk Operations
  // ========================

  /**
   * Bulk update tour status
   */
  async bulkUpdateStatus(tourIds: string[], status: 'active' | 'inactive' | 'draft'): Promise<APIResponse<{ updated: number }>> {
    try {
      const response = await apiClient.put<{ updated: number }>(
        API_ENDPOINTS.TOURS.BULK_UPDATE_STATUS,
        { tourIds, status }
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to bulk update tour status: ${error}`);
    }
  }

  /**
   * Bulk update featured status
   */
  async bulkUpdateFeatured(tourIds: string[], featured: boolean): Promise<APIResponse<{ updated: number }>> {
    try {
      const response = await apiClient.put<{ updated: number }>(
        API_ENDPOINTS.TOURS.BULK_UPDATE_FEATURED,
        { tourIds, featured }
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to bulk update featured status: ${error}`);
    }
  }

  /**
   * Bulk update pricing
   */
  async bulkUpdatePricing(tourIds: string[], priceAdjustment: { type: 'percentage' | 'fixed'; value: number; operation: 'increase' | 'decrease' | 'set' }): Promise<APIResponse<{ updated: number }>> {
    try {
      const response = await apiClient.put<{ updated: number }>(
        API_ENDPOINTS.TOURS.BULK_UPDATE_PRICING,
        { tourIds, priceAdjustment }
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to bulk update pricing: ${error}`);
    }
  }

  /**
   * Bulk assign guide
   */
  async bulkAssignGuide(data: BulkAssignGuideRequest): Promise<APIResponse<{ updated: number }>> {
    try {
      const response = await apiClient.put<{ updated: number }>(
        API_ENDPOINTS.TOURS.BULK_ASSIGN_GUIDE,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to bulk assign guide: ${error}`);
    }
  }

  // ========================
  // Import and Export
  // ========================

  /**
   * Export tours
   */
  async exportTours(filters?: TourFilters, format: 'csv' | 'excel' | 'pdf' = 'csv'): Promise<APIResponse<{ downloadUrl: string }>> {
    try {
      const data = { filters, format };
      const response = await apiClient.post<{ downloadUrl: string }>(
        API_ENDPOINTS.TOURS.EXPORT_TOURS,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to export tours: ${error}`);
    }
  }

  /**
   * Import tours
   */
  async importTours(data: ImportTourRequest): Promise<APIResponse<{ imported: number; errors: string[] }>> {
    try {
      const response = await apiClient.upload<{ imported: number; errors: string[] }>(
        API_ENDPOINTS.TOURS.IMPORT_TOURS,
        data.file,
        {
          skipValidation: data.skipValidation?.toString(),
          updateExisting: data.updateExisting?.toString(),
        }
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to import tours: ${error}`);
    }
  }

  /**
   * Get import template
   */
  async getImportTemplate(): Promise<APIResponse<{ templateUrl: string }>> {
    try {
      const response = await apiClient.get<{ templateUrl: string }>(
        API_ENDPOINTS.TOURS.GET_IMPORT_TEMPLATE
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to get import template: ${error}`);
    }
  }

  // ========================
  // Utility Methods
  // ========================

  /**
   * Build filter parameters for API requests
   */
  private buildFilterParams(filters: TourFilters): Record<string, string> {
    const params: Record<string, string> = {};

    if (filters.categories?.length) {
      params.categories = filters.categories.join(',');
    }
    if (filters.destinations?.length) {
      params.destinations = filters.destinations.join(',');
    }
    if (filters.difficulty?.length) {
      params.difficulty = filters.difficulty.join(',');
    }
    if (filters.duration?.length) {
      params.duration = filters.duration.join(',');
    }
    if (filters.priceRange) {
      params.priceMin = filters.priceRange[0].toString();
      params.priceMax = filters.priceRange[1].toString();
    }
    if (filters.rating) {
      params.rating = filters.rating.toString();
    }
    if (filters.dates) {
      params.dateFrom = filters.dates.from;
      params.dateTo = filters.dates.to;
    }

    return params;
  }

  /**
   * Generate tour slug
   */
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  /**
   * Calculate tour duration in hours
   */
  calculateTotalHours(duration: { days: number; nights: number }): number {
    return duration.days * 24;
  }

  /**
   * Get difficulty color (utility method for UI)
   */
  getDifficultyColor(difficulty: string): string {
    const colors: Record<string, string> = {
      easy: 'green',
      moderate: 'yellow',
      challenging: 'orange',
      extreme: 'red'
    };
    return colors[difficulty] || 'gray';
  }

  /**
   * Get tour status color (utility method for UI)
   */
  getTourStatusColor(status: string): string {
    const colors: Record<string, string> = {
      active: 'green',
      inactive: 'gray',
      draft: 'yellow'
    };
    return colors[status] || 'gray';
  }

  /**
   * Validate tour data
   */
  validateTourData(tour: Partial<CreateTourRequest>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!tour.title?.trim()) {
      errors.push('Title is required');
    }
    if (!tour.description?.trim()) {
      errors.push('Description is required');
    }
    if (!tour.price?.amount || tour.price.amount <= 0) {
      errors.push('Valid price is required');
    }
    if (!tour.duration?.days || tour.duration.days <= 0) {
      errors.push('Valid duration is required');
    }
    if (!tour.groupSize?.max || tour.groupSize.max <= 0) {
      errors.push('Valid group size is required');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

// Export singleton instance
export const tourService = new TourService();