import { apiClient, API_ENDPOINTS } from '@/lib/api';
import {
  Activity,
  ActivityImage,
  ActivityAvailability,
  TimeSlot,
} from '@/types/activities';
import { APIResponse } from '@/types/APIResponse';

// Request types for activities service
export interface CreateActivityRequest {
  name: string;
  description: string;
  category: string;
  type: 'adventure' | 'cultural' | 'educational' | 'recreational' | 'wellness';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  physicalRequirement: 'low' | 'moderate' | 'high' | 'extreme';
  ageRestriction?: {
    min?: number;
    max?: number;
  };
  duration: {
    hours: number;
    minutes: number;
  };
  groupSize: {
    min: number;
    max: number;
  };
  location: {
    name: string;
    coordinates?: { lat: number; lng: number };
    indoor: boolean;
  };
  weatherDependent: boolean;
  equipment: {
    provided: string[];
    required: string[];
    optional: string[];
  };
  safetyLevel: 'low' | 'moderate' | 'high';
  safetyMeasures: string[];
  pricing: {
    basePrice: number;
    currency: string;
    included: boolean;
  };
  bookingRequired: boolean;
  advanceBooking: number;
  status: 'active' | 'inactive' | 'seasonal';
}

export interface UpdateActivityRequest extends Partial<CreateActivityRequest> {
  id: string;
}

export interface ActivityFilters {
  category?: string;
  type?: string;
  difficulty?: string;
  physicalRequirement?: string;
  location?: string;
  priceRange?: [number, number];
  duration?: string;
  weatherDependent?: boolean;
  safetyLevel?: string;
  status?: string;
  groupSizeMin?: number;
  groupSizeMax?: number;
  indoorOnly?: boolean;
  featured?: boolean;
  rating?: number;
}

export interface SearchActivitiesRequest {
  query: string;
  filters?: ActivityFilters;
  sortBy?: 'name' | 'price' | 'rating' | 'duration' | 'created' | 'popularity';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface ActivityReviewRequest {
  rating: number;
  comment: string;
  images?: string[];
}

export interface UpdateAvailabilityRequest {
  date: string;
  timeSlots: TimeSlot[];
  capacity: number;
}

export interface CheckAvailabilityRequest {
  date: string;
  startTime: string;
  endTime: string;
  participants: number;
}

class ActivitiesService {
  // ========================
  // Basic CRUD Operations
  // ========================

  /**
   * Get all activities with optional filters
   */
  async getAllActivities(filters?: ActivityFilters): Promise<APIResponse<Activity[]>> {
    try {
      const params = filters ? this.buildFilterParams(filters) : undefined;
      const response = await apiClient.get<Activity[]>(
        API_ENDPOINTS.ACTIVITIES.GET_ALL,
        params
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch activities: ${error}`);
    }
  }

  /**
   * Get activity by ID
   */
  async getActivityById(id: string): Promise<APIResponse<Activity>> {
    try {
      const endpoint = API_ENDPOINTS.ACTIVITIES.GET_BY_ID.replace(':id', id);
      const response = await apiClient.get<Activity>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch activity: ${error}`);
    }
  }

  /**
   * Create new activity
   */
  async createActivity(data: CreateActivityRequest): Promise<APIResponse<Activity>> {
    try {
      const response = await apiClient.post<Activity>(
        API_ENDPOINTS.ACTIVITIES.CREATE,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to create activity: ${error}`);
    }
  }

  /**
   * Update activity
   */
  async updateActivity(data: UpdateActivityRequest): Promise<APIResponse<Activity>> {
    try {
      const endpoint = API_ENDPOINTS.ACTIVITIES.UPDATE.replace(':id', data.id);
      const { id, ...updateData } = data;
      const response = await apiClient.put<Activity>(endpoint, updateData);
      return response;
    } catch (error) {
      throw new Error(`Failed to update activity: ${error}`);
    }
  }

  /**
   * Delete activity
   */
  async deleteActivity(id: string): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.ACTIVITIES.DELETE.replace(':id', id);
      const response = await apiClient.delete<{ message: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete activity: ${error}`);
    }
  }

  // ========================
  // Search and Filter
  // ========================

  /**
   * Search activities
   */
  async searchActivities(request: SearchActivitiesRequest): Promise<APIResponse<{
    activities: Activity[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }>> {
    try {
      const response = await apiClient.post<{
        activities: Activity[];
        total: number;
        page: number;
        limit: number;
        pages: number;
      }>(API_ENDPOINTS.ACTIVITIES.SEARCH, request);
      return response;
    } catch (error) {
      throw new Error(`Failed to search activities: ${error}`);
    }
  }

  /**
   * Filter activities
   */
  async filterActivities(filters: ActivityFilters): Promise<APIResponse<Activity[]>> {
    try {
      const response = await apiClient.post<Activity[]>(
        API_ENDPOINTS.ACTIVITIES.FILTER,
        filters
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to filter activities: ${error}`);
    }
  }

  /**
   * Get activities by category
   */
  async getActivitiesByCategory(category: string): Promise<APIResponse<Activity[]>> {
    try {
      const endpoint = API_ENDPOINTS.ACTIVITIES.BY_CATEGORY.replace(':category', category);
      const response = await apiClient.get<Activity[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch activities by category: ${error}`);
    }
  }

  /**
   * Get activities by type
   */
  async getActivitiesByType(type: string): Promise<APIResponse<Activity[]>> {
    try {
      const endpoint = API_ENDPOINTS.ACTIVITIES.BY_TYPE.replace(':type', type);
      const response = await apiClient.get<Activity[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch activities by type: ${error}`);
    }
  }

  /**
   * Get activities by difficulty
   */
  async getActivitiesByDifficulty(difficulty: string): Promise<APIResponse<Activity[]>> {
    try {
      const endpoint = API_ENDPOINTS.ACTIVITIES.BY_DIFFICULTY.replace(':difficulty', difficulty);
      const response = await apiClient.get<Activity[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch activities by difficulty: ${error}`);
    }
  }

  /**
   * Get activities by location
   */
  async getActivitiesByLocation(location: string): Promise<APIResponse<Activity[]>> {
    try {
      const endpoint = API_ENDPOINTS.ACTIVITIES.BY_LOCATION.replace(':location', location);
      const response = await apiClient.get<Activity[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch activities by location: ${error}`);
    }
  }

  // ========================
  // Availability Management
  // ========================

  /**
   * Get activity availability
   */
  async getActivityAvailability(id: string, date?: string): Promise<APIResponse<ActivityAvailability[]>> {
    try {
      const endpoint = API_ENDPOINTS.ACTIVITIES.GET_AVAILABILITY.replace(':id', id);
      const params = date ? { date } : undefined;
      const response = await apiClient.get<ActivityAvailability[]>(endpoint, params);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch activity availability: ${error}`);
    }
  }

  /**
   * Update activity availability
   */
  async updateActivityAvailability(id: string, data: UpdateAvailabilityRequest): Promise<APIResponse<ActivityAvailability>> {
    try {
      const endpoint = API_ENDPOINTS.ACTIVITIES.UPDATE_AVAILABILITY.replace(':id', id);
      const response = await apiClient.put<ActivityAvailability>(endpoint, data);
      return response;
    } catch (error) {
      throw new Error(`Failed to update activity availability: ${error}`);
    }
  }

  /**
   * Check slot availability
   */
  async checkSlotAvailability(id: string, request: CheckAvailabilityRequest): Promise<APIResponse<{
    available: boolean;
    conflictingBookings?: number;
    alternativeSlots?: TimeSlot[];
  }>> {
    try {
      const endpoint = API_ENDPOINTS.ACTIVITIES.CHECK_SLOT_AVAILABILITY.replace(':id', id);
      const response = await apiClient.post<{
        available: boolean;
        conflictingBookings?: number;
        alternativeSlots?: TimeSlot[];
      }>(endpoint, request);
      return response;
    } catch (error) {
      throw new Error(`Failed to check slot availability: ${error}`);
    }
  }

  // ========================
  // Media Management
  // ========================

  /**
   * Upload activity images
   */
  async uploadActivityImages(id: string, files: File[]): Promise<APIResponse<ActivityImage[]>> {
    try {
      const endpoint = API_ENDPOINTS.ACTIVITIES.UPLOAD_IMAGES.replace(':id', id);
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });

      const response = await apiClient.upload<ActivityImage[]>(endpoint, files[0], {
        // Additional form data for multiple files
        imageCount: files.length.toString(),
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to upload activity images: ${error}`);
    }
  }

  /**
   * Delete activity image
   */
  async deleteActivityImage(id: string, imageId: string): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.ACTIVITIES.DELETE_IMAGE
        .replace(':id', id)
        .replace(':imageId', imageId);
      const response = await apiClient.delete<{ message: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete activity image: ${error}`);
    }
  }

  /**
   * Set primary image
   */
  async setPrimaryImage(id: string, imageId: string): Promise<APIResponse<Activity>> {
    try {
      const endpoint = API_ENDPOINTS.ACTIVITIES.SET_PRIMARY_IMAGE
        .replace(':id', id)
        .replace(':imageId', imageId);
      const response = await apiClient.put<Activity>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to set primary image: ${error}`);
    }
  }

  // ========================
  // Reviews and Ratings
  // ========================

  /**
   * Get activity reviews
   */
  async getActivityReviews(id: string, page?: number, limit?: number): Promise<APIResponse<{
    reviews: any[];
    total: number;
    average: number;
    page: number;
    limit: number;
  }>> {
    try {
      const endpoint = API_ENDPOINTS.ACTIVITIES.GET_REVIEWS.replace(':id', id);
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
      throw new Error(`Failed to fetch activity reviews: ${error}`);
    }
  }

  /**
   * Add activity review
   */
  async addActivityReview(id: string, review: ActivityReviewRequest): Promise<APIResponse<any>> {
    try {
      const endpoint = API_ENDPOINTS.ACTIVITIES.ADD_REVIEW.replace(':id', id);
      const response = await apiClient.post<any>(endpoint, review);
      return response;
    } catch (error) {
      throw new Error(`Failed to add activity review: ${error}`);
    }
  }

  /**
   * Update activity review
   */
  async updateActivityReview(id: string, reviewId: string, review: Partial<ActivityReviewRequest>): Promise<APIResponse<any>> {
    try {
      const endpoint = API_ENDPOINTS.ACTIVITIES.UPDATE_REVIEW
        .replace(':id', id)
        .replace(':reviewId', reviewId);
      const response = await apiClient.put<any>(endpoint, review);
      return response;
    } catch (error) {
      throw new Error(`Failed to update activity review: ${error}`);
    }
  }

  /**
   * Delete activity review
   */
  async deleteActivityReview(id: string, reviewId: string): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.ACTIVITIES.DELETE_REVIEW
        .replace(':id', id)
        .replace(':reviewId', reviewId);
      const response = await apiClient.delete<{ message: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete activity review: ${error}`);
    }
  }

  // ========================
  // Categories and Metadata
  // ========================

  /**
   * Get activity categories
   */
  async getActivityCategories(): Promise<APIResponse<string[]>> {
    try {
      const response = await apiClient.get<string[]>(API_ENDPOINTS.ACTIVITIES.GET_CATEGORIES);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch activity categories: ${error}`);
    }
  }

  /**
   * Get activity types
   */
  async getActivityTypes(): Promise<APIResponse<string[]>> {
    try {
      const response = await apiClient.get<string[]>(API_ENDPOINTS.ACTIVITIES.GET_TYPES);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch activity types: ${error}`);
    }
  }

  /**
   * Get activity difficulties
   */
  async getActivityDifficulties(): Promise<APIResponse<string[]>> {
    try {
      const response = await apiClient.get<string[]>(API_ENDPOINTS.ACTIVITIES.GET_DIFFICULTIES);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch activity difficulties: ${error}`);
    }
  }

  // ========================
  // Statistics and Popular Content
  // ========================

  /**
   * Get activity statistics
   */
  async getActivityStats(): Promise<APIResponse<{
    totalActivities: number;
    activeActivities: number;
    averageRating: number;
    totalBookings: number;
    popularCategories: { category: string; count: number }[];
    recentActivity: Activity[];
  }>> {
    try {
      const response = await apiClient.get<{
        totalActivities: number;
        activeActivities: number;
        averageRating: number;
        totalBookings: number;
        popularCategories: { category: string; count: number }[];
        recentActivity: Activity[];
      }>(API_ENDPOINTS.ACTIVITIES.GET_STATS);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch activity statistics: ${error}`);
    }
  }

  /**
   * Get popular activities
   */
  async getPopularActivities(limit?: number): Promise<APIResponse<Activity[]>> {
    try {
      const params = limit ? { limit: limit.toString() } : undefined;
      const response = await apiClient.get<Activity[]>(
        API_ENDPOINTS.ACTIVITIES.GET_POPULAR,
        params
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch popular activities: ${error}`);
    }
  }

  /**
   * Get featured activities
   */
  async getFeaturedActivities(limit?: number): Promise<APIResponse<Activity[]>> {
    try {
      const params = limit ? { limit: limit.toString() } : undefined;
      const response = await apiClient.get<Activity[]>(
        API_ENDPOINTS.ACTIVITIES.GET_FEATURED,
        params
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch featured activities: ${error}`);
    }
  }

  // ========================
  // Bulk Operations
  // ========================

  /**
   * Bulk update activity status
   */
  async bulkUpdateStatus(activityIds: string[], status: 'active' | 'inactive' | 'seasonal'): Promise<APIResponse<{ updated: number }>> {
    try {
      const response = await apiClient.put<{ updated: number }>(
        API_ENDPOINTS.ACTIVITIES.BULK_UPDATE_STATUS,
        { activityIds, status }
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to bulk update activity status: ${error}`);
    }
  }

  /**
   * Bulk delete activities
   */
  async bulkDeleteActivities(activityIds: string[]): Promise<APIResponse<{ deleted: number }>> {
    try {
      const response = await apiClient.delete<{ deleted: number }>(
        `${API_ENDPOINTS.ACTIVITIES.BULK_DELETE}?ids=${activityIds.join(',')}`
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to bulk delete activities: ${error}`);
    }
  }

  // ========================
  // Utility Methods
  // ========================

  /**
   * Build filter parameters for API requests
   */
  private buildFilterParams(filters: ActivityFilters): Record<string, string> {
    const params: Record<string, string> = {};

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          params[key] = value.join(',');
        } else {
          params[key] = value.toString();
        }
      }
    });

    return params;
  }

  /**
   * Get activity by slug (if supported by backend)
   */
  async getActivityBySlug(slug: string): Promise<APIResponse<Activity>> {
    try {
      // This would need to be added to API_ENDPOINTS if supported
      const response = await apiClient.get<Activity>(`/activities/slug/${slug}`);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch activity by slug: ${error}`);
    }
  }
}

// Export singleton instance
export const activitiesService = new ActivitiesService();
