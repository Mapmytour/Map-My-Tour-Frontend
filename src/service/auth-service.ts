import { apiClient, API_ENDPOINTS } from '@/lib/api';
import {
  LoginCredentials,
  RegisterData,
  ForgotPasswordDataStep1,
  ForgotPasswordDataStep2,
  ForgotPasswordDataStep3,
  ResetPasswordData,
  AuthResponse,
  User,
} from '@/types/auth';
import { APIResponse } from '@/types/APIResponse';

// Additional types for auth service
export interface VerifyEmailRequest {
  email: string;
  otp: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  preferences?: {
    notifications?: {
      email?: boolean;
      sms?: boolean;
      push?: boolean;
    };
    privacy?: {
      profileVisible?: boolean;
      showBookingHistory?: boolean;
    };
    interests?: string[];
  };
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

class AuthService {
  /**
   * User Login
   */
  async login(credentials: LoginCredentials): Promise<APIResponse<AuthResponse>> {
    try {
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );
      return response;
    } catch (error) {
      throw new Error(`Login failed: ${error}`);
    }
  }

  /**
   * User Registration
   */
  async register(userData: RegisterData): Promise<APIResponse<{ user: User; message: string }>> {
    try {
      const response = await apiClient.post<{ user: User; message: string }>(
        API_ENDPOINTS.AUTH.REGISTER,
        userData
      );
      return response;
    } catch (error) {
      throw new Error(`Registration failed: ${error}`);
    }
  }

  /**
   * User Logout
   */
  async logout(): Promise<APIResponse<{ message: string }>> {
    try {
      const response = await apiClient.post<{ message: string }>(
        API_ENDPOINTS.AUTH.LOGOUT
      );
      return response;
    } catch (error) {
      throw new Error(`Logout failed: ${error}`);
    }
  }

  /**
   * Forgot Password Step 1 - Send OTP to email
   */
  async forgotPasswordStep1(data: ForgotPasswordDataStep1): Promise<APIResponse<{ message: string }>> {
    try {
      const response = await apiClient.post<{ message: string }>(
        API_ENDPOINTS.AUTH.FORGOT_PASSWORD_STEP1,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to send OTP: ${error}`);
    }
  }

  /**
   * Forgot Password Step 2 - Verify OTP
   */
  async forgotPasswordStep2(data: ForgotPasswordDataStep2): Promise<APIResponse<{ token: string; message: string }>> {
    try {
      const response = await apiClient.post<{ token: string; message: string }>(
        API_ENDPOINTS.AUTH.FORGOT_PASSWORD_STEP2,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`OTP verification failed: ${error}`);
    }
  }

  /**
   * Forgot Password Step 3 - Reset Password with token
   */
  async forgotPasswordStep3(data: ForgotPasswordDataStep3 & { token: string }): Promise<APIResponse<{ message: string }>> {
    try {
      const response = await apiClient.post<{ message: string }>(
        API_ENDPOINTS.AUTH.FORGOT_PASSWORD_STEP3,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Password reset failed: ${error}`);
    }
  }

  /**
   * Reset Password (with reset token from email)
   */
  async resetPassword(data: ResetPasswordData): Promise<APIResponse<{ message: string }>> {
    try {
      const response = await apiClient.post<{ message: string }>(
        API_ENDPOINTS.AUTH.RESET_PASSWORD,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Password reset failed: ${error}`);
    }
  }

  /**
   * Verify Email
   */
  async verifyEmail(data: VerifyEmailRequest): Promise<APIResponse<{ message: string }>> {
    try {
      const response = await apiClient.post<{ message: string }>(
        API_ENDPOINTS.AUTH.VERIFY_EMAIL,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Email verification failed: ${error}`);
    }
  }

  /**
   * Get Current User Profile
   */
  async getCurrentUser(): Promise<APIResponse<User>> {
    try {
      const response = await apiClient.get<User>(API_ENDPOINTS.AUTH.PROFILE);
      return response;
    } catch (error) {
      throw new Error(`Failed to get user profile: ${error}`);
    }
  }

  /**
   * Update User Profile
   */
  async updateProfile(data: UpdateProfileRequest): Promise<APIResponse<User>> {
    try {
      const response = await apiClient.put<User>(
        API_ENDPOINTS.USER.UPDATE_PROFILE,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Profile update failed: ${error}`);
    }
  }

  /**
   * Change Password (for authenticated users)
   */
  async changePassword(data: ChangePasswordRequest): Promise<APIResponse<{ message: string }>> {
    try {
      const response = await apiClient.post<{ message: string }>(
        '/auth/change-password',
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Password change failed: ${error}`);
    }
  }

  /**
   * Upload Avatar
   */
  async uploadAvatar(file: File): Promise<APIResponse<{ avatarUrl: string; user: User }>> {
    try {
      const response = await apiClient.upload<{ avatarUrl: string; user: User }>(
        API_ENDPOINTS.USER.UPLOAD_AVATAR,
        file
      );
      return response;
    } catch (error) {
      throw new Error(`Avatar upload failed: ${error}`);
    }
  }

  /**
   * Delete User Account
   */
  async deleteAccount(password: string): Promise<APIResponse<{ message: string }>> {
    try {
      const response = await apiClient.delete<{ message: string }>(
        `${API_ENDPOINTS.USER.DELETE_ACCOUNT}?password=${encodeURIComponent(password)}`
      );
      return response;
    } catch (error) {
      throw new Error(`Account deletion failed: ${error}`);
    }
  }

  /**
   * Refresh Access Token
   */
  async refreshToken(refreshToken: string): Promise<APIResponse<{ accessToken: string; refreshToken: string }>> {
    try {
      const response = await apiClient.post<{ accessToken: string; refreshToken: string }>(
        API_ENDPOINTS.AUTH.REFRESH,
        { refreshToken }
      );
      return response;
    } catch (error) {
      throw new Error(`Token refresh failed: ${error}`);
    }
  }

  /**
   * Resend Verification Email
   */
  async resendVerificationEmail(email: string): Promise<APIResponse<{ message: string }>> {
    try {
      const response = await apiClient.post<{ message: string }>(
        '/auth/resend-verification',
        { email }
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to resend verification email: ${error}`);
    }
  }

  /**
   * Check if email exists (for registration validation)
   */
  async checkEmailExists(email: string): Promise<APIResponse<{ exists: boolean }>> {
    try {
      const response = await apiClient.get<{ exists: boolean }>(
        '/auth/check-email',
        { email }
      );
      return response;
    } catch (error) {
      throw new Error(`Email check failed: ${error}`);
    }
  }
}

// Export singleton instance
export const authService = new AuthService();