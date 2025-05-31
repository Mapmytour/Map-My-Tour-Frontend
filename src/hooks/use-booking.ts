'use client';

import { useCallback, useEffect } from 'react';
import { useBookingStore } from '@/store/booking-store';
import { 
  bookingService,
  CreateBookingRequest,
  UpdateBookingRequest,
  CreateParticipantRequest,
  UpdateParticipantRequest,
  AddPaymentRequest,
  UpdatePaymentRequest,
  RefundPaymentRequest,
  BookingSearchRequest,
  SendEmailRequest,
  BulkStatusUpdateRequest
} from '@/service/booking-service';
import {
  Booking,
  BookingParticipant,
  BookingPayment,
  BookingFilters,
} from '@/types/booking';
import { handleApiError } from '@/lib/api';
import { toast } from 'sonner';

export const useBooking = () => {
  const {
    // State
    bookings,
    userBookings,
    selectedBooking,
    filteredBookings,
    bookingStats,
    
    // Loading States
    isLoading,
    bookingsLoading,
    searchLoading,
    participantsLoading,
    paymentsLoading,
    statusLoading,
    documentsLoading,
    
    // Error States
    error,
    bookingsError,
    searchError,
    participantsError,
    paymentsError,
    statusError,
    documentsError,
    
    // Search & Filter State
    searchQuery,
    selectedFilters,
    
    // Actions
    setBookings,
    setUserBookings,
    addBooking,
    updateBooking,
    removeBooking,
    setSelectedBooking,
    setFilteredBookings,
    setBookingStats,
    setLoading,
    setBookingsLoading,
    setSearchLoading,
    setParticipantsLoading,
    setPaymentsLoading,
    setStatusLoading,
    setDocumentsLoading,
    setError,
    setBookingsError,
    setSearchError,
    setParticipantsError,
    setPaymentsError,
    setStatusError,
    setDocumentsError,
    setSearchQuery,
    setSelectedFilters,
    clearErrors,
    updateCacheTimestamp,
    isCacheValid,
  } = useBookingStore();

  // ========================
  // Basic CRUD Operations
  // ========================

  /**
   * Get all bookings
   */
  const getAllBookings = useCallback(async (filters?: BookingFilters, forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('bookings') && bookings.length > 0 && !filters) {
        return { success: true, data: { bookings, total: bookings.length } };
      }

      setBookingsLoading(true);
      setBookingsError(null);

      const response = await bookingService.getAllBookings(filters);
      
      if (response.success) {
        setBookings(response.data.bookings);
        updateCacheTimestamp('bookings');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch bookings';
        setBookingsError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setBookingsError(errorMessage);
      toast.error('Failed to fetch bookings');
      return { success: false, error: errorMessage };
    } finally {
      setBookingsLoading(false);
    }
  }, [bookings, isCacheValid, setBookings, setBookingsLoading, setBookingsError, updateCacheTimestamp]);

  /**
   * Get booking by ID
   */
  const getBookingById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await bookingService.getBookingById(id);
      
      if (response.success) {
        setSelectedBooking(response.data);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch booking';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to fetch booking');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setSelectedBooking]);

  /**
   * Create new booking
   */
  const createBooking = useCallback(async (data: CreateBookingRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await bookingService.createBooking(data);
      
      if (response.success) {
        addBooking(response.data);
        toast.success('Booking created successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to create booking';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to create booking');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [addBooking, setLoading, setError]);

  /**
   * Update booking
   */
  const updateBookingItem = useCallback(async (data: UpdateBookingRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await bookingService.updateBooking(data);
      
      if (response.success) {
        updateBooking(response.data);
        toast.success('Booking updated successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to update booking';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to update booking');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [updateBooking, setLoading, setError]);

  /**
   * Delete booking
   */
  const deleteBooking = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await bookingService.deleteBooking(id);
      
      if (response.success) {
        removeBooking(id);
        toast.success('Booking deleted successfully');
        return { success: true, message: response.message };
      } else {
        const errorMessage = response.message || 'Failed to delete booking';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to delete booking');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [removeBooking, setLoading, setError]);

  // ========================
  // User-specific Bookings
  // ========================

  /**
   * Get user bookings
   */
  const getUserBookings = useCallback(async (page?: number, limit?: number, forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('userBookings') && userBookings.length > 0) {
        return { success: true, data: { bookings: userBookings, total: userBookings.length } };
      }

      setBookingsLoading(true);
      setBookingsError(null);

      const response = await bookingService.getUserBookings(page, limit);
      
      if (response.success) {
        setUserBookings(response.data.bookings);
        updateCacheTimestamp('userBookings');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch user bookings';
        setBookingsError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setBookingsError(errorMessage);
      toast.error('Failed to fetch user bookings');
      return { success: false, error: errorMessage };
    } finally {
      setBookingsLoading(false);
    }
  }, [userBookings, isCacheValid, setUserBookings, setBookingsLoading, setBookingsError, updateCacheTimestamp]);

  /**
   * Get user booking by ID
   */
  const getUserBookingById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await bookingService.getUserBookingById(id);
      
      if (response.success) {
        setSelectedBooking(response.data);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch user booking';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to fetch user booking');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setSelectedBooking]);

  // ========================
  // Search and Filter
  // ========================

  /**
   * Search bookings
   */
  const searchBookings = useCallback(async (request: BookingSearchRequest) => {
    try {
      setSearchLoading(true);
      setSearchError(null);

      const response = await bookingService.searchBookings(request);
      
      if (response.success) {
        setFilteredBookings(response.data.bookings);
        setSearchQuery(request.query || '');
        setSelectedFilters(request.filters || {});
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to search bookings';
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
  }, [setFilteredBookings, setSearchQuery, setSelectedFilters, setSearchLoading, setSearchError]);

  /**
   * Filter bookings
   */
  const filterBookings = useCallback(async (filters: BookingFilters) => {
    try {
      setSearchLoading(true);
      setSearchError(null);

      const response = await bookingService.filterBookings(filters);
      
      if (response.success) {
        setFilteredBookings(response.data);
        setSelectedFilters(filters);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to filter bookings';
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
  }, [setFilteredBookings, setSelectedFilters, setSearchLoading, setSearchError]);

  // ========================
  // Participants Management
  // ========================

  /**
   * Add participant to booking
   */
  const addParticipant = useCallback(async (bookingId: string, participant: CreateParticipantRequest) => {
    try {
      setParticipantsLoading(true);
      setParticipantsError(null);

      const response = await bookingService.addParticipant(bookingId, participant);
      
      if (response.success) {
        toast.success('Participant added successfully');
        // Refresh booking to get updated participant list
        await getBookingById(bookingId);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to add participant';
        setParticipantsError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setParticipantsError(errorMessage);
      toast.error('Failed to add participant');
      return { success: false, error: errorMessage };
    } finally {
      setParticipantsLoading(false);
    }
  }, [setParticipantsLoading, setParticipantsError, getBookingById]);

  /**
   * Update participant
   */
  const updateParticipant = useCallback(async (bookingId: string, data: UpdateParticipantRequest) => {
    try {
      setParticipantsLoading(true);
      setParticipantsError(null);

      const response = await bookingService.updateParticipant(bookingId, data);
      
      if (response.success) {
        toast.success('Participant updated successfully');
        // Refresh booking to get updated participant data
        await getBookingById(bookingId);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to update participant';
        setParticipantsError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setParticipantsError(errorMessage);
      toast.error('Failed to update participant');
      return { success: false, error: errorMessage };
    } finally {
      setParticipantsLoading(false);
    }
  }, [setParticipantsLoading, setParticipantsError, getBookingById]);

  /**
   * Remove participant from booking
   */
  const removeParticipant = useCallback(async (bookingId: string, participantId: string) => {
    try {
      setParticipantsLoading(true);
      setParticipantsError(null);

      const response = await bookingService.removeParticipant(bookingId, participantId);
      
      if (response.success) {
        toast.success('Participant removed successfully');
        // Refresh booking to get updated participant list
        await getBookingById(bookingId);
        return { success: true, message: response.message };
      } else {
        const errorMessage = response.message || 'Failed to remove participant';
        setParticipantsError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setParticipantsError(errorMessage);
      toast.error('Failed to remove participant');
      return { success: false, error: errorMessage };
    } finally {
      setParticipantsLoading(false);
    }
  }, [setParticipantsLoading, setParticipantsError, getBookingById]);

  // ========================
  // Payment Management
  // ========================

  /**
   * Get booking payments
   */
  const getBookingPayments = useCallback(async (bookingId: string) => {
    try {
      setPaymentsLoading(true);
      setPaymentsError(null);

      const response = await bookingService.getBookingPayments(bookingId);
      
      if (response.success) {
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch payments';
        setPaymentsError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setPaymentsError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setPaymentsLoading(false);
    }
  }, [setPaymentsLoading, setPaymentsError]);

  /**
   * Add payment to booking
   */
  const addPayment = useCallback(async (bookingId: string, payment: AddPaymentRequest) => {
    try {
      setPaymentsLoading(true);
      setPaymentsError(null);

      const response = await bookingService.addPayment(bookingId, payment);
      
      if (response.success) {
        toast.success('Payment added successfully');
        // Refresh booking to get updated payment data
        await getBookingById(bookingId);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to add payment';
        setPaymentsError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setPaymentsError(errorMessage);
      toast.error('Failed to add payment');
      return { success: false, error: errorMessage };
    } finally {
      setPaymentsLoading(false);
    }
  }, [setPaymentsLoading, setPaymentsError, getBookingById]);

  /**
   * Refund payment
   */
  const refundPayment = useCallback(async (bookingId: string, refundData: RefundPaymentRequest) => {
    try {
      setPaymentsLoading(true);
      setPaymentsError(null);

      const response = await bookingService.refundPayment(bookingId, refundData);
      
      if (response.success) {
        toast.success('Payment refunded successfully');
        // Refresh booking to get updated payment data
        await getBookingById(bookingId);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to refund payment';
        setPaymentsError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setPaymentsError(errorMessage);
      toast.error('Failed to refund payment');
      return { success: false, error: errorMessage };
    } finally {
      setPaymentsLoading(false);
    }
  }, [setPaymentsLoading, setPaymentsError, getBookingById]);

  // ========================
  // Status Management
  // ========================

  /**
   * Update booking status
   */
  const updateBookingStatus = useCallback(async (
    bookingId: string, 
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no-show',
    reason?: string
  ) => {
    try {
      setStatusLoading(true);
      setStatusError(null);

      const response = await bookingService.updateBookingStatus(bookingId, status, reason);
      
      if (response.success) {
        updateBooking(response.data);
        toast.success(`Booking ${status} successfully`);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to update booking status';
        setStatusError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setStatusError(errorMessage);
      toast.error('Failed to update booking status');
      return { success: false, error: errorMessage };
    } finally {
      setStatusLoading(false);
    }
  }, [updateBooking, setStatusLoading, setStatusError]);

  /**
   * Confirm booking
   */
  const confirmBooking = useCallback(async (bookingId: string) => {
    try {
      setStatusLoading(true);
      setStatusError(null);

      const response = await bookingService.confirmBooking(bookingId);
      
      if (response.success) {
        updateBooking(response.data);
        toast.success('Booking confirmed successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to confirm booking';
        setStatusError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setStatusError(errorMessage);
      toast.error('Failed to confirm booking');
      return { success: false, error: errorMessage };
    } finally {
      setStatusLoading(false);
    }
  }, [updateBooking, setStatusLoading, setStatusError]);

  /**
   * Cancel booking
   */
  const cancelBooking = useCallback(async (bookingId: string, reason?: string) => {
    try {
      setStatusLoading(true);
      setStatusError(null);

      const response = await bookingService.cancelBooking(bookingId, reason);
      
      if (response.success) {
        updateBooking(response.data);
        toast.success('Booking cancelled successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to cancel booking';
        setStatusError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setStatusError(errorMessage);
      toast.error('Failed to cancel booking');
      return { success: false, error: errorMessage };
    } finally {
      setStatusLoading(false);
    }
  }, [updateBooking, setStatusLoading, setStatusError]);

  // ========================
  // Communication
  // ========================

  /**
   * Send confirmation email
   */
  const sendConfirmation = useCallback(async (bookingId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await bookingService.sendConfirmation(bookingId);
      
      if (response.success) {
        toast.success('Confirmation email sent successfully');
        return { success: true, message: response.message };
      } else {
        const errorMessage = response.message || 'Failed to send confirmation';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to send confirmation');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  /**
   * Send reminder email
   */
  const sendReminder = useCallback(async (bookingId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await bookingService.sendReminder(bookingId);
      
      if (response.success) {
        toast.success('Reminder email sent successfully');
        return { success: true, message: response.message };
      } else {
        const errorMessage = response.message || 'Failed to send reminder';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to send reminder');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  /**
   * Send custom email
   */
  const sendCustomEmail = useCallback(async (bookingId: string, emailData: SendEmailRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await bookingService.sendCustomEmail(bookingId, emailData);
      
      if (response.success) {
        toast.success('Email sent successfully');
        return { success: true, message: response.message };
      } else {
        const errorMessage = response.message || 'Failed to send email';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to send email');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  // ========================
  // Documents and Reports
  // ========================

  /**
   * Generate voucher
   */
  const generateVoucher = useCallback(async (bookingId: string) => {
    try {
      setDocumentsLoading(true);
      setDocumentsError(null);

      const response = await bookingService.generateVoucher(bookingId);
      
      if (response.success) {
        toast.success('Voucher generated successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to generate voucher';
        setDocumentsError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setDocumentsError(errorMessage);
      toast.error('Failed to generate voucher');
      return { success: false, error: errorMessage };
    } finally {
      setDocumentsLoading(false);
    }
  }, [setDocumentsLoading, setDocumentsError]);

  /**
   * Generate invoice
   */
  const generateInvoice = useCallback(async (bookingId: string) => {
    try {
      setDocumentsLoading(true);
      setDocumentsError(null);

      const response = await bookingService.generateInvoice(bookingId);
      
      if (response.success) {
        toast.success('Invoice generated successfully');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to generate invoice';
        setDocumentsError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setDocumentsError(errorMessage);
      toast.error('Failed to generate invoice');
      return { success: false, error: errorMessage };
    } finally {
      setDocumentsLoading(false);
    }
  }, [setDocumentsLoading, setDocumentsError]);

  /**
   * Get booking statistics
   */
  const getBookingStats = useCallback(async (dateRange?: { from: string; to: string }, forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('stats') && bookingStats) {
        return { success: true, data: bookingStats };
      }

      setLoading(true);
      setError(null);

      const response = await bookingService.getBookingStats(dateRange);
      
      if (response.success) {
        setBookingStats(response.data);
        updateCacheTimestamp('stats');
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to fetch booking statistics';
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
  }, [bookingStats, isCacheValid, setBookingStats, setLoading, setError, updateCacheTimestamp]);

  // ========================
  // Bulk Operations
  // ========================

  /**
   * Bulk update booking status
   */
  const bulkUpdateStatus = useCallback(async (data: BulkStatusUpdateRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await bookingService.bulkUpdateStatus(data);
      
      if (response.success) {
        toast.success(`${response.data.updated} bookings updated successfully`);
        // Refresh bookings list
        await getAllBookings(undefined, true);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to update bookings';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to update bookings');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, getAllBookings]);

  /**
   * Bulk send reminders
   */
  const bulkSendReminders = useCallback(async (bookingIds: string[], template?: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await bookingService.bulkSendReminders(bookingIds, template);
      
      if (response.success) {
        toast.success(`${response.data.sent} reminders sent successfully`);
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to send reminders';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error('Failed to send reminders');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  // ========================
  // Utility Functions
  // ========================

  /**
   * Initialize booking data
   */
  const initializeBookingData = useCallback(async () => {
    try {
      await Promise.all([
        getAllBookings(),
        getUserBookings(),
        getBookingStats(),
      ]);
    } catch (error) {
      console.error('Failed to initialize booking data:', error);
    }
  }, [getAllBookings, getUserBookings, getBookingStats]);

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
    setFilteredBookings([]);
  }, [setSearchQuery, setSelectedFilters, setFilteredBookings]);

  // Auto-initialize on mount
  useEffect(() => {
    if (!bookings.length && !userBookings.length) {
      initializeBookingData();
    }
  }, [bookings.length, userBookings.length, initializeBookingData]);

  return {
    // State
    bookings,
    userBookings,
    selectedBooking,
    filteredBookings,
    bookingStats,
    
    // Loading States
    isLoading,
    bookingsLoading,
    searchLoading,
    participantsLoading,
    paymentsLoading,
    statusLoading,
    documentsLoading,
    
    // Error States
    error,
    bookingsError,
    searchError,
    participantsError,
    paymentsError,
    statusError,
    documentsError,
    
    // Search & Filter State
    searchQuery,
    selectedFilters,
    
    // Basic CRUD Actions
    getAllBookings,
    getBookingById,
    createBooking,
    updateBookingItem,
    deleteBooking,
    setSelectedBooking,
    
    // User Booking Actions
    getUserBookings,
    getUserBookingById,
    
    // Search and Filter Actions
    searchBookings,
    filterBookings,
    clearSearch,
    
    // Participant Actions
    addParticipant,
    updateParticipant,
    removeParticipant,
    
    // Payment Actions
    getBookingPayments,
    addPayment,
    refundPayment,
    
    // Status Actions
    updateBookingStatus,
    confirmBooking,
    cancelBooking,
    
    // Communication Actions
    sendConfirmation,
    sendReminder,
    sendCustomEmail,
    
    // Document Actions
    generateVoucher,
    generateInvoice,
    
    // Statistics Actions
    getBookingStats,
    
    // Bulk Actions
    bulkUpdateStatus,
    bulkSendReminders,
    
    // Utility Actions
    initializeBookingData,
    clearAllErrors,
  };
};