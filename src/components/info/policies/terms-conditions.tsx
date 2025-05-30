'use client';

import React from 'react';
import { useInfo } from '@/hooks/use-info';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, FileText, Scale, AlertTriangle } from 'lucide-react';

export const TermsConditions: React.FC = () => {
  const { termsAndConditions, policiesLoading, policiesError, getTermsAndConditions } = useInfo();

  React.useEffect(() => {
    getTermsAndConditions();
  }, [getTermsAndConditions]);

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

  if (!termsAndConditions) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Terms and conditions not available.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <FileText className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Terms and Conditions</h1>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Effective Date: {new Date(termsAndConditions.effectiveDate).toLocaleDateString()}</p>
      </div>

      {/* Acceptance */}
      <Card>
        <CardHeader>
          <CardTitle>Acceptance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              {termsAndConditions.acceptance.byUsing ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <span>By Using Our Service</span>
            </div>
            <div className="flex items-center gap-2">
              {termsAndConditions.acceptance.bySigning ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <span>By Signing Agreement</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Obligations */}
      <Card>
        <CardHeader>
          <CardTitle>User Obligations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1">
            {termsAndConditions.userObligations.map((obligation, index) => (
              <li key={index}>{obligation}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Prohibited Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Prohibited Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1">
            {termsAndConditions.prohibitedActivities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Intellectual Property */}
      <Card>
        <CardHeader>
          <CardTitle>Intellectual Property</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Ownership:</h4>
            <p>{termsAndConditions.intellectualProperty.ownership}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Licenses:</h4>
            <ul className="list-disc list-inside space-y-1">
              {termsAndConditions.intellectualProperty.licenses.map((license, index) => (
                <li key={index}>{license}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Termination */}
      <Card>
        <CardHeader>
          <CardTitle>Termination</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              {termsAndConditions.termination.byCompany ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <span>Company Can Terminate</span>
            </div>
            <div className="flex items-center gap-2">
              {termsAndConditions.termination.byUser ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <span>User Can Terminate</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Consequences:</h4>
            <ul className="list-disc list-inside space-y-1">
              {termsAndConditions.termination.consequences.map((consequence, index) => (
                <li key={index}>{consequence}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card>
        <CardHeader>
          <CardTitle>Disclaimer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Warranties:</h4>
            <ul className="list-disc list-inside space-y-1">
              {termsAndConditions.disclaimer.warranties.map((warranty, index) => (
                <li key={index}>{warranty}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Liability Limitations:</h4>
            <ul className="list-disc list-inside space-y-1">
              {termsAndConditions.disclaimer.liabilityLimitations.map((limitation, index) => (
                <li key={index}>{limitation}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Governing Law */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Governing Law
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Jurisdiction:</strong> {termsAndConditions.governingLaw.jurisdiction}</p>
          <p><strong>Venue:</strong> {termsAndConditions.governingLaw.venue}</p>
        </CardContent>
      </Card>

      {/* Changes */}
      <Card>
        <CardHeader>
          <CardTitle>Changes to Terms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              {termsAndConditions.changes.notification ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <span>Notification Provided</span>
            </div>
            <div className="flex items-center gap-2">
              {termsAndConditions.changes.continuedUse ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <span>Continued Use = Acceptance</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
