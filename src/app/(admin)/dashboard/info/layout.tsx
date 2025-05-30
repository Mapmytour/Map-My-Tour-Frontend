'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HelpCircle, FileText, Phone, BarChart3 } from 'lucide-react';

export default function AdminInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const navItems = [
    {
      label: 'Overview',
      href: '/dashboard/info',
      icon: BarChart3,
      active: pathname === '/dashboard/info'
    },
    {
      label: 'FAQ Management',
      href: '/dashboard/info/faq',
      icon: HelpCircle,
      active: pathname.startsWith('/dashboard/info/faq')
    },
    {
      label: 'Policies',
      href: '/dashboard/info/policies',
      icon: FileText,
      active: pathname.startsWith('/dashboard/info/policies')
    },
    {
      label: 'Contact Info',
      href: '/dashboard/info/contact',
      icon: Phone,
      active: pathname.startsWith('/dashboard/info/contact')
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Information Management</h1>
          <p className="text-muted-foreground">
            Manage FAQs, policies, and contact information
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-2">
          <nav className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.href}
                  variant={item.active ? "default" : "ghost"}
                  asChild
                  className="flex items-center gap-2"
                >
                  <Link href={item.href}>
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </nav>
        </CardContent>
      </Card>

      {children}
    </div>
  );
}
