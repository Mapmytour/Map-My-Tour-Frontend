'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Plus, X, Users, MapPin, Calendar, Home, CreditCard, CheckCircle, Mail, Phone } from 'lucide-react';

interface FormData {
  personalInfo: {
    fullName: string;
    email: string;
    phoneNumber: string;
    preferredContactMethod: 'email' | 'phone' | 'whatsapp';
  };
  tripDetails: {
    destination: string;
    departureCity: string;
    departureDate: string;
    returnDate: string;
    flexibleDates: boolean;
    numberOfAdults: number;
    numberOfChildren: number;
    travelType: 'family' | 'honeymoon' | 'solo' | 'group' | 'corporate';
  };
  accommodationPreferences: {
    hotelCategory: 'budget' | 'standard' | 'luxury' | 'any';
    numberOfRooms: number;
    roomType: 'single' | 'double' | 'suite';
  };
  activitiesAndInclusions: {
    interestedActivities: string[];
    needGuide: boolean;
    includeFlights: boolean;
    includeMeals: boolean;
    specialRequests: string;
  };
  budget: {
    estimatedBudget: string;
    isBudgetFlexible: boolean;
  };
  consent: {
    acceptTerms: boolean;
    subscribeNewsletter: boolean;
  };
}

interface RequestAQuoteFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export const RequestAQuoteForm = ({ onSuccess, onClose }: RequestAQuoteFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activitiesInput, setActivitiesInput] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      fullName: '',
      email: '',
      phoneNumber: '',
      preferredContactMethod: 'email',
    },
    tripDetails: {
      destination: '',
      departureCity: '',
      departureDate: '',
      returnDate: '',
      flexibleDates: false,
      numberOfAdults: 1,
      numberOfChildren: 0,
      travelType: 'family',
    },
    accommodationPreferences: {
      hotelCategory: 'standard',
      numberOfRooms: 1,
      roomType: 'double',
    },
    activitiesAndInclusions: {
      interestedActivities: [],
      needGuide: false,
      includeFlights: false,
      includeMeals: false,
      specialRequests: '',
    },
    budget: {
      estimatedBudget: '',
      isBudgetFlexible: false,
    },
    consent: {
      acceptTerms: true,
      subscribeNewsletter: false,
    },
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.personalInfo.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }
    if (!formData.personalInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.personalInfo.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.personalInfo.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    if (!formData.tripDetails.destination.trim()) {
      newErrors.destination = 'Destination is required';
    }
    if (!formData.tripDetails.departureCity.trim()) {
      newErrors.departureCity = 'Departure city is required';
    }
    if (!formData.tripDetails.departureDate) {
      newErrors.departureDate = 'Departure date is required';
    }
    if (!formData.tripDetails.returnDate) {
      newErrors.returnDate = 'Return date is required';
    }
    if (!formData.consent.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      
      const response = await fetch('/api/quote-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Quote request submitted successfully!');
        onSuccess?.();
        onClose?.();
      } else {
        console.error('Failed to submit quote request');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (section: keyof FormData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const addActivity = () => {
    if (activitiesInput.trim()) {
      setFormData(prev => ({
        ...prev,
        activitiesAndInclusions: {
          ...prev.activitiesAndInclusions,
          interestedActivities: [...prev.activitiesAndInclusions.interestedActivities, activitiesInput.trim()]
        }
      }));
      setActivitiesInput('');
    }
  };

  const removeActivity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      activitiesAndInclusions: {
        ...prev.activitiesAndInclusions,
        interestedActivities: prev.activitiesAndInclusions.interestedActivities.filter((_, i) => i !== index)
      }
    }));
  };

  const FormInput = ({ children, name, ...props }: any) => (
    <div className="relative group">
      {children}
      <div className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${
        focusedField === name ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10"></div>
      </div>
    </div>
  );

  const CustomCheckbox = ({ checked, onChange, children, gradient }: any) => (
    <div className="relative cursor-pointer" onClick={onChange}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {}}
        className="sr-only"
      />
      <div className={`w-6 h-6 rounded-lg border-2 transition-all duration-200 ${
        checked 
          ? `${gradient} border-current` 
          : 'border-gray-300 hover:border-gray-400'
      }`}>
        {checked && (
          <svg className="w-4 h-4 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4">
      {/* Header */}
      <div className="text-center mb-8 relative">
        <div className="flex justify-center items-center py-4 mb-6">
          <div className="relative">
            <div className="w-16 sm:w-20 md:w-24 lg:w-28 h-16 sm:h-20 md:h-24 lg:h-28 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-white font-bold text-2xl md:text-4xl">✈️</span>
            </div>
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-cyan-800 bg-clip-text text-transparent">
          Request Your Custom Quote
        </h1>
        <p className="text-gray-600 mt-2 text-lg">Fill out the details below and we'll create a personalized travel experience just for you</p>
        {onClose && (
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 transition-all duration-500 hover:shadow-3xl">
          <div onSubmit={handleSubmit}>
            <div className="space-y-10">
              
              {/* Personal Information */}
              <div className="group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">Personal Information</h3>
                    <p className="text-gray-600">Tell us about yourself</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Full Name</label>
                    <FormInput name="fullName">
                      <Input 
                        placeholder="Enter your full name" 
                        value={formData.personalInfo.fullName}
                        onChange={(e) => updateFormData('personalInfo', 'fullName', e.target.value)}
                        className={`w-full px-4 py-4 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${
                          focusedField === 'fullName' 
                            ? 'border-blue-500 bg-white shadow-lg scale-[1.02]' 
                            : 'border-gray-200 hover:border-gray-300'
                        } ${errors.fullName ? 'border-red-500' : ''}`}
                        onFocus={() => setFocusedField('fullName')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </FormInput>
                    {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>}
                  </div>
                  
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Email Address</label>
                    <FormInput name="email">
                      <Input 
                        placeholder="Enter your email address"
                        type="email"
                        value={formData.personalInfo.email}
                        onChange={(e) => updateFormData('personalInfo', 'email', e.target.value)}
                        className={`w-full px-4 py-4 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${
                          focusedField === 'email' 
                            ? 'border-blue-500 bg-white shadow-lg scale-[1.02]' 
                            : 'border-gray-200 hover:border-gray-300'
                        } ${errors.email ? 'border-red-500' : ''}`}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </FormInput>
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Phone Number</label>
                    <FormInput name="phoneNumber">
                      <Input 
                        placeholder="Enter your phone number"
                        type="tel"
                        value={formData.personalInfo.phoneNumber}
                        onChange={(e) => updateFormData('personalInfo', 'phoneNumber', e.target.value)}
                        className={`w-full px-4 py-4 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${
                          focusedField === 'phoneNumber' 
                            ? 'border-blue-500 bg-white shadow-lg scale-[1.02]' 
                            : 'border-gray-200 hover:border-gray-300'
                        } ${errors.phoneNumber ? 'border-red-500' : ''}`}
                        onFocus={() => setFocusedField('phoneNumber')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </FormInput>
                    {errors.phoneNumber && <p className="text-sm text-red-500 mt-1">{errors.phoneNumber}</p>}
                  </div>
                  
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Preferred Contact Method</label>
                    <select
                      value={formData.personalInfo.preferredContactMethod}
                      onChange={(e) => updateFormData('personalInfo', 'preferredContactMethod', e.target.value)}
                      className="w-full px-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl transition-all duration-300 text-gray-900 hover:border-gray-300 focus:border-blue-500 focus:bg-white focus:shadow-lg focus:outline-none"
                    >
                      <option value="email">📧 Email</option>
                      <option value="phone">📞 Phone Call</option>
                      <option value="whatsapp">💬 WhatsApp</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Trip Details */}
              <div className="group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-green-800 bg-clip-text text-transparent">Trip Details</h3>
                    <p className="text-gray-600">Where would you like to go?</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Destination</label>
                    <FormInput name="destination">
                      <Input 
                        placeholder="e.g., Paris, Tokyo, Bali"
                        value={formData.tripDetails.destination}
                        onChange={(e) => updateFormData('tripDetails', 'destination', e.target.value)}
                        className={`w-full px-4 py-4 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${
                          focusedField === 'destination' 
                            ? 'border-blue-500 bg-white shadow-lg scale-[1.02]' 
                            : 'border-gray-200 hover:border-gray-300'
                        } ${errors.destination ? 'border-red-500' : ''}`}
                        onFocus={() => setFocusedField('destination')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </FormInput>
                    {errors.destination && <p className="text-sm text-red-500 mt-1">{errors.destination}</p>}
                  </div>
                  
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Departure City</label>
                    <FormInput name="departureCity">
                      <Input 
                        placeholder="Which city will you depart from?"
                        value={formData.tripDetails.departureCity}
                        onChange={(e) => updateFormData('tripDetails', 'departureCity', e.target.value)}
                        className={`w-full px-4 py-4 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${
                          focusedField === 'departureCity' 
                            ? 'border-blue-500 bg-white shadow-lg scale-[1.02]' 
                            : 'border-gray-200 hover:border-gray-300'
                        } ${errors.departureCity ? 'border-red-500' : ''}`}
                        onFocus={() => setFocusedField('departureCity')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </FormInput>
                    {errors.departureCity && <p className="text-sm text-red-500 mt-1">{errors.departureCity}</p>}
                  </div>
                  
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Departure Date</label>
                    <Input 
                      type="date"
                      value={formData.tripDetails.departureDate}
                      onChange={(e) => updateFormData('tripDetails', 'departureDate', e.target.value)}
                      className={`w-full px-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl transition-all duration-300 text-gray-900 hover:border-gray-300 focus:border-blue-500 focus:bg-white focus:shadow-lg focus:outline-none ${errors.departureDate ? 'border-red-500' : ''}`}
                    />
                    {errors.departureDate && <p className="text-sm text-red-500 mt-1">{errors.departureDate}</p>}
                  </div>
                  
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Return Date</label>
                    <Input 
                      type="date"
                      value={formData.tripDetails.returnDate}
                      onChange={(e) => updateFormData('tripDetails', 'returnDate', e.target.value)}
                      className={`w-full px-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl transition-all duration-300 text-gray-900 hover:border-gray-300 focus:border-blue-500 focus:bg-white focus:shadow-lg focus:outline-none ${errors.returnDate ? 'border-red-500' : ''}`}
                    />
                    {errors.returnDate && <p className="text-sm text-red-500 mt-1">{errors.returnDate}</p>}
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="flex flex-row items-start space-x-4 space-y-0 p-6 bg-gradient-to-r from-blue-50/80 to-cyan-50/80 backdrop-blur-sm rounded-2xl border border-blue-200/50 hover:shadow-lg transition-all duration-300">
                      <CustomCheckbox
                        checked={formData.tripDetails.flexibleDates}
                        onChange={() => updateFormData('tripDetails', 'flexibleDates', !formData.tripDetails.flexibleDates)}
                        gradient="bg-gradient-to-br from-blue-500 to-cyan-500"
                      />
                      <div className="space-y-1 leading-none">
                        <label className="text-base font-semibold text-blue-800 cursor-pointer">
                          My travel dates are flexible
                        </label>
                        <p className="text-sm text-blue-600">
                          We can suggest alternative dates for better deals
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-2">Adults</label>
                      <Input
                        type="number"
                        min="1"
                        value={formData.tripDetails.numberOfAdults}
                        onChange={(e) => updateFormData('tripDetails', 'numberOfAdults', parseInt(e.target.value) || 1)}
                        className="w-full px-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl transition-all duration-300 text-gray-900 hover:border-gray-300 focus:border-blue-500 focus:bg-white focus:shadow-lg focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-2">Children</label>
                      <Input
                        type="number"
                        min="0"
                        value={formData.tripDetails.numberOfChildren}
                        onChange={(e) => updateFormData('tripDetails', 'numberOfChildren', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl transition-all duration-300 text-gray-900 hover:border-gray-300 focus:border-blue-500 focus:bg-white focus:shadow-lg focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Travel Type</label>
                    <select
                      value={formData.tripDetails.travelType}
                      onChange={(e) => updateFormData('tripDetails', 'travelType', e.target.value)}
                      className="w-full px-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl transition-all duration-300 text-gray-900 hover:border-gray-300 focus:border-blue-500 focus:bg-white focus:shadow-lg focus:outline-none"
                    >
                      <option value="family">👨‍👩‍👧‍👦 Family Vacation</option>
                      <option value="honeymoon">💕 Honeymoon</option>
                      <option value="solo">🧳 Solo Travel</option>
                      <option value="group">👥 Group Tour</option>
                      <option value="corporate">💼 Corporate Trip</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Accommodation Preferences */}
              <div className="group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text text-transparent">Accommodation Preferences</h3>
                    <p className="text-gray-600">Where would you like to stay?</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Hotel Category</label>
                    <select
                      value={formData.accommodationPreferences.hotelCategory}
                      onChange={(e) => updateFormData('accommodationPreferences', 'hotelCategory', e.target.value)}
                      className="w-full px-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl transition-all duration-300 text-gray-900 hover:border-gray-300 focus:border-blue-500 focus:bg-white focus:shadow-lg focus:outline-none"
                    >
                      <option value="budget">💰 Budget-Friendly</option>
                      <option value="standard">🏨 Standard</option>
                      <option value="luxury">✨ Luxury</option>
                      <option value="any">🎯 Any Category</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Number of Rooms</label>
                    <Input
                      type="number"
                      min="1"
                      value={formData.accommodationPreferences.numberOfRooms}
                      onChange={(e) => updateFormData('accommodationPreferences', 'numberOfRooms', parseInt(e.target.value) || 1)}
                      className="w-full px-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl transition-all duration-300 text-gray-900 hover:border-gray-300 focus:border-blue-500 focus:bg-white focus:shadow-lg focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Room Type</label>
                    <select
                      value={formData.accommodationPreferences.roomType}
                      onChange={(e) => updateFormData('accommodationPreferences', 'roomType', e.target.value)}
                      className="w-full px-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl transition-all duration-300 text-gray-900 hover:border-gray-300 focus:border-blue-500 focus:bg-white focus:shadow-lg focus:outline-none"
                    >
                      <option value="single">🛏️ Single Room</option>
                      <option value="double">🛏️🛏️ Double Room</option>
                      <option value="suite">🏨 Suite</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Activities and Inclusions */}
              <div className="group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-orange-800 bg-clip-text text-transparent">Activities & Inclusions</h3>
                    <p className="text-gray-600">What would you like to include in your trip?</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">Interested Activities</label>
                    <div className="flex gap-3">
                      <FormInput name="activitiesInput">
                        <Input
                          placeholder="e.g., sightseeing, hiking, museums"
                          value={activitiesInput}
                          onChange={(e) => setActivitiesInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addActivity())}
                          className={`flex-1 px-4 py-4 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${
                            focusedField === 'activitiesInput' 
                              ? 'border-blue-500 bg-white shadow-lg scale-[1.02]' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onFocus={() => setFocusedField('activitiesInput')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </FormInput>
                      <Button 
                        type="button" 
                        onClick={addActivity}
                        className="px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                        disabled={!activitiesInput.trim()}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add
                      </Button>
                    </div>
                    
                    {formData.activitiesAndInclusions.interestedActivities.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {formData.activitiesAndInclusions.interestedActivities.map((activity, index) => (
                          <div key={index} className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 rounded-full border border-blue-200 hover:shadow-md transition-all duration-200">
                            <span className="font-medium">{activity}</span>
                            <button
                              type="button"
                              onClick={() => removeActivity(index)}
                              className="p-1 hover:bg-blue-200 rounded-full transition-colors duration-200"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-row items-start space-x-4 space-y-0 p-6 bg-gradient-to-r from-amber-50/80 to-orange-50/80 backdrop-blur-sm rounded-2xl border border-amber-200/50 hover:shadow-lg transition-all duration-300">
                      <CustomCheckbox
                        checked={formData.activitiesAndInclusions.needGuide}
                        onChange={() => updateFormData('activitiesAndInclusions', 'needGuide', !formData.activitiesAndInclusions.needGuide)}
                        gradient="bg-gradient-to-br from-amber-500 to-orange-500"
                      />
                      <div className="space-y-1 leading-none">
                        <label className="text-base font-semibold text-amber-800 cursor-pointer">
                          🗣️ Tour Guide
                        </label>
                        <p className="text-sm text-amber-600">
                          Include a professional guide
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-row items-start space-x-4 space-y-0 p-6 bg-gradient-to-r from-sky-50/80 to-blue-50/80 backdrop-blur-sm rounded-2xl border border-sky-200/50 hover:shadow-lg transition-all duration-300">
                      <CustomCheckbox
                        checked={formData.activitiesAndInclusions.includeFlights}
                        onChange={() => updateFormData('activitiesAndInclusions', 'includeFlights', !formData.activitiesAndInclusions.includeFlights)}
                        gradient="bg-gradient-to-br from-sky-500 to-blue-500"
                      />
                      <div className="space-y-1 leading-none">
                        <label className="text-base font-semibold text-sky-800 cursor-pointer">
                          ✈️ Flights
                        </label>
                        <p className="text-sm text-sky-600">
                          Include flight bookings
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-row items-start space-x-4 space-y-0 p-6 bg-gradient-to-r from-emerald-50/80 to-green-50/80 backdrop-blur-sm rounded-2xl border border-emerald-200/50 hover:shadow-lg transition-all duration-300">
                      <CustomCheckbox
                        checked={formData.activitiesAndInclusions.includeMeals}
                        onChange={() => updateFormData('activitiesAndInclusions', 'includeMeals', !formData.activitiesAndInclusions.includeMeals)}
                        gradient="bg-gradient-to-br from-emerald-500 to-green-500"
                      />
                      <div className="space-y-1 leading-none">
                        <label className="text-base font-semibold text-emerald-800 cursor-pointer">
                          🍽️ Meals
                        </label>
                        <p className="text-sm text-emerald-600">
                          Include meal plans
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Special Requests</label>
                    <FormInput name="specialRequests">
                      <Textarea
                        placeholder="Any special requirements, dietary restrictions, accessibility needs, or preferences..."
                        value={formData.activitiesAndInclusions.specialRequests}
                        onChange={(e) => updateFormData('activitiesAndInclusions', 'specialRequests', e.target.value)}
                        className={`w-full px-4 py-4 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none min-h-[100px] resize-none ${
                          focusedField === 'specialRequests' 
                            ? 'border-blue-500 bg-white shadow-lg scale-[1.02]' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onFocus={() => setFocusedField('specialRequests')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </FormInput>
                  </div>
                </div>
              </div>

              {/* Budget */}
              <div className="group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-green-800 bg-clip-text text-transparent">Budget Information</h3>
                    <p className="text-gray-600">Help us tailor options to your budget</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Estimated Budget (Optional)</label>
                    <FormInput name="estimatedBudget">
                      <Input 
                        placeholder="e.g., $2,000 - $3,000"
                        value={formData.budget.estimatedBudget}
                        onChange={(e) => updateFormData('budget', 'estimatedBudget', e.target.value)}
                        className={`w-full px-4 py-4 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${
                          focusedField === 'estimatedBudget' 
                            ? 'border-blue-500 bg-white shadow-lg scale-[1.02]' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onFocus={() => setFocusedField('estimatedBudget')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </FormInput>
                    <p className="text-xs text-gray-500 mt-1">
                      This helps us provide options that match your expectations
                    </p>
                  </div>
                  
                  <div className="flex flex-row items-start space-x-4 space-y-0 p-6 bg-gradient-to-r from-green-50/80 to-emerald-50/80 backdrop-blur-sm rounded-2xl border border-green-200/50 hover:shadow-lg transition-all duration-300">
                    <CustomCheckbox
                      checked={formData.budget.isBudgetFlexible}
                      onChange={() => updateFormData('budget', 'isBudgetFlexible', !formData.budget.isBudgetFlexible)}
                      gradient="bg-gradient-to-br from-green-500 to-emerald-500"
                    />
                    <div className="space-y-1 leading-none">
                      <label className="text-base font-semibold text-green-800 cursor-pointer">
                        My budget is flexible
                      </label>
                      <p className="text-sm text-green-600">
                        I'm open to suggestions that might exceed my budget for exceptional experiences
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consent */}
              <div className="group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-indigo-800 bg-clip-text text-transparent">Final Step</h3>
                    <p className="text-gray-600">Just a couple of confirmations</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className={`flex flex-row items-start space-x-4 space-y-0 p-6 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm rounded-2xl border transition-all duration-300 ${errors.acceptTerms ? 'border-red-500' : 'border-blue-200/50 hover:shadow-lg'}`}>
                    <CustomCheckbox
                      checked={formData.consent.acceptTerms}
                      onChange={() => updateFormData('consent', 'acceptTerms', !formData.consent.acceptTerms)}
                      gradient="bg-gradient-to-br from-blue-500 to-indigo-500"
                    />
                    <div className="space-y-1 leading-none">
                      <label className="text-base font-semibold text-blue-800 cursor-pointer">
                        I accept the{' '}
                        <a href="/terms" className="underline hover:text-blue-600 transition-colors">
                          terms and conditions
                        </a>
                      </label>
                      <p className="text-sm text-blue-600">
                        Required to proceed with your quote request
                      </p>
                      {errors.acceptTerms && <p className="text-sm text-red-500 mt-1">{errors.acceptTerms}</p>}
                    </div>
                  </div>
                  
                  <div className="flex flex-row items-start space-x-4 space-y-0 p-6 bg-gradient-to-r from-gray-50/80 to-slate-50/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                    <CustomCheckbox
                      checked={formData.consent.subscribeNewsletter}
                      onChange={() => updateFormData('consent', 'subscribeNewsletter', !formData.consent.subscribeNewsletter)}
                      gradient="bg-gradient-to-br from-gray-500 to-slate-500"
                    />
                    <div className="space-y-1 leading-none">
                      <label className="text-base font-semibold text-gray-700 cursor-pointer">
                        📧 Subscribe to travel deals and updates
                      </label>
                      <p className="text-sm text-gray-600">
                        Get exclusive offers and travel inspiration (optional)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200/50">
                {onClose && (
                  <Button 
                    type="button" 
                    onClick={onClose} 
                    className="flex-1 h-16 px-8 bg-gray-50/50 border-2 border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    Cancel
                  </Button>
                )}
                <Button 
                  onClick={handleSubmit}
                  className={`flex-1 h-16 px-8 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating Your Quote...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      <span>Request My Custom Quote</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -z-10 top-20 right-20 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute -z-10 bottom-20 left-20 w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute -z-10 top-1/2 right-10 w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-1000"></div>
      </div>
    </div>
  );
};