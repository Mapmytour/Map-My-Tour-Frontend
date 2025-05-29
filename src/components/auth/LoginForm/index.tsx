'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { LoginCredentials } from '@/types/auth';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const { login, isLoading, error, clearError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleSubmit = async () => {
    clearError();
    
    const result = await login(formData);
    if (result.success) {
      router.push('/user/profile');
    }
  };

  const handleForgotPassword = () => {
    router.push('/auth/forgot-password');
  };

  const handleInputChange = (field: keyof LoginCredentials, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) clearError();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 space-y-8 transition-all duration-500 hover:shadow-3xl hover:scale-[1.01]">
          
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-cyan-800 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-gray-600 mt-2">Sign in to continue your journey</p>
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

          {/* Form */}
          <div className="space-y-6">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <Mail className="w-4 h-4" />
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
                  className={`w-full px-4 py-4 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${
                    focusedField === 'email' 
                      ? 'border-blue-500 bg-white shadow-lg scale-[1.02]' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
                <div className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${
                  focusedField === 'email' ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10"></div>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <Lock className="w-4 h-4" />
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
                  className={`w-full px-4 py-4 pr-12 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${
                    focusedField === 'password' 
                      ? 'border-blue-500 bg-white shadow-lg scale-[1.02]' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                <div className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${
                  focusedField === 'password' ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10"></div>
                </div>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
                    formData.rememberMe 
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-500 border-blue-500' 
                      : 'border-gray-300 group-hover:border-gray-400'
                  }`}>
                    {formData.rememberMe && (
                      <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-200">Remember me</span>
              </label>
              
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 group ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="text-center pt-6 border-t border-gray-100">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button 
                type="button"
                onClick={() => router.push('/auth/register')}
                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -z-10 top-10 right-10 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute -z-10 bottom-10 left-10 w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-700"></div>
      </div>
    </div>
  );
}