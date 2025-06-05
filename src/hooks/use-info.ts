'use client';

import { useCallback, useEffect } from 'react';
import { useInfoStore } from '@/store/info-store';
import { infoService } from '@/service/info-service';
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
import { handleApiError } from '@/lib/api';

export const useInfo = () => {
  const {
    // FAQ State
    faqs,
    faqCategories,
    selectedFAQ,
    filteredFAQs,

    // Policies State
    privacyPolicy,
    termsAndConditions,
    refundPolicy,
    shippingPolicy,
    paymentSecurity,
    cookiePolicy,
    travelGuidelines,
    disclaimer,
    customerRights,
    insuranceLiability,

    // Contact & Support State
    legalContact,
    support,

    // Loading States
    isLoading,
    faqsLoading,
    policiesLoading,
    contactLoading,

    // Error States
    error,
    faqsError,
    policiesError,
    contactError,

    // Search & Filter
    searchQuery,
    selectedCategory,

    // Actions
    setFAQs,
    setSelectedFAQ,
    setFAQCategories,
    setPrivacyPolicy,
    setTermsAndConditions,
    setRefundPolicy,
    setShippingPolicy,
    setPaymentSecurity,
    setCookiePolicy,
    setTravelGuidelines,
    setDisclaimer,
    setCustomerRights,
    setInsuranceLiability,
    setLegalContact,
    setSupport,
    setLoading,
    setFAQsLoading,
    setPoliciesLoading,
    setContactLoading,
    setError,
    setFAQsError,
    setPoliciesError,
    setContactError,
    setSearchQuery,
    setSelectedCategory,
    updateFilteredFAQs,
    clearErrors,
    updateCacheTimestamp,
    isCacheValid,
  } = useInfoStore();

  // ========================
  // FAQ Management (Read Only)
  // ========================

  /**
   * Get all FAQs
   */
  const getAllFAQs = useCallback(async (category?: string, forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('faqs') && faqs.length > 0) {
        return { success: true, data: faqs };
      }

      setFAQsLoading(true);
      setFAQsError(null);

      const response = await infoService.getAllFAQs(category);

      if (response.success) {
        setFAQs(response.data);
        updateCacheTimestamp('faqs');
        return { success: true, data: response.data };
      } else {
        setFAQsError(response.message || 'Failed to fetch FAQs');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setFAQsError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setFAQsLoading(false);
    }
  }, [faqs, isCacheValid, setFAQs, setFAQsLoading, setFAQsError, updateCacheTimestamp]);

  /**
   * Get FAQ by ID
   */
  const getFAQById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await infoService.getFAQById(id);

      if (response.success) {
        setSelectedFAQ(response.data);
        return { success: true, data: response.data };
      } else {
        setError(response.message || 'Failed to fetch FAQ');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setSelectedFAQ]);

  /**
   * Search FAQs
   */
  const searchFAQs = useCallback(async (query: string, category?: string) => {
    try {
      setFAQsLoading(true);
      setFAQsError(null);

      const response = await infoService.searchFAQs(query, category);

      if (response.success) {
        setFAQs(response.data);
        return { success: true, data: response.data };
      } else {
        setFAQsError(response.message || 'Failed to search FAQs');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setFAQsError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setFAQsLoading(false);
    }
  }, [setFAQs, setFAQsLoading, setFAQsError]);

  /**
   * Get FAQ categories
   */
  const getFAQCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await infoService.getFAQCategories();

      if (response.success) {
        setFAQCategories(response.data);
        return { success: true, data: response.data };
      } else {
        setError(response.message || 'Failed to fetch FAQ categories');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setFAQCategories, setLoading, setError]);

  // ========================
  // Policy Management (Read Only)
  // ========================

  /**
   * Get Privacy Policy
   */
  const getPrivacyPolicy = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('policies') && privacyPolicy) {
        return { success: true, data: privacyPolicy };
      }

      setPoliciesLoading(true);
      setPoliciesError(null);

      const response = await infoService.getPrivacyPolicy();

      if (response.success) {
        setPrivacyPolicy(response.data);
        updateCacheTimestamp('policies');
        return { success: true, data: response.data };
      } else {
        setPoliciesError(response.message || 'Failed to fetch privacy policy');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setPoliciesError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setPoliciesLoading(false);
    }
  }, [privacyPolicy, isCacheValid, setPrivacyPolicy, setPoliciesLoading, setPoliciesError, updateCacheTimestamp]);

  /**
   * Get Terms and Conditions
   */
  const getTermsAndConditions = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('policies') && termsAndConditions) {
        return { success: true, data: termsAndConditions };
      }

      setPoliciesLoading(true);
      setPoliciesError(null);

      const response = await infoService.getTermsAndConditions();

      if (response.success) {
        setTermsAndConditions(response.data);
        updateCacheTimestamp('policies');
        return { success: true, data: response.data };
      } else {
        setPoliciesError(response.message || 'Failed to fetch terms and conditions');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setPoliciesError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setPoliciesLoading(false);
    }
  }, [termsAndConditions, isCacheValid, setTermsAndConditions, setPoliciesLoading, setPoliciesError, updateCacheTimestamp]);

  /**
   * Get Refund Policy
   */
  const getRefundPolicy = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('policies') && refundPolicy) {
        return { success: true, data: refundPolicy };
      }

      setPoliciesLoading(true);
      setPoliciesError(null);

      const response = await infoService.getRefundPolicy();

      if (response.success) {
        setRefundPolicy(response.data);
        updateCacheTimestamp('policies');
        return { success: true, data: response.data };
      } else {
        setPoliciesError(response.message || 'Failed to fetch refund policy');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setPoliciesError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setPoliciesLoading(false);
    }
  }, [refundPolicy, isCacheValid, setRefundPolicy, setPoliciesLoading, setPoliciesError, updateCacheTimestamp]);

  /**
   * Get Shipping Policy
   */
  const getShippingPolicy = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('policies') && shippingPolicy) {
        return { success: true, data: shippingPolicy };
      }

      setPoliciesLoading(true);
      setPoliciesError(null);

      const response = await infoService.getShippingPolicy();

      if (response.success) {
        setShippingPolicy(response.data);
        updateCacheTimestamp('policies');
        return { success: true, data: response.data };
      } else {
        setPoliciesError(response.message || 'Failed to fetch shipping policy');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setPoliciesError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setPoliciesLoading(false);
    }
  }, [shippingPolicy, isCacheValid, setShippingPolicy, setPoliciesLoading, setPoliciesError, updateCacheTimestamp]);

  /**
   * Get Payment Security Policy
   */
  const getPaymentSecurityPolicy = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('policies') && paymentSecurity) {
        return { success: true, data: paymentSecurity };
      }

      setPoliciesLoading(true);
      setPoliciesError(null);

      const response = await infoService.getPaymentSecurityPolicy();

      if (response.success) {
        setPaymentSecurity(response.data);
        updateCacheTimestamp('policies');
        return { success: true, data: response.data };
      } else {
        setPoliciesError(response.message || 'Failed to fetch payment security policy');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setPoliciesError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setPoliciesLoading(false);
    }
  }, [paymentSecurity, isCacheValid, setPaymentSecurity, setPoliciesLoading, setPoliciesError, updateCacheTimestamp]);

  /**
   * Get Cookie Policy
   */
  const getCookiePolicy = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('policies') && cookiePolicy) {
        return { success: true, data: cookiePolicy };
      }

      setPoliciesLoading(true);
      setPoliciesError(null);

      const response = await infoService.getCookiePolicy();

      if (response.success) {
        setCookiePolicy(response.data);
        updateCacheTimestamp('policies');
        return { success: true, data: response.data };
      } else {
        setPoliciesError(response.message || 'Failed to fetch cookie policy');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setPoliciesError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setPoliciesLoading(false);
    }
  }, [cookiePolicy, isCacheValid, setCookiePolicy, setPoliciesLoading, setPoliciesError, updateCacheTimestamp]);

  /**
   * Get Travel Guidelines
   */
  const getTravelGuidelines = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('policies') && travelGuidelines) {
        return { success: true, data: travelGuidelines };
      }

      setPoliciesLoading(true);
      setPoliciesError(null);

      const response = await infoService.getTravelGuidelines();

      if (response.success) {
        setTravelGuidelines(response.data);
        updateCacheTimestamp('policies');
        return { success: true, data: response.data };
      } else {
        setPoliciesError(response.message || 'Failed to fetch travel guidelines');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setPoliciesError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setPoliciesLoading(false);
    }
  }, [travelGuidelines, isCacheValid, setTravelGuidelines, setPoliciesLoading, setPoliciesError, updateCacheTimestamp]);

  /**
   * Get Disclaimer
   */
  const getDisclaimer = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('policies') && disclaimer) {
        return { success: true, data: disclaimer };
      }

      setPoliciesLoading(true);
      setPoliciesError(null);

      const response = await infoService.getDisclaimer();

      if (response.success) {
        setDisclaimer(response.data);
        updateCacheTimestamp('policies');
        return { success: true, data: response.data };
      } else {
        setPoliciesError(response.message || 'Failed to fetch disclaimer');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setPoliciesError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setPoliciesLoading(false);
    }
  }, [disclaimer, isCacheValid, setDisclaimer, setPoliciesLoading, setPoliciesError, updateCacheTimestamp]);

  /**
   * Get Customer Rights
   */
  const getCustomerRights = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('policies') && customerRights) {
        return { success: true, data: customerRights };
      }

      setPoliciesLoading(true);
      setPoliciesError(null);

      const response = await infoService.getCustomerRights();

      if (response.success) {
        setCustomerRights(response.data);
        updateCacheTimestamp('policies');
        return { success: true, data: response.data };
      } else {
        setPoliciesError(response.message || 'Failed to fetch customer rights');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setPoliciesError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setPoliciesLoading(false);
    }
  }, [customerRights, isCacheValid, setCustomerRights, setPoliciesLoading, setPoliciesError, updateCacheTimestamp]);

  /**
   * Get Insurance Liability Policy
   */
  const getInsuranceLiabilityPolicy = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('policies') && insuranceLiability) {
        return { success: true, data: insuranceLiability };
      }

      setPoliciesLoading(true);
      setPoliciesError(null);

      const response = await infoService.getInsuranceLiabilityPolicy();

      if (response.success) {
        setInsuranceLiability(response.data);
        updateCacheTimestamp('policies');
        return { success: true, data: response.data };
      } else {
        setPoliciesError(response.message || 'Failed to fetch insurance liability policy');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setPoliciesError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setPoliciesLoading(false);
    }
  }, [insuranceLiability, isCacheValid, setInsuranceLiability, setPoliciesLoading, setPoliciesError, updateCacheTimestamp]);

  /**
   * Get all policies at once
   */
  const getAllPolicies = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('policies')) {
        return { success: true, data: 'Policies loaded from cache' };
      }

      setPoliciesLoading(true);
      setPoliciesError(null);

      const response = await infoService.getAllPolicies();

      if (response.success) {
        const { data } = response;
        setPrivacyPolicy(data.privacyPolicy);
        setTermsAndConditions(data.termsAndConditions);
        setRefundPolicy(data.refundPolicy);
        setShippingPolicy(data.shippingPolicy);
        setPaymentSecurity(data.paymentSecurity);
        setCookiePolicy(data.cookiePolicy);
        setTravelGuidelines(data.travelGuidelines);
        setDisclaimer(data.disclaimer);
        setCustomerRights(data.customerRights);
        setInsuranceLiability(data.insuranceLiability);
        updateCacheTimestamp('policies');
        return { success: true, data: data };
      } else {
        setPoliciesError(response.message || 'Failed to fetch policies');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setPoliciesError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setPoliciesLoading(false);
    }
  }, [
    isCacheValid,
    setPrivacyPolicy,
    setTermsAndConditions,
    setRefundPolicy,
    setShippingPolicy,
    setPaymentSecurity,
    setCookiePolicy,
    setTravelGuidelines,
    setDisclaimer,
    setCustomerRights,
    setInsuranceLiability,
    setPoliciesLoading,
    setPoliciesError,
    updateCacheTimestamp
  ]);

  // ========================
  // Contact & Support Management (Read Only)
  // ========================

  /**
   * Get Legal Contact
   */
  const getLegalContact = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('contact') && legalContact) {
        return { success: true, data: legalContact };
      }

      setContactLoading(true);
      setContactError(null);

      const response = await infoService.getLegalContact();

      if (response.success) {
        setLegalContact(response.data);
        updateCacheTimestamp('contact');
        return { success: true, data: response.data };
      } else {
        setContactError(response.message || 'Failed to fetch legal contact');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setContactError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setContactLoading(false);
    }
  }, [legalContact, isCacheValid, setLegalContact, setContactLoading, setContactError, updateCacheTimestamp]);

  /**
   * Get Support Information
   */
  const getSupport = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('contact') && support) {
        return { success: true, data: support };
      }

      setContactLoading(true);
      setContactError(null);

      const response = await infoService.getSupport();

      if (response.success) {
        setSupport(response.data);
        updateCacheTimestamp('contact');
        return { success: true, data: response.data };
      } else {
        setContactError(response.message || 'Failed to fetch support information');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setContactError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setContactLoading(false);
    }
  }, [support, isCacheValid, setSupport, setContactLoading, setContactError, updateCacheTimestamp]);

  /**
   * Get all contact information
   */
  const getAllContactInfo = useCallback(async (forceRefresh?: boolean) => {
    try {
      if (!forceRefresh && isCacheValid('contact')) {
        return { success: true, data: 'Contact info loaded from cache' };
      }

      setContactLoading(true);
      setContactError(null);

      const response = await infoService.getAllContactInfo();

      if (response.success) {
        const { data } = response;
        setLegalContact(data.legalContact);
        setSupport(data.support);
        updateCacheTimestamp('contact');
        return { success: true, data: data };
      } else {
        setContactError(response.message || 'Failed to fetch contact information');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setContactError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setContactLoading(false);
    }
  }, [isCacheValid, setLegalContact, setSupport, setContactLoading, setContactError, updateCacheTimestamp]);

  // ========================
  // Utility Functions
  // ========================

  /**
   * Initialize all info data
   */
  const initializeInfoData = useCallback(async () => {
    try {
      await Promise.all([
        getAllFAQs(),
        getAllPolicies(),
        getAllContactInfo(),
      ]);
    } catch (error) {
      console.error('Failed to initialize info data:', error);
    }
  }, [getAllFAQs, getAllPolicies, getAllContactInfo]);

  /**
   * Get all info data at once (bulk load)
   */
  const getAllInfoData = useCallback(async (forceRefresh?: boolean) => {
    try {
      setLoading(true);
      setError(null);

      const response = await infoService.getAllInfoData();

      if (response.success) {
        const { data } = response;

        // Set all data at once
        setFAQs(data.faqs);
        setPrivacyPolicy(data.privacyPolicy);
        setTermsAndConditions(data.termsAndConditions);
        setRefundPolicy(data.refundPolicy);
        setShippingPolicy(data.shippingPolicy);
        setPaymentSecurity(data.paymentSecurity);
        setCookiePolicy(data.cookiePolicy);
        setTravelGuidelines(data.travelGuidelines);
        setDisclaimer(data.disclaimer);
        setCustomerRights(data.customerRights);
        setInsuranceLiability(data.insuranceLiability);
        setLegalContact(data.legalContact);
        setSupport(data.support);

        // Update all cache timestamps
        updateCacheTimestamp('faqs');
        updateCacheTimestamp('policies');
        updateCacheTimestamp('contact');

        return { success: true, data: data };
      } else {
        setError(response.message || 'Failed to fetch all info data');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [
    setFAQs,
    setPrivacyPolicy,
    setTermsAndConditions,
    setRefundPolicy,
    setShippingPolicy,
    setPaymentSecurity,
    setCookiePolicy,
    setTravelGuidelines,
    setDisclaimer,
    setCustomerRights,
    setInsuranceLiability,
    setLegalContact,
    setSupport,
    setLoading,
    setError,
    updateCacheTimestamp
  ]);

  /**
   * Clear all errors
   */
  const clearAllErrors = useCallback(() => {
    clearErrors();
  }, [clearErrors]);

  /**
   * Filter FAQs locally
   */
  const filterFAQs = useCallback((query: string, category?: string) => {
    setSearchQuery(query);
    if (category !== undefined) {
      setSelectedCategory(category);
    }
    updateFilteredFAQs();
  }, [setSearchQuery, setSelectedCategory, updateFilteredFAQs]);

  // Auto-initialize on mount
  useEffect(() => {
    if (!faqs.length && !privacyPolicy && !legalContact) {
      initializeInfoData();
    }
  }, [faqs.length, privacyPolicy, legalContact, initializeInfoData]);

  return {
    // State
    faqs,
    faqCategories,
    selectedFAQ,
    filteredFAQs,
    privacyPolicy,
    termsAndConditions,
    refundPolicy,
    shippingPolicy,
    paymentSecurity,
    cookiePolicy,
    travelGuidelines,
    disclaimer,
    customerRights,
    insuranceLiability,
    legalContact,
    support,

    // Loading States
    isLoading,
    faqsLoading,
    policiesLoading,
    contactLoading,

    // Error States
    error,
    faqsError,
    policiesError,
    contactError,

    // Search & Filter
    searchQuery,
    selectedCategory,

    // FAQ Actions (Read Only)
    getAllFAQs,
    getFAQById,
    searchFAQs,
    getFAQCategories,
    setSelectedFAQ,

    // Policy Actions (Read Only)
    getPrivacyPolicy,
    getTermsAndConditions,
    getRefundPolicy,
    getShippingPolicy,
    getPaymentSecurityPolicy,
    getCookiePolicy,
    getTravelGuidelines,
    getDisclaimer,
    getCustomerRights,
    getInsuranceLiabilityPolicy,
    getAllPolicies,

    // Contact Actions (Read Only)
    getLegalContact,
    getSupport,
    getAllContactInfo,

    // Utility Actions
    getAllInfoData,
    initializeInfoData,
    clearAllErrors,
    filterFAQs,
  };
};