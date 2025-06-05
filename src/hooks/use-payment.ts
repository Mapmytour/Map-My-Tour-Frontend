'use client';

import { useCallback, useEffect } from 'react';
import { usePaymentStore } from '@/store/payment-store';
import { paymentService } from '@/service/payment-service';
import {
    Payment,
    Refund,
    PaymentStats,
    PaymentDocument,
    PaymentStatus,
    PaymentMethod,
    PaymentType,
    RefundStatus,
    RefundType,
    CreatePaymentRequest,
    ProcessPaymentRequest,
    CreateRefundRequest,
    RazorPayOrderRequest,
    VerifySignatureRequest,
    SearchPaymentsRequest,
    GenerateReceiptRequest,
    PaymentFilters,
} from '@/types/payment';
import { handleApiError } from '@/lib/api';
import { toast } from 'sonner';

export const usePayment = () => {
    const {
        // State
        payments,
        selectedPayment,
        filteredPayments,
        refunds,
        paymentStats,
        documents,

        // Loading States
        isLoading,
        paymentsLoading,
        searchLoading,
        refundsLoading,
        documentsLoading,

        // Error States
        error,
        paymentsError,
        searchError,
        refundsError,
        documentsError,

        // Search & Filter State
        searchQuery,
        selectedFilters,

        // Actions
        setPayments,
        addPayment,
        updatePayment,
        removePayment,
        setSelectedPayment,
        setFilteredPayments,
        setRefunds,
        addRefund,
        updateRefund,
        setPaymentStats,
        setDocuments,
        addDocument,
        setLoading,
        setPaymentsLoading,
        setSearchLoading,
        setRefundsLoading,
        setDocumentsLoading,
        setError,
        setPaymentsError,
        setSearchError,
        setRefundsError,
        setDocumentsError,
        setSearchQuery,
        setSelectedFilters,
        clearErrors,
        updateCacheTimestamp,
        isCacheValid,
    } = usePaymentStore();

    // ========================
    // Core Payment Operations
    // ========================

    /**
     * Get all payments
     */
    const getAllPayments = useCallback(async (filters?: PaymentFilters, forceRefresh?: boolean) => {
        try {
            if (!forceRefresh && isCacheValid('payments') && payments.length > 0 && !filters) {
                return { success: true, data: { payments, total: payments.length } };
            }

            setPaymentsLoading(true);
            setPaymentsError(null);

            const response = await paymentService.getAllPayments(filters);

            if (response.success) {
                setPayments(response.data.payments);
                updateCacheTimestamp('payments');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to fetch payments';
                setPaymentsError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setPaymentsError(errorMessage);
            toast.error('Failed to fetch payments');
            return { success: false, error: errorMessage };
        } finally {
            setPaymentsLoading(false);
        }
    }, [payments, isCacheValid, setPayments, setPaymentsLoading, setPaymentsError, updateCacheTimestamp]);

    /**
     * Create new payment
     */
    const createPayment = useCallback(async (data: CreatePaymentRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await paymentService.createPayment(data);

            if (response.success) {
                addPayment(response.data);
                toast.success('Payment created successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to create payment';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to create payment');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [addPayment, setLoading, setError]);

    /**
     * Process payment after RazorPay success
     */
    const processPayment = useCallback(async (data: ProcessPaymentRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await paymentService.processPayment(data);

            if (response.success) {
                updatePayment(response.data);
                toast.success('Payment processed successfully');
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
    }, [updatePayment, setLoading, setError]);

    /**
     * Get payment by ID
     */
    const getPaymentById = useCallback(async (id: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await paymentService.getPaymentById(id);

            if (response.success) {
                setSelectedPayment(response.data);
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to fetch payment';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to fetch payment');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError, setSelectedPayment]);

    /**
     * Get payments by booking ID
     */
    const getBookingPayments = useCallback(async (bookingId: string) => {
        try {
            setSearchLoading(true);
            setSearchError(null);

            const response = await paymentService.getBookingPayments(bookingId);

            if (response.success) {
                setFilteredPayments(response.data);
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to fetch booking payments';
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
    }, [setFilteredPayments, setSearchLoading, setSearchError]);

    /**
     * Cancel payment
     */
    const cancelPayment = useCallback(async (paymentId: string, reason?: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await paymentService.cancelPayment(paymentId, reason);

            if (response.success) {
                updatePayment(response.data);
                toast.success('Payment cancelled successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to cancel payment';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to cancel payment');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [updatePayment, setLoading, setError]);

    // ========================
    // Refund Management
    // ========================

    /**
     * Get payment refunds
     */
    const getPaymentRefunds = useCallback(async (paymentId: string, forceRefresh?: boolean) => {
        try {
            if (!forceRefresh && isCacheValid('refunds') && refunds.length > 0) {
                return { success: true, data: refunds };
            }

            setRefundsLoading(true);
            setRefundsError(null);

            const response = await paymentService.getPaymentRefunds(paymentId);

            if (response.success) {
                setRefunds(response.data);
                updateCacheTimestamp('refunds');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to fetch refunds';
                setRefundsError(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setRefundsError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setRefundsLoading(false);
        }
    }, [refunds, isCacheValid, setRefunds, setRefundsLoading, setRefundsError, updateCacheTimestamp]);

    /**
     * Create refund
     */
    const createRefund = useCallback(async (data: CreateRefundRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await paymentService.createRefund(data);

            if (response.success) {
                addRefund(response.data.refund);
                updatePayment(response.data.updatedPayment);
                toast.success(`Refund created successfully${response.data.estimatedSettlement ? `. Expected settlement: ${response.data.estimatedSettlement}` : ''}`);
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to create refund';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to create refund');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [addRefund, updatePayment, setLoading, setError]);

    // ========================
    // Document Management
    // ========================

    /**
     * Generate receipt
     */
    const generateReceipt = useCallback(async (data: GenerateReceiptRequest) => {
        try {
            setDocumentsLoading(true);
            setDocumentsError(null);

            const response = await paymentService.generateReceipt(data);

            if (response.success) {
                addDocument(response.data);
                toast.success('Receipt generated successfully');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to generate receipt';
                setDocumentsError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setDocumentsError(errorMessage);
            toast.error('Failed to generate receipt');
            return { success: false, error: errorMessage };
        } finally {
            setDocumentsLoading(false);
        }
    }, [addDocument, setDocumentsLoading, setDocumentsError]);

    /**
     * Download document
     */
    const downloadDocument = useCallback(async (documentId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await paymentService.downloadDocument(documentId);

            if (response.success) {
                // Open the download URL in a new tab
                window.open(response.data.downloadUrl, '_blank');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to download document';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to download document');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError]);

    // ========================
    // RazorPay Integration
    // ========================

    /**
     * Create RazorPay order
     */
    const createRazorPayOrder = useCallback(async (data: RazorPayOrderRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await paymentService.createRazorPayOrder(data);

            if (response.success) {
                updatePayment(response.data.payment);
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to create RazorPay order';
                setError(errorMessage);
                toast.error(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            toast.error('Failed to create RazorPay order');
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [updatePayment, setLoading, setError]);

    /**
     * Verify RazorPay signature
     */
    const verifyRazorPaySignature = useCallback(async (data: VerifySignatureRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await paymentService.verifyRazorPaySignature(data);

            if (response.success) {
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to verify signature';
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
    // Search and Analytics
    // ========================

    /**
     * Search payments
     */
    const searchPayments = useCallback(async (request: SearchPaymentsRequest) => {
        try {
            setSearchLoading(true);
            setSearchError(null);

            const response = await paymentService.searchPayments(request);

            if (response.success) {
                setFilteredPayments(response.data.payments);
                setSearchQuery(request.query);
                setSelectedFilters(request.filters || {});
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to search payments';
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
    }, [setFilteredPayments, setSearchQuery, setSelectedFilters, setSearchLoading, setSearchError]);

    /**
     * Get payment statistics
     */
    const getPaymentStats = useCallback(async (dateRange?: { from: string; to: string }, forceRefresh?: boolean) => {
        try {
            if (!forceRefresh && isCacheValid('stats') && paymentStats) {
                return { success: true, data: paymentStats };
            }

            setLoading(true);
            setError(null);

            const response = await paymentService.getPaymentStats(dateRange);

            if (response.success) {
                setPaymentStats(response.data);
                updateCacheTimestamp('stats');
                return { success: true, data: response.data };
            } else {
                const errorMessage = response.message || 'Failed to fetch payment statistics';
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
    }, [paymentStats, isCacheValid, setPaymentStats, setLoading, setError, updateCacheTimestamp]);

    // ========================
    // Utility Functions
    // ========================

    /**
     * Filter payments locally
     */
    const filterPayments = useCallback(async (filters: PaymentFilters) => {
        try {
            setSearchLoading(true);
            setSearchError(null);

            let filtered = payments;

            // Apply filters
            if (filters.status?.length) {
                filtered = filtered.filter(payment =>
                    filters.status!.includes(payment.status)
                );
            }

            if (filters.method?.length) {
                filtered = filtered.filter(payment =>
                    filters.method!.includes(payment.method)
                );
            }

            if (filters.type?.length) {
                filtered = filtered.filter(payment =>
                    filters.type!.includes(payment.type)
                );
            }

            if (filters.dateRange) {
                const fromDate = new Date(filters.dateRange.from);
                const toDate = new Date(filters.dateRange.to);
                filtered = filtered.filter(payment => {
                    const paymentDate = new Date(payment.createdAt);
                    return paymentDate >= fromDate && paymentDate <= toDate;
                });
            }

            if (filters.amountRange) {
                const { min, max } = filters.amountRange;
                filtered = filtered.filter(payment =>
                    payment.amount >= min && payment.amount <= max
                );
            }

            if (filters.bookingId) {
                filtered = filtered.filter(payment =>
                    payment.bookingId === filters.bookingId
                );
            }

            if (filters.searchQuery) {
                const query = filters.searchQuery.toLowerCase();
                filtered = filtered.filter(payment =>
                    payment.paymentNumber.toLowerCase().includes(query) ||
                    payment.bookingNumber.toLowerCase().includes(query) ||
                    payment.customerDetails.firstName.toLowerCase().includes(query) ||
                    payment.customerDetails.lastName.toLowerCase().includes(query) ||
                    payment.customerDetails.email.toLowerCase().includes(query) ||
                    payment.description.toLowerCase().includes(query)
                );
            }

            setFilteredPayments(filtered);
            setSelectedFilters(filters);
            return { success: true, data: filtered };
        } catch (error) {
            const errorMessage = handleApiError(error);
            setSearchError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setSearchLoading(false);
        }
    }, [payments, setFilteredPayments, setSelectedFilters, setSearchLoading, setSearchError]);

    /**
     * Clear search and filters
     */
    const clearSearch = useCallback(() => {
        setSearchQuery('');
        setSelectedFilters({});
        setFilteredPayments([]);
    }, [setSearchQuery, setSelectedFilters, setFilteredPayments]);

    /**
     * Initialize payment data
     */
    const initializePaymentData = useCallback(async () => {
        try {
            await Promise.all([
                getAllPayments(),
                getPaymentStats(),
            ]);
        } catch (error) {
            console.error('Failed to initialize payment data:', error);
        }
    }, [getAllPayments, getPaymentStats]);

    /**
     * Clear all errors
     */
    const clearAllErrors = useCallback(() => {
        clearErrors();
    }, [clearErrors]);

    // Auto-initialize on mount
    useEffect(() => {
        if (!payments.length && !paymentStats) {
            initializePaymentData();
        }
    }, [payments.length, paymentStats, initializePaymentData]);

    return {
        // State
        payments,
        selectedPayment,
        filteredPayments,
        refunds,
        paymentStats,
        documents,

        // Loading States
        isLoading,
        paymentsLoading,
        searchLoading,
        refundsLoading,
        documentsLoading,

        // Error States
        error,
        paymentsError,
        searchError,
        refundsError,
        documentsError,

        // Search & Filter State
        searchQuery,
        selectedFilters,

        // Core CRUD Actions
        getAllPayments,
        createPayment,
        processPayment,
        getPaymentById,
        getBookingPayments,
        cancelPayment,
        setSelectedPayment,

        // Refund Management Actions
        getPaymentRefunds,
        createRefund,

        // Document Management Actions
        generateReceipt,
        downloadDocument,

        // RazorPay Integration Actions
        createRazorPayOrder,
        verifyRazorPaySignature,

        // Search and Analytics Actions
        searchPayments,
        filterPayments,
        getPaymentStats,
        clearSearch,

        // Utility Actions
        initializePaymentData,
        clearAllErrors,
    };
};