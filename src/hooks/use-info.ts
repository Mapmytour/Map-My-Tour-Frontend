'use client';

import { useCallback, useEffect } from 'react';
import { useInfoStore } from '@/store/info-store';
import { infoService, FAQRequest, FAQUpdateRequest } from '@/service/info-service';
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
    addFAQ,
    updateFAQ,
    removeFAQ,
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
  // FAQ Management
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
   * Create new FAQ
   */
  const createFAQ = useCallback(async (data: FAQRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await infoService.createFAQ(data);
      
      if (response.success) {
        addFAQ(response.data);
        return { success: true, data: response.data };
      } else {
        setError(response.message || 'Failed to create FAQ');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [addFAQ, setLoading, setError]);

  /**
   * Update FAQ
   */
  const updateFAQItem = useCallback(async (data: FAQUpdateRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await infoService.updateFAQ(data);
      
      if (response.success) {
        updateFAQ(response.data);
        return { success: true, data: response.data };
      } else {
        setError(response.message || 'Failed to update FAQ');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [updateFAQ, setLoading, setError]);

  /**
   * Delete FAQ
   */
  const deleteFAQ = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await infoService.deleteFAQ(id);
      
      if (response.success) {
        removeFAQ(id);
        return { success: true, message: response.message };
      } else {
        setError(response.message || 'Failed to delete FAQ');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [removeFAQ, setLoading, setError]);

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

  // ========================
  // Policy Management
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
   * Update Privacy Policy
   */
  const updatePrivacyPolicy = useCallback(async (data: Partial<PrivacyPolicy>) => {
    try {
      setLoading(true);
      setError(null);

      const response = await infoService.updatePrivacyPolicy(data);
      
      if (response.success) {
        setPrivacyPolicy(response.data);
        return { success: true, data: response.data };
      } else {
        setError(response.message || 'Failed to update privacy policy');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setPrivacyPolicy, setLoading, setError]);

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
   * Update Terms and Conditions
   */
  const updateTermsAndConditions = useCallback(async (data: Partial<TermsAndConditions>) => {
    try {
      setLoading(true);
      setError(null);

      const response = await infoService.updateTermsAndConditions(data);
      
      if (response.success) {
        setTermsAndConditions(response.data);
        return { success: true, data: response.data };
      } else {
        setError(response.message || 'Failed to update terms and conditions');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setTermsAndConditions, setLoading, setError]);

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
  // Contact & Support Management
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
    
    // FAQ Actions
    getAllFAQs,
    getFAQById,
    createFAQ,
    updateFAQItem,
    deleteFAQ,
    searchFAQs,
    setSelectedFAQ,
    
    // Policy Actions
    getPrivacyPolicy,
    updatePrivacyPolicy,
    getTermsAndConditions,
    updateTermsAndConditions,
    getAllPolicies,
    
    // Contact Actions
    getLegalContact,
    getSupport,
    getAllContactInfo,
    
    // Utility Actions
    initializeInfoData,
    clearAllErrors,
    filterFAQs,
  };
};