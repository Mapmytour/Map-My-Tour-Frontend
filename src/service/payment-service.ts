import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import {
    Payment,
    Refund,
    PaymentStats,
    PaymentDocument,
    CreatePaymentRequest,
    ProcessPaymentRequest,
    CreateRefundRequest,
    RazorPayOrderRequest,
    VerifySignatureRequest,
    SearchPaymentsRequest,
    GenerateReceiptRequest,
    PaymentFilters,
} from '@/types/payment';
import { APIResponse } from '@/types/APIResponse';

class PaymentService {
    // ========================
    // Core Payment Operations
    // ========================

    /**
     * Get all payments with optional filters
     */
    async getAllPayments(filters?: PaymentFilters): Promise<APIResponse<{
        payments: Payment[];
        total: number;
        page: number;
        limit: number;
    }>> {
        try {
            const params = filters ? this.buildFilterParams(filters) : undefined;
            const response = await apiClient.get<{
                payments: Payment[];
                total: number;
                page: number;
                limit: number;
            }>(API_ENDPOINTS.PAYMENT.GET_ALL, params);
            return response;
        } catch (error) {
            throw new Error(`Failed to fetch payments: ${error}`);
        }
    }

    /**
     * Create new payment
     */
    async createPayment(data: CreatePaymentRequest): Promise<APIResponse<Payment>> {
        try {
            const response = await apiClient.post<Payment>(
                API_ENDPOINTS.PAYMENT.CREATE,
                data
            );
            return response;
        } catch (error) {
            throw new Error(`Failed to create payment: ${error}`);
        }
    }

    /**
     * Process payment after RazorPay success
     */
    async processPayment(data: ProcessPaymentRequest): Promise<APIResponse<Payment>> {
        try {
            const response = await apiClient.post<Payment>(
                API_ENDPOINTS.PAYMENT.PROCESS,
                data
            );
            return response;
        } catch (error) {
            throw new Error(`Failed to process payment: ${error}`);
        }
    }

    /**
     * Get payment by ID
     */
    async getPaymentById(id: string): Promise<APIResponse<Payment>> {
        try {
            const endpoint = API_ENDPOINTS.PAYMENT.GET_BY_ID.replace(':id', id);
            const response = await apiClient.get<Payment>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to fetch payment: ${error}`);
        }
    }

    /**
     * Get payments by booking ID
     */
    async getBookingPayments(bookingId: string): Promise<APIResponse<Payment[]>> {
        try {
            const endpoint = API_ENDPOINTS.PAYMENT.BOOKING_PAYMENT.replace(':bookingId', bookingId);
            const response = await apiClient.get<Payment[]>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to fetch booking payments: ${error}`);
        }
    }

    /**
     * Cancel payment
     */
    async cancelPayment(paymentId: string, reason?: string): Promise<APIResponse<Payment>> {
        try {
            const endpoint = API_ENDPOINTS.PAYMENT.CANCEL.replace(':id', paymentId);
            const response = await apiClient.post<Payment>(endpoint, { reason });
            return response;
        } catch (error) {
            throw new Error(`Failed to cancel payment: ${error}`);
        }
    }

    // ========================
    // Refund Management
    // ========================

    /**
     * Get refunds for a payment
     */
    async getPaymentRefunds(paymentId: string): Promise<APIResponse<Refund[]>> {
        try {
            const endpoint = API_ENDPOINTS.PAYMENT.GET_REFUNDS.replace(':id', paymentId);
            const response = await apiClient.get<Refund[]>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to fetch refunds: ${error}`);
        }
    }

    /**
     * Create refund
     */
    async createRefund(data: CreateRefundRequest): Promise<APIResponse<{
        refund: Refund;
        updatedPayment: Payment;
        estimatedSettlement?: string;
    }>> {
        try {
            const endpoint = API_ENDPOINTS.PAYMENT.CREATE_REFUND.replace(':id', data.paymentId);
            const { paymentId, ...refundData } = data;
            const response = await apiClient.post<{
                refund: Refund;
                updatedPayment: Payment;
                estimatedSettlement?: string;
            }>(endpoint, refundData);
            return response;
        } catch (error) {
            throw new Error(`Failed to create refund: ${error}`);
        }
    }

    // ========================
    // Document Management
    // ========================

    /**
     * Generate receipt
     */
    async generateReceipt(data: GenerateReceiptRequest): Promise<APIResponse<PaymentDocument>> {
        try {
            const endpoint = API_ENDPOINTS.PAYMENT.GENERATE_RECEIPT.replace(':id', data.paymentId);
            const { paymentId, ...receiptData } = data;
            const response = await apiClient.post<PaymentDocument>(endpoint, receiptData);
            return response;
        } catch (error) {
            throw new Error(`Failed to generate receipt: ${error}`);
        }
    }

    /**
     * Download document
     */
    async downloadDocument(documentId: string): Promise<APIResponse<{
        downloadUrl: string;
        expiresAt: string
    }>> {
        try {
            const endpoint = API_ENDPOINTS.PAYMENT.DOWNLOAD_DOCUMENT.replace(':documentId', documentId);
            const response = await apiClient.get<{
                downloadUrl: string;
                expiresAt: string
            }>(endpoint);
            return response;
        } catch (error) {
            throw new Error(`Failed to download document: ${error}`);
        }
    }

    // ========================
    // RazorPay Integration
    // ========================

    /**
     * Create RazorPay order
     */
    async createRazorPayOrder(data: RazorPayOrderRequest): Promise<APIResponse<{
        razorpayOrder: any;
        payment: Payment;
    }>> {
        try {
            const response = await apiClient.post<{
                razorpayOrder: any;
                payment: Payment;
            }>(API_ENDPOINTS.PAYMENT.CREATE_RAZORPAY_ORDER, data);
            return response;
        } catch (error) {
            throw new Error(`Failed to create RazorPay order: ${error}`);
        }
    }

    /**
     * Verify RazorPay signature
     */
    async verifyRazorPaySignature(data: VerifySignatureRequest): Promise<APIResponse<{
        verified: boolean;
        message?: string;
    }>> {
        try {
            const response = await apiClient.post<{
                verified: boolean;
                message?: string;
            }>(API_ENDPOINTS.PAYMENT.VERIFY_SIGNATURE, data);
            return response;
        } catch (error) {
            throw new Error(`Failed to verify RazorPay signature: ${error}`);
        }
    }

    // ========================
    // Search and Analytics
    // ========================

    /**
     * Search payments
     */
    async searchPayments(request: SearchPaymentsRequest): Promise<APIResponse<{
        payments: Payment[];
        total: number;
        page: number;
        limit: number;
    }>> {
        try {
            const response = await apiClient.post<{
                payments: Payment[];
                total: number;
                page: number;
                limit: number;
            }>(API_ENDPOINTS.PAYMENT.SEARCH, request);
            return response;
        } catch (error) {
            throw new Error(`Failed to search payments: ${error}`);
        }
    }

    /**
     * Get payment statistics
     */
    async getPaymentStats(dateRange?: { from: string; to: string }): Promise<APIResponse<PaymentStats>> {
        try {
            const response = await apiClient.get<PaymentStats>(
                API_ENDPOINTS.PAYMENT.GET_STATS,
                dateRange ? { from: dateRange.from, to: dateRange.to } : undefined
            );
            return response;
        } catch (error) {
            throw new Error(`Failed to fetch payment statistics: ${error}`);
        }
    }

    // ========================
    // Utility Methods
    // ========================

    /**
     * Build filter parameters for API requests
     */
    private buildFilterParams(filters: PaymentFilters): Record<string, string> {
        const params: Record<string, string> = {};

        if (filters.status?.length) {
            params.status = filters.status.join(',');
        }
        if (filters.method?.length) {
            params.method = filters.method.join(',');
        }
        if (filters.type?.length) {
            params.type = filters.type.join(',');
        }
        if (filters.dateRange) {
            params.dateFrom = filters.dateRange.from;
            params.dateTo = filters.dateRange.to;
        }
        if (filters.amountRange) {
            params.amountMin = filters.amountRange.min.toString();
            params.amountMax = filters.amountRange.max.toString();
        }
        if (filters.bookingId) {
            params.bookingId = filters.bookingId;
        }
        if (filters.customerId) {
            params.customerId = filters.customerId;
        }
        if (filters.bookingNumber) {
            params.bookingNumber = filters.bookingNumber;
        }
        if (filters.paymentNumber) {
            params.paymentNumber = filters.paymentNumber;
        }
        if (filters.searchQuery) {
            params.search = filters.searchQuery;
        }

        return params;
    }

    /**
     * Format payment number
     */
    formatPaymentNumber(number: string): string {
        return number.replace(/(\w{3})(\w{4})(\w+)/, '$1-$2-$3');
    }

    /**
     * Format currency amount
     */
    formatAmount(amount: number, currency: string = 'INR'): string {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
        }).format(amount / 100); // Convert paisa to rupees
    }

    /**
     * Get payment status color for UI
     */
    getStatusColor(status: string): string {
        const colors: Record<string, string> = {
            pending: '#f59e0b',
            processing: '#3b82f6',
            completed: '#10b981',
            failed: '#ef4444',
            cancelled: '#6b7280',
            refunded: '#8b5cf6',
            'partially-refunded': '#f59e0b',
        };
        return colors[status] || '#6b7280';
    }

    /**
     * Validate payment data
     */
    validatePaymentData(data: Partial<CreatePaymentRequest>): string[] {
        const errors: string[] = [];

        if (!data.bookingId?.trim()) {
            errors.push('Booking ID is required');
        }
        if (!data.amount || data.amount <= 0) {
            errors.push('Valid amount is required');
        }
        if (!data.currency) {
            errors.push('Currency is required');
        }
        if (!data.type) {
            errors.push('Payment type is required');
        }
        if (!data.customerDetails?.email) {
            errors.push('Customer email is required');
        }
        if (!data.customerDetails?.phone) {
            errors.push('Customer phone is required');
        }

        return errors;
    }

    /**
     * Calculate processing fee (RazorPay rates)
     */
    calculateProcessingFee(amount: number, method: string): number {
        const rates: Record<string, number> = {
            'credit-card': 2.0,
            'debit-card': 1.0,
            'net-banking': 1.5,
            'upi': 0.0,
            'wallet': 1.5,
            'emi': 3.0,
        };
        const rate = rates[method] || 2.0;
        return Math.round((amount * rate / 100) * 100) / 100;
    }
}

// Export singleton instance
export const paymentService = new PaymentService();