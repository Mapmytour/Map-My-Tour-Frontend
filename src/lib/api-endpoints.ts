import PAYMENT_ENDPOINTS from "./api-endpoints-payment";

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        FORGOT_PASSWORD_STEP1: '/auth/forgot-password/step1',
        FORGOT_PASSWORD_STEP2: '/auth/forgot-password/step2',
        FORGOT_PASSWORD_STEP3: '/auth/forgot-password/step3',
        RESET_PASSWORD: '/auth/reset-password',
        VERIFY_EMAIL: '/auth/verify-email',
        PROFILE: '/auth/profile',
        CHANGE_PASSWORD: '/auth/change-password',
        RESEND_VERIFICATION: '/auth/resend-verification',
        CHECK_EMAIL: '/auth/check-email',
    },
    USER: {
        PROFILE: '/user/profile',
        UPDATE_PROFILE: '/user/profile',
        UPLOAD_AVATAR: '/user/avatar',
        DELETE_ACCOUNT: '/user/account',
    },
    QUOTE: {
        CREATE: '/quote/request',
        GET_BY_ID: '/quote/:id',
        GET_USER_QUOTES: '/quote/user',
        UPDATE: '/quote/:id',
        DELETE: '/quote/:id',
        STATUS_OPTIONS: '/quote/status-options',
        TRAVEL_TYPES: '/quote/travel-types',
        HOTEL_CATEGORIES: '/quote/hotel-categories',
        ROOM_TYPES: '/quote/room-types',
    },

    // ========================
    // ACTIVITIES ENDPOINTS
    // ========================
    ACTIVITIES: {
        // Basic CRUD
        GET_ALL: '/activities',
        GET_BY_ID: '/activities/:id',
        CREATE: '/activities',
        UPDATE: '/activities/:id',
        DELETE: '/activities/:id',

        // Search and Filter
        SEARCH: '/activities/search',
        FILTER: '/activities/filter',
        BY_CATEGORY: '/activities/category/:category',
        BY_TYPE: '/activities/type/:type',
        BY_DIFFICULTY: '/activities/difficulty/:difficulty',
        BY_LOCATION: '/activities/location/:location',

        // Availability
        GET_AVAILABILITY: '/activities/:id/availability',
        UPDATE_AVAILABILITY: '/activities/:id/availability',
        CHECK_SLOT_AVAILABILITY: '/activities/:id/availability/check',

        // Media Management
        UPLOAD_IMAGES: '/activities/:id/images',
        DELETE_IMAGE: '/activities/:id/images/:imageId',
        SET_PRIMARY_IMAGE: '/activities/:id/images/:imageId/primary',

        // Reviews and Ratings
        GET_REVIEWS: '/activities/:id/reviews',
        ADD_REVIEW: '/activities/:id/reviews',
        UPDATE_REVIEW: '/activities/:id/reviews/:reviewId',
        DELETE_REVIEW: '/activities/:id/reviews/:reviewId',

        // Categories and Types
        GET_CATEGORIES: '/activities/categories',
        GET_TYPES: '/activities/types',
        GET_DIFFICULTIES: '/activities/difficulties',

        // Bulk Operations
        BULK_UPDATE_STATUS: '/activities/bulk/status',
        BULK_DELETE: '/activities/bulk/delete',

        // Statistics
        GET_STATS: '/activities/stats',
        GET_POPULAR: '/activities/popular',
        GET_FEATURED: '/activities/featured',
    },

    // ========================
    // BOOKINGS ENDPOINTS
    // ========================
    BOOKING: {
        // ========================
        // Basic CRUD Operations
        // ========================
        GET_ALL: '/bookings',
        GET_BY_ID: '/bookings/:id',
        GET_BY_NUMBER: '/bookings/number/:bookingNumber',
        CREATE: '/bookings',
        UPDATE: '/bookings/:id',
        DELETE: '/bookings/:id',
        DUPLICATE: '/bookings/:id/duplicate',

        // ========================
        // Search and Filter
        // ========================
        SEARCH: '/bookings/search',
        FILTER: '/bookings/filter',
        BY_STATUS: '/bookings/status/:status',
        BY_TYPE: '/bookings/type/:bookingType',
        BY_PAYMENT_STATUS: '/bookings/payment-status/:paymentStatus',
        BY_SOURCE: '/bookings/source/:source',
        BY_DATE_RANGE: '/bookings/date-range',
        BY_TRAVEL_DATE: '/bookings/travel-date',
        BY_CUSTOMER: '/bookings/customer/:customerId',
        BY_ENTITY: '/bookings/entity/:entityType/:entityId',

        // ========================
        // Customer Management
        // ========================
        GET_CUSTOMER_BOOKINGS: '/bookings/customer/:customerId/bookings',
        UPDATE_CUSTOMER_DETAILS: '/bookings/:id/customer',
        GET_CUSTOMER_HISTORY: '/bookings/customer/:customerId/history',

        // ========================
        // Participant Management
        // ========================
        GET_PARTICIPANTS: '/bookings/:id/participants',
        ADD_PARTICIPANT: '/bookings/:id/participants',
        UPDATE_PARTICIPANT: '/bookings/:id/participants/:participantId',
        CANCEL_PARTICIPANT: '/bookings/:id/participants/:participantId/cancel',
        REMOVE_PARTICIPANT: '/bookings/:id/participants/:participantId',
        BULK_ADD_PARTICIPANTS: '/bookings/:id/participants/bulk',
        CHECK_IN_PARTICIPANT: '/bookings/:id/participants/:participantId/check-in',
        CHECK_OUT_PARTICIPANT: '/bookings/:id/participants/:participantId/check-out',
        MARK_NO_SHOW: '/bookings/:id/participants/:participantId/no-show',

        // ========================
        // Payment Management
        // ========================
        GET_PAYMENTS: '/bookings/:id/payments',
        PROCESS_PAYMENT: '/bookings/:id/payments',
        UPDATE_PAYMENT: '/bookings/:id/payments/:paymentId',
        CANCEL_PAYMENT: '/bookings/:id/payments/:paymentId/cancel',
        REFUND_PAYMENT: '/bookings/:id/payments/:paymentId/refund',
        RETRY_PAYMENT: '/bookings/:id/payments/:paymentId/retry',
        GET_PAYMENT_METHODS: '/bookings/payment-methods',
        CALCULATE_PRICING: '/bookings/:id/pricing/calculate',
        APPLY_DISCOUNT: '/bookings/:id/pricing/discount',
        REMOVE_DISCOUNT: '/bookings/:id/pricing/discount/:discountId',
        APPLY_PROMO_CODE: '/bookings/:id/pricing/promo/:code',

        // ========================
        // Status Management
        // ========================
        UPDATE_STATUS: '/bookings/:id/status',
        CONFIRM_BOOKING: '/bookings/:id/confirm',
        CANCEL_BOOKING: '/bookings/:id/cancel',
        COMPLETE_BOOKING: '/bookings/:id/complete',
        MARK_NO_SHOW_BOOKING: '/bookings/:id/no-show',
        REACTIVATE_BOOKING: '/bookings/:id/reactivate',

        // ========================
        // Communication & Notifications
        // ========================
        GET_NOTIFICATIONS: '/bookings/:id/notifications',
        SEND_CONFIRMATION: '/bookings/:id/notifications/confirmation',
        SEND_REMINDER: '/bookings/:id/notifications/reminder',
        SEND_PAYMENT_REMINDER: '/bookings/:id/notifications/payment-reminder',
        SEND_CUSTOM_NOTIFICATION: '/bookings/:id/notifications/custom',
        SEND_CANCELLATION_NOTICE: '/bookings/:id/notifications/cancellation',
        GET_COMMUNICATION_HISTORY: '/bookings/:id/communications',

        // ========================
        // Notes & Comments
        // ========================
        GET_NOTES: '/bookings/:id/notes',
        ADD_NOTE: '/bookings/:id/notes',
        UPDATE_NOTE: '/bookings/:id/notes/:noteId',
        DELETE_NOTE: '/bookings/:id/notes/:noteId',

        // ========================
        // Documents & Waivers
        // ========================
        GET_DOCUMENTS: '/bookings/:id/documents',
        UPLOAD_DOCUMENT: '/bookings/:id/documents',
        DELETE_DOCUMENT: '/bookings/:id/documents/:documentId',
        SIGN_WAIVER: '/bookings/:id/waiver/sign',
        GET_WAIVER_STATUS: '/bookings/:id/waiver/status',
        GENERATE_VOUCHER: '/bookings/:id/voucher',
        GENERATE_INVOICE: '/bookings/:id/invoice',
        GENERATE_RECEIPT: '/bookings/:id/receipt',

        // ========================
        // Cancellation & Refunds
        // ========================
        GET_CANCELLATION_POLICY: '/bookings/:id/cancellation-policy',
        CALCULATE_CANCELLATION: '/bookings/:id/cancellation/calculate',
        REQUEST_CANCELLATION: '/bookings/:id/cancellation/request',
        APPROVE_CANCELLATION: '/bookings/:id/cancellation/approve',
        REJECT_CANCELLATION: '/bookings/:id/cancellation/reject',
        PROCESS_REFUND: '/bookings/:id/refund',
        GET_REFUND_STATUS: '/bookings/:id/refund/status',

        // ========================
        // Availability & Validation
        // ========================
        CHECK_AVAILABILITY: '/bookings/availability/check',
        VALIDATE_BOOKING: '/bookings/:id/validate',
        GET_CONFLICTS: '/bookings/:id/conflicts',
        RESOLVE_CONFLICTS: '/bookings/:id/conflicts/resolve',

        // ========================
        // Modifications & Changes
        // ========================
        REQUEST_MODIFICATION: '/bookings/:id/modifications/request',
        APPROVE_MODIFICATION: '/bookings/:id/modifications/approve',
        GET_MODIFICATION_HISTORY: '/bookings/:id/modifications/history',
        CALCULATE_MODIFICATION_COST: '/bookings/:id/modifications/calculate',

        // ========================
        // Reports & Analytics
        // ========================
        GET_STATS: '/bookings/stats',
        GET_REVENUE_REPORT: '/bookings/reports/revenue',
        GET_OCCUPANCY_REPORT: '/bookings/reports/occupancy',
        GET_CUSTOMER_REPORT: '/bookings/reports/customers',
        GET_PERFORMANCE_REPORT: '/bookings/reports/performance',
        GET_PAYMENT_REPORT: '/bookings/reports/payments',
        GET_CANCELLATION_REPORT: '/bookings/reports/cancellations',
        EXPORT_BOOKINGS: '/bookings/export',

        // ========================
        // Bulk Operations
        // ========================
        BULK_UPDATE_STATUS: '/bookings/bulk/status',
        BULK_CANCEL: '/bookings/bulk/cancel',
        BULK_CONFIRM: '/bookings/bulk/confirm',
        BULK_SEND_NOTIFICATIONS: '/bookings/bulk/notifications',
        BULK_PROCESS_PAYMENTS: '/bookings/bulk/payments',
        BULK_EXPORT: '/bookings/bulk/export',
        BULK_ASSIGN: '/bookings/bulk/assign',

        // ========================
        // Integration & Sync
        // ========================
        SYNC_WITH_ENTITY: '/bookings/:id/sync/:entityType/:entityId',
        GENERATE_FROM_QUOTE: '/bookings/generate/quote/:quoteId',
        LINK_TO_ITINERARY: '/bookings/:id/itinerary/:itineraryId',
        UNLINK_FROM_ITINERARY: '/bookings/:id/itinerary/unlink',

        // ========================
        // Calendar & Scheduling
        // ========================
        GET_CALENDAR: '/bookings/calendar',
        GET_DAILY_BOOKINGS: '/bookings/calendar/day/:date',
        GET_MONTHLY_BOOKINGS: '/bookings/calendar/month/:year/:month',
        GET_UPCOMING_DEPARTURES: '/bookings/departures/upcoming',
        GET_CHECK_INS_TODAY: '/bookings/check-ins/today',

        // ========================
        // Customer Portal
        // ========================
        GET_PUBLIC_BOOKING: '/bookings/public/:bookingNumber/:email',
        UPDATE_PUBLIC_BOOKING: '/bookings/public/:bookingNumber/update',
        CANCEL_PUBLIC_BOOKING: '/bookings/public/:bookingNumber/cancel',
        DOWNLOAD_PUBLIC_DOCUMENTS: '/bookings/public/:bookingNumber/documents',

        // ========================
        // Waitlist & Overbooking
        // ========================
        ADD_TO_WAITLIST: '/bookings/waitlist',
        GET_WAITLIST: '/bookings/waitlist/:entityType/:entityId',
        PROCESS_WAITLIST: '/bookings/waitlist/process',
        REMOVE_FROM_WAITLIST: '/bookings/waitlist/:waitlistId',

        // ========================
        // Reviews & Feedback
        // ========================
        GET_REVIEWS: '/bookings/:id/reviews',
        ADD_REVIEW: '/bookings/:id/reviews',
        REQUEST_REVIEW: '/bookings/:id/reviews/request',
        GET_FEEDBACK_FORM: '/bookings/:id/feedback',
        SUBMIT_FEEDBACK: '/bookings/:id/feedback',

        // ========================
        // Special Features
        // ========================
        GET_RECOMMENDATIONS: '/bookings/:id/recommendations',
        GET_UPSELLS: '/bookings/:id/upsells',
        APPLY_LOYALTY_POINTS: '/bookings/:id/loyalty/apply',
        EARN_LOYALTY_POINTS: '/bookings/:id/loyalty/earn',
        SPLIT_BOOKING: '/bookings/:id/split',
        MERGE_BOOKINGS: '/bookings/merge',

        // ========================
        // Mobile & Offline
        // ========================
        GET_MOBILE_BOOKING: '/bookings/:id/mobile',
        SYNC_OFFLINE_CHANGES: '/bookings/:id/sync/offline',
        GET_OFFLINE_DATA: '/bookings/:id/offline',

        // ========================
        // Admin & Management
        // ========================
        GET_ADMIN_DASHBOARD: '/bookings/admin/dashboard',
        GET_PENDING_APPROVALS: '/bookings/admin/pending-approvals',
        GET_OVERDUE_PAYMENTS: '/bookings/admin/overdue-payments',
        GET_PROBLEM_BOOKINGS: '/bookings/admin/problems',
        GET_AUDIT_LOG: '/bookings/:id/audit',

        // ========================
        // External Integrations
        // ========================
        WEBHOOK_PAYMENT: '/bookings/webhooks/payment',
        WEBHOOK_CANCELLATION: '/bookings/webhooks/cancellation',
        API_BOOKING_CREATE: '/bookings/api/create',
        API_BOOKING_UPDATE: '/bookings/api/:id/update',
        API_BOOKING_STATUS: '/bookings/api/:id/status',
    },

    // ========================
    // DESTINATIONS ENDPOINTS
    // ========================
    DESTINATIONS: {
        // Basic CRUD
        GET_ALL: '/destinations',
        GET_BY_ID: '/destinations/:id',
        GET_BY_SLUG: '/destinations/slug/:slug',
        CREATE: '/destinations',
        UPDATE: '/destinations/:id',
        DELETE: '/destinations/:id',

        // Search and Filter
        SEARCH: '/destinations/search',
        FILTER: '/destinations/filter',
        BY_COUNTRY: '/destinations/country/:country',
        BY_REGION: '/destinations/region/:region',
        BY_CLIMATE: '/destinations/climate/:climate',
        BY_SAFETY_LEVEL: '/destinations/safety/:level',

        // Media Management
        UPLOAD_IMAGES: '/destinations/:id/images',
        DELETE_IMAGE: '/destinations/:id/images/:imageId',
        SET_COVER_IMAGE: '/destinations/:id/cover',

        // Tours and Activities
        GET_TOURS: '/destinations/:id/tours',
        GET_ACTIVITIES: '/destinations/:id/activities',

        // Statistics
        GET_STATS: '/destinations/:id/stats',
        GET_SEASONAL_TRENDS: '/destinations/:id/trends',
        GET_POPULAR_DESTINATIONS: '/destinations/popular',
        GET_FEATURED_DESTINATIONS: '/destinations/featured',

        // Content Management
        UPDATE_SEO: '/destinations/:id/seo',
        UPDATE_CONTENT: '/destinations/:id/content',

        // Geographic
        NEARBY_DESTINATIONS: '/destinations/:id/nearby',
        BY_COORDINATES: '/destinations/coordinates',

        // Bulk Operations
        BULK_UPDATE_STATUS: '/destinations/bulk/status',
        BULK_UPDATE_FEATURED: '/destinations/bulk/featured',
    },

    // ========================
    // SERVICES ENDPOINTS
    // ========================
    SERVICES: {
        // Basic CRUD
        GET_ALL: '/services',
        GET_BY_ID: '/services/:id',
        GET_BY_SLUG: '/services/slug/:slug',
        CREATE: '/services',
        UPDATE: '/services/:id',
        DELETE: '/services/:id',

        // Search and Filter
        SEARCH: '/services/search',
        FILTER: '/services/filter',
        BY_CATEGORY: '/services/category/:category',
        BY_TYPE: '/services/type/:type',
        BY_PROVIDER: '/services/provider/:providerId',
        BY_LOCATION: '/services/location/:location',

        // Categories and Types
        GET_CATEGORIES: '/services/categories',
        CREATE_CATEGORY: '/services/categories',
        UPDATE_CATEGORY: '/services/categories/:id',
        DELETE_CATEGORY: '/services/categories/:id',

        // Providers Management
        GET_PROVIDERS: '/services/providers',
        CREATE_PROVIDER: '/services/providers',
        UPDATE_PROVIDER: '/services/providers/:id',
        DELETE_PROVIDER: '/services/providers/:id',
        GET_PROVIDER_SERVICES: '/services/providers/:id/services',

        // Availability Management
        GET_AVAILABILITY: '/services/:id/availability',
        UPDATE_AVAILABILITY: '/services/:id/availability',
        CHECK_AVAILABILITY: '/services/:id/availability/check',

        // Booking Management
        CREATE_SERVICE_BOOKING: '/services/:id/bookings',
        GET_SERVICE_BOOKINGS: '/services/:id/bookings',
        UPDATE_SERVICE_BOOKING: '/services/:id/bookings/:bookingId',
        CANCEL_SERVICE_BOOKING: '/services/:id/bookings/:bookingId/cancel',

        // Media Management
        UPLOAD_IMAGES: '/services/:id/images',
        DELETE_IMAGE: '/services/:id/images/:imageId',
        SET_PRIMARY_IMAGE: '/services/:id/images/:imageId/primary',

        // Reviews and Ratings
        GET_REVIEWS: '/services/:id/reviews',
        ADD_REVIEW: '/services/:id/reviews',
        UPDATE_REVIEW: '/services/:id/reviews/:reviewId',
        DELETE_REVIEW: '/services/:id/reviews/:reviewId',

        // Statistics
        GET_STATS: '/services/stats',
        GET_POPULAR: '/services/popular',
        GET_FEATURED: '/services/featured',
        GET_PROVIDER_STATS: '/services/providers/:id/stats',

        // Bulk Operations
        BULK_UPDATE_STATUS: '/services/bulk/status',
        BULK_UPDATE_PRICING: '/services/bulk/pricing',
    },

    // ========================
    // TOURS ENDPOINTS
    // ========================
    TOURS: {
        // Basic CRUD
        GET_ALL: '/tours',
        GET_BY_ID: '/tours/:id',
        GET_BY_SLUG: '/tours/slug/:slug',
        CREATE: '/tours',
        UPDATE: '/tours/:id',
        DELETE: '/tours/:id',

        // Search and Filter
        SEARCH: '/tours/search',
        FILTER: '/tours/filter',
        BY_CATEGORY: '/tours/category/:category',
        BY_DESTINATION: '/tours/destination/:destinationId',
        BY_DIFFICULTY: '/tours/difficulty/:difficulty',
        BY_DURATION: '/tours/duration/:days',
        BY_PRICE_RANGE: '/tours/price-range',
        BY_GUIDE: '/tours/guide/:guideId',

        // Availability Management
        GET_AVAILABILITY: '/tours/:id/availability',
        CREATE_AVAILABILITY: '/tours/:id/availability',
        UPDATE_AVAILABILITY: '/tours/:id/availability/:availabilityId',
        DELETE_AVAILABILITY: '/tours/:id/availability/:availabilityId',
        CHECK_AVAILABILITY: '/tours/:id/availability/check',

        // Itinerary Management
        GET_ITINERARY: '/tours/:id/itinerary',
        UPDATE_ITINERARY: '/tours/:id/itinerary',
        ADD_ITINERARY_DAY: '/tours/:id/itinerary/days',
        UPDATE_ITINERARY_DAY: '/tours/:id/itinerary/days/:day',
        DELETE_ITINERARY_DAY: '/tours/:id/itinerary/days/:day',

        // Media Management
        UPLOAD_IMAGES: '/tours/:id/images',
        DELETE_IMAGE: '/tours/:id/images/:imageId',
        SET_PRIMARY_IMAGE: '/tours/:id/images/:imageId/primary',
        REORDER_IMAGES: '/tours/:id/images/reorder',

        // Bookings for Tours
        GET_TOUR_BOOKINGS: '/tours/:id/bookings',
        GET_AVAILABILITY_BOOKINGS: '/tours/:id/availability/:availabilityId/bookings',

        // Reviews and Ratings
        GET_REVIEWS: '/tours/:id/reviews',
        ADD_REVIEW: '/tours/:id/reviews',
        UPDATE_REVIEW: '/tours/:id/reviews/:reviewId',
        DELETE_REVIEW: '/tours/:id/reviews/:reviewId',
        GET_REVIEW_STATS: '/tours/:id/reviews/stats',

        // Categories
        GET_CATEGORIES: '/tours/categories',
        CREATE_CATEGORY: '/tours/categories',
        UPDATE_CATEGORY: '/tours/categories/:id',
        DELETE_CATEGORY: '/tours/categories/:id',

        // Guides Management
        GET_GUIDES: '/tours/guides',
        CREATE_GUIDE: '/tours/guides',
        UPDATE_GUIDE: '/tours/guides/:id',
        DELETE_GUIDE: '/tours/guides/:id',
        GET_GUIDE_TOURS: '/tours/guides/:id/tours',

        // Destinations for Tours
        GET_TOUR_DESTINATIONS: '/tours/destinations',
        LINK_DESTINATION: '/tours/:id/destinations/:destinationId',
        UNLINK_DESTINATION: '/tours/:id/destinations/:destinationId',

        // Pricing and Discounts
        UPDATE_PRICING: '/tours/:id/pricing',
        ADD_DISCOUNT: '/tours/:id/discounts',
        UPDATE_DISCOUNT: '/tours/:id/discounts/:discountId',
        DELETE_DISCOUNT: '/tours/:id/discounts/:discountId',

        // Statistics and Analytics
        GET_STATS: '/tours/stats',
        GET_POPULAR: '/tours/popular',
        GET_FEATURED: '/tours/featured',
        GET_TOUR_PERFORMANCE: '/tours/:id/performance',
        GET_REVENUE_ANALYTICS: '/tours/analytics/revenue',
        GET_BOOKING_TRENDS: '/tours/analytics/booking-trends',

        // Content Management
        UPDATE_SEO: '/tours/:id/seo',
        DUPLICATE_TOUR: '/tours/:id/duplicate',

        // Bulk Operations
        BULK_UPDATE_STATUS: '/tours/bulk/status',
        BULK_UPDATE_FEATURED: '/tours/bulk/featured',
        BULK_UPDATE_PRICING: '/tours/bulk/pricing',
        BULK_ASSIGN_GUIDE: '/tours/bulk/assign-guide',

        // Export and Import
        EXPORT_TOURS: '/tours/export',
        IMPORT_TOURS: '/tours/import',
        GET_IMPORT_TEMPLATE: '/tours/import/template',
    },
    ITINERARY: {
        // ========================
        // Basic CRUD Operations
        // ========================
        GET_ALL: '/itineraries',
        GET_BY_ID: '/itineraries/:id',
        CREATE: '/itineraries',
        UPDATE: '/itineraries/:id',
        DELETE: '/itineraries/:id',
        DUPLICATE: '/itineraries/:id/duplicate',

        // ========================
        // Search and Filter
        // ========================
        SEARCH: '/itineraries/search',
        FILTER: '/itineraries/filter',
        BY_STATUS: '/itineraries/status/:status',
        BY_DATE_RANGE: '/itineraries/date-range',
        BY_DESTINATION: '/itineraries/destination/:destinationId',
        BY_TOUR: '/itineraries/tour/:tourId',
        BY_BOOKING: '/itineraries/booking/:bookingId',
        BY_PARTICIPANT: '/itineraries/participant/:participantId',

        // ========================
        // Day Management
        // ========================
        GET_DAYS: '/itineraries/:id/days',
        ADD_DAY: '/itineraries/:id/days',
        UPDATE_DAY: '/itineraries/:id/days/:dayNumber',
        DELETE_DAY: '/itineraries/:id/days/:dayNumber',
        REORDER_DAYS: '/itineraries/:id/days/reorder',

        // ========================
        // Activity Management
        // ========================
        GET_DAY_ACTIVITIES: '/itineraries/:id/days/:dayNumber/activities',
        ADD_ACTIVITY: '/itineraries/:id/days/:dayNumber/activities',
        UPDATE_ACTIVITY: '/itineraries/:id/days/:dayNumber/activities/:activityId',
        DELETE_ACTIVITY: '/itineraries/:id/days/:dayNumber/activities/:activityId',
        REORDER_ACTIVITIES: '/itineraries/:id/days/:dayNumber/activities/reorder',

        // ========================
        // Meal Management
        // ========================
        GET_DAY_MEALS: '/itineraries/:id/days/:dayNumber/meals',
        ADD_MEAL: '/itineraries/:id/days/:dayNumber/meals',
        UPDATE_MEAL: '/itineraries/:id/days/:dayNumber/meals/:mealId',
        DELETE_MEAL: '/itineraries/:id/days/:dayNumber/meals/:mealId',

        // ========================
        // Accommodation Management
        // ========================
        GET_DAY_ACCOMMODATION: '/itineraries/:id/days/:dayNumber/accommodation',
        SET_ACCOMMODATION: '/itineraries/:id/days/:dayNumber/accommodation',
        UPDATE_ACCOMMODATION: '/itineraries/:id/days/:dayNumber/accommodation',
        REMOVE_ACCOMMODATION: '/itineraries/:id/days/:dayNumber/accommodation',

        // ========================
        // Nearby Places Management
        // ========================
        GET_NEARBY_PLACES: '/itineraries/:id/days/:dayNumber/nearby-places',
        ADD_NEARBY_PLACE: '/itineraries/:id/days/:dayNumber/nearby-places',
        UPDATE_NEARBY_PLACE: '/itineraries/:id/days/:dayNumber/nearby-places/:placeId',
        DELETE_NEARBY_PLACE: '/itineraries/:id/days/:dayNumber/nearby-places/:placeId',
        SUGGEST_NEARBY_PLACES: '/itineraries/:id/days/:dayNumber/nearby-places/suggestions',

        // ========================
        // Participant Management
        // ========================
        GET_PARTICIPANTS: '/itineraries/:id/participants',
        ADD_PARTICIPANT: '/itineraries/:id/participants',
        UPDATE_PARTICIPANT: '/itineraries/:id/participants/:participantId',
        REMOVE_PARTICIPANT: '/itineraries/:id/participants/:participantId',
        BULK_ADD_PARTICIPANTS: '/itineraries/:id/participants/bulk',

        // ========================
        // Templates & Presets
        // ========================
        GET_TEMPLATES: '/itineraries/templates',
        CREATE_TEMPLATE: '/itineraries/templates',
        GET_TEMPLATE: '/itineraries/templates/:templateId',
        CREATE_FROM_TEMPLATE: '/itineraries/templates/:templateId/create',
        SAVE_AS_TEMPLATE: '/itineraries/:id/save-as-template',

        // ========================
        // Integration & Sync
        // ========================
        SYNC_WITH_TOUR: '/itineraries/:id/sync/tour/:tourId',
        SYNC_WITH_BOOKING: '/itineraries/:id/sync/booking/:bookingId',
        GENERATE_FROM_TOUR: '/itineraries/generate/tour/:tourId',
        GENERATE_FROM_BOOKING: '/itineraries/generate/booking/:bookingId',

        // ========================
        // Cost & Budget Management
        // ========================
        GET_COST_BREAKDOWN: '/itineraries/:id/costs',
        UPDATE_COSTS: '/itineraries/:id/costs',
        CALCULATE_TOTAL: '/itineraries/:id/costs/calculate',
        GET_BUDGET_ANALYSIS: '/itineraries/:id/budget/analysis',

        // ========================
        // Sharing & Collaboration
        // ========================
        SHARE: '/itineraries/:id/share',
        GET_SHARED: '/itineraries/shared',
        UPDATE_SHARING: '/itineraries/:id/sharing',
        REVOKE_SHARING: '/itineraries/:id/sharing/revoke',
        GET_SHARE_TOKEN: '/itineraries/:id/share/token',
        ACCESS_SHARED: '/itineraries/shared/:token',

        // ========================
        // Export & Import
        // ========================
        EXPORT_PDF: '/itineraries/:id/export/pdf',
        EXPORT_EXCEL: '/itineraries/:id/export/excel',
        EXPORT_JSON: '/itineraries/:id/export/json',
        IMPORT: '/itineraries/import',
        VALIDATE_IMPORT: '/itineraries/import/validate',
        GET_IMPORT_TEMPLATE: '/itineraries/import/template',

        // ========================
        // Statistics & Analytics
        // ========================
        GET_STATS: '/itineraries/stats',
        GET_POPULAR_DESTINATIONS: '/itineraries/analytics/destinations',
        GET_POPULAR_ACTIVITIES: '/itineraries/analytics/activities',
        GET_COST_TRENDS: '/itineraries/analytics/costs',
        GET_DURATION_TRENDS: '/itineraries/analytics/duration',
        GET_PARTICIPANT_STATS: '/itineraries/analytics/participants',

        // ========================
        // Validation & Optimization
        // ========================
        VALIDATE: '/itineraries/:id/validate',
        OPTIMIZE: '/itineraries/:id/optimize',
        GET_RECOMMENDATIONS: '/itineraries/:id/recommendations',
        CHECK_CONFLICTS: '/itineraries/:id/conflicts',

        // ========================
        // Version Management
        // ========================
        GET_VERSIONS: '/itineraries/:id/versions',
        CREATE_VERSION: '/itineraries/:id/versions',
        RESTORE_VERSION: '/itineraries/:id/versions/:versionId/restore',
        COMPARE_VERSIONS: '/itineraries/:id/versions/compare',

        // ========================
        // Bulk Operations
        // ========================
        BULK_UPDATE_STATUS: '/itineraries/bulk/status',
        BULK_DELETE: '/itineraries/bulk/delete',
        BULK_DUPLICATE: '/itineraries/bulk/duplicate',
        BULK_EXPORT: '/itineraries/bulk/export',
        BULK_ASSIGN: '/itineraries/bulk/assign',

        // ========================
        // Timeline & Schedule
        // ========================
        GET_TIMELINE: '/itineraries/:id/timeline',
        VALIDATE_SCHEDULE: '/itineraries/:id/schedule/validate',
        OPTIMIZE_SCHEDULE: '/itineraries/:id/schedule/optimize',
        GET_SCHEDULE_CONFLICTS: '/itineraries/:id/schedule/conflicts',

        // ========================
        // Weather & Conditions
        // ========================
        GET_WEATHER_FORECAST: '/itineraries/:id/weather',
        GET_WEATHER_RECOMMENDATIONS: '/itineraries/:id/weather/recommendations',
        UPDATE_FOR_WEATHER: '/itineraries/:id/weather/update',

        // ========================
        // Notifications & Reminders
        // ========================
        GET_NOTIFICATIONS: '/itineraries/:id/notifications',
        CREATE_REMINDER: '/itineraries/:id/reminders',
        UPDATE_REMINDER: '/itineraries/:id/reminders/:reminderId',
        DELETE_REMINDER: '/itineraries/:id/reminders/:reminderId',
        SEND_NOTIFICATION: '/itineraries/:id/notifications/send',

        // ========================
        // Mobile & Offline Support
        // ========================
        GET_OFFLINE_DATA: '/itineraries/:id/offline',
        SYNC_OFFLINE_CHANGES: '/itineraries/:id/sync',
        GET_MOBILE_VIEW: '/itineraries/:id/mobile',

        // ========================
        // Reviews & Feedback
        // ========================
        GET_REVIEWS: '/itineraries/:id/reviews',
        ADD_REVIEW: '/itineraries/:id/reviews',
        UPDATE_REVIEW: '/itineraries/:id/reviews/:reviewId',
        DELETE_REVIEW: '/itineraries/:id/reviews/:reviewId',
        GET_FEEDBACK: '/itineraries/:id/feedback',

        // ========================
        // AI & Smart Features
        // ========================
        AI_SUGGEST_ACTIVITIES: '/itineraries/:id/ai/suggest/activities',
        AI_OPTIMIZE_ROUTE: '/itineraries/:id/ai/optimize/route',
        AI_SUGGEST_MEALS: '/itineraries/:id/ai/suggest/meals',
        AI_BUDGET_OPTIMIZATION: '/itineraries/:id/ai/optimize/budget',
        AI_GENERATE_DESCRIPTION: '/itineraries/:id/ai/generate/description',
    },
    PAYMENT: PAYMENT_ENDPOINTS
} as const;

export default API_ENDPOINTS;