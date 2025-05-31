import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
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

interface TourState {
  // State
  tours: Tour[];
  selectedTour: Tour | null;
  filteredTours: Tour[];
  categories: TourCategory[];
  guides: Guide[];
  destinations: Destination[];
  popularTours: Tour[];
  featuredTours: Tour[];
  tourStats: any | null;
  
  // Loading States
  isLoading: boolean;
  toursLoading: boolean;
  searchLoading: boolean;
  availabilityLoading: boolean;
  itineraryLoading: boolean;
  bookingsLoading: boolean;
  reviewsLoading: boolean;
  categoriesLoading: boolean;
  guidesLoading: boolean;
  
  // Error States
  error: string | null;
  toursError: string | null;
  searchError: string | null;
  availabilityError: string | null;
  itineraryError: string | null;
  bookingsError: string | null;
  reviewsError: string | null;
  categoriesError: string | null;
  guidesError: string | null;
  
  // Search & Filter State
  searchQuery: string;
  selectedFilters: TourFilters;
  
  // Cache timestamps
  lastToursUpdate: number | null;
  lastCategoriesUpdate: number | null;
  lastGuidesUpdate: number | null;
  lastDestinationsUpdate: number | null;
  lastPopularUpdate: number | null;
  lastFeaturedUpdate: number | null;
  lastStatsUpdate: number | null;
  
  // Actions
  // Basic CRUD Actions
  setTours: (tours: Tour[]) => void;
  addTour: (tour: Tour) => void;
  updateTour: (tour: Tour) => void;
  removeTour: (id: string) => void;
  setSelectedTour: (tour: Tour | null) => void;
  setFilteredTours: (tours: Tour[]) => void;
  
  // Category Actions
  setCategories: (categories: TourCategory[]) => void;
  addCategory: (category: TourCategory) => void;
  updateCategory: (category: TourCategory) => void;
  removeCategory: (id: string) => void;
  
  // Guide Actions
  setGuides: (guides: Guide[]) => void;
  addGuide: (guide: Guide) => void;
  updateGuide: (guide: Guide) => void;
  removeGuide: (id: string) => void;
  
  // Destination Actions
  setDestinations: (destinations: Destination[]) => void;
  
  // Popular & Featured Actions
  setPopularTours: (tours: Tour[]) => void;
  setFeaturedTours: (tours: Tour[]) => void;
  setTourStats: (stats: any) => void;
  
  // Loading Actions
  setLoading: (loading: boolean) => void;
  setToursLoading: (loading: boolean) => void;
  setSearchLoading: (loading: boolean) => void;
  setAvailabilityLoading: (loading: boolean) => void;
  setItineraryLoading: (loading: boolean) => void;
  setBookingsLoading: (loading: boolean) => void;
  setReviewsLoading: (loading: boolean) => void;
  setCategoriesLoading: (loading: boolean) => void;
  setGuidesLoading: (loading: boolean) => void;
  
  // Error Actions
  setError: (error: string | null) => void;
  setToursError: (error: string | null) => void;
  setSearchError: (error: string | null) => void;
  setAvailabilityError: (error: string | null) => void;
  setItineraryError: (error: string | null) => void;
  setBookingsError: (error: string | null) => void;
  setReviewsError: (error: string | null) => void;
  setCategoriesError: (error: string | null) => void;
  setGuidesError: (error: string | null) => void;
  
  // Search & Filter Actions
  setSearchQuery: (query: string) => void;
  setSelectedFilters: (filters: TourFilters) => void;
  updateFilteredTours: () => void;
  
  // Utility Actions
  clearAllData: () => void;
  clearErrors: () => void;
  updateCacheTimestamp: (type: 'tours' | 'categories' | 'guides' | 'destinations' | 'popular' | 'featured' | 'stats') => void;
  isCacheValid: (type: 'tours' | 'categories' | 'guides' | 'destinations' | 'popular' | 'featured' | 'stats', maxAge?: number) => boolean;
}

export const useTourStore = create<TourState>()(
  persist(
    (set, get) => ({
      // Initial State
      tours: [],
      selectedTour: null,
      filteredTours: [],
      categories: [],
      guides: [],
      destinations: [],
      popularTours: [],
      featuredTours: [],
      tourStats: null,
      
      // Loading States
      isLoading: false,
      toursLoading: false,
      searchLoading: false,
      availabilityLoading: false,
      itineraryLoading: false,
      bookingsLoading: false,
      reviewsLoading: false,
      categoriesLoading: false,
      guidesLoading: false,
      
      // Error States
      error: null,
      toursError: null,
      searchError: null,
      availabilityError: null,
      itineraryError: null,
      bookingsError: null,
      reviewsError: null,
      categoriesError: null,
      guidesError: null,
      
      // Search & Filter State
      searchQuery: '',
      selectedFilters: {
        categories: [],
        destinations: [],
        priceRange: [0, 5000],
        duration: [],
        difficulty: [],
        rating: 0,
      },
      
      // Cache timestamps
      lastToursUpdate: null,
      lastCategoriesUpdate: null,
      lastGuidesUpdate: null,
      lastDestinationsUpdate: null,
      lastPopularUpdate: null,
      lastFeaturedUpdate: null,
      lastStatsUpdate: null,

      // Actions
      // Basic CRUD Actions
      setTours: (tours: Tour[]) => {
        set({ tours, toursError: null });
        get().updateFilteredTours();
      },

      addTour: (tour: Tour) => {
        const currentTours = get().tours;
        set({ tours: [...currentTours, tour] });
        get().updateFilteredTours();
      },

      updateTour: (updatedTour: Tour) => {
        const currentTours = get().tours;
        const updatedTours = currentTours.map(tour => 
          tour.id === updatedTour.id ? updatedTour : tour
        );
        set({ tours: updatedTours });
        get().updateFilteredTours();
        
        // Update selected tour if it's the one being updated
        if (get().selectedTour?.id === updatedTour.id) {
          set({ selectedTour: updatedTour });
        }
      },

      removeTour: (id: string) => {
        const currentTours = get().tours;
        const updatedTours = currentTours.filter(tour => tour.id !== id);
        set({ tours: updatedTours });
        get().updateFilteredTours();
        
        // Clear selected tour if it's the one being removed
        if (get().selectedTour?.id === id) {
          set({ selectedTour: null });
        }
      },

      setSelectedTour: (tour: Tour | null) => {
        set({ selectedTour: tour });
      },

      setFilteredTours: (tours: Tour[]) => {
        set({ filteredTours: tours });
      },

      // Category Actions
      setCategories: (categories: TourCategory[]) => {
        set({ categories, categoriesError: null });
      },

      addCategory: (category: TourCategory) => {
        const currentCategories = get().categories;
        set({ categories: [...currentCategories, category] });
      },

      updateCategory: (updatedCategory: TourCategory) => {
        const currentCategories = get().categories;
        const updatedCategories = currentCategories.map(category => 
          category.id === updatedCategory.id ? updatedCategory : category
        );
        set({ categories: updatedCategories });
      },

      removeCategory: (id: string) => {
        const currentCategories = get().categories;
        const updatedCategories = currentCategories.filter(category => category.id !== id);
        set({ categories: updatedCategories });
      },

      // Guide Actions
      setGuides: (guides: Guide[]) => {
        set({ guides, guidesError: null });
      },

      addGuide: (guide: Guide) => {
        const currentGuides = get().guides;
        set({ guides: [...currentGuides, guide] });
      },

      updateGuide: (updatedGuide: Guide) => {
        const currentGuides = get().guides;
        const updatedGuides = currentGuides.map(guide => 
          guide.id === updatedGuide.id ? updatedGuide : guide
        );
        set({ guides: updatedGuides });
      },

      removeGuide: (id: string) => {
        const currentGuides = get().guides;
        const updatedGuides = currentGuides.filter(guide => guide.id !== id);
        set({ guides: updatedGuides });
      },

      // Destination Actions
      setDestinations: (destinations: Destination[]) => {
        set({ destinations });
      },

      // Popular & Featured Actions
      setPopularTours: (tours: Tour[]) => {
        set({ popularTours: tours });
      },

      setFeaturedTours: (tours: Tour[]) => {
        set({ featuredTours: tours });
      },

      setTourStats: (stats: any) => {
        set({ tourStats: stats });
      },

      // Loading Actions
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setToursLoading: (loading: boolean) => {
        set({ toursLoading: loading });
        if (!loading) set({ toursError: null });
      },

      setSearchLoading: (loading: boolean) => {
        set({ searchLoading: loading });
        if (!loading) set({ searchError: null });
      },

      setAvailabilityLoading: (loading: boolean) => {
        set({ availabilityLoading: loading });
        if (!loading) set({ availabilityError: null });
      },

      setItineraryLoading: (loading: boolean) => {
        set({ itineraryLoading: loading });
        if (!loading) set({ itineraryError: null });
      },

      setBookingsLoading: (loading: boolean) => {
        set({ bookingsLoading: loading });
        if (!loading) set({ bookingsError: null });
      },

      setReviewsLoading: (loading: boolean) => {
        set({ reviewsLoading: loading });
        if (!loading) set({ reviewsError: null });
      },

      setCategoriesLoading: (loading: boolean) => {
        set({ categoriesLoading: loading });
        if (!loading) set({ categoriesError: null });
      },

      setGuidesLoading: (loading: boolean) => {
        set({ guidesLoading: loading });
        if (!loading) set({ guidesError: null });
      },

      // Error Actions
      setError: (error: string | null) => {
        set({ error, isLoading: false });
      },

      setToursError: (error: string | null) => {
        set({ toursError: error, toursLoading: false });
      },

      setSearchError: (error: string | null) => {
        set({ searchError: error, searchLoading: false });
      },

      setAvailabilityError: (error: string | null) => {
        set({ availabilityError: error, availabilityLoading: false });
      },

      setItineraryError: (error: string | null) => {
        set({ itineraryError: error, itineraryLoading: false });
      },

      setBookingsError: (error: string | null) => {
        set({ bookingsError: error, bookingsLoading: false });
      },

      setReviewsError: (error: string | null) => {
        set({ reviewsError: error, reviewsLoading: false });
      },

      setCategoriesError: (error: string | null) => {
        set({ categoriesError: error, categoriesLoading: false });
      },

      setGuidesError: (error: string | null) => {
        set({ guidesError: error, guidesLoading: false });
      },

      // Search & Filter Actions
      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
        get().updateFilteredTours();
      },

      setSelectedFilters: (filters: TourFilters) => {
        set({ selectedFilters: filters });
        get().updateFilteredTours();
      },

      updateFilteredTours: () => {
        const { tours, searchQuery, selectedFilters } = get();
        
        let filtered = tours;
        
        // Filter by search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(tour => 
            tour.title.toLowerCase().includes(query) ||
            tour.description.toLowerCase().includes(query) ||
            tour.destination.name.toLowerCase().includes(query) ||
            tour.destination.country.toLowerCase().includes(query) ||
            tour.category.name.toLowerCase().includes(query) ||
            tour.guide.name.toLowerCase().includes(query)
          );
        }
        
        // Apply filters
        if (selectedFilters.categories?.length > 0) {
          filtered = filtered.filter(tour => 
            selectedFilters.categories!.includes(tour.category.id)
          );
        }
        
        if (selectedFilters.destinations?.length > 0) {
          filtered = filtered.filter(tour => 
            selectedFilters.destinations!.includes(tour.destination.id)
          );
        }
        
        if (selectedFilters.difficulty?.length > 0) {
          filtered = filtered.filter(tour => 
            selectedFilters.difficulty!.includes(tour.difficulty)
          );
        }
        
        if (selectedFilters.duration?.length > 0) {
          filtered = filtered.filter(tour => {
            const tourDuration = `${tour.duration.days}`;
            return selectedFilters.duration!.some(d => tourDuration.includes(d));
          });
        }
        
        if (selectedFilters.priceRange && selectedFilters.priceRange.length === 2) {
          const [min, max] = selectedFilters.priceRange;
          filtered = filtered.filter(tour => 
            tour.price.amount >= min && tour.price.amount <= max
          );
        }
        
        if (selectedFilters.rating && selectedFilters.rating > 0) {
          filtered = filtered.filter(tour => 
            tour.rating.average >= selectedFilters.rating!
          );
        }
        
        if (selectedFilters.dates) {
          const fromDate = new Date(selectedFilters.dates.from);
          const toDate = new Date(selectedFilters.dates.to);
          
          filtered = filtered.filter(tour => 
            tour.availability.some(avail => {
              const availDate = new Date(avail.startDate);
              return availDate >= fromDate && availDate <= toDate && avail.status === 'available';
            })
          );
        }
        
        set({ filteredTours: filtered });
      },

      // Utility Actions
      clearAllData: () => {
        set({
          tours: [],
          selectedTour: null,
          filteredTours: [],
          categories: [],
          guides: [],
          destinations: [],
          popularTours: [],
          featuredTours: [],
          tourStats: null,
          searchQuery: '',
          selectedFilters: {
            categories: [],
            destinations: [],
            priceRange: [0, 5000],
            duration: [],
            difficulty: [],
            rating: 0,
          },
          lastToursUpdate: null,
          lastCategoriesUpdate: null,
          lastGuidesUpdate: null,
          lastDestinationsUpdate: null,
          lastPopularUpdate: null,
          lastFeaturedUpdate: null,
          lastStatsUpdate: null,
        });
      },

      clearErrors: () => {
        set({
          error: null,
          toursError: null,
          searchError: null,
          availabilityError: null,
          itineraryError: null,
          bookingsError: null,
          reviewsError: null,
          categoriesError: null,
          guidesError: null,
        });
      },

      updateCacheTimestamp: (type: 'tours' | 'categories' | 'guides' | 'destinations' | 'popular' | 'featured' | 'stats') => {
        const timestamp = Date.now();
        if (type === 'tours') {
          set({ lastToursUpdate: timestamp });
        } else if (type === 'categories') {
          set({ lastCategoriesUpdate: timestamp });
        } else if (type === 'guides') {
          set({ lastGuidesUpdate: timestamp });
        } else if (type === 'destinations') {
          set({ lastDestinationsUpdate: timestamp });
        } else if (type === 'popular') {
          set({ lastPopularUpdate: timestamp });
        } else if (type === 'featured') {
          set({ lastFeaturedUpdate: timestamp });
        } else if (type === 'stats') {
          set({ lastStatsUpdate: timestamp });
        }
      },

      isCacheValid: (type: 'tours' | 'categories' | 'guides' | 'destinations' | 'popular' | 'featured' | 'stats', maxAge: number = 5 * 60 * 1000) => {
        const state = get();
        let lastUpdate: number | null = null;
        
        if (type === 'tours') {
          lastUpdate = state.lastToursUpdate;
        } else if (type === 'categories') {
          lastUpdate = state.lastCategoriesUpdate;
        } else if (type === 'guides') {
          lastUpdate = state.lastGuidesUpdate;
        } else if (type === 'destinations') {
          lastUpdate = state.lastDestinationsUpdate;
        } else if (type === 'popular') {
          lastUpdate = state.lastPopularUpdate;
        } else if (type === 'featured') {
          lastUpdate = state.lastFeaturedUpdate;
        } else if (type === 'stats') {
          lastUpdate = state.lastStatsUpdate;
        }
        
        if (!lastUpdate) return false;
        
        return Date.now() - lastUpdate < maxAge;
      },
    }),
    {
      name: 'tour-storage',
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
        tours: state.tours,
        categories: state.categories,
        guides: state.guides,
        destinations: state.destinations,
        popularTours: state.popularTours,
        featuredTours: state.featuredTours,
        tourStats: state.tourStats,
        lastToursUpdate: state.lastToursUpdate,
        lastCategoriesUpdate: state.lastCategoriesUpdate,
        lastGuidesUpdate: state.lastGuidesUpdate,
        lastDestinationsUpdate: state.lastDestinationsUpdate,
        lastPopularUpdate: state.lastPopularUpdate,
        lastFeaturedUpdate: state.lastFeaturedUpdate,
        lastStatsUpdate: state.lastStatsUpdate,
      }),
    }
  )
);