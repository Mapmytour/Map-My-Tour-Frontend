import TourFilters from '@/components/public/TourFilters';
import TourGrid from '@/components/public/TourGrid';
import Pagination from '@/components/public/Pagination';

export default function ToursPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">All Tours</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <TourFilters />
          </div>
          
          {/* Tours Grid */}
          <div className="lg:w-3/4">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">Showing 1-12 of 156 tours</p>
              <select className="border rounded-lg px-3 py-2">
                <option>Sort by: Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Duration</option>
              </select>
            </div>
            
            <TourGrid />
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}