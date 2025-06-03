import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  Booking,
  BookingParticipant,
  BookingPayment,
  BookingNotification,
  BookingNote,
  BookingFilters,
  BookingStats,
  BookingStatus,
  BookingType,
  PaymentStatus,
} from '@/types/booking';

interface BookingState {
  // State
  bookings: Booking[];
  selectedBooking: Booking | null;
  filteredBookings: Booking[];
  participants: BookingParticipant[];
  payments: BookingPayment[];
  notifications: BookingNotification[];
  notes: BookingNote[];
  bookingStats: BookingStats | null;

  // Calendar & Schedule Data
  calendarData: {
    days: { date: string; bookings: number; revenue: number }[];
    summary: any;
  } | null;
  upcomingDepartures: Booking[];

  // Loading States
  isLoading: boolean;
  bookingsLoading: boolean;
  searchLoading: boolean;
  participantsLoading: boolean;
  paymentsLoading: boolean;
  notificationsLoading: boolean;
  statusUpdateLoading: boolean;
  cancellationLoading: boolean;
  documentLoading: boolean;
  bulkOperationLoading: boolean;

  // Error States
  error: string | null;
  bookingsError: string | null;
  searchError: string | null;
  participantsError: string | null;
  paymentsError: string | null;
  notificationsError: string | null;
  statusUpdateError: string | null;
  cancellationError: string | null;
  documentError: string | null;
  bulkOperationError: string | null;

  // Search & Filter State
  searchQuery: string;
  selectedFilters: BookingFilters;

  // Cache timestamps
  lastBookingsUpdate: number | null;
  lastStatsUpdate: number | null;
  lastCalendarUpdate: number | null;
  lastDeparturesUpdate: number | null;
  lastParticipantsUpdate: number | null;
  lastPaymentsUpdate: number | null;
  lastNotificationsUpdate: number | null;
  lastNotesUpdate: number | null;

  // Actions
  // Basic CRUD Actions
  setBookings: (bookings: Booking[]) => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (booking: Booking) => void;
  removeBooking: (id: string) => void;
  setSelectedBooking: (booking: Booking | null) => void;
  setFilteredBookings: (bookings: Booking[]) => void;

  // Participant Actions
  setParticipants: (participants: BookingParticipant[]) => void;
  addParticipant: (participant: BookingParticipant) => void;
  updateParticipant: (participant: BookingParticipant) => void;
  removeParticipant: (participantId: string) => void;

  // Payment Actions
  setPayments: (payments: BookingPayment[]) => void;
  addPayment: (payment: BookingPayment) => void;
  updatePayment: (payment: BookingPayment) => void;

  // Communication Actions
  setNotifications: (notifications: BookingNotification[]) => void;
  addNotification: (notification: BookingNotification) => void;
  setNotes: (notes: BookingNote[]) => void;
  addNote: (note: BookingNote) => void;
  updateNote: (note: BookingNote) => void;
  removeNote: (noteId: string) => void;

  // Analytics & Calendar Actions
  setBookingStats: (stats: BookingStats) => void;
  setCalendarData: (data: { days: { date: string; bookings: number; revenue: number }[]; summary: any }) => void;
  setUpcomingDepartures: (departures: Booking[]) => void;

  // Loading Actions
  setLoading: (loading: boolean) => void;
  setBookingsLoading: (loading: boolean) => void;
  setSearchLoading: (loading: boolean) => void;
  setParticipantsLoading: (loading: boolean) => void;
  setPaymentsLoading: (loading: boolean) => void;
  setNotificationsLoading: (loading: boolean) => void;
  setStatusUpdateLoading: (loading: boolean) => void;
  setCancellationLoading: (loading: boolean) => void;
  setDocumentLoading: (loading: boolean) => void;
  setBulkOperationLoading: (loading: boolean) => void;

  // Error Actions
  setError: (error: string | null) => void;
  setBookingsError: (error: string | null) => void;
  setSearchError: (error: string | null) => void;
  setParticipantsError: (error: string | null) => void;
  setPaymentsError: (error: string | null) => void;
  setNotificationsError: (error: string | null) => void;
  setStatusUpdateError: (error: string | null) => void;
  setCancellationError: (error: string | null) => void;
  setDocumentError: (error: string | null) => void;
  setBulkOperationError: (error: string | null) => void;

  // Search & Filter Actions
  setSearchQuery: (query: string) => void;
  setSelectedFilters: (filters: BookingFilters) => void;
  updateFilteredBookings: () => void;

  // Utility Actions
  clearAllData: () => void;
  clearErrors: () => void;
  updateCacheTimestamp: (type: 'bookings' | 'stats' | 'calendar' | 'departures' | 'participants' | 'payments' | 'notifications' | 'notes') => void;
  isCacheValid: (type: 'bookings' | 'stats' | 'calendar' | 'departures' | 'participants' | 'payments' | 'notifications' | 'notes', maxAge?: number) => boolean;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      // Initial State
      bookings: [],
      selectedBooking: null,
      filteredBookings: [],
      participants: [],
      payments: [],
      notifications: [],
      notes: [],
      bookingStats: null,
      calendarData: null,
      upcomingDepartures: [],

      // Loading States
      isLoading: false,
      bookingsLoading: false,
      searchLoading: false,
      participantsLoading: false,
      paymentsLoading: false,
      notificationsLoading: false,
      statusUpdateLoading: false,
      cancellationLoading: false,
      documentLoading: false,
      bulkOperationLoading: false,

      // Error States
      error: null,
      bookingsError: null,
      searchError: null,
      participantsError: null,
      paymentsError: null,
      notificationsError: null,
      statusUpdateError: null,
      cancellationError: null,
      documentError: null,
      bulkOperationError: null,

      // Search & Filter State
      searchQuery: '',
      selectedFilters: {},

      // Cache timestamps
      lastBookingsUpdate: null,
      lastStatsUpdate: null,
      lastCalendarUpdate: null,
      lastDeparturesUpdate: null,
      lastParticipantsUpdate: null,
      lastPaymentsUpdate: null,
      lastNotificationsUpdate: null,
      lastNotesUpdate: null,

      // Actions
      // Basic CRUD Actions
      setBookings: (bookings: Booking[]) => {
        set({ bookings, bookingsError: null });
        get().updateFilteredBookings();
      },

      addBooking: (booking: Booking) => {
        const currentBookings = get().bookings;
        set({ bookings: [...currentBookings, booking] });
        get().updateFilteredBookings();
      },

      updateBooking: (updatedBooking: Booking) => {
        const currentBookings = get().bookings;
        const updatedBookings = currentBookings.map(booking =>
          booking.id === updatedBooking.id ? updatedBooking : booking
        );
        set({ bookings: updatedBookings });
        get().updateFilteredBookings();

        // Update selected booking if it's the one being updated
        if (get().selectedBooking?.id === updatedBooking.id) {
          set({ selectedBooking: updatedBooking });
        }
      },

      removeBooking: (id: string) => {
        const currentBookings = get().bookings;
        const updatedBookings = currentBookings.filter(booking => booking.id !== id);
        set({ bookings: updatedBookings });
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

      // Participant Actions
      setParticipants: (participants: BookingParticipant[]) => {
        set({ participants, participantsError: null });
      },

      addParticipant: (participant: BookingParticipant) => {
        const currentParticipants = get().participants;
        set({ participants: [...currentParticipants, participant] });
      },

      updateParticipant: (updatedParticipant: BookingParticipant) => {
        const currentParticipants = get().participants;
        const updatedParticipants = currentParticipants.map(participant =>
          participant.id === updatedParticipant.id ? updatedParticipant : participant
        );
        set({ participants: updatedParticipants });
      },

      removeParticipant: (participantId: string) => {
        const currentParticipants = get().participants;
        const updatedParticipants = currentParticipants.filter(participant => participant.id !== participantId);
        set({ participants: updatedParticipants });
      },

      // Payment Actions
      setPayments: (payments: BookingPayment[]) => {
        set({ payments, paymentsError: null });
      },

      addPayment: (payment: BookingPayment) => {
        const currentPayments = get().payments;
        set({ payments: [...currentPayments, payment] });
      },

      updatePayment: (updatedPayment: BookingPayment) => {
        const currentPayments = get().payments;
        const updatedPayments = currentPayments.map(payment =>
          payment.id === updatedPayment.id ? updatedPayment : payment
        );
        set({ payments: updatedPayments });
      },

      // Communication Actions
      setNotifications: (notifications: BookingNotification[]) => {
        set({ notifications, notificationsError: null });
      },

      addNotification: (notification: BookingNotification) => {
        const currentNotifications = get().notifications;
        set({ notifications: [notification, ...currentNotifications] });
      },

      setNotes: (notes: BookingNote[]) => {
        set({ notes });
      },

      addNote: (note: BookingNote) => {
        const currentNotes = get().notes;
        set({ notes: [note, ...currentNotes] });
      },

      updateNote: (updatedNote: BookingNote) => {
        const currentNotes = get().notes;
        const updatedNotes = currentNotes.map(note =>
          note.id === updatedNote.id ? updatedNote : note
        );
        set({ notes: updatedNotes });
      },

      removeNote: (noteId: string) => {
        const currentNotes = get().notes;
        const updatedNotes = currentNotes.filter(note => note.id !== noteId);
        set({ notes: updatedNotes });
      },

      // Analytics & Calendar Actions
      setBookingStats: (stats: BookingStats) => {
        set({ bookingStats: stats });
      },

      setCalendarData: (data: { days: { date: string; bookings: number; revenue: number }[]; summary: any }) => {
        set({ calendarData: data });
      },

      setUpcomingDepartures: (departures: Booking[]) => {
        set({ upcomingDepartures: departures });
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

      setNotificationsLoading: (loading: boolean) => {
        set({ notificationsLoading: loading });
        if (!loading) set({ notificationsError: null });
      },

      setStatusUpdateLoading: (loading: boolean) => {
        set({ statusUpdateLoading: loading });
        if (!loading) set({ statusUpdateError: null });
      },

      setCancellationLoading: (loading: boolean) => {
        set({ cancellationLoading: loading });
        if (!loading) set({ cancellationError: null });
      },

      setDocumentLoading: (loading: boolean) => {
        set({ documentLoading: loading });
        if (!loading) set({ documentError: null });
      },

      setBulkOperationLoading: (loading: boolean) => {
        set({ bulkOperationLoading: loading });
        if (!loading) set({ bulkOperationError: null });
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

      setNotificationsError: (error: string | null) => {
        set({ notificationsError: error, notificationsLoading: false });
      },

      setStatusUpdateError: (error: string | null) => {
        set({ statusUpdateError: error, statusUpdateLoading: false });
      },

      setCancellationError: (error: string | null) => {
        set({ cancellationError: error, cancellationLoading: false });
      },

      setDocumentError: (error: string | null) => {
        set({ documentError: error, documentLoading: false });
      },

      setBulkOperationError: (error: string | null) => {
        set({ bulkOperationError: error, bulkOperationLoading: false });
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
            booking.customerDetails.firstName.toLowerCase().includes(query) ||
            booking.customerDetails.lastName.toLowerCase().includes(query) ||
            booking.customerDetails.email.toLowerCase().includes(query) ||
            booking.entityDetails.name.toLowerCase().includes(query) ||
            booking.participants.some(participant =>
              participant.firstName.toLowerCase().includes(query) ||
              participant.lastName.toLowerCase().includes(query)
            )
          );
        }

        // Apply filters
        if (selectedFilters.status?.length) {
          filtered = filtered.filter(booking =>
            selectedFilters.status!.includes(booking.status)
          );
        }

        if (selectedFilters.bookingType?.length) {
          filtered = filtered.filter(booking =>
            selectedFilters.bookingType!.includes(booking.bookingType)
          );
        }

        if (selectedFilters.paymentStatus?.length) {
          filtered = filtered.filter(booking =>
            selectedFilters.paymentStatus!.includes(booking.paymentStatus)
          );
        }

        if (selectedFilters.source?.length) {
          filtered = filtered.filter(booking =>
            selectedFilters.source!.includes(booking.source)
          );
        }

        if (selectedFilters.bookingDateRange) {
          const fromDate = new Date(selectedFilters.bookingDateRange.from);
          const toDate = new Date(selectedFilters.bookingDateRange.to);
          filtered = filtered.filter(booking => {
            const bookingDate = new Date(booking.bookingDate);
            return bookingDate >= fromDate && bookingDate <= toDate;
          });
        }

        if (selectedFilters.travelDateRange) {
          const fromDate = new Date(selectedFilters.travelDateRange.from);
          const toDate = new Date(selectedFilters.travelDateRange.to);
          filtered = filtered.filter(booking => {
            const travelDate = new Date(booking.travelDate);
            return travelDate >= fromDate && travelDate <= toDate;
          });
        }

        if (selectedFilters.customerId) {
          filtered = filtered.filter(booking =>
            booking.customerId === selectedFilters.customerId
          );
        }

        if (selectedFilters.entityId) {
          filtered = filtered.filter(booking =>
            booking.entityId === selectedFilters.entityId
          );
        }

        if (selectedFilters.entityType) {
          filtered = filtered.filter(booking =>
            booking.bookingType === selectedFilters.entityType
          );
        }

        if (selectedFilters.priceRange) {
          const { min, max } = selectedFilters.priceRange;
          filtered = filtered.filter(booking =>
            booking.pricing.grandTotal >= min && booking.pricing.grandTotal <= max
          );
        }

        if (selectedFilters.participantCount) {
          const { min, max } = selectedFilters.participantCount;
          filtered = filtered.filter(booking =>
            booking.totalParticipants >= min && booking.totalParticipants <= max
          );
        }

        if (selectedFilters.hasSpecialRequests !== undefined) {
          filtered = filtered.filter(booking =>
            Boolean(booking.specialRequests?.trim()) === selectedFilters.hasSpecialRequests
          );
        }

        if (selectedFilters.requiresWaiver !== undefined) {
          filtered = filtered.filter(booking =>
            booking.waiverRequired === selectedFilters.requiresWaiver
          );
        }

        if (selectedFilters.hasRefunds !== undefined) {
          const hasRefunds = selectedFilters.hasRefunds;
          filtered = filtered.filter(booking => {
            const refundPayments = booking.payments.filter(payment => payment.type === 'refund');
            return hasRefunds ? refundPayments.length > 0 : refundPayments.length === 0;
          });
        }

        if (selectedFilters.overdue !== undefined && selectedFilters.overdue) {
          const now = new Date();
          filtered = filtered.filter(booking => {
            const overduePayments = booking.payments.filter(payment =>
              payment.status === 'pending' &&
              payment.dueDate &&
              new Date(payment.dueDate) < now
            );
            return overduePayments.length > 0;
          });
        }

        set({ filteredBookings: filtered });
      },

      // Utility Actions
      clearAllData: () => {
        set({
          bookings: [],
          selectedBooking: null,
          filteredBookings: [],
          participants: [],
          payments: [],
          notifications: [],
          notes: [],
          bookingStats: null,
          calendarData: null,
          upcomingDepartures: [],
          searchQuery: '',
          selectedFilters: {},
          lastBookingsUpdate: null,
          lastStatsUpdate: null,
          lastCalendarUpdate: null,
          lastDeparturesUpdate: null,
          lastParticipantsUpdate: null,
          lastPaymentsUpdate: null,
          lastNotificationsUpdate: null,
          lastNotesUpdate: null,
        });
      },

      clearErrors: () => {
        set({
          error: null,
          bookingsError: null,
          searchError: null,
          participantsError: null,
          paymentsError: null,
          notificationsError: null,
          statusUpdateError: null,
          cancellationError: null,
          documentError: null,
          bulkOperationError: null,
        });
      },

      updateCacheTimestamp: (type: 'bookings' | 'stats' | 'calendar' | 'departures' | 'participants' | 'payments' | 'notifications' | 'notes') => {
        const timestamp = Date.now();
        if (type === 'bookings') {
          set({ lastBookingsUpdate: timestamp });
        } else if (type === 'stats') {
          set({ lastStatsUpdate: timestamp });
        } else if (type === 'calendar') {
          set({ lastCalendarUpdate: timestamp });
        } else if (type === 'departures') {
          set({ lastDeparturesUpdate: timestamp });
        } else if (type === 'participants') {
          set({ lastParticipantsUpdate: timestamp });
        } else if (type === 'payments') {
          set({ lastPaymentsUpdate: timestamp });
        } else if (type === 'notifications') {
          set({ lastNotificationsUpdate: timestamp });
        } else if (type === 'notes') {
          set({ lastNotesUpdate: timestamp });
        }
      },

      isCacheValid: (type: 'bookings' | 'stats' | 'calendar' | 'departures' | 'participants' | 'payments' | 'notifications' | 'notes', maxAge: number = 5 * 60 * 1000) => {
        const state = get();
        let lastUpdate: number | null = null;

        if (type === 'bookings') {
          lastUpdate = state.lastBookingsUpdate;
        } else if (type === 'stats') {
          lastUpdate = state.lastStatsUpdate;
        } else if (type === 'calendar') {
          lastUpdate = state.lastCalendarUpdate;
        } else if (type === 'departures') {
          lastUpdate = state.lastDeparturesUpdate;
        } else if (type === 'participants') {
          lastUpdate = state.lastParticipantsUpdate;
        } else if (type === 'payments') {
          lastUpdate = state.lastPaymentsUpdate;
        } else if (type === 'notifications') {
          lastUpdate = state.lastNotificationsUpdate;
        } else if (type === 'notes') {
          lastUpdate = state.lastNotesUpdate;
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
        bookingStats: state.bookingStats,
        calendarData: state.calendarData,
        upcomingDepartures: state.upcomingDepartures,
        lastBookingsUpdate: state.lastBookingsUpdate,
        lastStatsUpdate: state.lastStatsUpdate,
        lastCalendarUpdate: state.lastCalendarUpdate,
        lastDeparturesUpdate: state.lastDeparturesUpdate,
        lastParticipantsUpdate: state.lastParticipantsUpdate,
        lastPaymentsUpdate: state.lastPaymentsUpdate,
        lastNotificationsUpdate: state.lastNotificationsUpdate,
        lastNotesUpdate: state.lastNotesUpdate,
      }),
    }
  )
);