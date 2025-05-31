'use client';

import { useCallback, useEffect } from 'react';
import { useDestinationStore } from '@/store/destination-store';
import { 
  destinationService,
  CreateDestinationRequest,
  UpdateDestinationRequest,
  DestinationSearchRequest,
  UpdateSEORequest,
  UpdateContentRequest,
  NearbyDestinationsRequest,
  CoordinatesSearchRequest
} from '@/service/destination-service';
import {
  Destination,
  DestinationImage,
  DestinationStats,
  DestinationFilters,
  SeasonalTrend,
} from '@/types/destination';
import { handleApiError } from '@/lib/api';
import { toast } from 'sonner';

export const useDestination = () => {
  const {
    // State
    destinations,
    selectedDestination,
    filteredDestinations,
    popularDestinations,
    featuredDestinations,
    countries,
    regions,
    climates,
    safetyLevels,
    destinationStats,
    
    // Loading States
    isLoading,
    destinationsLoading,
    searchLoading,
    toursLoading,
    activitiesLoading,
    statsLoading,
    
    // Error States
    error,
    destinationsError,
    searchError,
    toursError,
    activitiesError,
    statsError,
    
    // Search & Filter State
    searchQuery,
    selectedFilters,
    
    // Actions
    setDestinations,
    addDestination,
    updateDestination,
    removeDestination,
    setSelectedDestination,
    setFilteredDestinations,
    setPopularDestinations,
    setFeaturedDestinations,
    setCountries,
    setRegions,
    setClimates,
    setSafetyLevels,
    setDestinationStats,
    setLoading,
    setDestinationsLoading,
    setSearchLoading,
    setToursLoading,
    setActivitiesLoading,
    setStatsLoading,
    setError,
    setDestinationsError,
    setSearchError,
    setToursError,
    setActivitiesError,
    setStatsError,
    setSearchQuery,
    setSelectedFilters,
    clearErrors,
    updateCacheTimestamp,
    isCacheValid,
  } = useDestinationStore();

  // ========================
  // Basic CRUD Operations
  // ========================

  /**
   * Get all destinations
   */
  const getAllDestinations = useCallback(async (filters?: DestinationFilters, forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('destinations') && destinations.length > 0 && !filters) {
        return { success: true, data: { destinations, total: destinations.length } };
      }

      setDestinationsLoading(true);
      setDestinationsError(null);

      const response = await destinationService.getAllDestinations(filters);
      
      if (response.success) {
        setDestinations(response.data.destinations);
        updateCacheTimestamp('destinations');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch destinations';
        setDestinationsError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setDestinationsError(errorMessage);
      toast.error('Failed to fetch destinations');
      return { success: false, error: errorMessage };
    } finally {
      setDestinationsLoading(false);
    }
  }, [destinations, isCacheValid, setDestinations, setDestinationsLoading, setDestinationsError, updateCacheTimestamp]);

  /**
   * Get destination by ID
   */
  const getDestinationById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await destinationService.getDestinationById(id);
      
      if (response.success) {
        setSelectedDestination(response.data);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch destination';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to fetch destination');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setSelectedDestination]);

  /**
   * Get destination by slug
   */
  const getDestinationBySlug = useCallback(async (slug: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await destinationService.getDestinationBySlug(slug);
      
      if (response.success) {
        setSelectedDestination(response.data);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch destination';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to fetch destination');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setSelectedDestination]);

  /**
   * Create new destination
   */
  const createDestination = useCallback(async (data: CreateDestinationRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await destinationService.createDestination(data);
      
      if (response.success) {
        addDestination(response.data);
        toast.success('Destination created successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to create destination';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to create destination');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [addDestination, setLoading, setError]);

  /**
   * Update destination
   */
  const updateDestinationItem = useCallback(async (data: UpdateDestinationRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await destinationService.updateDestination(data);
      
      if (response.success) {
        updateDestination(response.data);
        toast.success('Destination updated successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to update destination';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to update destination');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [updateDestination, setLoading, setError]);

  /**
   * Delete destination
   */
  const deleteDestination = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await destinationService.deleteDestination(id);
      
      if (response.success) {
        removeDestination(id);
        toast.success('Destination deleted successfully');
        return { success: true, message: response.message };
      } else {
        const errorMessage = response.message || 'Failed to delete destination';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to delete destination');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [removeDestination, setLoading, setError]);

  // ========================
  // Search and Filter
  // ========================

  /**
   * Search destinations
   */
  const searchDestinations = useCallback(async (request: DestinationSearchRequest) => {
    try {
      setSearchLoading(true);
      setSearchError(null);

      const response = await destinationService.searchDestinations(request);
      
      if (response.success) {
        setFilteredDestinations(response.data.destinations);
        setSearchQuery(request.query);
        setSelectedFilters(request.filters || {});
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to search destinations';
        setSearchError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setSearchError(errorMessage);
      toast.error('Search failed');
      return { success: false, error: errorMessage };
    } finally {
      setSearchLoading(false);
    }
  }, [setFilteredDestinations, setSearchQuery, setSelectedFilters, setSearchLoading, setSearchError]);

  /**
   * Filter destinations
   */
  const filterDestinations = useCallback(async (filters: DestinationFilters) => {
    try {
      setSearchLoading(true);
      setSearchError(null);

      const response = await destinationService.filterDestinations(filters);
      
      if (response.success) {
        setFilteredDestinations(response.data);
        setSelectedFilters(filters);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to filter destinations';
        setSearchError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setSearchError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setSearchLoading(false);
    }
  }, [setFilteredDestinations, setSelectedFilters, setSearchLoading, setSearchError]);

  /**
   * Get destinations by country
   */
  const getDestinationsByCountry = useCallback(async (country: string) => {
    try {
      setSearchLoading(true);
      setSearchError(null);

      const response = await destinationService.getDestinationsByCountry(country);
      
      if (response.success) {
        setFilteredDestinations(response.data);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch destinations by country';
        setSearchError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setSearchError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setSearchLoading(false);
    }
  }, [setFilteredDestinations, setSearchLoading, setSearchError]);

  // ========================
  // Media Management
  // ========================

  /**
   * Upload destination images
   */
  const uploadDestinationImages = useCallback(async (id: string, files: File[]) => {
    try {
      setLoading(true);
      setError(null);

      const response = await destinationService.uploadDestinationImages(id, files);
      
      if (response.success) {
        toast.success('Images uploaded successfully');
        // Refresh destination data to get updated images
        await getDestinationById(id);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to upload images';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to upload images');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, getDestinationById]);

  /**
   * Delete destination image
   */
  const deleteDestinationImage = useCallback(async (id: string, imageId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await destinationService.deleteDestinationImage(id, imageId);
      
      if (response.success) {
        toast.success('Image deleted successfully');
        // Refresh destination data to get updated images
        await getDestinationById(id);
        return { success: true, message: response.message };
      } else {
        const errorMessage = response.message || 'Failed to delete image';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to delete image');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, getDestinationById]);

  /**
   * Set cover image
   */
  const setCoverImage = useCallback(async (id: string, imageId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await destinationService.setCoverImage(id, imageId);
      
      if (response.success) {
        updateDestination(response.data);
        toast.success('Cover image updated successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to set cover image';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to set cover image');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [updateDestination, setLoading, setError]);

  // ========================
  // Tours and Activities
  // ========================

  /**
   * Get destination tours
   */
  const getDestinationTours = useCallback(async (id: string, page?: number, limit?: number) => {
    try {
      setToursLoading(true);
      setToursError(null);

      const response = await destinationService.getDestinationTours(id, page, limit);
      
      if (response.success) {
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch destination tours';
        setToursError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setToursError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setToursLoading(false);
    }
  }, [setToursLoading, setToursError]);

  /**
   * Get destination activities
   */
  const getDestinationActivities = useCallback(async (id: string, page?: number, limit?: number) => {
    try {
      setActivitiesLoading(true);
      setActivitiesError(null);

      const response = await destinationService.getDestinationActivities(id, page, limit);
      
      if (response.success) {
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch destination activities';
        setActivitiesError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setActivitiesError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setActivitiesLoading(false);
    }
  }, [setActivitiesLoading, setActivitiesError]);

  // ========================
  // Statistics
  // ========================

  /**
   * Get destination statistics
   */
  const getDestinationStats = useCallback(async (id: string) => {
    try {
      setStatsLoading(true);
      setStatsError(null);

      const response = await destinationService.getDestinationStats(id);
      
      if (response.success) {
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch destination statistics';
        setStatsError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setStatsError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setStatsLoading(false);
    }
  }, [setStatsLoading, setStatsError]);

  /**
   * Get seasonal trends
   */
  const getSeasonalTrends = useCallback(async (id: string) => {
    try {
      setStatsLoading(true);
      setStatsError(null);

      const response = await destinationService.getSeasonalTrends(id);
      
      if (response.success) {
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch seasonal trends';
        setStatsError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setStatsError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setStatsLoading(false);
    }
  }, [setStatsLoading, setStatsError]);

  /**
   * Get popular destinations
   */
  const getPopularDestinations = useCallback(async (limit?: number, forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('popular') && popularDestinations.length > 0) {
        return { success: true, data: popularDestinations };
      }

      const response = await destinationService.getPopularDestinations(limit);
      
      if (response.success) {
        setPopularDestinations(response.data);
        updateCacheTimestamp('popular');
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      return { success: false, error: errorMessage };
    }
  }, [popularDestinations, isCacheValid, setPopularDestinations, updateCacheTimestamp]);

  /**
   * Get featured destinations
   */
  const getFeaturedDestinations = useCallback(async (limit?: number, forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('featured') && featuredDestinations.length > 0) {
        return { success: true, data: featuredDestinations };
      }

      const response = await destinationService.getFeaturedDestinations(limit);
      
      if (response.success) {
        setFeaturedDestinations(response.data);
        updateCacheTimestamp('featured');
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      return { success: false, error: errorMessage };
    }
  }, [featuredDestinations, isCacheValid, setFeaturedDestinations, updateCacheTimestamp]);

  // ========================
  // Content Management
  // ========================

  /**
   * Update destination SEO
   */
  const updateDestinationSEO = useCallback(async (id: string, seoData: UpdateSEORequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await destinationService.updateDestinationSEO(id, seoData);
      
      if (response.success) {
        updateDestination(response.data);
        toast.success('SEO information updated successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to update SEO information';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to update SEO information');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [updateDestination, setLoading, setError]);

  /**
   * Update destination content
   */
  const updateDestinationContent = useCallback(async (id: string, contentData: UpdateContentRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await destinationService.updateDestinationContent(id, contentData);
      
      if (response.success) {
        updateDestination(response.data);
        toast.success('Content updated successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to update content';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to update content');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [updateDestination, setLoading, setError]);

  // ========================
  // Geographic Features
  // ========================

  /**
   * Get nearby destinations
   */
  const getNearbyDestinations = useCallback(async (id: string, request: NearbyDestinationsRequest) => {
    try {
      setSearchLoading(true);
      setSearchError(null);

      const response = await destinationService.getNearbyDestinations(id, request);
      
      if (response.success) {
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch nearby destinations';
        setSearchError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setSearchError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setSearchLoading(false);
    }
  }, [setSearchLoading, setSearchError]);

  /**
   * Search destinations by coordinates
   */
  const searchByCoordinates = useCallback(async (request: CoordinatesSearchRequest) => {
    try {
      setSearchLoading(true);
      setSearchError(null);

      const response = await destinationService.searchByCoordinates(request);
      
      if (response.success) {
        setFilteredDestinations(response.data.destinations);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to search destinations by coordinates';
        setSearchError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setSearchError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setSearchLoading(false);
    }
  }, [setFilteredDestinations, setSearchLoading, setSearchError]);

  // ========================
  // Metadata and Options
  // ========================

  /**
   * Get all countries
   */
  const getAllCountries = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('countries') && countries.length > 0) {
        return { success: true, data: countries };
      }

      const response = await destinationService.getAllCountries();
      
      if (response.success) {
        setCountries(response.data);
        updateCacheTimestamp('countries');
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      return { success: false, error: errorMessage };
    }
  }, [countries, isCacheValid, setCountries, updateCacheTimestamp]);

  /**
   * Get all regions
   */
  const getAllRegions = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('regions') && regions.length > 0) {
        return { success: true, data: regions };
      }

      const response = await destinationService.getAllRegions();
      
      if (response.success) {
        setRegions(response.data);
        updateCacheTimestamp('regions');
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      return { success: false, error: errorMessage };
    }
  }, [regions, isCacheValid, setRegions, updateCacheTimestamp]);

  /**
   * Get all climates
   */
  const getAllClimates = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('climates') && climates.length > 0) {
        return { success: true, data: climates };
      }

      const response = await destinationService.getAllClimates();
      
      if (response.success) {
        setClimates(response.data);
        updateCacheTimestamp('climates');
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      return { success: false, error: errorMessage };
    }
  }, [climates, isCacheValid, setClimates, updateCacheTimestamp]);

  /**
   * Get all safety levels
   */
  const getAllSafetyLevels = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('safetyLevels') && safetyLevels.length > 0) {
        return { success: true, data: safetyLevels };
      }

      const response = await destinationService.getAllSafetyLevels();
      
      if (response.success) {
        setSafetyLevels(response.data);
        updateCacheTimestamp('safetyLevels');
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      return { success: false, error: errorMessage };
    }
  }, [safetyLevels, isCacheValid, setSafetyLevels, updateCacheTimestamp]);

  // ========================
  // Bulk Operations
  // ========================

  /**
   * Bulk update destination status
   */
  const bulkUpdateStatus = useCallback(async (destinationIds: string[], status: 'active' | 'inactive' | 'coming-soon') => {
    try {
      setLoading(true);
      setError(null);

      const response = await destinationService.bulkUpdateStatus(destinationIds, status);
      
      if (response.success) {
        toast.success(`${response.data.updated} destinations updated successfully`);
        // Refresh destinations list
        await getAllDestinations(undefined, true);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to update destinations';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to update destinations');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, getAllDestinations]);

  /**
   * Bulk update featured status
   */
  const bulkUpdateFeatured = useCallback(async (destinationIds: string[], featured: boolean) => {
    try {
      setLoading(true);
      setError(null);

      const response = await destinationService.bulkUpdateFeatured(destinationIds, featured);
      
      if (response.success) {
        toast.success(`${response.data.updated} destinations updated successfully`);
        // Refresh destinations list
        await getAllDestinations(undefined, true);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to update featured status';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to update featured status');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, getAllDestinations]);

  // ========================
  // Utility Functions
  // ========================

  /**
   * Initialize destination data
   */
  const initializeDestinationData = useCallback(async () => {
    try {
      await Promise.all([
        getAllDestinations(),
        getPopularDestinations(),
        getFeaturedDestinations(),
        getAllCountries(),
        getAllRegions(),
        getAllClimates(),
        getAllSafetyLevels(),
      ]);
    } catch (error) {
      console.error('Failed to initialize destination data:', error);
    }
  }, [
    getAllDestinations,
    getPopularDestinations,
    getFeaturedDestinations,
    getAllCountries,
    getAllRegions,
    getAllClimates,
    getAllSafetyLevels
  ]);

  /**
   * Clear all errors
   */
  const clearAllErrors = useCallback(() => {
    clearErrors();
  }, [clearErrors]);

  /**
   * Clear search and filters
   */
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSelectedFilters({});
    setFilteredDestinations([]);
  }, [setSearchQuery, setSelectedFilters, setFilteredDestinations]);

  // Auto-initialize on mount
  useEffect(() => {
    if (!destinations.length && !countries.length) {
      initializeDestinationData();
    }
  }, [destinations.length, countries.length, initializeDestinationData]);

  return {
    // State
    destinations,
    selectedDestination,
    filteredDestinations,
    popularDestinations,
    featuredDestinations,
    countries,
    regions,
    climates,
    safetyLevels,
    destinationStats,
    
    // Loading States
    isLoading,
    destinationsLoading,
    searchLoading,
    toursLoading,
    activitiesLoading,
    statsLoading,
    
    // Error States
    error,
    destinationsError,
    searchError,
    toursError,
    activitiesError,
    statsError,
    
    // Search & Filter State
    searchQuery,
    selectedFilters,
    
    // Basic CRUD Actions
    getAllDestinations,
    getDestinationById,
    getDestinationBySlug,
    createDestination,
    updateDestinationItem,
    deleteDestination,
    setSelectedDestination,
    
    // Search and Filter Actions
    searchDestinations,
    filterDestinations,
    getDestinationsByCountry,
    clearSearch,
    
    // Media Actions
    uploadDestinationImages,
    deleteDestinationImage,
    setCoverImage,
    
    // Content Actions
    updateDestinationSEO,
    updateDestinationContent,
    
    // Related Content Actions
    getDestinationTours,
    getDestinationActivities,
    
    // Statistics Actions
    getDestinationStats,
    getSeasonalTrends,
    getPopularDestinations,
    getFeaturedDestinations,
    
    // Geographic Actions
    getNearbyDestinations,
    searchByCoordinates,
    
    // Metadata Actions
    getAllCountries,
    getAllRegions,
    getAllClimates,
    getAllSafetyLevels,
    
    // Bulk Actions
    bulkUpdateStatus,
    bulkUpdateFeatured,
    
    // Utility Actions
    initializeDestinationData,
    clearAllErrors,
  };
};