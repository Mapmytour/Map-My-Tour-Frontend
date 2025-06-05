'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import {
    User,
    Mail,
    Phone,
    Calendar,
    MapPin,
    Edit2,
    Camera,
    Shield,
    CheckCircle,
    AlertCircle,
    Crown
} from 'lucide-react';

interface ProfileHeaderProps {
    onEditClick?: () => void;
}

export default function ProfileHeader({ onEditClick }: ProfileHeaderProps) {
    const { user, uploadAvatar } = useAuth();
    const [uploadingAvatar, setUploadingAvatar] = useState(false);

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type and size
        if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
            return;
        }

        setUploadingAvatar(true);
        await uploadAvatar(file);
        setUploadingAvatar(false);
    };

    const getInitials = (firstName?: string, lastName?: string) => {
        return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
    };

    const formatJoinDate = (dateString?: string) => {
        if (!dateString) return 'Recently joined';
        const date = new Date(dateString);
        return `Member since ${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
    };

    const getLocationString = () => {
        if (!user?.address) return null;
        const parts = [];
        if (user.address.city) parts.push(user.address.city);
        if (user.address.country) parts.push(user.address.country);
        return parts.join(', ') || null;
    };

    return (
        <div className="relative">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 rounded-3xl"></div>
            <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>

            {/* Content */}
            <div className="relative p-8 text-white">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">

                    {/* Left Section - Profile Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">

                        {/* Avatar */}
                        <div className="relative group">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                {user?.avatarUrl ? (
                                    <img
                                        src={user.avatarUrl}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-2xl sm:text-3xl font-bold text-white">
                                        {getInitials(user?.firstName, user?.lastName)}
                                    </span>
                                )}
                            </div>

                            {/* Upload Overlay */}
                            <label className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                />
                                <Camera className="w-6 h-6 text-white" />
                            </label>

                            {/* Uploading indicator */}
                            {uploadingAvatar && (
                                <div className="absolute inset-0 bg-black/70 rounded-2xl flex items-center justify-center">
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                </div>
                            )}
                        </div>

                        {/* User Info */}
                        <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                                <h1 className="text-2xl sm:text-3xl font-bold">
                                    {user?.firstName} {user?.lastName}
                                </h1>

                                {/* Verification Badge */}
                                {user?.isVerified ? (
                                    <div className="flex items-center space-x-1 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-2 py-1">
                                        <CheckCircle className="w-4 h-4 text-green-300" />
                                        <span className="text-green-300 text-xs font-medium">Verified</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-1 bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-2 py-1">
                                        <AlertCircle className="w-4 h-4 text-yellow-300" />
                                        <span className="text-yellow-300 text-xs font-medium">Unverified</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center space-x-2 text-white/80">
                                <Mail className="w-4 h-4" />
                                <span className="text-sm sm:text-base">{user?.email}</span>
                            </div>

                            {user?.phone && (
                                <div className="flex items-center space-x-2 text-white/80">
                                    <Phone className="w-4 h-4" />
                                    <span className="text-sm sm:text-base">{user.phone}</span>
                                </div>
                            )}

                            {getLocationString() && (
                                <div className="flex items-center space-x-2 text-white/80">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">{getLocationString()}</span>
                                </div>
                            )}

                            <div className="flex items-center space-x-2 text-white/70">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">{formatJoinDate(user?.createdAt)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Actions & Role */}
                    <div className="flex flex-col space-y-4">

                        {/* User Role */}
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 min-w-[200px]">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                                        {user?.role === 'admin' ? (
                                            <Crown className="w-4 h-4 text-white" />
                                        ) : (
                                            <User className="w-4 h-4 text-white" />
                                        )}
                                    </div>
                                    <span className="font-semibold text-white capitalize">
                                        {user?.role === 'admin' ? 'Admin' : 'User'}
                                    </span>
                                </div>
                                <Shield className="w-5 h-5 text-yellow-300 fill-current" />
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                                    <span className="text-white/80 text-xs">
                                        {user?.role === 'admin' ? 'Full Access' : 'Standard Access'}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                                    <span className="text-white/80 text-xs">Profile Management</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                                    <span className="text-white/80 text-xs">Security Settings</span>
                                </div>
                            </div>
                        </div>

                        {/* Edit Profile Button */}
                        {onEditClick && (
                            <button
                                onClick={onEditClick}
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-105"
                            >
                                <Edit2 className="w-4 h-4" />
                                <span className="font-medium">Edit Profile</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Account Stats Bar */}
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-white">
                            {user?.isVerified ? '✓' : '!'}
                        </div>
                        <div className="text-white/70 text-xs">Verification</div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-white capitalize">
                            {user?.role || 'User'}
                        </div>
                        <div className="text-white/70 text-xs">Account Type</div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-white">
                            {user?.preferences?.interests?.length || 0}
                        </div>
                        <div className="text-white/70 text-xs">Interests</div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-white">
                            {user?.createdAt ? Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)) : 0}
                        </div>
                        <div className="text-white/70 text-xs">Days Active</div>
                    </div>
                </div>
            </div>
        </div>
    );
}