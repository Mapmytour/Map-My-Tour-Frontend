'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Loader2, Plus, X, Users, MapPin, Calendar as CalendarDays, Home, CreditCard, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

// Form validation schema
const formSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
    preferredContactMethod: z.enum(['email', 'phone', 'whatsapp']),
  }),
  tripDetails: z.object({
    destination: z.string().min(2, 'Destination is required'),
    departureCity: z.string().min(2, 'Departure city is required'),
    departureDate: z.date({
      required_error: 'Departure date is required',
    }),
    returnDate: z.date({
      required_error: 'Return date is required',
    }),
    flexibleDates: z.boolean(),
    numberOfAdults: z.number().min(1, 'At least 1 adult is required'),
    numberOfChildren: z.number().min(0),
    travelType: z.enum(['family', 'honeymoon', 'solo', 'group', 'corporate']),
  }),
  accommodationPreferences: z.object({
    hotelCategory: z.enum(['budget', 'standard', 'luxury', 'any']),
    numberOfRooms: z.number().min(1, 'At least 1 room is required'),
    roomType: z.enum(['single', 'double', 'suite']),
  }),
  activitiesAndInclusions: z.object({
    interestedActivities: z.array(z.string()),
    needGuide: z.boolean(),
    includeFlights: z.boolean(),
    includeMeals: z.boolean(),
    specialRequests: z.string().optional(),
  }),
  budget: z.object({
    estimatedBudget: z.string().optional(),
    isBudgetFlexible: z.boolean(),
  }),
  consent: z.object({
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms and conditions' }),
    }),
    subscribeNewsletter: z.boolean(),
  }),
});

type FormSchema = z.infer<typeof formSchema>;

interface RequestAQuoteFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export const RequestAQuoteForm = ({ onSuccess, onClose }: RequestAQuoteFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activitiesInput, setActivitiesInput] = useState('');

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalInfo: {
        fullName: '',
        email: '',
        phoneNumber: '',
        preferredContactMethod: 'email',
      },
      tripDetails: {
        destination: '',
        departureCity: '',
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
    },
  });

  const onSubmit = async (values: FormSchema) => {
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/quote-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success('Quote request submitted successfully!');
        onSuccess?.();
        onClose?.();
      } else {
        toast.error('Failed to submit quote request');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const addActivity = () => {
    if (activitiesInput.trim()) {
      const currentActivities = form.getValues('activitiesAndInclusions.interestedActivities');
      form.setValue('activitiesAndInclusions.interestedActivities', [...currentActivities, activitiesInput.trim()]);
      setActivitiesInput('');
    }
  };

  const removeActivity = (index: number) => {
    const currentActivities = form.getValues('activitiesAndInclusions.interestedActivities');
    form.setValue('activitiesAndInclusions.interestedActivities', currentActivities.filter((_, i) => i !== index));
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="modal-header">
        <div className="modal-title">Request Your Custom Quote</div>
        <div className="modal-subtitle">Fill out the details below and we'll create a personalized travel experience just for you</div>
        {onClose && (
          <button onClick={onClose} className="modal-close-button">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Form */}
      <div className="form-container">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Personal Information */}
            <div className="form-section animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="form-section-header">Personal Information</h3>
                  <p className="text-sm text-gray-600">Tell us about yourself</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="personalInfo.fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your full name" 
                          className="form-input h-12"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="personalInfo.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your email address"
                          type="email"
                          className="form-input h-12"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="personalInfo.phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your phone number"
                          type="tel"
                          className="form-input h-12"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="personalInfo.preferredContactMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">Preferred Contact Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="form-select h-12">
                            <SelectValue placeholder="How should we contact you?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="email">📧 Email</SelectItem>
                          <SelectItem value="phone">📞 Phone Call</SelectItem>
                          <SelectItem value="whatsapp">💬 WhatsApp</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Trip Details */}
            <div className="form-section animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="form-section-header">Trip Details</h3>
                  <p className="text-sm text-gray-600">Where would you like to go?</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="tripDetails.destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">Destination</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Paris, Tokyo, Bali"
                          className="form-input h-12"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="tripDetails.departureCity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">Departure City</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Which city will you depart from?"
                          className="form-input h-12"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="tripDetails.departureDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">Departure Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "date-picker-button h-12 justify-start",
                                !field.value && "text-gray-500"
                              )}
                            >
                              <CalendarIcon className="mr-3 h-4 w-4 text-gray-400" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select departure date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white shadow-xl border-0 rounded-xl" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            className="rounded-xl"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="tripDetails.returnDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">Return Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "date-picker-button h-12 justify-start",
                                !field.value && "text-gray-500"
                              )}
                            >
                              <CalendarIcon className="mr-3 h-4 w-4 text-gray-400" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select return date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white shadow-xl border-0 rounded-xl" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < form.getValues('tripDetails.departureDate') || 
                              date < new Date("1900-01-01")
                            }
                            initialFocus
                            className="rounded-xl"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="tripDetails.flexibleDates"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="form-checkbox mt-1"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-medium text-blue-800">
                            My travel dates are flexible
                          </FormLabel>
                          <p className="text-xs text-blue-600">
                            We can suggest alternative dates for better deals
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="tripDetails.numberOfAdults"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Adults</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            placeholder="1"
                            className="form-input h-12"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                          />
                        </FormControl>
                        <FormMessage className="text-sm text-red-500" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tripDetails.numberOfChildren"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Children</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            placeholder="0"
                            className="form-input h-12"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage className="text-sm text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="tripDetails.travelType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">Travel Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="form-select h-12">
                            <SelectValue placeholder="What kind of trip is this?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="family">👨‍👩‍👧‍👦 Family Vacation</SelectItem>
                          <SelectItem value="honeymoon">💕 Honeymoon</SelectItem>
                          <SelectItem value="solo">🧳 Solo Travel</SelectItem>
                          <SelectItem value="group">👥 Group Tour</SelectItem>
                          <SelectItem value="corporate">💼 Corporate Trip</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Accommodation Preferences */}
            <div className="form-section animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="form-section-header">Accommodation Preferences</h3>
                  <p className="text-sm text-gray-600">Where would you like to stay?</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="accommodationPreferences.hotelCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">Hotel Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="form-select h-12">
                            <SelectValue placeholder="Choose category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="budget">💰 Budget-Friendly</SelectItem>
                          <SelectItem value="standard">🏨 Standard</SelectItem>
                          <SelectItem value="luxury">✨ Luxury</SelectItem>
                          <SelectItem value="any">🎯 Any Category</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="accommodationPreferences.numberOfRooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">Number of Rooms</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="1"
                          className="form-input h-12"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="accommodationPreferences.roomType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">Room Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="form-select h-12">
                            <SelectValue placeholder="Select room type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="single">🛏️ Single Room</SelectItem>
                          <SelectItem value="double">🛏️🛏️ Double Room</SelectItem>
                          <SelectItem value="suite">🏨 Suite</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Activities and Inclusions */}
            <div className="form-section animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <CalendarDays className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="form-section-header">Activities & Inclusions</h3>
                  <p className="text-sm text-gray-600">What would you like to include in your trip?</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <FormLabel className="text-sm font-semibold text-gray-700 mb-3 block">Interested Activities</FormLabel>
                  <div className="flex gap-3">
                    <Input
                      placeholder="e.g., sightseeing, hiking, museums"
                      value={activitiesInput}
                      onChange={(e) => setActivitiesInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addActivity())}
                      className="form-input h-12 flex-1"
                    />
                    <Button 
                      type="button" 
                      onClick={addActivity}
                      className="btn-secondary h-12 px-6"
                      disabled={!activitiesInput.trim()}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>
                  
                  {form.watch('activitiesAndInclusions.interestedActivities')?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {form.watch('activitiesAndInclusions.interestedActivities')?.map((activity, index) => (
                        <div key={index} className="activity-tag">
                          <span>{activity}</span>
                          <button
                            type="button"
                            onClick={() => removeActivity(index)}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="activitiesAndInclusions.needGuide"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 bg-amber-50 rounded-lg border border-amber-200">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="form-checkbox mt-1"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-medium text-amber-800">
                            🗣️ Tour Guide
                          </FormLabel>
                          <p className="text-xs text-amber-600">
                            Include a professional guide
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="activitiesAndInclusions.includeFlights"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 bg-sky-50 rounded-lg border border-sky-200">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="form-checkbox mt-1"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-medium text-sky-800">
                            ✈️ Flights
                          </FormLabel>
                          <p className="text-xs text-sky-600">
                            Include flight bookings
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="activitiesAndInclusions.includeMeals"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="form-checkbox mt-1"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-medium text-emerald-800">
                            🍽️ Meals
                          </FormLabel>
                          <p className="text-xs text-emerald-600">
                            Include meal plans
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="activitiesAndInclusions.specialRequests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">Special Requests</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any special requirements, dietary restrictions, accessibility needs, or preferences..."
                          className="form-input min-h-[100px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Budget */}
            <div className="form-section animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="form-section-header">Budget Information</h3>
                  <p className="text-sm text-gray-600">Help us tailor options to your budget</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="budget.estimatedBudget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">Estimated Budget (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., $2,000 - $3,000"
                          className="form-input h-12"
                          {...field} 
                        />
                      </FormControl>
                      <p className="text-xs text-gray-500 mt-1">
                        This helps us provide options that match your expectations
                      </p>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="budget.isBudgetFlexible"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 bg-green-50 rounded-lg border border-green-200">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="form-checkbox mt-1"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium text-green-800">
                          My budget is flexible
                        </FormLabel>
                        <p className="text-xs text-green-600">
                          I'm open to suggestions that might exceed my budget for exceptional experiences
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Consent */}
            <div className="form-section animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="form-section-header">Final Step</h3>
                  <p className="text-sm text-gray-600">Just a couple of confirmations</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="consent.acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="form-checkbox mt-1"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium text-blue-800">
                          I accept the{' '}
                          <a href="/terms" className="underline hover:text-blue-600 transition-colors">
                            terms and conditions
                          </a>
                        </FormLabel>
                        <p className="text-xs text-blue-600">
                          Required to proceed with your quote request
                        </p>
                      </div>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="consent.subscribeNewsletter"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="form-checkbox mt-1"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium text-gray-700">
                          📧 Subscribe to travel deals and updates
                        </FormLabel>
                        <p className="text-xs text-gray-600">
                          Get exclusive offers and travel inspiration (optional)
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              {onClose && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose} 
                  className="btn-secondary flex-1 h-14"
                >
                  Cancel
                </Button>
              )}
              <Button 
                type="submit" 
                className="btn-primary flex-1 h-14 text-lg font-semibold" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="loading-spinner mr-3" />
                    Creating Your Quote...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-3" />
                    Request My Custom Quote
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};