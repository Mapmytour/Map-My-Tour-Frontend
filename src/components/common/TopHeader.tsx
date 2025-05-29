'use client';

import React, { useEffect, useState } from 'react';
import { MapPin, Clock, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

// Configuration object with default address text
const headerConfig = {
    contactInfo: {
        address: {
            text: '45 New Eskaton Road, Austria',
            icon: MapPin,
            iconGradient: 'from-cyan-500 to-teal-500'
        },
        hours: {
            text: 'Sun to Friday: 8:00 am - 7:00 pm',
            icon: Clock,
            iconGradient: 'from-blue-500 to-cyan-500'
        }
    },
    links: {
        faq: '/faq',
        support: '/support',
        auth: {
            login: '/auth/login',
            register: '/auth/register'
        }
    }
};

export default function TopHeader() {
    const router = useRouter();
    const { contactInfo, links } = headerConfig;
    const [addressText, setAddressText] = useState(contactInfo.address.text);
    const [error, setError] = useState<string | null>(null);
    const [timeText, setTimeText] = useState('');

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation not supported');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await res.json();
                    setAddressText(data.display_name || contactInfo.address.text);
                } catch (err) {
                    setError('Failed to fetch address');
                }
            },
            () => {
                setError('Unable to retrieve your location');
            }
        );
    }, []);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const formatted = now.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            setTimeText(formatted);
        };

        updateTime(); // initial
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval); // cleanup
    }, []);


    return (
        <div className="z-50 bg-gradient-to-r from-slate-800 to-slate-900 text-white py-2 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-xl"></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-teal-400/20 to-cyan-400/20 rounded-full blur-lg"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">

                    {/* Left Section - Contact Info */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6">
                        {/* Address - hidden on mobile, shown on tablet and up */}
                        <div className="hidden sm:flex items-center gap-2 text-sm">
                            <div className={`w-8 h-8 bg-gradient-to-br ${contactInfo.address.iconGradient} rounded-full flex items-center justify-center`}>
                                <contactInfo.address.icon className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-gray-300">{error || addressText}</span>
                        </div>

                        {/* Hours - hidden on mobile and tablet, shown on desktop */}
                        <div className="hidden lg:flex items-center gap-2 text-sm">
                            <div className={`w-8 h-8 bg-gradient-to-br ${contactInfo.hours.iconGradient} rounded-full flex items-center justify-center`}>
                                <contactInfo.hours.icon className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-gray-300">{timeText || contactInfo.hours.text}</span>
                        </div>
                    </div>

                    {/* Right Section - Links and Auth */}
                    <div className="flex items-center gap-4 lg:gap-6">
                        {/* FAQ */}
                        <button
                            onClick={() => router.push(links.faq)}
                            className="text-sm text-gray-300 hover:text-white transition-colors duration-200 px-3 py-1 rounded-md hover:bg-white/10"
                        >
                            FAQ
                        </button>

                        <div className="hidden sm:block w-px h-4 bg-gray-600"></div>

                        {/* Support */}
                        <button
                            onClick={() => router.push(links.support)}
                            className="text-sm text-gray-300 hover:text-white transition-colors duration-200 px-3 py-1 rounded-md hover:bg-white/10"
                        >
                            Support
                        </button>

                        <div className="hidden sm:block w-px h-4 bg-gray-600"></div>

                        {/* Sign In/Register */}
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <div className="flex items-center gap-1 text-sm">
                                <button
                                    onClick={() => router.push(links.auth.login)}
                                    className="text-gray-300 hover:text-white transition-colors duration-200 px-2 py-1 rounded hover:bg-white/10"
                                >
                                    Sign In
                                </button>
                                <span className="text-gray-500">/</span>
                                <button
                                    onClick={() => router.push(links.auth.register)}
                                    className="text-gray-300 hover:text-white transition-colors duration-200 px-2 py-1 rounded hover:bg-white/10"
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}