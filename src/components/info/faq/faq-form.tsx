'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useInfo } from '@/hooks/use-info';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FAQItem } from '@/types/info';
import { Loader2 } from 'lucide-react';

const faqSchema = z.object({
  question: z.string().min(1, 'Question is required').max(500, 'Question is too long'),
  answer: z.string().min(1, 'Answer is required').max(2000, 'Answer is too long'),
  category: z.string().optional(),
});

type FAQFormData = z.infer<typeof faqSchema>;

interface FAQFormProps {
  faq?: FAQItem;
  onSuccess?: (faq: FAQItem) => void;
  onCancel?: () => void;
}

export const FAQForm: React.FC<FAQFormProps> = ({
  faq,
  onSuccess,
  onCancel
}) => {
  const { createFAQ, updateFAQItem, isLoading, error, faqCategories } = useInfo();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FAQFormData>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: faq?.question || '',
      answer: faq?.answer || '',
      category: faq?.category || '',
    }
  });

  const onSubmit = async (data: FAQFormData) => {
    try {
      let result;
      if (faq) {
        // Update existing FAQ
        result = await updateFAQItem({
          id: faq.id,
          ...data
        });
      } else {
        // Create new FAQ
        result = await createFAQ(data);
      }

      if (result.success && result.data) {
        onSuccess?.(result.data);
        if (!faq) {
          reset();
        }
      }
    } catch (error) {
      console.error('Failed to save FAQ:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{faq ? 'Edit FAQ' : 'Create New FAQ'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="question">Question *</Label>
            <Input
              id="question"
              {...register('question')}
              placeholder="Enter the question..."
            />
            {errors.question && (
              <p className="text-sm text-destructive">{errors.question.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="answer">Answer *</Label>
            <Textarea
              id="answer"
              {...register('answer')}
              placeholder="Enter the answer..."
              rows={6}
            />
            {errors.answer && (
              <p className="text-sm text-destructive">{errors.answer.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              {...register('category')}
              placeholder="Enter category (optional)"
              list="categories"
            />
            <datalist id="categories">
              {faqCategories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
            {errors.category && (
              <p className="text-sm text-destructive">{errors.category.message}</p>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="flex-1"
            >
              {(isSubmitting || isLoading) && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              {faq ? 'Update FAQ' : 'Create FAQ'}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting || isLoading}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};