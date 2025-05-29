'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  { label: 'Tours', href: '/admin/tours', icon: '🗺️' },
  { label: 'Bookings', href: '/admin/bookings', icon: '📅' },
  { label: 'Users', href: '/admin/users', icon: '👥' },
  { label: 'Reviews', href: '/admin/reviews', icon: '⭐' },
  { label: 'Analytics', href: '/admin/analytics', icon: '📈' },
  { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-900 text-white h-screen sticky top-0">
      <div className="p-6">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>
      
      <nav className="px-4 pb-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
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