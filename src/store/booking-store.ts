import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  Booking,
  BookingParticipant,
  BookingPayment,
  BookingFilters,
} from '@/types/booking';

interface BookingState {
  // State
  bookings: Booking[];
  userBookings: Booking[];
  selectedBooking: Booking | null;
  filteredBookings: Booking[];
  bookingStats: any | null;
  
  // Loading States
  isLoading: boolean;
  bookingsLoading: boolean;
  searchLoading: boolean;
  participantsLoading: boolean;
  paymentsLoading: boolean;
  statusLoading: boolean;
  documentsLoading: boolean;
  
  // Error States
  error: string | null;
  bookingsError: string | null;
  searchError: string | null;
  participantsError: string | null;
  paymentsError: string | null;
  statusError: string | null;
  documentsError: string | null;
  
  // Search & Filter State
  searchQuery: string;
  selectedFilters: BookingFilters;
  
  // Cache timestamps
  lastBookingsUpdate: number | null;
  lastUserBookingsUpdate: number | null;
  lastStatsUpdate: number | null;
  
  // Actions
  // Basic CRUD Actions
  setBookings: (bookings: Booking[]) => void;
  setUserBookings: (bookings: Booking[]) => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (booking: Booking) => void;
  removeBooking: (id: string) => void;
  setSelectedBooking: (booking: Booking | null) => void;
  setFilteredBookings: (bookings: Booking[]) => void;
  setBookingStats: (stats: any) => void;
  
  // Loading Actions
  setLoading: (loading: boolean) => void;
  setBookingsLoading: (loading: boolean) => void;
  setSearchLoading: (loading: boolean) => void;
  setParticipantsLoading: (loading: boolean) => void;
  setPaymentsLoading: (loading: boolean) => void;
  setStatusLoading: (loading: boolean) => void;
  setDocumentsLoading: (loading: boolean) => void;
  
  // Error Actions
  setError: (error: string | null) => void;
  setBookingsError: (error: string | null) => void;
  setSearchError: (error: string | null) => void;
  setParticipantsError: (error: string | null) => void;
  setPaymentsError: (error: string | null) => void;
  setStatusError: (error: string | null) => void;
  setDocumentsError: (error: string | null) => void;
  
  // Search & Filter Actions
  setSearchQuery: (query: string) => void;
  setSelectedFilters: (filters: BookingFilters) => void;
  updateFilteredBookings: () => void;
  
  // Utility Actions
  clearAllData: () => void;
  clearErrors: () => void;
  updateCacheTimestamp: (type: 'bookings' | 'userBookings' | 'stats') => void;
  isCacheValid: (type: 'bookings' | 'userBookings' | 'stats', maxAge?: number) => boolean;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      // Initial State
      bookings: [],
      userBookings: [],
      selectedBooking: null,
      filteredBookings: [],
      bookingStats: null,
      
      // Loading States
      isLoading: false,
      bookingsLoading: false,
      searchLoading: false,
      participantsLoading: false,
      paymentsLoading: false,
      statusLoading: false,
      documentsLoading: false,
      
      // Error States
      error: null,
      bookingsError: null,
      searchError: null,
      participantsError: null,
      paymentsError: null,
      statusError: null,
      documentsError: null,
      
      // Search & Filter State
      searchQuery: '',
      selectedFilters: {
        status: [],
        paymentStatus: [],
        dateRange: { from: '', to: '' },
        source: [],
      },
      
      // Cache timestamps
      lastBookingsUpdate: null,
      lastUserBookingsUpdate: null,
      lastStatsUpdate: null,

      // Actions
      // Basic CRUD Actions
      setBookings: (bookings: Booking[]) => {
        set({ bookings, bookingsError: null });
        get().updateFilteredBookings();
      },

      setUserBookings: (bookings: Booking[]) => {
        set({ bookings, bookingsError: null });
      },

      addBooking: (booking: Booking) => {
        const currentBookings = get().bookings;
        const currentUserBookings = get().userBookings;
        
        set({ 
          bookings: [...currentBookings, booking],
          userBookings: [...currentUserBookings, booking]
        });
        get().updateFilteredBookings();
      },

      updateBooking: (updatedBooking: Booking) => {
        const currentBookings = get().bookings;
        const currentUserBookings = get().userBookings;
        
        const updatedBookings = currentBookings.map(booking => 
          booking.id === updatedBooking.id ? updatedBooking : booking
        );
        
        const updatedUserBookings = currentUserBookings.map(booking => 
          booking.id === updatedBooking.id ? updatedBooking : booking
        );
        
        set({ 
          bookings: updatedBookings,
          userBookings: updatedUserBookings
        });
        get().updateFilteredBookings();
        
        // Update selected booking if it's the one being updated
        if (get().selectedBooking?.id === updatedBooking.id) {
          set({ selectedBooking: updatedBooking });
        }
      },

      removeBooking: (id: string) => {
        const currentBookings = get().bookings;
        const currentUserBookings = get().userBookings;
        
        const updatedBookings = currentBookings.filter(booking => booking.id !== id);
        const updatedUserBookings = currentUserBookings.filter(booking => booking.id !== id);
        
        set({ 
          bookings: updatedBookings,
          userBookings: updatedUserBookings
        });
        get().updateFilteredBookings();
        
        // Clear selected booking if it's the one being removed
        if (get().selectedBooking?.id === id) {
          set({ selectedBooking: null });
        }
      },

      setSelectedBooking: (booking: Booking | null) => {
        set({ selectedBooking: booking });
      },

      setFilteredBookings: (bookings: Booking[]) => {
        set({ filteredBookings: bookings });
      },

      setBookingStats: (stats: any) => {
        set({ bookingStats: stats });
      },

      // Loading Actions
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setBookingsLoading: (loading: boolean) => {
        set({ bookingsLoading: loading });
        if (!loading) set({ bookingsError: null });
      },

      setSearchLoading: (loading: boolean) => {
        set({ searchLoading: loading });
        if (!loading) set({ searchError: null });
      },

      setParticipantsLoading: (loading: boolean) => {
        set({ participantsLoading: loading });
        if (!loading) set({ participantsError: null });
      },

      setPaymentsLoading: (loading: boolean) => {
        set({ paymentsLoading: loading });
        if (!loading) set({ paymentsError: null });
      },

      setStatusLoading: (loading: boolean) => {
        set({ statusLoading: loading });
        if (!loading) set({ statusError: null });
      },

      setDocumentsLoading: (loading: boolean) => {
        set({ documentsLoading: loading });
        if (!loading) set({ documentsError: null });
      },

      // Error Actions
      setError: (error: string | null) => {
        set({ error, isLoading: false });
      },

      setBookingsError: (error: string | null) => {
        set({ bookingsError: error, bookingsLoading: false });
      },

      setSearchError: (error: string | null) => {
        set({ searchError: error, searchLoading: false });
      },

      setParticipantsError: (error: string | null) => {
        set({ participantsError: error, participantsLoading: false });
      },

      setPaymentsError: (error: string | null) => {
        set({ paymentsError: error, paymentsLoading: false });
      },

      setStatusError: (error: string | null) => {
        set({ statusError: error, statusLoading: false });
      },

      setDocumentsError: (error: string | null) => {
        set({ documentsError: error, documentsLoading: false });
      },

      // Search & Filter Actions
      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
        get().updateFilteredBookings();
      },

      setSelectedFilters: (filters: BookingFilters) => {
        set({ selectedFilters: filters });
        get().updateFilteredBookings();
      },

      updateFilteredBookings: () => {
        const { bookings, searchQuery, selectedFilters } = get();
        
        let filtered = bookings;
        
        // Filter by search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(booking => 
            booking.bookingNumber.toLowerCase().includes(query) ||
            booking.tourTitle.toLowerCase().includes(query) ||
            booking.participants.some(p => 
              p.firstName.toLowerCase().includes(query) ||
              p.lastName.toLowerCase().includes(query) ||
              p.email.toLowerCase().includes(query)
            )
          );
        }
        
        // Apply filters
        if (selectedFilters.status?.length > 0) {
          filtered = filtered.filter(booking => 
            selectedFilters.status.includes(booking.status)
          );
        }
        
        if (selectedFilters.paymentStatus?.length > 0) {
          filtered = filtered.filter(booking => 
            selectedFilters.paymentStatus.includes(booking.paymentStatus)
          );
        }
        
        if (selectedFilters.source?.length > 0) {
          filtered = filtered.filter(booking => 
            selectedFilters.source.includes(booking.source)
          );
        }
        
        if (selectedFilters.dateRange?.from && selectedFilters.dateRange?.to) {
          const fromDate = new Date(selectedFilters.dateRange.from);
          const toDate = new Date(selectedFilters.dateRange.to);
          
          filtered = filtered.filter(booking => {
            const bookingDate = new Date(booking.bookingDate);
            return bookingDate >= fromDate && bookingDate <= toDate;
          });
        }
        
        if (selectedFilters.tourId) {
          filtered = filtered.filter(booking => booking.tourId === selectedFilters.tourId);
        }
        
        if (selectedFilters.customerId) {
          filtered = filtered.filter(booking => booking.customerId === selectedFilters.customerId);
        }
        
        set({ filteredBookings: filtered });
      },

      // Utility Actions
      clearAllData: () => {
        set({
          bookings: [],
          userBookings: [],
          selectedBooking: null,
          filteredBookings: [],
          bookingStats: null,
          searchQuery: '',
          selectedFilters: {
            status: [],
            paymentStatus: [],
            dateRange: { from: '', to: '' },
            source: [],
          },
          lastBookingsUpdate: null,
          lastUserBookingsUpdate: null,
          lastStatsUpdate: null,
        });
      },

      clearErrors: () => {
        set({
          error: null,
          bookingsError: null,
          searchError: null,
          participantsError: null,
          paymentsError: null,
          statusError: null,
          documentsError: null,
        });
      },

      updateCacheTimestamp: (type: 'bookings' | 'userBookings' | 'stats') => {
        const timestamp = Date.now();
        if (type === 'bookings') {
          set({ lastBookingsUpdate: timestamp });
        } else if (type === 'userBookings') {
          set({ lastUserBookingsUpdate: timestamp });
        } else if (type === 'stats') {
          set({ lastStatsUpdate: timestamp });
        }
      },

      isCacheValid: (type: 'bookings' | 'userBookings' | 'stats', maxAge: number = 5 * 60 * 1000) => {
        const state = get();
        let lastUpdate: number | null = null;
        
        if (type === 'bookings') {
          lastUpdate = state.lastBookingsUpdate;
        } else if (type === 'userBookings') {
          lastUpdate = state.lastUserBookingsUpdate;
        } else if (type === 'stats') {
          lastUpdate = state.lastStatsUpdate;
        }
        
        if (!lastUpdate) return false;
        
        return Date.now() - lastUpdate < maxAge;
      },
    }),
    {
      name: 'booking-storage',
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
        bookings: state.bookings,
        userBookings: state.userBookings,
        bookingStats: state.bookingStats,
        lastBookingsUpdate: state.lastBookingsUpdate,
        lastUserBookingsUpdate: state.lastUserBookingsUpdate,
        lastStatsUpdate: state.lastStatsUpdate,
      }),
    }
  )
);