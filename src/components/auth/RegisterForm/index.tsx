'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { RegisterData } from '@/types/auth';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, CheckCircle, AlertCircle, Send, RotateCcw } from 'lucide-react';

type FormStep = 'register' | 'verify' | 'success';

export default function RegisterForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>('register');
  const [formData, setFormData] = useState<RegisterData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // OTP states
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [canResend, setCanResend] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(60);

  const { register, verifyEmail, resendVerificationEmail, isLoading, error, clearError } = useAuth();
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  // Password strength calculator
  useEffect(() => {
    const password = formData.password;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  }, [formData.password]);

  // Resend countdown timer
  useEffect(() => {
    if (currentStep === 'verify' && resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (resendCountdown === 0) {
      setCanResend(true);
    }
  }, [resendCountdown, currentStep]);

  const validateField = (field: string, value: any) => {
    const errors = { ...validationErrors };

    switch (field) {
      case 'firstName':
        if (!value.trim()) {
          errors.firstName = 'First name is required';
        } else {
          delete errors.firstName;
        }
        break;
      case 'lastName':
        if (!value.trim()) {
          errors.lastName = 'Last name is required';
        } else {
          delete errors.lastName;
        }
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = 'Please enter a valid email address';
        } else {
          delete errors.email;
        }
        break;
      case 'password':
        if (value.length < 8) {
          errors.password = 'Password must be at least 8 characters';
        } else {
          delete errors.password;
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          errors.confirmPassword = 'Passwords do not match';
        } else {
          delete errors.confirmPassword;
        }
        break;
    }

    setValidationErrors(errors);
  };

  const handleSubmit = async () => {
    clearError();

    // Validate all required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword'];
    requiredFields.forEach(field => {
      validateField(field, formData[field as keyof RegisterData]);
    });

    if (Object.keys(validationErrors).length > 0) return;

    if (!formData.agreeToTerms) {
      setValidationErrors(prev => ({ ...prev, terms: 'Please agree to the terms and conditions' }));
      return;
    }

    const result = await register(formData);
    if (result.success) {
      setCurrentStep('verify');
      setResendCountdown(60);
      setCanResend(false);
    }
  };

  const handleInputChange = (field: keyof RegisterData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (typeof value === 'string') {
      validateField(field, value);
    }
    if (error) clearError();
  };

  // OTP handling functions
  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      handleVerifyOtp(newOtp.join(''));
    }

    if (error) clearError();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < Math.min(pastedData.length, 6); i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus the next empty field or the last field
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();

    // Auto-submit if complete
    if (pastedData.length === 6) {
      handleVerifyOtp(pastedData);
    }
  };

  const handleVerifyOtp = async (otpCode?: string) => {
    const code = otpCode || otp.join('');
    if (code.length !== 6) return;

    clearError();
    const result = await verifyEmail(formData.email, code);

    if (result.success) {
      setCurrentStep('success');
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/auth/login?verified=true');
      }, 2000);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    clearError();
    const result = await resendVerificationEmail(formData.email);

    if (result.success) {
      setCanResend(false);
      setResendCountdown(60);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const formatEmail = (email: string) => {
    if (!email) return '';
    const [name, domain] = email.split('@');
    if (!name || !domain) return email;

    const maskedName = name.length > 2
      ? name[0] + '*'.repeat(name.length - 2) + name[name.length - 1]
      : name;
    return `${maskedName}@${domain}`;
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return 'bg-red-500';
    if (passwordStrength <= 50) return 'bg-yellow-500';
    if (passwordStrength <= 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 25) return 'Weak';
    if (passwordStrength <= 50) return 'Fair';
    if (passwordStrength <= 75) return 'Good';
    return 'Strong';
  };

  // Success State
  if (currentStep === 'success') {
    return (
      <div className="inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
              <p className="text-gray-600">
                Your email has been successfully verified. You can now sign in to your account.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <p className="text-green-700 text-sm font-medium">
                  Redirecting to login page...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Email Verification State
  if (currentStep === 'verify') {
    return (
      <div className="inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 space-y-6">

            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent">
                  Verify Your Email
                </h1>
                <p className="text-gray-600 mt-2 text-sm">
                  We've sent a 6-digit verification code to
                </p>
                <p className="text-purple-600 font-semibold text-sm">
                  {formatEmail(formData.email)}
                </p>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-fade-in">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* OTP Input */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Enter verification code
                </label>
                <div className="flex justify-center space-x-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => { inputRefs.current[index] = el; return; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(index, e.target.value)}
                      onKeyDown={e => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-12 h-12 text-center text-lg font-bold bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all duration-200 hover:border-gray-300"
                      autoComplete="off"
                    />
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-2">
                  <Send className="w-4 h-4 text-blue-500 mt-0.5" />
                  <div className="text-xs text-blue-700">
                    <p className="font-medium">Check your email</p>
                    <p className="mt-1">The code will be automatically submitted when you enter all 6 digits.</p>
                  </div>
                </div>
              </div>

              {/* Manual Verify Button */}
              <button
                onClick={() => handleVerifyOtp()}
                disabled={isLoading || otp.join('').length !== 6}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 group ${isLoading || otp.join('').length !== 6
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
                  }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="text-sm">Verifying...</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm">Verify Email</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>

              {/* Resend OTP */}
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Didn't receive the code?</p>
                {canResend ? (
                  <button
                    onClick={handleResendOtp}
                    disabled={isLoading}
                    className="text-purple-600 hover:text-purple-800 font-semibold text-sm transition-colors duration-200 flex items-center space-x-1 mx-auto"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Resend Code</span>
                  </button>
                ) : (
                  <p className="text-gray-500 text-sm">
                    Resend available in <span className="font-semibold">{resendCountdown}s</span>
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-gray-600 text-xs">
                Wrong email?{' '}
                <button
                  type="button"
                  onClick={() => setCurrentStep('register')}
                  className="text-purple-600 hover:text-purple-800 font-semibold transition-colors duration-200"
                >
                  Go back
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Registration Form State
  return (
    <div className="inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 overflow-y-auto">
      {/* Scrollable Content Container */}
      <div className="relative min-h-full flex items-center justify-center p-4">
        <div className="w-full max-w-md py-8">
          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 space-y-6 transition-all duration-500 hover:shadow-3xl">

            {/* Header */}
            <div className="text-center space-y-3">
              <div className="flex justify-center items-center py-2">
                <div className="relative">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-16 sm:w-20 object-contain"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent">
                  Create Account
                </h1>
                <p className="text-gray-600 mt-1 text-sm">Join us and start your amazing journey</p>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 animate-fade-in">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <p className="text-red-700 text-xs font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <div className="space-y-4">

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>First Name</span>
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      onFocus={() => setFocusedField('firstName')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-3 py-3 text-sm bg-gray-50/50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${focusedField === 'firstName'
                        ? 'border-purple-500 bg-white shadow-lg scale-[1.02]'
                        : validationErrors.firstName
                          ? 'border-red-500'
                          : 'border-gray-200 hover:border-gray-300'
                        }`}
                      placeholder="First name"
                    />
                    {validationErrors.firstName && (
                      <div className="flex items-center space-x-1 mt-1">
                        <AlertCircle className="w-3 h-3 text-red-500" />
                        <p className="text-red-500 text-xs">{validationErrors.firstName}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>Last Name</span>
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      onFocus={() => setFocusedField('lastName')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-3 py-3 text-sm bg-gray-50/50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${focusedField === 'lastName'
                        ? 'border-purple-500 bg-white shadow-lg scale-[1.02]'
                        : validationErrors.lastName
                          ? 'border-red-500'
                          : 'border-gray-200 hover:border-gray-300'
                        }`}
                      placeholder="Last name"
                    />
                    {validationErrors.lastName && (
                      <div className="flex items-center space-x-1 mt-1">
                        <AlertCircle className="w-3 h-3 text-red-500" />
                        <p className="text-red-500 text-xs">{validationErrors.lastName}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 flex items-center space-x-1">
                  <Mail className="w-3 h-3" />
                  <span>Email Address</span>
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-3 py-3 text-sm bg-gray-50/50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${focusedField === 'email'
                      ? 'border-purple-500 bg-white shadow-lg scale-[1.02]'
                      : validationErrors.email
                        ? 'border-red-500'
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                    placeholder="Enter your email"
                  />
                  {validationErrors.email && (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-3 h-3 text-red-500" />
                      <p className="text-red-500 text-xs">{validationErrors.email}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 flex items-center space-x-1">
                  <Phone className="w-3 h-3" />
                  <span>Phone Number</span>
                  <span className="text-xs text-gray-400">(Optional)</span>
                </label>
                <div className="relative group">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-3 py-3 text-sm bg-gray-50/50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${focusedField === 'phone'
                      ? 'border-purple-500 bg-white shadow-lg scale-[1.02]'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 flex items-center space-x-1">
                  <Lock className="w-3 h-3" />
                  <span>Password</span>
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-3 py-3 text-sm pr-10 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${focusedField === 'password'
                      ? 'border-purple-500 bg-white shadow-lg scale-[1.02]'
                      : validationErrors.password
                        ? 'border-red-500'
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-0.5"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Password strength:</span>
                      <span className={`text-xs font-semibold ${passwordStrength <= 25 ? 'text-red-500' :
                        passwordStrength <= 50 ? 'text-yellow-500' :
                          passwordStrength <= 75 ? 'text-blue-500' : 'text-green-500'
                        }`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${passwordStrength}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {validationErrors.password && (
                  <div className="flex items-center space-x-1 mt-1">
                    <AlertCircle className="w-3 h-3 text-red-500" />
                    <p className="text-red-500 text-xs">{validationErrors.password}</p>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 flex items-center space-x-1">
                  <Lock className="w-3 h-3" />
                  <span>Confirm Password</span>
                </label>
                <div className="relative group">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-3 py-3 text-sm pr-10 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${focusedField === 'confirmPassword'
                      ? 'border-purple-500 bg-white shadow-lg scale-[1.02]'
                      : validationErrors.confirmPassword
                        ? 'border-red-500'
                        : formData.confirmPassword && formData.confirmPassword === formData.password
                          ? 'border-green-500'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-0.5"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>

                  {/* Password Match Indicator */}
                  {formData.confirmPassword && (
                    <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                      {formData.confirmPassword === formData.password ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>

                {validationErrors.confirmPassword && (
                  <div className="flex items-center space-x-1 mt-1">
                    <AlertCircle className="w-3 h-3 text-red-500" />
                    <p className="text-red-500 text-xs">{validationErrors.confirmPassword}</p>
                  </div>
                )}
              </div>

              {/* Terms Agreement */}
              <div className="space-y-1">
                <label className="flex items-start space-x-2 cursor-pointer group">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border-2 transition-all duration-200 ${formData.agreeToTerms
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 border-purple-500'
                      : validationErrors.terms
                        ? 'border-red-500'
                        : 'border-gray-300 group-hover:border-gray-400'
                      }`}>
                      {formData.agreeToTerms && (
                        <svg className="w-2.5 h-2.5 text-white absolute top-0 left-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-600 group-hover:text-gray-800 transition-colors duration-200 leading-relaxed">
                    I agree to the{' '}
                    <button type="button" className="text-purple-600 hover:text-purple-800 font-semibold">
                      Terms of Service
                    </button>
                    {' '}and{' '}
                    <button type="button" className="text-purple-600 hover:text-purple-800 font-semibold">
                      Privacy Policy
                    </button>
                  </span>
                </label>
                {validationErrors.terms && (
                  <div className="flex items-center space-x-1 ml-6">
                    <AlertCircle className="w-3 h-3 text-red-500" />
                    <p className="text-red-500 text-xs">{validationErrors.terms}</p>
                  </div>
                )}
              </div>

              {/* Email Verification Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <div className="flex items-start space-x-2">
                  <Mail className="w-4 h-4 text-blue-500 mt-0.5" />
                  <div className="text-xs text-blue-700">
                    <p className="font-medium">Email Verification Required</p>
                    <p className="mt-1">After registration, you'll need to verify your email address before you can sign in.</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 group ${isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
                  }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="text-sm">Creating account...</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm">Create Account</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-gray-600 text-xs">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => router.push('/auth/login')}
                  className="text-purple-600 hover:text-purple-800 font-semibold transition-colors duration-200"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}