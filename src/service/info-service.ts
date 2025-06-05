// src/service/info-service.ts

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
import { APIResponse } from '@/types/APIResponse';
import {
  infoData,
  getFAQCategories,
  getFAQsByCategory,
  searchFAQs as searchFAQsHelper
} from '@/data/infoData';

// Simulate API delay for realistic behavior
const simulateDelay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Helper to create API response format
const createAPIResponse = <T>(data: T, message: string = 'Success'): APIResponse<T> => {
  return {
    success: true,
    statusCode: 200,
    message,
    data,
    errors: []
  };
};

class InfoService {
  // ========================
  // FAQ Management (Read Only)
  // ========================

  /**
   * Get all FAQs
   */
  async getAllFAQs(category?: string): Promise<APIResponse<FAQItem[]>> {
    try {
      await simulateDelay();

      let faqs = infoData.faqs;

      if (category) {
        faqs = getFAQsByCategory(category);
      }

      return createAPIResponse(faqs, 'FAQs retrieved successfully');
    } catch (error) {
      throw new Error(`Failed to fetch FAQs: ${error}`);
    }
  }

  /**
   * Get FAQ by ID
   */
  async getFAQById(id: string): Promise<APIResponse<FAQItem>> {
    try {
      await simulateDelay();

      const faq = infoData.faqs.find(f => f.id === id);

      if (!faq) {
        throw new Error('FAQ not found');
      }

      return createAPIResponse(faq, 'FAQ retrieved successfully');
    } catch (error) {
      throw new Error(`Failed to fetch FAQ: ${error}`);
    }
  }

  /**
   * Search FAQs by query
   */
  async searchFAQs(query: string, category?: string): Promise<APIResponse<FAQItem[]>> {
    try {
      await simulateDelay();

      const results = searchFAQsHelper(query, category);

      return createAPIResponse(results, 'FAQ search completed successfully');
    } catch (error) {
      throw new Error(`Failed to search FAQs: ${error}`);
    }
  }

  /**
   * Get FAQ categories
   */
  async getFAQCategories(): Promise<APIResponse<string[]>> {
    try {
      await simulateDelay();

      const categories = getFAQCategories();

      return createAPIResponse(categories, 'FAQ categories retrieved successfully');
    } catch (error) {
      throw new Error(`Failed to fetch FAQ categories: ${error}`);
    }
  }

  // ========================
  // Privacy Policy (Read Only)
  // ========================

  /**
   * Get Privacy Policy
   */
  async getPrivacyPolicy(): Promise<APIResponse<PrivacyPolicy>> {
    try {
      await simulateDelay();

      return createAPIResponse(infoData.privacyPolicy, 'Privacy policy retrieved successfully');
    } catch (error) {
      throw new Error(`Failed to fetch privacy policy: ${error}`);
    }
  }

  // ========================
  // Terms and Conditions (Read Only)
  // ========================

  /**
   * Get Terms and Conditions
   */
  async getTermsAndConditions(): Promise<APIResponse<TermsAndConditions>> {
    try {
      await simulateDelay();

      return createAPIResponse(infoData.termsAndConditions, 'Terms and conditions retrieved successfully');
    } catch (error) {
      throw new Error(`Failed to fetch terms and conditions: ${error}`);
    }
  }

  // ========================
  // Refund and Cancellation Policy (Read Only)
  // ========================

  /**
   * Get Refund Policy
   */
  async getRefundPolicy(): Promise<APIResponse<RefundCancellationPolicy>> {
    try {
      await simulateDelay();

      return createAPIResponse(infoData.refundPolicy, 'Refund policy retrieved successfully');
    } catch (error) {
      throw new Error(`Failed to fetch refund policy: ${error}`);
    }
  }

  // ========================
  // Shipping and Delivery Policy (Read Only)
  // ========================

  /**
   * Get Shipping Policy
   */
  async getShippingPolicy(): Promise<APIResponse<ShippingDeliveryPolicy>> {
    try {
      await simulateDelay();

      return createAPIResponse(infoData.shippingPolicy, 'Shipping policy retrieved successfully');
    } catch (error) {
      throw new Error(`Failed to fetch shipping policy: ${error}`);
    }
  }

  // ========================
  // Payment Security Policy (Read Only)
  // ========================

  /**
   * Get Payment Security Policy
   */
  async getPaymentSecurityPolicy(): Promise<APIResponse<PaymentSecurityPolicy>> {
    try {
      await simulateDelay();

      return createAPIResponse(infoData.paymentSecurity, 'Payment security policy retrieved successfully');
    } catch (error) {
      throw new Error(`Failed to fetch payment security policy: ${error}`);
    }
  }

  // ========================
  // Cookie Policy (Read Only)
  // ========================

  /**
   * Get Cookie Policy
   */
  async getCookiePolicy(): Promise<APIResponse<CookiePolicy>> {
    try {
      await simulateDelay();

      return createAPIResponse(infoData.cookiePolicy, 'Cookie policy retrieved successfully');
    } catch (error) {
      throw new Error(`Failed to fetch cookie policy: ${error}`);
    }
  }

  // ========================
  // Travel Guidelines (Read Only)
  // ========================

  /**
   * Get Travel Guidelines
   */
  async getTravelGuidelines(): Promise<APIResponse<TravelGuidelines>> {
    try {
      await simulateDelay();

      return createAPIResponse(infoData.travelGuidelines, 'Travel guidelines retrieved successfully');
    } catch (error) {
      throw new Error(`Failed to fetch travel guidelines: ${error}`);
    }
  }

  // ========================
  // Disclaimer (Read Only)
  // ========================

  /**
   * Get Disclaimer
   */
  async getDisclaimer(): Promise<APIResponse<Disclaimer>> {
    try {
      await simulateDelay();

      return createAPIResponse(infoData.disclaimer, 'Disclaimer retrieved successfully');
    } catch (error) {
      throw new Error(`Failed to fetch disclaimer: ${error}`);
    }
  }

  // ========================
  // Customer Rights (Read Only)
  // ========================

  /**
   * Get Customer Rights
   */
  async getCustomerRights(): Promise<APIResponse<CustomerRights>> {
    try {
      await simulateDelay();

      return createAPIResponse(infoData.customerRights, 'Customer rights retrieved successfully');
    } catch (error) {
      throw new Error(`Failed to fetch customer rights: ${error}`);
    }
  }

  // ========================
  // Insurance and Liability Policy (Read Only)
  // ========================

  /**
   * Get Insurance Liability Policy
   */
  async getInsuranceLiabilityPolicy(): Promise<APIResponse<InsuranceLiabilityPolicy>> {
    try {
      await simulateDelay();

      return createAPIResponse(infoData.insuranceLiability, 'Insurance liability policy retrieved successfully');
    } catch (error) {
      throw new Error(`Failed to fetch insurance liability policy: ${error}`);
    }
  }

  // ========================
  // Legal Contact (Read Only)
  // ========================

  /**
   * Get Legal Contact
   */
  async getLegalContact(): Promise<APIResponse<LegalContact>> {
    try {
      await simulateDelay();

      return createAPIResponse(infoData.legalContact, 'Legal contact information retrieved successfully');
    } catch (error) {
      throw new Error(`Failed to fetch legal contact: ${error}`);
    }
  }

  // ========================
  // Support (Read Only)
  // ========================

  /**
   * Get Support Information
   */
  async getSupport(): Promise<APIResponse<Support>> {
    try {
      await simulateDelay();

      return createAPIResponse(infoData.support, 'Support information retrieved successfully');
    } catch (error) {
      throw new Error(`Failed to fetch support information: ${error}`);
    }
  }

  // ========================
  // Utility Methods
  // ========================

  /**
   * Get all policies at once
   */
  async getAllPolicies(): Promise<APIResponse<{
    privacyPolicy: PrivacyPolicy;
    termsAndConditions: TermsAndConditions;
    refundPolicy: RefundCancellationPolicy;
    shippingPolicy: ShippingDeliveryPolicy;
    paymentSecurity: PaymentSecurityPolicy;
    cookiePolicy: CookiePolicy;
    travelGuidelines: TravelGuidelines;
    disclaimer: Disclaimer;
    customerRights: CustomerRights;
    insuranceLiability: InsuranceLiabilityPolicy;
  }>> {
    try {
      await simulateDelay(800); // Slightly longer delay for bulk operation

      const allPolicies = {
        privacyPolicy: infoData.privacyPolicy,
        termsAndConditions: infoData.termsAndConditions,
        refundPolicy: infoData.refundPolicy,
        shippingPolicy: infoData.shippingPolicy,
        paymentSecurity: infoData.paymentSecurity,
        cookiePolicy: infoData.cookiePolicy,
        travelGuidelines: infoData.travelGuidelines,
        disclaimer: infoData.disclaimer,
        customerRights: infoData.customerRights,
        insuranceLiability: infoData.insuranceLiability,
      };

      return createAPIResponse(allPolicies, 'All policies retrieved successfully');
    } catch (error) {
      throw new Error(`Failed to fetch all policies: ${error}`);
    }
  }

  /**
   * Get all contact and support information
   */
  async getAllContactInfo(): Promise<APIResponse<{
    legalContact: LegalContact;
    support: Support;
  }>> {
    try {
      await simulateDelay(400);

      const contactInfo = {
        legalContact: infoData.legalContact,
        support: infoData.support,
      };

      return createAPIResponse(contactInfo, 'Contact information retrieved successfully');
    } catch (error) {
      throw new Error(`Failed to fetch contact information: ${error}`);
    }
  }

  /**
   * Get all info data at once (useful for initial load)
   */
  async getAllInfoData(): Promise<APIResponse<typeof infoData>> {
    try {
      await simulateDelay(1000); // Longer delay for complete data load

      return createAPIResponse(infoData, 'All information data retrieved successfully');
    } catch (error) {
      throw new Error(`Failed to fetch all info data: ${error}`);
    }
  }

  /**
   * Health check for the service
   */
  async healthCheck(): Promise<APIResponse<{ status: string; timestamp: Date }>> {
    try {
      const healthData = {
        status: 'healthy',
        timestamp: new Date()
      };

      return createAPIResponse(healthData, 'Info service is running properly');
    } catch (error) {
      throw new Error(`Health check failed: ${error}`);
    }
  }
}

// Export singleton instance
export const infoService = new InfoService();