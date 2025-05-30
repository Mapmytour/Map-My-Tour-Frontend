'use client';

import React from 'react';
import { useInfo } from '@/hooks/use-info';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  HelpCircle, 
  Shield, 
  FileText, 
  Phone, 
  BarChart3,
  RefreshCw,
  Plus,
  Settings,
  Eye
} from 'lucide-react';
import { FAQList } from '../faq/faq-list';
import { PolicyViewer } from '../policies/policy-viewer';
import { LegalContact } from '../contact/legal-contact';
import { Support } from '../contact/support';

export const InfoDashboard: React.FC = () => {
  const {
    faqs,
    privacyPolicy,
    termsAndConditions,
    legalContact,
    support,
    faqsLoading,
    policiesLoading,
    contactLoading,
    initializeInfoData
  } = useInfo();

  const [activeTab, setActiveTab] = React.useState('overview');

  React.useEffect(() => {
    initializeInfoData();
  }, [initializeInfoData]);

  const stats = [
    {
      title: 'Total FAQs',
      value: faqs.length,
      icon: HelpCircle,
      color: 'text-blue-500',
      loading: faqsLoading
    },
    {
      title: 'Privacy Policy',
      value: privacyPolicy ? 'Active' : 'Missing',
      icon: Shield,
      color: privacyPolicy ? 'text-green-500' : 'text-red-500',
      loading: policiesLoading
    },
    {
      title: 'Terms & Conditions',
      value: termsAndConditions ? 'Active' : 'Missing',
      icon: FileText,
      color: termsAndConditions ? 'text-green-500' : 'text-red-500',
      loading: policiesLoading
    },
    {
      title: 'Support Channels',
      value: support?.channels.length || 0,
      icon: Phone,
      color: 'text-purple-500',
      loading: contactLoading
    }
  ];

  const policyStatus = [
    { name: 'Privacy Policy', available: !!privacyPolicy },
    { name: 'Terms & Conditions', available: !!termsAndConditions },
    { name: 'Legal Contact', available: !!legalContact },
    { name: 'Support Info', available: !!support },
  ];

  const isLoading = faqsLoading || policiesLoading || contactLoading;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Information Management</h1>
          <p className="text-muted-foreground">
            Manage FAQs, policies, and contact information
          </p>
        </div>
        <Button 
          onClick={() => initializeInfoData()}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh All
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
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
                  {stat.loading ? '...' : stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {policyStatus.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm">{item.name}</span>
                <Badge variant={item.available ? "default" : "secondary"}>
                  {item.available ? "✓" : "○"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent FAQs */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent FAQs</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('faqs')}>
                    <Eye className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {faqs.slice(0, 5).map((faq) => (
                    <div key={faq.id} className="p-2 border rounded">
                      <p className="font-medium text-sm truncate">{faq.question}</p>
                      {faq.category && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          {faq.category}
                        </Badge>
                      )}
                    </div>
                  ))}
                  {faqs.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No FAQs available
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Policy Summary */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Policy Status</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('policies')}>
                    <Eye className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Privacy Policy</span>
                    <Badge variant={privacyPolicy ? "default" : "secondary"}>
                      {privacyPolicy ? "Active" : "Missing"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Terms & Conditions</span>
                    <Badge variant={termsAndConditions ? "default" : "secondary"}>
                      {termsAndConditions ? "Active" : "Missing"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Legal Contact</span>
                    <Badge variant={legalContact ? "default" : "secondary"}>
                      {legalContact ? "Available" : "Missing"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Support Info</span>
                    <Badge variant={support ? "default" : "secondary"}>
                      {support ? "Available" : "Missing"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="faqs">
          <FAQList showActions={true} />
        </TabsContent>

        <TabsContent value="policies">
          <PolicyViewer />
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid gap-6">
            <LegalContact />
            <Support />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
