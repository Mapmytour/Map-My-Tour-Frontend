import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  Destination,
  DestinationImage,
  DestinationStats,
  DestinationFilters,
  SeasonalTrend,
} from '@/types/destination';

interface DestinationState {
  // State
  destinations: Destination[];
  selectedDestination: Destination | null;
  filteredDestinations: Destination[];
  popularDestinations: Destination[];
  featuredDestinations: Destination[];
  countries: string[];
  regions: string[];
  climates: string[];
  safetyLevels: string[];
  destinationStats: DestinationStats | null;
  
  // Loading States
  isLoading: boolean;
  destinationsLoading: boolean;
  searchLoading: boolean;
  toursLoading: boolean;
  activitiesLoading: boolean;
  statsLoading: boolean;
  
  // Error States
  error: string | null;
  destinationsError: string | null;
  searchError: string | null;
  toursError: string | null;
  activitiesError: string | null;
  statsError: string | null;
  
  // Search & Filter State
  searchQuery: string;
  selectedFilters: DestinationFilters;
  
  // Cache timestamps
  lastDestinationsUpdate: number | null;
  lastPopularUpdate: number | null;
  lastFeaturedUpdate: number | null;
  lastCountriesUpdate: number | null;
  lastRegionsUpdate: number | null;
  lastClimatesUpdate: number | null;
  lastSafetyLevelsUpdate: number | null;
  
  // Actions
  // Basic CRUD Actions
  setDestinations: (destinations: Destination[]) => void;
  addDestination: (destination: Destination) => void;
  updateDestination: (destination: Destination) => void;
  removeDestination: (id: string) => void;
  setSelectedDestination: (destination: Destination | null) => void;
  setFilteredDestinations: (destinations: Destination[]) => void;
  
  // Metadata Actions
  setPopularDestinations: (destinations: Destination[]) => void;
  setFeaturedDestinations: (destinations: Destination[]) => void;
  setCountries: (countries: string[]) => void;
  setRegions: (regions: string[]) => void;
  setClimates: (climates: string[]) => void;
  setSafetyLevels: (levels: string[]) => void;
  setDestinationStats: (stats: DestinationStats) => void;
  
  // Loading Actions
  setLoading: (loading: boolean) => void;
  setDestinationsLoading: (loading: boolean) => void;
  setSearchLoading: (loading: boolean) => void;
  setToursLoading: (loading: boolean) => void;
  setActivitiesLoading: (loading: boolean) => void;
  setStatsLoading: (loading: boolean) => void;
  
  // Error Actions
  setError: (error: string | null) => void;
  setDestinationsError: (error: string | null) => void;
  setSearchError: (error: string | null) => void;
  setToursError: (error: string | null) => void;
  setActivitiesError: (error: string | null) => void;
  setStatsError: (error: string | null) => void;
  
  // Search & Filter Actions
  setSearchQuery: (query: string) => void;
  setSelectedFilters: (filters: DestinationFilters) => void;
  updateFilteredDestinations: () => void;
  
  // Utility Actions
  clearAllData: () => void;
  clearErrors: () => void;
  updateCacheTimestamp: (type: 'destinations' | 'popular' | 'featured' | 'countries' | 'regions' | 'climates' | 'safetyLevels') => void;
  isCacheValid: (type: 'destinations' | 'popular' | 'featured' | 'countries' | 'regions' | 'climates' | 'safetyLevels', maxAge?: number) => boolean;
}

export const useDestinationStore = create<DestinationState>()(
  persist(
    (set, get) => ({
      // Initial State
      destinations: [],
      selectedDestination: null,
      filteredDestinations: [],
      popularDestinations: [],
      featuredDestinations: [],
      countries: [],
      regions: [],
      climates: [],
      safetyLevels: [],
      destinationStats: null,
      
      // Loading States
      isLoading: false,
      destinationsLoading: false,
      searchLoading: false,
      toursLoading: false,
      activitiesLoading: false,
      statsLoading: false,
      
      // Error States
      error: null,
      destinationsError: null,
      searchError: null,
      toursError: null,
      activitiesError: null,
      statsError: null,
      
      // Search & Filter State
      searchQuery: '',
      selectedFilters: {
        countries: [],
        climates: [],
        safetyLevels: [],
      },
      
      // Cache timestamps
      lastDestinationsUpdate: null,
      lastPopularUpdate: null,
      lastFeaturedUpdate: null,
      lastCountriesUpdate: null,
      lastRegionsUpdate: null,
      lastClimatesUpdate: null,
      lastSafetyLevelsUpdate: null,

      // Actions
      // Basic CRUD Actions
      setDestinations: (destinations: Destination[]) => {
        set({ destinations, destinationsError: null });
        get().updateFilteredDestinations();
      },

      addDestination: (destination: Destination) => {
        const currentDestinations = get().destinations;
        set({ destinations: [...currentDestinations, destination] });
        get().updateFilteredDestinations();
      },

      updateDestination: (updatedDestination: Destination) => {
        const currentDestinations = get().destinations;
        const updatedDestinations = currentDestinations.map(destination => 
          destination.id === updatedDestination.id ? updatedDestination : destination
        );
        set({ destinations: updatedDestinations });
        get().updateFilteredDestinations();
        
        // Update selected destination if it's the one being updated
        if (get().selectedDestination?.id === updatedDestination.id) {
          set({ selectedDestination: updatedDestination });
        }
      },

      removeDestination: (id: string) => {
        const currentDestinations = get().destinations;
        const updatedDestinations = currentDestinations.filter(destination => destination.id !== id);
        set({ destinations: updatedDestinations });
        get().updateFilteredDestinations();
        
        // Clear selected destination if it's the one being removed
        if (get().selectedDestination?.id === id) {
          set({ selectedDestination: null });
        }
      },

      setSelectedDestination: (destination: Destination | null) => {
        set({ selectedDestination: destination });
      },

      setFilteredDestinations: (destinations: Destination[]) => {
        set({ filteredDestinations: destinations });
      },

      // Metadata Actions
      setPopularDestinations: (destinations: Destination[]) => {
        set({ popularDestinations: destinations });
      },

      setFeaturedDestinations: (destinations: Destination[]) => {
        set({ featuredDestinations: destinations });
      },

      setCountries: (countries: string[]) => {
        set({ countries });
      },

      setRegions: (regions: string[]) => {
        set({ regions });
      },

      setClimates: (climates: string[]) => {
        set({ climates });
      },

      setSafetyLevels: (levels: string[]) => {
        set({ safetyLevels: levels });
      },

      setDestinationStats: (stats: DestinationStats) => {
        set({ destinationStats: stats });
      },

      // Loading Actions
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setDestinationsLoading: (loading: boolean) => {
        set({ destinationsLoading: loading });
        if (!loading) set({ destinationsError: null });
      },

      setSearchLoading: (loading: boolean) => {
        set({ searchLoading: loading });
        if (!loading) set({ searchError: null });
      },

      setToursLoading: (loading: boolean) => {
        set({ toursLoading: loading });
        if (!loading) set({ toursError: null });
      },

      setActivitiesLoading: (loading: boolean) => {
        set({ activitiesLoading: loading });
        if (!loading) set({ activitiesError: null });
      },

      setStatsLoading: (loading: boolean) => {
        set({ statsLoading: loading });
        if (!loading) set({ statsError: null });
      },

      // Error Actions
      setError: (error: string | null) => {
        set({ error, isLoading: false });
      },

      setDestinationsError: (error: string | null) => {
        set({ destinationsError: error, destinationsLoading: false });
      },

      setSearchError: (error: string | null) => {
        set({ searchError: error, searchLoading: false });
      },

      setToursError: (error: string | null) => {
        set({ toursError: error, toursLoading: false });
      },

      setActivitiesError: (error: string | null) => {
        set({ activitiesError: error, activitiesLoading: false });
      },

      setStatsError: (error: string | null) => {
        set({ statsError: error, statsLoading: false });
      },

      // Search & Filter Actions
      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
        get().updateFilteredDestinations();
      },

      setSelectedFilters: (filters: DestinationFilters) => {
        set({ selectedFilters: filters });
        get().updateFilteredDestinations();
      },

      updateFilteredDestinations: () => {
        const { destinations, searchQuery, selectedFilters } = get();
        
        let filtered = destinations;
        
        // Filter by search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(destination => 
            destination.name.toLowerCase().includes(query) ||
            destination.country.toLowerCase().includes(query) ||
            destination.state?.toLowerCase().includes(query) ||
            destination.region?.toLowerCase().includes(query) ||
            destination.description.toLowerCase().includes(query)
          );
        }
        
        // Apply filters
        if (selectedFilters.countries?.length > 0) {
          filtered = filtered.filter(destination => 
            selectedFilters.countries!.includes(destination.country)
          );
        }
        
        if (selectedFilters.climates?.length > 0) {
          filtered = filtered.filter(destination => 
            selectedFilters.climates!.includes(destination.climate)
          );
        }
        
        if (selectedFilters.safetyLevels?.length > 0) {
          filtered = filtered.filter(destination => 
            selectedFilters.safetyLevels!.includes(destination.safetyLevel)
          );
        }
        
        if (selectedFilters.visaRequired !== undefined) {
          filtered = filtered.filter(destination => destination.visaRequired === selectedFilters.visaRequired);
        }
        
        if (selectedFilters.featured !== undefined) {
          filtered = filtered.filter(destination => destination.featured === selectedFilters.featured);
        }
        
        if (selectedFilters.hasActiveTours !== undefined) {
          filtered = filtered.filter(destination => {
            const hasActiveTours = destination.tourCount > 0 && destination.status === 'active';
            return hasActiveTours === selectedFilters.hasActiveTours;
          });
        }
        
        set({ filteredDestinations: filtered });
      },

      // Utility Actions
      clearAllData: () => {
        set({
          destinations: [],
          selectedDestination: null,
          filteredDestinations: [],
          popularDestinations: [],
          featuredDestinations: [],
          countries: [],
          regions: [],
          climates: [],
          safetyLevels: [],
          destinationStats: null,
          searchQuery: '',
          selectedFilters: {
            countries: [],
            climates: [],
            safetyLevels: [],
          },
          lastDestinationsUpdate: null,
          lastPopularUpdate: null,
          lastFeaturedUpdate: null,
          lastCountriesUpdate: null,
          lastRegionsUpdate: null,
          lastClimatesUpdate: null,
          lastSafetyLevelsUpdate: null,
        });
      },

      clearErrors: () => {
        set({
          error: null,
          destinationsError: null,
          searchError: null,
          toursError: null,
          activitiesError: null,
          statsError: null,
        });
      },

      updateCacheTimestamp: (type: 'destinations' | 'popular' | 'featured' | 'countries' | 'regions' | 'climates' | 'safetyLevels') => {
        const timestamp = Date.now();
        if (type === 'destinations') {
          set({ lastDestinationsUpdate: timestamp });
        } else if (type === 'popular') {
          set({ lastPopularUpdate: timestamp });
        } else if (type === 'featured') {
          set({ lastFeaturedUpdate: timestamp });
        } else if (type === 'countries') {
          set({ lastCountriesUpdate: timestamp });
        } else if (type === 'regions') {
          set({ lastRegionsUpdate: timestamp });
        } else if (type === 'climates') {
          set({ lastClimatesUpdate: timestamp });
        } else if (type === 'safetyLevels') {
          set({ lastSafetyLevelsUpdate: timestamp });
        }
      },

      isCacheValid: (type: 'destinations' | 'popular' | 'featured' | 'countries' | 'regions' | 'climates' | 'safetyLevels', maxAge: number = 5 * 60 * 1000) => {
        const state = get();
        let lastUpdate: number | null = null;
        
        if (type === 'destinations') {
          lastUpdate = state.lastDestinationsUpdate;
        } else if (type === 'popular') {
          lastUpdate = state.lastPopularUpdate;
        } else if (type === 'featured') {
          lastUpdate = state.lastFeaturedUpdate;
        } else if (type === 'countries') {
          lastUpdate = state.lastCountriesUpdate;
        } else if (type === 'regions') {
          lastUpdate = state.lastRegionsUpdate;
        } else if (type === 'climates') {
          lastUpdate = state.lastClimatesUpdate;
        } else if (type === 'safetyLevels') {
          lastUpdate = state.lastSafetyLevelsUpdate;
        }
        
        if (!lastUpdate) return false;
        
        return Date.now() - lastUpdate < maxAge;
      },
    }),
    {
      name: 'destination-storage',
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
        destinations: state.destinations,
        popularDestinations: state.popularDestinations,
        featuredDestinations: state.featuredDestinations,
        countries: state.countries,
        regions: state.regions,
        climates: state.climates,
        safetyLevels: state.safetyLevels,
        lastDestinationsUpdate: state.lastDestinationsUpdate,
        lastPopularUpdate: state.lastPopularUpdate,
        lastFeaturedUpdate: state.lastFeaturedUpdate,
        lastCountriesUpdate: state.lastCountriesUpdate,
        lastRegionsUpdate: state.lastRegionsUpdate,
        lastClimatesUpdate: state.lastClimatesUpdate,
        lastSafetyLevelsUpdate: state.lastSafetyLevelsUpdate,
      }),
    }
  )
);