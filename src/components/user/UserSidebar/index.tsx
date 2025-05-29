'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: 'Profile', href: '/user/profile', icon: '👤' },
  { label: 'My Bookings', href: '/user/bookings', icon: '📅' },
  { label: 'Shopping Cart', href: '/user/cart', icon: '🛒' },
  { label: 'Wishlist', href: '/user/wishlist', icon: '❤️' },
  { label: 'Travel History', href: '/user/history', icon: '📜' },
  { label: 'Upcoming Tours', href: '/user/upcoming', icon: '🚀' },
  { label: 'Reviews', href: '/user/reviews', icon: '⭐' },
  { label: 'Notifications', href: '/user/notifications', icon: '🔔' },
  { label: 'Settings', href: '/user/settings', icon: '⚙️' },
];

export default function UserSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-lg h-screen sticky top-0">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
      </div>
      
      <nav className="px-4 pb-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}