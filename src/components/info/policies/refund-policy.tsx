'use client';

import React from 'react';
import { useInfo } from '@/hooks/use-info';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RefreshCw, Clock, DollarSign, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export const RefundPolicy: React.FC = () => {
  const { refundPolicy, policiesLoading, policiesError, getAllPolicies } = useInfo();

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

  if (!refundPolicy) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Refund policy not available.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <RefreshCw className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Refund & Cancellation Policy</h1>
      </div>

      {/* Refund Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Refund Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {refundPolicy.timeFrame.map((frame, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="font-medium">
                    {frame.hoursBeforeDeparture} hours before departure
                  </span>
                </div>
                <Badge variant={frame.percentageRefund === 100 ? "default" : "secondary"}>
                  {frame.percentageRefund}% refund
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cancellation Fees */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Cancellation Fees
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {refundPolicy.cancellationFees.flatFee && (
            <div className="flex items-center justify-between p-3 bg-muted rounded">
              <span>Flat Fee</span>
              <Badge variant="outline">${refundPolicy.cancellationFees.flatFee}</Badge>
            </div>
          )}
          {refundPolicy.cancellationFees.percentage && (
            <div className="flex items-center justify-between p-3 bg-muted rounded">
              <span>Percentage Fee</span>
              <Badge variant="outline">{refundPolicy.cancellationFees.percentage}%</Badge>
            </div>
          )}
          {refundPolicy.cancellationFees.minimumFee && (
            <div className="flex items-center justify-between p-3 bg-muted rounded">
              <span>Minimum Fee</span>
              <Badge variant="outline">${refundPolicy.cancellationFees.minimumFee}</Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Non-Refundable Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Non-Refundable Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {refundPolicy.nonRefundableItems.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Process */}
      <Card>
        <CardHeader>
          <CardTitle>Refund Process</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Request Method:</h4>
            <p>{refundPolicy.process.requestMethod}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Required Documentation:</h4>
            <ul className="list-disc list-inside space-y-1">
              {refundPolicy.process.documentationRequired.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Processing Time:</h4>
            <Badge variant="outline">{refundPolicy.process.processingTime}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Exceptions */}
      <Card>
        <CardHeader>
          <CardTitle>Exceptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              {refundPolicy.exceptions.forceMajeure ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <span>Force Majeure Events</span>
            </div>
            <div className="flex items-center gap-2">
              {refundPolicy.exceptions.medicalReasons ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <span>Medical Reasons</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
