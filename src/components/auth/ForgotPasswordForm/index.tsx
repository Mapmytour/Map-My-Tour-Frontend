'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { ForgotPasswordDataStep1, ForgotPasswordDataStep2, ForgotPasswordDataStep3 } from '@/types/auth';
import { Mail, Key, Lock, ArrowRight, ArrowLeft, CheckCircle, Shield, Timer } from 'lucide-react';

type Step = 1 | 2 | 3;

export default function ForgotPasswordForm() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const { forgotPasswordStep1, forgotPasswordStep2, forgotPasswordStep3, isLoading, error, clearError } = useAuth();
  const router = useRouter();

  // Countdown timer for OTP
  useEffect(() => {
    if (currentStep === 2 && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, timeLeft]);

  // Password strength calculator
  useEffect(() => {
    const password = newPassword;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  }, [newPassword]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStep1Submit = async () => {
    clearError();
    const result = await forgotPasswordStep1({ email });
    if (result.success) {
      setCurrentStep(2);
      setTimeLeft(300); // Reset timer
    }
  };

  const handleStep2Submit = async () => {
    clearError();
    const result = await forgotPasswordStep2({ email, otp });
    if (result.success && result.data) {
      setResetToken(result.data.token);
      setCurrentStep(3);
    }
  };

  const handleStep3Submit = async () => {
    clearError();
    if (newPassword !== confirmPassword) {
      return;
    }
    const result = await forgotPasswordStep3({ new_password: newPassword, token: resetToken });
    if (result.success) {
      router.push('/auth/login');
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
      clearError();
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Reset Password';
      case 2: return 'Verify Code';
      case 3: return 'New Password';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return 'Enter your email to receive a verification code';
      case 2: return 'Enter the 6-digit code sent to your email';
      case 3: return 'Create your new secure password';
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
          <Mail className="w-4 h-4" />
          <span>Email Address</span>
        </label>
        <div className="relative group">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-4 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${
              focusedField === 'email' 
                ? 'border-blue-500 bg-white shadow-lg scale-[1.02]' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            placeholder="Enter your email address"
          />
          <div className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${
            focusedField === 'email' ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10"></div>
          </div>
        </div>
      </div>

      <button
        onClick={handleStep1Submit}
        disabled={isLoading || !email}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 group ${
          isLoading || !email
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
        }`}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Sending code...</span>
          </>
        ) : (
          <>
            <span>Send Verification Code</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </>
        )}
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <p className="text-sm text-gray-600">
          We've sent a verification code to<br />
          <span className="font-semibold text-gray-900">{email}</span>
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
          <Key className="w-4 h-4" />
          <span>Verification Code</span>
        </label>
        <div className="relative group">
          <input
            type="text"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            onFocus={() => setFocusedField('otp')}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-4 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none text-center text-2xl tracking-widest font-mono ${
              focusedField === 'otp' 
                ? 'border-green-500 bg-white shadow-lg scale-[1.02]' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            placeholder="000000"
            maxLength={6}
          />
        </div>
      </div>

      {/* Timer */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Timer className="w-4 h-4 text-gray-500" />
          <span className={`text-sm font-mono ${timeLeft <= 60 ? 'text-red-500' : 'text-gray-600'}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
        {timeLeft === 0 && (
          <button
            onClick={() => {
              handleStep1Submit();
              setOtp('');
            }}
            className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
          >
            Resend Code
          </button>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={goBack}
          className="flex-1 py-4 px-6 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <button
          onClick={handleStep2Submit}
          disabled={isLoading || otp.length !== 6}
          className={`flex-1 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 group ${
            isLoading || otp.length !== 6
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <span>Verify Code</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <p className="text-sm text-gray-600">
          Create a strong password to secure your account
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
          <Lock className="w-4 h-4" />
          <span>New Password</span>
        </label>
        <div className="relative group">
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onFocus={() => setFocusedField('newPassword')}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-4 pr-12 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${
              focusedField === 'newPassword' 
                ? 'border-purple-500 bg-white shadow-lg scale-[1.02]' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            placeholder="Enter new password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        
        {/* Password Strength */}
        {newPassword && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Password strength:</span>
              <span className={`text-xs font-semibold ${
                passwordStrength <= 25 ? 'text-red-500' :
                passwordStrength <= 50 ? 'text-yellow-500' :
                passwordStrength <= 75 ? 'text-blue-500' : 'text-green-500'
              }`}>
                {passwordStrength <= 25 ? 'Weak' :
                 passwordStrength <= 50 ? 'Fair' :
                 passwordStrength <= 75 ? 'Good' : 'Strong'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  passwordStrength <= 25 ? 'bg-red-500' :
                  passwordStrength <= 50 ? 'bg-yellow-500' :
                  passwordStrength <= 75 ? 'bg-blue-500' : 'bg-green-500'
                }`}
                style={{ width: `${passwordStrength}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
          <Lock className="w-4 h-4" />
          <span>Confirm New Password</span>
        </label>
        <div className="relative group">
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onFocus={() => setFocusedField('confirmPassword')}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-4 pr-12 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${
              focusedField === 'confirmPassword' 
                ? 'border-purple-500 bg-white shadow-lg scale-[1.02]' 
                : confirmPassword && confirmPassword !== newPassword
                ? 'border-red-500'
                : confirmPassword && confirmPassword === newPassword
                ? 'border-green-500'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            placeholder="Confirm new password"
          />
          {confirmPassword && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              {confirmPassword === newPassword ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-red-500 flex items-center justify-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={goBack}
          className="flex-1 py-4 px-6 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <button
          onClick={handleStep3Submit}
          disabled={isLoading || !newPassword || newPassword !== confirmPassword}
          className={`flex-1 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 group ${
            isLoading || !newPassword || newPassword !== confirmPassword
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Updating...</span>
            </>
          ) : (
            <>
              <span>Reset Password</span>
              <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 space-y-8 transition-all duration-500 hover:shadow-3xl">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center py-4">
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-20 sm:w-24 md:w-28 lg:w-32 object-contain"
                />
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-blue-800 bg-clip-text text-transparent">
                {getStepTitle()}
              </h1>
              <p className="text-gray-600 mt-2">
                {getStepDescription()}
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    step < currentStep ? 'bg-green-500 text-white' :
                    step === currentStep ? 'bg-blue-500 text-white' :
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-8 h-1 rounded-full mx-2 transition-colors duration-300 ${
                      step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-fade-in">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Step Content */}
          <div className="transition-all duration-300">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </div>

          {/* Footer */}
          <div className="text-center pt-6 border-t border-gray-100">
            <p className="text-gray-600">
              Remember your password?{' '}
              <button 
                type="button"
                onClick={() => router.push('/auth/login')}
                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -z-10 top-10 right-10 w-4 h-4 bg-indigo-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute -z-10 bottom-10 left-10 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute -z-10 top-1/2 left-0 w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-1000"></div>
      </div>
    </div>
  );
}