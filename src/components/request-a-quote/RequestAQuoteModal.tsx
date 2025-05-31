'use client';

import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { RequestAQuoteForm } from './RequestAQuoteForm';

export const RequestAQuoteModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    // Restore body scroll when modal is closed
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={openModal}
        className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center space-x-2 overflow-hidden"
      >
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

        {/* Content */}
        <div className="relative flex items-center space-x-2">
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          <span>Request a Quote</span>
        </div>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
            onClick={closeModal}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-6xl my-8 animate-slide-up">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
              {/* Header - Fixed height */}
              <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 p-6 text-white">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 -translate-y-12"></div>
                  <div className="absolute bottom-0 left-1/2 w-40 h-40 bg-white rounded-full translate-y-20 -translate-x-20"></div>
                </div>

                <div className="relative flex items-center justify-between">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold">Request Your Dream Trip</h2>
                    <p className="text-blue-100 text-lg">Let us create the perfect travel experience for you</p>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="group p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 hover:scale-110 active:scale-95"
                  >
                    <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-200" />
                  </button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Form Container */}
              <div className="relative max-h-[70vh] overflow-y-auto">
                {/* Form Content */}
                <RequestAQuoteForm
                  onSuccess={() => {
                    closeModal();
                    // Show success message
                    console.log('Quote request submitted successfully!');
                  }}
                  onClose={closeModal}
                />

                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"></div>
                <div className="absolute top-32 left-10 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse delay-300"></div>
                <div className="absolute bottom-20 right-20 w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse delay-700"></div>
              </div>
            </div>

            {/* Additional Floating Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce opacity-70"></div>
            <div className="absolute -top-2 -right-6 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce delay-500 opacity-70"></div>
            <div className="absolute -bottom-4 left-1/4 w-5 h-5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-bounce delay-1000 opacity-70"></div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </>
  );
};