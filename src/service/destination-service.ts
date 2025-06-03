import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import {
  Destination,
  DestinationImage,
  DestinationStats,
  DestinationFilters,
  SeasonalTrend,
} from '@/types/destination';
import { APIResponse } from '@/types/APIResponse';

// Request types for destination service
export interface CreateDestinationRequest {
  name: string;
  slug: string;
  country: string;
  state?: string;
  region?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  timezone: string;
  description: string;
  shortDescription: string;
  highlights: string[];
  bestTimeToVisit: string[];
  climate: 'tropical' | 'temperate' | 'arid' | 'continental' | 'polar';
  language: string;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
  visaRequired: boolean;
  safetyLevel: 'very-safe' | 'safe' | 'moderate' | 'caution' | 'high-risk';
  featured?: boolean;
  popular?: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  status: 'active' | 'inactive' | 'coming-soon';
}

export interface UpdateDestinationRequest extends Partial<CreateDestinationRequest> {
  id: string;
}

export interface DestinationSearchRequest {
  query: string;
  filters?: DestinationFilters;
  sortBy?: 'name' | 'popularity' | 'tourCount' | 'created' | 'safety';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface UpdateSEORequest {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface UpdateContentRequest {
  description?: string;
  shortDescription?: string;
  highlights?: string[];
  bestTimeToVisit?: string[];
}

export interface NearbyDestinationsRequest {
  radius: number; // in kilometers
  limit?: number;
}

export interface CoordinatesSearchRequest {
  lat: number;
  lng: number;
  radius: number;
  limit?: number;
}

class DestinationService {
  // ========================
  // Basic CRUD Operations
  // ========================

  /**
   * Get all destinations with optional filters
   */
  async getAllDestinations(filters?: DestinationFilters): Promise<APIResponse<{
    destinations: Destination[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }>> {
    try {
      const params = filters ? this.buildFilterParams(filters) : undefined;
      const response = await apiClient.get<{
        destinations: Destination[];
        total: number;
        page: number;
        limit: number;
        pages: number;
      }>(API_ENDPOINTS.DESTINATIONS.GET_ALL, params);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch destinations: ${error}`);
    }
  }

  /**
   * Get destination by ID
   */
  async getDestinationById(id: string): Promise<APIResponse<Destination>> {
    try {
      const endpoint = API_ENDPOINTS.DESTINATIONS.GET_BY_ID.replace(':id', id);
      const response = await apiClient.get<Destination>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch destination: ${error}`);
    }
  }

  /**
   * Get destination by slug
   */
  async getDestinationBySlug(slug: string): Promise<APIResponse<Destination>> {
    try {
      const endpoint = API_ENDPOINTS.DESTINATIONS.GET_BY_SLUG.replace(':slug', slug);
      const response = await apiClient.get<Destination>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch destination by slug: ${error}`);
    }
  }

  /**
   * Create new destination
   */
  async createDestination(data: CreateDestinationRequest): Promise<APIResponse<Destination>> {
    try {
      const response = await apiClient.post<Destination>(
        API_ENDPOINTS.DESTINATIONS.CREATE,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to create destination: ${error}`);
    }
  }

  /**
   * Update destination
   */
  async updateDestination(data: UpdateDestinationRequest): Promise<APIResponse<Destination>> {
    try {
      const endpoint = API_ENDPOINTS.DESTINATIONS.UPDATE.replace(':id', data.id);
      const { id, ...updateData } = data;
      const response = await apiClient.put<Destination>(endpoint, updateData);
      return response;
    } catch (error) {
      throw new Error(`Failed to update destination: ${error}`);
    }
  }

  /**
   * Delete destination
   */
  async deleteDestination(id: string): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.DESTINATIONS.DELETE.replace(':id', id);
      const response = await apiClient.delete<{ message: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete destination: ${error}`);
    }
  }

  // ========================
  // Search and Filter
  // ========================

  /**
   * Search destinations
   */
  async searchDestinations(request: DestinationSearchRequest): Promise<APIResponse<{
    destinations: Destination[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }>> {
    try {
      const response = await apiClient.post<{
        destinations: Destination[];
        total: number;
        page: number;
        limit: number;
        pages: number;
      }>(API_ENDPOINTS.DESTINATIONS.SEARCH, request);
      return response;
    } catch (error) {
      throw new Error(`Failed to search destinations: ${error}`);
    }
  }

  /**
   * Filter destinations
   */
  async filterDestinations(filters: DestinationFilters): Promise<APIResponse<Destination[]>> {
    try {
      const response = await apiClient.post<Destination[]>(
        API_ENDPOINTS.DESTINATIONS.FILTER,
        filters
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to filter destinations: ${error}`);
    }
  }

  /**
   * Get destinations by country
   */
  async getDestinationsByCountry(country: string): Promise<APIResponse<Destination[]>> {
    try {
      const endpoint = API_ENDPOINTS.DESTINATIONS.BY_COUNTRY.replace(':country', country);
      const response = await apiClient.get<Destination[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch destinations by country: ${error}`);
    }
  }

  /**
   * Get destinations by region
   */
  async getDestinationsByRegion(region: string): Promise<APIResponse<Destination[]>> {
    try {
      const endpoint = API_ENDPOINTS.DESTINATIONS.BY_REGION.replace(':region', region);
      const response = await apiClient.get<Destination[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch destinations by region: ${error}`);
    }
  }

  /**
   * Get destinations by climate
   */
  async getDestinationsByClimate(climate: string): Promise<APIResponse<Destination[]>> {
    try {
      const endpoint = API_ENDPOINTS.DESTINATIONS.BY_CLIMATE.replace(':climate', climate);
      const response = await apiClient.get<Destination[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch destinations by climate: ${error}`);
    }
  }

  /**
   * Get destinations by safety level
   */
  async getDestinationsBySafetyLevel(level: string): Promise<APIResponse<Destination[]>> {
    try {
      const endpoint = API_ENDPOINTS.DESTINATIONS.BY_SAFETY_LEVEL.replace(':level', level);
      const response = await apiClient.get<Destination[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch destinations by safety level: ${error}`);
    }
  }

  // ========================
  // Media Management
  // ========================

  /**
   * Upload destination images
   */
  async uploadDestinationImages(id: string, files: File[]): Promise<APIResponse<DestinationImage[]>> {
    try {
      const endpoint = API_ENDPOINTS.DESTINATIONS.UPLOAD_IMAGES.replace(':id', id);
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });

      const response = await apiClient.upload<DestinationImage[]>(endpoint, files[0], {
        imageCount: files.length.toString(),
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to upload destination images: ${error}`);
    }
  }

  /**
   * Delete destination image
   */
  async deleteDestinationImage(id: string, imageId: string): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.DESTINATIONS.DELETE_IMAGE
        .replace(':id', id)
        .replace(':imageId', imageId);
      const response = await apiClient.delete<{ message: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete destination image: ${error}`);
    }
  }

  /**
   * Set cover image
   */
  async setCoverImage(id: string, imageId: string): Promise<APIResponse<Destination>> {
    try {
      const endpoint = API_ENDPOINTS.DESTINATIONS.SET_COVER_IMAGE.replace(':id', id);
      const response = await apiClient.put<Destination>(endpoint, { imageId });
      return response;
    } catch (error) {
      throw new Error(`Failed to set cover image: ${error}`);
    }
  }

  // ========================
  // Tours and Activities
  // ========================

  /**
   * Get destination tours
   */
  async getDestinationTours(id: string, page?: number, limit?: number): Promise<APIResponse<{
    tours: any[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }>> {
    try {
      const endpoint = API_ENDPOINTS.DESTINATIONS.GET_TOURS.replace(':id', id);
      const params: Record<string, string> = {};
      if (page) params.page = page.toString();
      if (limit) params.limit = limit.toString();

      const response = await apiClient.get<{
        tours: any[];
        total: number;
        page: number;
        limit: number;
        pages: number;
      }>(endpoint, Object.keys(params).length ? params : undefined);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch destination tours: ${error}`);
    }
  }

  /**
   * Get destination activities
   */
  async getDestinationActivities(id: string, page?: number, limit?: number): Promise<APIResponse<{
    activities: any[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }>> {
    try {
      const endpoint = API_ENDPOINTS.DESTINATIONS.GET_ACTIVITIES.replace(':id', id);
      const params: Record<string, string> = {};
      if (page) params.page = page.toString();
      if (limit) params.limit = limit.toString();

      const response = await apiClient.get<{
        activities: any[];
        total: number;
        page: number;
        limit: number;
        pages: number;
      }>(endpoint, Object.keys(params).length ? params : undefined);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch destination activities: ${error}`);
    }
  }

  // ========================
  // Statistics
  // ========================

  /**
   * Get destination statistics
   */
  async getDestinationStats(id: string): Promise<APIResponse<DestinationStats>> {
    try {
      const endpoint = API_ENDPOINTS.DESTINATIONS.GET_STATS.replace(':id', id);
      const response = await apiClient.get<DestinationStats>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch destination statistics: ${error}`);
    }
  }

  /**
   * Get seasonal trends
   */
  async getSeasonalTrends(id: string): Promise<APIResponse<SeasonalTrend[]>> {
    try {
      const endpoint = API_ENDPOINTS.DESTINATIONS.GET_SEASONAL_TRENDS.replace(':id', id);
      const response = await apiClient.get<SeasonalTrend[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch seasonal trends: ${error}`);
    }
  }

  /**
   * Get popular destinations
   */
  async getPopularDestinations(limit?: number): Promise<APIResponse<Destination[]>> {
    try {
      const params = limit ? { limit: limit.toString() } : undefined;
      const response = await apiClient.get<Destination[]>(
        API_ENDPOINTS.DESTINATIONS.GET_POPULAR_DESTINATIONS,
        params
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch popular destinations: ${error}`);
    }
  }

  /**
   * Get featured destinations
   */
  async getFeaturedDestinations(limit?: number): Promise<APIResponse<Destination[]>> {
    try {
      const params = limit ? { limit: limit.toString() } : undefined;
      const response = await apiClient.get<Destination[]>(
        API_ENDPOINTS.DESTINATIONS.GET_FEATURED_DESTINATIONS,
        params
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch featured destinations: ${error}`);
    }
  }

  // ========================
  // Content Management
  // ========================

  /**
   * Update destination SEO
   */
  async updateDestinationSEO(id: string, seoData: UpdateSEORequest): Promise<APIResponse<Destination>> {
    try {
      const endpoint = API_ENDPOINTS.DESTINATIONS.UPDATE_SEO.replace(':id', id);
      const response = await apiClient.put<Destination>(endpoint, seoData);
      return response;
    } catch (error) {
      throw new Error(`Failed to update destination SEO: ${error}`);
    }
  }

  /**
   * Update destination content
   */
  async updateDestinationContent(id: string, contentData: UpdateContentRequest): Promise<APIResponse<Destination>> {
    try {
      const endpoint = API_ENDPOINTS.DESTINATIONS.UPDATE_CONTENT.replace(':id', id);
      const response = await apiClient.put<Destination>(endpoint, contentData);
      return response;
    } catch (error) {
      throw new Error(`Failed to update destination content: ${error}`);
    }
  }

  // ========================
  // Geographic Features
  // ========================

  /**
   * Get nearby destinations
   */
  async getNearbyDestinations(id: string, request: NearbyDestinationsRequest): Promise<APIResponse<{
    destinations: Destination[];
    distances: { destinationId: string; distance: number }[];
  }>> {
    try {
      const endpoint = API_ENDPOINTS.DESTINATIONS.NEARBY_DESTINATIONS.replace(':id', id);
      const response = await apiClient.post<{
        destinations: Destination[];
        distances: { destinationId: string; distance: number }[];
      }>(endpoint, request);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch nearby destinations: ${error}`);
    }
  }

  /**
   * Search destinations by coordinates
   */
  async searchByCoordinates(request: CoordinatesSearchRequest): Promise<APIResponse<{
    destinations: Destination[];
    distances: { destinationId: string; distance: number }[];
  }>> {
    try {
      const response = await apiClient.post<{
        destinations: Destination[];
        distances: { destinationId: string; distance: number }[];
      }>(API_ENDPOINTS.DESTINATIONS.BY_COORDINATES, request);
      return response;
    } catch (error) {
      throw new Error(`Failed to search destinations by coordinates: ${error}`);
    }
  }

  // ========================
  // Bulk Operations
  // ========================

  /**
   * Bulk update destination status
   */
  async bulkUpdateStatus(destinationIds: string[], status: 'active' | 'inactive' | 'coming-soon'): Promise<APIResponse<{ updated: number }>> {
    try {
      const response = await apiClient.put<{ updated: number }>(
        API_ENDPOINTS.DESTINATIONS.BULK_UPDATE_STATUS,
        { destinationIds, status }
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to bulk update destination status: ${error}`);
    }
  }

  /**
   * Bulk update featured status
   */
  async bulkUpdateFeatured(destinationIds: string[], featured: boolean): Promise<APIResponse<{ updated: number }>> {
    try {
      const response = await apiClient.put<{ updated: number }>(
        API_ENDPOINTS.DESTINATIONS.BULK_UPDATE_FEATURED,
        { destinationIds, featured }
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to bulk update featured status: ${error}`);
    }
  }

  // ========================
  // Utility Methods
  // ========================

  /**
   * Build filter parameters for API requests
   */
  private buildFilterParams(filters: DestinationFilters): Record<string, string> {
    const params: Record<string, string> = {};

    if (filters.countries?.length) {
      params.countries = filters.countries.join(',');
    }
    if (filters.climates?.length) {
      params.climates = filters.climates.join(',');
    }
    if (filters.safetyLevels?.length) {
      params.safetyLevels = filters.safetyLevels.join(',');
    }
    if (filters.visaRequired !== undefined) {
      params.visaRequired = filters.visaRequired.toString();
    }
    if (filters.featured !== undefined) {
      params.featured = filters.featured.toString();
    }
    if (filters.hasActiveTours !== undefined) {
      params.hasActiveTours = filters.hasActiveTours.toString();
    }

    return params;
  }

  /**
   * Get all countries from destinations
   */
  async getAllCountries(): Promise<APIResponse<string[]>> {
    try {
      const response = await apiClient.get<string[]>('/destinations/countries');
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch countries: ${error}`);
    }
  }

  /**
   * Get all regions from destinations
   */
  async getAllRegions(): Promise<APIResponse<string[]>> {
    try {
      const response = await apiClient.get<string[]>('/destinations/regions');
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch regions: ${error}`);
    }
  }

  /**
   * Get all climates
   */
  async getAllClimates(): Promise<APIResponse<string[]>> {
    try {
      const response = await apiClient.get<string[]>('/destinations/climates');
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch climates: ${error}`);
    }
  }

  /**
   * Get all safety levels
   */
  async getAllSafetyLevels(): Promise<APIResponse<string[]>> {
    try {
      const response = await apiClient.get<string[]>('/destinations/safety-levels');
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch safety levels: ${error}`);
    }
  }

  /**
   * Validate destination coordinates
   */
  validateCoordinates(lat: number, lng: number): boolean {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  }

  /**
   * Calculate distance between two coordinates (utility method)
   */
  calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLng = this.toRadians(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Convert degrees to radians
   */
  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Get destination safety color (utility method for UI)
   */
  getSafetyLevelColor(safetyLevel: string): string {
    const colors: Record<string, string> = {
      'very-safe': 'green',
      'safe': 'light-green',
      'moderate': 'yellow',
      'caution': 'orange',
      'high-risk': 'red'
    };
    return colors[safetyLevel] || 'gray';
  }

  /**
   * Generate destination URL slug
   */
  generateSlug(name: string, country: string): string {
    const combinedName = `${name}-${country}`;
    return combinedName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}

// Export singleton instance
export const destinationService = new DestinationService();