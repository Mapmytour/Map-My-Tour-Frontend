'use client';

import { FAQList } from '@/components/info/faq/faq-list';
import { FAQSearch } from '@/components/info/faq/faq-search';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export default function FAQPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <HelpCircle className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about our services, policies, and travel arrangements.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search FAQs</CardTitle>
        </CardHeader>
        <CardContent>
          <FAQSearch />
        </CardContent>
      </Card>

      <FAQList showActions={false} />
    </div>
  );
}