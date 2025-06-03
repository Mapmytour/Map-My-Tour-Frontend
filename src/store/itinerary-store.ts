import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
    Itinerary,
    ItineraryDay,
    ItineraryActivity,
    ItineraryMeal,
    ItineraryAccommodation,
    NearbyPlace,
    Participant,
    ItineraryFilters,
    ItineraryStatus,
} from '@/types/itinerary';

interface ItineraryState {
    // State
    itineraries: Itinerary[];
    selectedItinerary: Itinerary | null;
    filteredItineraries: Itinerary[];
    itineraryDays: ItineraryDay[];
    participants: Participant[];
    popularDestinations: { destination: string; count: number; averageDuration: number }[];
    popularActivities: { activity: string; count: number; averageCost: number }[];
    itineraryStats: {
        totalItineraries: number;
        activeItineraries: number;
        averageDuration: number;
        averageCost: number;
        popularDestinations: { destination: string; count: number }[];
        popularActivities: { activity: string; count: number }[];
    } | null;

    // Loading States
    isLoading: boolean;
    itinerariesLoading: boolean;
    searchLoading: boolean;
    daysLoading: boolean;
    activitiesLoading: boolean;
    participantsLoading: boolean;
    exportLoading: boolean;
    optimizationLoading: boolean;
    aiLoading: boolean;

    // Error States
    error: string | null;
    itinerariesError: string | null;
    searchError: string | null;
    daysError: string | null;
    activitiesError: string | null;
    participantsError: string | null;
    exportError: string | null;
    optimizationError: string | null;
    aiError: string | null;

    // Search & Filter State
    searchQuery: string;
    selectedFilters: ItineraryFilters;

    // Cache timestamps
    lastItinerariesUpdate: number | null;
    lastStatsUpdate: number | null;
    lastPopularDestinationsUpdate: number | null;
    lastPopularActivitiesUpdate: number | null;
    lastDaysUpdate: number | null;
    lastParticipantsUpdate: number | null;

    // Actions
    // Basic CRUD Actions
    setItineraries: (itineraries: Itinerary[]) => void;
    addItinerary: (itinerary: Itinerary) => void;
    updateItinerary: (itinerary: Itinerary) => void;
    removeItinerary: (id: string) => void;
    setSelectedItinerary: (itinerary: Itinerary | null) => void;
    setFilteredItineraries: (itineraries: Itinerary[]) => void;

    // Day & Content Actions
    setItineraryDays: (days: ItineraryDay[]) => void;
    addItineraryDay: (day: ItineraryDay) => void;
    updateItineraryDay: (day: ItineraryDay) => void;
    removeItineraryDay: (dayNumber: number) => void;

    // Participant Actions
    setParticipants: (participants: Participant[]) => void;
    addParticipant: (participant: Participant) => void;
    updateParticipant: (participant: Participant) => void;
    removeParticipant: (participantId: string) => void;

    // Analytics Actions
    setPopularDestinations: (destinations: { destination: string; count: number; averageDuration: number }[]) => void;
    setPopularActivities: (activities: { activity: string; count: number; averageCost: number }[]) => void;
    setItineraryStats: (stats: {
        totalItineraries: number;
        activeItineraries: number;
        averageDuration: number;
        averageCost: number;
        popularDestinations: { destination: string; count: number }[];
        popularActivities: { activity: string; count: number }[];
    }) => void;

    // Loading Actions
    setLoading: (loading: boolean) => void;
    setItinerariesLoading: (loading: boolean) => void;
    setSearchLoading: (loading: boolean) => void;
    setDaysLoading: (loading: boolean) => void;
    setActivitiesLoading: (loading: boolean) => void;
    setParticipantsLoading: (loading: boolean) => void;
    setExportLoading: (loading: boolean) => void;
    setOptimizationLoading: (loading: boolean) => void;
    setAiLoading: (loading: boolean) => void;

    // Error Actions
    setError: (error: string | null) => void;
    setItinerariesError: (error: string | null) => void;
    setSearchError: (error: string | null) => void;
    setDaysError: (error: string | null) => void;
    setActivitiesError: (error: string | null) => void;
    setParticipantsError: (error: string | null) => void;
    setExportError: (error: string | null) => void;
    setOptimizationError: (error: string | null) => void;
    setAiError: (error: string | null) => void;

    // Search & Filter Actions
    setSearchQuery: (query: string) => void;
    setSelectedFilters: (filters: ItineraryFilters) => void;
    updateFilteredItineraries: () => void;

    // Utility Actions
    clearAllData: () => void;
    clearErrors: () => void;
    updateCacheTimestamp: (type: 'itineraries' | 'stats' | 'popularDestinations' | 'popularActivities' | 'days' | 'participants') => void;
    isCacheValid: (type: 'itineraries' | 'stats' | 'popularDestinations' | 'popularActivities' | 'days' | 'participants', maxAge?: number) => boolean;
}

export const useItineraryStore = create<ItineraryState>()(
    persist(
        (set, get) => ({
            // Initial State
            itineraries: [],
            selectedItinerary: null,
            filteredItineraries: [],
            itineraryDays: [],
            participants: [],
            popularDestinations: [],
            popularActivities: [],
            itineraryStats: null,

            // Loading States
            isLoading: false,
            itinerariesLoading: false,
            searchLoading: false,
            daysLoading: false,
            activitiesLoading: false,
            participantsLoading: false,
            exportLoading: false,
            optimizationLoading: false,
            aiLoading: false,

            // Error States
            error: null,
            itinerariesError: null,
            searchError: null,
            daysError: null,
            activitiesError: null,
            participantsError: null,
            exportError: null,
            optimizationError: null,
            aiError: null,

            // Search & Filter State
            searchQuery: '',
            selectedFilters: {},

            // Cache timestamps
            lastItinerariesUpdate: null,
            lastStatsUpdate: null,
            lastPopularDestinationsUpdate: null,
            lastPopularActivitiesUpdate: null,
            lastDaysUpdate: null,
            lastParticipantsUpdate: null,

            // Actions
            // Basic CRUD Actions
            setItineraries: (itineraries: Itinerary[]) => {
                set({ itineraries, itinerariesError: null });
                get().updateFilteredItineraries();
            },

            addItinerary: (itinerary: Itinerary) => {
                const currentItineraries = get().itineraries;
                set({ itineraries: [...currentItineraries, itinerary] });
                get().updateFilteredItineraries();
            },

            updateItinerary: (updatedItinerary: Itinerary) => {
                const currentItineraries = get().itineraries;
                const updatedItineraries = currentItineraries.map(itinerary =>
                    itinerary.id === updatedItinerary.id ? updatedItinerary : itinerary
                );
                set({ itineraries: updatedItineraries });
                get().updateFilteredItineraries();

                // Update selected itinerary if it's the one being updated
                if (get().selectedItinerary?.id === updatedItinerary.id) {
                    set({ selectedItinerary: updatedItinerary });
                }
            },

            removeItinerary: (id: string) => {
                const currentItineraries = get().itineraries;
                const updatedItineraries = currentItineraries.filter(itinerary => itinerary.id !== id);
                set({ itineraries: updatedItineraries });
                get().updateFilteredItineraries();

                // Clear selected itinerary if it's the one being removed
                if (get().selectedItinerary?.id === id) {
                    set({ selectedItinerary: null });
                }
            },

            setSelectedItinerary: (itinerary: Itinerary | null) => {
                set({ selectedItinerary: itinerary });
            },

            setFilteredItineraries: (itineraries: Itinerary[]) => {
                set({ filteredItineraries: itineraries });
            },

            // Day & Content Actions
            setItineraryDays: (days: ItineraryDay[]) => {
                set({ itineraryDays: days, daysError: null });
            },

            addItineraryDay: (day: ItineraryDay) => {
                const currentDays = get().itineraryDays;
                set({ itineraryDays: [...currentDays, day].sort((a, b) => a.day - b.day) });
            },

            updateItineraryDay: (updatedDay: ItineraryDay) => {
                const currentDays = get().itineraryDays;
                const updatedDays = currentDays.map(day =>
                    day.day === updatedDay.day ? updatedDay : day
                );
                set({ itineraryDays: updatedDays });
            },

            removeItineraryDay: (dayNumber: number) => {
                const currentDays = get().itineraryDays;
                const updatedDays = currentDays.filter(day => day.day !== dayNumber);
                set({ itineraryDays: updatedDays });
            },

            // Participant Actions
            setParticipants: (participants: Participant[]) => {
                set({ participants, participantsError: null });
            },

            addParticipant: (participant: Participant) => {
                const currentParticipants = get().participants;
                set({ participants: [...currentParticipants, participant] });
            },

            updateParticipant: (updatedParticipant: Participant) => {
                const currentParticipants = get().participants;
                const updatedParticipants = currentParticipants.map(participant =>
                    participant.fullName === updatedParticipant.fullName ? updatedParticipant : participant
                );
                set({ participants: updatedParticipants });
            },

            removeParticipant: (participantId: string) => {
                const currentParticipants = get().participants;
                const updatedParticipants = currentParticipants.filter(participant =>
                    participant.fullName !== participantId
                );
                set({ participants: updatedParticipants });
            },

            // Analytics Actions
            setPopularDestinations: (destinations: { destination: string; count: number; averageDuration: number }[]) => {
                set({ popularDestinations: destinations });
            },

            setPopularActivities: (activities: { activity: string; count: number; averageCost: number }[]) => {
                set({ popularActivities: activities });
            },

            setItineraryStats: (stats: {
                totalItineraries: number;
                activeItineraries: number;
                averageDuration: number;
                averageCost: number;
                popularDestinations: { destination: string; count: number }[];
                popularActivities: { activity: string; count: number }[];
            }) => {
                set({ itineraryStats: stats });
            },

            // Loading Actions
            setLoading: (loading: boolean) => {
                set({ isLoading: loading });
            },

            setItinerariesLoading: (loading: boolean) => {
                set({ itinerariesLoading: loading });
                if (!loading) set({ itinerariesError: null });
            },

            setSearchLoading: (loading: boolean) => {
                set({ searchLoading: loading });
                if (!loading) set({ searchError: null });
            },

            setDaysLoading: (loading: boolean) => {
                set({ daysLoading: loading });
                if (!loading) set({ daysError: null });
            },

            setActivitiesLoading: (loading: boolean) => {
                set({ activitiesLoading: loading });
                if (!loading) set({ activitiesError: null });
            },

            setParticipantsLoading: (loading: boolean) => {
                set({ participantsLoading: loading });
                if (!loading) set({ participantsError: null });
            },

            setExportLoading: (loading: boolean) => {
                set({ exportLoading: loading });
                if (!loading) set({ exportError: null });
            },

            setOptimizationLoading: (loading: boolean) => {
                set({ optimizationLoading: loading });
                if (!loading) set({ optimizationError: null });
            },

            setAiLoading: (loading: boolean) => {
                set({ aiLoading: loading });
                if (!loading) set({ aiError: null });
            },

            // Error Actions
            setError: (error: string | null) => {
                set({ error, isLoading: false });
            },

            setItinerariesError: (error: string | null) => {
                set({ itinerariesError: error, itinerariesLoading: false });
            },

            setSearchError: (error: string | null) => {
                set({ searchError: error, searchLoading: false });
            },

            setDaysError: (error: string | null) => {
                set({ daysError: error, daysLoading: false });
            },

            setActivitiesError: (error: string | null) => {
                set({ activitiesError: error, activitiesLoading: false });
            },

            setParticipantsError: (error: string | null) => {
                set({ participantsError: error, participantsLoading: false });
            },

            setExportError: (error: string | null) => {
                set({ exportError: error, exportLoading: false });
            },

            setOptimizationError: (error: string | null) => {
                set({ optimizationError: error, optimizationLoading: false });
            },

            setAiError: (error: string | null) => {
                set({ aiError: error, aiLoading: false });
            },

            // Search & Filter Actions
            setSearchQuery: (query: string) => {
                set({ searchQuery: query });
                get().updateFilteredItineraries();
            },

            setSelectedFilters: (filters: ItineraryFilters) => {
                set({ selectedFilters: filters });
                get().updateFilteredItineraries();
            },

            updateFilteredItineraries: () => {
                const { itineraries, searchQuery, selectedFilters } = get();

                let filtered = itineraries;

                // Filter by search query
                if (searchQuery.trim()) {
                    const query = searchQuery.toLowerCase();
                    filtered = filtered.filter(itinerary =>
                        itinerary.title.toLowerCase().includes(query) ||
                        itinerary.description.toLowerCase().includes(query) ||
                        itinerary.days.some(day =>
                            day.title.toLowerCase().includes(query) ||
                            day.city.toLowerCase().includes(query) ||
                            day.activities.some(activity =>
                                activity.name.toLowerCase().includes(query) ||
                                activity.description.toLowerCase().includes(query)
                            )
                        ) ||
                        itinerary.participants.some(participant =>
                            participant.fullName.toLowerCase().includes(query)
                        )
                    );
                }

                // Apply filters
                if (selectedFilters.status?.length) {
                    filtered = filtered.filter(itinerary =>
                        selectedFilters.status!.includes(itinerary.status)
                    );
                }

                if (selectedFilters.dateRange) {
                    const fromDate = new Date(selectedFilters.dateRange.from);
                    const toDate = new Date(selectedFilters.dateRange.to);
                    filtered = filtered.filter(itinerary => {
                        if (!itinerary.startDate || !itinerary.endDate) return true;
                        const startDate = new Date(itinerary.startDate);
                        const endDate = new Date(itinerary.endDate);
                        return startDate >= fromDate && endDate <= toDate;
                    });
                }

                if (selectedFilters.duration) {
                    const { min, max } = selectedFilters.duration;
                    filtered = filtered.filter(itinerary =>
                        itinerary.totalDays >= min && itinerary.totalDays <= max
                    );
                }

                if (selectedFilters.cities?.length) {
                    filtered = filtered.filter(itinerary =>
                        selectedFilters.cities!.some(city =>
                            itinerary.days.some(day =>
                                day.city.toLowerCase().includes(city.toLowerCase())
                            )
                        )
                    );
                }

                if (selectedFilters.priceRange) {
                    const { min, max } = selectedFilters.priceRange;
                    filtered = filtered.filter(itinerary =>
                        itinerary.totalCost >= min && itinerary.totalCost <= max
                    );
                }

                set({ filteredItineraries: filtered });
            },

            // Utility Actions
            clearAllData: () => {
                set({
                    itineraries: [],
                    selectedItinerary: null,
                    filteredItineraries: [],
                    itineraryDays: [],
                    participants: [],
                    popularDestinations: [],
                    popularActivities: [],
                    itineraryStats: null,
                    searchQuery: '',
                    selectedFilters: {},
                    lastItinerariesUpdate: null,
                    lastStatsUpdate: null,
                    lastPopularDestinationsUpdate: null,
                    lastPopularActivitiesUpdate: null,
                    lastDaysUpdate: null,
                    lastParticipantsUpdate: null,
                });
            },

            clearErrors: () => {
                set({
                    error: null,
                    itinerariesError: null,
                    searchError: null,
                    daysError: null,
                    activitiesError: null,
                    participantsError: null,
                    exportError: null,
                    optimizationError: null,
                    aiError: null,
                });
            },

            updateCacheTimestamp: (type: 'itineraries' | 'stats' | 'popularDestinations' | 'popularActivities' | 'days' | 'participants') => {
                const timestamp = Date.now();
                if (type === 'itineraries') {
                    set({ lastItinerariesUpdate: timestamp });
                } else if (type === 'stats') {
                    set({ lastStatsUpdate: timestamp });
                } else if (type === 'popularDestinations') {
                    set({ lastPopularDestinationsUpdate: timestamp });
                } else if (type === 'popularActivities') {
                    set({ lastPopularActivitiesUpdate: timestamp });
                } else if (type === 'days') {
                    set({ lastDaysUpdate: timestamp });
                } else if (type === 'participants') {
                    set({ lastParticipantsUpdate: timestamp });
                }
            },

            isCacheValid: (type: 'itineraries' | 'stats' | 'popularDestinations' | 'popularActivities' | 'days' | 'participants', maxAge: number = 5 * 60 * 1000) => {
                const state = get();
                let lastUpdate: number | null = null;

                if (type === 'itineraries') {
                    lastUpdate = state.lastItinerariesUpdate;
                } else if (type === 'stats') {
                    lastUpdate = state.lastStatsUpdate;
                } else if (type === 'popularDestinations') {
                    lastUpdate = state.lastPopularDestinationsUpdate;
                } else if (type === 'popularActivities') {
                    lastUpdate = state.lastPopularActivitiesUpdate;
                } else if (type === 'days') {
                    lastUpdate = state.lastDaysUpdate;
                } else if (type === 'participants') {
                    lastUpdate = state.lastParticipantsUpdate;
                }

                if (!lastUpdate) return false;

                return Date.now() - lastUpdate < maxAge;
            },
        }),
        {
            name: 'itinerary-storage',
            storage: createJSONStorage(() => ({
                getItem: (name: string) => {
                    if (typeof window !== 'undefined') {
                        return window.sessionStorage.getItem(name);
                    }
                    return null;
                },
                setItem: (name: string, value: string) => {
                    if (typeof window !== 'undefined') {
                        window.sessionStorage.setItem(name, value);
                    }
                },
                removeItem: (name: string) => {
                    if (typeof window !== 'undefined') {
                        window.sessionStorage.removeItem(name);
                    }
                },
            })),
            partialize: (state) => ({
                itineraries: state.itineraries,
                popularDestinations: state.popularDestinations,
                popularActivities: state.popularActivities,
                itineraryStats: state.itineraryStats,
                lastItinerariesUpdate: state.lastItinerariesUpdate,
                lastStatsUpdate: state.lastStatsUpdate,
                lastPopularDestinationsUpdate: state.lastPopularDestinationsUpdate,
                lastPopularActivitiesUpdate: state.lastPopularActivitiesUpdate,
                lastDaysUpdate: state.lastDaysUpdate,
                lastParticipantsUpdate: state.lastParticipantsUpdate,
            }),
        }
    )
);