'use client';

import React from 'react';
import { useInfo } from '@/hooks/use-info';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  HelpCircle, 
  Shield, 
  FileText, 
  Phone, 
  Users,
  Calendar,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

export const InfoStats: React.FC = () => {
  const {
    faqs,
    faqCategories,
    privacyPolicy,
    termsAndConditions,
    legalContact,
    support,
    faqsLoading,
    policiesLoading,
    contactLoading
  } = useInfo();

  const stats = [
    {
      title: 'Total FAQs',
      value: faqs.length,
      icon: HelpCircle,
      color: 'text-blue-500',
      loading: faqsLoading,
      description: `Across ${faqCategories.length} categories`
    },
    {
      title: 'FAQ Categories',
      value: faqCategories.length,
      icon: Users,
      color: 'text-green-500',
      loading: faqsLoading,
      description: 'Organized topics'
    },
    {
      title: 'Active Policies',
      value: [privacyPolicy, termsAndConditions].filter(Boolean).length,
      icon: Shield,
      color: 'text-purple-500',
      loading: policiesLoading,
      description: 'Legal documents'
    },
    {
      title: 'Support Channels',
      value: support?.channels.length || 0,
      icon: Phone,
      color: 'text-orange-500',
      loading: contactLoading,
      description: 'Contact methods'
    }
  ];

  const policyChecklist = [
    { name: 'Privacy Policy', available: !!privacyPolicy },
    { name: 'Terms & Conditions', available: !!termsAndConditions },
    { name: 'Legal Contact', available: !!legalContact },
    { name: 'Support Information', available: !!support },
  ];

  const completionRate = Math.round(
    (policyChecklist.filter(item => item.available).length / policyChecklist.length) * 100
  );

  return (
    <div className="space-y-6">
      {/* Main Stats */}
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
                  {stat.loading ? (
                    <Skeleton className="h-6 w-8" />
                  ) : (
                    stat.value
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Completion Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Completion Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Overall Progress</span>
              <Badge variant={completionRate === 100 ? "default" : "secondary"}>
                {completionRate}%
              </Badge>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <div className="space-y-2">
              {policyChecklist.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{item.name}</span>
                  <div className="flex items-center gap-1">
                    {item.available ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {faqs.slice(0, 5).map((faq) => (
                <div key={faq.id} className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="font-medium truncate">{faq.question}</p>
                    {faq.lastUpdated && (
                      <p className="text-muted-foreground text-xs">
                        Updated: {new Date(faq.lastUpdated).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {faqs.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No recent activity
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
