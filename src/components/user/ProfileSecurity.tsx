'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import {
    Lock,
    Eye,
    EyeOff,
    Shield,
    Key,
    AlertTriangle,
    CheckCircle,
    Clock,
    Trash2,
    Save,
    RefreshCw
} from 'lucide-react';

interface PasswordChangeData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export default function ProfileSecurity() {
    const { user, changePassword, deleteAccount, isLoading, error, clearError } = useAuth();

    const [passwordData, setPasswordData] = useState<PasswordChangeData>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [passwordStrength, setPasswordStrength] = useState(0);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const [changeSuccess, setChangeSuccess] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');

    // Password strength calculator
    useEffect(() => {
        const password = passwordData.newPassword;
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;
        setPasswordStrength(strength);
    }, [passwordData.newPassword]);

    // Clear success message after 3 seconds
    useEffect(() => {
        if (changeSuccess) {
            const timer = setTimeout(() => setChangeSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [changeSuccess]);

    // Clear error after 5 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => clearError(), 5000);
            return () => clearTimeout(timer);
        }
    }, [error, clearError]);

    const validateField = (field: string, value: string) => {
        const errors = { ...validationErrors };

        switch (field) {
            case 'currentPassword':
                if (!value) {
                    errors.currentPassword = 'Current password is required';
                } else {
                    delete errors.currentPassword;
                }
                break;
            case 'newPassword':
                if (value.length < 8) {
                    errors.newPassword = 'Password must be at least 8 characters';
                } else {
                    delete errors.newPassword;
                }
                break;
            case 'confirmPassword':
                if (value !== passwordData.newPassword) {
                    errors.confirmPassword = 'Passwords do not match';
                } else {
                    delete errors.confirmPassword;
                }
                break;
        }

        setValidationErrors(errors);
    };

    const handleInputChange = (field: keyof PasswordChangeData, value: string) => {
        setPasswordData(prev => ({ ...prev, [field]: value }));
        validateField(field, value);
        if (error) clearError();
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        // Validate all fields
        validateField('currentPassword', passwordData.currentPassword);
        validateField('newPassword', passwordData.newPassword);
        validateField('confirmPassword', passwordData.confirmPassword);

        if (Object.keys(validationErrors).length > 0) return;

        const result = await changePassword({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
            confirmPassword: passwordData.confirmPassword
        });

        if (result.success) {
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            setChangeSuccess(true);
        }
    };

    const handleDeleteAccount = async () => {
        if (!deletePassword) {
            return;
        }

        const result = await deleteAccount(deletePassword);
        if (result.success) {
            // User will be redirected by the deleteAccount function
        }
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

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Not available';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-8">
            {/* Success Message */}
            {changeSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 animate-fade-in">
                    <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <p className="text-green-700 text-sm font-medium">Password changed successfully!</p>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-fade-in">
                    <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <p className="text-red-700 text-sm font-medium">{error}</p>
                    </div>
                </div>
            )}

            {/* Change Password Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Lock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
                        <p className="text-gray-600 text-sm">Update your password to keep your account secure</p>
                    </div>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-6">
                    {/* Current Password */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Current Password</label>
                        <div className="relative">
                            <input
                                type={showPasswords.current ? 'text' : 'password'}
                                value={passwordData.currentPassword}
                                onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                                onFocus={() => setFocusedField('currentPassword')}
                                onBlur={() => setFocusedField(null)}
                                className={`w-full px-4 py-3 pr-12 bg-gray-50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${focusedField === 'currentPassword'
                                        ? 'border-purple-500 bg-white shadow-lg scale-[1.02]'
                                        : validationErrors.currentPassword
                                            ? 'border-red-500'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                placeholder="Enter your current password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            >
                                {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {validationErrors.currentPassword && (
                            <div className="flex items-center space-x-1">
                                <AlertTriangle className="w-4 h-4 text-red-500" />
                                <p className="text-red-500 text-sm">{validationErrors.currentPassword}</p>
                            </div>
                        )}
                    </div>

                    {/* New Password */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">New Password</label>
                        <div className="relative">
                            <input
                                type={showPasswords.new ? 'text' : 'password'}
                                value={passwordData.newPassword}
                                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                                onFocus={() => setFocusedField('newPassword')}
                                onBlur={() => setFocusedField(null)}
                                className={`w-full px-4 py-3 pr-12 bg-gray-50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${focusedField === 'newPassword'
                                        ? 'border-purple-500 bg-white shadow-lg scale-[1.02]'
                                        : validationErrors.newPassword
                                            ? 'border-red-500'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                placeholder="Enter your new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            >
                                {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Password Strength Indicator */}
                        {passwordData.newPassword && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Password strength:</span>
                                    <span className={`text-sm font-semibold ${passwordStrength <= 25 ? 'text-red-500' :
                                            passwordStrength <= 50 ? 'text-yellow-500' :
                                                passwordStrength <= 75 ? 'text-blue-500' : 'text-green-500'
                                        }`}>
                                        {getPasswordStrengthText()}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                        style={{ width: `${passwordStrength}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {validationErrors.newPassword && (
                            <div className="flex items-center space-x-1">
                                <AlertTriangle className="w-4 h-4 text-red-500" />
                                <p className="text-red-500 text-sm">{validationErrors.newPassword}</p>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Confirm New Password</label>
                        <div className="relative">
                            <input
                                type={showPasswords.confirm ? 'text' : 'password'}
                                value={passwordData.confirmPassword}
                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                onFocus={() => setFocusedField('confirmPassword')}
                                onBlur={() => setFocusedField(null)}
                                className={`w-full px-4 py-3 pr-12 bg-gray-50 border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none ${focusedField === 'confirmPassword'
                                        ? 'border-purple-500 bg-white shadow-lg scale-[1.02]'
                                        : validationErrors.confirmPassword
                                            ? 'border-red-500'
                                            : passwordData.confirmPassword && passwordData.confirmPassword === passwordData.newPassword
                                                ? 'border-green-500'
                                                : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                placeholder="Confirm your new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            >
                                {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>

                            {/* Password Match Indicator */}
                            {passwordData.confirmPassword && (
                                <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                                    {passwordData.confirmPassword === passwordData.newPassword ? (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <AlertTriangle className="w-5 h-5 text-red-500" />
                                    )}
                                </div>
                            )}
                        </div>

                        {validationErrors.confirmPassword && (
                            <div className="flex items-center space-x-1">
                                <AlertTriangle className="w-4 h-4 text-red-500" />
                                <p className="text-red-500 text-sm">{validationErrors.confirmPassword}</p>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 flex items-center space-x-2 ${isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                    <span>Changing...</span>
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    <span>Change Password</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Account Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Account Information</h2>
                        <p className="text-gray-600 text-sm">Your account security details</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                            <CheckCircle className={`w-5 h-5 ${user?.isVerified ? 'text-green-500' : 'text-yellow-500'}`} />
                            <div>
                                <p className="font-medium text-gray-900">Email Verification</p>
                                <p className="text-sm text-gray-600">{user?.email}</p>
                            </div>
                        </div>
                        <span className={`text-sm font-semibold ${user?.isVerified ? 'text-green-600' : 'text-yellow-600'}`}>
                            {user?.isVerified ? 'Verified' : 'Unverified'}
                        </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                            <Clock className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="font-medium text-gray-900">Account Created</p>
                                <p className="text-sm text-gray-600">Member since</p>
                            </div>
                        </div>
                        <span className="text-sm font-medium text-gray-600">
                            {formatDate(user?.createdAt)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                            <Key className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="font-medium text-gray-900">Last Updated</p>
                                <p className="text-sm text-gray-600">Profile information</p>
                            </div>
                        </div>
                        <span className="text-sm font-medium text-gray-600">
                            {formatDate(user?.updatedAt)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Security Recommendations */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Key className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Security Recommendations</h2>
                        <p className="text-gray-600 text-sm">Keep your account secure with these best practices</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="font-medium text-gray-900">Strong Password</span>
                        </div>
                        <p className="text-gray-600 text-sm">Use a unique password with mixed characters</p>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                            {user?.isVerified ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                            )}
                            <span className="font-medium text-gray-900">Email Verification</span>
                        </div>
                        <p className="text-gray-600 text-sm">
                            {user?.isVerified ? 'Your email is verified' : 'Please verify your email address'}
                        </p>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="font-medium text-gray-900">Regular Updates</span>
                        </div>
                        <p className="text-gray-600 text-sm">Change your password regularly</p>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="font-medium text-gray-900">Secure Browsing</span>
                        </div>
                        <p className="text-gray-600 text-sm">Always log out from public devices</p>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white border-2 border-red-200 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Danger Zone</h2>
                        <p className="text-gray-600 text-sm">Irreversible actions for your account</p>
                    </div>
                </div>

                {!showDeleteConfirm ? (
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                        <div>
                            <p className="font-medium text-gray-900">Delete Account</p>
                            <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
                        </div>
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200"
                        >
                            Delete Account
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4 p-4 bg-red-50 rounded-xl">
                        <div className="text-center">
                            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                            <h3 className="text-lg font-semibold text-gray-900">Are you absolutely sure?</h3>
                            <p className="text-gray-600 text-sm mt-1">
                                This action cannot be undone. This will permanently delete your account and all associated data.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="text-sm font-semibold text-gray-700">
                                    Please enter your password to confirm:
                                </label>
                                <input
                                    type="password"
                                    value={deletePassword}
                                    onChange={(e) => setDeletePassword(e.target.value)}
                                    className="w-full mt-1 px-4 py-3 bg-white border-2 border-red-300 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500"
                                    placeholder="Enter your password"
                                />
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    onClick={() => {
                                        setShowDeleteConfirm(false);
                                        setDeletePassword('');
                                    }}
                                    className="flex-1 px-4 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={!deletePassword || isLoading}
                                    className={`flex-1 px-4 py-3 font-semibold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 ${!deletePassword || isLoading
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-red-600 text-white hover:bg-red-700'
                                        }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <RefreshCw className="w-4 h-4 animate-spin" />
                                            <span>Deleting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 className="w-4 h-4" />
                                            <span>Delete Account</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}