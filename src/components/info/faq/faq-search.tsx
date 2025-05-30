'use client';

import React from 'react';
import { useInfo } from '@/hooks/use-info';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';

export const FAQSearch: React.FC = () => {
  const {
    searchQuery,
    selectedCategory,
    faqCategories,
    filteredFAQs,
    filterFAQs
  } = useInfo();

  const handleSearchChange = (query: string) => {
    filterFAQs(query, selectedCategory || undefined);
  };

  const handleCategoryChange = (category: string | null) => {
    filterFAQs(searchQuery, category || undefined);
  };

  const clearFilters = () => {
    filterFAQs('', undefined);
  };

  const hasActiveFilters = searchQuery || selectedCategory;

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search FAQs by question, answer, or category..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-4"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium text-muted-foreground">Categories:</span>
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => handleCategoryChange(null)}
        >
          All
        </Button>
        {faqCategories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Active Filters & Results */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''}
          </span>
          {hasActiveFilters && (
            <>
              <span className="text-sm text-muted-foreground">•</span>
              <div className="flex items-center gap-1">
                {searchQuery && (
                  <Badge variant="secondary">
                    Search: "{searchQuery}"
                  </Badge>
                )}
                {selectedCategory && (
                  <Badge variant="secondary">
                    Category: {selectedCategory}
                  </Badge>
                )}
              </div>
            </>
          )}
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
          >
            <X className="h-4 w-4 mr-1" />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
};