// src/data/infoData.ts

import {
    FAQItem,
    PrivacyPolicy,
    TermsAndConditions,
    RefundCancellationPolicy,
    ShippingDeliveryPolicy,
    PaymentSecurityPolicy,
    TravelGuidelines,
    Disclaimer,
    CustomerRights,
    InsuranceLiabilityPolicy,
    LegalContact,
    Support,
    CookiePolicy,
} from '@/types/info';

// ========================
// FAQ Data
// ========================
export const mockFAQs: FAQItem[] = [
    {
        id: '1',
        question: 'How do I book a tour?',
        answer: 'You can book a tour by browsing our available tours, selecting your preferred dates, and completing the booking process through our secure payment system. Simply click on any tour that interests you and follow the step-by-step booking guide.',
        category: 'Booking',
        lastUpdated: new Date('2024-01-15')
    },
    {
        id: '2',
        question: 'What is your cancellation policy?',
        answer: 'Our cancellation policy varies depending on the tour and timing. Generally, cancellations made 30+ days before departure receive a full refund minus processing fees. Please refer to our detailed cancellation policy for specific terms.',
        category: 'Cancellation',
        lastUpdated: new Date('2024-01-10')
    },
    {
        id: '3',
        question: 'Do you provide travel insurance?',
        answer: 'Yes, we offer comprehensive travel insurance that covers medical emergencies, trip cancellation, lost luggage, and more. We highly recommend purchasing travel insurance for your peace of mind.',
        category: 'Insurance',
        lastUpdated: new Date('2024-01-20')
    },
    {
        id: '4',
        question: 'What documents do I need for international travel?',
        answer: 'For international travel, you typically need a valid passport (with at least 6 months validity), appropriate visas, and any required health documentation. Specific requirements vary by destination - check our travel guidelines or contact our support team.',
        category: 'Travel Documents',
        lastUpdated: new Date('2024-01-12')
    },
    {
        id: '5',
        question: 'Are meals included in the tour packages?',
        answer: 'Meal inclusions vary by tour package. Some tours include all meals, others include breakfast only, and some allow you to explore local dining independently. Check the specific tour details for meal information.',
        category: 'Tour Details',
        lastUpdated: new Date('2024-01-18')
    },
    {
        id: '6',
        question: 'Can I modify my booking after confirmation?',
        answer: 'Yes, modifications are possible depending on availability and timing. Changes made more than 30 days before departure are usually accommodated. Additional fees may apply for date or room changes.',
        category: 'Booking',
        lastUpdated: new Date('2024-01-14')
    },
    {
        id: '7',
        question: 'What happens if my flight is delayed?',
        answer: 'If your flight is delayed and you miss part of your tour, we will do our best to accommodate you. We recommend purchasing travel insurance that covers flight delays. Contact us immediately if you experience delays.',
        category: 'Travel Issues',
        lastUpdated: new Date('2024-01-16')
    },
    {
        id: '8',
        question: 'Do you offer group discounts?',
        answer: 'Yes, we offer attractive group discounts for bookings of 8 or more people. Group rates vary by destination and season. Contact our group booking specialists for personalized quotes.',
        category: 'Pricing',
        lastUpdated: new Date('2024-01-11')
    },
    {
        id: '9',
        question: 'What is the minimum age for solo travelers?',
        answer: 'Solo travelers must be at least 18 years old. Travelers under 18 must be accompanied by a parent or guardian, or have special arrangements made through our customer service team.',
        category: 'Age Requirements',
        lastUpdated: new Date('2024-01-13')
    },
    {
        id: '10',
        question: 'How do I access my travel documents?',
        answer: 'Once your booking is confirmed and payment is processed, you will receive an email with access to your travel documents. You can also log into your account on our website to download your itinerary and vouchers.',
        category: 'Travel Documents',
        lastUpdated: new Date('2024-01-17')
    }
];

// ========================
// Privacy Policy Data
// ========================
export const mockPrivacyPolicy: PrivacyPolicy = {
    effectiveDate: new Date('2024-01-01'),
    lastUpdated: new Date('2024-01-15'),
    informationCollection: {
        types: [
            'Personal identification information (name, email, phone)',
            'Payment and billing information',
            'Travel preferences and history',
            'Website usage data and cookies',
            'Location data when using mobile app'
        ],
        methods: [
            'Direct collection through forms and bookings',
            'Automatic collection through website analytics',
            'Third-party integrations and partners',
            'Customer service interactions'
        ]
    },
    informationUse: [
        'Processing and managing tour bookings',
        'Providing customer support and assistance',
        'Sending important travel updates and notifications',
        'Improving our services and user experience',
        'Marketing communications (with consent)',
        'Legal compliance and fraud prevention'
    ],
    dataSharing: {
        withPartners: true,
        withServiceProviders: true,
        forLegalReasons: true
    },
    userRights: {
        access: true,
        correction: true,
        deletion: true,
        optOut: true
    },
    cookies: {
        use: true,
        types: ['Essential', 'Analytics', 'Marketing', 'Functional'],
        management: 'Users can control cookie preferences through browser settings or our cookie preference center'
    },
    securityMeasures: [
        'SSL encryption for data transmission',
        'Secure servers with regular security updates',
        'Access controls and employee training',
        'Regular security audits and monitoring',
        'PCI DSS compliance for payment processing'
    ],
    childrenPrivacy: {
        underAge: 13,
        parentalConsentRequired: true
    },
    changesNotification: {
        method: 'Email notification and website posting',
        noticePeriod: '30 days'
    },
    contactInformation: {
        email: 'privacy@mapmytour.com',
        phone: '+1-555-0123',
        address: '123 Travel Street, Adventure City, AC 12345'
    }
};

// ========================
// Terms and Conditions Data
// ========================
export const mockTermsAndConditions: TermsAndConditions = {
    effectiveDate: new Date('2024-01-01'),
    acceptance: {
        byUsing: true,
        bySigning: false
    },
    userObligations: [
        'Provide accurate and complete information',
        'Comply with all applicable laws and regulations',
        'Respect other travelers and local customs',
        'Arrive on time for scheduled activities',
        'Follow guide instructions for safety',
        'Report any issues or concerns promptly'
    ],
    prohibitedActivities: [
        'Illegal or unlawful activities',
        'Harassment or discrimination',
        'Damage to property or environment',
        'Unauthorized use of copyrighted materials',
        'Sharing of login credentials',
        'Fraudulent booking or payment activities'
    ],
    intellectualProperty: {
        ownership: 'MapMyTour retains all rights to website content, logos, and proprietary materials',
        licenses: [
            'Limited license to use website for personal travel planning',
            'No redistribution of content without permission',
            'User-generated content licensing to MapMyTour'
        ]
    },
    termination: {
        byCompany: true,
        byUser: true,
        consequences: [
            'Immediate loss of access to services',
            'Forfeiture of unused credits or bookings',
            'Continued liability for outstanding payments'
        ]
    },
    disclaimer: {
        warranties: [
            'Services provided "as is" without warranties',
            'No guarantee of uninterrupted service',
            'Third-party service dependencies'
        ],
        liabilityLimitations: [
            'Limited to the amount paid for services',
            'No liability for indirect or consequential damages',
            'Force majeure exclusions'
        ]
    },
    governingLaw: {
        jurisdiction: 'State of California, USA',
        venue: 'Courts of San Francisco County'
    },
    changes: {
        notification: true,
        continuedUse: true
    }
};

// ========================
// Refund Policy Data
// ========================
export const mockRefundPolicy: RefundCancellationPolicy = {
    timeFrame: [
        { hoursBeforeDeparture: 720, percentageRefund: 100 }, // 30 days
        { hoursBeforeDeparture: 360, percentageRefund: 75 },  // 15 days
        { hoursBeforeDeparture: 168, percentageRefund: 50 },  // 7 days
        { hoursBeforeDeparture: 72, percentageRefund: 25 },   // 3 days
        { hoursBeforeDeparture: 24, percentageRefund: 0 }     // 1 day
    ],
    cancellationFees: {
        flatFee: 50,
        percentage: 5,
        minimumFee: 25
    },
    nonRefundableItems: [
        'Processing fees',
        'Third-party booking fees',
        'Visa and documentation fees',
        'Travel insurance premiums',
        'Special event tickets'
    ],
    process: {
        requestMethod: 'Online cancellation form or customer service contact',
        documentationRequired: [
            'Booking confirmation number',
            'Photo identification',
            'Reason for cancellation (if claiming exception)'
        ],
        processingTime: '5-10 business days to original payment method'
    },
    exceptions: {
        forceMajeure: true,
        medicalReasons: true
    }
};

// ========================
// Shipping Policy Data
// ========================
export const mockShippingPolicy: ShippingDeliveryPolicy = {
    processingTime: '1-2 business days',
    shippingMethods: [
        {
            name: 'Digital Delivery',
            deliveryTime: 'Immediate',
            cost: 'Free',
            availableRegions: ['Worldwide']
        },
        {
            name: 'Standard Mail',
            deliveryTime: '5-7 business days',
            cost: 'Free',
            availableRegions: ['USA', 'Canada']
        },
        {
            name: 'Express Mail',
            deliveryTime: '2-3 business days',
            cost: 15,
            availableRegions: ['USA', 'Canada']
        },
        {
            name: 'International Shipping',
            deliveryTime: '10-14 business days',
            cost: 25,
            availableRegions: ['Europe', 'Asia', 'Australia']
        }
    ],
    internationalShipping: {
        available: true,
        restrictions: [
            'Some countries may have import restrictions',
            'PO Box addresses not accepted for physical items',
            'Remote areas may have extended delivery times'
        ],
        additionalCosts: {
            customs: true,
            taxes: true,
            fees: true
        }
    },
    tracking: {
        provided: true,
        notification: true
    },
    returns: {
        allowed: true,
        timeLimit: '30 days from delivery',
        conditionRequirements: 'Items must be unused and in original packaging',
        process: 'Contact customer service for return authorization'
    }
};

// ========================
// Payment Security Policy Data
// ========================
export const mockPaymentSecurity: PaymentSecurityPolicy = {
    acceptedMethods: [
        'Visa',
        'Mastercard',
        'American Express',
        'Discover',
        'PayPal',
        'Apple Pay',
        'Google Pay',
        'Bank Transfer'
    ],
    encryption: {
        type: 'SSL/TLS 256-bit encryption',
        standards: ['PCI DSS Level 1', 'ISO 27001', 'SOC 2 Type II']
    },
    dataStorage: {
        stored: false,
        method: 'Tokenization through secure payment processors',
        compliance: ['PCI DSS', 'GDPR', 'CCPA']
    },
    fraudPrevention: {
        measures: [
            'Real-time transaction monitoring',
            'CVV verification',
            'Address verification system (AVS)',
            '3D Secure authentication',
            'Machine learning fraud detection'
        ],
        monitoring: true
    },
    disputeResolution: {
        process: 'Contact customer service within 60 days of transaction',
        timeFrame: '10-15 business days for resolution'
    }
};

// ========================
// Cookie Policy Data
// ========================
export const mockCookiePolicy: CookiePolicy = {
    types: [
        {
            name: 'Essential Cookies',
            purpose: 'Required for basic website functionality and security',
            duration: 'Session or 1 year',
            essential: true
        },
        {
            name: 'Analytics Cookies',
            purpose: 'Help us understand how visitors use our website',
            duration: '2 years',
            essential: false
        },
        {
            name: 'Marketing Cookies',
            purpose: 'Used to deliver relevant advertisements and track campaign effectiveness',
            duration: '1 year',
            essential: false
        },
        {
            name: 'Functional Cookies',
            purpose: 'Remember your preferences and provide enhanced features',
            duration: '1 year',
            essential: false
        }
    ],
    management: {
        browserSettings: 'Users can control cookies through browser settings',
        optOut: 'Cookie preference center available on our website',
        consequences: 'Disabling cookies may limit website functionality'
    },
    thirdParty: {
        present: true,
        controls: 'Third-party cookies are subject to their respective privacy policies'
    },
    changes: {
        notificationMethod: 'Website notification and email to registered users',
        lastUpdated: new Date('2024-01-15')
    }
};

// ========================
// Travel Guidelines Data
// ========================
export const mockTravelGuidelines: TravelGuidelines = {
    documentation: {
        passport: {
            required: true,
            validityMonths: 6
        },
        visa: {
            required: true,
            types: ['Tourist Visa', 'Business Visa', 'Transit Visa']
        },
        vaccinations: [
            'COVID-19 vaccination (as required by destination)',
            'Yellow Fever (for certain African and South American countries)',
            'Hepatitis A and B',
            'Typhoid',
            'Japanese Encephalitis (for Asia travel)'
        ]
    },
    health: {
        insuranceRequired: true,
        recommendations: [
            'Consult with a travel medicine specialist',
            'Pack prescription medications in original containers',
            'Carry a medical summary and emergency contacts',
            'Research local medical facilities at destination'
        ],
        restrictions: [
            'Travelers with serious medical conditions should consult physicians',
            'Pregnancy travel restrictions may apply',
            'Age restrictions for certain adventure activities'
        ]
    },
    packing: {
        prohibitedItems: [
            'Weapons and sharp objects',
            'Flammable liquids',
            'Illegal substances',
            'Certain electronic devices',
            'Protected wildlife products'
        ],
        recommendedItems: [
            'Universal power adapter',
            'Portable charger',
            'First aid kit',
            'Sunscreen and insect repellent',
            'Comfortable walking shoes',
            'Weather-appropriate clothing'
        ],
        luggageRestrictions: [
            'Check airline weight and size limits',
            'Consider luggage locks for security',
            'Pack valuables in carry-on',
            'Leave room for souvenirs'
        ]
    },
    conduct: {
        culturalNorms: [
            'Research and respect local customs and traditions',
            'Dress appropriately for religious sites',
            'Learn basic greetings in local language',
            'Be mindful of photography restrictions'
        ],
        legalRestrictions: [
            'Comply with all local laws and regulations',
            'Respect visa terms and duration of stay',
            'Avoid illegal activities and substances',
            'Follow local traffic and safety rules'
        ],
        environmental: [
            'Practice responsible tourism',
            'Minimize environmental impact',
            'Support local communities and businesses',
            'Respect wildlife and natural habitats'
        ]
    },
    emergencies: {
        contacts: {
            local: '911 (USA) or local emergency number',
            embassy: 'Contact nearest embassy or consulate',
            medical: 'Local emergency medical services'
        },
        procedures: [
            'Register with embassy upon arrival (for extended stays)',
            'Keep emergency contacts readily available',
            'Maintain copies of important documents',
            'Know location of nearest medical facilities'
        ]
    }
};

// ========================
// Disclaimer Data
// ========================
export const mockDisclaimer: Disclaimer = {
    contentAccuracy: 'While we strive to provide accurate and up-to-date information, MapMyTour makes no guarantees about the completeness, accuracy, or reliability of the content on this website. Information may change without notice.',
    thirdPartyLinks: 'Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of service of these external sites. Use of third-party sites is at your own risk.',
    professionalAdvice: 'The information provided on this website is for general informational purposes only and should not be considered as professional travel, legal, medical, or financial advice. Consult with qualified professionals for specific guidance.',
    liabilityLimitations: 'MapMyTour shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from the use of our website or services, including but not limited to travel disruptions, personal injury, or financial loss.',
    jurisdictionSpecific: 'Some information and services may not be available or may be restricted in certain jurisdictions. Users are responsible for compliance with local laws and regulations in their area of residence and travel destinations.'
};

// ========================
// Customer Rights Data
// ========================
export const mockCustomerRights: CustomerRights = {
    information: {
        clearPricing: true,
        completeDetails: true,
        changesNotification: true
    },
    booking: {
        cancellation: true,
        modification: true,
        refundConditions: [
            'Full refund for cancellations 30+ days before departure',
            'Partial refunds based on cancellation timing',
            'Emergency cancellation considerations',
            'Force majeure protections'
        ]
    },
    service: {
        qualityAssurance: true,
        complaintResolution: 'Dedicated customer service team available 24/7 for issue resolution',
        alternativeDisputeResolution: 'Mediation and arbitration options available for unresolved disputes'
    },
    privacy: {
        dataAccess: true,
        dataCorrection: true,
        marketingOptOut: true
    }
};

// ========================
// Insurance Liability Policy Data
// ========================
export const mockInsuranceLiability: InsuranceLiabilityPolicy = {
    coverage: {
        medicalExpenses: true,
        tripCancellation: true,
        lostLuggage: true,
        personalLiability: true
    },
    exclusions: [
        'Pre-existing medical conditions (unless covered)',
        'High-risk activities not disclosed during booking',
        'Travel to countries with government travel warnings',
        'Illegal activities or violations of local laws',
        'Damage due to alcohol or substance abuse'
    ],
    claims: {
        process: 'File claim within 30 days of incident with required documentation',
        documentation: [
            'Completed claim form',
            'Medical reports (for medical claims)',
            'Police reports (for theft or damage)',
            'Original receipts and proof of ownership',
            'Travel itinerary and booking confirmation'
        ],
        timeLimit: '30 days from date of incident'
    },
    providerDetails: {
        name: 'Global Travel Insurance Partners',
        contact: 'claims@globaltravelinsurance.com | 1-800-555-0199',
        policyNumberPrefix: 'MMT-'
    }
};

// ========================
// Legal Contact Data
// ========================
export const mockLegalContact: LegalContact = {
    entityName: 'MapMyTour LLC',
    registeredAddress: '123 Adventure Boulevard, Suite 456, San Francisco, CA 94102, USA',
    contactMethods: [
        {
            type: 'email',
            value: 'legal@mapmytour.com',
            availableHours: 'Business inquiries responded to within 48 hours'
        },
        {
            type: 'phone',
            value: '+1-555-0123',
            availableHours: 'Monday-Friday, 9:00 AM - 6:00 PM PST'
        },
        {
            type: 'mail',
            value: '123 Adventure Boulevard, Suite 456, San Francisco, CA 94102, USA'
        },
        {
            type: 'form',
            value: 'https://mapmytour.com/contact/legal',
            availableHours: 'Available 24/7, responses within 2 business days'
        }
    ],
    legalRepresentative: {
        name: 'Sarah Johnson',
        position: 'Chief Legal Officer'
    },
    jurisdiction: 'State of California, USA',
    registrationNumber: 'LLC-CA-2020-1234567'
};

// ========================
// Support Data
// ========================
export const mockSupport: Support = {
    channels: [
        {
            type: 'email',
            value: 'support@mapmytour.com',
            availability: '24/7',
            responseTime: 'Within 2 hours during business hours, 24 hours otherwise'
        },
        {
            type: 'phone',
            value: '+1-555-0100',
            availability: '24/7',
            responseTime: 'Immediate during business hours, callback within 4 hours otherwise'
        },
        {
            type: 'chat',
            value: 'Live chat on website',
            availability: 'Monday-Sunday, 6:00 AM - 12:00 AM PST',
            responseTime: 'Immediate response from live agents'
        },
        {
            type: 'ticket',
            value: 'Support ticket system',
            availability: '24/7',
            responseTime: 'Within 4 hours for urgent issues, 24 hours for general inquiries'
        }
    ],
    faqAccess: true,
    emergency: {
        available: true,
        contact: '+1-555-0911 (24/7 emergency hotline for travelers)'
    },
    languages: ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Japanese', 'Mandarin']
};

// ========================
// Export all data
// ========================
export const infoData = {
    faqs: mockFAQs,
    privacyPolicy: mockPrivacyPolicy,
    termsAndConditions: mockTermsAndConditions,
    refundPolicy: mockRefundPolicy,
    shippingPolicy: mockShippingPolicy,
    paymentSecurity: mockPaymentSecurity,
    cookiePolicy: mockCookiePolicy,
    travelGuidelines: mockTravelGuidelines,
    disclaimer: mockDisclaimer,
    customerRights: mockCustomerRights,
    insuranceLiability: mockInsuranceLiability,
    legalContact: mockLegalContact,
    support: mockSupport
};

// Helper function to get FAQ categories
export const getFAQCategories = (): string[] => {
    const categories = mockFAQs
        .map(faq => faq.category)
        .filter(Boolean) as string[];
    return Array.from(new Set(categories));
};

// Helper function to filter FAQs by category
export const getFAQsByCategory = (category: string): FAQItem[] => {
    return mockFAQs.filter(faq => faq.category === category);
};

// Helper function to search FAQs
export const searchFAQs = (query: string, category?: string): FAQItem[] => {
    let filteredFAQs = mockFAQs;

    if (category) {
        filteredFAQs = filteredFAQs.filter(faq => faq.category === category);
    }

    if (query.trim()) {
        const searchTerm = query.toLowerCase();
        filteredFAQs = filteredFAQs.filter(faq =>
            faq.question.toLowerCase().includes(searchTerm) ||
            faq.answer.toLowerCase().includes(searchTerm) ||
            faq.category?.toLowerCase().includes(searchTerm)
        );
    }

    return filteredFAQs;
};