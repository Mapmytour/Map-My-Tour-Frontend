import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
    Payment,
    Refund,
    PaymentStats,
    PaymentDocument,
    PaymentFilters,
    PaymentStatus,
    PaymentMethod,
} from '@/types/payment';

interface PaymentState {
    // State
    payments: Payment[];
    selectedPayment: Payment | null;
    filteredPayments: Payment[];
    refunds: Refund[];
    paymentStats: PaymentStats | null;
    documents: PaymentDocument[];

    // Loading States
    isLoading: boolean;
    paymentsLoading: boolean;
    searchLoading: boolean;
    refundsLoading: boolean;
    documentsLoading: boolean;

    // Error States
    error: string | null;
    paymentsError: string | null;
    searchError: string | null;
    refundsError: string | null;
    documentsError: string | null;

    // Search & Filter State
    searchQuery: string;
    selectedFilters: PaymentFilters;

    // Cache timestamps
    lastPaymentsUpdate: number | null;
    lastStatsUpdate: number | null;
    lastRefundsUpdate: number | null;
    lastDocumentsUpdate: number | null;

    // Actions
    // Basic CRUD Actions
    setPayments: (payments: Payment[]) => void;
    addPayment: (payment: Payment) => void;
    updatePayment: (payment: Payment) => void;
    removePayment: (id: string) => void;
    setSelectedPayment: (payment: Payment | null) => void;
    setFilteredPayments: (payments: Payment[]) => void;

    // Refund Actions
    setRefunds: (refunds: Refund[]) => void;
    addRefund: (refund: Refund) => void;
    updateRefund: (refund: Refund) => void;

    // Document Actions
    setDocuments: (documents: PaymentDocument[]) => void;
    addDocument: (document: PaymentDocument) => void;
    updateDocument: (document: PaymentDocument) => void;

    // Analytics Actions
    setPaymentStats: (stats: PaymentStats) => void;

    // Loading Actions
    setLoading: (loading: boolean) => void;
    setPaymentsLoading: (loading: boolean) => void;
    setSearchLoading: (loading: boolean) => void;
    setRefundsLoading: (loading: boolean) => void;
    setDocumentsLoading: (loading: boolean) => void;

    // Error Actions
    setError: (error: string | null) => void;
    setPaymentsError: (error: string | null) => void;
    setSearchError: (error: string | null) => void;
    setRefundsError: (error: string | null) => void;
    setDocumentsError: (error: string | null) => void;

    // Search & Filter Actions
    setSearchQuery: (query: string) => void;
    setSelectedFilters: (filters: PaymentFilters) => void;
    updateFilteredPayments: () => void;

    // Utility Actions
    clearAllData: () => void;
    clearErrors: () => void;
    updateCacheTimestamp: (type: 'payments' | 'stats' | 'refunds' | 'documents') => void;
    isCacheValid: (type: 'payments' | 'stats' | 'refunds' | 'documents', maxAge?: number) => boolean;
}

export const usePaymentStore = create<PaymentState>()(
    persist(
        (set, get) => ({
            // Initial State
            payments: [],
            selectedPayment: null,
            filteredPayments: [],
            refunds: [],
            paymentStats: null,
            documents: [],

            // Loading States
            isLoading: false,
            paymentsLoading: false,
            searchLoading: false,
            refundsLoading: false,
            documentsLoading: false,

            // Error States
            error: null,
            paymentsError: null,
            searchError: null,
            refundsError: null,
            documentsError: null,

            // Search & Filter State
            searchQuery: '',
            selectedFilters: {},

            // Cache timestamps
            lastPaymentsUpdate: null,
            lastStatsUpdate: null,
            lastRefundsUpdate: null,
            lastDocumentsUpdate: null,

            // Actions
            // Basic CRUD Actions
            setPayments: (payments: Payment[]) => {
                set({ payments, paymentsError: null });
                get().updateFilteredPayments();
            },

            addPayment: (payment: Payment) => {
                const currentPayments = get().payments;
                set({ payments: [...currentPayments, payment] });
                get().updateFilteredPayments();
            },

            updatePayment: (updatedPayment: Payment) => {
                const currentPayments = get().payments;
                const updatedPayments = currentPayments.map(payment =>
                    payment.id === updatedPayment.id ? updatedPayment : payment
                );
                set({ payments: updatedPayments });
                get().updateFilteredPayments();

                // Update selected payment if it's the one being updated
                if (get().selectedPayment?.id === updatedPayment.id) {
                    set({ selectedPayment: updatedPayment });
                }
            },

            removePayment: (id: string) => {
                const currentPayments = get().payments;
                const updatedPayments = currentPayments.filter(payment => payment.id !== id);
                set({ payments: updatedPayments });
                get().updateFilteredPayments();

                // Clear selected payment if it's the one being removed
                if (get().selectedPayment?.id === id) {
                    set({ selectedPayment: null });
                }
            },

            setSelectedPayment: (payment: Payment | null) => {
                set({ selectedPayment: payment });
            },

            setFilteredPayments: (payments: Payment[]) => {
                set({ filteredPayments: payments });
            },

            // Refund Actions
            setRefunds: (refunds: Refund[]) => {
                set({ refunds, refundsError: null });
            },

            addRefund: (refund: Refund) => {
                const currentRefunds = get().refunds;
                set({ refunds: [...currentRefunds, refund] });
            },

            updateRefund: (updatedRefund: Refund) => {
                const currentRefunds = get().refunds;
                const updatedRefunds = currentRefunds.map(refund =>
                    refund.id === updatedRefund.id ? updatedRefund : refund
                );
                set({ refunds: updatedRefunds });
            },

            // Document Actions
            setDocuments: (documents: PaymentDocument[]) => {
                set({ documents, documentsError: null });
            },

            addDocument: (document: PaymentDocument) => {
                const currentDocuments = get().documents;
                set({ documents: [...currentDocuments, document] });
            },

            updateDocument: (updatedDocument: PaymentDocument) => {
                const currentDocuments = get().documents;
                const updatedDocuments = currentDocuments.map(document =>
                    document.id === updatedDocument.id ? updatedDocument : document
                );
                set({ documents: updatedDocuments });
            },

            // Analytics Actions
            setPaymentStats: (stats: PaymentStats) => {
                set({ paymentStats: stats });
            },

            // Loading Actions
            setLoading: (loading: boolean) => {
                set({ isLoading: loading });
            },

            setPaymentsLoading: (loading: boolean) => {
                set({ paymentsLoading: loading });
                if (!loading) set({ paymentsError: null });
            },

            setSearchLoading: (loading: boolean) => {
                set({ searchLoading: loading });
                if (!loading) set({ searchError: null });
            },

            setRefundsLoading: (loading: boolean) => {
                set({ refundsLoading: loading });
                if (!loading) set({ refundsError: null });
            },

            setDocumentsLoading: (loading: boolean) => {
                set({ documentsLoading: loading });
                if (!loading) set({ documentsError: null });
            },

            // Error Actions
            setError: (error: string | null) => {
                set({ error, isLoading: false });
            },

            setPaymentsError: (error: string | null) => {
                set({ paymentsError: error, paymentsLoading: false });
            },

            setSearchError: (error: string | null) => {
                set({ searchError: error, searchLoading: false });
            },

            setRefundsError: (error: string | null) => {
                set({ refundsError: error, refundsLoading: false });
            },

            setDocumentsError: (error: string | null) => {
                set({ documentsError: error, documentsLoading: false });
            },

            // Search & Filter Actions
            setSearchQuery: (query: string) => {
                set({ searchQuery: query });
                get().updateFilteredPayments();
            },

            setSelectedFilters: (filters: PaymentFilters) => {
                set({ selectedFilters: filters });
                get().updateFilteredPayments();
            },

            updateFilteredPayments: () => {
                const { payments, searchQuery, selectedFilters } = get();

                let filtered = payments;

                // Filter by search query
                if (searchQuery.trim()) {
                    const query = searchQuery.toLowerCase();
                    filtered = filtered.filter(payment =>
                        payment.paymentNumber.toLowerCase().includes(query) ||
                        payment.customerDetails.firstName.toLowerCase().includes(query) ||
                        payment.customerDetails.lastName.toLowerCase().includes(query) ||
                        payment.customerDetails.email.toLowerCase().includes(query) ||
                        payment.description.toLowerCase().includes(query) ||
                        payment.bookingNumber.toLowerCase().includes(query) ||
                        payment.razorpayPaymentId?.toLowerCase().includes(query) ||
                        payment.reference?.toLowerCase().includes(query)
                    );
                }

                // Apply filters
                if (selectedFilters.status?.length) {
                    filtered = filtered.filter(payment =>
                        selectedFilters.status!.includes(payment.status)
                    );
                }

                if (selectedFilters.method?.length) {
                    filtered = filtered.filter(payment =>
                        selectedFilters.method!.includes(payment.method)
                    );
                }

                if (selectedFilters.type?.length) {
                    filtered = filtered.filter(payment =>
                        selectedFilters.type!.includes(payment.type)
                    );
                }

                if (selectedFilters.dateRange) {
                    const fromDate = new Date(selectedFilters.dateRange.from);
                    const toDate = new Date(selectedFilters.dateRange.to);
                    filtered = filtered.filter(payment => {
                        const paymentDate = new Date(payment.createdAt);
                        return paymentDate >= fromDate && paymentDate <= toDate;
                    });
                }

                if (selectedFilters.amountRange) {
                    const { min, max } = selectedFilters.amountRange;
                    filtered = filtered.filter(payment =>
                        payment.amount >= min && payment.amount <= max
                    );
                }

                if (selectedFilters.bookingId) {
                    filtered = filtered.filter(payment =>
                        payment.bookingId === selectedFilters.bookingId
                    );
                }

                if (selectedFilters.customerId) {
                    filtered = filtered.filter(payment =>
                        payment.customerId === selectedFilters.customerId
                    );
                }

                if (selectedFilters.bookingNumber) {
                    filtered = filtered.filter(payment =>
                        payment.bookingNumber.toLowerCase().includes(selectedFilters.bookingNumber!.toLowerCase())
                    );
                }

                if (selectedFilters.paymentNumber) {
                    filtered = filtered.filter(payment =>
                        payment.paymentNumber.toLowerCase().includes(selectedFilters.paymentNumber!.toLowerCase())
                    );
                }

                set({ filteredPayments: filtered });
            },

            // Utility Actions
            clearAllData: () => {
                set({
                    payments: [],
                    selectedPayment: null,
                    filteredPayments: [],
                    refunds: [],
                    paymentStats: null,
                    documents: [],
                    searchQuery: '',
                    selectedFilters: {},
                    lastPaymentsUpdate: null,
                    lastStatsUpdate: null,
                    lastRefundsUpdate: null,
                    lastDocumentsUpdate: null,
                });
            },

            clearErrors: () => {
                set({
                    error: null,
                    paymentsError: null,
                    searchError: null,
                    refundsError: null,
                    documentsError: null,
                });
            },

            updateCacheTimestamp: (type: 'payments' | 'stats' | 'refunds' | 'documents') => {
                const timestamp = Date.now();
                if (type === 'payments') {
                    set({ lastPaymentsUpdate: timestamp });
                } else if (type === 'stats') {
                    set({ lastStatsUpdate: timestamp });
                } else if (type === 'refunds') {
                    set({ lastRefundsUpdate: timestamp });
                } else if (type === 'documents') {
                    set({ lastDocumentsUpdate: timestamp });
                }
            },

            isCacheValid: (type: 'payments' | 'stats' | 'refunds' | 'documents', maxAge: number = 5 * 60 * 1000) => {
                const state = get();
                let lastUpdate: number | null = null;

                if (type === 'payments') {
                    lastUpdate = state.lastPaymentsUpdate;
                } else if (type === 'stats') {
                    lastUpdate = state.lastStatsUpdate;
                } else if (type === 'refunds') {
                    lastUpdate = state.lastRefundsUpdate;
                } else if (type === 'documents') {
                    lastUpdate = state.lastDocumentsUpdate;
                }

                if (!lastUpdate) return false;

                return Date.now() - lastUpdate < maxAge;
            },
        }),
        {
            name: 'payment-storage',
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
                payments: state.payments,
                paymentStats: state.paymentStats,
                lastPaymentsUpdate: state.lastPaymentsUpdate,
                lastStatsUpdate: state.lastStatsUpdate,
                lastRefundsUpdate: state.lastRefundsUpdate,
                lastDocumentsUpdate: state.lastDocumentsUpdate,
            }),
        }
    )
);