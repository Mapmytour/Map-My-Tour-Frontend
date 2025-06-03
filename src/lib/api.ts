import { APIResponse } from '@/types/APIResponse';
import { useAuthStore } from '@/store/auth-store';
import { toast } from 'sonner';
import API_ENDPOINTS from './api-endpoints';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';
const API_VERSION = 'v1';

// Request interceptor to add auth token
class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = `${API_BASE_URL}/${API_VERSION}`;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  private getAuthToken(): string | null {
    return useAuthStore.getState().accessToken;
  }

  private async refreshAccessToken(): Promise<boolean> {
    try {
      const { refreshToken } = useAuthStore.getState();
      if (!refreshToken) {
        return false;
      }

      const response = await fetch(`${this.baseURL}${API_ENDPOINTS.AUTH.REFRESH}`, {
        method: 'POST',
        headers: this.defaultHeaders,
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        useAuthStore.getState().updateTokens(data.accessToken, data.refreshToken);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getAuthToken();

    const headers = {
      ...this.defaultHeaders,
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    try {
      let response = await fetch(url, {
        ...options,
        headers,
      });

      // If unauthorized and we have a refresh token, try to refresh
      if (response.status === 401 && token) {
        const refreshed = await this.refreshAccessToken();
        if (refreshed) {
          const newToken = this.getAuthToken();
          response = await fetch(url, {
            ...options,
            headers: {
              ...headers,
              Authorization: `Bearer ${newToken}`,
            },
          });
        } else {
          // Refresh failed, clear auth state
          useAuthStore.getState().clearAuth();
          throw new Error('Authentication failed');
        }
      }

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // HTTP Methods
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<APIResponse<T>> {
    const url = params
      ? `${endpoint}?${new URLSearchParams(params).toString()}`
      : endpoint;

    return this.makeRequest<T>(url, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<APIResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<APIResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<APIResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<APIResponse<T>> {
    return this.makeRequest<T>(endpoint, { method: 'DELETE' });
  }

  // File upload method
  async upload<T>(endpoint: string, file: File, data?: Record<string, any>): Promise<APIResponse<T>> {
    const token = this.getAuthToken();
    const formData = new FormData();
    formData.append('file', file);

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Upload failed');
    }

    return result;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Utility function to handle API errors
export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};