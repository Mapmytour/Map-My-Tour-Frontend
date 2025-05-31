'use client';

import { useCallback, useEffect } from 'react';
import { useActivitiesStore } from '@/store/activities-store';
import { 
  activitiesService, 
  CreateActivityRequest, 
  UpdateActivityRequest,
  ActivityFilters,
  SearchActivitiesRequest,
  ActivityReviewRequest,
  UpdateAvailabilityRequest,
  CheckAvailabilityRequest
} from '@/service/activities-service';
import {
  Activity,
  ActivityImage,
  ActivityAvailability,
  TimeSlot,
} from '@/types/activities';
import { handleApiError } from '@/lib/api';
import { toast } from 'sonner';

export const useActivities = () => {
  const {
    // State
    activities,
    selectedActivity,
    filteredActivities,
    categories,
    types,
    difficulties,
    popularActivities,
    featuredActivities,
    
    // Loading States
    isLoading,
    activitiesLoading,
    searchLoading,
    availabilityLoading,
    reviewsLoading,
    
    // Error States
    error,
    activitiesError,
    searchError,
    availabilityError,
    reviewsError,
    
    // Search & Filter State
    searchQuery,
    selectedFilters,
    
    // Actions
    setActivities,
    addActivity,
    updateActivity,
    removeActivity,
    setSelectedActivity,
    setFilteredActivities,
    setCategories,
    setTypes,
    setDifficulties,
    setPopularActivities,
    setFeaturedActivities,
    setLoading,
    setActivitiesLoading,
    setSearchLoading,
    setAvailabilityLoading,
    setReviewsLoading,
    setError,
    setActivitiesError,
    setSearchError,
    setAvailabilityError,
    setReviewsError,
    setSearchQuery,
    setSelectedFilters,
    clearErrors,
    updateCacheTimestamp,
    isCacheValid,
  } = useActivitiesStore();

  // ========================
  // Basic CRUD Operations
  // ========================

  /**
   * Get all activities
   */
  const getAllActivities = useCallback(async (filters?: ActivityFilters, forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('activities') && activities.length > 0 && !filters) {
        return { success: true, data: activities };
      }

      setActivitiesLoading(true);
      setActivitiesError(null);

      const response = await activitiesService.getAllActivities(filters);
      
      if (response.success) {
        setActivities(response.data);
        updateCacheTimestamp('activities');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch activities';
        setActivitiesError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setActivitiesError(errorMessage);
      toast.error('Failed to fetch activities');
      return { success: false, error: errorMessage };
    } finally {
      setActivitiesLoading(false);
    }
  }, [activities, isCacheValid, setActivities, setActivitiesLoading, setActivitiesError, updateCacheTimestamp]);

  /**
   * Get activity by ID
   */
  const getActivityById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await activitiesService.getActivityById(id);
      
      if (response.success) {
        setSelectedActivity(response.data);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch activity';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to fetch activity');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setSelectedActivity]);

  /**
   * Create new activity
   */
  const createActivity = useCallback(async (data: CreateActivityRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await activitiesService.createActivity(data);
      
      if (response.success) {
        addActivity(response.data);
        toast.success('Activity created successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to create activity';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to create activity');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [addActivity, setLoading, setError]);

  /**
   * Update activity
   */
  const updateActivityItem = useCallback(async (data: UpdateActivityRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await activitiesService.updateActivity(data);
      
      if (response.success) {
        updateActivity(response.data);
        toast.success('Activity updated successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to update activity';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to update activity');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [updateActivity, setLoading, setError]);

  /**
   * Delete activity
   */
  const deleteActivity = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await activitiesService.deleteActivity(id);
      
      if (response.success) {
        removeActivity(id);
        toast.success('Activity deleted successfully');
        return { success: true, message: response.message };
      } else {
        const errorMessage = response.message || 'Failed to delete activity';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to delete activity');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [removeActivity, setLoading, setError]);

  // ========================
  // Search and Filter
  // ========================

  /**
   * Search activities
   */
  const searchActivities = useCallback(async (request: SearchActivitiesRequest) => {
    try {
      setSearchLoading(true);
      setSearchError(null);

      const response = await activitiesService.searchActivities(request);
      
      if (response.success) {
        setFilteredActivities(response.data.activities);
        setSearchQuery(request.query);
        setSelectedFilters(request.filters || {});
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to search activities';
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
  }, [setFilteredActivities, setSearchQuery, setSelectedFilters, setSearchLoading, setSearchError]);

  /**
   * Filter activities
   */
  const filterActivities = useCallback(async (filters: ActivityFilters) => {
    try {
      setSearchLoading(true);
      setSearchError(null);

      const response = await activitiesService.filterActivities(filters);
      
      if (response.success) {
        setFilteredActivities(response.data);
        setSelectedFilters(filters);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to filter activities';
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
  }, [setFilteredActivities, setSelectedFilters, setSearchLoading, setSearchError]);

  /**
   * Get activities by category
   */
  const getActivitiesByCategory = useCallback(async (category: string) => {
    try {
      setSearchLoading(true);
      setSearchError(null);

      const response = await activitiesService.getActivitiesByCategory(category);
      
      if (response.success) {
        setFilteredActivities(response.data);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch activities by category';
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
  }, [setFilteredActivities, setSearchLoading, setSearchError]);

  // ========================
  // Availability Management
  // ========================

  /**
   * Get activity availability
   */
  const getActivityAvailability = useCallback(async (id: string, date?: string) => {
    try {
      setAvailabilityLoading(true);
      setAvailabilityError(null);

      const response = await activitiesService.getActivityAvailability(id, date);
      
      if (response.success) {
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch availability';
        setAvailabilityError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setAvailabilityError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setAvailabilityLoading(false);
    }
  }, [setAvailabilityLoading, setAvailabilityError]);

  /**
   * Update activity availability
   */
  const updateActivityAvailability = useCallback(async (id: string, data: UpdateAvailabilityRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await activitiesService.updateActivityAvailability(id, data);
      
      if (response.success) {
        toast.success('Availability updated successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to update availability';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to update availability');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  /**
   * Check slot availability
   */
  const checkSlotAvailability = useCallback(async (id: string, request: CheckAvailabilityRequest) => {
    try {
      setAvailabilityLoading(true);
      setAvailabilityError(null);

      const response = await activitiesService.checkSlotAvailability(id, request);
      
      if (response.success) {
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to check availability';
        setAvailabilityError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setAvailabilityError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setAvailabilityLoading(false);
    }
  }, [setAvailabilityLoading, setAvailabilityError]);

  // ========================
  // Media Management
  // ========================

  /**
   * Upload activity images
   */
  const uploadActivityImages = useCallback(async (id: string, files: File[]) => {
    try {
      setLoading(true);
      setError(null);

      const response = await activitiesService.uploadActivityImages(id, files);
      
      if (response.success) {
        toast.success('Images uploaded successfully');
        // Refresh activity data to get updated images
        await getActivityById(id);
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
  }, [setLoading, setError, getActivityById]);

  /**
   * Delete activity image
   */
  const deleteActivityImage = useCallback(async (id: string, imageId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await activitiesService.deleteActivityImage(id, imageId);
      
      if (response.success) {
        toast.success('Image deleted successfully');
        // Refresh activity data to get updated images
        await getActivityById(id);
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
  }, [setLoading, setError, getActivityById]);

  /**
   * Set primary image
   */
  const setPrimaryImage = useCallback(async (id: string, imageId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await activitiesService.setPrimaryImage(id, imageId);
      
      if (response.success) {
        updateActivity(response.data);
        toast.success('Primary image updated successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to set primary image';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to set primary image');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [updateActivity, setLoading, setError]);

  // ========================
  // Reviews and Ratings
  // ========================

  /**
   * Get activity reviews
   */
  const getActivityReviews = useCallback(async (id: string, page?: number, limit?: number) => {
    try {
      setReviewsLoading(true);
      setReviewsError(null);

      const response = await activitiesService.getActivityReviews(id, page, limit);
      
      if (response.success) {
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch reviews';
        setReviewsError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setReviewsError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setReviewsLoading(false);
    }
  }, [setReviewsLoading, setReviewsError]);

  /**
   * Add activity review
   */
  const addActivityReview = useCallback(async (id: string, review: ActivityReviewRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await activitiesService.addActivityReview(id, review);
      
      if (response.success) {
        toast.success('Review added successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to add review';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to add review');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  // ========================
  // Categories and Metadata
  // ========================

  /**
   * Get activity categories
   */
  const getActivityCategories = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('categories') && categories.length > 0) {
        return { success: true, data: categories };
      }

      const response = await activitiesService.getActivityCategories();
      
      if (response.success) {
        setCategories(response.data);
        updateCacheTimestamp('categories');
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      return { success: false, error: errorMessage };
    }
  }, [categories, isCacheValid, setCategories, updateCacheTimestamp]);

  /**
   * Get activity types
   */
  const getActivityTypes = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('types') && types.length > 0) {
        return { success: true, data: types };
      }

      const response = await activitiesService.getActivityTypes();
      
      if (response.success) {
        setTypes(response.data);
        updateCacheTimestamp('types');
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      return { success: false, error: errorMessage };
    }
  }, [types, isCacheValid, setTypes, updateCacheTimestamp]);

  /**
   * Get activity difficulties
   */
  const getActivityDifficulties = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('difficulties') && difficulties.length > 0) {
        return { success: true, data: difficulties };
      }

      const response = await activitiesService.getActivityDifficulties();
      
      if (response.success) {
        setDifficulties(response.data);
        updateCacheTimestamp('difficulties');
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      return { success: false, error: errorMessage };
    }
  }, [difficulties, isCacheValid, setDifficulties, updateCacheTimestamp]);

  // ========================
  // Statistics and Popular Content
  // ========================

  /**
   * Get popular activities
   */
  const getPopularActivities = useCallback(async (limit?: number, forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('popular') && popularActivities.length > 0) {
        return { success: true, data: popularActivities };
      }

      const response = await activitiesService.getPopularActivities(limit);
      
      if (response.success) {
        setPopularActivities(response.data);
        updateCacheTimestamp('popular');
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      return { success: false, error: errorMessage };
    }
  }, [popularActivities, isCacheValid, setPopularActivities, updateCacheTimestamp]);

  /**
   * Get featured activities
   */
  const getFeaturedActivities = useCallback(async (limit?: number, forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('featured') && featuredActivities.length > 0) {
        return { success: true, data: featuredActivities };
      }

      const response = await activitiesService.getFeaturedActivities(limit);
      
      if (response.success) {
        setFeaturedActivities(response.data);
        updateCacheTimestamp('featured');
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      return { success: false, error: errorMessage };
    }
  }, [featuredActivities, isCacheValid, setFeaturedActivities, updateCacheTimestamp]);

  /**
   * Get activity statistics
   */
  const getActivityStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await activitiesService.getActivityStats();
      
      if (response.success) {
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch statistics';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  // ========================
  // Bulk Operations
  // ========================

  /**
   * Bulk update activity status
   */
  const bulkUpdateStatus = useCallback(async (activityIds: string[], status: 'active' | 'inactive' | 'seasonal') => {
    try {
      setLoading(true);
      setError(null);

      const response = await activitiesService.bulkUpdateStatus(activityIds, status);
      
      if (response.success) {
        toast.success(`${response.data.updated} activities updated successfully`);
        // Refresh activities list
        await getAllActivities(undefined, true);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to update activities';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to update activities');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, getAllActivities]);

  /**
   * Bulk delete activities
   */
  const bulkDeleteActivities = useCallback(async (activityIds: string[]) => {
    try {
      setLoading(true);
      setError(null);

      const response = await activitiesService.bulkDeleteActivities(activityIds);
      
      if (response.success) {
        toast.success(`${response.data.deleted} activities deleted successfully`);
        // Refresh activities list
        await getAllActivities(undefined, true);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to delete activities';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to delete activities');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, getAllActivities]);

  // ========================
  // Utility Functions
  // ========================

  /**
   * Initialize activities data
   */
  const initializeActivitiesData = useCallback(async () => {
    try {
      await Promise.all([
        getAllActivities(),
        getActivityCategories(),
        getActivityTypes(),
        getActivityDifficulties(),
        getPopularActivities(),
        getFeaturedActivities(),
      ]);
    } catch (error) {
      console.error('Failed to initialize activities data:', error);
    }
  }, [getAllActivities, getActivityCategories, getActivityTypes, getActivityDifficulties, getPopularActivities, getFeaturedActivities]);

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
    setFilteredActivities([]);
  }, [setSearchQuery, setSelectedFilters, setFilteredActivities]);

  // Auto-initialize on mount
  useEffect(() => {
    if (!activities.length && !categories.length) {
      initializeActivitiesData();
    }
  }, [activities.length, categories.length, initializeActivitiesData]);

  return {
    // State
    activities,
    selectedActivity,
    filteredActivities,
    categories,
    types,
    difficulties,
    popularActivities,
    featuredActivities,
    
    // Loading States
    isLoading,
    activitiesLoading,
    searchLoading,
    availabilityLoading,
    reviewsLoading,
    
    // Error States
    error,
    activitiesError,
    searchError,
    availabilityError,
    reviewsError,
    
    // Search & Filter State
    searchQuery,
    selectedFilters,
    
    // Basic CRUD Actions
    getAllActivities,
    getActivityById,
    createActivity,
    updateActivityItem,
    deleteActivity,
    setSelectedActivity,
    
    // Search and Filter Actions
    searchActivities,
    filterActivities,
    getActivitiesByCategory,
    clearSearch,
    
    // Availability Actions
    getActivityAvailability,
    updateActivityAvailability,
    checkSlotAvailability,
    
    // Media Actions
    uploadActivityImages,
    deleteActivityImage,
    setPrimaryImage,
    
    // Review Actions
    getActivityReviews,
    addActivityReview,
    
    // Metadata Actions
    getActivityCategories,
    getActivityTypes,
    getActivityDifficulties,
    
    // Statistics Actions
    getPopularActivities,
    getFeaturedActivities,
    getActivityStats,
    
    // Bulk Actions
    bulkUpdateStatus,
    bulkDeleteActivities,
    
    // Utility Actions
    initializeActivitiesData,
    clearAllErrors,
  };
};