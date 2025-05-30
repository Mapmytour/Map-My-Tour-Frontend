'use client';

import React from 'react';
import { useInfo } from '@/hooks/use-info';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  FileText,
  ExternalLink,
  Copy
} from 'lucide-react';
import { toast } from 'sonner';

export const LegalContact: React.FC = () => {
  const { legalContact, contactLoading, contactError, getLegalContact } = useInfo();

  React.useEffect(() => {
    getLegalContact();
  }, [getLegalContact]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  if (contactLoading) {
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

  if (contactError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{contactError}</AlertDescription>
      </Alert>
    );
  }

  if (!legalContact) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Legal contact information not available.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Building className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Legal Contact Information</h1>
      </div>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Entity Name</h4>
              <p className="text-lg">{legalContact.entityName}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Registration Number</h4>
              <div className="flex items-center gap-2">
                <code className="px-2 py-1 bg-muted rounded text-sm">
                  {legalContact.registrationNumber}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(legalContact.registrationNumber, 'Registration number')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Registered Address</h4>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p>{legalContact.registeredAddress}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 p-0 h-auto"
                  onClick={() => copyToClipboard(legalContact.registeredAddress, 'Address')}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy Address
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Jurisdiction</h4>
            <Badge variant="outline" className="text-sm">
              {legalContact.jurisdiction}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Legal Representative */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Legal Representative
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <h4 className="font-semibold mb-1">Name</h4>
            <p>{legalContact.legalRepresentative.name}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Position</h4>
            <Badge variant="secondary">{legalContact.legalRepresentative.position}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Contact Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {legalContact.contactMethods.map((method, index) => {
              const getIcon = () => {
                switch (method.type) {
                  case 'email':
                    return <Mail className="h-4 w-4" />;
                  case 'phone':
                    return <Phone className="h-4 w-4" />;
                  case 'mail':
                    return <MapPin className="h-4 w-4" />;
                  case 'form':
                    return <FileText className="h-4 w-4" />;
                  default:
                    return <FileText className="h-4 w-4" />;
                }
              };

              const getHref = () => {
                switch (method.type) {
                  case 'email':
                    return `mailto:${method.value}`;
                  case 'phone':
                    return `tel:${method.value}`;
                  default:
                    return method.value.startsWith('http') ? method.value : `https://${method.value}`;
                }
              };

              return (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-3">
                    {getIcon()}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium capitalize">{method.type}</span>
                        {method.availableHours && (
                          <Badge variant="outline" className="text-xs">
                            {method.availableHours}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{method.value}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(method.value, method.type)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    {(method.type === 'email' || method.type === 'phone' || method.type === 'form') && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <a 
                          href={getHref()} 
                          target={method.type === 'form' ? '_blank' : undefined}
                          rel={method.type === 'form' ? 'noopener noreferrer' : undefined}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {legalContact.contactMethods
              .filter(m => m.type === 'email')
              .slice(0, 1)
              .map((emailMethod) => (
                <Button key="email" variant="outline" asChild className="h-auto p-4">
                  <a href={`mailto:${emailMethod.value}`} className="flex flex-col items-center gap-2">
                    <Mail className="h-6 w-6" />
                    <span>Send Email</span>
                  </a>
                </Button>
              ))}
            
            {legalContact.contactMethods
              .filter(m => m.type === 'phone')
              .slice(0, 1)
              .map((phoneMethod) => (
                <Button key="phone" variant="outline" asChild className="h-auto p-4">
                  <a href={`tel:${phoneMethod.value}`} className="flex flex-col items-center gap-2">
                    <Phone className="h-6 w-6" />
                    <span>Call Us</span>
                  </a>
                </Button>
              ))}

            <Button 
              variant="outline" 
              className="h-auto p-4"
              onClick={() => {
                const contactInfo = `${legalContact.entityName}\n${legalContact.registeredAddress}\nReg: ${legalContact.registrationNumber}`;
                copyToClipboard(contactInfo, 'Complete contact information');
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <Copy className="h-6 w-6" />
                <span>Copy Details</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
