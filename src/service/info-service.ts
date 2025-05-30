import { apiClient, API_ENDPOINTS } from '@/lib/api';
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

// Additional request types for info service
export interface FAQRequest {
  question: string;
  answer: string;
  category?: string;
}

export interface FAQUpdateRequest extends Partial<FAQRequest> {
  id: string;
}

class InfoService {
  // ========================
  // FAQ Management
  // ========================

  /**
   * Get all FAQs
   */
  async getAllFAQs(category?: string): Promise<APIResponse<FAQItem[]>> {
    try {
      const endpoint = category 
        ? API_ENDPOINTS.INFO.FAQ_BY_CATEGORY.replace(':category', category)
        : API_ENDPOINTS.INFO.FAQ;
      
      const response = await apiClient.get<FAQItem[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch FAQs: ${error}`);
    }
  }

  /**
   * Get FAQ by ID
   */
  async getFAQById(id: string): Promise<APIResponse<FAQItem>> {
    try {
      const endpoint = API_ENDPOINTS.INFO.FAQ_BY_ID.replace(':id', id);
      const response = await apiClient.get<FAQItem>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch FAQ: ${error}`);
    }
  }

  /**
   * Create new FAQ
   */
  async createFAQ(data: FAQRequest): Promise<APIResponse<FAQItem>> {
    try {
      const response = await apiClient.post<FAQItem>(
        API_ENDPOINTS.INFO.FAQ,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to create FAQ: ${error}`);
    }
  }

  /**
   * Update FAQ
   */
  async updateFAQ(data: FAQUpdateRequest): Promise<APIResponse<FAQItem>> {
    try {
      const endpoint = API_ENDPOINTS.INFO.FAQ_BY_ID.replace(':id', data.id);
      const { id, ...updateData } = data;
      const response = await apiClient.put<FAQItem>(endpoint, updateData);
      return response;
    } catch (error) {
      throw new Error(`Failed to update FAQ: ${error}`);
    }
  }

  /**
   * Delete FAQ
   */
  async deleteFAQ(id: string): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.INFO.FAQ_BY_ID.replace(':id', id);
      const response = await apiClient.delete<{ message: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete FAQ: ${error}`);
    }
  }

  /**
   * Search FAQs by query
   */
  async searchFAQs(query: string, category?: string): Promise<APIResponse<FAQItem[]>> {
    try {
      const params: Record<string, string> = { q: query };
      if (category) {
        params.category = category;
      }

      const response = await apiClient.get<FAQItem[]>(API_ENDPOINTS.INFO.FAQ, params);
      return response;
    } catch (error) {
      throw new Error(`Failed to search FAQs: ${error}`);
    }
  }

  // ========================
  // Privacy Policy
  // ========================

  /**
   * Get Privacy Policy
   */
  async getPrivacyPolicy(): Promise<APIResponse<PrivacyPolicy>> {
    try {
      const response = await apiClient.get<PrivacyPolicy>(API_ENDPOINTS.INFO.PRIVACY_POLICY);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch privacy policy: ${error}`);
    }
  }

  /**
   * Update Privacy Policy
   */
  async updatePrivacyPolicy(data: Partial<PrivacyPolicy>): Promise<APIResponse<PrivacyPolicy>> {
    try {
      const response = await apiClient.put<PrivacyPolicy>(
        API_ENDPOINTS.INFO.PRIVACY_POLICY,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to update privacy policy: ${error}`);
    }
  }

  // ========================
  // Terms and Conditions
  // ========================

  /**
   * Get Terms and Conditions
   */
  async getTermsAndConditions(): Promise<APIResponse<TermsAndConditions>> {
    try {
      const response = await apiClient.get<TermsAndConditions>(API_ENDPOINTS.INFO.TERMS_CONDITIONS);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch terms and conditions: ${error}`);
    }
  }

  /**
   * Update Terms and Conditions
   */
  async updateTermsAndConditions(data: Partial<TermsAndConditions>): Promise<APIResponse<TermsAndConditions>> {
    try {
      const response = await apiClient.put<TermsAndConditions>(
        API_ENDPOINTS.INFO.TERMS_CONDITIONS,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to update terms and conditions: ${error}`);
    }
  }

  // ========================
  // Refund and Cancellation Policy
  // ========================

  /**
   * Get Refund Policy
   */
  async getRefundPolicy(): Promise<APIResponse<RefundCancellationPolicy>> {
    try {
      const response = await apiClient.get<RefundCancellationPolicy>(API_ENDPOINTS.INFO.REFUND_POLICY);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch refund policy: ${error}`);
    }
  }

  /**
   * Update Refund Policy
   */
  async updateRefundPolicy(data: Partial<RefundCancellationPolicy>): Promise<APIResponse<RefundCancellationPolicy>> {
    try {
      const response = await apiClient.put<RefundCancellationPolicy>(
        API_ENDPOINTS.INFO.REFUND_POLICY,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to update refund policy: ${error}`);
    }
  }

  // ========================
  // Shipping and Delivery Policy
  // ========================

  /**
   * Get Shipping Policy
   */
  async getShippingPolicy(): Promise<APIResponse<ShippingDeliveryPolicy>> {
    try {
      const response = await apiClient.get<ShippingDeliveryPolicy>(API_ENDPOINTS.INFO.SHIPPING_POLICY);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch shipping policy: ${error}`);
    }
  }

  /**
   * Update Shipping Policy
   */
  async updateShippingPolicy(data: Partial<ShippingDeliveryPolicy>): Promise<APIResponse<ShippingDeliveryPolicy>> {
    try {
      const response = await apiClient.put<ShippingDeliveryPolicy>(
        API_ENDPOINTS.INFO.SHIPPING_POLICY,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to update shipping policy: ${error}`);
    }
  }

  // ========================
  // Payment Security Policy
  // ========================

  /**
   * Get Payment Security Policy
   */
  async getPaymentSecurityPolicy(): Promise<APIResponse<PaymentSecurityPolicy>> {
    try {
      const response = await apiClient.get<PaymentSecurityPolicy>(API_ENDPOINTS.INFO.PAYMENT_SECURITY);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch payment security policy: ${error}`);
    }
  }

  /**
   * Update Payment Security Policy
   */
  async updatePaymentSecurityPolicy(data: Partial<PaymentSecurityPolicy>): Promise<APIResponse<PaymentSecurityPolicy>> {
    try {
      const response = await apiClient.put<PaymentSecurityPolicy>(
        API_ENDPOINTS.INFO.PAYMENT_SECURITY,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to update payment security policy: ${error}`);
    }
  }

  // ========================
  // Cookie Policy
  // ========================

  /**
   * Get Cookie Policy
   */
  async getCookiePolicy(): Promise<APIResponse<CookiePolicy>> {
    try {
      const response = await apiClient.get<CookiePolicy>(API_ENDPOINTS.INFO.COOKIE_POLICY);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch cookie policy: ${error}`);
    }
  }

  /**
   * Update Cookie Policy
   */
  async updateCookiePolicy(data: Partial<CookiePolicy>): Promise<APIResponse<CookiePolicy>> {
    try {
      const response = await apiClient.put<CookiePolicy>(
        API_ENDPOINTS.INFO.COOKIE_POLICY,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to update cookie policy: ${error}`);
    }
  }

  // ========================
  // Travel Guidelines
  // ========================

  /**
   * Get Travel Guidelines
   */
  async getTravelGuidelines(): Promise<APIResponse<TravelGuidelines>> {
    try {
      const response = await apiClient.get<TravelGuidelines>(API_ENDPOINTS.INFO.TRAVEL_GUIDELINES);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch travel guidelines: ${error}`);
    }
  }

  /**
   * Update Travel Guidelines
   */
  async updateTravelGuidelines(data: Partial<TravelGuidelines>): Promise<APIResponse<TravelGuidelines>> {
    try {
      const response = await apiClient.put<TravelGuidelines>(
        API_ENDPOINTS.INFO.TRAVEL_GUIDELINES,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to update travel guidelines: ${error}`);
    }
  }

  // ========================
  // Disclaimer
  // ========================

  /**
   * Get Disclaimer
   */
  async getDisclaimer(): Promise<APIResponse<Disclaimer>> {
    try {
      const response = await apiClient.get<Disclaimer>(API_ENDPOINTS.INFO.DISCLAIMER);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch disclaimer: ${error}`);
    }
  }

  /**
   * Update Disclaimer
   */
  async updateDisclaimer(data: Partial<Disclaimer>): Promise<APIResponse<Disclaimer>> {
    try {
      const response = await apiClient.put<Disclaimer>(
        API_ENDPOINTS.INFO.DISCLAIMER,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to update disclaimer: ${error}`);
    }
  }

  // ========================
  // Customer Rights
  // ========================

  /**
   * Get Customer Rights
   */
  async getCustomerRights(): Promise<APIResponse<CustomerRights>> {
    try {
      const response = await apiClient.get<CustomerRights>(API_ENDPOINTS.INFO.CUSTOMER_RIGHTS);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch customer rights: ${error}`);
    }
  }

  /**
   * Update Customer Rights
   */
  async updateCustomerRights(data: Partial<CustomerRights>): Promise<APIResponse<CustomerRights>> {
    try {
      const response = await apiClient.put<CustomerRights>(
        API_ENDPOINTS.INFO.CUSTOMER_RIGHTS,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to update customer rights: ${error}`);
    }
  }

  // ========================
  // Insurance and Liability Policy
  // ========================

  /**
   * Get Insurance Liability Policy
   */
  async getInsuranceLiabilityPolicy(): Promise<APIResponse<InsuranceLiabilityPolicy>> {
    try {
      const response = await apiClient.get<InsuranceLiabilityPolicy>(API_ENDPOINTS.INFO.INSURANCE_LIABILITY);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch insurance liability policy: ${error}`);
    }
  }

  /**
   * Update Insurance Liability Policy
   */
  async updateInsuranceLiabilityPolicy(data: Partial<InsuranceLiabilityPolicy>): Promise<APIResponse<InsuranceLiabilityPolicy>> {
    try {
      const response = await apiClient.put<InsuranceLiabilityPolicy>(
        API_ENDPOINTS.INFO.INSURANCE_LIABILITY,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to update insurance liability policy: ${error}`);
    }
  }

  // ========================
  // Legal Contact
  // ========================

  /**
   * Get Legal Contact
   */
  async getLegalContact(): Promise<APIResponse<LegalContact>> {
    try {
      const response = await apiClient.get<LegalContact>(API_ENDPOINTS.INFO.LEGAL_CONTACT);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch legal contact: ${error}`);
    }
  }

  /**
   * Update Legal Contact
   */
  async updateLegalContact(data: Partial<LegalContact>): Promise<APIResponse<LegalContact>> {
    try {
      const response = await apiClient.put<LegalContact>(
        API_ENDPOINTS.INFO.LEGAL_CONTACT,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to update legal contact: ${error}`);
    }
  }

  // ========================
  // Support
  // ========================

  /**
   * Get Support Information
   */
  async getSupport(): Promise<APIResponse<Support>> {
    try {
      const response = await apiClient.get<Support>(API_ENDPOINTS.INFO.SUPPORT);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch support information: ${error}`);
    }
  }

  /**
   * Update Support Information
   */
  async updateSupport(data: Partial<Support>): Promise<APIResponse<Support>> {
    try {
      const response = await apiClient.put<Support>(
        API_ENDPOINTS.INFO.SUPPORT,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to update support information: ${error}`);
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
      const [
        privacyPolicy,
        termsAndConditions,
        refundPolicy,
        shippingPolicy,
        paymentSecurity,
        cookiePolicy,
        travelGuidelines,
        disclaimer,
        customerRights,
        insuranceLiability
      ] = await Promise.all([
        this.getPrivacyPolicy(),
        this.getTermsAndConditions(),
        this.getRefundPolicy(),
        this.getShippingPolicy(),
        this.getPaymentSecurityPolicy(),
        this.getCookiePolicy(),
        this.getTravelGuidelines(),
        this.getDisclaimer(),
        this.getCustomerRights(),
        this.getInsuranceLiabilityPolicy()
      ]);

      return {
        success: true,
        statusCode: 200,
        message: 'All policies fetched successfully',
        data: {
          privacyPolicy: privacyPolicy.data,
          termsAndConditions: termsAndConditions.data,
          refundPolicy: refundPolicy.data,
          shippingPolicy: shippingPolicy.data,
          paymentSecurity: paymentSecurity.data,
          cookiePolicy: cookiePolicy.data,
          travelGuidelines: travelGuidelines.data,
          disclaimer: disclaimer.data,
          customerRights: customerRights.data,
          insuranceLiability: insuranceLiability.data,
        },
        errors: []
      };
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
      const [legalContact, support] = await Promise.all([
        this.getLegalContact(),
        this.getSupport()
      ]);

      return {
        success: true,
        statusCode: 200,
        message: 'Contact information fetched successfully',
        data: {
          legalContact: legalContact.data,
          support: support.data,
        },
        errors: []
      };
    } catch (error) {
      throw new Error(`Failed to fetch contact information: ${error}`);
    }
  }
}

// Export singleton instance
export const infoService = new InfoService();