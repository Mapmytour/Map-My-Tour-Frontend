'use client';

import React from 'react';
import { useInfo } from '@/hooks/use-info';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  Phone,
  HelpCircle
} from 'lucide-react';
import { PrivacyPolicy } from './privacy-policy';
import { TermsConditions } from './terms-conditions';

interface PolicySection {
  key: string;
  title: string;
  icon: React.ReactNode;
  component: React.ComponentType;
}

const policySections: PolicySection[] = [
  {
    key: 'privacy',
    title: 'Privacy Policy',
    icon: <Shield className="h-4 w-4" />,
    component: PrivacyPolicy
  },
  {
    key: 'terms',
    title: 'Terms & Conditions',
    icon: <FileText className="h-4 w-4" />,
    component: TermsConditions
  }
];

export const PolicyViewer: React.FC = () => {
  const { 
    getAllPolicies, 
    policiesLoading, 
    policiesError,
    privacyPolicy,
    termsAndConditions,
    refundPolicy,
    shippingPolicy,
    paymentSecurity,
    cookiePolicy,
    travelGuidelines,
    disclaimer,
    customerRights,
    insuranceLiability
  } = useInfo();

  const [activeTab, setActiveTab] = React.useState('privacy');

  React.useEffect(() => {
    getAllPolicies();
  }, [getAllPolicies]);

  if (policiesLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-10 w-full" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-1/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (policiesError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{policiesError}</AlertDescription>
      </Alert>
    );
  }

  const policyStats = [
    { label: 'Privacy Policy', available: !!privacyPolicy },
    { label: 'Terms & Conditions', available: !!termsAndConditions },
    { label: 'Refund Policy', available: !!refundPolicy },
    { label: 'Shipping Policy', available: !!shippingPolicy },
    { label: 'Payment Security', available: !!paymentSecurity },
    { label: 'Cookie Policy', available: !!cookiePolicy },
    { label: 'Travel Guidelines', available: !!travelGuidelines },
    { label: 'Disclaimer', available: !!disclaimer },
    { label: 'Customer Rights', available: !!customerRights },
    { label: 'Insurance & Liability', available: !!insuranceLiability },
  ];

  const availablePolicies = policyStats.filter(p => p.available).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Legal Policies</h1>
          <p className="text-muted-foreground">
            {availablePolicies} of {policyStats.length} policies available
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

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {policyStats.slice(0, 10).map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{stat.label}</p>
                  <Badge variant={stat.available ? "default" : "secondary"}>
                    {stat.available ? "Available" : "Missing"}
                  </Badge>
                </div>
                <div className={stat.available ? "text-green-500" : "text-gray-400"}>
                  {stat.available ? "✓" : "○"}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Policy Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
          <TabsTrigger value="terms" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Terms</span>
          </TabsTrigger>
          <TabsTrigger value="refund" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Refund</span>
          </TabsTrigger>
          <TabsTrigger value="shipping" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            <span className="hidden sm:inline">Shipping</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Payment</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="privacy">
          <PrivacyPolicy />
        </TabsContent>

        <TabsContent value="terms">
          <TermsConditions />
        </TabsContent>

        <TabsContent value="refund">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Refund & Cancellation Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              {refundPolicy ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Refund Timeline:</h4>
                    <div className="space-y-2">
                      {refundPolicy.timeFrame.map((frame, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                          <span>{frame.hoursBeforeDeparture} hours before</span>
                          <Badge>{frame.percentageRefund}% refund</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Cancellation Fees:</h4>
                    <div className="space-y-1">
                      {refundPolicy.cancellationFees.flatFee && (
                        <p>Flat Fee: ${refundPolicy.cancellationFees.flatFee}</p>
                      )}
                      {refundPolicy.cancellationFees.percentage && (
                        <p>Percentage: {refundPolicy.cancellationFees.percentage}%</p>
                      )}
                      {refundPolicy.cancellationFees.minimumFee && (
                        <p>Minimum Fee: ${refundPolicy.cancellationFees.minimumFee}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Non-Refundable Items:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {refundPolicy.nonRefundableItems.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Refund policy not available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping & Delivery Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              {shippingPolicy ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Processing Time:</h4>
                    <p>{shippingPolicy.processingTime}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Shipping Methods:</h4>
                    <div className="space-y-2">
                      {shippingPolicy.shippingMethods.map((method, index) => (
                        <div key={index} className="p-3 border rounded">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium">{method.name}</h5>
                            <Badge variant="outline">
                              {typeof method.cost === 'number' ? `$${method.cost}` : method.cost}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Delivery: {method.deliveryTime}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Available in: {method.availableRegions.join(', ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Shipping policy not available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Security Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              {paymentSecurity ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Accepted Payment Methods:</h4>
                    <div className="flex flex-wrap gap-2">
                      {paymentSecurity.acceptedMethods.map((method, index) => (
                        <Badge key={index} variant="outline">{method}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Encryption:</h4>
                    <p><strong>Type:</strong> {paymentSecurity.encryption.type}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {paymentSecurity.encryption.standards.map((standard, index) => (
                        <Badge key={index} variant="secondary">{standard}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Fraud Prevention:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {paymentSecurity.fraudPrevention.measures.map((measure, index) => (
                        <li key={index}>{measure}</li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-2 mt-2">
                      {paymentSecurity.fraudPrevention.monitoring ? (
                        <Badge variant="default">24/7 Monitoring</Badge>
                      ) : (
                        <Badge variant="secondary">No Monitoring</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Payment security policy not available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
