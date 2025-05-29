import Image from 'next/image';
import BookingCard from '@/components/public/BookingCard';
import ReviewSection from '@/components/public/ReviewSection';
import TourGallery from '@/components/public/TourGallery';

export default function TourDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen">
      {/* Tour Hero */}
      <section className="relative h-96">
        <Image 
          src="/tour-hero.jpg" 
          alt="Tour Image" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">Himalayan Adventure Trek</h1>
          <p className="text-lg">7 Days • Adventure • Himalayas</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tour Details */}
          <div className="lg:col-span-2">
            <div className="prose max-w-none">
              <h2>Tour Overview</h2>
              <p>Experience the breathtaking beauty of the Himalayas on this 7-day adventure trek. Perfect for adventure enthusiasts looking to challenge themselves while enjoying stunning mountain vistas.</p>
              
              <h3>Highlights</h3>
              <ul>
                <li>Trek through pristine mountain trails</li>
                <li>Visit ancient monasteries</li>
                <li>Experience local culture and cuisine</li>
                <li>Professional guide and safety equipment included</li>
              </ul>

              <h3>Itinerary</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold">Day 1: Arrival and Base Camp</h4>
                  <p>Arrive at base camp, equipment check, and orientation.</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold">Day 2-3: Mountain Trail</h4>
                  <p>Begin trekking through beautiful mountain landscapes.</p>
                </div>
                {/* More days... */}
              </div>
            </div>

            <TourGallery />
            <ReviewSection />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <BookingCard tourId={params.id} />
          </div>
        </div>
      </div>
    </div>
  );
}