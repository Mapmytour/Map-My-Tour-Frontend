'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    User,
    Settings,
    Shield,
    Calendar,
    Heart,
    Bell,
    CreditCard,
    Clock,
    Star,
    ShoppingCart
} from 'lucide-react';

interface NavigationItem {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    badge?: string | number;
}

const navigationItems: NavigationItem[] = [
    {
        href: '/user/profile',
        label: 'Profile',
        icon: User,
        description: 'Personal information and settings'
    },
    {
        href: '/user/bookings',
        label: 'My Bookings',
        icon: Calendar,
        description: 'View and manage your bookings'
    },
    {
        href: '/user/upcoming',
        label: 'Upcoming',
        icon: Clock,
        description: 'Your upcoming trips and tours'
    },
    {
        href: '/user/history',
        label: 'History',
        icon: Star,
        description: 'Past bookings and experiences'
    },
    {
        href: '/user/wishlist',
        label: 'Wishlist',
        icon: Heart,
        description: 'Saved tours and destinations'
    },
    {
        href: '/user/cart',
        label: 'Cart',
        icon: ShoppingCart,
        description: 'Items in your shopping cart'
    },
    {
        href: '/user/reviews',
        label: 'Reviews',
        icon: Star,
        description: 'Your reviews and ratings'
    },
    {
        href: '/user/notifications',
        label: 'Notifications',
        icon: Bell,
        description: 'Messages and updates'
    },
    {
        href: '/user/settings',
        label: 'Settings',
        icon: Settings,
        description: 'Account preferences and privacy'
    }
];

interface ProfileNavigationProps {
    className?: string;
}

export default function ProfileNavigation({ className = '' }: ProfileNavigationProps) {
    const pathname = usePathname();

    const isActive = (href: string) => {
        return pathname === href || pathname.startsWith(href + '/');
    };

    return (
        <nav className={`bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}>
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Account Menu</h2>
                <p className="text-gray-600 text-sm mt-1">Manage your account and preferences</p>
            </div>

            <div className="p-4">
                <div className="space-y-2">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${active
                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${active
                                        ? 'bg-white/20'
                                        : 'bg-gray-100 group-hover:bg-gray-200'
                                    }`}>
                                    <Icon className="w-5 h-5" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium truncate">{item.label}</p>
                                        {item.badge && (
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${active
                                                    ? 'bg-white/20 text-white'
                                                    : 'bg-purple-100 text-purple-800'
                                                }`}>
                                                {item.badge}
                                            </span>
                                        )}
                                    </div>
                                    <p className={`text-xs truncate mt-0.5 ${active ? 'text-white/80' : 'text-gray-500'
                                        }`}>
                                        {item.description}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Quick Stats */}
            <div className="p-4 border-t border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">12</div>
                        <div className="text-xs text-gray-600">Total Bookings</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-bold text-pink-600">3</div>
                        <div className="text-xs text-gray-600">Upcoming Trips</div>
                    </div>
                </div>
            </div>
        </nav>
    );
}