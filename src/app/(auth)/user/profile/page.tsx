'use client';

import React, { useState } from 'react';
import ProfileHeader from '@/components/user/ProfileHeader';
import ProfileForm from '@/components/user/ProfileForm';
import ProfileStats from '@/components/user/ProfileStats';
import ProfileSettings from '@/components/user/ProfileSettings';
import ProfileSecurity from '@/components/user/ProfileSecurity';
import {
  User,
  Settings,
  Shield,
  BarChart3
} from 'lucide-react';

type TabType = 'overview' | 'settings' | 'security';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs = [
    {
      id: 'overview' as TabType,
      label: 'Overview',
      icon: User,
      description: 'Manage your personal information'
    },
    {
      id: 'settings' as TabType,
      label: 'Settings',
      icon: Settings,
      description: 'Preferences and privacy settings'
    },
    {
      id: 'security' as TabType,
      label: 'Security',
      icon: Shield,
      description: 'Password and account security'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Profile Header */}
        <div className="mb-8">
          <ProfileHeader onEditClick={() => setActiveTab('overview')} />
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-2">
            <nav className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 text-left ${activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div>
                      <p className="font-semibold">{tab.label}</p>
                      <p className={`text-xs ${activeTab === tab.id ? 'text-white/80' : 'text-gray-500'
                        }`}>
                        {tab.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid">

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                    <p className="text-gray-600 text-sm">Update your profile details and personal information</p>
                  </div>
                </div>
                <ProfileForm />
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Account Settings</h2>
                    <p className="text-gray-600">Manage your preferences and privacy settings</p>
                  </div>
                </div>
                <ProfileSettings />
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Security & Privacy</h2>
                    <p className="text-gray-600">Manage your password and account security settings</p>
                  </div>
                </div>
                <ProfileSecurity />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}