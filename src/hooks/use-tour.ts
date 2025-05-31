'use client';

import { useCallback, useEffect } from 'react';
import { useTourStore } from '@/store/tour-store';
import { 
  tourService,
  CreateTourRequest,
  UpdateTourRequest,
  CreateTourAvailabilityRequest,
  UpdateTourAvailabilityRequest,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  CreateGuideRequest,
  UpdateGuideRequest,
  TourSearchRequest,
  UpdateItineraryRequest,
  AddItineraryDayRequest,
  UpdateItineraryDayRequest,
  CheckAvailabilityRequest,
  UpdatePricingRequest,
  CreateDiscountRequest,
  UpdateDiscountRequest,
  BulkAssignGuideRequest,
  TourReviewRequest,
  ImportTourRequest
} from '@/service/tour-service';
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
import { handleApiError } from '@/lib/api';
import { toast } from 'sonner';

export const useTour = () => {
  const {
    // State
    tours,
    selectedTour,
    filteredTours,
    categories,
    guides,
    destinations,
    popularTours,
    featuredTours,
    tourStats,
    
    // Loading States
    isLoading,
    toursLoading,
    searchLoading,
    availabilityLoading,
    itineraryLoading,
    bookingsLoading,
    reviewsLoading,
    categoriesLoading,
    guidesLoading,
    
    // Error States
    error,
    toursError,
    searchError,
    availabilityError,
    itineraryError,
    bookingsError,
    reviewsError,
    categoriesError,
    guidesError,
    
    // Search & Filter State
    searchQuery,
    selectedFilters,
    
    // Actions
    setTours,
    addTour,
    updateTour,
    removeTour,
    setSelectedTour,
    setFilteredTours,
    setCategories,
    addCategory,
    updateCategory,
    removeCategory,
    setGuides,
    addGuide,
    updateGuide,
    removeGuide,
    setDestinations,
    setPopularTours,
    setFeaturedTours,
    setTourStats,
    setLoading,
    setToursLoading,
    setSearchLoading,
    setAvailabilityLoading,
    setItineraryLoading,
    setBookingsLoading,
    setReviewsLoading,
    setCategoriesLoading,
    setGuidesLoading,
    setError,
    setToursError,
    setSearchError,
    setAvailabilityError,
    setItineraryError,
    setBookingsError,
    setReviewsError,
    setCategoriesError,
    setGuidesError,
    setSearchQuery,
    setSelectedFilters,
    clearErrors,
    updateCacheTimestamp,
    isCacheValid,
  } = useTourStore();

  // ========================
  // Basic CRUD Operations
  // ========================

  /**
   * Get all tours
   */
  const getAllTours = useCallback(async (filters?: TourFilters, forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('tours') && tours.length > 0 && !filters) {
        return { success: true, data: { tours, total: tours.length } };
      }

      setToursLoading(true);
      setToursError(null);

      const response = await tourService.getAllTours(filters);
      
      if (response.success) {
        setTours(response.data.tours);
        updateCacheTimestamp('tours');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch tours';
        setToursError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setToursError(errorMessage);
      toast.error('Failed to fetch tours');
      return { success: false, error: errorMessage };
    } finally {
      setToursLoading(false);
    }
  }, [tours, isCacheValid, setTours, setToursLoading, setToursError, updateCacheTimestamp]);

  /**
   * Get tour by ID
   */
  const getTourById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await tourService.getTourById(id);
      
      if (response.success) {
        setSelectedTour(response.data);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch tour';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to fetch tour');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setSelectedTour]);

  /**
   * Get tour by slug
   */
  const getTourBySlug = useCallback(async (slug: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await tourService.getTourBySlug(slug);
      
      if (response.success) {
        setSelectedTour(response.data);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch tour';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to fetch tour');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setSelectedTour]);

  /**
   * Create new tour
   */
  const createTour = useCallback(async (data: CreateTourRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await tourService.createTour(data);
      
      if (response.success) {
        addTour(response.data);
        toast.success('Tour created successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to create tour';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to create tour');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [addTour, setLoading, setError]);

  /**
   * Update tour
   */
  const updateTourItem = useCallback(async (data: UpdateTourRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await tourService.updateTour(data);
      
      if (response.success) {
        updateTour(response.data);
        toast.success('Tour updated successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to update tour';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to update tour');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [updateTour, setLoading, setError]);

  /**
   * Delete tour
   */
  const deleteTour = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await tourService.deleteTour(id);
      
      if (response.success) {
        removeTour(id);
        toast.success('Tour deleted successfully');
        return { success: true, message: response.message };
      } else {
        const errorMessage = response.message || 'Failed to delete tour';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to delete tour');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [removeTour, setLoading, setError]);

  /**
   * Duplicate tour
   */
  const duplicateTour = useCallback(async (id: string, newTitle?: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await tourService.duplicateTour(id, newTitle);
      
      if (response.success) {
        addTour(response.data);
        toast.success('Tour duplicated successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to duplicate tour';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to duplicate tour');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [addTour, setLoading, setError]);

  // ========================
  // Search and Filter
  // ========================

  /**
   * Search tours
   */
  const searchTours = useCallback(async (request: TourSearchRequest) => {
    try {
      setSearchLoading(true);
      setSearchError(null);

      const response = await tourService.searchTours(request);
      
      if (response.success) {
        setFilteredTours(response.data.tours);
        setSearchQuery(request.query);
        setSelectedFilters(request.filters || {});
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to search tours';
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
  }, [setFilteredTours, setSearchQuery, setSelectedFilters, setSearchLoading, setSearchError]);

  /**
   * Filter tours
   */
  const filterTours = useCallback(async (filters: TourFilters) => {
    try {
      setSearchLoading(true);
      setSearchError(null);

      const response = await tourService.filterTours(filters);
      
      if (response.success) {
        setFilteredTours(response.data);
        setSelectedFilters(filters);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to filter tours';
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
  }, [setFilteredTours, setSelectedFilters, setSearchLoading, setSearchError]);

  /**
   * Get tours by category
   */
  const getToursByCategory = useCallback(async (category: string) => {
    try {
      setSearchLoading(true);
      setSearchError(null);

      const response = await tourService.getToursByCategory(category);
      
      if (response.success) {
        setFilteredTours(response.data);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch tours by category';
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
  }, [setFilteredTours, setSearchLoading, setSearchError]);

  /**
   * Get tours by destination
   */
  const getToursByDestination = useCallback(async (destinationId: string) => {
    try {
      setSearchLoading(true);
      setSearchError(null);

      const response = await tourService.getToursByDestination(destinationId);
      
      if (response.success) {
        setFilteredTours(response.data);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch tours by destination';
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
  }, [setFilteredTours, setSearchLoading, setSearchError]);

  // ========================
  // Availability Management
  // ========================

  /**
   * Get tour availability
   */
  const getTourAvailability = useCallback(async (id: string, dateRange?: { from: string; to: string }) => {
    try {
      setAvailabilityLoading(true);
      setAvailabilityError(null);

      const response = await tourService.getTourAvailability(id, dateRange);
      
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
   * Create tour availability
   */
  const createTourAvailability = useCallback(async (tourId: string, data: CreateTourAvailabilityRequest) => {
    try {
      setAvailabilityLoading(true);
      setAvailabilityError(null);

      const response = await tourService.createTourAvailability(tourId, data);
      
      if (response.success) {
        toast.success('Availability created successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to create availability';
        setAvailabilityError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setAvailabilityError(errorMessage);
      toast.error('Failed to create availability');
      return { success: false, error: errorMessage };
    } finally {
      setAvailabilityLoading(false);
    }
  }, [setAvailabilityLoading, setAvailabilityError]);

  /**
   * Update tour availability
   */
  const updateTourAvailability = useCallback(async (tourId: string, data: UpdateTourAvailabilityRequest) => {
    try {
      setAvailabilityLoading(true);
      setAvailabilityError(null);

      const response = await tourService.updateTourAvailability(tourId, data);
      
      if (response.success) {
        toast.success('Availability updated successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to update availability';
        setAvailabilityError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setAvailabilityError(errorMessage);
      toast.error('Failed to update availability');
      return { success: false, error: errorMessage };
    } finally {
      setAvailabilityLoading(false);
    }
  }, [setAvailabilityLoading, setAvailabilityError]);

  /**
   * Check tour availability
   */
  const checkTourAvailability = useCallback(async (id: string, request: CheckAvailabilityRequest) => {
    try {
      setAvailabilityLoading(true);
      setAvailabilityError(null);

      const response = await tourService.checkTourAvailability(id, request);
      
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
  // Itinerary Management
  // ========================

  /**
   * Get tour itinerary
   */
  const getTourItinerary = useCallback(async (id: string) => {
    try {
      setItineraryLoading(true);
      setItineraryError(null);

      const response = await tourService.getTourItinerary(id);
      
      if (response.success) {
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch itinerary';
        setItineraryError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setItineraryError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setItineraryLoading(false);
    }
  }, [setItineraryLoading, setItineraryError]);

  /**
   * Update tour itinerary
   */
  const updateTourItinerary = useCallback(async (id: string, data: UpdateItineraryRequest) => {
    try {
      setItineraryLoading(true);
      setItineraryError(null);

      const response = await tourService.updateTourItinerary(id, data);
      
      if (response.success) {
        toast.success('Itinerary updated successfully');
        // Update the selected tour with new itinerary
        if (selectedTour && selectedTour.id === id) {
          updateTour({ ...selectedTour, itinerary: response.data });
        }
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to update itinerary';
        setItineraryError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setItineraryError(errorMessage);
      toast.error('Failed to update itinerary');
      return { success: false, error: errorMessage };
    } finally {
      setItineraryLoading(false);
    }
  }, [selectedTour, updateTour, setItineraryLoading, setItineraryError]);

  /**
   * Add itinerary day
   */
  const addItineraryDay = useCallback(async (tourId: string, data: AddItineraryDayRequest) => {
    try {
      setItineraryLoading(true);
      setItineraryError(null);

      const response = await tourService.addItineraryDay(tourId, data);
      
      if (response.success) {
        toast.success('Itinerary day added successfully');
        // Refresh tour itinerary
        await getTourItinerary(tourId);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to add itinerary day';
        setItineraryError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setItineraryError(errorMessage);
      toast.error('Failed to add itinerary day');
      return { success: false, error: errorMessage };
    } finally {
      setItineraryLoading(false);
    }
  }, [getTourItinerary, setItineraryLoading, setItineraryError]);

  /**
   * Update itinerary day
   */
  const updateItineraryDay = useCallback(async (tourId: string, data: UpdateItineraryDayRequest) => {
    try {
      setItineraryLoading(true);
      setItineraryError(null);

      const response = await tourService.updateItineraryDay(tourId, data);
      
      if (response.success) {
        toast.success('Itinerary day updated successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to update itinerary day';
        setItineraryError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setItineraryError(errorMessage);
      toast.error('Failed to update itinerary day');
      return { success: false, error: errorMessage };
    } finally {
      setItineraryLoading(false);
    }
  }, [setItineraryLoading, setItineraryError]);

  /**
   * Delete itinerary day
   */
  const deleteItineraryDay = useCallback(async (tourId: string, day: number) => {
    try {
      setItineraryLoading(true);
      setItineraryError(null);

      const response = await tourService.deleteItineraryDay(tourId, day);
      
      if (response.success) {
        toast.success('Itinerary day deleted successfully');
        // Refresh tour itinerary
        await getTourItinerary(tourId);
        return { success: true, message: response.message };
      } else {
        const errorMessage = response.message || 'Failed to delete itinerary day';
        setItineraryError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setItineraryError(errorMessage);
      toast.error('Failed to delete itinerary day');
      return { success: false, error: errorMessage };
    } finally {
      setItineraryLoading(false);
    }
  }, [getTourItinerary, setItineraryLoading, setItineraryError]);

  // ========================
  // Media Management
  // ========================

  /**
   * Upload tour images
   */
  const uploadTourImages = useCallback(async (id: string, files: File[]) => {
    try {
      setLoading(true);
      setError(null);

      const response = await tourService.uploadTourImages(id, files);
      
      if (response.success) {
        toast.success('Images uploaded successfully');
        // Refresh tour data to get updated images
        await getTourById(id);
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
  }, [setLoading, setError, getTourById]);

  /**
   * Delete tour image
   */
  const deleteTourImage = useCallback(async (id: string, imageId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await tourService.deleteTourImage(id, imageId);
      
      if (response.success) {
        toast.success('Image deleted successfully');
        // Refresh tour data to get updated images
        await getTourById(id);
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
  }, [setLoading, setError, getTourById]);

  /**
   * Set primary image
   */
  const setPrimaryImage = useCallback(async (id: string, imageId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await tourService.setPrimaryImage(id, imageId);
      
      if (response.success) {
        updateTour(response.data);
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
  }, [updateTour, setLoading, setError]);

  // ========================
  // Reviews
  // ========================

  /**
   * Get tour reviews
   */
  const getTourReviews = useCallback(async (id: string, page?: number, limit?: number) => {
    try {
      setReviewsLoading(true);
      setReviewsError(null);

      const response = await tourService.getTourReviews(id, page, limit);
      
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
   * Add tour review
   */
  const addTourReview = useCallback(async (id: string, review: TourReviewRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await tourService.addTourReview(id, review);
      
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
  // Categories Management
  // ========================

  /**
   * Get tour categories
   */
  const getTourCategories = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('categories') && categories.length > 0) {
        return { success: true, data: categories };
      }

      setCategoriesLoading(true);
      setCategoriesError(null);

      const response = await tourService.getTourCategories();
      
      if (response.success) {
        setCategories(response.data);
        updateCacheTimestamp('categories');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch categories';
        setCategoriesError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setCategoriesError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setCategoriesLoading(false);
    }
  }, [categories, isCacheValid, setCategories, setCategoriesLoading, setCategoriesError, updateCacheTimestamp]);

  /**
   * Create tour category
   */
  const createTourCategory = useCallback(async (data: CreateCategoryRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await tourService.createTourCategory(data);
      
      if (response.success) {
        addCategory(response.data);
        toast.success('Category created successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to create category';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to create category');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [addCategory, setLoading, setError]);

  // ========================
  // Guides Management
  // ========================

  /**
   * Get guides
   */
  const getGuides = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('guides') && guides.length > 0) {
        return { success: true, data: guides };
      }

      setGuidesLoading(true);
      setGuidesError(null);

      const response = await tourService.getGuides();
      
      if (response.success) {
        setGuides(response.data);
        updateCacheTimestamp('guides');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch guides';
        setGuidesError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setGuidesError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setGuidesLoading(false);
    }
  }, [guides, isCacheValid, setGuides, setGuidesLoading, setGuidesError, updateCacheTimestamp]);

  /**
   * Create guide
   */
  const createGuide = useCallback(async (data: CreateGuideRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await tourService.createGuide(data);
      
      if (response.success) {
        addGuide(response.data);
        toast.success('Guide created successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to create guide';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to create guide');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [addGuide, setLoading, setError]);

  // ========================
  // Pricing Management
  // ========================

  /**
   * Update tour pricing
   */
  const updateTourPricing = useCallback(async (id: string, data: UpdatePricingRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await tourService.updateTourPricing(id, data);
      
      if (response.success) {
        updateTour(response.data);
        toast.success('Pricing updated successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to update pricing';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to update pricing');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [updateTour, setLoading, setError]);

  // ========================
  // Statistics
  // ========================

  /**
   * Get tour statistics
   */
  const getTourStats = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('stats') && tourStats) {
        return { success: true, data: tourStats };
      }

      setLoading(true);
      setError(null);

      const response = await tourService.getTourStats();
      
      if (response.success) {
        setTourStats(response.data);
        updateCacheTimestamp('stats');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch tour statistics';
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
  }, [tourStats, isCacheValid, setTourStats, setLoading, setError, updateCacheTimestamp]);

  /**
   * Get popular tours
   */
  const getPopularTours = useCallback(async (limit?: number, forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('popular') && popularTours.length > 0) {
        return { success: true, data: popularTours };
      }

      const response = await tourService.getPopularTours(limit);
      
      if (response.success) {
        setPopularTours(response.data);
        updateCacheTimestamp('popular');
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      return { success: false, error: errorMessage };
    }
  }, [popularTours, isCacheValid, setPopularTours, updateCacheTimestamp]);

  /**
   * Get featured tours
   */
  const getFeaturedTours = useCallback(async (limit?: number, forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('featured') && featuredTours.length > 0) {
        return { success: true, data: featuredTours };
      }

      const response = await tourService.getFeaturedTours(limit);
      
      if (response.success) {
        setFeaturedTours(response.data);
        updateCacheTimestamp('featured');
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      return { success: false, error: errorMessage };
    }
  }, [featuredTours, isCacheValid, setFeaturedTours, updateCacheTimestamp]);

  // ========================
  // Bulk Operations
  // ========================

  /**
   * Bulk update tour status
   */
  const bulkUpdateStatus = useCallback(async (tourIds: string[], status: 'active' | 'inactive' | 'draft') => {
    try {
      setLoading(true);
      setError(null);

      const response = await tourService.bulkUpdateStatus(tourIds, status);
      
      if (response.success) {
        toast.success(`${response.data.updated} tours updated successfully`);
        // Refresh tours list
        await getAllTours(undefined, true);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to update tours';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to update tours');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, getAllTours]);

  /**
   * Bulk assign guide
   */
  const bulkAssignGuide = useCallback(async (data: BulkAssignGuideRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await tourService.bulkAssignGuide(data);
      
      if (response.success) {
        toast.success(`${response.data.updated} tours updated with new guide successfully`);
        // Refresh tours list
        await getAllTours(undefined, true);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to assign guide to tours';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to assign guide to tours');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, getAllTours]);

  // ========================
  // Import/Export
  // ========================

  /**
   * Export tours
   */
  const exportTours = useCallback(async (filters?: TourFilters, format: 'csv' | 'excel' | 'pdf' = 'csv') => {
    try {
      setLoading(true);
      setError(null);

      const response = await tourService.exportTours(filters, format);
      
      if (response.success) {
        toast.success('Tours exported successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to export tours';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to export tours');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  /**
   * Import tours
   */
  const importTours = useCallback(async (data: ImportTourRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await tourService.importTours(data);
      
      if (response.success) {
        toast.success(`${response.data.imported} tours imported successfully`);
        if (response.data.errors.length > 0) {
          toast.warning(`${response.data.errors.length} errors occurred during import`);
        }
        // Refresh tours list
        await getAllTours(undefined, true);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to import tours';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to import tours');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, getAllTours]);

  // ========================
  // Utility Functions
  // ========================

  /**
   * Initialize tour data
   */
  const initializeTourData = useCallback(async () => {
    try {
      await Promise.all([
        getAllTours(),
        getTourCategories(),
        getGuides(),
        getPopularTours(),
        getFeaturedTours(),
        getTourStats(),
      ]);
    } catch (error) {
      console.error('Failed to initialize tour data:', error);
    }
  }, [getAllTours, getTourCategories, getGuides, getPopularTours, getFeaturedTours, getTourStats]);

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
    setFilteredTours([]);
  }, [setSearchQuery, setSelectedFilters, setFilteredTours]);

  // Auto-initialize on mount
  useEffect(() => {
    if (!tours.length && !categories.length) {
      initializeTourData();
    }
  }, [tours.length, categories.length, initializeTourData]);

  return {
    // State
    tours,
    selectedTour,
    filteredTours,
    categories,
    guides,
    destinations,
    popularTours,
    featuredTours,
    tourStats,
    
    // Loading States
    isLoading,
    toursLoading,
    searchLoading,
    availabilityLoading,
    itineraryLoading,
    bookingsLoading,
    reviewsLoading,
    categoriesLoading,
    guidesLoading,
    
    // Error States
    error,
    toursError,
    searchError,
    availabilityError,
    itineraryError,
    bookingsError,
    reviewsError,
    categoriesError,
    guidesError,
    
    // Search & Filter State
    searchQuery,
    selectedFilters,
    
    // Basic CRUD Actions
    getAllTours,
    getTourById,
    getTourBySlug,
    createTour,
    updateTourItem,
    deleteTour,
    duplicateTour,
    setSelectedTour,
    
    // Search and Filter Actions
    searchTours,
    filterTours,
    getToursByCategory,
    getToursByDestination,
    clearSearch,
    
    // Availability Actions
    getTourAvailability,
    createTourAvailability,
    updateTourAvailability,
    checkTourAvailability,
    
    // Itinerary Actions
    getTourItinerary,
    updateTourItinerary,
    addItineraryDay,
    updateItineraryDay,
    deleteItineraryDay,
    
    // Media Actions
    uploadTourImages,
    deleteTourImage,
    setPrimaryImage,
    
    // Review Actions
    getTourReviews,
    addTourReview,
    
    // Category Actions
    getTourCategories,
    createTourCategory,
    
    // Guide Actions
    getGuides,
    createGuide,
    
    // Pricing Actions
    updateTourPricing,
    
    // Statistics Actions
    getTourStats,
    getPopularTours,
    getFeaturedTours,
    
    // Bulk Actions
    bulkUpdateStatus,
    bulkAssignGuide,
    
    // Import/Export Actions
    exportTours,
    importTours,
    
    // Utility Actions
    initializeTourData,
    clearAllErrors,
  };
};