'use client';

import React from 'react';
import { useInfo } from '@/hooks/use-info';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Headphones, 
  Mail, 
  Phone, 
  MessageCircle, 
  Ticket,
  Clock,
  AlertTriangle,
  Globe,
  ExternalLink,
  Copy
} from 'lucide-react';
import { toast } from 'sonner';

export const Support: React.FC = () => {
  const { support, contactLoading, contactError, getSupport } = useInfo();

  React.useEffect(() => {
    getSupport();
  }, [getSupport]);

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

  if (!support) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Support information not available.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'phone':
        return <Phone className="h-4 w-4" />;
      case 'chat':
        return <MessageCircle className="h-4 w-4" />;
      case 'ticket':
        return <Ticket className="h-4 w-4" />;
      default:
        return <Headphones className="h-4 w-4" />;
    }
  };

  const getChannelHref = (type: string, value: string) => {
    switch (type) {
      case 'email':
        return `mailto:${value}`;
      case 'phone':
        return `tel:${value}`;
      default:
        return value.startsWith('http') ? value : `https://${value}`;
    }
  };

  const getResponseTimeColor = (responseTime: string) => {
    const time = responseTime.toLowerCase();
    if (time.includes('immediate') || time.includes('instant')) return 'bg-green-100 text-green-800';
    if (time.includes('hour') || time.includes('1-2')) return 'bg-blue-100 text-blue-800';
    if (time.includes('24') || time.includes('day')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Headphones className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Customer Support</h1>
      </div>

      {/* Support Channels */}
      <div className="grid gap-4">
        {support.channels.map((channel, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getChannelIcon(channel.type)}
                <span className="capitalize">{channel.type} Support</span>
                <Badge 
                  variant="secondary" 
                  className={getResponseTimeColor(channel.responseTime)}
                >
                  {channel.responseTime}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-1 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Availability
                  </h4>
                  <p className="text-sm text-muted-foreground">{channel.availability}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Contact Information</h4>
                  <div className="flex items-center gap-2">
                    <code className="px-2 py-1 bg-muted rounded text-sm">
                      {channel.value}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(channel.value, `${channel.type} contact`)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                {(channel.type === 'email' || channel.type === 'phone' || channel.type === 'chat' || channel.type === 'ticket') && (
                  <Button
                    variant="outline"
                    asChild
                  >
                    <a 
                      href={getChannelHref(channel.type, channel.value)}
                      target={channel.type === 'chat' || channel.type === 'ticket' ? '_blank' : undefined}
                      rel={channel.type === 'chat' || channel.type === 'ticket' ? 'noopener noreferrer' : undefined}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Contact via {channel.type}
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Support Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* FAQ Access */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              FAQ Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {support.faqAccess ? (
                  <Badge variant="default">Available</Badge>
                ) : (
                  <Badge variant="secondary">Not Available</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {support.faqAccess 
                  ? "Self-service FAQ section available for quick answers."
                  : "FAQ section is currently not available."
                }
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Emergency Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {support.emergency.available ? (
                  <Badge variant="destructive">24/7 Available</Badge>
                ) : (
                  <Badge variant="secondary">Not Available</Badge>
                )}
              </div>
              {support.emergency.available && (
                <>
                  <p className="text-sm text-muted-foreground">
                    Emergency contact available 24/7
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="px-2 py-1 bg-muted rounded text-sm">
                      {support.emergency.contact}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(support.emergency.contact, 'Emergency contact')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    asChild
                  >
                    <a href={`tel:${support.emergency.contact}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call Emergency
                    </a>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Language Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Language Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Support available in {support.languages.length} language{support.languages.length !== 1 ? 's' : ''}:
              </p>
              <div className="flex flex-wrap gap-1">
                {support.languages.map((language, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {language}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Contact Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {support.channels.slice(0, 4).map((channel, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4"
                asChild={channel.type === 'email' || channel.type === 'phone' || channel.type === 'chat' || channel.type === 'ticket'}
              >
                {channel.type === 'email' || channel.type === 'phone' || channel.type === 'chat' || channel.type === 'ticket' ? (
                  <a 
                    href={getChannelHref(channel.type, channel.value)}
                    target={channel.type === 'chat' || channel.type === 'ticket' ? '_blank' : undefined}
                    rel={channel.type === 'chat' || channel.type === 'ticket' ? 'noopener noreferrer' : undefined}
                    className="flex flex-col items-center gap-2"
                  >
                    {getChannelIcon(channel.type)}
                    <span className="capitalize">{channel.type}</span>
                  </a>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    {getChannelIcon(channel.type)}
                    <span className="capitalize">{channel.type}</span>
                  </div>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
