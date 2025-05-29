'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { authService, UpdateProfileRequest, ChangePasswordRequest } from '@/service/auth-service';
import {
  LoginCredentials,
  RegisterData,
  ForgotPasswordDataStep1,
  ForgotPasswordDataStep2,
  ForgotPasswordDataStep3,
  ResetPasswordData,
  User,
} from '@/types/auth';
import { handleApiError } from '@/lib/api';

export const useAuth = () => {
  const router = useRouter();
  const {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    isLoading,
    error,
    setAuth,
    setUser,
    setLoading,
    setError,
    clearAuth,
    updateUser,
  } = useAuthStore();

  // Initialize auth state on mount
  useEffect(() => {
    if (accessToken && !user) {
      getCurrentUser();
    }
  }, [accessToken, user]);

  /**
   * Login user
   */
  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.login(credentials);
      
      if (response.success) {
        setAuth(response.data);
        return { success: true, data: response.data };
      } else {
        setError(response.message || 'Login failed');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setAuth, setError, setLoading]);

  /**
   * Register new user
   */
  const register = useCallback(async (userData: RegisterData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.register(userData);
      
      if (response.success) {
        return { success: true, data: response.data };
      } else {
        setError(response.message || 'Registration failed');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setError, setLoading]);

  /**
   * Logout user
   */
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      
      // Call logout API to invalidate server-side session
      await authService.logout();
    } catch (error) {
      console.error('Logout API failed:', error);
      // Continue with local logout even if API fails
    } finally {
      clearAuth();
      setLoading(false);
      router.push('/');
    }
  }, [clearAuth, setLoading, router]);

  /**
   * Forgot Password Step 1 - Send OTP
   */
  const forgotPasswordStep1 = useCallback(async (data: ForgotPasswordDataStep1) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.forgotPasswordStep1(data);
      
      if (response.success) {
        return { success: true, message: response.message };
      } else {
        setError(response.message || 'Failed to send OTP');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setError, setLoading]);

  /**
   * Forgot Password Step 2 - Verify OTP
   */
  const forgotPasswordStep2 = useCallback(async (data: ForgotPasswordDataStep2) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.forgotPasswordStep2(data);
      
      if (response.success) {
        return { success: true, data: response.data };
      } else {
        setError(response.message || 'OTP verification failed');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setError, setLoading]);

  /**
   * Forgot Password Step 3 - Reset Password
   */
  const forgotPasswordStep3 = useCallback(async (data: ForgotPasswordDataStep3 & { token: string }) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.forgotPasswordStep3(data);
      
      if (response.success) {
        return { success: true, message: response.message };
      } else {
        setError(response.message || 'Password reset failed');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setError, setLoading]);

  /**
   * Reset Password (with token from email)
   */
  const resetPassword = useCallback(async (data: ResetPasswordData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.resetPassword(data);
      
      if (response.success) {
        return { success: true, message: response.message };
      } else {
        setError(response.message || 'Password reset failed');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setError, setLoading]);

  /**
   * Get current user profile
   */
  const getCurrentUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.getCurrentUser();
      
      if (response.success) {
        setUser(response.data);
        return { success: true, data: response.data };
      } else {
        setError(response.message || 'Failed to get user profile');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      // If getting user fails, probably token is invalid
      if (errorMessage.includes('Authentication failed')) {
        clearAuth();
      }
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setUser, setError, setLoading, clearAuth]);

  /**
   * Update user profile
   */
  const updateProfile = useCallback(async (data: UpdateProfileRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.updateProfile(data);
      
      if (response.success) {
        updateUser(response.data);
        return { success: true, data: response.data };
      } else {
        setError(response.message || 'Profile update failed');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [updateUser, setError, setLoading]);

  /**
   * Change password
   */
  const changePassword = useCallback(async (data: ChangePasswordRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.changePassword(data);
      
      if (response.success) {
        return { success: true, message: response.message };
      } else {
        setError(response.message || 'Password change failed');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setError, setLoading]);

  /**
   * Upload avatar
   */
  const uploadAvatar = useCallback(async (file: File) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.uploadAvatar(file);
      
      if (response.success) {
        updateUser(response.data.user);
        return { success: true, data: response.data };
      } else {
        setError(response.message || 'Avatar upload failed');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [updateUser, setError, setLoading]);

  /**
   * Verify email
   */
  const verifyEmail = useCallback(async (email: string, otp: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.verifyEmail({ email, otp });
      
      if (response.success) {
        // Refresh user data to get updated verification status
        await getCurrentUser();
        return { success: true, message: response.message };
      } else {
        setError(response.message || 'Email verification failed');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [getCurrentUser, setError, setLoading]);

  /**
   * Resend verification email
   */
  const resendVerificationEmail = useCallback(async (email: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.resendVerificationEmail(email);
      
      if (response.success) {
        return { success: true, message: response.message };
      } else {
        setError(response.message || 'Failed to resend verification email');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setError, setLoading]);

  /**
   * Delete account
   */
  const deleteAccount = useCallback(async (password: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.deleteAccount(password);
      
      if (response.success) {
        clearAuth();
        router.push('/');
        return { success: true, message: response.message };
      } else {
        setError(response.message || 'Account deletion failed');
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [clearAuth, setError, setLoading, router]);

  /**
   * Check if email exists
   */
  const checkEmailExists = useCallback(async (email: string) => {
    try {
      const response = await authService.checkEmailExists(email);
      return response.success ? response.data.exists : false;
    } catch (error) {
      console.error('Email check failed:', error);
      return false;
    }
  }, []);

  /**
   * Check if user is authenticated
   */
  const checkAuth = useCallback(() => {
    return !!(accessToken && user && isAuthenticated);
  }, [accessToken, user, isAuthenticated]);

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  return {
    // State
    user,
    accessToken,
    refreshToken,
    isAuthenticated: checkAuth(),
    isLoading,
    error,

    // Actions
    login,
    register,
    logout,
    forgotPasswordStep1,
    forgotPasswordStep2,
    forgotPasswordStep3,
    resetPassword,
    getCurrentUser,
    updateProfile,
    changePassword,
    uploadAvatar,
    verifyEmail,
    resendVerificationEmail,
    deleteAccount,
    checkEmailExists,
    checkAuth,
    clearError,
  };
};