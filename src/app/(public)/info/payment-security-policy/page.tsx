'use client';

import { useInfo } from '@/hooks/use-info';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CreditCard, Shield, Lock } from 'lucide-react';
import { useEffect } from 'react';

export default function PaymentSecurityPolicyPage() {
  const { paymentSecurity, policiesLoading, policiesError, getAllPolicies } = useInfo();

  useEffect(() => {
    getAllPolicies();
  }, [getAllPolicies]);

  if (policiesLoading) {
    return (
      <div className="container mx-auto py-8 space-y-6">
        <Skeleton className="h-8 w-1/3" />
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center gap-2">
        <CreditCard className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Payment & Security Policy</h1>
      </div>

      {paymentSecurity ? (
        <div className="space-y-6">
          {/* Accepted Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Accepted Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {paymentSecurity.acceptedMethods.map((method, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {method}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Encryption */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Encryption & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Encryption Type:</h4>
                <Badge variant="default">{paymentSecurity.encryption.type}</Badge>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Security Standards:</h4>
                <div className="flex flex-wrap gap-2">
                  {paymentSecurity.encryption.standards.map((standard, index) => (
                    <Badge key={index} variant="secondary">{standard}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Storage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Data Storage & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant={paymentSecurity.dataStorage.stored ? "destructive" : "default"}>
                  {paymentSecurity.dataStorage.stored ? "Data Stored" : "Data Not Stored"}
                </Badge>
              </div>
              {paymentSecurity.dataStorage.stored && (
                <>
                  <div>
                    <h4 className="font-semibold mb-2">Storage Method:</h4>
                    <p>{paymentSecurity.dataStorage.method}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Compliance Standards:</h4>
                    <div className="flex flex-wrap gap-2">
                      {paymentSecurity.dataStorage.compliance.map((standard, index) => (
                        <Badge key={index} variant="outline">{standard}</Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Fraud Prevention */}
          <Card>
            <CardHeader>
              <CardTitle>Fraud Prevention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Security Measures:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {paymentSecurity.fraudPrevention.measures.map((measure, index) => (
                    <li key={index}>{measure}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={paymentSecurity.fraudPrevention.monitoring ? "default" : "secondary"}>
                  {paymentSecurity.fraudPrevention.monitoring ? "24/7 Monitoring Active" : "No Monitoring"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Dispute Resolution */}
          <Card>
            <CardHeader>
              <CardTitle>Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Process:</strong> {paymentSecurity.disputeResolution.process}</p>
              <p><strong>Time Frame:</strong> {paymentSecurity.disputeResolution.timeFrame}</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Payment security policy information is not available at this time.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}