'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Edit, Trash2 } from 'lucide-react';
import { FAQItem } from '@/types/info';

interface FAQCardProps {
  faq: FAQItem;
  onEdit?: (faq: FAQItem) => void;
  onDelete?: (faq: FAQItem) => void;
  showActions?: boolean;
  defaultOpen?: boolean;
}

export const FAQCard: React.FC<FAQCardProps> = ({
  faq,
  onEdit,
  onDelete,
  showActions = false,
  defaultOpen = false
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="space-y-2 flex-1">
              <CollapsibleTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer text-left">
                  <CardTitle className="text-lg flex-1">{faq.question}</CardTitle>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                  />
                </div>
              </CollapsibleTrigger>
              <div className="flex items-center gap-2">
                {faq.category && (
                  <Badge variant="secondary">{faq.category}</Badge>
                )}
                {faq.lastUpdated && (
                  <span className="text-sm text-muted-foreground">
                    Updated: {new Date(faq.lastUpdated).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            {showActions && (
              <div className="flex gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(faq);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(faq);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground whitespace-pre-wrap">{faq.answer}</p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default FAQCard;