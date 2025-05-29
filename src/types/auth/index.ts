import { APIResponse } from "../APIResponse";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  address?: Address;
  preferences?: UserPreferences;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'user' | 'admin';

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export interface UserPreferences {
  notifications: NotificationPreferences;
  privacy: PrivacyPreferences;
  interests: string[];
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
}

export interface PrivacyPreferences {
  profileVisible: boolean;
  showBookingHistory: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  agreeToTerms: boolean;
}

export interface ForgotPasswordDataStep1 {
  email: string;
}

export interface ForgotPasswordDataStep2 {
  email: string;
  otp: string;
}

export interface ForgotPasswordDataStep3 {
  new_password: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  isAuthenticated: boolean;
  email: string;
  accessToken: string;
  user: User;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

// Session management types
export interface Session {
  id: string;
  deviceName: string;
  deviceType: 'mobile' | 'desktop' | 'tablet';
  browser: string;
  location: string;
  ipAddress: string;
  isCurrentSession: boolean;
  lastActive: string;
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}