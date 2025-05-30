'use client';

import React from 'react';
import { useInfo } from '@/hooks/use-info';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Shield, Eye, Cookie } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  const { privacyPolicy, policiesLoading, policiesError, getPrivacyPolicy } = useInfo();

  React.useEffect(() => {
    getPrivacyPolicy();
  }, [getPrivacyPolicy]);

  if (policiesLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-1/3" />
        {[...Array(4)].map((_, i) => (
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

  if (policiesError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{policiesError}</AlertDescription>
      </Alert>
    );
  }

  if (!privacyPolicy) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Privacy policy not available.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
      </div>

      <div className="grid gap-4 text-sm text-muted-foreground">
        <p>Effective Date: {new Date(privacyPolicy.effectiveDate).toLocaleDateString()}</p>
        <p>Last Updated: {new Date(privacyPolicy.lastUpdated).toLocaleDateString()}</p>
      </div>

      {/* Information Collection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Information We Collect
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Types of Information:</h4>
            <ul className="list-disc list-inside space-y-1">
              {privacyPolicy.informationCollection.types.map((type, index) => (
                <li key={index}>{type}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Collection Methods:</h4>
            <ul className="list-disc list-inside space-y-1">
              {privacyPolicy.informationCollection.methods.map((method, index) => (
                <li key={index}>{method}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Information Use */}
      <Card>
        <CardHeader>
          <CardTitle>How We Use Your Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1">
            {privacyPolicy.informationUse.map((use, index) => (
              <li key={index}>{use}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Data Sharing */}
      <Card>
        <CardHeader>
          <CardTitle>Data Sharing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              {privacyPolicy.dataSharing.withPartners ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <span>With Partners</span>
            </div>
            <div className="flex items-center gap-2">
              {privacyPolicy.dataSharing.withServiceProviders ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <span>With Service Providers</span>
            </div>
            <div className="flex items-center gap-2">
              {privacyPolicy.dataSharing.forLegalReasons ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <span>For Legal Reasons</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Rights */}
      <Card>
        <CardHeader>
          <CardTitle>Your Rights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(privacyPolicy.userRights).map(([right, enabled]) => (
              <div key={right} className="flex items-center gap-2">
                {enabled ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <span className="capitalize">{right.replace(/([A-Z])/g, ' $1').trim()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cookies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cookie className="h-5 w-5" />
            Cookies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            {privacyPolicy.cookies.use ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
            <span>We use cookies</span>
          </div>
          {privacyPolicy.cookies.use && (
            <>
              <div>
                <h4 className="font-semibold mb-2">Cookie Types:</h4>
                <div className="flex flex-wrap gap-2">
                  {privacyPolicy.cookies.types.map((type, index) => (
                    <Badge key={index} variant="secondary">{type}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Cookie Management:</h4>
                <p>{privacyPolicy.cookies.management}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Security Measures */}
      <Card>
        <CardHeader>
          <CardTitle>Security Measures</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1">
            {privacyPolicy.securityMeasures.map((measure, index) => (
              <li key={index}>{measure}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Children's Privacy */}
      <Card>
        <CardHeader>
          <CardTitle>Children's Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>Age Restriction: Under {privacyPolicy.childrenPrivacy.underAge} years</p>
          <div className="flex items-center gap-2">
            {privacyPolicy.childrenPrivacy.parentalConsentRequired ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
            <span>Parental consent required</span>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Email:</strong> {privacyPolicy.contactInformation.email}</p>
          {privacyPolicy.contactInformation.phone && (
            <p><strong>Phone:</strong> {privacyPolicy.contactInformation.phone}</p>
          )}
          {privacyPolicy.contactInformation.address && (
            <p><strong>Address:</strong> {privacyPolicy.contactInformation.address}</p>
          )}
        </CardContent>
      </Card>

      {/* Changes Notification */}
      <Card>
        <CardHeader>
          <CardTitle>Policy Changes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Notification Method:</strong> {privacyPolicy.changesNotification.method}</p>
          <p><strong>Notice Period:</strong> {privacyPolicy.changesNotification.noticePeriod}</p>
        </CardContent>
      </Card>
    </div>
  );
};
