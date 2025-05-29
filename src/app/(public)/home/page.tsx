import TourCard from '@/components/public/TourCard';
import SearchFilters from '@/components/public/SearchFilters';

export default function HomePage() {
  const featuredTours = [
    { id: 1, title: "Himalayan Trek", price: 15000, duration: "7 days", image: "/trek1.jpg" },
    { id: 2, title: "Goa Beach Tour", price: 8000, duration: "4 days", image: "/beach1.jpg" },
    { id: 3, title: "Rajasthan Heritage", price: 12000, duration: "6 days", image: "/heritage1.jpg" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Explore Amazing Tours</h1>
          <p className="text-xl mb-8">Discover breathtaking destinations and create unforgettable memories</p>
          <SearchFilters />
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Tours</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredTours.map(tour => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Tour Categories</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🏔️</div>
              <h3 className="font-semibold">Adventure</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🏛️</div>
              <h3 className="font-semibold">Heritage</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🏖️</div>
              <h3 className="font-semibold">Beach</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="font-semibold">Nature</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}