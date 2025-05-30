import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
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

interface InfoState {
  // FAQ State
  faqs: FAQItem[];
  faqCategories: string[];
  selectedFAQ: FAQItem | null;
  
  // Policies State
  privacyPolicy: PrivacyPolicy | null;
  termsAndConditions: TermsAndConditions | null;
  refundPolicy: RefundCancellationPolicy | null;
  shippingPolicy: ShippingDeliveryPolicy | null;
  paymentSecurity: PaymentSecurityPolicy | null;
  cookiePolicy: CookiePolicy | null;
  travelGuidelines: TravelGuidelines | null;
  disclaimer: Disclaimer | null;
  customerRights: CustomerRights | null;
  insuranceLiability: InsuranceLiabilityPolicy | null;
  
  // Contact & Support State
  legalContact: LegalContact | null;
  support: Support | null;
  
  // Loading States
  isLoading: boolean;
  faqsLoading: boolean;
  policiesLoading: boolean;
  contactLoading: boolean;
  
  // Error States
  error: string | null;
  faqsError: string | null;
  policiesError: string | null;
  contactError: string | null;
  
  // Search & Filter
  searchQuery: string;
  selectedCategory: string | null;
  filteredFAQs: FAQItem[];
  
  // Cache timestamps
  lastFaqsUpdate: number | null;
  lastPoliciesUpdate: number | null;
  lastContactUpdate: number | null;
  
  // Actions
  // FAQ Actions
  setFAQs: (faqs: FAQItem[]) => void;
  addFAQ: (faq: FAQItem) => void;
  updateFAQ: (faq: FAQItem) => void;
  removeFAQ: (id: string) => void;
  setSelectedFAQ: (faq: FAQItem | null) => void;
  setFAQCategories: (categories: string[]) => void;
  
  // Policy Actions
  setPrivacyPolicy: (policy: PrivacyPolicy) => void;
  setTermsAndConditions: (terms: TermsAndConditions) => void;
  setRefundPolicy: (policy: RefundCancellationPolicy) => void;
  setShippingPolicy: (policy: ShippingDeliveryPolicy) => void;
  setPaymentSecurity: (policy: PaymentSecurityPolicy) => void;
  setCookiePolicy: (policy: CookiePolicy) => void;
  setTravelGuidelines: (guidelines: TravelGuidelines) => void;
  setDisclaimer: (disclaimer: Disclaimer) => void;
  setCustomerRights: (rights: CustomerRights) => void;
  setInsuranceLiability: (policy: InsuranceLiabilityPolicy) => void;
  
  // Contact Actions
  setLegalContact: (contact: LegalContact) => void;
  setSupport: (support: Support) => void;
  
  // Loading Actions
  setLoading: (loading: boolean) => void;
  setFAQsLoading: (loading: boolean) => void;
  setPoliciesLoading: (loading: boolean) => void;
  setContactLoading: (loading: boolean) => void;
  
  // Error Actions
  setError: (error: string | null) => void;
  setFAQsError: (error: string | null) => void;
  setPoliciesError: (error: string | null) => void;
  setContactError: (error: string | null) => void;
  
  // Search & Filter Actions
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  updateFilteredFAQs: () => void;
  
  // Utility Actions
  clearAllData: () => void;
  clearErrors: () => void;
  updateCacheTimestamp: (type: 'faqs' | 'policies' | 'contact') => void;
  isCacheValid: (type: 'faqs' | 'policies' | 'contact', maxAge?: number) => boolean;
}

export const useInfoStore = create<InfoState>()(
  persist(
    (set, get) => ({
      // Initial State
      // FAQ State
      faqs: [],
      faqCategories: [],
      selectedFAQ: null,
      
      // Policies State
      privacyPolicy: null,
      termsAndConditions: null,
      refundPolicy: null,
      shippingPolicy: null,
      paymentSecurity: null,
      cookiePolicy: null,
      travelGuidelines: null,
      disclaimer: null,
      customerRights: null,
      insuranceLiability: null,
      
      // Contact & Support State
      legalContact: null,
      support: null,
      
      // Loading States
      isLoading: false,
      faqsLoading: false,
      policiesLoading: false,
      contactLoading: false,
      
      // Error States
      error: null,
      faqsError: null,
      policiesError: null,
      contactError: null,
      
      // Search & Filter
      searchQuery: '',
      selectedCategory: null,
      filteredFAQs: [],
      
      // Cache timestamps
      lastFaqsUpdate: null,
      lastPoliciesUpdate: null,
      lastContactUpdate: null,

      // Actions
      // FAQ Actions
      setFAQs: (faqs: FAQItem[]) => {
        set({ faqs, faqsError: null });
        get().updateFilteredFAQs();
        
        // Extract unique categories
        const categories = Array.from(new Set(
          faqs.map(faq => faq.category).filter(Boolean)
        )) as string[];
        set({ faqCategories: categories });
      },

      addFAQ: (faq: FAQItem) => {
        const currentFAQs = get().faqs;
        set({ faqs: [...currentFAQs, faq] });
        get().updateFilteredFAQs();
        
        // Update categories if new category
        if (faq.category && !get().faqCategories.includes(faq.category)) {
          set({ faqCategories: [...get().faqCategories, faq.category] });
        }
      },

      updateFAQ: (updatedFAQ: FAQItem) => {
        const currentFAQs = get().faqs;
        const updatedFAQs = currentFAQs.map(faq => 
          faq.id === updatedFAQ.id ? updatedFAQ : faq
        );
        set({ faqs: updatedFAQs });
        get().updateFilteredFAQs();
        
        // Update selected FAQ if it's the one being updated
        if (get().selectedFAQ?.id === updatedFAQ.id) {
          set({ selectedFAQ: updatedFAQ });
        }
      },

      removeFAQ: (id: string) => {
        const currentFAQs = get().faqs;
        const updatedFAQs = currentFAQs.filter(faq => faq.id !== id);
        set({ faqs: updatedFAQs });
        get().updateFilteredFAQs();
        
        // Clear selected FAQ if it's the one being removed
        if (get().selectedFAQ?.id === id) {
          set({ selectedFAQ: null });
        }
      },

      setSelectedFAQ: (faq: FAQItem | null) => {
        set({ selectedFAQ: faq });
      },

      setFAQCategories: (categories: string[]) => {
        set({ faqCategories: categories });
      },

      // Policy Actions
      setPrivacyPolicy: (policy: PrivacyPolicy) => {
        set({ privacyPolicy: policy, policiesError: null });
      },

      setTermsAndConditions: (terms: TermsAndConditions) => {
        set({ termsAndConditions: terms, policiesError: null });
      },

      setRefundPolicy: (policy: RefundCancellationPolicy) => {
        set({ refundPolicy: policy, policiesError: null });
      },

      setShippingPolicy: (policy: ShippingDeliveryPolicy) => {
        set({ shippingPolicy: policy, policiesError: null });
      },

      setPaymentSecurity: (policy: PaymentSecurityPolicy) => {
        set({ paymentSecurity: policy, policiesError: null });
      },

      setCookiePolicy: (policy: CookiePolicy) => {
        set({ cookiePolicy: policy, policiesError: null });
      },

      setTravelGuidelines: (guidelines: TravelGuidelines) => {
        set({ travelGuidelines: guidelines, policiesError: null });
      },

      setDisclaimer: (disclaimer: Disclaimer) => {
        set({ disclaimer, policiesError: null });
      },

      setCustomerRights: (rights: CustomerRights) => {
        set({ customerRights: rights, policiesError: null });
      },

      setInsuranceLiability: (policy: InsuranceLiabilityPolicy) => {
        set({ insuranceLiability: policy, policiesError: null });
      },

      // Contact Actions
      setLegalContact: (contact: LegalContact) => {
        set({ legalContact: contact, contactError: null });
      },

      setSupport: (support: Support) => {
        set({ support, contactError: null });
      },

      // Loading Actions
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setFAQsLoading: (loading: boolean) => {
        set({ faqsLoading: loading });
        if (!loading) set({ faqsError: null });
      },

      setPoliciesLoading: (loading: boolean) => {
        set({ policiesLoading: loading });
        if (!loading) set({ policiesError: null });
      },

      setContactLoading: (loading: boolean) => {
        set({ contactLoading: loading });
        if (!loading) set({ contactError: null });
      },

      // Error Actions
      setError: (error: string | null) => {
        set({ error, isLoading: false });
      },

      setFAQsError: (error: string | null) => {
        set({ faqsError: error, faqsLoading: false });
      },

      setPoliciesError: (error: string | null) => {
        set({ policiesError: error, policiesLoading: false });
      },

      setContactError: (error: string | null) => {
        set({ contactError: error, contactLoading: false });
      },

      // Search & Filter Actions
      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
        get().updateFilteredFAQs();
      },

      setSelectedCategory: (category: string | null) => {
        set({ selectedCategory: category });
        get().updateFilteredFAQs();
      },

      updateFilteredFAQs: () => {
        const { faqs, searchQuery, selectedCategory } = get();
        
        let filtered = faqs;
        
        // Filter by category
        if (selectedCategory) {
          filtered = filtered.filter(faq => faq.category === selectedCategory);
        }
        
        // Filter by search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(faq => 
            faq.question.toLowerCase().includes(query) ||
            faq.answer.toLowerCase().includes(query) ||
            faq.category?.toLowerCase().includes(query)
          );
        }
        
        set({ filteredFAQs: filtered });
      },

      // Utility Actions
      clearAllData: () => {
        set({
          faqs: [],
          faqCategories: [],
          selectedFAQ: null,
          privacyPolicy: null,
          termsAndConditions: null,
          refundPolicy: null,
          shippingPolicy: null,
          paymentSecurity: null,
          cookiePolicy: null,
          travelGuidelines: null,
          disclaimer: null,
          customerRights: null,
          insuranceLiability: null,
          legalContact: null,
          support: null,
          searchQuery: '',
          selectedCategory: null,
          filteredFAQs: [],
          lastFaqsUpdate: null,
          lastPoliciesUpdate: null,
          lastContactUpdate: null,
        });
      },

      clearErrors: () => {
        set({
          error: null,
          faqsError: null,
          policiesError: null,
          contactError: null,
        });
      },

      updateCacheTimestamp: (type: 'faqs' | 'policies' | 'contact') => {
        const timestamp = Date.now();
        if (type === 'faqs') {
          set({ lastFaqsUpdate: timestamp });
        } else if (type === 'policies') {
          set({ lastPoliciesUpdate: timestamp });
        } else if (type === 'contact') {
          set({ lastContactUpdate: timestamp });
        }
      },

      isCacheValid: (type: 'faqs' | 'policies' | 'contact', maxAge: number = 5 * 60 * 1000) => {
        const state = get();
        let lastUpdate: number | null = null;
        
        if (type === 'faqs') {
          lastUpdate = state.lastFaqsUpdate;
        } else if (type === 'policies') {
          lastUpdate = state.lastPoliciesUpdate;
        } else if (type === 'contact') {
          lastUpdate = state.lastContactUpdate;
        }
        
        if (!lastUpdate) return false;
        
        return Date.now() - lastUpdate < maxAge;
      },
    }),
    {
      name: 'info-storage',
      storage: createJSONStorage(() => ({
        getItem: (name: string) => {
          if (typeof window !== 'undefined') {
            return window.sessionStorage.getItem(name);
          }
          return null;
        },
        setItem: (name: string, value: string) => {
          if (typeof window !== 'undefined') {
            window.sessionStorage.setItem(name, value);
          }
        },
        removeItem: (name: string) => {
          if (typeof window !== 'undefined') {
            window.sessionStorage.removeItem(name);
          }
        },
      })),
      partialize: (state) => ({
        faqs: state.faqs,
        faqCategories: state.faqCategories,
        privacyPolicy: state.privacyPolicy,
        termsAndConditions: state.termsAndConditions,
        refundPolicy: state.refundPolicy,
        shippingPolicy: state.shippingPolicy,
        paymentSecurity: state.paymentSecurity,
        cookiePolicy: state.cookiePolicy,
        travelGuidelines: state.travelGuidelines,
        disclaimer: state.disclaimer,
        customerRights: state.customerRights,
        insuranceLiability: state.insuranceLiability,
        legalContact: state.legalContact,
        support: state.support,
        lastFaqsUpdate: state.lastFaqsUpdate,
        lastPoliciesUpdate: state.lastPoliciesUpdate,
        lastContactUpdate: state.lastContactUpdate,
      }),
    }
  )
);