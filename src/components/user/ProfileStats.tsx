'use client';

import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import {
    Calendar,
    Shield,
    User,
    Mail,
    Phone,
    MapPin,
    CheckCircle,
    AlertCircle,
    Clock
} from 'lucide-react';

export default function ProfileStats() {
    const { user } = useAuth();

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Not provided';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatJoinDate = (dateString?: string) => {
        if (!dateString) return 'Recently joined';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        });
    };

    const calculateProfileCompletion = () => {
        if (!user) return 0;

        let completedFields = 0;
        const totalFields = 9;

        if (user.firstName) completedFields++;
        if (user.lastName) completedFields++;
        if (user.email) completedFields++;
        if (user.phone) completedFields++;
        if (user.dateOfBirth) completedFields++;
        if (user.gender) completedFields++;
        if (user.address?.street) completedFields++;
        if (user.address?.city && user.address?.country) completedFields++;
        if (user.avatarUrl) completedFields++;

        return Math.round((completedFields / totalFields) * 100);
    };

    const getCompletionStatus = () => {
        const completion = calculateProfileCompletion();
        if (completion >= 80) return { color: 'text-green-600', label: 'Complete' };
        if (completion >= 60) return { color: 'text-yellow-600', label: 'Good' };
        return { color: 'text-red-600', label: 'Incomplete' };
    };

    const completionPercentage = calculateProfileCompletion();
    const completionStatus = getCompletionStatus();

    return (
        <div className="space-y-6">
            {/* Profile Completion */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Profile Completion</h3>
                    <div className="flex items-center space-x-1">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className={`font-semibold ${completionStatus.color}`}>{completionPercentage}%</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${completionPercentage}%` }}></div>
                    </div>

                    <div className="text-sm text-gray-600">
                        <p>Status: <span className={`font-semibold ${completionStatus.color}`}>{completionStatus.label}</span></p>
                        <div className="mt-2 space-y-1">
                            <div className="flex items-center space-x-2">
                                {user?.firstName && user?.lastName ? (
                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                ) : (
                                    <div className="w-3 h-3 border border-gray-300 rounded-full"></div>
                                )}
                                <span>Full Name</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                {user?.phone ? (
                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                ) : (
                                    <div className="w-3 h-3 border border-gray-300 rounded-full"></div>
                                )}
                                <span>Phone Number</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                {user?.address?.street && user?.address?.city ? (
                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                ) : (
                                    <div className="w-3 h-3 border border-gray-300 rounded-full"></div>
                                )}
                                <span>Address Information</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Info Cards */}
            <div className="grid grid-cols-1 gap-4">
                {/* Verification Status */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${user?.isVerified ? 'bg-green-100' : 'bg-yellow-100'
                            }`}>
                            {user?.isVerified ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                                <AlertCircle className="w-5 h-5 text-yellow-600" />
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">Email Status</p>
                            <p className={`text-xs ${user?.isVerified ? 'text-green-600' : 'text-yellow-600'}`}>
                                {user?.isVerified ? 'Verified' : 'Unverified'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Account Type */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <User className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">Account Type</p>
                            <p className="text-xs text-purple-600 capitalize">{user?.role || 'User'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Account Details */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Account Details</span>
                </h3>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 flex items-center space-x-2">
                            <Mail className="w-4 h-4" />
                            <span>Email</span>
                        </span>
                        <span className="font-medium text-gray-900">{user?.email || 'Not provided'}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 flex items-center space-x-2">
                            <Phone className="w-4 h-4" />
                            <span>Phone</span>
                        </span>
                        <span className="font-medium text-gray-900">{user?.phone || 'Not provided'}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>Date of Birth</span>
                        </span>
                        <span className="font-medium text-gray-900">{formatDate(user?.dateOfBirth)}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 flex items-center space-x-2">
                            <User className="w-4 h-4" />
                            <span>Gender</span>
                        </span>
                        <span className="font-medium text-gray-900 capitalize">{user?.gender || 'Not specified'}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>Member Since</span>
                        </span>
                        <span className="font-medium text-gray-900">{formatJoinDate(user?.createdAt)}</span>
                    </div>
                </div>
            </div>

            {/* Address Information */}
            {(user?.address?.street || user?.address?.city || user?.address?.country) && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                        <MapPin className="w-5 h-5" />
                        <span>Address Information</span>
                    </h3>

                    <div className="space-y-3">
                        {user.address.street && (
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Street</span>
                                <span className="font-medium text-gray-900">{user.address.street}</span>
                            </div>
                        )}

                        {user.address.city && (
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">City</span>
                                <span className="font-medium text-gray-900">{user.address.city}</span>
                            </div>
                        )}

                        {user.address.state && (
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">State/Province</span>
                                <span className="font-medium text-gray-900">{user.address.state}</span>
                            </div>
                        )}

                        {user.address.country && (
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Country</span>
                                <span className="font-medium text-gray-900">{user.address.country}</span>
                            </div>
                        )}

                        {user.address.postalCode && (
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Postal Code</span>
                                <span className="font-medium text-gray-900">{user.address.postalCode}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Preferences */}
            {user?.preferences && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                        <Shield className="w-5 h-5" />
                        <span>Preferences</span>
                    </h3>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Email Notifications</span>
                            <span className={`font-medium ${user.preferences.notifications.email ? 'text-green-600' : 'text-red-600'}`}>
                                {user.preferences.notifications.email ? 'Enabled' : 'Disabled'}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">SMS Notifications</span>
                            <span className={`font-medium ${user.preferences.notifications.sms ? 'text-green-600' : 'text-red-600'}`}>
                                {user.preferences.notifications.sms ? 'Enabled' : 'Disabled'}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Push Notifications</span>
                            <span className={`font-medium ${user.preferences.notifications.push ? 'text-green-600' : 'text-red-600'}`}>
                                {user.preferences.notifications.push ? 'Enabled' : 'Disabled'}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Profile Visibility</span>
                            <span className={`font-medium ${user.preferences.privacy.profileVisible ? 'text-green-600' : 'text-red-600'}`}>
                                {user.preferences.privacy.profileVisible ? 'Public' : 'Private'}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Show Booking History</span>
                            <span className={`font-medium ${user.preferences.privacy.showBookingHistory ? 'text-green-600' : 'text-red-600'}`}>
                                {user.preferences.privacy.showBookingHistory ? 'Visible' : 'Hidden'}
                            </span>
                        </div>

                        {user.preferences.interests && user.preferences.interests.length > 0 && (
                            <div>
                                <span className="text-gray-600">Interests</span>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {user.preferences.interests.map((interest, index) => (
                                        <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Account Security Status */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Account Security</span>
                </h3>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {user?.isVerified ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                                <AlertCircle className="w-5 h-5 text-yellow-500" />
                            )}
                            <span className="text-gray-700">Email Verified</span>
                        </div>
                        <span className={`text-sm font-medium ${user?.isVerified ? 'text-green-600' : 'text-yellow-600'}`}>
                            {user?.isVerified ? 'Verified' : 'Pending'}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Clock className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-700">Last Updated</span>
                        </div>
                        <span className="text-gray-500 text-sm">{formatDate(user?.updatedAt)}</span>
                    </div>
                </div>

                {!user?.isVerified && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-yellow-700 text-sm">
                            <strong>Security Tip:</strong> Please verify your email address to secure your account and unlock all features.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}