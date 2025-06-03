'use client';

import { useCallback, useEffect } from 'react';
import { useBookingStore } from '@/store/booking-store';
import {
    bookingService,
    SearchBookingsRequest,
    ConfirmBookingRequest,
    ModificationRequest,
    NotificationRequest,
    AvailabilityCheckRequest,
    BulkOperationRequest,
    RevenueReportRequest,
    WaitlistRequest
} from '@/service/booking-service';
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
    CreateBookingRequest,
    UpdateBookingRequest,
    AddParticipantRequest,
    CancelParticipantRequest,
    ProcessPaymentRequest,
    CancelBookingRequest,
} from '@/types/booking';
import { handleApiError } from '@/lib/api';
import { toast } from 'sonner';

export const useBooking = () => {
    const {
        // State
        bookings,
        selectedBooking,
        filteredBookings,
        participants,
        payments,
        notifications,
        notes,
        bookingStats,
        calendarData,
        upcomingDepartures,

        // Loading States
        isLoading,
        bookingsLoading,
        searchLoading,
        participantsLoading,
        paymentsLoading,
        notificationsLoading,
        statusUpdateLoading,
        cancellationLoading,
        documentLoading,
        bulkOperationLoading,

        // Error States
        error,
        bookingsError,
        searchError,
        participantsError,
        paymentsError,
        notificationsError,
        statusUpdateError,
        cancellationError,
        documentError,
        bulkOperationError,

        // Search & Filter State
        searchQuery,
        selectedFilters,

        // Actions
        setBookings,
        addBooking,
        updateBooking,
        removeBooking,
        setSelectedBooking,
        setFilteredBookings,
        setParticipants,
        addParticipant,
        updateParticipant,
        removeParticipant,
        setPayments,
        addPayment,
        updatePayment,
        setNotifications,
        addNotification,
        setNotes,
        addNote,
        updateNote,
        removeNote,
        setBookingStats,
        setCalendarData,
        setUpcomingDepartures,
        setLoading,
        setBookingsLoading,
        setSearchLoading,
        setParticipantsLoading,
        setPaymentsLoading,
        setNotificationsLoading,
        setStatusUpdateLoading,
        setCancellationLoading,
        setDocumentLoading,
        setBulkOperationLoading,
        setError,
        setBookingsError,
        setSearchError,
        setParticipantsError,
        setPaymentsError,
        setNotificationsError,
        setStatusUpdateError,
        setCancellationError,
        setDocumentError,
        setBulkOperationError,
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
     * Get booking by booking number
     */
    const getBookingByNumber = useCallback(async (bookingNumber: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await bookingService.getBookingByNumber(bookingNumber);

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

    /**
     * Duplicate booking
     */
    const duplicateBooking = useCallback(async (id: string, modifications?: Partial<CreateBookingRequest>) => {
        try {
            setLoading(true);
            setError(null);

            const response = await bookingService.duplicateBooking(id, modifications);

            if (response.success) {
                addBooking(response.data);
                toast.success('Booking duplicated successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to duplicate booking';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to duplicate booking');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [addBooking, setLoading, setError]);

    // ========================
    // Search and Filter
    // ========================

    /**
     * Search bookings
     */
    const searchBookings = useCallback(async (request: SearchBookingsRequest) => {
        try {
            setSearchLoading(true);
            setSearchError(null);

            const response = await bookingService.searchBookings(request);

            if (response.success) {
                setFilteredBookings(response.data.bookings);
                setSearchQuery(request.query);
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

    /**
     * Get bookings by status
     */
    const getBookingsByStatus = useCallback(async (status: BookingStatus) => {
        try {
            setSearchLoading(true);
            setSearchError(null);

            const response = await bookingService.getBookingsByStatus(status);

            if (response.success) {
                setFilteredBookings(response.data);
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to fetch bookings by status';
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
    }, [setFilteredBookings, setSearchLoading, setSearchError]);

    /**
     * Get bookings by customer
     */
    const getBookingsByCustomer = useCallback(async (customerId: string) => {
        try {
            setSearchLoading(true);
            setSearchError(null);

            const response = await bookingService.getBookingsByCustomer(customerId);

            if (response.success) {
                setFilteredBookings(response.data);
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to fetch bookings by customer';
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
    }, [setFilteredBookings, setSearchLoading, setSearchError]);

    // ========================
    // Participant Management
    // ========================

    /**
     * Get booking participants
     */
    const getParticipants = useCallback(async (bookingId: string) => {
        try {
            setParticipantsLoading(true);
            setParticipantsError(null);

            const response = await bookingService.getParticipants(bookingId);

            if (response.success) {
                setParticipants(response.data);
                updateCacheTimestamp('participants');
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
    }, [setParticipants, setParticipantsLoading, setParticipantsError, updateCacheTimestamp]);

    /**
     * Add participant to booking
     */
    const addParticipantToBooking = useCallback(async (bookingId: string, data: AddParticipantRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await bookingService.addParticipant(bookingId, data);

            if (response.success) {
                addParticipant(response.data.participant);
                // Update booking with new pricing if available
                if (selectedBooking && selectedBooking.id === bookingId) {
                    const updatedBooking = { ...selectedBooking, pricing: response.data.updatedPricing };
                    updateBooking(updatedBooking);
                }
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
    }, [addParticipant, selectedBooking, updateBooking, setLoading, setError]);

    /**
     * Update participant
     */
    const updateParticipantItem = useCallback(async (bookingId: string, participantId: string, data: Partial<BookingParticipant>) => {
        try {
            setLoading(true);
            setError(null);

            const response = await bookingService.updateParticipant(bookingId, participantId, data);

            if (response.success) {
                updateParticipant(response.data);
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
    }, [updateParticipant, setLoading, setError]);

    /**
     * Cancel participant
     */
    const cancelParticipant = useCallback(async (bookingId: string, data: CancelParticipantRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await bookingService.cancelParticipant(bookingId, data);

            if (response.success) {
                updateParticipant(response.data.participant);
                // Update booking with new pricing
                if (selectedBooking && selectedBooking.id === bookingId) {
                    const updatedBooking = { ...selectedBooking, pricing: response.data.updatedPricing };
                    updateBooking(updatedBooking);
                }
                toast.success(`Participant cancelled. Refund amount: ${response.data.refundAmount}`);
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to cancel participant';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to cancel participant');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [updateParticipant, selectedBooking, updateBooking, setLoading, setError]);

    /**
     * Check in participant
     */
    const checkInParticipant = useCallback(async (bookingId: string, participantId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await bookingService.checkInParticipant(bookingId, participantId);

            if (response.success) {
                updateParticipant(response.data);
                toast.success('Participant checked in successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to check in participant';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to check in participant');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [updateParticipant, setLoading, setError]);

    // ========================
    // Payment Management
    // ========================

    /**
     * Get booking payments
     */
    const getPayments = useCallback(async (bookingId: string) => {
        try {
            setPaymentsLoading(true);
            setPaymentsError(null);

            const response = await bookingService.getPayments(bookingId);

            if (response.success) {
                setPayments(response.data);
                updateCacheTimestamp('payments');
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
    }, [setPayments, setPaymentsLoading, setPaymentsError, updateCacheTimestamp]);

    /**
     * Process payment
     */
    const processPayment = useCallback(async (data: ProcessPaymentRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await bookingService.processPayment(data);

            if (response.success) {
                addPayment(response.data.payment);
                updateBooking(response.data.booking);
                toast.success('Payment processed successfully');
                if (response.data.receipt) {
                    toast.success('Receipt generated');
                }
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to process payment';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to process payment');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [addPayment, updateBooking, setLoading, setError]);

    /**
     * Refund payment
     */
    const refundPayment = useCallback(async (bookingId: string, paymentId: string, amount?: number, reason?: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await bookingService.refundPayment(bookingId, paymentId, amount, reason);

            if (response.success) {
                addPayment(response.data.refund);
                updateBooking(response.data.booking);
                toast.success('Refund processed successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to process refund';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to process refund');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [addPayment, updateBooking, setLoading, setError]);

    /**
     * Apply promo code
     */
    const applyPromoCode = useCallback(async (bookingId: string, code: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await bookingService.applyPromoCode(bookingId, code);

            if (response.success) {
                // Update booking with new pricing
                if (selectedBooking && selectedBooking.id === bookingId) {
                    const updatedBooking = { ...selectedBooking, pricing: response.data.updatedPricing };
                    updateBooking(updatedBooking);
                }
                toast.success('Promo code applied successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to apply promo code';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to apply promo code');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [selectedBooking, updateBooking, setLoading, setError]);

    // ========================
    // Status Management
    // ========================

    /**
     * Update booking status
     */
    const updateStatus = useCallback(async (bookingId: string, status: BookingStatus, reason?: string) => {
        try {
            setStatusUpdateLoading(true);
            setStatusUpdateError(null);

            const response = await bookingService.updateStatus(bookingId, status, reason);

            if (response.success) {
                updateBooking(response.data);
                toast.success(`Booking status updated to ${status}`);
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to update status';
                setStatusUpdateError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setStatusUpdateError(errorMessage);
            toast.error('Failed to update status');
            return { success: false, error: errorMessage };
        } finally {
            setStatusUpdateLoading(false);
        }
    }, [updateBooking, setStatusUpdateLoading, setStatusUpdateError]);

    /**
     * Confirm booking
     */
    const confirmBooking = useCallback(async (data: ConfirmBookingRequest) => {
        try {
            setStatusUpdateLoading(true);
            setStatusUpdateError(null);

            const response = await bookingService.confirmBooking(data);

            if (response.success) {
                updateBooking(response.data);
                toast.success('Booking confirmed successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to confirm booking';
                setStatusUpdateError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setStatusUpdateError(errorMessage);
            toast.error('Failed to confirm booking');
            return { success: false, error: errorMessage };
        } finally {
            setStatusUpdateLoading(false);
        }
    }, [updateBooking, setStatusUpdateLoading, setStatusUpdateError]);

    /**
     * Cancel booking
     */
    const cancelBooking = useCallback(async (data: CancelBookingRequest) => {
        try {
            setCancellationLoading(true);
            setCancellationError(null);

            const response = await bookingService.cancelBooking(data);

            if (response.success) {
                updateBooking(response.data.booking);
                toast.success(`Booking cancelled. Refund: ${response.data.refundAmount}, Fee: ${response.data.cancellationFee}`);
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to cancel booking';
                setCancellationError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setCancellationError(errorMessage);
            toast.error('Failed to cancel booking');
            return { success: false, error: errorMessage };
        } finally {
            setCancellationLoading(false);
        }
    }, [updateBooking, setCancellationLoading, setCancellationError]);

    /**
     * Complete booking
     */
    const completeBooking = useCallback(async (bookingId: string, feedback?: any) => {
        try {
            setStatusUpdateLoading(true);
            setStatusUpdateError(null);

            const response = await bookingService.completeBooking(bookingId, feedback);

            if (response.success) {
                updateBooking(response.data);
                toast.success('Booking completed successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to complete booking';
                setStatusUpdateError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setStatusUpdateError(errorMessage);
            toast.error('Failed to complete booking');
            return { success: false, error: errorMessage };
        } finally {
            setStatusUpdateLoading(false);
        }
    }, [updateBooking, setStatusUpdateLoading, setStatusUpdateError]);

    // ========================
    // Communication & Notifications
    // ========================

    /**
     * Send notification
     */
    const sendNotification = useCallback(async (bookingId: string, notification: NotificationRequest) => {
        try {
            setNotificationsLoading(true);
            setNotificationsError(null);

            const response = await bookingService.sendNotification(bookingId, notification);

            if (response.success) {
                addNotification(response.data);
                toast.success('Notification sent successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to send notification';
                setNotificationsError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setNotificationsError(errorMessage);
            toast.error('Failed to send notification');
            return { success: false, error: errorMessage };
        } finally {
            setNotificationsLoading(false);
        }
    }, [addNotification, setNotificationsLoading, setNotificationsError]);

    /**
     * Get communication history
     */
    const getCommunicationHistory = useCallback(async (bookingId: string) => {
        try {
            setNotificationsLoading(true);
            setNotificationsError(null);

            const response = await bookingService.getCommunicationHistory(bookingId);

            if (response.success) {
                setNotifications(response.data);
                updateCacheTimestamp('notifications');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to fetch communication history';
                setNotificationsError(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setNotificationsError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setNotificationsLoading(false);
        }
    }, [setNotifications, setNotificationsLoading, setNotificationsError, updateCacheTimestamp]);

    // ========================
    // Notes Management
    // ========================

    /**
     * Get booking notes
     */
    const getNotes = useCallback(async (bookingId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await bookingService.getNotes(bookingId);

            if (response.success) {
                setNotes(response.data);
                updateCacheTimestamp('notes');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to fetch notes';
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
    }, [setNotes, setLoading, setError, updateCacheTimestamp]);

    /**
     * Add note
     */
    const addNoteToBooking = useCallback(async (bookingId: string, note: Omit<BookingNote, 'id' | 'createdAt'>) => {
        try {
            setLoading(true);
            setError(null);

            const response = await bookingService.addNote(bookingId, note);

            if (response.success) {
                addNote(response.data);
                toast.success('Note added successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to add note';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to add note');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [addNote, setLoading, setError]);

    // ========================
    // Documents & Waivers
    // ========================

    /**
     * Generate voucher
     */
    const generateVoucher = useCallback(async (bookingId: string, format: 'pdf' | 'html' = 'pdf') => {
        try {
            setDocumentLoading(true);
            setDocumentError(null);

            const response = await bookingService.generateVoucher(bookingId, format);

            if (response.success) {
                toast.success('Voucher generated successfully');
                // Open the generated document
                window.open(response.data.url, '_blank');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to generate voucher';
                setDocumentError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setDocumentError(errorMessage);
            toast.error('Failed to generate voucher');
            return { success: false, error: errorMessage };
        } finally {
            setDocumentLoading(false);
        }
    }, [setDocumentLoading, setDocumentError]);

    /**
     * Generate invoice
     */
    const generateInvoice = useCallback(async (bookingId: string, format: 'pdf' | 'html' = 'pdf') => {
        try {
            setDocumentLoading(true);
            setDocumentError(null);

            const response = await bookingService.generateInvoice(bookingId, format);

            if (response.success) {
                toast.success('Invoice generated successfully');
                // Open the generated document
                window.open(response.data.url, '_blank');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to generate invoice';
                setDocumentError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setDocumentError(errorMessage);
            toast.error('Failed to generate invoice');
            return { success: false, error: errorMessage };
        } finally {
            setDocumentLoading(false);
        }
    }, [setDocumentLoading, setDocumentError]);

    // ========================
    // Availability & Validation
    // ========================

    /**
     * Check availability
     */
    const checkAvailability = useCallback(async (request: AvailabilityCheckRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await bookingService.checkAvailability(request);

            if (response.success) {
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to check availability';
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
     * Validate booking
     */
    const validateBooking = useCallback(async (bookingId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await bookingService.validateBooking(bookingId);

            if (response.success) {
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to validate booking';
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
    // Analytics & Reports
    // ========================

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

    /**
     * Export bookings
     */
    const exportBookings = useCallback(async (filters?: BookingFilters, format: 'excel' | 'csv' | 'pdf' = 'excel') => {
        try {
            setLoading(true);
            setError(null);

            const response = await bookingService.exportBookings(filters, format);

            if (response.success) {
                toast.success('Export generated successfully');
                // Download the exported file
                window.open(response.data.url, '_blank');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to export bookings';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to export bookings');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError]);

    // ========================
    // Calendar & Scheduling
    // ========================

    /**
     * Get calendar view
     */
    const getCalendar = useCallback(async (year: number, month: number, entityType?: BookingType, forceRefresh?: boolean) => {
        try {
            if (!forceRefresh && isCacheValid('calendar') && calendarData) {
                return { success: true, data: calendarData };
            }

            setLoading(true);
            setError(null);

            const response = await bookingService.getCalendar(year, month, entityType);

            if (response.success) {
                setCalendarData(response.data);
                updateCacheTimestamp('calendar');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to fetch calendar';
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
    }, [calendarData, isCacheValid, setCalendarData, setLoading, setError, updateCacheTimestamp]);

    /**
     * Get upcoming departures
     */
    const getUpcomingDepartures = useCallback(async (days: number = 7, forceRefresh?: boolean) => {
        try {
            if (!forceRefresh && isCacheValid('departures') && upcomingDepartures.length > 0) {
                return { success: true, data: upcomingDepartures };
            }

            setLoading(true);
            setError(null);

            const response = await bookingService.getUpcomingDepartures(days);

            if (response.success) {
                setUpcomingDepartures(response.data);
                updateCacheTimestamp('departures');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to fetch upcoming departures';
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
    }, [upcomingDepartures, isCacheValid, setUpcomingDepartures, setLoading, setError, updateCacheTimestamp]);

    // ========================
    // Bulk Operations
    // ========================

    /**
     * Bulk operations on bookings
     */
    const bulkOperation = useCallback(async (request: BulkOperationRequest) => {
        try {
            setBulkOperationLoading(true);
            setBulkOperationError(null);

            const response = await bookingService.bulkOperation(request);

            if (response.success) {
                toast.success(`${response.data.processed} bookings processed successfully`);
                // Refresh bookings list
                await getAllBookings(undefined, true);
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to perform bulk operation';
                setBulkOperationError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setBulkOperationError(errorMessage);
            toast.error('Failed to perform bulk operation');
            return { success: false, error: errorMessage };
        } finally {
            setBulkOperationLoading(false);
        }
    }, [setBulkOperationLoading, setBulkOperationError, getAllBookings]);

    // ========================
    // Waitlist Management
    // ========================

    /**
     * Add to waitlist
     */
    const addToWaitlist = useCallback(async (request: WaitlistRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await bookingService.addToWaitlist(request);

            if (response.success) {
                toast.success(`Added to waitlist. Position: ${response.data.position}`);
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to add to waitlist';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to add to waitlist');
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
                getBookingStats(),
                getUpcomingDepartures(),
            ]);
        } catch (error) {
            console.error('Failed to initialize booking data:', error);
        }
    }, [getAllBookings, getBookingStats, getUpcomingDepartures]);

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
        if (!bookings.length && !bookingStats) {
            initializeBookingData();
        }
    }, [bookings.length, bookingStats, initializeBookingData]);

    return {
        // State
        bookings,
        selectedBooking,
        filteredBookings,
        participants,
        payments,
        notifications,
        notes,
        bookingStats,
        calendarData,
        upcomingDepartures,

        // Loading States
        isLoading,
        bookingsLoading,
        searchLoading,
        participantsLoading,
        paymentsLoading,
        notificationsLoading,
        statusUpdateLoading,
        cancellationLoading,
        documentLoading,
        bulkOperationLoading,

        // Error States
        error,
        bookingsError,
        searchError,
        participantsError,
        paymentsError,
        notificationsError,
        statusUpdateError,
        cancellationError,
        documentError,
        bulkOperationError,

        // Search & Filter State
        searchQuery,
        selectedFilters,

        // Basic CRUD Actions
        getAllBookings,
        getBookingById,
        getBookingByNumber,
        createBooking,
        updateBookingItem,
        deleteBooking,
        duplicateBooking,
        setSelectedBooking,

        // Search and Filter Actions
        searchBookings,
        filterBookings,
        getBookingsByStatus,
        getBookingsByCustomer,
        clearSearch,

        // Participant Management Actions
        getParticipants,
        addParticipantToBooking,
        updateParticipantItem,
        cancelParticipant,
        checkInParticipant,

        // Payment Actions
        getPayments,
        processPayment,
        refundPayment,
        applyPromoCode,

        // Status Management Actions
        updateStatus,
        confirmBooking,
        cancelBooking,
        completeBooking,

        // Communication Actions
        sendNotification,
        getCommunicationHistory,

        // Notes Actions
        getNotes,
        addNoteToBooking,

        // Document Actions
        generateVoucher,
        generateInvoice,

        // Validation Actions
        checkAvailability,
        validateBooking,

        // Analytics Actions
        getBookingStats,
        exportBookings,

        // Calendar Actions
        getCalendar,
        getUpcomingDepartures,

        // Bulk Actions
        bulkOperation,

        // Waitlist Actions
        addToWaitlist,

        // Utility Actions
        initializeBookingData,
        clearAllErrors,
    };
};