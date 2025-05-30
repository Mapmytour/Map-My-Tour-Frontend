'use client';

import React from 'react';
import { useInfo } from '@/hooks/use-info';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Cookie, Settings, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export const CookiePolicy: React.FC = () => {
  const { cookiePolicy, policiesLoading, policiesError, getAllPolicies } = useInfo();

  React.useEffect(() => {
    getAllPolicies();
  }, [getAllPolicies]);

  if (policiesLoading) {
    return (
      <div className="space-y-6">
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

  if (policiesError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{policiesError}</AlertDescription>
      </Alert>
    );
  }

  if (!cookiePolicy) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Cookie policy not available.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Cookie className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Cookie Policy</h1>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Last Updated: {new Date(cookiePolicy.changes.lastUpdated).toLocaleDateString()}</p>
      </div>

      {/* Cookie Types */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Types of Cookies We Use</h2>
        {cookiePolicy.types.map((cookie, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{cookie.name}</CardTitle>
                <div className="flex gap-2">
                  <Badge variant={cookie.essential ? "destructive" : "secondary"}>
                    {cookie.essential ? "Essential" : "Optional"}
                  </Badge>
                  <Badge variant="outline">{cookie.duration}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{cookie.purpose}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cookie Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Cookie Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Browser Settings:</h4>
            <p className="text-muted-foreground">{cookiePolicy.management.browserSettings}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Opt-Out Options:</h4>
            <p className="text-muted-foreground">{cookiePolicy.management.optOut}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Consequences of Disabling:</h4>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{cookiePolicy.management.consequences}</AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Third Party Cookies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Third-Party Cookies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            {cookiePolicy.thirdParty.present ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
            <span>{cookiePolicy.thirdParty.present ? "Third-party cookies are used" : "No third-party cookies"}</span>
          </div>
          {cookiePolicy.thirdParty.present && (
            <div>
              <h4 className="font-semibold mb-2">Controls Available:</h4>
              <p className="text-muted-foreground">{cookiePolicy.thirdParty.controls}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Policy Changes */}
      <Card>
        <CardHeader>
          <CardTitle>Policy Updates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <h4 className="font-semibold mb-2">Notification Method:</h4>
            <Badge variant="outline">{cookiePolicy.changes.notificationMethod}</Badge>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Last Updated:</h4>
            <p className="text-muted-foreground">
              {new Date(cookiePolicy.changes.lastUpdated).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
