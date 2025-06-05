'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { User } from '@/types/auth';
import {
    User as UserIcon,
    Mail,
    Phone,
    Calendar,
    MapPin,
    Save,
    Camera,
    CheckCircle,
    AlertCircle,
    Loader2
} from 'lucide-react';

interface ProfileFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other' | '';
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
    };
}

export default function ProfileForm() {
    const { user, updateProfile, uploadAvatar, isLoading, error, clearError } = useAuth();
    const [formData, setFormData] = useState<ProfileFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        address: {
            street: '',
            city: '',
            state: '',
            country: '',
            postalCode: ''
        }
    });
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);

    // Initialize form data when user data is available
    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phone: user.phone || '',
                dateOfBirth: user.dateOfBirth || '',
                gender: user.gender || '',
                address: {
                    street: user.address?.street || '',
                    city: user.address?.city || '',
                    state: user.address?.state || '',
                    country: user.address?.country || '',
                    postalCode: user.address?.postalCode || ''
                }
            });
        }
    }, [user]);

    // Clear success message after 3 seconds
    useEffect(() => {
        if (saveSuccess) {
            const timer = setTimeout(() => setSaveSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [saveSuccess]);

    // Clear error after 5 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => clearError(), 5000);
            return () => clearTimeout(timer);
        }
    }, [error, clearError]);

    const handleInputChange = (field: string, value: string) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent as keyof ProfileFormData] as ProfileFormData['address'],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }

        if (error) clearError();
        if (!isEditing) setIsEditing(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        const updateData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            dateOfBirth: formData.dateOfBirth || undefined,
            gender: formData.gender || undefined,
            address: {
                street: formData.address.street || undefined,
                city: formData.address.city || undefined,
                state: formData.address.state || undefined,
                country: formData.address.country || undefined,
                postalCode: formData.address.postalCode || undefined
            }
        };

        const result = await updateProfile(updateData);
        if (result.success) {
            setIsEditing(false);
            setSaveSuccess(true);
        }
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload avatar
        setUploadingAvatar(true);
        const result = await uploadAvatar(file);
        setUploadingAvatar(false);

        if (result.success) {
            setSaveSuccess(true);
        }
    };

    const resetForm = () => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phone: user.phone || '',
                dateOfBirth: user.dateOfBirth || '',
                gender: user.gender || '',
                address: {
                    street: user.address?.street || '',
                    city: user.address?.city || '',
                    state: user.address?.state || '',
                    country: user.address?.country || '',
                    postalCode: user.address?.postalCode || ''
                }
            });
            setIsEditing(false);
            clearError();
        }
    };

    return (
        <div className="space-y-8">
            {/* Avatar Section */}
            <div className="flex items-center space-x-6">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                        {avatarPreview || user?.avatarUrl ? (
                            <img
                                src={avatarPreview || user?.avatarUrl}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <UserIcon className="w-12 h-12 text-purple-600" />
                        )}
                    </div>

                    {/* Upload button overlay */}
                    <label className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-700 transition-colors duration-200 shadow-lg">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                        />
                        {uploadingAvatar ? (
                            <Loader2 className="w-4 h-4 text-white animate-spin" />
                        ) : (
                            <Camera className="w-4 h-4 text-white" />
                        )}
                    </label>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        {user?.firstName} {user?.lastName}
                    </h3>
                    <p className="text-gray-600 text-sm">{user?.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                        {user?.isVerified ? (
                            <div className="flex items-center space-x-1">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-green-600 text-xs font-medium">Verified</span>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-1">
                                <AlertCircle className="w-4 h-4 text-yellow-500" />
                                <span className="text-yellow-600 text-xs font-medium">Unverified</span>
                            </div>
                        )}
                        <span className="text-gray-400 text-xs">•</span>
                        <span className="text-gray-500 text-xs capitalize">{user?.role || 'User'}</span>
                    </div>
                </div>
            </div>

            {/* Success Message */}
            {saveSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 animate-fade-in">
                    <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <p className="text-green-700 text-sm font-medium">Profile updated successfully!</p>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-fade-in">
                    <div className="flex items-center space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <p className="text-red-700 text-sm font-medium">{error}</p>
                    </div>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                            <UserIcon className="w-4 h-4" />
                            <span>First Name</span>
                        </label>
                        <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            onFocus={() => setFocusedField('firstName')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${focusedField === 'firstName'
                                ? 'border-purple-500 bg-white shadow-lg scale-[1.02]'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                            placeholder="Enter your first name"
                        />
                    </div>

                    {/* Last Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                            <UserIcon className="w-4 h-4" />
                            <span>Last Name</span>
                        </label>
                        <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            onFocus={() => setFocusedField('lastName')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${focusedField === 'lastName'
                                ? 'border-purple-500 bg-white shadow-lg scale-[1.02]'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                            placeholder="Enter your last name"
                        />
                    </div>

                    {/* Email (Read-only) */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                            <Mail className="w-4 h-4" />
                            <span>Email Address</span>
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            readOnly
                            className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                            placeholder="Email address"
                        />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                            <Phone className="w-4 h-4" />
                            <span>Phone Number</span>
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            onFocus={() => setFocusedField('phone')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${focusedField === 'phone'
                                ? 'border-purple-500 bg-white shadow-lg scale-[1.02]'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                            placeholder="Enter your phone number"
                        />
                    </div>

                    {/* Date of Birth */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>Date of Birth</span>
                        </label>
                        <input
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                            onFocus={() => setFocusedField('dateOfBirth')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl transition-all duration-300 text-gray-900 focus:outline-none ${focusedField === 'dateOfBirth'
                                ? 'border-purple-500 bg-white shadow-lg scale-[1.02]'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                        />
                    </div>

                    {/* Gender */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Gender</label>
                        <select
                            value={formData.gender}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                            onFocus={() => setFocusedField('gender')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl transition-all duration-300 text-gray-900 focus:outline-none ${focusedField === 'gender'
                                ? 'border-purple-500 bg-white shadow-lg scale-[1.02]'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                {/* Address Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                        <MapPin className="w-5 h-5" />
                        <span>Address Information</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Street Address */}
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Street Address</label>
                            <input
                                type="text"
                                value={formData.address.street}
                                onChange={(e) => handleInputChange('address.street', e.target.value)}
                                onFocus={() => setFocusedField('street')}
                                onBlur={() => setFocusedField(null)}
                                className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${focusedField === 'street'
                                    ? 'border-purple-500 bg-white shadow-lg scale-[1.02]'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                placeholder="Enter your street address"
                            />
                        </div>

                        {/* City */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">City</label>
                            <input
                                type="text"
                                value={formData.address.city}
                                onChange={(e) => handleInputChange('address.city', e.target.value)}
                                onFocus={() => setFocusedField('city')}
                                onBlur={() => setFocusedField(null)}
                                className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${focusedField === 'city'
                                    ? 'border-purple-500 bg-white shadow-lg scale-[1.02]'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                placeholder="Enter your city"
                            />
                        </div>

                        {/* State */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">State/Province</label>
                            <input
                                type="text"
                                value={formData.address.state}
                                onChange={(e) => handleInputChange('address.state', e.target.value)}
                                onFocus={() => setFocusedField('state')}
                                onBlur={() => setFocusedField(null)}
                                className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${focusedField === 'state'
                                    ? 'border-purple-500 bg-white shadow-lg scale-[1.02]'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                placeholder="Enter your state/province"
                            />
                        </div>

                        {/* Country */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Country</label>
                            <input
                                type="text"
                                value={formData.address.country}
                                onChange={(e) => handleInputChange('address.country', e.target.value)}
                                onFocus={() => setFocusedField('country')}
                                onBlur={() => setFocusedField(null)}
                                className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${focusedField === 'country'
                                    ? 'border-purple-500 bg-white shadow-lg scale-[1.02]'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                placeholder="Enter your country"
                            />
                        </div>

                        {/* Postal Code */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Postal Code</label>
                            <input
                                type="text"
                                value={formData.address.postalCode}
                                onChange={(e) => handleInputChange('address.postalCode', e.target.value)}
                                onFocus={() => setFocusedField('postalCode')}
                                onBlur={() => setFocusedField(null)}
                                className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${focusedField === 'postalCode'
                                    ? 'border-purple-500 bg-white shadow-lg scale-[1.02]'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                placeholder="Enter your postal code"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                    {isEditing && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="px-6 py-3 text-gray-600 hover:text-gray-800 font-semibold transition-colors duration-200"
                        >
                            Cancel
                        </button>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading || !isEditing}
                        className={`px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 flex items-center space-x-2 ${isLoading || !isEditing
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
                            }`}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Saving...</span>
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                <span>Save Changes</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}