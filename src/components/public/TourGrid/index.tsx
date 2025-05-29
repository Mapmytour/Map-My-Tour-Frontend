'use client';

import { useState, useEffect } from 'react';
import TourCard from '../TourCard';
import { Tour } from '@/types/tour';

export default function TourGrid() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch tours from API
    // Mock data for now
    const mockTours: Tour[] = [
      {
        id: '1',
        title: 'Himalayan Adventure Trek',
        slug: 'himalayan-adventure-trek',
        description: 'Experience the breathtaking beauty of the Himalayas',
        shortDescription: 'Amazing 7-day trek through pristine mountain trails',
        images: [
          { id: '1', url: '/tour1.jpg', alt: 'Himalayan Trek', isPrimary: true }
        ],
        price: { base: 15000, currency: 'INR' },
        duration: { days: 7, nights: 6 },
        category: { id: '1', name: 'Adventure', slug: 'adventure' },
        destination: { 
          id: '1', 
          name: 'Himalayas', 
          slug: 'himalayas', 
          country: 'India',
          coordinates: { lat: 28.5, lng: 77.2 }
        },
        difficulty: 'challenging',
        groupSize: { min: 4, max: 12 },
        included: ['Guide', 'Meals', 'Accommodation'],
        excluded: ['Transport to base'],
        itinerary: [],
        highlights: ['Mountain views', 'Local culture'],
        requirements: ['Good fitness level'],
        cancellationPolicy: '48 hours notice required',
        guide: {
          id: '1',
          name: 'John Guide',
          experience: 5,
          languages: ['English', 'Hindi'],
          specialization: ['Trekking'],
          rating: 4.8,
          bio: 'Experienced mountain guide'
        },
        availability: [],
        rating: { average: 4.8, count: 24 },
        reviews: [],
        status: 'active',
        featured: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      },
      // Add more mock tours...
    ];

    setTimeout(() => {
      setTours(mockTours);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-80"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map(tour => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
}