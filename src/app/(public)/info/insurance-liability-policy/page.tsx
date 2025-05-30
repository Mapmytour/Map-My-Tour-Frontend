'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export default function InsuranceLiabilityPolicyPage() {
  const title = "Insurance Liability Policy".replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-6 w-6" />
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold">Content Coming Soon</h3>
              <p className="text-muted-foreground">
                {title} information will be available soon. Please check back later.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}