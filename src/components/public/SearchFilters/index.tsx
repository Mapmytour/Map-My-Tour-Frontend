'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SearchParams } from '@/types/common';

export default function SearchFilters() {
  const [filters, setFilters] = useState<SearchParams>({
    query: '',
    category: '',
    location: '',
    priceMin: 0,
    priceMax: 50000,
    duration: '',
    difficulty: '',
  });

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Search filters:', filters);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Query */}
        <div>
          <Input
            placeholder="Search tours..."
            value={filters.query}
            onChange={(e) => setFilters({ ...filters, query: e.target.value })}
          />
        </div>

        {/* Category */}
        <div>
          <Select onValueChange={(value) => setFilters({ ...filters, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="adventure">Adventure</SelectItem>
              <SelectItem value="heritage">Heritage</SelectItem>
              <SelectItem value="beach">Beach</SelectItem>
              <SelectItem value="nature">Nature</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div>
          <Select onValueChange={(value) => setFilters({ ...filters, location: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Destination" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="himalayas">Himalayas</SelectItem>
              <SelectItem value="goa">Goa</SelectItem>
              <SelectItem value="rajasthan">Rajasthan</SelectItem>
              <SelectItem value="kerala">Kerala</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Duration */}
        <div>
          <Select onValueChange={(value) => setFilters({ ...filters, duration: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-3">1-3 Days</SelectItem>
              <SelectItem value="4-7">4-7 Days</SelectItem>
              <SelectItem value="8-14">8-14 Days</SelectItem>
              <SelectItem value="15+">15+ Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Button onClick={handleSearch} className="px-8">
          Search Tours 🔍
        </Button>
      </div>
    </div>
  );
}