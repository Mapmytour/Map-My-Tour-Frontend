import { User, UserRole } from '@/types/auth';

// Token utilities
export const tokenUtils = {
  /**
   * Check if a token is expired
   */
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch (error) {
      return true; // Consider invalid tokens as expired
    }
  },

  /**
   * Get token expiration time
   */
  getTokenExpiration(token: string): Date | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return new Date(payload.exp * 1000);
    } catch (error) {
      return null;
    }
  },

  /**
   * Get token payload
   */
  getTokenPayload(token: string): any | null {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      return null;
    }
  },

  /**
   * Check if token will expire soon (within 5 minutes)
   */
  willExpireSoon(token: string, minutesBuffer: number = 5): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      const bufferTime = minutesBuffer * 60;
      return payload.exp - currentTime <= bufferTime;
    } catch (error) {
      return true;
    }
  }
};

// Password utilities
export const passwordUtils = {
  /**
   * Calculate password strength (0-100)
   */
  calculateStrength(password: string): number {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 10;
    
    // Character variety checks
    if (/[a-z]/.test(password)) strength += 15;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    
    return Math.min(strength, 100);
  },

  /**
   * Get password strength label
   */
  getStrengthLabel(strength: number): string {
    if (strength < 30) return 'Very Weak';
    if (strength < 50) return 'Weak';
    if (strength < 70) return 'Fair';
    if (strength < 85) return 'Good';
    return 'Strong';
  },

  /**
   * Get password strength color
   */
  getStrengthColor(strength: number): string {
    if (strength < 30) return 'text-red-500';
    if (strength < 50) return 'text-orange-500';
    if (strength < 70) return 'text-yellow-500';
    if (strength < 85) return 'text-blue-500';
    return 'text-green-500';
  },

  /**
   * Validate password against common requirements
   */
  validatePassword(password: string): {
    isValid: boolean;
    errors: string[];
    suggestions: string[];
  } {
    const errors: string[] = [];
    const suggestions: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
      suggestions.push('Use at least 8 characters');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
      suggestions.push('Add lowercase letters (a-z)');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
      suggestions.push('Add uppercase letters (A-Z)');
    }

    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
      suggestions.push('Add numbers (0-9)');
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      errors.push('Password must contain at least one special character');
      suggestions.push('Add special characters (!@#$%^&*)');
    }

    // Check for common weak patterns
    const commonPatterns = [
      /123456/,
      /password/i,
      /qwerty/i,
      /abc123/i,
    ];

    for (const pattern of commonPatterns) {
      if (pattern.test(password)) {
        errors.push('Password contains common patterns');
        suggestions.push('Avoid common words and sequences');
        break;
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      suggestions,
    };
  }
};

// Email utilities
export const emailUtils = {
  /**
   * Validate email format
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Extract domain from email
   */
  getDomain(email: string): string {
    return email.split('@')[1] || '';
  },

  /**
   * Check if email is from a common provider
   */
  isCommonProvider(email: string): boolean {
    const commonProviders = [
      'gmail.com',
      'yahoo.com',
      'hotmail.com',
      'outlook.com',
      'aol.com',
      'icloud.com',
    ];
    const domain = this.getDomain(email.toLowerCase());
    return commonProviders.includes(domain);
  },

  /**
   * Suggest email corrections for common typos
   */
  suggestCorrection(email: string): string | null {
    const typoMap: Record<string, string> = {
      'gmial.com': 'gmail.com',
      'gmai.com': 'gmail.com',
      'yahooo.com': 'yahoo.com',
      'hotmial.com': 'hotmail.com',
      'outlok.com': 'outlook.com',
    };

    const domain = this.getDomain(email);
    const correction = typoMap[domain.toLowerCase()];
    
    if (correction) {
      const [localPart] = email.split('@');
      return `${localPart}@${correction}`;
    }

    return null;
  }
};

// User utilities
export const userUtils = {
  /**
   * Get user's full name
   */
  getFullName(user: User): string {
    return `${user.firstName} ${user.lastName}`.trim();
  },

  /**
   * Get user's initials
   */
  getInitials(user: User): string {
    const firstName = user.firstName.charAt(0).toUpperCase();
    const lastName = user.lastName.charAt(0).toUpperCase();
    return `${firstName}${lastName}`;
  },

  /**
   * Check if user has specific role
   */
  hasRole(user: User, role: UserRole): boolean {
    return user.role === role;
  },

  /**
   * Check if user is admin
   */
  isAdmin(user: User): boolean {
    return user.role === 'admin';
  },

  /**
   * Check if user profile is complete
   */
  isProfileComplete(user: User): boolean {
    const requiredFields = [
      user.firstName,
      user.lastName,
      user.email,
    ];
    
    return requiredFields.every(field => !!field);
  },

  /**
   * Get missing profile fields
   */
  getMissingProfileFields(user: User): string[] {
    const missing: string[] = [];
    
    if (!user.firstName) missing.push('First Name');
    if (!user.lastName) missing.push('Last Name');
    if (!user.email) missing.push('Email');
    if (!user.phone) missing.push('Phone');
    if (!user.dateOfBirth) missing.push('Date of Birth');
    
    return missing;
  },

  /**
   * Format user's address
   */
  formatAddress(user: User): string | null {
    const address = user.address;
    if (!address) return null;

    const parts = [
      address.street,
      address.city,
      address.state,
      address.country,
      address.postalCode,
    ].filter(Boolean);

    return parts.length > 0 ? parts.join(', ') : null;
  }
};

// Form validation utilities
export const validationUtils = {
  /**
   * Validate required field
   */
  required(value: any, fieldName: string): string | null {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return `${fieldName} is required`;
    }
    return null;
  },

  /**
   * Validate minimum length
   */
  minLength(value: string, min: number, fieldName: string): string | null {
    if (value && value.length < min) {
      return `${fieldName} must be at least ${min} characters`;
    }
    return null;
  },

  /**
   * Validate maximum length
   */
  maxLength(value: string, max: number, fieldName: string): string | null {
    if (value && value.length > max) {
      return `${fieldName} must be no more than ${max} characters`;
    }
    return null;
  },

  /**
   * Validate phone number
   */
  phone(value: string): string | null {
    if (!value) return null;
    
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(value.replace(/\D/g, ''))) {
      return 'Please enter a valid phone number';
    }
    return null;
  },

  /**
   * Validate date of birth
   */
  dateOfBirth(value: string): string | null {
    if (!value) return null;
    
    const date = new Date(value);
    const today = new Date();
    const minAge = 13;
    const maxAge = 120;
    
    if (isNaN(date.getTime())) {
      return 'Please enter a valid date';
    }
    
    const age = today.getFullYear() - date.getFullYear();
    
    if (age < minAge) {
      return `You must be at least ${minAge} years old`;
    }
    
    if (age > maxAge) {
      return 'Please enter a valid date of birth';
    }
    
    return null;
  }
};

// Local storage utilities (fallback to memory if not available)
export const storageUtils = {
  /**
   * Set item in storage
   */
  setItem(key: string, value: any): void {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.warn('Storage not available:', error);
    }
  },

  /**
   * Get item from storage
   */
  getItem(key: string): any {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        const item = window.sessionStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      }
      return null;
    } catch (error) {
      console.warn('Storage not available:', error);
      return null;
    }
  },

  /**
   * Remove item from storage
   */
  removeItem(key: string): void {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.removeItem(key);
      }
    } catch (error) {
      console.warn('Storage not available:', error);
    }
  },

  /**
   * Clear all storage
   */
  clear(): void {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.clear();
      }
    } catch (error) {
      console.warn('Storage not available:', error);
    }
  }
};

// Export all utilities as a single object
export const authUtils = {
  token: tokenUtils,
  password: passwordUtils,
  email: emailUtils,
  user: userUtils,
  validation: validationUtils,
  storage: storageUtils,
};