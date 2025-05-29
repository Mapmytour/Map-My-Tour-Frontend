import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tour } from '@/types/tour';

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  const primaryImage = tour.images.find(img => img.isPrimary) || tour.images[0];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Tour Image */}
      <div className="relative h-48">
        <Image
          src={primaryImage?.url || '/placeholder-tour.jpg'}
          alt={tour.title}
          fill
          className="object-cover"
        />
        {tour.featured && (
          <Badge className="absolute top-2 left-2 bg-yellow-500">
            Featured
          </Badge>
        )}
        <Badge className="absolute top-2 right-2 bg-black/70 text-white">
          {tour.duration.days} Days
        </Badge>
      </div>

      {/* Tour Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary">{tour.category.name}</Badge>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm font-medium">{tour.rating.average}</span>
            <span className="text-sm text-gray-500">({tour.rating.count})</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{tour.title}</h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {tour.shortDescription}
        </p>

        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="mr-4">📍 {tour.destination.name}</span>
          <span>👥 Max {tour.groupSize.max}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-blue-600">
              ₹{tour.price.base.toLocaleString()}
            </span>
            {tour.price.discounted && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ₹{tour.price.discounted.toLocaleString()}
              </span>
            )}
            <div className="text-sm text-gray-500">per person</div>
          </div>
          
          <Link href={`/public/tours/${tour.id}`}>
            <Button size="sm">View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}