// src/types/info/index.ts

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  lastUpdated?: Date;
}

export interface PrivacyPolicy {
  effectiveDate: Date;
  lastUpdated: Date;
  informationCollection: {
    types: string[];
    methods: string[];
  };
  informationUse: string[];
  dataSharing: {
    withPartners: boolean;
    withServiceProviders: boolean;
    forLegalReasons: boolean;
  };
  userRights: {
    access: boolean;
    correction: boolean;
    deletion: boolean;
    optOut: boolean;
  };
  cookies: {
    use: boolean;
    types: string[];
    management: string;
  };
  securityMeasures: string[];
  childrenPrivacy: {
    underAge: number;
    parentalConsentRequired: boolean;
  };
  changesNotification: {
    method: string;
    noticePeriod: string;
  };
  contactInformation: {
    email: string;
    phone?: string;
    address?: string;
  };
}

export interface TermsAndConditions {
  effectiveDate: Date;
  acceptance: {
    byUsing: boolean;
    bySigning: boolean;
  };
  userObligations: string[];
  prohibitedActivities: string[];
  intellectualProperty: {
    ownership: string;
    licenses: string[];
  };
  termination: {
    byCompany: boolean;
    byUser: boolean;
    consequences: string[];
  };
  disclaimer: {
    warranties: string[];
    liabilityLimitations: string[];
  };
  governingLaw: {
    jurisdiction: string;
    venue: string;
  };
  changes: {
    notification: boolean;
    continuedUse: boolean;
  };
}

export interface RefundCancellationPolicy {
  timeFrame: {
    hoursBeforeDeparture: number;
    percentageRefund: number;
  }[];
  cancellationFees: {
    flatFee?: number;
    percentage?: number;
    minimumFee?: number;
  };
  nonRefundableItems: string[];
  process: {
    requestMethod: string;
    documentationRequired: string[];
    processingTime: string;
  };
  exceptions: {
    forceMajeure: boolean;
    medicalReasons: boolean;
  };
}

export interface ShippingDeliveryPolicy {
  processingTime: string;
  shippingMethods: {
    name: string;
    deliveryTime: string;
    cost: number | 'Free';
    availableRegions: string[];
  }[];
  internationalShipping: {
    available: boolean;
    restrictions: string[];
    additionalCosts: {
      customs: boolean;
      taxes: boolean;
      fees: boolean;
    };
  };
  tracking: {
    provided: boolean;
    notification: boolean;
  };
  returns: {
    allowed: boolean;
    timeLimit: string;
    conditionRequirements: string;
    process: string;
  };
}

export interface PaymentSecurityPolicy {
  acceptedMethods: string[];
  encryption: {
    type: string;
    standards: string[];
  };
  dataStorage: {
    stored: boolean;
    method: string;
    compliance: string[];
  };
  fraudPrevention: {
    measures: string[];
    monitoring: boolean;
  };
  disputeResolution: {
    process: string;
    timeFrame: string;
  };
}

export interface TravelGuidelines {
  documentation: {
    passport: {
      required: boolean;
      validityMonths: number;
    };
    visa: {
      required: boolean;
      types: string[];
    };
    vaccinations: string[];
  };
  health: {
    insuranceRequired: boolean;
    recommendations: string[];
    restrictions: string[];
  };
  packing: {
    prohibitedItems: string[];
    recommendedItems: string[];
    luggageRestrictions: string[];
  };
  conduct: {
    culturalNorms: string[];
    legalRestrictions: string[];
    environmental: string[];
  };
  emergencies: {
    contacts: {
      local: string;
      embassy: string;
      medical: string;
    };
    procedures: string[];
  };
}

export interface Disclaimer {
  contentAccuracy: string;
  thirdPartyLinks: string;
  professionalAdvice: string;
  liabilityLimitations: string;
  jurisdictionSpecific: string;
}

export interface CustomerRights {
  information: {
    clearPricing: boolean;
    completeDetails: boolean;
    changesNotification: boolean;
  };
  booking: {
    cancellation: boolean;
    modification: boolean;
    refundConditions: string[];
  };
  service: {
    qualityAssurance: boolean;
    complaintResolution: string;
    alternativeDisputeResolution: string;
  };
  privacy: {
    dataAccess: boolean;
    dataCorrection: boolean;
    marketingOptOut: boolean;
  };
}

export interface InsuranceLiabilityPolicy {
  coverage: {
    medicalExpenses: boolean;
    tripCancellation: boolean;
    lostLuggage: boolean;
    personalLiability: boolean;
  };
  exclusions: string[];
  claims: {
    process: string;
    documentation: string[];
    timeLimit: string;
  };
  providerDetails: {
    name: string;
    contact: string;
    policyNumberPrefix: string;
  };
}

export interface LegalContact {
  entityName: string;
  registeredAddress: string;
  contactMethods: {
    type: 'email' | 'phone' | 'mail' | 'form';
    value: string;
    availableHours?: string;
  }[];
  legalRepresentative: {
    name: string;
    position: string;
  };
  jurisdiction: string;
  registrationNumber: string;
}

export interface Support {
  channels: {
    type: 'email' | 'phone' | 'chat' | 'ticket';
    value: string;
    availability: string;
    responseTime: string;
  }[];
  faqAccess: boolean;
  emergency: {
    available: boolean;
    contact: string;
  };
  languages: string[];
}

export interface CookiePolicy {
  types: {
    name: string;
    purpose: string;
    duration: string;
    essential: boolean;
  }[];
  management: {
    browserSettings: string;
    optOut: string;
    consequences: string;
  };
  thirdParty: {
    present: boolean;
    controls: string;
  };
  changes: {
    notificationMethod: string;
    lastUpdated: Date;
  };
}