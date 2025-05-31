'use client';

import { useCallback, useEffect } from 'react';
import { useServicesStore } from '@/store/services-store';
import { 
  servicesService,
  CreateServiceRequest,
  UpdateServiceRequest,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  CreateProviderRequest,
  UpdateProviderRequest,
  ServiceSearchRequest,
  CreateServiceBookingRequest,
  UpdateServiceBookingRequest,
  UpdateAvailabilityRequest,
  CheckAvailabilityRequest,
  BulkPricingUpdateRequest
} from '@/service/services-service';
import {
  Service,
  ServiceCategory,
  ServiceImage,
  ServiceProvider,
  ServiceBooking,
  ServiceAvailability,
  ServiceFilters,
} from '@/types/service';
import { handleApiError } from '@/lib/api';
import { toast } from 'sonner';

export const useServices = () => {
  const {
    // State
    services,
    selectedService,
    filteredServices,
    categories,
    providers,
    popularServices,
    featuredServices,
    serviceStats,
    
    // Loading States
    isLoading,
    servicesLoading,
    searchLoading,
    categoriesLoading,
    providersLoading,
    availabilityLoading,
    bookingsLoading,
    reviewsLoading,
    
    // Error States
    error,
    servicesError,
    searchError,
    categoriesError,
    providersError,
    availabilityError,
    bookingsError,
    reviewsError,
    
    // Search & Filter State
    searchQuery,
    selectedFilters,
    
    // Actions
    setServices,
    addService,
    updateService,
    removeService,
    setSelectedService,
    setFilteredServices,
    setCategories,
    addCategory,
    updateCategory,
    removeCategory,
    setProviders,
    addProvider,
    updateProvider,
    removeProvider,
    setPopularServices,
    setFeaturedServices,
    setServiceStats,
    setLoading,
    setServicesLoading,
    setSearchLoading,
    setCategoriesLoading,
    setProvidersLoading,
    setAvailabilityLoading,
    setBookingsLoading,
    setReviewsLoading,
    setError,
    setServicesError,
    setSearchError,
    setCategoriesError,
    setProvidersError,
    setAvailabilityError,
    setBookingsError,
    setReviewsError,
    setSearchQuery,
    setSelectedFilters,
    clearErrors,
    updateCacheTimestamp,
    isCacheValid,
  } = useServicesStore();

  // ========================
  // Basic CRUD Operations
  // ========================

  /**
   * Get all services
   */
  const getAllServices = useCallback(async (filters?: ServiceFilters, forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('services') && services.length > 0 && !filters) {
        return { success: true, data: { services, total: services.length } };
      }

      setServicesLoading(true);
      setServicesError(null);

      const response = await servicesService.getAllServices(filters);
      
      if (response.success) {
        setServices(response.data.services);
        updateCacheTimestamp('services');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch services';
        setServicesError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setServicesError(errorMessage);
      toast.error('Failed to fetch services');
      return { success: false, error: errorMessage };
    } finally {
      setServicesLoading(false);
    }
  }, [services, isCacheValid, setServices, setServicesLoading, setServicesError, updateCacheTimestamp]);

  /**
   * Get service by ID
   */
  const getServiceById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await servicesService.getServiceById(id);
      
      if (response.success) {
        setSelectedService(response.data);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch service';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to fetch service');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setSelectedService]);

  /**
   * Get service by slug
   */
  const getServiceBySlug = useCallback(async (slug: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await servicesService.getServiceBySlug(slug);
      
      if (response.success) {
        setSelectedService(response.data);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch service';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to fetch service');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setSelectedService]);

  /**
   * Create new service
   */
  const createService = useCallback(async (data: CreateServiceRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await servicesService.createService(data);
      
      if (response.success) {
        addService(response.data);
        toast.success('Service created successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to create service';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to create service');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [addService, setLoading, setError]);

  /**
   * Update service
   */
  const updateServiceItem = useCallback(async (data: UpdateServiceRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await servicesService.updateService(data);
      
      if (response.success) {
        updateService(response.data);
        toast.success('Service updated successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to update service';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to update service');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [updateService, setLoading, setError]);

  /**
   * Delete service
   */
  const deleteService = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await servicesService.deleteService(id);
      
      if (response.success) {
        removeService(id);
        toast.success('Service deleted successfully');
        return { success: true, message: response.message };
      } else {
        const errorMessage = response.message || 'Failed to delete service';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to delete service');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [removeService, setLoading, setError]);

  // ========================
  // Search and Filter
  // ========================

  /**
   * Search services
   */
  const searchServices = useCallback(async (request: ServiceSearchRequest) => {
    try {
      setSearchLoading(true);
      setSearchError(null);

      const response = await servicesService.searchServices(request);
      
      if (response.success) {
        setFilteredServices(response.data.services);
        setSearchQuery(request.query);
        setSelectedFilters(request.filters || {});
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to search services';
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
  }, [setFilteredServices, setSearchQuery, setSelectedFilters, setSearchLoading, setSearchError]);

  /**
   * Filter services
   */
  const filterServices = useCallback(async (filters: ServiceFilters) => {
    try {
      setSearchLoading(true);
      setSearchError(null);

      const response = await servicesService.filterServices(filters);
      
      if (response.success) {
        setFilteredServices(response.data);
        setSelectedFilters(filters);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to filter services';
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
  }, [setFilteredServices, setSelectedFilters, setSearchLoading, setSearchError]);

  /**
   * Get services by category
   */
  const getServicesByCategory = useCallback(async (category: string) => {
    try {
      setSearchLoading(true);
      setSearchError(null);

      const response = await servicesService.getServicesByCategory(category);
      
      if (response.success) {
        setFilteredServices(response.data);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch services by category';
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
  }, [setFilteredServices, setSearchLoading, setSearchError]);

  /**
   * Get services by provider
   */
  const getServicesByProvider = useCallback(async (providerId: string) => {
    try {
      setSearchLoading(true);
      setSearchError(null);

      const response = await servicesService.getServicesByProvider(providerId);
      
      if (response.success) {
        setFilteredServices(response.data);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch services by provider';
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
  }, [setFilteredServices, setSearchLoading, setSearchError]);

  // ========================
  // Categories Management
  // ========================

  /**
   * Get service categories
   */
  const getServiceCategories = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('categories') && categories.length > 0) {
        return { success: true, data: categories };
      }

      setCategoriesLoading(true);
      setCategoriesError(null);

      const response = await servicesService.getServiceCategories();
      
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
   * Create service category
   */
  const createServiceCategory = useCallback(async (data: CreateCategoryRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await servicesService.createServiceCategory(data);
      
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

  /**
   * Update service category
   */
  const updateServiceCategory = useCallback(async (data: UpdateCategoryRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await servicesService.updateServiceCategory(data);
      
      if (response.success) {
        updateCategory(response.data);
        toast.success('Category updated successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to update category';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to update category');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [updateCategory, setLoading, setError]);

  /**
   * Delete service category
   */
  const deleteServiceCategory = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await servicesService.deleteServiceCategory(id);
      
      if (response.success) {
        removeCategory(id);
        toast.success('Category deleted successfully');
        return { success: true, message: response.message };
      } else {
        const errorMessage = response.message || 'Failed to delete category';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to delete category');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [removeCategory, setLoading, setError]);

  // ========================
  // Providers Management
  // ========================

  /**
   * Get service providers
   */
  const getServiceProviders = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('providers') && providers.length > 0) {
        return { success: true, data: providers };
      }

      setProvidersLoading(true);
      setProvidersError(null);

      const response = await servicesService.getServiceProviders();
      
      if (response.success) {
        setProviders(response.data);
        updateCacheTimestamp('providers');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch providers';
        setProvidersError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setProvidersError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setProvidersLoading(false);
    }
  }, [providers, isCacheValid, setProviders, setProvidersLoading, setProvidersError, updateCacheTimestamp]);

  /**
   * Create service provider
   */
  const createServiceProvider = useCallback(async (data: CreateProviderRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await servicesService.createServiceProvider(data);
      
      if (response.success) {
        addProvider(response.data);
        toast.success('Provider created successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to create provider';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to create provider');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [addProvider, setLoading, setError]);

  /**
   * Update service provider
   */
  const updateServiceProvider = useCallback(async (data: UpdateProviderRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await servicesService.updateServiceProvider(data);
      
      if (response.success) {
        updateProvider(response.data);
        toast.success('Provider updated successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to update provider';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to update provider');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [updateProvider, setLoading, setError]);

  /**
   * Delete service provider
   */
  const deleteServiceProvider = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await servicesService.deleteServiceProvider(id);
      
      if (response.success) {
        removeProvider(id);
        toast.success('Provider deleted successfully');
        return { success: true, message: response.message };
      } else {
        const errorMessage = response.message || 'Failed to delete provider';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to delete provider');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [removeProvider, setLoading, setError]);

  /**
   * Get provider services
   */
  const getProviderServices = useCallback(async (providerId: string) => {
    try {
      setSearchLoading(true);
      setSearchError(null);

      const response = await servicesService.getProviderServices(providerId);
      
      if (response.success) {
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch provider services';
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

  // ========================
  // Availability Management
  // ========================

  /**
   * Get service availability
   */
  const getServiceAvailability = useCallback(async (id: string, dateRange?: { from: string; to: string }) => {
    try {
      setAvailabilityLoading(true);
      setAvailabilityError(null);

      const response = await servicesService.getServiceAvailability(id, dateRange);
      
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
   * Update service availability
   */
  const updateServiceAvailability = useCallback(async (id: string, data: UpdateAvailabilityRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await servicesService.updateServiceAvailability(id, data);
      
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
   * Check service availability
   */
  const checkServiceAvailability = useCallback(async (id: string, request: CheckAvailabilityRequest) => {
    try {
      setAvailabilityLoading(true);
      setAvailabilityError(null);

      const response = await servicesService.checkServiceAvailability(id, request);
      
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
  // Service Bookings
  // ========================

  /**
   * Create service booking
   */
  const createServiceBooking = useCallback(async (serviceId: string, data: CreateServiceBookingRequest) => {
    try {
      setBookingsLoading(true);
      setBookingsError(null);

      const response = await servicesService.createServiceBooking(serviceId, data);
      
      if (response.success) {
        toast.success('Service booking created successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to create service booking';
        setBookingsError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setBookingsError(errorMessage);
      toast.error('Failed to create service booking');
      return { success: false, error: errorMessage };
    } finally {
      setBookingsLoading(false);
    }
  }, [setBookingsLoading, setBookingsError]);

  /**
   * Get service bookings
   */
  const getServiceBookings = useCallback(async (serviceId: string, page?: number, limit?: number) => {
    try {
      setBookingsLoading(true);
      setBookingsError(null);

      const response = await servicesService.getServiceBookings(serviceId, page, limit);
      
      if (response.success) {
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch service bookings';
        setBookingsError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setBookingsError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setBookingsLoading(false);
    }
  }, [setBookingsLoading, setBookingsError]);

  /**
   * Cancel service booking
   */
  const cancelServiceBooking = useCallback(async (serviceId: string, bookingId: string, reason?: string) => {
    try {
      setBookingsLoading(true);
      setBookingsError(null);

      const response = await servicesService.cancelServiceBooking(serviceId, bookingId, reason);
      
      if (response.success) {
        toast.success('Service booking cancelled successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to cancel service booking';
        setBookingsError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setBookingsError(errorMessage);
      toast.error('Failed to cancel service booking');
      return { success: false, error: errorMessage };
    } finally {
      setBookingsLoading(false);
    }
  }, [setBookingsLoading, setBookingsError]);

  // ========================
  // Media Management
  // ========================

  /**
   * Upload service images
   */
  const uploadServiceImages = useCallback(async (id: string, files: File[]) => {
    try {
      setLoading(true);
      setError(null);

      const response = await servicesService.uploadServiceImages(id, files);
      
      if (response.success) {
        toast.success('Images uploaded successfully');
        // Refresh service data to get updated images
        await getServiceById(id);
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
  }, [setLoading, setError, getServiceById]);

  /**
   * Delete service image
   */
  const deleteServiceImage = useCallback(async (id: string, imageId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await servicesService.deleteServiceImage(id, imageId);
      
      if (response.success) {
        toast.success('Image deleted successfully');
        // Refresh service data to get updated images
        await getServiceById(id);
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
  }, [setLoading, setError, getServiceById]);

  // ========================
  // Reviews
  // ========================

  /**
   * Get service reviews
   */
  const getServiceReviews = useCallback(async (id: string, page?: number, limit?: number) => {
    try {
      setReviewsLoading(true);
      setReviewsError(null);

      const response = await servicesService.getServiceReviews(id, page, limit);
      
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
   * Add service review
   */
  const addServiceReview = useCallback(async (id: string, review: { rating: number; comment: string; images?: string[] }) => {
    try {
      setLoading(true);
      setError(null);

      const response = await servicesService.addServiceReview(id, review);
      
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
  // Statistics
  // ========================

  /**
   * Get service statistics
   */
  const getServiceStats = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('stats') && serviceStats) {
        return { success: true, data: serviceStats };
      }

      setLoading(true);
      setError(null);

      const response = await servicesService.getServiceStats();
      
      if (response.success) {
        setServiceStats(response.data);
        updateCacheTimestamp('stats');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch service statistics';
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
  }, [serviceStats, isCacheValid, setServiceStats, setLoading, setError, updateCacheTimestamp]);

  /**
   * Get popular services
   */
  const getPopularServices = useCallback(async (limit?: number, forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('popular') && popularServices.length > 0) {
        return { success: true, data: popularServices };
      }

      const response = await servicesService.getPopularServices(limit);
      
      if (response.success) {
        setPopularServices(response.data);
        updateCacheTimestamp('popular');
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      return { success: false, error: errorMessage };
    }
  }, [popularServices, isCacheValid, setPopularServices, updateCacheTimestamp]);

  /**
   * Get featured services
   */
  const getFeaturedServices = useCallback(async (limit?: number, forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('featured') && featuredServices.length > 0) {
        return { success: true, data: featuredServices };
      }

      const response = await servicesService.getFeaturedServices(limit);
      
      if (response.success) {
        setFeaturedServices(response.data);
        updateCacheTimestamp('featured');
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      return { success: false, error: errorMessage };
    }
  }, [featuredServices, isCacheValid, setFeaturedServices, updateCacheTimestamp]);

  // ========================
  // Bulk Operations
  // ========================

  /**
   * Bulk update service status
   */
  const bulkUpdateStatus = useCallback(async (serviceIds: string[], status: 'active' | 'inactive' | 'pending' | 'suspended') => {
    try {
      setLoading(true);
      setError(null);

      const response = await servicesService.bulkUpdateStatus(serviceIds, status);
      
      if (response.success) {
        toast.success(`${response.data.updated} services updated successfully`);
        // Refresh services list
        await getAllServices(undefined, true);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to update services';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to update services');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, getAllServices]);

  /**
   * Bulk update service pricing
   */
  const bulkUpdatePricing = useCallback(async (data: BulkPricingUpdateRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await servicesService.bulkUpdatePricing(data);
      
      if (response.success) {
        toast.success(`${response.data.updated} services pricing updated successfully`);
        // Refresh services list
        await getAllServices(undefined, true);
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
  }, [setLoading, setError, getAllServices]);

  // ========================
  // Utility Functions
  // ========================

  /**
   * Initialize services data
   */
  const initializeServicesData = useCallback(async () => {
    try {
      await Promise.all([
        getAllServices(),
        getServiceCategories(),
        getServiceProviders(),
        getPopularServices(),
        getFeaturedServices(),
        getServiceStats(),
      ]);
    } catch (error) {
      console.error('Failed to initialize services data:', error);
    }
  }, [getAllServices, getServiceCategories, getServiceProviders, getPopularServices, getFeaturedServices, getServiceStats]);

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
    setFilteredServices([]);
  }, [setSearchQuery, setSelectedFilters, setFilteredServices]);

  // Auto-initialize on mount
  useEffect(() => {
    if (!services.length && !categories.length) {
      initializeServicesData();
    }
  }, [services.length, categories.length, initializeServicesData]);

  return {
    // State
    services,
    selectedService,
    filteredServices,
    categories,
    providers,
    popularServices,
    featuredServices,
    serviceStats,
    
    // Loading States
    isLoading,
    servicesLoading,
    searchLoading,
    categoriesLoading,
    providersLoading,
    availabilityLoading,
    bookingsLoading,
    reviewsLoading,
    
    // Error States
    error,
    servicesError,
    searchError,
    categoriesError,
    providersError,
    availabilityError,
    bookingsError,
    reviewsError,
    
    // Search & Filter State
    searchQuery,
    selectedFilters,
    
    // Basic CRUD Actions
    getAllServices,
    getServiceById,
    getServiceBySlug,
    createService,
    updateServiceItem,
    deleteService,
    setSelectedService,
    
    // Search and Filter Actions
    searchServices,
    filterServices,
    getServicesByCategory,
    getServicesByProvider,
    clearSearch,
    
    // Category Actions
    getServiceCategories,
    createServiceCategory,
    updateServiceCategory,
    deleteServiceCategory,
    
    // Provider Actions
    getServiceProviders,
    createServiceProvider,
    updateServiceProvider,
    deleteServiceProvider,
    getProviderServices,
    
    // Availability Actions
    getServiceAvailability,
    updateServiceAvailability,
    checkServiceAvailability,
    
    // Booking Actions
    createServiceBooking,
    getServiceBookings,
    cancelServiceBooking,
    
    // Media Actions
    uploadServiceImages,
    deleteServiceImage,
    
    // Review Actions
    getServiceReviews,
    addServiceReview,
    
    // Statistics Actions
    getServiceStats,
    getPopularServices,
    getFeaturedServices,
    
    // Bulk Actions
    bulkUpdateStatus,
    bulkUpdatePricing,
    
    // Utility Actions
    initializeServicesData,
    clearAllErrors,
  };
};