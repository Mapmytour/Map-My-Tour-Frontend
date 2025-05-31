import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  Service,
  ServiceCategory,
  ServiceImage,
  ServiceProvider,
  ServiceBooking,
  ServiceAvailability,
  ServiceFilters,
} from '@/types/service';

interface ServicesState {
  // State
  services: Service[];
  selectedService: Service | null;
  filteredServices: Service[];
  categories: ServiceCategory[];
  providers: ServiceProvider[];
  popularServices: Service[];
  featuredServices: Service[];
  serviceStats: any | null;
  
  // Loading States
  isLoading: boolean;
  servicesLoading: boolean;
  searchLoading: boolean;
  categoriesLoading: boolean;
  providersLoading: boolean;
  availabilityLoading: boolean;
  bookingsLoading: boolean;
  reviewsLoading: boolean;
  
  // Error States
  error: string | null;
  servicesError: string | null;
  searchError: string | null;
  categoriesError: string | null;
  providersError: string | null;
  availabilityError: string | null;
  bookingsError: string | null;
  reviewsError: string | null;
  
  // Search & Filter State
  searchQuery: string;
  selectedFilters: ServiceFilters;
  
  // Cache timestamps
  lastServicesUpdate: number | null;
  lastCategoriesUpdate: number | null;
  lastProvidersUpdate: number | null;
  lastPopularUpdate: number | null;
  lastFeaturedUpdate: number | null;
  lastStatsUpdate: number | null;
  
  // Actions
  // Basic CRUD Actions
  setServices: (services: Service[]) => void;
  addService: (service: Service) => void;
  updateService: (service: Service) => void;
  removeService: (id: string) => void;
  setSelectedService: (service: Service | null) => void;
  setFilteredServices: (services: Service[]) => void;
  
  // Category Actions
  setCategories: (categories: ServiceCategory[]) => void;
  addCategory: (category: ServiceCategory) => void;
  updateCategory: (category: ServiceCategory) => void;
  removeCategory: (id: string) => void;
  
  // Provider Actions
  setProviders: (providers: ServiceProvider[]) => void;
  addProvider: (provider: ServiceProvider) => void;
  updateProvider: (provider: ServiceProvider) => void;
  removeProvider: (id: string) => void;
  
  // Popular & Featured Actions
  setPopularServices: (services: Service[]) => void;
  setFeaturedServices: (services: Service[]) => void;
  setServiceStats: (stats: any) => void;
  
  // Loading Actions
  setLoading: (loading: boolean) => void;
  setServicesLoading: (loading: boolean) => void;
  setSearchLoading: (loading: boolean) => void;
  setCategoriesLoading: (loading: boolean) => void;
  setProvidersLoading: (loading: boolean) => void;
  setAvailabilityLoading: (loading: boolean) => void;
  setBookingsLoading: (loading: boolean) => void;
  setReviewsLoading: (loading: boolean) => void;
  
  // Error Actions
  setError: (error: string | null) => void;
  setServicesError: (error: string | null) => void;
  setSearchError: (error: string | null) => void;
  setCategoriesError: (error: string | null) => void;
  setProvidersError: (error: string | null) => void;
  setAvailabilityError: (error: string | null) => void;
  setBookingsError: (error: string | null) => void;
  setReviewsError: (error: string | null) => void;
  
  // Search & Filter Actions
  setSearchQuery: (query: string) => void;
  setSelectedFilters: (filters: ServiceFilters) => void;
  updateFilteredServices: () => void;
  
  // Utility Actions
  clearAllData: () => void;
  clearErrors: () => void;
  updateCacheTimestamp: (type: 'services' | 'categories' | 'providers' | 'popular' | 'featured' | 'stats') => void;
  isCacheValid: (type: 'services' | 'categories' | 'providers' | 'popular' | 'featured' | 'stats', maxAge?: number) => boolean;
}

export const useServicesStore = create<ServicesState>()(
  persist(
    (set, get) => ({
      // Initial State
      services: [],
      selectedService: null,
      filteredServices: [],
      categories: [],
      providers: [],
      popularServices: [],
      featuredServices: [],
      serviceStats: null,
      
      // Loading States
      isLoading: false,
      servicesLoading: false,
      searchLoading: false,
      categoriesLoading: false,
      providersLoading: false,
      availabilityLoading: false,
      bookingsLoading: false,
      reviewsLoading: false,
      
      // Error States
      error: null,
      servicesError: null,
      searchError: null,
      categoriesError: null,
      providersError: null,
      availabilityError: null,
      bookingsError: null,
      reviewsError: null,
      
      // Search & Filter State
      searchQuery: '',
      selectedFilters: {
        categories: [],
        types: [],
        priceRange: [0, 1000],
        locations: [],
        providers: [],
        rating: 0,
      },
      
      // Cache timestamps
      lastServicesUpdate: null,
      lastCategoriesUpdate: null,
      lastProvidersUpdate: null,
      lastPopularUpdate: null,
      lastFeaturedUpdate: null,
      lastStatsUpdate: null,

      // Actions
      // Basic CRUD Actions
      setServices: (services: Service[]) => {
        set({ services, servicesError: null });
        get().updateFilteredServices();
      },

      addService: (service: Service) => {
        const currentServices = get().services;
        set({ services: [...currentServices, service] });
        get().updateFilteredServices();
      },

      updateService: (updatedService: Service) => {
        const currentServices = get().services;
        const updatedServices = currentServices.map(service => 
          service.id === updatedService.id ? updatedService : service
        );
        set({ services: updatedServices });
        get().updateFilteredServices();
        
        // Update selected service if it's the one being updated
        if (get().selectedService?.id === updatedService.id) {
          set({ selectedService: updatedService });
        }
      },

      removeService: (id: string) => {
        const currentServices = get().services;
        const updatedServices = currentServices.filter(service => service.id !== id);
        set({ services: updatedServices });
        get().updateFilteredServices();
        
        // Clear selected service if it's the one being removed
        if (get().selectedService?.id === id) {
          set({ selectedService: null });
        }
      },

      setSelectedService: (service: Service | null) => {
        set({ selectedService: service });
      },

      setFilteredServices: (services: Service[]) => {
        set({ filteredServices: services });
      },

      // Category Actions
      setCategories: (categories: ServiceCategory[]) => {
        set({ categories, categoriesError: null });
      },

      addCategory: (category: ServiceCategory) => {
        const currentCategories = get().categories;
        set({ categories: [...currentCategories, category] });
      },

      updateCategory: (updatedCategory: ServiceCategory) => {
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

      // Provider Actions
      setProviders: (providers: ServiceProvider[]) => {
        set({ providers, providersError: null });
      },

      addProvider: (provider: ServiceProvider) => {
        const currentProviders = get().providers;
        set({ providers: [...currentProviders, provider] });
      },

      updateProvider: (updatedProvider: ServiceProvider) => {
        const currentProviders = get().providers;
        const updatedProviders = currentProviders.map(provider => 
          provider.id === updatedProvider.id ? updatedProvider : provider
        );
        set({ providers: updatedProviders });
      },

      removeProvider: (id: string) => {
        const currentProviders = get().providers;
        const updatedProviders = currentProviders.filter(provider => provider.id !== id);
        set({ providers: updatedProviders });
      },

      // Popular & Featured Actions
      setPopularServices: (services: Service[]) => {
        set({ popularServices: services });
      },

      setFeaturedServices: (services: Service[]) => {
        set({ featuredServices: services });
      },

      setServiceStats: (stats: any) => {
        set({ serviceStats: stats });
      },

      // Loading Actions
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setServicesLoading: (loading: boolean) => {
        set({ servicesLoading: loading });
        if (!loading) set({ servicesError: null });
      },

      setSearchLoading: (loading: boolean) => {
        set({ searchLoading: loading });
        if (!loading) set({ searchError: null });
      },

      setCategoriesLoading: (loading: boolean) => {
        set({ categoriesLoading: loading });
        if (!loading) set({ categoriesError: null });
      },

      setProvidersLoading: (loading: boolean) => {
        set({ providersLoading: loading });
        if (!loading) set({ providersError: null });
      },

      setAvailabilityLoading: (loading: boolean) => {
        set({ availabilityLoading: loading });
        if (!loading) set({ availabilityError: null });
      },

      setBookingsLoading: (loading: boolean) => {
        set({ bookingsLoading: loading });
        if (!loading) set({ bookingsError: null });
      },

      setReviewsLoading: (loading: boolean) => {
        set({ reviewsLoading: loading });
        if (!loading) set({ reviewsError: null });
      },

      // Error Actions
      setError: (error: string | null) => {
        set({ error, isLoading: false });
      },

      setServicesError: (error: string | null) => {
        set({ servicesError: error, servicesLoading: false });
      },

      setSearchError: (error: string | null) => {
        set({ searchError: error, searchLoading: false });
      },

      setCategoriesError: (error: string | null) => {
        set({ categoriesError: error, categoriesLoading: false });
      },

      setProvidersError: (error: string | null) => {
        set({ providersError: error, providersLoading: false });
      },

      setAvailabilityError: (error: string | null) => {
        set({ availabilityError: error, availabilityLoading: false });
      },

      setBookingsError: (error: string | null) => {
        set({ bookingsError: error, bookingsLoading: false });
      },

      setReviewsError: (error: string | null) => {
        set({ reviewsError: error, reviewsLoading: false });
      },

      // Search & Filter Actions
      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
        get().updateFilteredServices();
      },

      setSelectedFilters: (filters: ServiceFilters) => {
        set({ selectedFilters: filters });
        get().updateFilteredServices();
      },

      updateFilteredServices: () => {
        const { services, searchQuery, selectedFilters } = get();
        
        let filtered = services;
        
        // Filter by search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(service => 
            service.name.toLowerCase().includes(query) ||
            service.description.toLowerCase().includes(query) ||
            service.category.name.toLowerCase().includes(query) ||
            service.provider.name.toLowerCase().includes(query) ||
            service.location?.name.toLowerCase().includes(query)
          );
        }
        
        // Apply filters
        if (selectedFilters.categories?.length > 0) {
          filtered = filtered.filter(service => 
            selectedFilters.categories!.includes(service.category.id)
          );
        }
        
        if (selectedFilters.types?.length > 0) {
          filtered = filtered.filter(service => 
            selectedFilters.types!.includes(service.type)
          );
        }
        
        if (selectedFilters.providers?.length > 0) {
          filtered = filtered.filter(service => 
            selectedFilters.providers!.includes(service.provider.id)
          );
        }
        
        if (selectedFilters.locations?.length > 0) {
          filtered = filtered.filter(service => 
            service.location && selectedFilters.locations!.includes(service.location.name)
          );
        }
        
        if (selectedFilters.priceRange && selectedFilters.priceRange.length === 2) {
          const [min, max] = selectedFilters.priceRange;
          filtered = filtered.filter(service => 
            service.pricing.basePrice >= min && service.pricing.basePrice <= max
          );
        }
        
        if (selectedFilters.rating && selectedFilters.rating > 0) {
          filtered = filtered.filter(service => 
            service.rating.average >= selectedFilters.rating!
          );
        }
        
        if (selectedFilters.featured !== undefined) {
          filtered = filtered.filter(service => service.featured === selectedFilters.featured);
        }
        
        if (selectedFilters.available !== undefined) {
          filtered = filtered.filter(service => service.available === selectedFilters.available);
        }
        
        set({ filteredServices: filtered });
      },

      // Utility Actions
      clearAllData: () => {
        set({
          services: [],
          selectedService: null,
          filteredServices: [],
          categories: [],
          providers: [],
          popularServices: [],
          featuredServices: [],
          serviceStats: null,
          searchQuery: '',
          selectedFilters: {
            categories: [],
            types: [],
            priceRange: [0, 1000],
            locations: [],
            providers: [],
            rating: 0,
          },
          lastServicesUpdate: null,
          lastCategoriesUpdate: null,
          lastProvidersUpdate: null,
          lastPopularUpdate: null,
          lastFeaturedUpdate: null,
          lastStatsUpdate: null,
        });
      },

      clearErrors: () => {
        set({
          error: null,
          servicesError: null,
          searchError: null,
          categoriesError: null,
          providersError: null,
          availabilityError: null,
          bookingsError: null,
          reviewsError: null,
        });
      },

      updateCacheTimestamp: (type: 'services' | 'categories' | 'providers' | 'popular' | 'featured' | 'stats') => {
        const timestamp = Date.now();
        if (type === 'services') {
          set({ lastServicesUpdate: timestamp });
        } else if (type === 'categories') {
          set({ lastCategoriesUpdate: timestamp });
        } else if (type === 'providers') {
          set({ lastProvidersUpdate: timestamp });
        } else if (type === 'popular') {
          set({ lastPopularUpdate: timestamp });
        } else if (type === 'featured') {
          set({ lastFeaturedUpdate: timestamp });
        } else if (type === 'stats') {
          set({ lastStatsUpdate: timestamp });
        }
      },

      isCacheValid: (type: 'services' | 'categories' | 'providers' | 'popular' | 'featured' | 'stats', maxAge: number = 5 * 60 * 1000) => {
        const state = get();
        let lastUpdate: number | null = null;
        
        if (type === 'services') {
          lastUpdate = state.lastServicesUpdate;
        } else if (type === 'categories') {
          lastUpdate = state.lastCategoriesUpdate;
        } else if (type === 'providers') {
          lastUpdate = state.lastProvidersUpdate;
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
      name: 'services-storage',
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
        services: state.services,
        categories: state.categories,
        providers: state.providers,
        popularServices: state.popularServices,
        featuredServices: state.featuredServices,
        serviceStats: state.serviceStats,
        lastServicesUpdate: state.lastServicesUpdate,
        lastCategoriesUpdate: state.lastCategoriesUpdate,
        lastProvidersUpdate: state.lastProvidersUpdate,
        lastPopularUpdate: state.lastPopularUpdate,
        lastFeaturedUpdate: state.lastFeaturedUpdate,
        lastStatsUpdate: state.lastStatsUpdate,
      }),
    }
  )
);