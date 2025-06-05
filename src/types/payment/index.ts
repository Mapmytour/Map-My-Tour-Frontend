// types/payment/index.ts
import { Currency } from '../common';

/* ============================== */
/*           Enums                */
/* ============================== */

export enum PaymentStatus {
    Pending = 'pending',
    Processing = 'processing',
    Completed = 'completed',
    Failed = 'failed',
    Cancelled = 'cancelled',
    Refunded = 'refunded',
    PartiallyRefunded = 'partially-refunded',
}

export enum PaymentMethod {
    CreditCard = 'credit-card',
    DebitCard = 'debit-card',
    NetBanking = 'net-banking',
    UPI = 'upi',
    Wallet = 'wallet',
    EMI = 'emi',
    Cash = 'cash',
}

export enum PaymentType {
    Booking = 'booking',
    Deposit = 'deposit',
    Balance = 'balance',
    FullPayment = 'full-payment',
    Refund = 'refund',
    Cancellation = 'cancellation',
}

export enum RefundStatus {
    Pending = 'pending',
    Processing = 'processing',
    Completed = 'completed',
    Failed = 'failed',
    Rejected = 'rejected',
}

export enum RefundType {
    Full = 'full',
    Partial = 'partial',
    Cancellation = 'cancellation',
    Goodwill = 'goodwill',
}

export enum DocumentType {
    Receipt = 'receipt',
    Invoice = 'invoice',
    RefundReceipt = 'refund-receipt',
    TaxInvoice = 'tax-invoice',
}

/* ============================== */
/*         Core Models            */
/* ============================== */

export interface Payment {
    id: string;
    paymentNumber: string;
    razorpayPaymentId?: string;
    razorpayOrderId?: string;

    // Booking Reference
    bookingId: string;
    bookingNumber: string;
    customerId: string;

    // Payment Details
    amount: number;
    currency: Currency;
    status: PaymentStatus;
    method: PaymentMethod;
    type: PaymentType;
    description: string;

    // Customer Information
    customerDetails: PaymentCustomerDetails;

    // Payment Method Details
    paymentMethodDetails?: PaymentMethodDetails;

    // RazorPay Specific
    razorpayDetails?: RazorPayDetails;

    // Financial Breakdown
    breakdown: PaymentBreakdown;

    // Documents (URLs from backend)
    documents: PaymentDocument[];

    // Refunds
    refunds: Refund[];
    refundedAmount: number;

    // Timeline
    createdAt: string;
    updatedAt: string;
    paidAt?: string;
    failedAt?: string;

    // Metadata
    notes?: string;
    reference?: string;
}

export interface PaymentCustomerDetails {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;

    // Address
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
    };

    // Tax Details
    gstin?: string;
    panNumber?: string;
}

export interface PaymentMethodDetails {
    method: PaymentMethod;

    // Card Details
    card?: {
        network: string;
        type: 'credit' | 'debit';
        lastFour: string;
        expiryMonth: number;
        expiryYear: number;
    };

    // Bank Details
    bank?: {
        name: string;
    };

    // UPI Details
    upi?: {
        vpa: string;
        provider: string;
    };

    // Wallet Details
    wallet?: {
        provider: string;
    };
}

export interface RazorPayDetails {
    orderId: string;
    paymentId?: string;
    signature?: string;
    status: string;
    method: string;
    amount: number;
    currency: string;
    fee?: number;
    tax?: number;

    // Gateway Response
    gatewayResponse?: {
        method_details?: any;
        error_code?: string;
        error_description?: string;
    };
}

export interface PaymentBreakdown {
    baseAmount: number;
    taxes: PaymentTax[];
    fees: PaymentFee[];
    discounts: PaymentDiscount[];

    // Totals
    totalTaxes: number;
    totalFees: number;
    totalDiscounts: number;
    finalAmount: number;
}

export interface PaymentTax {
    name: string;
    type: 'CGST' | 'SGST' | 'IGST' | 'GST';
    rate: number;
    amount: number;
}

export interface PaymentFee {
    name: string;
    type: 'gateway' | 'processing' | 'convenience';
    amount: number;
}

export interface PaymentDiscount {
    name: string;
    type: 'percentage' | 'flat' | 'coupon';
    amount: number;
    code?: string;
}

export interface PaymentDocument {
    id: string;
    type: DocumentType;
    name: string;
    url: string; // URL from backend
    downloadUrl?: string;
    format: 'pdf' | 'jpg' | 'png';

    // Document Details
    documentNumber?: string;
    generatedAt: string;
    expiresAt?: string;

    // Status
    status: 'generating' | 'ready' | 'failed' | 'expired';
}

export interface Refund {
    id: string;
    refundNumber: string;
    razorpayRefundId?: string;
    paymentId: string;

    // Refund Details
    amount: number;
    currency: Currency;
    status: RefundStatus;
    type: RefundType;
    reason: string;
    notes?: string;

    // Timeline
    requestedAt: string;
    processedAt?: string;
    completedAt?: string;

    // RazorPay Details
    razorpayDetails?: {
        refundId: string;
        status: string;
        speed: 'normal' | 'optimum';
    };

    // Documents
    documents: PaymentDocument[];

    // Audit
    createdAt: string;
    updatedAt: string;
    createdBy: string;
}

export interface PaymentStats {
    totalPayments: number;
    totalAmount: number;
    totalRefunds: number;
    refundedAmount: number;
    successRate: number;

    // Method Breakdown
    methodBreakdown: {
        method: PaymentMethod;
        count: number;
        amount: number;
        percentage: number;
    }[];

    // Status Breakdown
    statusBreakdown: {
        status: PaymentStatus;
        count: number;
        amount: number;
    }[];

    // Daily Trends (last 30 days)
    dailyTrends: {
        date: string;
        payments: number;
        amount: number;
        refunds: number;
    }[];
}

/* ============================== */
/*      Request/Response Types    */
/* ============================== */

export interface CreatePaymentRequest {
    bookingId: string;
    amount: number;
    currency: Currency;
    type: PaymentType;
    description: string;

    // Customer Details
    customerDetails: Omit<PaymentCustomerDetails, 'id'>;

    // Options
    generateReceipt?: boolean;
    sendNotifications?: boolean;
    notes?: string;
}

export interface ProcessPaymentRequest {
    paymentId: string;
    razorpayPaymentId: string;
    razorpayOrderId: string;
    razorpaySignature: string;
}

export interface CreateRefundRequest {
    paymentId: string;
    amount?: number; // If not provided, full refund
    type: RefundType;
    reason: string;
    notes?: string;
    speed?: 'normal' | 'optimum';
    generateReceipt?: boolean;
    notifyCustomer?: boolean;
}

export interface RazorPayOrderRequest {
    paymentId: string;
    amount: number;
    currency: Currency;
    receipt?: string;
    notes?: Record<string, string>;
}

export interface VerifySignatureRequest {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
}

export interface PaymentFilters {
    status?: PaymentStatus[];
    method?: PaymentMethod[];
    type?: PaymentType[];

    // Date Range
    dateRange?: {
        from: string;
        to: string;
    };

    // Amount Range
    amountRange?: {
        min: number;
        max: number;
    };

    // References
    bookingId?: string;
    customerId?: string;
    bookingNumber?: string;
    paymentNumber?: string;

    // Search
    searchQuery?: string;
}

export interface SearchPaymentsRequest {
    query: string;
    filters?: PaymentFilters;
    page?: number;
    limit?: number;
    sortBy?: 'amount' | 'createdAt' | 'status';
    sortOrder?: 'asc' | 'desc';
}

export interface GenerateReceiptRequest {
    paymentId: string;
    format?: 'pdf' | 'jpg';
    includeGST?: boolean;
}

export default Payment;