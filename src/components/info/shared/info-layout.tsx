'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

interface InfoLayoutProps {
  title?: string;
  description?: string;
  loading?: boolean;
  error?: string | null;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export const InfoLayout: React.FC<InfoLayoutProps> = ({
  title,
  description,
  loading,
  error,
  children,
  actions
}) => {
  if (loading) {
    return (
      <div className="space-y-6">
        {title && <Skeleton className="h-8 w-1/3" />}
        {description && <Skeleton className="h-4 w-2/3" />}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      {(title || description || actions) && (
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            {title && <h1 className="text-3xl font-bold">{title}</h1>}
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Content */}
      {children}
    </div>
  );
};
