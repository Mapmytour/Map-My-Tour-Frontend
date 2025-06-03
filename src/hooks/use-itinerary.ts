'use client';

import { useCallback, useEffect } from 'react';
import { useItineraryStore } from '@/store/itinerary-store';
import {
    itineraryService,
    CreateItineraryRequest,
    UpdateItineraryRequest,
    CreateParticipantRequest,
    UpdateParticipantRequest,
    CreateItineraryDayRequest,
    UpdateItineraryDayRequest,
    CreateActivityRequest,
    UpdateActivityRequest,
    CreateMealRequest,
    UpdateMealRequest,
    CreateAccommodationRequest,
    UpdateAccommodationRequest,
    CreateNearbyPlaceRequest,
    UpdateNearbyPlaceRequest,
    SearchItinerariesRequest,
    DuplicateItineraryRequest,
    ShareItineraryRequest,
    ExportItineraryRequest,
    ImportItineraryRequest,
    CostBreakdownRequest,
    ScheduleOptimizationRequest,
    BulkOperationRequest,
    WeatherUpdateRequest,
    AIRequest
} from '@/service/itinerary-service';
import {
    Itinerary,
    ItineraryDay,
    ItineraryActivity,
    ItineraryMeal,
    ItineraryAccommodation,
    NearbyPlace,
    Participant,
    ItineraryFilters,
    ItineraryStatus
} from '@/types/itinerary';
import { handleApiError } from '@/lib/api';
import { toast } from 'sonner';

export const useItinerary = () => {
    const {
        // State
        itineraries,
        selectedItinerary,
        filteredItineraries,
        itineraryDays,
        participants,
        popularDestinations,
        popularActivities,
        itineraryStats,

        // Loading States
        isLoading,
        itinerariesLoading,
        searchLoading,
        daysLoading,
        activitiesLoading,
        participantsLoading,
        exportLoading,
        optimizationLoading,
        aiLoading,

        // Error States
        error,
        itinerariesError,
        searchError,
        daysError,
        activitiesError,
        participantsError,
        exportError,
        optimizationError,
        aiError,

        // Search & Filter State
        searchQuery,
        selectedFilters,

        // Actions
        setItineraries,
        addItinerary,
        updateItinerary,
        removeItinerary,
        setSelectedItinerary,
        setFilteredItineraries,
        setItineraryDays,
        setParticipants,
        setPopularDestinations,
        setPopularActivities,
        setItineraryStats,
        setLoading,
        setItinerariesLoading,
        setSearchLoading,
        setDaysLoading,
        setActivitiesLoading,
        setParticipantsLoading,
        setExportLoading,
        setOptimizationLoading,
        setAiLoading,
        setError,
        setItinerariesError,
        setSearchError,
        setDaysError,
        setActivitiesError,
        setParticipantsError,
        setExportError,
        setOptimizationError,
        setAiError,
        setSearchQuery,
        setSelectedFilters,
        clearErrors,
        updateCacheTimestamp,
        isCacheValid,
    } = useItineraryStore();

    // ========================
    // Basic CRUD Operations
    // ========================

    /**
     * Get all itineraries
     */
    const getAllItineraries = useCallback(async (filters?: ItineraryFilters, forceRefresh?: boolean) => {
        try {
            if (!forceRefresh && isCacheValid('itineraries') && itineraries.length > 0 && !filters) {
                return { success: true, data: { itineraries, total: itineraries.length } };
            }

            setItinerariesLoading(true);
            setItinerariesError(null);

            const response = await itineraryService.getAllItineraries(filters);

            if (response.success) {
                setItineraries(response.data.itineraries);
                updateCacheTimestamp('itineraries');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to fetch itineraries';
                setItinerariesError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setItinerariesError(errorMessage);
            toast.error('Failed to fetch itineraries');
            return { success: false, error: errorMessage };
        } finally {
            setItinerariesLoading(false);
        }
    }, [itineraries, isCacheValid, setItineraries, setItinerariesLoading, setItinerariesError, updateCacheTimestamp]);

    /**
     * Get itinerary by ID
     */
    const getItineraryById = useCallback(async (id: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.getItineraryById(id);

            if (response.success) {
                setSelectedItinerary(response.data);
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to fetch itinerary';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to fetch itinerary');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError, setSelectedItinerary]);

    /**
     * Create new itinerary
     */
    const createItinerary = useCallback(async (data: CreateItineraryRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.createItinerary(data);

            if (response.success) {
                addItinerary(response.data);
                toast.success('Itinerary created successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to create itinerary';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to create itinerary');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [addItinerary, setLoading, setError]);

    /**
     * Update itinerary
     */
    const updateItineraryItem = useCallback(async (data: UpdateItineraryRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.updateItinerary(data);

            if (response.success) {
                updateItinerary(response.data);
                toast.success('Itinerary updated successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to update itinerary';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to update itinerary');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [updateItinerary, setLoading, setError]);

    /**
     * Delete itinerary
     */
    const deleteItinerary = useCallback(async (id: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.deleteItinerary(id);

            if (response.success) {
                removeItinerary(id);
                toast.success('Itinerary deleted successfully');
                return { success: true, message: response.message };
            } else {
                const errorMessage = response.message || 'Failed to delete itinerary';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to delete itinerary');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [removeItinerary, setLoading, setError]);

    /**
     * Duplicate itinerary
     */
    const duplicateItinerary = useCallback(async (id: string, options?: DuplicateItineraryRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.duplicateItinerary(id, options);

            if (response.success) {
                addItinerary(response.data);
                toast.success('Itinerary duplicated successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to duplicate itinerary';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to duplicate itinerary');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [addItinerary, setLoading, setError]);

    // ========================
    // Search and Filter
    // ========================

    /**
     * Search itineraries
     */
    const searchItineraries = useCallback(async (request: SearchItinerariesRequest) => {
        try {
            setSearchLoading(true);
            setSearchError(null);

            const response = await itineraryService.searchItineraries(request);

            if (response.success) {
                setFilteredItineraries(response.data.itineraries);
                setSearchQuery(request.query);
                setSelectedFilters(request.filters || {});
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to search itineraries';
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
    }, [setFilteredItineraries, setSearchQuery, setSelectedFilters, setSearchLoading, setSearchError]);

    /**
     * Filter itineraries
     */
    const filterItineraries = useCallback(async (filters: ItineraryFilters) => {
        try {
            setSearchLoading(true);
            setSearchError(null);

            const response = await itineraryService.filterItineraries(filters);

            if (response.success) {
                setFilteredItineraries(response.data);
                setSelectedFilters(filters);
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to filter itineraries';
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
    }, [setFilteredItineraries, setSelectedFilters, setSearchLoading, setSearchError]);

    /**
     * Get itineraries by status
     */
    const getItinerariesByStatus = useCallback(async (status: ItineraryStatus) => {
        try {
            setSearchLoading(true);
            setSearchError(null);

            const response = await itineraryService.getItinerariesByStatus(status);

            if (response.success) {
                setFilteredItineraries(response.data);
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to fetch itineraries by status';
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
    }, [setFilteredItineraries, setSearchLoading, setSearchError]);

    // ========================
    // Day Management
    // ========================

    /**
     * Get itinerary days
     */
    const getItineraryDays = useCallback(async (id: string) => {
        try {
            setDaysLoading(true);
            setDaysError(null);

            const response = await itineraryService.getItineraryDays(id);

            if (response.success) {
                setItineraryDays(response.data);
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to fetch itinerary days';
                setDaysError(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setDaysError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setDaysLoading(false);
        }
    }, [setItineraryDays, setDaysLoading, setDaysError]);

    /**
     * Add day to itinerary
     */
    const addDay = useCallback(async (id: string, data: CreateItineraryDayRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.addDay(id, data);

            if (response.success) {
                // Refresh itinerary days
                await getItineraryDays(id);
                toast.success('Day added successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to add day';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to add day');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError, getItineraryDays]);

    /**
     * Update itinerary day
     */
    const updateDay = useCallback(async (id: string, data: UpdateItineraryDayRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.updateDay(id, data);

            if (response.success) {
                // Refresh itinerary days
                await getItineraryDays(id);
                toast.success('Day updated successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to update day';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to update day');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError, getItineraryDays]);

    /**
     * Delete itinerary day
     */
    const deleteDay = useCallback(async (id: string, dayNumber: number) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.deleteDay(id, dayNumber);

            if (response.success) {
                // Refresh itinerary days
                await getItineraryDays(id);
                toast.success('Day deleted successfully');
                return { success: true, message: response.message };
            } else {
                const errorMessage = response.message || 'Failed to delete day';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to delete day');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError, getItineraryDays]);

    /**
     * Reorder itinerary days
     */
    const reorderDays = useCallback(async (id: string, dayOrder: number[]) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.reorderDays(id, dayOrder);

            if (response.success) {
                setItineraryDays(response.data);
                toast.success('Days reordered successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to reorder days';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to reorder days');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [setItineraryDays, setLoading, setError]);

    // ========================
    // Activity Management
    // ========================

    /**
     * Get day activities
     */
    const getDayActivities = useCallback(async (id: string, dayNumber: number) => {
        try {
            setActivitiesLoading(true);
            setActivitiesError(null);

            const response = await itineraryService.getDayActivities(id, dayNumber);

            if (response.success) {
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to fetch day activities';
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

    /**
     * Add activity to day
     */
    const addActivity = useCallback(async (id: string, dayNumber: number, data: CreateActivityRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.addActivity(id, dayNumber, data);

            if (response.success) {
                // Refresh itinerary days to get updated activities
                await getItineraryDays(id);
                toast.success('Activity added successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to add activity';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to add activity');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError, getItineraryDays]);

    /**
     * Update activity
     */
    const updateActivity = useCallback(async (id: string, dayNumber: number, data: UpdateActivityRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.updateActivity(id, dayNumber, data);

            if (response.success) {
                // Refresh itinerary days to get updated activities
                await getItineraryDays(id);
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
    }, [setLoading, setError, getItineraryDays]);

    /**
     * Delete activity
     */
    const deleteActivity = useCallback(async (id: string, dayNumber: number, activityId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.deleteActivity(id, dayNumber, activityId);

            if (response.success) {
                // Refresh itinerary days to get updated activities
                await getItineraryDays(id);
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
    }, [setLoading, setError, getItineraryDays]);

    /**
     * Reorder activities in a day
     */
    const reorderActivities = useCallback(async (id: string, dayNumber: number, activityOrder: string[]) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.reorderActivities(id, dayNumber, activityOrder);

            if (response.success) {
                // Refresh itinerary days to get updated activities
                await getItineraryDays(id);
                toast.success('Activities reordered successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to reorder activities';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to reorder activities');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError, getItineraryDays]);

    // ========================
    // Meal Management
    // ========================

    /**
     * Add meal to day
     */
    const addMeal = useCallback(async (id: string, dayNumber: number, data: CreateMealRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.addMeal(id, dayNumber, data);

            if (response.success) {
                // Refresh itinerary days to get updated meals
                await getItineraryDays(id);
                toast.success('Meal added successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to add meal';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to add meal');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError, getItineraryDays]);

    /**
     * Update meal
     */
    const updateMeal = useCallback(async (id: string, dayNumber: number, data: UpdateMealRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.updateMeal(id, dayNumber, data);

            if (response.success) {
                // Refresh itinerary days to get updated meals
                await getItineraryDays(id);
                toast.success('Meal updated successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to update meal';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to update meal');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError, getItineraryDays]);

    /**
     * Delete meal
     */
    const deleteMeal = useCallback(async (id: string, dayNumber: number, mealId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.deleteMeal(id, dayNumber, mealId);

            if (response.success) {
                // Refresh itinerary days to get updated meals
                await getItineraryDays(id);
                toast.success('Meal deleted successfully');
                return { success: true, message: response.message };
            } else {
                const errorMessage = response.message || 'Failed to delete meal';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to delete meal');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError, getItineraryDays]);

    // ========================
    // Accommodation Management
    // ========================

    /**
     * Set accommodation for day
     */
    const setAccommodation = useCallback(async (id: string, dayNumber: number, data: CreateAccommodationRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.setAccommodation(id, dayNumber, data);

            if (response.success) {
                // Refresh itinerary days to get updated accommodation
                await getItineraryDays(id);
                toast.success('Accommodation set successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to set accommodation';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to set accommodation');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError, getItineraryDays]);

    /**
     * Update accommodation
     */
    const updateAccommodation = useCallback(async (id: string, dayNumber: number, data: UpdateAccommodationRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.updateAccommodation(id, dayNumber, data);

            if (response.success) {
                // Refresh itinerary days to get updated accommodation
                await getItineraryDays(id);
                toast.success('Accommodation updated successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to update accommodation';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to update accommodation');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError, getItineraryDays]);

    /**
     * Remove accommodation from day
     */
    const removeAccommodation = useCallback(async (id: string, dayNumber: number) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.removeAccommodation(id, dayNumber);

            if (response.success) {
                // Refresh itinerary days to get updated accommodation
                await getItineraryDays(id);
                toast.success('Accommodation removed successfully');
                return { success: true, message: response.message };
            } else {
                const errorMessage = response.message || 'Failed to remove accommodation';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to remove accommodation');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError, getItineraryDays]);

    // ========================
    // Nearby Places Management
    // ========================

    /**
     * Add nearby place to day
     */
    const addNearbyPlace = useCallback(async (id: string, dayNumber: number, data: CreateNearbyPlaceRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.addNearbyPlace(id, dayNumber, data);

            if (response.success) {
                // Refresh itinerary days to get updated nearby places
                await getItineraryDays(id);
                toast.success('Nearby place added successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to add nearby place';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to add nearby place');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError, getItineraryDays]);

    /**
     * Get suggested nearby places
     */
    const getSuggestedNearbyPlaces = useCallback(async (id: string, dayNumber: number, preferences?: string[]) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.getSuggestedNearbyPlaces(id, dayNumber, preferences);

            if (response.success) {
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to get suggested nearby places';
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
    // Participant Management
    // ========================

    /**
     * Get participants
     */
    const getParticipants = useCallback(async (id: string) => {
        try {
            setParticipantsLoading(true);
            setParticipantsError(null);

            const response = await itineraryService.getParticipants(id);

            if (response.success) {
                setParticipants(response.data);
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to fetch participants';
                setParticipantsError(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setParticipantsError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setParticipantsLoading(false);
        }
    }, [setParticipants, setParticipantsLoading, setParticipantsError]);

    /**
     * Add participant
     */
    const addParticipant = useCallback(async (id: string, data: CreateParticipantRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.addParticipant(id, data);

            if (response.success) {
                // Refresh participants
                await getParticipants(id);
                toast.success('Participant added successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to add participant';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to add participant');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError, getParticipants]);

    /**
     * Update participant
     */
    const updateParticipant = useCallback(async (id: string, data: UpdateParticipantRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.updateParticipant(id, data);

            if (response.success) {
                // Refresh participants
                await getParticipants(id);
                toast.success('Participant updated successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to update participant';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to update participant');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError, getParticipants]);

    /**
     * Remove participant
     */
    const removeParticipant = useCallback(async (id: string, participantId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.removeParticipant(id, participantId);

            if (response.success) {
                // Refresh participants
                await getParticipants(id);
                toast.success('Participant removed successfully');
                return { success: true, message: response.message };
            } else {
                const errorMessage = response.message || 'Failed to remove participant';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to remove participant');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError, getParticipants]);

    /**
     * Bulk add participants
     */
    const bulkAddParticipants = useCallback(async (id: string, participantsData: CreateParticipantRequest[]) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.bulkAddParticipants(id, participantsData);

            if (response.success) {
                // Refresh participants
                await getParticipants(id);
                toast.success(`${response.data.length} participants added successfully`);
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to bulk add participants';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to bulk add participants');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError, getParticipants]);

    // ========================
    // Export & Import
    // ========================

    /**
     * Export itinerary
     */
    const exportItinerary = useCallback(async (id: string, options: ExportItineraryRequest) => {
        try {
            setExportLoading(true);
            setExportError(null);

            const response = await itineraryService.exportItinerary(id, options);

            if (response.success) {
                toast.success('Itinerary exported successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to export itinerary';
                setExportError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setExportError(errorMessage);
            toast.error('Failed to export itinerary');
            return { success: false, error: errorMessage };
        } finally {
            setExportLoading(false);
        }
    }, [setExportLoading, setExportError]);

    /**
     * Import itinerary
     */
    const importItinerary = useCallback(async (data: ImportItineraryRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.importItinerary(data);

            if (response.success) {
                // If it's a new itinerary, add to list
                if ('id' in response.data) {
                    addItinerary(response.data as Itinerary);
                }
                toast.success('Itinerary imported successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to import itinerary';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to import itinerary');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [addItinerary, setLoading, setError]);

    // ========================
    // Cost & Budget Management
    // ========================

    /**
     * Get cost breakdown
     */
    const getCostBreakdown = useCallback(async (id: string, options?: CostBreakdownRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.getCostBreakdown(id, options);

            if (response.success) {
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to get cost breakdown';
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

    /**
     * Calculate total cost
     */
    const calculateTotal = useCallback(async (id: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.calculateTotal(id);

            if (response.success) {
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to calculate total cost';
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
    // Statistics & Analytics
    // ========================

    /**
     * Get itinerary statistics
     */
    const getItineraryStats = useCallback(async (forceRefresh?: boolean) => {
        try {
            if (!forceRefresh && isCacheValid('stats') && itineraryStats) {
                return { success: true, data: itineraryStats };
            }

            setLoading(true);
            setError(null);

            const response = await itineraryService.getItineraryStats();

            if (response.success) {
                setItineraryStats(response.data);
                updateCacheTimestamp('stats');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to fetch itinerary statistics';
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
    }, [itineraryStats, isCacheValid, setItineraryStats, setLoading, setError, updateCacheTimestamp]);

    /**
     * Get popular destinations
     */
    const getPopularDestinations = useCallback(async (limit?: number, forceRefresh?: boolean) => {
        try {
            if (!forceRefresh && isCacheValid('popularDestinations') && popularDestinations.length > 0) {
                return { success: true, data: popularDestinations };
            }

            const response = await itineraryService.getPopularDestinations(limit);

            if (response.success) {
                setPopularDestinations(response.data);
                updateCacheTimestamp('popularDestinations');
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
     * Get popular activities
     */
    const getPopularActivities = useCallback(async (limit?: number, forceRefresh?: boolean) => {
        try {
            if (!forceRefresh && isCacheValid('popularActivities') && popularActivities.length > 0) {
                return { success: true, data: popularActivities };
            }

            const response = await itineraryService.getPopularActivities(limit);

            if (response.success) {
                setPopularActivities(response.data);
                updateCacheTimestamp('popularActivities');
                return { success: true, data: response.data };
            } else {
                return { success: false, error: response.message };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            return { success: false, error: errorMessage };
        }
    }, [popularActivities, isCacheValid, setPopularActivities, updateCacheTimestamp]);

    // ========================
    // Validation & Optimization
    // ========================

    /**
     * Validate itinerary
     */
    const validateItinerary = useCallback(async (id: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.validateItinerary(id);

            if (response.success) {
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to validate itinerary';
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

    /**
     * Optimize itinerary
     */
    const optimizeItinerary = useCallback(async (id: string, options?: ScheduleOptimizationRequest) => {
        try {
            setOptimizationLoading(true);
            setOptimizationError(null);

            const response = await itineraryService.optimizeItinerary(id, options);

            if (response.success) {
                updateItinerary(response.data);
                toast.success('Itinerary optimized successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to optimize itinerary';
                setOptimizationError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setOptimizationError(errorMessage);
            toast.error('Failed to optimize itinerary');
            return { success: false, error: errorMessage };
        } finally {
            setOptimizationLoading(false);
        }
    }, [updateItinerary, setOptimizationLoading, setOptimizationError]);

    /**
     * Get recommendations
     */
    const getRecommendations = useCallback(async (id: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.getRecommendations(id);

            if (response.success) {
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to get recommendations';
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
    // AI & Smart Features
    // ========================

    /**
     * AI suggest activities
     */
    const aiSuggestActivities = useCallback(async (id: string, options?: AIRequest) => {
        try {
            setAiLoading(true);
            setAiError(null);

            const response = await itineraryService.aiSuggestActivities(id, options);

            if (response.success) {
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to get AI activity suggestions';
                setAiError(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setAiError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setAiLoading(false);
        }
    }, [setAiLoading, setAiError]);

    /**
     * AI optimize route
     */
    const aiOptimizeRoute = useCallback(async (id: string, options?: AIRequest) => {
        try {
            setAiLoading(true);
            setAiError(null);

            const response = await itineraryService.aiOptimizeRoute(id, options);

            if (response.success) {
                updateItinerary(response.data);
                toast.success('Route optimized successfully with AI');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to optimize route with AI';
                setAiError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setAiError(errorMessage);
            toast.error('Failed to optimize route with AI');
            return { success: false, error: errorMessage };
        } finally {
            setAiLoading(false);
        }
    }, [updateItinerary, setAiLoading, setAiError]);

    /**
     * AI suggest meals
     */
    const aiSuggestMeals = useCallback(async (id: string, options?: AIRequest) => {
        try {
            setAiLoading(true);
            setAiError(null);

            const response = await itineraryService.aiSuggestMeals(id, options);

            if (response.success) {
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to get AI meal suggestions';
                setAiError(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setAiError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setAiLoading(false);
        }
    }, [setAiLoading, setAiError]);

    /**
     * AI budget optimization
     */
    const aiBudgetOptimization = useCallback(async (id: string, options?: AIRequest) => {
        try {
            setAiLoading(true);
            setAiError(null);

            const response = await itineraryService.aiBudgetOptimization(id, options);

            if (response.success) {
                updateItinerary(response.data.optimizedItinerary);
                toast.success(`Budget optimized! Saved ${response.data.savings} with AI recommendations`);
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to optimize budget with AI';
                setAiError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setAiError(errorMessage);
            toast.error('Failed to optimize budget with AI');
            return { success: false, error: errorMessage };
        } finally {
            setAiLoading(false);
        }
    }, [updateItinerary, setAiLoading, setAiError]);

    /**
     * AI generate description
     */
    const aiGenerateDescription = useCallback(async (id: string) => {
        try {
            setAiLoading(true);
            setAiError(null);

            const response = await itineraryService.aiGenerateDescription(id);

            if (response.success) {
                toast.success('Description generated successfully with AI');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to generate description with AI';
                setAiError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setAiError(errorMessage);
            toast.error('Failed to generate description with AI');
            return { success: false, error: errorMessage };
        } finally {
            setAiLoading(false);
        }
    }, [setAiLoading, setAiError]);

    // ========================
    // Integration & Sync
    // ========================

    /**
     * Generate itinerary from tour
     */
    const generateFromTour = useCallback(async (tourId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.generateFromTour(tourId);

            if (response.success) {
                addItinerary(response.data);
                toast.success('Itinerary generated from tour successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to generate itinerary from tour';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to generate itinerary from tour');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [addItinerary, setLoading, setError]);

    /**
     * Generate itinerary from booking
     */
    const generateFromBooking = useCallback(async (bookingId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.generateFromBooking(bookingId);

            if (response.success) {
                addItinerary(response.data);
                toast.success('Itinerary generated from booking successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to generate itinerary from booking';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to generate itinerary from booking');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [addItinerary, setLoading, setError]);

    /**
     * Sync itinerary with tour
     */
    const syncWithTour = useCallback(async (id: string, tourId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.syncWithTour(id, tourId);

            if (response.success) {
                updateItinerary(response.data);
                toast.success('Itinerary synced with tour successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to sync with tour';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to sync with tour');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [updateItinerary, setLoading, setError]);

    /**
     * Sync itinerary with booking
     */
    const syncWithBooking = useCallback(async (id: string, bookingId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.syncWithBooking(id, bookingId);

            if (response.success) {
                updateItinerary(response.data);
                toast.success('Itinerary synced with booking successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to sync with booking';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to sync with booking');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [updateItinerary, setLoading, setError]);

    // ========================
    // Bulk Operations
    // ========================

    /**
     * Bulk operations on itineraries
     */
    const bulkOperation = useCallback(async (request: BulkOperationRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await itineraryService.bulkOperation(request);

            if (response.success) {
                toast.success(`${response.data.processed} itineraries processed successfully`);
                // Refresh itineraries list
                await getAllItineraries(undefined, true);
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to perform bulk operation';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to perform bulk operation');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError, getAllItineraries]);

    // ========================
    // Utility Functions
    // ========================

    /**
     * Initialize itinerary data
     */
    const initializeItineraryData = useCallback(async () => {
        try {
            await Promise.all([
                getAllItineraries(),
                getItineraryStats(),
                getPopularDestinations(),
                getPopularActivities(),
            ]);
        } catch (error) {
            console.error('Failed to initialize itinerary data:', error);
        }
    }, [getAllItineraries, getItineraryStats, getPopularDestinations, getPopularActivities]);

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
        setFilteredItineraries([]);
    }, [setSearchQuery, setSelectedFilters, setFilteredItineraries]);

    // Auto-initialize on mount
    useEffect(() => {
        if (!itineraries.length && !itineraryStats) {
            initializeItineraryData();
        }
    }, [itineraries.length, itineraryStats, initializeItineraryData]);

    return {
        // State
        itineraries,
        selectedItinerary,
        filteredItineraries,
        itineraryDays,
        participants,
        popularDestinations,
        popularActivities,
        itineraryStats,

        // Loading States
        isLoading,
        itinerariesLoading,
        searchLoading,
        daysLoading,
        activitiesLoading,
        participantsLoading,
        exportLoading,
        optimizationLoading,
        aiLoading,

        // Error States
        error,
        itinerariesError,
        searchError,
        daysError,
        activitiesError,
        participantsError,
        exportError,
        optimizationError,
        aiError,

        // Search & Filter State
        searchQuery,
        selectedFilters,

        // Basic CRUD Actions
        getAllItineraries,
        getItineraryById,
        createItinerary,
        updateItineraryItem,
        deleteItinerary,
        duplicateItinerary,
        setSelectedItinerary,

        // Search and Filter Actions
        searchItineraries,
        filterItineraries,
        getItinerariesByStatus,
        clearSearch,

        // Day Management Actions
        getItineraryDays,
        addDay,
        updateDay,
        deleteDay,
        reorderDays,

        // Activity Management Actions
        getDayActivities,
        addActivity,
        updateActivity,
        deleteActivity,
        reorderActivities,

        // Meal Management Actions
        addMeal,
        updateMeal,
        deleteMeal,

        // Accommodation Management Actions
        setAccommodation,
        updateAccommodation,
        removeAccommodation,

        // Nearby Places Actions
        addNearbyPlace,
        getSuggestedNearbyPlaces,

        // Participant Management Actions
        getParticipants,
        addParticipant,
        updateParticipant,
        removeParticipant,
        bulkAddParticipants,

        // Export & Import Actions
        exportItinerary,
        importItinerary,

        // Cost & Budget Actions
        getCostBreakdown,
        calculateTotal,

        // Statistics Actions
        getItineraryStats,
        getPopularDestinations,
        getPopularActivities,

        // Validation & Optimization Actions
        validateItinerary,
        optimizeItinerary,
        getRecommendations,

        // AI Features Actions
        aiSuggestActivities,
        aiOptimizeRoute,
        aiSuggestMeals,
        aiBudgetOptimization,
        aiGenerateDescription,

        // Integration Actions
        generateFromTour,
        generateFromBooking,
        syncWithTour,
        syncWithBooking,

        // Bulk Actions
        bulkOperation,

        // Utility Actions
        initializeItineraryData,
        clearAllErrors,
    };
};