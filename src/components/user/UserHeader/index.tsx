'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function UserHeader() {
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/user-avatar.jpg'
  });

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl">🗺️</div>
            <span className="text-xl font-bold">Map My Tour</span>
          </Link>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Link href="/user/notifications">
              <Button variant="ghost" size="sm" className="relative">
                🔔
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </Button>
            </Link>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            </div>

            {/* Logout */}
            <Button variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}