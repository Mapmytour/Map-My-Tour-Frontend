'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useInfo } from '@/hooks/use-info';
import { 
  Shield, 
  FileText, 
  RefreshCw, 
  Truck, 
  CreditCard, 
  Cookie,
  MapPin,
  AlertCircle,
  Users,
  Scale,
  ChevronRight
} from 'lucide-react';

interface PolicyItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'available' | 'missing';
  lastUpdated?: Date;
  onClick: () => void;
}

export const AllPolicies: React.FC = () => {
  const {
    privacyPolicy,
    termsAndConditions,
    refundPolicy,
    shippingPolicy,
    paymentSecurity,
    cookiePolicy,
    travelGuidelines,
    disclaimer,
    customerRights,
    insuranceLiability,
    getAllPolicies,
    policiesLoading
  } = useInfo();

  const [selectedPolicy, setSelectedPolicy] = React.useState<string | null>(null);

  React.useEffect(() => {
    getAllPolicies();
  }, [getAllPolicies]);

  const policies: PolicyItem[] = [
    {
      title: 'Privacy Policy',
      description: 'How we collect, use, and protect your personal information',
      icon: <Shield className="h-5 w-5" />,
      status: privacyPolicy ? 'available' : 'missing',
      lastUpdated: privacyPolicy?.lastUpdated,
      onClick: () => setSelectedPolicy('privacy')
    },
    {
      title: 'Terms & Conditions',
      description: 'Legal terms governing the use of our services',
      icon: <FileText className="h-5 w-5" />,
      status: termsAndConditions ? 'available' : 'missing',
      lastUpdated: termsAndConditions?.effectiveDate,
      onClick: () => setSelectedPolicy('terms')
    },
    {
      title: 'Refund Policy',
      description: 'Cancellation and refund procedures and timelines',
      icon: <RefreshCw className="h-5 w-5" />,
      status: refundPolicy ? 'available' : 'missing',
      onClick: () => setSelectedPolicy('refund')
    },
    {
      title: 'Shipping Policy',
      description: 'Delivery methods, times, and shipping information',
      icon: <Truck className="h-5 w-5" />,
      status: shippingPolicy ? 'available' : 'missing',
      onClick: () => setSelectedPolicy('shipping')
    },
    {
      title: 'Payment Security',
      description: 'How we secure your payment information and transactions',
      icon: <CreditCard className="h-5 w-5" />,
      status: paymentSecurity ? 'available' : 'missing',
      onClick: () => setSelectedPolicy('payment')
    },
    {
      title: 'Cookie Policy',
      description: 'Information about cookies and tracking technologies',
      icon: <Cookie className="h-5 w-5" />,
      status: cookiePolicy ? 'available' : 'missing',
      lastUpdated: cookiePolicy?.changes.lastUpdated,
      onClick: () => setSelectedPolicy('cookies')
    },
    {
      title: 'Travel Guidelines',
      description: 'Important travel information and requirements',
      icon: <MapPin className="h-5 w-5" />,
      status: travelGuidelines ? 'available' : 'missing',
      onClick: () => setSelectedPolicy('travel')
    },
    {
      title: 'Disclaimer',
      description: 'Legal disclaimers and limitation of liability',
      icon: <AlertCircle className="h-5 w-5" />,
      status: disclaimer ? 'available' : 'missing',
      onClick: () => setSelectedPolicy('disclaimer')
    },
    {
      title: 'Customer Rights',
      description: 'Your rights as a customer and how to exercise them',
      icon: <Users className="h-5 w-5" />,
      status: customerRights ? 'available' : 'missing',
      onClick: () => setSelectedPolicy('rights')
    },
    {
      title: 'Insurance & Liability',
      description: 'Insurance coverage and liability information',
      icon: <Scale className="h-5 w-5" />,
      status: insuranceLiability ? 'available' : 'missing',
      onClick: () => setSelectedPolicy('insurance')
    }
  ];

  const availablePolicies = policies.filter(p => p.status === 'available').length;
  const completionRate = Math.round((availablePolicies / policies.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">All Policies</h1>
          <p className="text-muted-foreground">
            {availablePolicies} of {policies.length} policies available ({completionRate}% complete)
          </p>
        </div>
        <Button 
          onClick={() => getAllPolicies(true)}
          disabled={policiesLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${policiesLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Completion Progress</span>
              <span>{completionRate}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Policies Grid */}
      <div className="grid gap-4">
        {policies.map((policy, index) => (
          <Card 
            key={index} 
            className={`hover:shadow-md transition-all cursor-pointer ${
              selectedPolicy === policy.title.toLowerCase().replace(/\s+/g, '-') 
                ? 'ring-2 ring-primary' 
                : ''
            }`}
            onClick={policy.onClick}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    policy.status === 'available' 
                      ? 'bg-green-50 text-green-600' 
                      : 'bg-gray-50 text-gray-400'
                  }`}>
                    {policy.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{policy.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {policy.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={policy.status === 'available' ? "default" : "secondary"}>
                    {policy.status === 'available' ? "Available" : "Missing"}
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardHeader>
            {policy.lastUpdated && (
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground">
                  Last updated: {new Date(policy.lastUpdated).toLocaleDateString()}
                </p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{availablePolicies}</div>
              <div className="text-sm text-muted-foreground">Available Policies</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{policies.length - availablePolicies}</div>
              <div className="text-sm text-muted-foreground">Missing Policies</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{completionRate}%</div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
