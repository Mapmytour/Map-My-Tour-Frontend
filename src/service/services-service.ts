import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import {
  Service,
  ServiceCategory,
  ServiceImage,
  ServiceProvider,
  ServiceBooking,
  ServiceAvailability,
  ServiceFilters,
} from '@/types/service';
import { APIResponse } from '@/types/APIResponse';

// Request types for services service
export interface CreateServiceRequest {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: ServiceCategory;
  type: 'accommodation' | 'transport' | 'activity' | 'guide' | 'equipment' | 'insurance' | 'visa';
  pricing: {
    basePrice: number;
    currency: string;
    pricingModel: 'per-person' | 'per-group' | 'per-day' | 'flat-rate';
    minimumCharge?: number;
  };
  available: boolean;
  seasonality: 'year-round' | 'seasonal' | 'limited';
  advanceBooking: number;
  capacity: {
    min: number;
    max: number;
    optimal: number;
  };
  location?: {
    name: string;
    address?: string;
    coordinates?: { lat: number; lng: number };
  };
  features: string[];
  included: string[];
  excluded: string[];
  requirements: string[];
  restrictions: string[];
  ageLimit?: {
    min?: number;
    max?: number;
  };
  provider: ServiceProvider;
  featured?: boolean;
  popular?: boolean;
  bookingMethod: 'direct' | 'third-party' | 'manual';
  externalId?: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
}

export interface UpdateServiceRequest extends Partial<CreateServiceRequest> {
  id: string;
}

export interface CreateCategoryRequest {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {
  id: string;
}

export interface CreateProviderRequest {
  name: string;
  type: 'partner' | 'supplier' | 'internal';
  contact: {
    email: string;
    phone: string;
    website?: string;
  };
  paymentTerms: string;
  contract: {
    startDate: string;
    endDate?: string;
    commissionRate?: number;
  };
}

export interface UpdateProviderRequest extends Partial<CreateProviderRequest> {
  id: string;
}

export interface ServiceSearchRequest {
  query: string;
  filters?: ServiceFilters;
  sortBy?: 'name' | 'price' | 'rating' | 'popularity' | 'created';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface CreateServiceBookingRequest {
  quantity: number;
  participants: number;
  startDate: string;
  endDate?: string;
  duration?: number;
  requirements?: string[];
  notes?: string;
}

export interface UpdateServiceBookingRequest extends Partial<CreateServiceBookingRequest> {
  id: string;
  status?: 'requested' | 'confirmed' | 'cancelled' | 'completed';
}

export interface UpdateAvailabilityRequest {
  date: string;
  available: boolean;
  capacity: number;
  price?: number;
  restrictions?: string[];
}

export interface CheckAvailabilityRequest {
  startDate: string;
  endDate?: string;
  participants: number;
  requirements?: string[];
}

export interface BulkPricingUpdateRequest {
  serviceIds: string[];
  priceAdjustment: {
    type: 'percentage' | 'fixed';
    value: number;
    operation: 'increase' | 'decrease' | 'set';
  };
}

class ServicesService {
  // ========================
  // Basic CRUD Operations
  // ========================

  /**
   * Get all services with optional filters
   */
  async getAllServices(filters?: ServiceFilters): Promise<APIResponse<{
    services: Service[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }>> {
    try {
      const params = filters ? this.buildFilterParams(filters) : undefined;
      const response = await apiClient.get<{
        services: Service[];
        total: number;
        page: number;
        limit: number;
        pages: number;
      }>(API_ENDPOINTS.SERVICES.GET_ALL, params);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch services: ${error}`);
    }
  }

  /**
   * Get service by ID
   */
  async getServiceById(id: string): Promise<APIResponse<Service>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.GET_BY_ID.replace(':id', id);
      const response = await apiClient.get<Service>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch service: ${error}`);
    }
  }

  /**
   * Get service by slug
   */
  async getServiceBySlug(slug: string): Promise<APIResponse<Service>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.GET_BY_SLUG.replace(':slug', slug);
      const response = await apiClient.get<Service>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch service by slug: ${error}`);
    }
  }

  /**
   * Create new service
   */
  async createService(data: CreateServiceRequest): Promise<APIResponse<Service>> {
    try {
      const response = await apiClient.post<Service>(
        API_ENDPOINTS.SERVICES.CREATE,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to create service: ${error}`);
    }
  }

  /**
   * Update service
   */
  async updateService(data: UpdateServiceRequest): Promise<APIResponse<Service>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.UPDATE.replace(':id', data.id);
      const { id, ...updateData } = data;
      const response = await apiClient.put<Service>(endpoint, updateData);
      return response;
    } catch (error) {
      throw new Error(`Failed to update service: ${error}`);
    }
  }

  /**
   * Delete service
   */
  async deleteService(id: string): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.DELETE.replace(':id', id);
      const response = await apiClient.delete<{ message: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete service: ${error}`);
    }
  }

  // ========================
  // Search and Filter
  // ========================

  /**
   * Search services
   */
  async searchServices(request: ServiceSearchRequest): Promise<APIResponse<{
    services: Service[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }>> {
    try {
      const response = await apiClient.post<{
        services: Service[];
        total: number;
        page: number;
        limit: number;
        pages: number;
      }>(API_ENDPOINTS.SERVICES.SEARCH, request);
      return response;
    } catch (error) {
      throw new Error(`Failed to search services: ${error}`);
    }
  }

  /**
   * Filter services
   */
  async filterServices(filters: ServiceFilters): Promise<APIResponse<Service[]>> {
    try {
      const response = await apiClient.post<Service[]>(
        API_ENDPOINTS.SERVICES.FILTER,
        filters
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to filter services: ${error}`);
    }
  }

  /**
   * Get services by category
   */
  async getServicesByCategory(category: string): Promise<APIResponse<Service[]>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.BY_CATEGORY.replace(':category', category);
      const response = await apiClient.get<Service[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch services by category: ${error}`);
    }
  }

  /**
   * Get services by type
   */
  async getServicesByType(type: string): Promise<APIResponse<Service[]>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.BY_TYPE.replace(':type', type);
      const response = await apiClient.get<Service[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch services by type: ${error}`);
    }
  }

  /**
   * Get services by provider
   */
  async getServicesByProvider(providerId: string): Promise<APIResponse<Service[]>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.BY_PROVIDER.replace(':providerId', providerId);
      const response = await apiClient.get<Service[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch services by provider: ${error}`);
    }
  }

  /**
   * Get services by location
   */
  async getServicesByLocation(location: string): Promise<APIResponse<Service[]>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.BY_LOCATION.replace(':location', location);
      const response = await apiClient.get<Service[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch services by location: ${error}`);
    }
  }

  // ========================
  // Categories Management
  // ========================

  /**
   * Get all service categories
   */
  async getServiceCategories(): Promise<APIResponse<ServiceCategory[]>> {
    try {
      const response = await apiClient.get<ServiceCategory[]>(API_ENDPOINTS.SERVICES.GET_CATEGORIES);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch service categories: ${error}`);
    }
  }

  /**
   * Create service category
   */
  async createServiceCategory(data: CreateCategoryRequest): Promise<APIResponse<ServiceCategory>> {
    try {
      const response = await apiClient.post<ServiceCategory>(
        API_ENDPOINTS.SERVICES.CREATE_CATEGORY,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to create service category: ${error}`);
    }
  }

  /**
   * Update service category
   */
  async updateServiceCategory(data: UpdateCategoryRequest): Promise<APIResponse<ServiceCategory>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.UPDATE_CATEGORY.replace(':id', data.id);
      const { id, ...updateData } = data;
      const response = await apiClient.put<ServiceCategory>(endpoint, updateData);
      return response;
    } catch (error) {
      throw new Error(`Failed to update service category: ${error}`);
    }
  }

  /**
   * Delete service category
   */
  async deleteServiceCategory(id: string): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.DELETE_CATEGORY.replace(':id', id);
      const response = await apiClient.delete<{ message: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete service category: ${error}`);
    }
  }

  // ========================
  // Providers Management
  // ========================

  /**
   * Get all service providers
   */
  async getServiceProviders(): Promise<APIResponse<ServiceProvider[]>> {
    try {
      const response = await apiClient.get<ServiceProvider[]>(API_ENDPOINTS.SERVICES.GET_PROVIDERS);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch service providers: ${error}`);
    }
  }

  /**
   * Create service provider
   */
  async createServiceProvider(data: CreateProviderRequest): Promise<APIResponse<ServiceProvider>> {
    try {
      const response = await apiClient.post<ServiceProvider>(
        API_ENDPOINTS.SERVICES.CREATE_PROVIDER,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to create service provider: ${error}`);
    }
  }

  /**
   * Update service provider
   */
  async updateServiceProvider(data: UpdateProviderRequest): Promise<APIResponse<ServiceProvider>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.UPDATE_PROVIDER.replace(':id', data.id);
      const { id, ...updateData } = data;
      const response = await apiClient.put<ServiceProvider>(endpoint, updateData);
      return response;
    } catch (error) {
      throw new Error(`Failed to update service provider: ${error}`);
    }
  }

  /**
   * Delete service provider
   */
  async deleteServiceProvider(id: string): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.DELETE_PROVIDER.replace(':id', id);
      const response = await apiClient.delete<{ message: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete service provider: ${error}`);
    }
  }

  /**
   * Get provider services
   */
  async getProviderServices(providerId: string): Promise<APIResponse<Service[]>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.GET_PROVIDER_SERVICES.replace(':id', providerId);
      const response = await apiClient.get<Service[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch provider services: ${error}`);
    }
  }

  // ========================
  // Availability Management
  // ========================

  /**
   * Get service availability
   */
  async getServiceAvailability(id: string, dateRange?: { from: string; to: string }): Promise<APIResponse<ServiceAvailability[]>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.GET_AVAILABILITY.replace(':id', id);
      const params = dateRange ? { from: dateRange.from, to: dateRange.to } : undefined;
      const response = await apiClient.get<ServiceAvailability[]>(endpoint, params);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch service availability: ${error}`);
    }
  }

  /**
   * Update service availability
   */
  async updateServiceAvailability(id: string, data: UpdateAvailabilityRequest): Promise<APIResponse<ServiceAvailability>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.UPDATE_AVAILABILITY.replace(':id', id);
      const response = await apiClient.put<ServiceAvailability>(endpoint, data);
      return response;
    } catch (error) {
      throw new Error(`Failed to update service availability: ${error}`);
    }
  }

  /**
   * Check service availability
   */
  async checkServiceAvailability(id: string, request: CheckAvailabilityRequest): Promise<APIResponse<{
    available: boolean;
    capacity: number;
    booked: number;
    price?: number;
    restrictions?: string[];
    alternativeDates?: string[];
  }>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.CHECK_AVAILABILITY.replace(':id', id);
      const response = await apiClient.post<{
        available: boolean;
        capacity: number;
        booked: number;
        price?: number;
        restrictions?: string[];
        alternativeDates?: string[];
      }>(endpoint, request);
      return response;
    } catch (error) {
      throw new Error(`Failed to check service availability: ${error}`);
    }
  }

  // ========================
  // Booking Management
  // ========================

  /**
   * Create service booking
   */
  async createServiceBooking(serviceId: string, data: CreateServiceBookingRequest): Promise<APIResponse<ServiceBooking>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.CREATE_SERVICE_BOOKING.replace(':id', serviceId);
      const response = await apiClient.post<ServiceBooking>(endpoint, data);
      return response;
    } catch (error) {
      throw new Error(`Failed to create service booking: ${error}`);
    }
  }

  /**
   * Get service bookings
   */
  async getServiceBookings(serviceId: string, page?: number, limit?: number): Promise<APIResponse<{
    bookings: ServiceBooking[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.GET_SERVICE_BOOKINGS.replace(':id', serviceId);
      const params: Record<string, string> = {};
      if (page) params.page = page.toString();
      if (limit) params.limit = limit.toString();

      const response = await apiClient.get<{
        bookings: ServiceBooking[];
        total: number;
        page: number;
        limit: number;
        pages: number;
      }>(endpoint, Object.keys(params).length ? params : undefined);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch service bookings: ${error}`);
    }
  }

  /**
   * Update service booking
   */
  async updateServiceBooking(serviceId: string, data: UpdateServiceBookingRequest): Promise<APIResponse<ServiceBooking>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.UPDATE_SERVICE_BOOKING
        .replace(':id', serviceId)
        .replace(':bookingId', data.id);
      const { id, ...updateData } = data;
      const response = await apiClient.put<ServiceBooking>(endpoint, updateData);
      return response;
    } catch (error) {
      throw new Error(`Failed to update service booking: ${error}`);
    }
  }

  /**
   * Cancel service booking
   */
  async cancelServiceBooking(serviceId: string, bookingId: string, reason?: string): Promise<APIResponse<ServiceBooking>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.CANCEL_SERVICE_BOOKING
        .replace(':id', serviceId)
        .replace(':bookingId', bookingId);
      const response = await apiClient.put<ServiceBooking>(endpoint, { reason });
      return response;
    } catch (error) {
      throw new Error(`Failed to cancel service booking: ${error}`);
    }
  }

  // ========================
  // Media Management
  // ========================

  /**
   * Upload service images
   */
  async uploadServiceImages(id: string, files: File[]): Promise<APIResponse<ServiceImage[]>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.UPLOAD_IMAGES.replace(':id', id);
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });

      const response = await apiClient.upload<ServiceImage[]>(endpoint, files[0], {
        imageCount: files.length.toString(),
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to upload service images: ${error}`);
    }
  }

  /**
   * Delete service image
   */
  async deleteServiceImage(id: string, imageId: string): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.DELETE_IMAGE
        .replace(':id', id)
        .replace(':imageId', imageId);
      const response = await apiClient.delete<{ message: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete service image: ${error}`);
    }
  }

  /**
   * Set primary image
   */
  async setPrimaryImage(id: string, imageId: string): Promise<APIResponse<Service>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.SET_PRIMARY_IMAGE
        .replace(':id', id)
        .replace(':imageId', imageId);
      const response = await apiClient.put<Service>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to set primary image: ${error}`);
    }
  }

  // ========================
  // Reviews and Ratings
  // ========================

  /**
   * Get service reviews
   */
  async getServiceReviews(id: string, page?: number, limit?: number): Promise<APIResponse<{
    reviews: any[];
    total: number;
    average: number;
    page: number;
    limit: number;
  }>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.GET_REVIEWS.replace(':id', id);
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
      throw new Error(`Failed to fetch service reviews: ${error}`);
    }
  }

  /**
   * Add service review
   */
  async addServiceReview(id: string, review: { rating: number; comment: string; images?: string[] }): Promise<APIResponse<any>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.ADD_REVIEW.replace(':id', id);
      const response = await apiClient.post<any>(endpoint, review);
      return response;
    } catch (error) {
      throw new Error(`Failed to add service review: ${error}`);
    }
  }

  /**
   * Update service review
   */
  async updateServiceReview(id: string, reviewId: string, review: { rating?: number; comment?: string; images?: string[] }): Promise<APIResponse<any>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.UPDATE_REVIEW
        .replace(':id', id)
        .replace(':reviewId', reviewId);
      const response = await apiClient.put<any>(endpoint, review);
      return response;
    } catch (error) {
      throw new Error(`Failed to update service review: ${error}`);
    }
  }

  /**
   * Delete service review
   */
  async deleteServiceReview(id: string, reviewId: string): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.DELETE_REVIEW
        .replace(':id', id)
        .replace(':reviewId', reviewId);
      const response = await apiClient.delete<{ message: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete service review: ${error}`);
    }
  }

  // ========================
  // Statistics
  // ========================

  /**
   * Get service statistics
   */
  async getServiceStats(): Promise<APIResponse<{
    totalServices: number;
    activeServices: number;
    averageRating: number;
    totalBookings: number;
    popularCategories: { category: string; count: number }[];
    recentServices: Service[];
  }>> {
    try {
      const response = await apiClient.get<{
        totalServices: number;
        activeServices: number;
        averageRating: number;
        totalBookings: number;
        popularCategories: { category: string; count: number }[];
        recentServices: Service[];
      }>(API_ENDPOINTS.SERVICES.GET_STATS);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch service statistics: ${error}`);
    }
  }

  /**
   * Get popular services
   */
  async getPopularServices(limit?: number): Promise<APIResponse<Service[]>> {
    try {
      const params = limit ? { limit: limit.toString() } : undefined;
      const response = await apiClient.get<Service[]>(
        API_ENDPOINTS.SERVICES.GET_POPULAR,
        params
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch popular services: ${error}`);
    }
  }

  /**
   * Get featured services
   */
  async getFeaturedServices(limit?: number): Promise<APIResponse<Service[]>> {
    try {
      const params = limit ? { limit: limit.toString() } : undefined;
      const response = await apiClient.get<Service[]>(
        API_ENDPOINTS.SERVICES.GET_FEATURED,
        params
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch featured services: ${error}`);
    }
  }

  /**
   * Get provider statistics
   */
  async getProviderStats(providerId: string): Promise<APIResponse<{
    totalServices: number;
    activeServices: number;
    averageRating: number;
    totalBookings: number;
    revenue: number;
    performanceMetrics: {
      reliability: number;
      quality: number;
      communication: number;
    };
  }>> {
    try {
      const endpoint = API_ENDPOINTS.SERVICES.GET_PROVIDER_STATS.replace(':id', providerId);
      const response = await apiClient.get<{
        totalServices: number;
        activeServices: number;
        averageRating: number;
        totalBookings: number;
        revenue: number;
        performanceMetrics: {
          reliability: number;
          quality: number;
          communication: number;
        };
      }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch provider statistics: ${error}`);
    }
  }

  // ========================
  // Bulk Operations
  // ========================

  /**
   * Bulk update service status
   */
  async bulkUpdateStatus(serviceIds: string[], status: 'active' | 'inactive' | 'pending' | 'suspended'): Promise<APIResponse<{ updated: number }>> {
    try {
      const response = await apiClient.put<{ updated: number }>(
        API_ENDPOINTS.SERVICES.BULK_UPDATE_STATUS,
        { serviceIds, status }
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to bulk update service status: ${error}`);
    }
  }

  /**
   * Bulk update service pricing
   */
  async bulkUpdatePricing(data: BulkPricingUpdateRequest): Promise<APIResponse<{ updated: number }>> {
    try {
      const response = await apiClient.put<{ updated: number }>(
        API_ENDPOINTS.SERVICES.BULK_UPDATE_PRICING,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to bulk update service pricing: ${error}`);
    }
  }

  // ========================
  // Utility Methods
  // ========================

  /**
   * Build filter parameters for API requests
   */
  private buildFilterParams(filters: ServiceFilters): Record<string, string> {
    const params: Record<string, string> = {};

    if (filters.categories?.length) {
      params.categories = filters.categories.join(',');
    }
    if (filters.types?.length) {
      params.types = filters.types.join(',');
    }
    if (filters.providers?.length) {
      params.providers = filters.providers.join(',');
    }
    if (filters.locations?.length) {
      params.locations = filters.locations.join(',');
    }
    if (filters.priceRange) {
      params.priceMin = filters.priceRange[0].toString();
      params.priceMax = filters.priceRange[1].toString();
    }
    if (filters.rating) {
      params.rating = filters.rating.toString();
    }
    if (filters.featured !== undefined) {
      params.featured = filters.featured.toString();
    }
    if (filters.available !== undefined) {
      params.available = filters.available.toString();
    }

    return params;
  }

  /**
   * Generate service slug
   */
  generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  /**
   * Calculate service commission (utility method)
   */
  calculateCommission(service: Service, bookingAmount: number): number {
    const commissionRate = service.provider.contract.commissionRate || 0;
    return (bookingAmount * commissionRate) / 100;
  }

  /**
   * Get service type color (utility method for UI)
   */
  getServiceTypeColor(type: string): string {
    const colors: Record<string, string> = {
      accommodation: 'blue',
      transport: 'green',
      activity: 'orange',
      guide: 'purple',
      equipment: 'gray',
      insurance: 'red',
      visa: 'yellow'
    };
    return colors[type] || 'gray';
  }

  /**
   * Get service status color (utility method for UI)
   */
  getServiceStatusColor(status: string): string {
    const colors: Record<string, string> = {
      active: 'green',
      inactive: 'gray',
      pending: 'yellow',
      suspended: 'red'
    };
    return colors[status] || 'gray';
  }

  /**
   * Validate pricing model
   */
  validatePricingModel(model: string, price: number, capacity?: { min: number; max: number }): boolean {
    if (price <= 0) return false;

    switch (model) {
      case 'per-person':
        return true;
      case 'per-group':
        return capacity ? capacity.min > 0 && capacity.max > 0 : false;
      case 'per-day':
        return true;
      case 'flat-rate':
        return true;
      default:
        return false;
    }
  }
}

// Export singleton instance
export const servicesService = new ServicesService();