'use client';

import React from 'react';
import { useInfo } from '@/hooks/use-info';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { FAQForm } from './faq-form';
import { FAQSearch } from './faq-search';
import { FAQCard } from './faq-card';
import { EmptyState } from '../shared/empty-state';
import { FAQItem } from '@/types/info';
import { toast } from 'sonner';

export const FAQManager: React.FC = () => {
  const {
    filteredFAQs,
    selectedFAQ,
    faqsLoading,
    faqsError,
    getAllFAQs,
    deleteFAQ,
    setSelectedFAQ
  } = useInfo();

  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingFAQ, setEditingFAQ] = React.useState<FAQItem | null>(null);
  const [deletingFAQ, setDeletingFAQ] = React.useState<FAQItem | null>(null);

  React.useEffect(() => {
    getAllFAQs();
  }, [getAllFAQs]);

  const handleCreateNew = () => {
    setEditingFAQ(null);
    setIsFormOpen(true);
  };

  const handleEdit = (faq: FAQItem) => {
    setEditingFAQ(faq);
    setIsFormOpen(true);
  };

  const handleDelete = async (faq: FAQItem) => {
    setDeletingFAQ(faq);
  };

  const confirmDelete = async () => {
    if (!deletingFAQ) return;

    try {
      const result = await deleteFAQ(deletingFAQ.id);
      if (result.success) {
        toast.success('FAQ deleted successfully');
        setDeletingFAQ(null);
      } else {
        toast.error(result.error || 'Failed to delete FAQ');
      }
    } catch (error) {
      toast.error('Failed to delete FAQ');
    }
  };

  const handleFormSuccess = (faq: FAQItem) => {
    setIsFormOpen(false);
    setEditingFAQ(null);
    toast.success(editingFAQ ? 'FAQ updated successfully' : 'FAQ created successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">FAQ Management</h1>
          <p className="text-muted-foreground">
            Manage frequently asked questions and their categories
          </p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateNew}>
              <Plus className="h-4 w-4 mr-2" />
              Add FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingFAQ ? 'Edit FAQ' : 'Create New FAQ'}
              </DialogTitle>
            </DialogHeader>
            <FAQForm
              faq={editingFAQ || undefined}
              onSuccess={handleFormSuccess}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FAQSearch />
        </CardContent>
      </Card>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqsError && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-red-500">
                Error: {faqsError}
              </div>
            </CardContent>
          </Card>
        )}

        {faqsLoading && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">Loading FAQs...</div>
            </CardContent>
          </Card>
        )}

        {!faqsLoading && !faqsError && filteredFAQs.length === 0 && (
          <EmptyState
            icon={<Plus className="h-12 w-12" />}
            title="No FAQs Found"
            description="Get started by creating your first FAQ or adjust your search filters."
            action={{
              label: "Create First FAQ",
              onClick: handleCreateNew
            }}
          />
        )}

        {!faqsLoading && !faqsError && filteredFAQs.length > 0 && (
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <FAQCard
                key={faq.id}
                faq={faq}
                onEdit={handleEdit}
                onDelete={handleDelete}
                showActions={true}
              />
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingFAQ} onOpenChange={() => setDeletingFAQ(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete FAQ</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this FAQ? This action cannot be undone.
              <br />
              <br />
              <strong>Question:</strong> {deletingFAQ?.question}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};