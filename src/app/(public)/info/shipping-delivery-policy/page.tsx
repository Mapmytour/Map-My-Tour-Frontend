'use client';

import { useInfo } from '@/hooks/use-info';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Truck, Clock, MapPin, CreditCard } from 'lucide-react';
import { useEffect } from 'react';

export default function ShippingDeliveryPolicyPage() {
  const { shippingPolicy, policiesLoading, policiesError, getAllPolicies } = useInfo();

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

  if (policiesError) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <AlertDescription>{policiesError}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center gap-2">
        <Truck className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Shipping & Delivery Policy</h1>
      </div>

      {shippingPolicy ? (
        <div className="space-y-6">
          {/* Processing Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Processing Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">{shippingPolicy.processingTime}</p>
            </CardContent>
          </Card>

          {/* Shipping Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Available Shipping Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {shippingPolicy.shippingMethods.map((method, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-lg">{method.name}</h3>
                      <Badge variant="outline">
                        {typeof method.cost === 'number' ? `${method.cost}` : method.cost}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-2">
                      <strong>Delivery Time:</strong> {method.deliveryTime}
                    </p>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">Available in: {method.availableRegions.join(', ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* International Shipping */}
          <Card>
            <CardHeader>
              <CardTitle>International Shipping</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant={shippingPolicy.internationalShipping.available ? "default" : "secondary"}>
                    {shippingPolicy.internationalShipping.available ? "Available" : "Not Available"}
                  </Badge>
                </div>
                
                {shippingPolicy.internationalShipping.available && (
                  <>
                    {shippingPolicy.internationalShipping.restrictions.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Restrictions:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {shippingPolicy.internationalShipping.restrictions.map((restriction, index) => (
                            <li key={index}>{restriction}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="font-semibold mb-2">Additional Costs:</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          {shippingPolicy.internationalShipping.additionalCosts.customs && (
                            <Badge variant="outline">Customs Fees</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {shippingPolicy.internationalShipping.additionalCosts.taxes && (
                            <Badge variant="outline">Taxes</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {shippingPolicy.internationalShipping.additionalCosts.fees && (
                            <Badge variant="outline">Additional Fees</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>Order Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant={shippingPolicy.tracking.provided ? "default" : "secondary"}>
                    {shippingPolicy.tracking.provided ? "Tracking Provided" : "No Tracking"}
                  </Badge>
                </div>
                {shippingPolicy.tracking.notification && (
                  <p className="text-sm text-muted-foreground">
                    You will receive tracking notifications via email and SMS.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Returns */}
          <Card>
            <CardHeader>
              <CardTitle>Returns Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant={shippingPolicy.returns.allowed ? "default" : "secondary"}>
                    {shippingPolicy.returns.allowed ? "Returns Allowed" : "No Returns"}
                  </Badge>
                </div>
                {shippingPolicy.returns.allowed && (
                  <div className="space-y-2">
                    <p><strong>Time Limit:</strong> {shippingPolicy.returns.timeLimit}</p>
                    <p><strong>Condition Requirements:</strong> {shippingPolicy.returns.conditionRequirements}</p>
                    <p><strong>Process:</strong> {shippingPolicy.returns.process}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Shipping and delivery policy information is not available at this time.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}