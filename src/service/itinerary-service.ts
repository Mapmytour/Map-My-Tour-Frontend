import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import {
    Itinerary,
    ItineraryDay,
    ItineraryActivity,
    ItineraryMeal,
    ItineraryAccommodation,
    NearbyPlace,
    Participant,
    ItineraryFilters,
    ItineraryLocation,
    ItineraryStatus,
    ActivityType,
    ActivityStatus,
    MealType,
    AccommodationType,
    NearbyPlaceType,
    Coordinates,
} from '@/types/itinerary';
import { APIResponse } from '@/types/APIResponse';
import { Currency } from '@/types/common';

// ========================
// Request Types
// ========================

export interface CreateItineraryRequest {
    title: string;
    description: string;
    totalDays: number;
    startDate?: string;
    endDate?: string;
    tourId?: string;
    bookingId?: string;
    destinationId?: string;
    activityId?: string;
    servicesId?: string;
    totalParticipants: number;
    participants: CreateParticipantRequest[];
    totalCost: number;
    currency: Currency;
    costPerPerson?: number;
    status: ItineraryStatus;
}

export interface UpdateItineraryRequest extends Partial<CreateItineraryRequest> {
    id: string;
}

export interface CreateParticipantRequest {
    fullName: string;
    age?: number;
    gender?: 'male' | 'female' | 'other';
    email?: string;
    phone?: string;
    passportNumber?: string;
    nationality?: string;
    specialRequirements?: string;
}

export interface UpdateParticipantRequest extends Partial<CreateParticipantRequest> {
    id: string;
}

export interface CreateItineraryDayRequest {
    day: number;
    date: string;
    title: string;
    description?: string;
    city: string;
    mainLocation: ItineraryLocation;
    highlights: string[];
    notes?: string;
}

export interface UpdateItineraryDayRequest extends Partial<CreateItineraryDayRequest> {
    dayNumber: number;
}

export interface CreateActivityRequest {
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    duration: number;
    location: ItineraryLocation;
    type: ActivityType;
    status: ActivityStatus;
    cost?: number;
    included: boolean;
    requirements?: string[];
}

export interface UpdateActivityRequest extends Partial<CreateActivityRequest> {
    activityId: string;
}

export interface CreateMealRequest {
    type: MealType;
    name: string;
    location: ItineraryLocation;
    time: string;
    cuisineType?: string;
    cost?: number;
    included: boolean;
}

export interface UpdateMealRequest extends Partial<CreateMealRequest> {
    mealId: string;
}

export interface CreateAccommodationRequest {
    name: string;
    type: AccommodationType;
    location: ItineraryLocation;
    checkIn: string;
    checkOut: string;
    roomType: string;
    amenities: string[];
    rating?: number;
    cost?: number;
}

export interface UpdateAccommodationRequest extends Partial<CreateAccommodationRequest> { }

export interface CreateNearbyPlaceRequest {
    name: string;
    type: NearbyPlaceType;
    location: ItineraryLocation;
    distance: string;
    description: string;
    openingHours?: string;
    entryFee?: number;
    recommended: boolean;
}

export interface UpdateNearbyPlaceRequest extends Partial<CreateNearbyPlaceRequest> {
    placeId: string;
}

export interface SearchItinerariesRequest {
    query: string;
    filters?: ItineraryFilters;
    sortBy?: 'title' | 'totalDays' | 'totalCost' | 'createdAt' | 'status' | 'participants';
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}

export interface DuplicateItineraryRequest {
    title?: string;
    includeDays?: boolean;
    includeActivities?: boolean;
    includeMeals?: boolean;
    includeAccommodation?: boolean;
    includeNearbyPlaces?: boolean;
    includeParticipants?: boolean;
}

export interface ShareItineraryRequest {
    emails: string[];
    permissions: 'view' | 'edit';
    expiresAt?: string;
    message?: string;
}

export interface ExportItineraryRequest {
    format: 'pdf' | 'excel' | 'json';
    sections?: string[];
    includeImages?: boolean;
    includeMap?: boolean;
    includeWeather?: boolean;
}

export interface ImportItineraryRequest {
    data: any;
    format: 'json' | 'excel' | 'csv';
    mergeStrategy?: 'replace' | 'merge' | 'append';
    validateOnly?: boolean;
}

export interface CostBreakdownRequest {
    includeTax?: boolean;
    includeServiceFee?: boolean;
    currency?: Currency;
    breakdown?: 'day' | 'activity' | 'participant';
}

export interface ScheduleOptimizationRequest {
    optimizeFor: 'time' | 'cost' | 'distance' | 'experience';
    constraints?: {
        maxTravelTime?: number;
        budgetLimit?: number;
        preferredStartTime?: string;
        preferredEndTime?: string;
    };
}

export interface BulkOperationRequest {
    itineraryIds: string[];
    operation: 'delete' | 'duplicate' | 'export' | 'statusUpdate' | 'assign';
    data?: any;
}

export interface WeatherUpdateRequest {
    includeAlternatives?: boolean;
    notifyParticipants?: boolean;
    autoReschedule?: boolean;
}

export interface AIRequest {
    preferences?: string[];
    budget?: number;
    participants?: number;
    interests?: string[];
    excludes?: string[];
}

class ItineraryService {
    // ========================
    // Basic CRUD Operations
    // ========================

    /**
     * Get all itineraries with optional filters
     */
    async getAllItineraries(filters?: ItineraryFilters): Promise<APIResponse<{
        itineraries: Itinerary[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>> {
        try {
            const params = filters ? this.buildFilterParams(filters) : undefined;
            const response = await apiClient.get<{
                itineraries: Itinerary[];
                total: number;
                page: number;
                limit: number;
                pages: number;
            }>(API_ENDPOINTS.ITINERARY.GET_ALL, params);
            return response;
        } catch (error) {
            throw new Error(`Failed to fetch itineraries: ${error}`);
        }
    }

    /**
     * Get itinerary by ID
     */
    async getItineraryById(id: string): Promise<APIResponse<Itinerary>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.GET_BY_ID.replace(':id', id);
            const response = await apiClient.get<Itinerary>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to fetch itinerary: ${error}`);
        }
    }

    /**
     * Create new itinerary
     */
    async createItinerary(data: CreateItineraryRequest): Promise<APIResponse<Itinerary>> {
        try {
            const response = await apiClient.post<Itinerary>(
                API_ENDPOINTS.ITINERARY.CREATE,
                data
            );
            return response;
        } catch (error) {
            throw new Error(`Failed to create itinerary: ${error}`);
        }
    }

    /**
     * Update itinerary
     */
    async updateItinerary(data: UpdateItineraryRequest): Promise<APIResponse<Itinerary>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.UPDATE.replace(':id', data.id);
            const { id, ...updateData } = data;
            const response = await apiClient.put<Itinerary>(endpoint, updateData);
            return response;
        } catch (error) {
            throw new Error(`Failed to update itinerary: ${error}`);
        }
    }

    /**
     * Delete itinerary
     */
    async deleteItinerary(id: string): Promise<APIResponse<{ message: string }>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.DELETE.replace(':id', id);
            const response = await apiClient.delete<{ message: string }>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to delete itinerary: ${error}`);
        }
    }

    /**
     * Duplicate itinerary
     */
    async duplicateItinerary(id: string, options?: DuplicateItineraryRequest): Promise<APIResponse<Itinerary>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.DUPLICATE.replace(':id', id);
            const response = await apiClient.post<Itinerary>(endpoint, options);
            return response;
        } catch (error) {
            throw new Error(`Failed to duplicate itinerary: ${error}`);
        }
    }

    // ========================
    // Search and Filter
    // ========================

    /**
     * Search itineraries
     */
    async searchItineraries(request: SearchItinerariesRequest): Promise<APIResponse<{
        itineraries: Itinerary[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>> {
        try {
            const response = await apiClient.post<{
                itineraries: Itinerary[];
                total: number;
                page: number;
                limit: number;
                pages: number;
            }>(API_ENDPOINTS.ITINERARY.SEARCH, request);
            return response;
        } catch (error) {
            throw new Error(`Failed to search itineraries: ${error}`);
        }
    }

    /**
     * Filter itineraries
     */
    async filterItineraries(filters: ItineraryFilters): Promise<APIResponse<Itinerary[]>> {
        try {
            const response = await apiClient.post<Itinerary[]>(
                API_ENDPOINTS.ITINERARY.FILTER,
                filters
            );
            return response;
        } catch (error) {
            throw new Error(`Failed to filter itineraries: ${error}`);
        }
    }

    /**
     * Get itineraries by status
     */
    async getItinerariesByStatus(status: ItineraryStatus): Promise<APIResponse<Itinerary[]>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.BY_STATUS.replace(':status', status);
            const response = await apiClient.get<Itinerary[]>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to fetch itineraries by status: ${error}`);
        }
    }

    /**
     * Get itineraries by date range
     */
    async getItinerariesByDateRange(from: string, to: string): Promise<APIResponse<Itinerary[]>> {
        try {
            const response = await apiClient.get<Itinerary[]>(
                API_ENDPOINTS.ITINERARY.BY_DATE_RANGE,
                { from, to }
            );
            return response;
        } catch (error) {
            throw new Error(`Failed to fetch itineraries by date range: ${error}`);
        }
    }

    /**
     * Get itineraries by tour
     */
    async getItinerariesByTour(tourId: string): Promise<APIResponse<Itinerary[]>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.BY_TOUR.replace(':tourId', tourId);
            const response = await apiClient.get<Itinerary[]>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to fetch itineraries by tour: ${error}`);
        }
    }

    /**
     * Get itineraries by booking
     */
    async getItinerariesByBooking(bookingId: string): Promise<APIResponse<Itinerary[]>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.BY_BOOKING.replace(':bookingId', bookingId);
            const response = await apiClient.get<Itinerary[]>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to fetch itineraries by booking: ${error}`);
        }
    }

    // ========================
    // Day Management
    // ========================

    /**
     * Get itinerary days
     */
    async getItineraryDays(id: string): Promise<APIResponse<ItineraryDay[]>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.GET_DAYS.replace(':id', id);
            const response = await apiClient.get<ItineraryDay[]>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to fetch itinerary days: ${error}`);
        }
    }

    /**
     * Add day to itinerary
     */
    async addDay(id: string, data: CreateItineraryDayRequest): Promise<APIResponse<ItineraryDay>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.ADD_DAY.replace(':id', id);
            const response = await apiClient.post<ItineraryDay>(endpoint, data);
            return response;
        } catch (error) {
            throw new Error(`Failed to add day to itinerary: ${error}`);
        }
    }

    /**
     * Update itinerary day
     */
    async updateDay(id: string, data: UpdateItineraryDayRequest): Promise<APIResponse<ItineraryDay>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.UPDATE_DAY
                .replace(':id', id)
                .replace(':dayNumber', data.dayNumber.toString());
            const { dayNumber, ...updateData } = data;
            const response = await apiClient.put<ItineraryDay>(endpoint, updateData);
            return response;
        } catch (error) {
            throw new Error(`Failed to update itinerary day: ${error}`);
        }
    }

    /**
     * Delete itinerary day
     */
    async deleteDay(id: string, dayNumber: number): Promise<APIResponse<{ message: string }>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.DELETE_DAY
                .replace(':id', id)
                .replace(':dayNumber', dayNumber.toString());
            const response = await apiClient.delete<{ message: string }>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to delete itinerary day: ${error}`);
        }
    }

    /**
     * Reorder itinerary days
     */
    async reorderDays(id: string, dayOrder: number[]): Promise<APIResponse<ItineraryDay[]>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.REORDER_DAYS.replace(':id', id);
            const response = await apiClient.put<ItineraryDay[]>(endpoint, { dayOrder });
            return response;
        } catch (error) {
            throw new Error(`Failed to reorder itinerary days: ${error}`);
        }
    }

    // ========================
    // Activity Management
    // ========================

    /**
     * Get day activities
     */
    async getDayActivities(id: string, dayNumber: number): Promise<APIResponse<ItineraryActivity[]>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.GET_DAY_ACTIVITIES
                .replace(':id', id)
                .replace(':dayNumber', dayNumber.toString());
            const response = await apiClient.get<ItineraryActivity[]>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to fetch day activities: ${error}`);
        }
    }

    /**
     * Add activity to day
     */
    async addActivity(id: string, dayNumber: number, data: CreateActivityRequest): Promise<APIResponse<ItineraryActivity>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.ADD_ACTIVITY
                .replace(':id', id)
                .replace(':dayNumber', dayNumber.toString());
            const response = await apiClient.post<ItineraryActivity>(endpoint, data);
            return response;
        } catch (error) {
            throw new Error(`Failed to add activity: ${error}`);
        }
    }

    /**
     * Update activity
     */
    async updateActivity(id: string, dayNumber: number, data: UpdateActivityRequest): Promise<APIResponse<ItineraryActivity>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.UPDATE_ACTIVITY
                .replace(':id', id)
                .replace(':dayNumber', dayNumber.toString())
                .replace(':activityId', data.activityId);
            const { activityId, ...updateData } = data;
            const response = await apiClient.put<ItineraryActivity>(endpoint, updateData);
            return response;
        } catch (error) {
            throw new Error(`Failed to update activity: ${error}`);
        }
    }

    /**
     * Delete activity
     */
    async deleteActivity(id: string, dayNumber: number, activityId: string): Promise<APIResponse<{ message: string }>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.DELETE_ACTIVITY
                .replace(':id', id)
                .replace(':dayNumber', dayNumber.toString())
                .replace(':activityId', activityId);
            const response = await apiClient.delete<{ message: string }>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to delete activity: ${error}`);
        }
    }

    /**
     * Reorder activities in a day
     */
    async reorderActivities(id: string, dayNumber: number, activityOrder: string[]): Promise<APIResponse<ItineraryActivity[]>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.REORDER_ACTIVITIES
                .replace(':id', id)
                .replace(':dayNumber', dayNumber.toString());
            const response = await apiClient.put<ItineraryActivity[]>(endpoint, { activityOrder });
            return response;
        } catch (error) {
            throw new Error(`Failed to reorder activities: ${error}`);
        }
    }

    // ========================
    // Meal Management
    // ========================

    /**
     * Get day meals
     */
    async getDayMeals(id: string, dayNumber: number): Promise<APIResponse<ItineraryMeal[]>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.GET_DAY_MEALS
                .replace(':id', id)
                .replace(':dayNumber', dayNumber.toString());
            const response = await apiClient.get<ItineraryMeal[]>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to fetch day meals: ${error}`);
        }
    }

    /**
     * Add meal to day
     */
    async addMeal(id: string, dayNumber: number, data: CreateMealRequest): Promise<APIResponse<ItineraryMeal>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.ADD_MEAL
                .replace(':id', id)
                .replace(':dayNumber', dayNumber.toString());
            const response = await apiClient.post<ItineraryMeal>(endpoint, data);
            return response;
        } catch (error) {
            throw new Error(`Failed to add meal: ${error}`);
        }
    }

    /**
     * Update meal
     */
    async updateMeal(id: string, dayNumber: number, data: UpdateMealRequest): Promise<APIResponse<ItineraryMeal>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.UPDATE_MEAL
                .replace(':id', id)
                .replace(':dayNumber', dayNumber.toString())
                .replace(':mealId', data.mealId);
            const { mealId, ...updateData } = data;
            const response = await apiClient.put<ItineraryMeal>(endpoint, updateData);
            return response;
        } catch (error) {
            throw new Error(`Failed to update meal: ${error}`);
        }
    }

    /**
     * Delete meal
     */
    async deleteMeal(id: string, dayNumber: number, mealId: string): Promise<APIResponse<{ message: string }>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.DELETE_MEAL
                .replace(':id', id)
                .replace(':dayNumber', dayNumber.toString())
                .replace(':mealId', mealId);
            const response = await apiClient.delete<{ message: string }>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to delete meal: ${error}`);
        }
    }

    // ========================
    // Accommodation Management
    // ========================

    /**
     * Get day accommodation
     */
    async getDayAccommodation(id: string, dayNumber: number): Promise<APIResponse<ItineraryAccommodation | null>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.GET_DAY_ACCOMMODATION
                .replace(':id', id)
                .replace(':dayNumber', dayNumber.toString());
            const response = await apiClient.get<ItineraryAccommodation | null>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to fetch day accommodation: ${error}`);
        }
    }

    /**
     * Set accommodation for day
     */
    async setAccommodation(id: string, dayNumber: number, data: CreateAccommodationRequest): Promise<APIResponse<ItineraryAccommodation>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.SET_ACCOMMODATION
                .replace(':id', id)
                .replace(':dayNumber', dayNumber.toString());
            const response = await apiClient.post<ItineraryAccommodation>(endpoint, data);
            return response;
        } catch (error) {
            throw new Error(`Failed to set accommodation: ${error}`);
        }
    }

    /**
     * Update accommodation
     */
    async updateAccommodation(id: string, dayNumber: number, data: UpdateAccommodationRequest): Promise<APIResponse<ItineraryAccommodation>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.UPDATE_ACCOMMODATION
                .replace(':id', id)
                .replace(':dayNumber', dayNumber.toString());
            const response = await apiClient.put<ItineraryAccommodation>(endpoint, data);
            return response;
        } catch (error) {
            throw new Error(`Failed to update accommodation: ${error}`);
        }
    }

    /**
     * Remove accommodation from day
     */
    async removeAccommodation(id: string, dayNumber: number): Promise<APIResponse<{ message: string }>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.REMOVE_ACCOMMODATION
                .replace(':id', id)
                .replace(':dayNumber', dayNumber.toString());
            const response = await apiClient.delete<{ message: string }>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to remove accommodation: ${error}`);
        }
    }

    // ========================
    // Nearby Places Management
    // ========================

    /**
     * Get nearby places for day
     */
    async getNearbyPlaces(id: string, dayNumber: number): Promise<APIResponse<NearbyPlace[]>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.GET_NEARBY_PLACES
                .replace(':id', id)
                .replace(':dayNumber', dayNumber.toString());
            const response = await apiClient.get<NearbyPlace[]>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to fetch nearby places: ${error}`);
        }
    }

    /**
     * Add nearby place to day
     */
    async addNearbyPlace(id: string, dayNumber: number, data: CreateNearbyPlaceRequest): Promise<APIResponse<NearbyPlace>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.ADD_NEARBY_PLACE
                .replace(':id', id)
                .replace(':dayNumber', dayNumber.toString());
            const response = await apiClient.post<NearbyPlace>(endpoint, data);
            return response;
        } catch (error) {
            throw new Error(`Failed to add nearby place: ${error}`);
        }
    }

    /**
     * Update nearby place
     */
    async updateNearbyPlace(id: string, dayNumber: number, data: UpdateNearbyPlaceRequest): Promise<APIResponse<NearbyPlace>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.UPDATE_NEARBY_PLACE
                .replace(':id', id)
                .replace(':dayNumber', dayNumber.toString())
                .replace(':placeId', data.placeId);
            const { placeId, ...updateData } = data;
            const response = await apiClient.put<NearbyPlace>(endpoint, updateData);
            return response;
        } catch (error) {
            throw new Error(`Failed to update nearby place: ${error}`);
        }
    }

    /**
     * Delete nearby place
     */
    async deleteNearbyPlace(id: string, dayNumber: number, placeId: string): Promise<APIResponse<{ message: string }>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.DELETE_NEARBY_PLACE
                .replace(':id', id)
                .replace(':dayNumber', dayNumber.toString())
                .replace(':placeId', placeId);
            const response = await apiClient.delete<{ message: string }>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to delete nearby place: ${error}`);
        }
    }

    /**
     * Get suggested nearby places
     */
    async getSuggestedNearbyPlaces(id: string, dayNumber: number, preferences?: string[]): Promise<APIResponse<NearbyPlace[]>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.SUGGEST_NEARBY_PLACES
                .replace(':id', id)
                .replace(':dayNumber', dayNumber.toString());
            const response = await apiClient.post<NearbyPlace[]>(endpoint, { preferences });
            return response;
        } catch (error) {
            throw new Error(`Failed to get suggested nearby places: ${error}`);
        }
    }

    // ========================
    // Participant Management
    // ========================

    /**
     * Get itinerary participants
     */
    async getParticipants(id: string): Promise<APIResponse<Participant[]>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.GET_PARTICIPANTS.replace(':id', id);
            const response = await apiClient.get<Participant[]>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to fetch participants: ${error}`);
        }
    }

    /**
     * Add participant
     */
    async addParticipant(id: string, data: CreateParticipantRequest): Promise<APIResponse<Participant>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.ADD_PARTICIPANT.replace(':id', id);
            const response = await apiClient.post<Participant>(endpoint, data);
            return response;
        } catch (error) {
            throw new Error(`Failed to add participant: ${error}`);
        }
    }

    /**
     * Update participant
     */
    async updateParticipant(id: string, data: UpdateParticipantRequest): Promise<APIResponse<Participant>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.UPDATE_PARTICIPANT
                .replace(':id', id)
                .replace(':participantId', data.id);
            const { id: participantId, ...updateData } = data;
            const response = await apiClient.put<Participant>(endpoint, updateData);
            return response;
        } catch (error) {
            throw new Error(`Failed to update participant: ${error}`);
        }
    }

    /**
     * Remove participant
     */
    async removeParticipant(id: string, participantId: string): Promise<APIResponse<{ message: string }>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.REMOVE_PARTICIPANT
                .replace(':id', id)
                .replace(':participantId', participantId);
            const response = await apiClient.delete<{ message: string }>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to remove participant: ${error}`);
        }
    }

    /**
     * Bulk add participants
     */
    async bulkAddParticipants(id: string, participants: CreateParticipantRequest[]): Promise<APIResponse<Participant[]>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.BULK_ADD_PARTICIPANTS.replace(':id', id);
            const response = await apiClient.post<Participant[]>(endpoint, { participants });
            return response;
        } catch (error) {
            throw new Error(`Failed to bulk add participants: ${error}`);
        }
    }

    // ========================
    // Integration & Sync
    // ========================

    /**
     * Sync itinerary with tour
     */
    async syncWithTour(id: string, tourId: string): Promise<APIResponse<Itinerary>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.SYNC_WITH_TOUR
                .replace(':id', id)
                .replace(':tourId', tourId);
            const response = await apiClient.post<Itinerary>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to sync with tour: ${error}`);
        }
    }

    /**
     * Sync itinerary with booking
     */
    async syncWithBooking(id: string, bookingId: string): Promise<APIResponse<Itinerary>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.SYNC_WITH_BOOKING
                .replace(':id', id)
                .replace(':bookingId', bookingId);
            const response = await apiClient.post<Itinerary>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to sync with booking: ${error}`);
        }
    }

    /**
     * Generate itinerary from tour
     */
    async generateFromTour(tourId: string): Promise<APIResponse<Itinerary>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.GENERATE_FROM_TOUR.replace(':tourId', tourId);
            const response = await apiClient.post<Itinerary>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to generate itinerary from tour: ${error}`);
        }
    }

    /**
     * Generate itinerary from booking
     */
    async generateFromBooking(bookingId: string): Promise<APIResponse<Itinerary>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.GENERATE_FROM_BOOKING.replace(':bookingId', bookingId);
            const response = await apiClient.post<Itinerary>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to generate itinerary from booking: ${error}`);
        }
    }

    // ========================
    // Export & Import
    // ========================

    /**
     * Export itinerary
     */
    async exportItinerary(id: string, options: ExportItineraryRequest): Promise<APIResponse<{ downloadUrl: string; expiresAt: string }>> {
        try {
            let endpoint: string;
            switch (options.format) {
                case 'pdf':
                    endpoint = API_ENDPOINTS.ITINERARY.EXPORT_PDF;
                    break;
                case 'excel':
                    endpoint = API_ENDPOINTS.ITINERARY.EXPORT_EXCEL;
                    break;
                case 'json':
                    endpoint = API_ENDPOINTS.ITINERARY.EXPORT_JSON;
                    break;
                default:
                    throw new Error('Invalid export format');
            }

            endpoint = endpoint.replace(':id', id);
            const response = await apiClient.post<{ downloadUrl: string; expiresAt: string }>(endpoint, options);
            return response;
        } catch (error) {
            throw new Error(`Failed to export itinerary: ${error}`);
        }
    }

    /**
     * Import itinerary
     */
    async importItinerary(data: ImportItineraryRequest): Promise<APIResponse<Itinerary | { errors: string[] }>> {
        try {
            const response = await apiClient.post<Itinerary | { errors: string[] }>(
                API_ENDPOINTS.ITINERARY.IMPORT,
                data
            );
            return response;
        } catch (error) {
            throw new Error(`Failed to import itinerary: ${error}`);
        }
    }

    /**
     * Validate import data
     */
    async validateImport(data: ImportItineraryRequest): Promise<APIResponse<{ valid: boolean; errors: string[]; warnings: string[] }>> {
        try {
            const response = await apiClient.post<{ valid: boolean; errors: string[]; warnings: string[] }>(
                API_ENDPOINTS.ITINERARY.VALIDATE_IMPORT,
                { ...data, validateOnly: true }
            );
            return response;
        } catch (error) {
            throw new Error(`Failed to validate import data: ${error}`);
        }
    }

    // ========================
    // Cost & Budget Management
    // ========================

    /**
     * Get cost breakdown
     */
    async getCostBreakdown(id: string, options?: CostBreakdownRequest): Promise<APIResponse<{
        totalCost: number;
        currency: Currency;
        breakdown: any;
        costPerPerson: number;
        costPerDay: number;
    }>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.GET_COST_BREAKDOWN.replace(':id', id);
            const response = await apiClient.post<{
                totalCost: number;
                currency: Currency;
                breakdown: any;
                costPerPerson: number;
                costPerDay: number;
            }>(endpoint, options);
            return response;
        } catch (error) {
            throw new Error(`Failed to get cost breakdown: ${error}`);
        }
    }

    /**
     * Update costs
     */
    async updateCosts(id: string, costs: { totalCost: number; currency: Currency; costPerPerson?: number }): Promise<APIResponse<Itinerary>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.UPDATE_COSTS.replace(':id', id);
            const response = await apiClient.put<Itinerary>(endpoint, costs);
            return response;
        } catch (error) {
            throw new Error(`Failed to update costs: ${error}`);
        }
    }

    /**
     * Calculate total cost
     */
    async calculateTotal(id: string): Promise<APIResponse<{ totalCost: number; currency: Currency; breakdown: any }>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.CALCULATE_TOTAL.replace(':id', id);
            const response = await apiClient.post<{ totalCost: number; currency: Currency; breakdown: any }>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to calculate total cost: ${error}`);
        }
    }

    /**
     * Get budget analysis
     */
    async getBudgetAnalysis(id: string): Promise<APIResponse<{
        currentCost: number;
        projectedCost: number;
        savings: number;
        recommendations: string[];
    }>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.GET_BUDGET_ANALYSIS.replace(':id', id);
            const response = await apiClient.get<{
                currentCost: number;
                projectedCost: number;
                savings: number;
                recommendations: string[];
            }>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to get budget analysis: ${error}`);
        }
    }

    // ========================
    // Statistics & Analytics
    // ========================

    /**
     * Get itinerary statistics
     */
    async getItineraryStats(): Promise<APIResponse<{
        totalItineraries: number;
        activeItineraries: number;
        averageDuration: number;
        averageCost: number;
        popularDestinations: { destination: string; count: number }[];
        popularActivities: { activity: string; count: number }[];
    }>> {
        try {
            const response = await apiClient.get<{
                totalItineraries: number;
                activeItineraries: number;
                averageDuration: number;
                averageCost: number;
                popularDestinations: { destination: string; count: number }[];
                popularActivities: { activity: string; count: number }[];
            }>(API_ENDPOINTS.ITINERARY.GET_STATS);
            return response;
        } catch (error) {
            throw new Error(`Failed to fetch itinerary statistics: ${error}`);
        }
    }

    /**
     * Get popular destinations
     */
    async getPopularDestinations(limit?: number): Promise<APIResponse<{ destination: string; count: number; averageDuration: number }[]>> {
        try {
            const params = limit ? { limit: limit.toString() } : undefined;
            const response = await apiClient.get<{ destination: string; count: number; averageDuration: number }[]>(
                API_ENDPOINTS.ITINERARY.GET_POPULAR_DESTINATIONS,
                params
            );
            return response;
        } catch (error) {
            throw new Error(`Failed to fetch popular destinations: ${error}`);
        }
    }

    /**
     * Get popular activities
     */
    async getPopularActivities(limit?: number): Promise<APIResponse<{ activity: string; count: number; averageCost: number }[]>> {
        try {
            const params = limit ? { limit: limit.toString() } : undefined;
            const response = await apiClient.get<{ activity: string; count: number; averageCost: number }[]>(
                API_ENDPOINTS.ITINERARY.GET_POPULAR_ACTIVITIES,
                params
            );
            return response;
        } catch (error) {
            throw new Error(`Failed to fetch popular activities: ${error}`);
        }
    }

    // ========================
    // Validation & Optimization
    // ========================

    /**
     * Validate itinerary
     */
    async validateItinerary(id: string): Promise<APIResponse<{
        valid: boolean;
        errors: string[];
        warnings: string[];
        suggestions: string[];
    }>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.VALIDATE.replace(':id', id);
            const response = await apiClient.post<{
                valid: boolean;
                errors: string[];
                warnings: string[];
                suggestions: string[];
            }>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to validate itinerary: ${error}`);
        }
    }

    /**
     * Optimize itinerary
     */
    async optimizeItinerary(id: string, options?: ScheduleOptimizationRequest): Promise<APIResponse<Itinerary>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.OPTIMIZE.replace(':id', id);
            const response = await apiClient.post<Itinerary>(endpoint, options);
            return response;
        } catch (error) {
            throw new Error(`Failed to optimize itinerary: ${error}`);
        }
    }

    /**
     * Get recommendations
     */
    async getRecommendations(id: string): Promise<APIResponse<{
        activities: any[];
        meals: any[];
        accommodations: any[];
        improvements: string[];
    }>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.GET_RECOMMENDATIONS.replace(':id', id);
            const response = await apiClient.get<{
                activities: any[];
                meals: any[];
                accommodations: any[];
                improvements: string[];
            }>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to get recommendations: ${error}`);
        }
    }

    /**
     * Check conflicts
     */
    async checkConflicts(id: string): Promise<APIResponse<{
        conflicts: any[];
        severity: 'low' | 'medium' | 'high';
        resolutions: string[];
    }>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.CHECK_CONFLICTS.replace(':id', id);
            const response = await apiClient.get<{
                conflicts: any[];
                severity: 'low' | 'medium' | 'high';
                resolutions: string[];
            }>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to check conflicts: ${error}`);
        }
    }

    // ========================
    // AI & Smart Features
    // ========================

    /**
     * AI suggest activities
     */
    async aiSuggestActivities(id: string, options?: AIRequest): Promise<APIResponse<ItineraryActivity[]>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.AI_SUGGEST_ACTIVITIES.replace(':id', id);
            const response = await apiClient.post<ItineraryActivity[]>(endpoint, options);
            return response;
        } catch (error) {
            throw new Error(`Failed to get AI activity suggestions: ${error}`);
        }
    }

    /**
     * AI optimize route
     */
    async aiOptimizeRoute(id: string, options?: AIRequest): Promise<APIResponse<Itinerary>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.AI_OPTIMIZE_ROUTE.replace(':id', id);
            const response = await apiClient.post<Itinerary>(endpoint, options);
            return response;
        } catch (error) {
            throw new Error(`Failed to optimize route with AI: ${error}`);
        }
    }

    /**
     * AI suggest meals
     */
    async aiSuggestMeals(id: string, options?: AIRequest): Promise<APIResponse<ItineraryMeal[]>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.AI_SUGGEST_MEALS.replace(':id', id);
            const response = await apiClient.post<ItineraryMeal[]>(endpoint, options);
            return response;
        } catch (error) {
            throw new Error(`Failed to get AI meal suggestions: ${error}`);
        }
    }

    /**
     * AI budget optimization
     */
    async aiBudgetOptimization(id: string, options?: AIRequest): Promise<APIResponse<{
        optimizedItinerary: Itinerary;
        savings: number;
        recommendations: string[];
    }>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.AI_BUDGET_OPTIMIZATION.replace(':id', id);
            const response = await apiClient.post<{
                optimizedItinerary: Itinerary;
                savings: number;
                recommendations: string[];
            }>(endpoint, options);
            return response;
        } catch (error) {
            throw new Error(`Failed to optimize budget with AI: ${error}`);
        }
    }

    /**
     * AI generate description
     */
    async aiGenerateDescription(id: string): Promise<APIResponse<{ description: string; highlights: string[] }>> {
        try {
            const endpoint = API_ENDPOINTS.ITINERARY.AI_GENERATE_DESCRIPTION.replace(':id', id);
            const response = await apiClient.post<{ description: string; highlights: string[] }>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to generate description with AI: ${error}`);
        }
    }

    // ========================
    // Bulk Operations
    // ========================

    /**
     * Bulk operations on itineraries
     */
    async bulkOperation(request: BulkOperationRequest): Promise<APIResponse<{ processed: number; failed: number; results: any[] }>> {
        try {
            let endpoint: string;
            switch (request.operation) {
                case 'delete':
                    endpoint = API_ENDPOINTS.ITINERARY.BULK_DELETE;
                    break;
                case 'duplicate':
                    endpoint = API_ENDPOINTS.ITINERARY.BULK_DUPLICATE;
                    break;
                case 'export':
                    endpoint = API_ENDPOINTS.ITINERARY.BULK_EXPORT;
                    break;
                case 'statusUpdate':
                    endpoint = API_ENDPOINTS.ITINERARY.BULK_UPDATE_STATUS;
                    break;
                case 'assign':
                    endpoint = API_ENDPOINTS.ITINERARY.BULK_ASSIGN;
                    break;
                default:
                    throw new Error('Invalid bulk operation');
            }

            const response = await apiClient.post<{ processed: number; failed: number; results: any[] }>(endpoint, request);
            return response;
        } catch (error) {
            throw new Error(`Failed to perform bulk operation: ${error}`);
        }
    }

    // ========================
    // Utility Methods
    // ========================

    /**
     * Build filter parameters for API requests
     */
    private buildFilterParams(filters: ItineraryFilters): Record<string, string> {
        const params: Record<string, string> = {};

        if (filters.status?.length) {
            params.status = filters.status.join(',');
        }
        if (filters.dateRange) {
            params.dateFrom = filters.dateRange.from;
            params.dateTo = filters.dateRange.to;
        }
        if (filters.duration) {
            params.durationMin = filters.duration.min.toString();
            params.durationMax = filters.duration.max.toString();
        }
        if (filters.cities?.length) {
            params.cities = filters.cities.join(',');
        }
        if (filters.priceRange) {
            params.priceMin = filters.priceRange.min.toString();
            params.priceMax = filters.priceRange.max.toString();
        }

        return params;
    }

    /**
     * Calculate total duration in hours
     */
    calculateTotalDuration(activities: ItineraryActivity[]): number {
        return activities.reduce((total, activity) => total + activity.duration, 0);
    }

    /**
     * Calculate distance between coordinates
     */
    calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
        const R = 6371; // Earth's radius in kilometers
        const dLat = this.toRadians(coord2.lat - coord1.lat);
        const dLng = this.toRadians(coord2.lng - coord1.lng);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRadians(coord1.lat)) * Math.cos(this.toRadians(coord2.lat)) *
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
     * Validate itinerary dates
     */
    validateDates(startDate: string, endDate: string): boolean {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return start <= end;
    }

    /**
     * Generate itinerary slug
     */
    generateSlug(title: string): string {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
}

// Export singleton instance
export const itineraryService = new ItineraryService();