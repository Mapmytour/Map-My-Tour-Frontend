import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { APIResponse } from '@/types/APIResponse';
import { RequestAQuoteForm } from '@/types/request-a-quote';

export interface QuoteResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  createdAt: string;
  updatedAt: string;
  quoteDetails: RequestAQuoteForm;
  estimatedPrice?: number;
  adminNotes?: string;
}

export interface QuoteStatusOption {
  value: string;
  label: string;
}

export interface QuoteTravelType {
  value: string;
  label: string;
  description: string;
}

export interface QuoteHotelCategory {
  value: string;
  label: string;
  priceRange: string;
}

export interface QuoteRoomType {
  value: string;
  label: string;
  capacity: number;
}

class RequestAQuoteService {
  /**
   * Submit a new quote request
   */
  async createQuoteRequest(data: RequestAQuoteForm): Promise<APIResponse<QuoteResponse>> {
    try {
      const response = await apiClient.post<QuoteResponse>(
        API_ENDPOINTS.QUOTE.CREATE,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to submit quote request: ${error}`);
    }
  }

  /**
   * Get a specific quote by ID
   */
  async getQuoteById(id: string): Promise<APIResponse<QuoteResponse>> {
    try {
      const response = await apiClient.get<QuoteResponse>(
        API_ENDPOINTS.QUOTE.GET_BY_ID.replace(':id', id)
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to get quote: ${error}`);
    }
  }

  /**
   * Get all quotes for current user
   */
  async getUserQuotes(): Promise<APIResponse<QuoteResponse[]>> {
    try {
      const response = await apiClient.get<QuoteResponse[]>(
        API_ENDPOINTS.QUOTE.GET_USER_QUOTES
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to get user quotes: ${error}`);
    }
  }

  /**
   * Update a quote request
   */
  async updateQuote(id: string, data: Partial<RequestAQuoteForm>): Promise<APIResponse<QuoteResponse>> {
    try {
      const response = await apiClient.put<QuoteResponse>(
        API_ENDPOINTS.QUOTE.UPDATE.replace(':id', id),
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to update quote: ${error}`);
    }
  }

  /**
   * Delete a quote request
   */
  async deleteQuote(id: string): Promise<APIResponse<{ message: string }>> {
    try {
      const response = await apiClient.delete<{ message: string }>(
        API_ENDPOINTS.QUOTE.DELETE.replace(':id', id)
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to delete quote: ${error}`);
    }
  }

  /**
   * Get status options for quotes
   */
  async getStatusOptions(): Promise<APIResponse<QuoteStatusOption[]>> {
    try {
      const response = await apiClient.get<QuoteStatusOption[]>(
        API_ENDPOINTS.QUOTE.STATUS_OPTIONS
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to get status options: ${error}`);
    }
  }

  /**
   * Get travel type options
   */
  async getTravelTypes(): Promise<APIResponse<QuoteTravelType[]>> {
    try {
      const response = await apiClient.get<QuoteTravelType[]>(
        API_ENDPOINTS.QUOTE.TRAVEL_TYPES
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to get travel types: ${error}`);
    }
  }

  /**
   * Get hotel category options
   */
  async getHotelCategories(): Promise<APIResponse<QuoteHotelCategory[]>> {
    try {
      const response = await apiClient.get<QuoteHotelCategory[]>(
        API_ENDPOINTS.QUOTE.HOTEL_CATEGORIES
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to get hotel categories: ${error}`);
    }
  }

  /**
   * Get room type options
   */
  async getRoomTypes(): Promise<APIResponse<QuoteRoomType[]>> {
    try {
      const response = await apiClient.get<QuoteRoomType[]>(
        API_ENDPOINTS.QUOTE.ROOM_TYPES
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to get room types: ${error}`);
    }
  }
}

// Export singleton instance
export const requestAQuoteService = new RequestAQuoteService();