'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import {
    Bell,
    Mail,
    MessageSquare,
    Shield,
    Eye,
    Smartphone,
    Save,
    CheckCircle,
    AlertCircle,
    Plus,
    X
} from 'lucide-react';

interface SettingsData {
    notifications: {
        email: boolean;
        sms: boolean;
        push: boolean;
    };
    privacy: {
        profileVisible: boolean;
        showBookingHistory: boolean;
    };
    interests: string[];
}

export default function ProfileSettings() {
    const { user, updateProfile, isLoading } = useAuth();
    const [settings, setSettings] = useState<SettingsData>({
        notifications: {
            email: true,
            sms: false,
            push: true,
        },
        privacy: {
            profileVisible: true,
            showBookingHistory: false,
        },
        interests: []
    });

    const [hasChanges, setHasChanges] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState('notifications');
    const [newInterest, setNewInterest] = useState('');

    // Load user preferences
    useEffect(() => {
        if (user?.preferences) {
            setSettings({
                notifications: user.preferences.notifications || settings.notifications,
                privacy: user.preferences.privacy || settings.privacy,
                interests: user.preferences.interests || []
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

    const handleSettingChange = (category: keyof SettingsData, key: string, value: any) => {
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: value
            }
        }));
        setHasChanges(true);
    };

    const handleAddInterest = () => {
        if (newInterest.trim() && !settings.interests.includes(newInterest.trim())) {
            setSettings(prev => ({
                ...prev,
                interests: [...prev.interests, newInterest.trim()]
            }));
            setNewInterest('');
            setHasChanges(true);
        }
    };

    const handleRemoveInterest = (interestToRemove: string) => {
        setSettings(prev => ({
            ...prev,
            interests: prev.interests.filter(interest => interest !== interestToRemove)
        }));
        setHasChanges(true);
    };

    const handleSave = async () => {
        const updateData = {
            preferences: {
                notifications: settings.notifications,
                privacy: settings.privacy,
                interests: settings.interests
            }
        };

        const result = await updateProfile(updateData);
        if (result.success) {
            setSaveSuccess(true);
            setHasChanges(false);
        }
    };

    const tabs = [
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'privacy', label: 'Privacy', icon: Shield },
        { id: 'interests', label: 'Interests', icon: MessageSquare },
    ];

    return (
        <div className="space-y-6">
            {/* Success Message */}
            {saveSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 animate-fade-in">
                    <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <p className="text-green-700 text-sm font-medium">Settings saved successfully!</p>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === tab.id
                                            ? 'border-purple-500 text-purple-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                                <div className="space-y-4">

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center space-x-3">
                                            <Mail className="w-5 h-5 text-gray-600" />
                                            <div>
                                                <p className="font-medium text-gray-900">Email Notifications</p>
                                                <p className="text-sm text-gray-600">Receive updates via email</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={settings.notifications.email}
                                                onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center space-x-3">
                                            <Smartphone className="w-5 h-5 text-gray-600" />
                                            <div>
                                                <p className="font-medium text-gray-900">SMS Notifications</p>
                                                <p className="text-sm text-gray-600">Receive text messages for important updates</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={settings.notifications.sms}
                                                onChange={(e) => handleSettingChange('notifications', 'sms', e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center space-x-3">
                                            <Bell className="w-5 h-5 text-gray-600" />
                                            <div>
                                                <p className="font-medium text-gray-900">Push Notifications</p>
                                                <p className="text-sm text-gray-600">Receive push notifications on your device</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={settings.notifications.push}
                                                onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Privacy Tab */}
                    {activeTab === 'privacy' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
                                <div className="space-y-4">

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center space-x-3">
                                            <Eye className="w-5 h-5 text-gray-600" />
                                            <div>
                                                <p className="font-medium text-gray-900">Profile Visibility</p>
                                                <p className="text-sm text-gray-600">Allow others to view your profile</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={settings.privacy.profileVisible}
                                                onChange={(e) => handleSettingChange('privacy', 'profileVisible', e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center space-x-3">
                                            <Shield className="w-5 h-5 text-gray-600" />
                                            <div>
                                                <p className="font-medium text-gray-900">Show Booking History</p>
                                                <p className="text-sm text-gray-600">Display your travel history to others</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={settings.privacy.showBookingHistory}
                                                onChange={(e) => handleSettingChange('privacy', 'showBookingHistory', e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Interests Tab */}
                    {activeTab === 'interests' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Interests</h3>

                                {/* Add Interest */}
                                <div className="flex space-x-3 mb-6">
                                    <input
                                        type="text"
                                        value={newInterest}
                                        onChange={(e) => setNewInterest(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
                                        className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white"
                                        placeholder="Add a new interest..."
                                    />
                                    <button
                                        onClick={handleAddInterest}
                                        disabled={!newInterest.trim()}
                                        className={`px-4 py-3 rounded-xl font-semibold text-white transition-all duration-200 flex items-center space-x-2 ${newInterest.trim()
                                                ? 'bg-purple-600 hover:bg-purple-700'
                                                : 'bg-gray-300 cursor-not-allowed'
                                            }`}
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span>Add</span>
                                    </button>
                                </div>

                                {/* Interest Tags */}
                                <div className="space-y-3">
                                    {settings.interests.length > 0 ? (
                                        <div className="flex flex-wrap gap-3">
                                            {settings.interests.map((interest, index) => (
                                                <div
                                                    key={index}
                                                    className="inline-flex items-center space-x-2 px-3 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                                                >
                                                    <span>{interest}</span>
                                                    <button
                                                        onClick={() => handleRemoveInterest(interest)}
                                                        className="text-purple-600 hover:text-purple-800 transition-colors duration-200"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                            <p className="text-gray-500">No interests added yet</p>
                                            <p className="text-gray-400 text-sm">Add some interests to personalize your experience</p>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                    <div className="flex items-start space-x-2">
                                        <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                                        <div className="text-sm text-blue-700">
                                            <p className="font-medium">About Interests</p>
                                            <p className="mt-1">Add your interests to help us provide better recommendations and connect you with relevant content.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Save Button */}
                    {hasChanges && (
                        <div className="flex justify-end pt-6 border-t border-gray-200">
                            <button
                                onClick={handleSave}
                                disabled={isLoading}
                                className={`px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 flex items-center space-x-2 ${isLoading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                                    }`}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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
                    )}
                </div>
            </div>
        </div>
    );
}