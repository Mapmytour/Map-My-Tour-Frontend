'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { requestAQuoteService } from '@/service/request-a-quote-service';
import { RequestAQuoteForm } from '@/types/request-a-quote';
import { APIResponse } from '@/types/APIResponse';
import { useAuth } from '@/hooks/use-auth';

export const useRequestAQuote = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /**
   * Submit a new quote request
   */
  const submitQuoteRequest = useCallback(
    async (formData: RequestAQuoteForm) => {
      try {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        if (!isAuthenticated) {
          router.push('/login?redirect=/request-quote');
          return { success: false, error: 'Authentication required' };
        }

        const response = await requestAQuoteService.createQuoteRequest(formData);

        if (response.success) {
          setSuccess(true);
          return { success: true, data: response.data };
        } else {
          setError(response.message || 'Failed to submit quote request');
          return { success: false, error: response.message };
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setIsLoading(false);
      }
    },
    [isAuthenticated, router]
  );

  /**
   * Get user's quote history
   */
  const getUserQuotes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!isAuthenticated) {
        router.push('/login');
        return { success: false, error: 'Authentication required' };
      }

      const response = await requestAQuoteService.getUserQuotes();

      if (response.success) {
        return { success: true, data: response.data };
      } else {
        setError(response.message || 'Failed to get quotes');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, router]);

  /**
   * Get quote by ID
   */
  const getQuoteById = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await requestAQuoteService.getQuoteById(id);

      if (response.success) {
        return { success: true, data: response.data };
      } else {
        setError(response.message || 'Failed to get quote');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Get all status options
   */
  const getStatusOptions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await requestAQuoteService.getStatusOptions();

      if (response.success) {
        return { success: true, data: response.data };
      } else {
        setError(response.message || 'Failed to get status options');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Get all travel types
   */
  const getTravelTypes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await requestAQuoteService.getTravelTypes();

      if (response.success) {
        return { success: true, data: response.data };
      } else {
        setError(response.message || 'Failed to get travel types');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Get all hotel categories
   */
  const getHotelCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await requestAQuoteService.getHotelCategories();

      if (response.success) {
        return { success: true, data: response.data };
      } else {
        setError(response.message || 'Failed to get hotel categories');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Get all room types
   */
  const getRoomTypes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await requestAQuoteService.getRoomTypes();

      if (response.success) {
        return { success: true, data: response.data };
      } else {
        setError(response.message || 'Failed to get room types');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Clear success state
   */
  const clearSuccess = useCallback(() => {
    setSuccess(false);
  }, []);

  return {
    isLoading,
    error,
    success,
    submitQuoteRequest,
    getUserQuotes,
    getQuoteById,
    getStatusOptions,
    getTravelTypes,
    getHotelCategories,
    getRoomTypes,
    clearError,
    clearSuccess,
  };
};