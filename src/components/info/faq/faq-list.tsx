'use client';

import React from 'react';
import { useInfo } from '@/hooks/use-info';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, Plus, Filter, Edit, Trash2 } from 'lucide-react';
import { FAQItem } from '@/types/info';

interface FAQListProps {
  onEdit?: (faq: FAQItem) => void;
  onDelete?: (faq: FAQItem) => void;
  onCreateNew?: () => void;
  showActions?: boolean;
}

export const FAQList: React.FC<FAQListProps> = ({
  onEdit,
  onDelete,
  onCreateNew,
  showActions = false
}) => {
  const {
    filteredFAQs,
    faqsLoading,
    faqsError,
    searchQuery,
    selectedCategory,
    faqCategories,
    filterFAQs,
    getAllFAQs
  } = useInfo();

  React.useEffect(() => {
    getAllFAQs();
  }, [getAllFAQs]);

  const handleSearchChange = (query: string) => {
    filterFAQs(query, selectedCategory || undefined);
  };

  const handleCategoryChange = (category: string | null) => {
    filterFAQs(searchQuery, category || undefined);
  };

  if (faqsLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (faqsError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{faqsError}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        {showActions && (
          <Button onClick={onCreateNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add FAQ
          </Button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-md"
          />
        </div>
        <select
          value={selectedCategory || ''}
          onChange={(e) => handleCategoryChange(e.target.value || null)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Categories</option>
          {faqCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                No FAQs found. {searchQuery || selectedCategory ? 'Try adjusting your filters.' : ''}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredFAQs.map((faq) => (
            <Card key={faq.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                    {faq.category && (
                      <Badge variant="secondary">{faq.category}</Badge>
                    )}
                  </div>
                  {showActions && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit?.(faq)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete?.(faq)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
                {faq.lastUpdated && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Last updated: {new Date(faq.lastUpdated).toLocaleDateString()}
                  </p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};