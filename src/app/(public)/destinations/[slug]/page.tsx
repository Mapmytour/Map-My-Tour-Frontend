import TourCard from '@/components/public/TourCard';

export default function DestinationDetailsPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen">
      {/* Destination Hero */}
      <section className="relative h-96 bg-cover bg-center" style={{backgroundImage: "url('/himalaya-bg.jpg')"}}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Himalayas</h1>
            <p className="text-xl">Where adventure meets serenity</p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Description */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">About Himalayas</h2>
          <p className="text-gray-600 leading-relaxed">
            The Himalayas offer some of the world's most spectacular trekking and adventure opportunities. 
            From beginner-friendly trails to challenging expeditions, there's something for every adventure seeker.
          </p>
        </div>

        {/* Tours in this destination */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Tours in Himalayas</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Tour cards will be mapped here */}
          </div>
        </div>
      </div>
    </div>
  );
}