'use client';

import React from 'react';
import { Loader2, Shield } from 'lucide-react';

interface AuthLoadingProps {
  message?: string;
  showIcon?: boolean;
}

export default function AuthLoading({
  message = 'Loading...',
  showIcon = true
}: AuthLoadingProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="text-center space-y-6 p-8">
        {/* Logo or Brand */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
            {showIcon ? (
              <Shield className="w-8 h-8 text-white" />
            ) : (
              <span className="text-white font-bold text-xl">MT</span>
            )}
          </div>
        </div>

        {/* Loading Spinner */}
        <div className="relative">
          <div className="w-8 h-8 border-4 border-purple-200 rounded-full animate-spin mx-auto">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Loading Message */}
        <div className="space-y-2">
          <p className="text-gray-700 font-medium">{message}</p>
          <p className="text-gray-500 text-sm">Please wait while we verify your authentication...</p>
        </div>

        {/* Loading Animation Dots */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}