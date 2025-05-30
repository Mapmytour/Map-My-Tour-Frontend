'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  Shield, 
  FileText, 
  Phone, 
  RefreshCw,
  Truck,
  CreditCard,
  Cookie,
  MapPin,
  AlertCircle,
  Users,
  Scale
} from 'lucide-react';
import Link from 'next/link';

const infoPages = [
  {
    title: 'FAQ',
    description: 'Frequently asked questions and answers',
    icon: HelpCircle,
    href: '/info/faq',
    color: 'text-blue-500'
  },
  {
    title: 'Privacy Policy',
    description: 'How we protect and use your personal information',
    icon: Shield,
    href: '/info/privacy-policy',
    color: 'text-green-500'
  },
  {
    title: 'Terms & Conditions',
    description: 'Legal terms and conditions for using our services',
    icon: FileText,
    href: '/info/terms-and-conditions',
    color: 'text-purple-500'
  },
  {
    title: 'Refund Policy',
    description: 'Cancellation and refund procedures',
    icon: RefreshCw,
    href: '/info/refund-cancellation-policy',
    color: 'text-orange-500'
  },
  {
    title: 'Shipping Policy',
    description: 'Delivery methods and shipping information',
    icon: Truck,
    href: '/info/shipping-delivery-policy',
    color: 'text-blue-600'
  },
  {
    title: 'Payment Security',
    description: 'How we secure your payments and transactions',
    icon: CreditCard,
    href: '/info/payment-security-policy',
    color: 'text-green-600'
  },
  {
    title: 'Cookie Policy',
    description: 'Information about cookies and tracking',
    icon: Cookie,
    href: '/info/cookie-policy',
    color: 'text-yellow-600'
  },
  {
    title: 'Travel Guidelines',
    description: 'Important travel information and requirements',
    icon: MapPin,
    href: '/info/travel-guidelines',
    color: 'text-red-500'
  },
  {
    title: 'Legal Contact',
    description: 'Contact information for legal inquiries',
    icon: Scale,
    href: '/info/legal-contact',
    color: 'text-gray-600'
  },
  {
    title: 'Customer Support',
    description: 'Get help and support for your queries',
    icon: Phone,
    href: '/info/support',
    color: 'text-indigo-500'
  },
  {
    title: 'Customer Rights',
    description: 'Your rights as our customer',
    icon: Users,
    href: '/info/customer-rights',
    color: 'text-pink-500'
  },
  {
    title: 'Disclaimer',
    description: 'Legal disclaimers and limitations',
    icon: AlertCircle,
    href: '/info/disclaimer',
    color: 'text-red-600'
  }
];

export default function InfoPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Information Center</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Find all the information you need about our services, policies, and support options.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {infoPages.map((page, index) => {
          const Icon = page.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icon className={`h-6 w-6 ${page.color}`} />
                  {page.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{page.description}</p>
                <Button asChild className="w-full">
                  <Link href={page.href}>
                    View Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Need More Help?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/info/support">
                Contact Support
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/info/faq">
                Browse FAQ
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}