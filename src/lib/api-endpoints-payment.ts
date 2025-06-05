// lib/api-endpoints-payment.ts
// Add these endpoints to your existing API_ENDPOINTS object in lib/api-endpoints.ts

export const PAYMENT_ENDPOINTS = {
    // ========================
    // Core Payment Operations (Your 10 APIs + 4 essential additions)
    // ========================

    // Core CRUD
    GET_ALL: '/payments',
    CREATE: '/payments',
    PROCESS: '/payments/process',
    GET_BY_ID: '/payments/:id',
    BOOKING_PAYMENT: '/bookings/:bookingId/payments',

    // Refund and Cancellation
    CANCEL: '/payments/:id/cancel',
    CREATE_REFUND: '/payments/:id/refunds',
    GET_REFUNDS: '/payments/:id/refunds',

    // Documents and Receipts
    GENERATE_RECEIPT: '/payments/:id/receipt',
    DOWNLOAD_DOCUMENT: '/documents/:documentId/download',

    // RazorPay & Gateway Integration
    CREATE_RAZORPAY_ORDER: '/payments/razorpay/create-order',
    VERIFY_SIGNATURE: '/payments/razorpay/verify-signature',

    // Search and Analytics (Added - essential for management)
    SEARCH: '/payments/search',
    GET_STATS: '/payments/stats',
};

// Helper function to replace path parameters
export const buildPaymentEndpoint = (endpoint: string, params: Record<string, string>): string => {
    let builtEndpoint = endpoint;
    Object.entries(params).forEach(([key, value]) => {
        builtEndpoint = builtEndpoint.replace(`:${key}`, value);
    });
    return builtEndpoint;
};

// Payment method specific endpoints (can be added later if needed)
export const PAYMENT_METHOD_ENDPOINTS = {
    UPI: {
        VALIDATE_VPA: '/payments/upi/validate-vpa',
    },
    CARD: {
        VALIDATE_CARD: '/payments/cards/validate',
    },
    NETBANKING: {
        BANKS_LIST: '/payments/netbanking/banks',
    },
};

// Status-specific endpoints (can be added later if needed)
export const PAYMENT_STATUS_ENDPOINTS = {
    PENDING: '/payments/pending',
    COMPLETED: '/payments/completed',
    FAILED: '/payments/failed',
};

export default PAYMENT_ENDPOINTS;