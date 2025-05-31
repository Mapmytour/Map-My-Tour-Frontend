import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  Activity,
  ActivityImage,
  ActivityAvailability,
  TimeSlot,
} from '@/types/activities';

interface ActivityFilters {
  category?: string;
  type?: string;
  difficulty?: string;
  physicalRequirement?: string;
  location?: string;
  priceRange?: [number, number];
  duration?: string;
  weatherDependent?: boolean;
  safetyLevel?: string;
  status?: string;
  groupSizeMin?: number;
  groupSizeMax?: number;
  indoorOnly?: boolean;
  featured?: boolean;
  rating?: number;
}

interface ActivitiesState {
  // State
  activities: Activity[];
  selectedActivity: Activity | null;
  filteredActivities: Activity[];
  categories: string[];
  types: string[];
  difficulties: string[];
  popularActivities: Activity[];
  featuredActivities: Activity[];
  
  // Loading States
  isLoading: boolean;
  activitiesLoading: boolean;
  searchLoading: boolean;
  availabilityLoading: boolean;
  reviewsLoading: boolean;
  
  // Error States
  error: string | null;
  activitiesError: string | null;
  searchError: string | null;
  availabilityError: string | null;
  reviewsError: string | null;
  
  // Search & Filter State
  searchQuery: string;
  selectedFilters: ActivityFilters;
  
  // Cache timestamps
  lastActivitiesUpdate: number | null;
  lastCategoriesUpdate: number | null;
  lastTypesUpdate: number | null;
  lastDifficultiesUpdate: number | null;
  lastPopularUpdate: number | null;
  lastFeaturedUpdate: number | null;
  
  // Actions
  // Basic CRUD Actions
  setActivities: (activities: Activity[]) => void;
  addActivity: (activity: Activity) => void;
  updateActivity: (activity: Activity) => void;
  removeActivity: (id: string) => void;
  setSelectedActivity: (activity: Activity | null) => void;
  setFilteredActivities: (activities: Activity[]) => void;
  
  // Metadata Actions
  setCategories: (categories: string[]) => void;
  setTypes: (types: string[]) => void;
  setDifficulties: (difficulties: string[]) => void;
  setPopularActivities: (activities: Activity[]) => void;
  setFeaturedActivities: (activities: Activity[]) => void;
  
  // Loading Actions
  setLoading: (loading: boolean) => void;
  setActivitiesLoading: (loading: boolean) => void;
  setSearchLoading: (loading: boolean) => void;
  setAvailabilityLoading: (loading: boolean) => void;
  setReviewsLoading: (loading: boolean) => void;
  
  // Error Actions
  setError: (error: string | null) => void;
  setActivitiesError: (error: string | null) => void;
  setSearchError: (error: string | null) => void;
  setAvailabilityError: (error: string | null) => void;
  setReviewsError: (error: string | null) => void;
  
  // Search & Filter Actions
  setSearchQuery: (query: string) => void;
  setSelectedFilters: (filters: ActivityFilters) => void;
  updateFilteredActivities: () => void;
  
  // Utility Actions
  clearAllData: () => void;
  clearErrors: () => void;
  updateCacheTimestamp: (type: 'activities' | 'categories' | 'types' | 'difficulties' | 'popular' | 'featured') => void;
  isCacheValid: (type: 'activities' | 'categories' | 'types' | 'difficulties' | 'popular' | 'featured', maxAge?: number) => boolean;
}

export const useActivitiesStore = create<ActivitiesState>()(
  persist(
    (set, get) => ({
      // Initial State
      activities: [],
      selectedActivity: null,
      filteredActivities: [],
      categories: [],
      types: [],
      difficulties: [],
      popularActivities: [],
      featuredActivities: [],
      
      // Loading States
      isLoading: false,
      activitiesLoading: false,
      searchLoading: false,
      availabilityLoading: false,
      reviewsLoading: false,
      
      // Error States
      error: null,
      activitiesError: null,
      searchError: null,
      availabilityError: null,
      reviewsError: null,
      
      // Search & Filter State
      searchQuery: '',
      selectedFilters: {},
      
      // Cache timestamps
      lastActivitiesUpdate: null,
      lastCategoriesUpdate: null,
      lastTypesUpdate: null,
      lastDifficultiesUpdate: null,
      lastPopularUpdate: null,
      lastFeaturedUpdate: null,

      // Actions
      // Basic CRUD Actions
      setActivities: (activities: Activity[]) => {
        set({ activities, activitiesError: null });
        get().updateFilteredActivities();
      },

      addActivity: (activity: Activity) => {
        const currentActivities = get().activities;
        set({ activities: [...currentActivities, activity] });
        get().updateFilteredActivities();
      },

      updateActivity: (updatedActivity: Activity) => {
        const currentActivities = get().activities;
        const updatedActivities = currentActivities.map(activity => 
          activity.id === updatedActivity.id ? updatedActivity : activity
        );
        set({ activities: updatedActivities });
        get().updateFilteredActivities();
        
        // Update selected activity if it's the one being updated
        if (get().selectedActivity?.id === updatedActivity.id) {
          set({ selectedActivity: updatedActivity });
        }
      },

      removeActivity: (id: string) => {
        const currentActivities = get().activities;
        const updatedActivities = currentActivities.filter(activity => activity.id !== id);
        set({ activities: updatedActivities });
        get().updateFilteredActivities();
        
        // Clear selected activity if it's the one being removed
        if (get().selectedActivity?.id === id) {
          set({ selectedActivity: null });
        }
      },

      setSelectedActivity: (activity: Activity | null) => {
        set({ selectedActivity: activity });
      },

      setFilteredActivities: (activities: Activity[]) => {
        set({ filteredActivities: activities });
      },

      // Metadata Actions
      setCategories: (categories: string[]) => {
        set({ categories });
      },

      setTypes: (types: string[]) => {
        set({ types });
      },

      setDifficulties: (difficulties: string[]) => {
        set({ difficulties });
      },

      setPopularActivities: (activities: Activity[]) => {
        set({ popularActivities: activities });
      },

      setFeaturedActivities: (activities: Activity[]) => {
        set({ featuredActivities: activities });
      },

      // Loading Actions
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setActivitiesLoading: (loading: boolean) => {
        set({ activitiesLoading: loading });
        if (!loading) set({ activitiesError: null });
      },

      setSearchLoading: (loading: boolean) => {
        set({ searchLoading: loading });
        if (!loading) set({ searchError: null });
      },

      setAvailabilityLoading: (loading: boolean) => {
        set({ availabilityLoading: loading });
        if (!loading) set({ availabilityError: null });
      },

      setReviewsLoading: (loading: boolean) => {
        set({ reviewsLoading: loading });
        if (!loading) set({ reviewsError: null });
      },

      // Error Actions
      setError: (error: string | null) => {
        set({ error, isLoading: false });
      },

      setActivitiesError: (error: string | null) => {
        set({ activitiesError: error, activitiesLoading: false });
      },

      setSearchError: (error: string | null) => {
        set({ searchError: error, searchLoading: false });
      },

      setAvailabilityError: (error: string | null) => {
        set({ availabilityError: error, availabilityLoading: false });
      },

      setReviewsError: (error: string | null) => {
        set({ reviewsError: error, reviewsLoading: false });
      },

      // Search & Filter Actions
      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
        get().updateFilteredActivities();
      },

      setSelectedFilters: (filters: ActivityFilters) => {
        set({ selectedFilters: filters });
        get().updateFilteredActivities();
      },

      updateFilteredActivities: () => {
        const { activities, searchQuery, selectedFilters } = get();
        
        let filtered = activities;
        
        // Filter by search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(activity => 
            activity.name.toLowerCase().includes(query) ||
            activity.description.toLowerCase().includes(query) ||
            activity.category.toLowerCase().includes(query) ||
            activity.location.name.toLowerCase().includes(query)
          );
        }
        
        // Apply filters
        if (selectedFilters.category) {
          filtered = filtered.filter(activity => activity.category === selectedFilters.category);
        }
        
        if (selectedFilters.type) {
          filtered = filtered.filter(activity => activity.type === selectedFilters.type);
        }
        
        if (selectedFilters.difficulty) {
          filtered = filtered.filter(activity => activity.difficulty === selectedFilters.difficulty);
        }
        
        if (selectedFilters.physicalRequirement) {
          filtered = filtered.filter(activity => activity.physicalRequirement === selectedFilters.physicalRequirement);
        }
        
        if (selectedFilters.location) {
          filtered = filtered.filter(activity => 
            activity.location.name.toLowerCase().includes(selectedFilters.location!.toLowerCase())
          );
        }
        
        if (selectedFilters.priceRange) {
          const [min, max] = selectedFilters.priceRange;
          filtered = filtered.filter(activity => 
            activity.pricing.basePrice >= min && activity.pricing.basePrice <= max
          );
        }
        
        if (selectedFilters.weatherDependent !== undefined) {
          filtered = filtered.filter(activity => activity.weatherDependent === selectedFilters.weatherDependent);
        }
        
        if (selectedFilters.safetyLevel) {
          filtered = filtered.filter(activity => activity.safetyLevel === selectedFilters.safetyLevel);
        }
        
        if (selectedFilters.status) {
          filtered = filtered.filter(activity => activity.status === selectedFilters.status);
        }
        
        if (selectedFilters.indoorOnly) {
          filtered = filtered.filter(activity => activity.location.indoor === true);
        }
        
        if (selectedFilters.rating) {
          filtered = filtered.filter(activity => activity.rating.average >= selectedFilters.rating!);
        }
        
        set({ filteredActivities: filtered });
      },

      // Utility Actions
      clearAllData: () => {
        set({
          activities: [],
          selectedActivity: null,
          filteredActivities: [],
          categories: [],
          types: [],
          difficulties: [],
          popularActivities: [],
          featuredActivities: [],
          searchQuery: '',
          selectedFilters: {},
          lastActivitiesUpdate: null,
          lastCategoriesUpdate: null,
          lastTypesUpdate: null,
          lastDifficultiesUpdate: null,
          lastPopularUpdate: null,
          lastFeaturedUpdate: null,
        });
      },

      clearErrors: () => {
        set({
          error: null,
          activitiesError: null,
          searchError: null,
          availabilityError: null,
          reviewsError: null,
        });
      },

      updateCacheTimestamp: (type: 'activities' | 'categories' | 'types' | 'difficulties' | 'popular' | 'featured') => {
        const timestamp = Date.now();
        if (type === 'activities') {
          set({ lastActivitiesUpdate: timestamp });
        } else if (type === 'categories') {
          set({ lastCategoriesUpdate: timestamp });
        } else if (type === 'types') {
          set({ lastTypesUpdate: timestamp });
        } else if (type === 'difficulties') {
          set({ lastDifficultiesUpdate: timestamp });
        } else if (type === 'popular') {
          set({ lastPopularUpdate: timestamp });
        } else if (type === 'featured') {
          set({ lastFeaturedUpdate: timestamp });
        }
      },

      isCacheValid: (type: 'activities' | 'categories' | 'types' | 'difficulties' | 'popular' | 'featured', maxAge: number = 5 * 60 * 1000) => {
        const state = get();
        let lastUpdate: number | null = null;
        
        if (type === 'activities') {
          lastUpdate = state.lastActivitiesUpdate;
        } else if (type === 'categories') {
          lastUpdate = state.lastCategoriesUpdate;
        } else if (type === 'types') {
          lastUpdate = state.lastTypesUpdate;
        } else if (type === 'difficulties') {
          lastUpdate = state.lastDifficultiesUpdate;
        } else if (type === 'popular') {
          lastUpdate = state.lastPopularUpdate;
        } else if (type === 'featured') {
          lastUpdate = state.lastFeaturedUpdate;
        }
        
        if (!lastUpdate) return false;
        
        return Date.now() - lastUpdate < maxAge;
      },
    }),
    {
      name: 'activities-storage',
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
        activities: state.activities,
        categories: state.categories,
        types: state.types,
        difficulties: state.difficulties,
        popularActivities: state.popularActivities,
        featuredActivities: state.featuredActivities,
        lastActivitiesUpdate: state.lastActivitiesUpdate,
        lastCategoriesUpdate: state.lastCategoriesUpdate,
        lastTypesUpdate: state.lastTypesUpdate,
        lastDifficultiesUpdate: state.lastDifficultiesUpdate,
        lastPopularUpdate: state.lastPopularUpdate,
        lastFeaturedUpdate: state.lastFeaturedUpdate,
      }),
    }
  )
);