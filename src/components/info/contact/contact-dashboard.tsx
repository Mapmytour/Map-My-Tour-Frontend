'use client';

import React from 'react';
import { useInfo } from '@/hooks/use-info';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, 
  Headphones, 
  Mail, 
  Phone, 
  MapPin,
  Clock,
  Globe,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { LegalContact } from './legal-contact';
import { Support } from './support';

export const ContactDashboard: React.FC = () => {
  const {
    legalContact,
    support,
    contactLoading,
    contactError,
    getAllContactInfo
  } = useInfo();

  React.useEffect(() => {
    getAllContactInfo();
  }, [getAllContactInfo]);

  const contactStats = [
    {
      title: 'Legal Contact',
      value: legalContact ? 'Available' : 'Missing',
      icon: Building,
      color: legalContact ? 'text-green-500' : 'text-red-500',
      description: legalContact?.entityName || 'Not configured'
    },
    {
      title: 'Support Channels',
      value: support?.channels.length || 0,
      icon: Headphones,
      color: 'text-blue-500',
      description: 'Contact methods'
    },
    {
      title: 'Languages',
      value: support?.languages.length || 0,
      icon: Globe,
      color: 'text-purple-500',
      description: 'Supported languages'
    },
    {
      title: 'Emergency Support',
      value: support?.emergency.available ? 'Available' : 'Not Available',
      icon: AlertTriangle,
      color: support?.emergency.available ? 'text-green-500' : 'text-red-500',
      description: '24/7 emergency line'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Contact Management</h1>
          <p className="text-muted-foreground">
            Manage legal contact information and customer support details
          </p>
        </div>
        <Button 
          onClick={() => getAllContactInfo(true)}
          disabled={contactLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${contactLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {contactStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {contactLoading ? '...' : stat.value}
                </div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Contact Methods */}
      {support && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Contact Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {support.channels.slice(0, 4).map((channel, index) => {
                const getIcon = () => {
                  switch (channel.type) {
                    case 'email': return <Mail className="h-5 w-5" />;
                    case 'phone': return <Phone className="h-5 w-5" />;
                    default: return <Headphones className="h-5 w-5" />;
                  }
                };

                const getHref = () => {
                  switch (channel.type) {
                    case 'email': return `mailto:${channel.value}`;
                    case 'phone': return `tel:${channel.value}`;
                    default: return channel.value.startsWith('http') ? channel.value : `https://${channel.value}`;
                  }
                };

                return (
                  <Card key={index} className="text-center">
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <div className="flex justify-center">
                          {getIcon()}
                        </div>
                        <h4 className="font-medium capitalize">{channel.type}</h4>
                        <p className="text-sm text-muted-foreground">{channel.value}</p>
                        <Badge variant="outline" className="text-xs">
                          {channel.responseTime}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="w-full"
                        >
                          <a href={getHref()}>Contact</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <Tabs defaultValue="legal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="legal">Legal Contact</TabsTrigger>
          <TabsTrigger value="support">Customer Support</TabsTrigger>
        </TabsList>

        <TabsContent value="legal">
          <LegalContact />
        </TabsContent>

        <TabsContent value="support">
          <Support />
        </TabsContent>
      </Tabs>
    </div>
  );
};
