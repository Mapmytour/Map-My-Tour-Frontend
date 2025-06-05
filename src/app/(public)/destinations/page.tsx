
export default function DestinationsPage() {
  const destinations = [
    { id: 1, name: "Himalayas", image: "/dest1.jpg", tourCount: 25 },
    { id: 2, name: "Goa", image: "/dest2.jpg", tourCount: 18 },
    { id: 3, name: "Rajasthan", image: "/dest3.jpg", tourCount: 32 },
    { id: 4, name: "Kerala", image: "/dest4.jpg", tourCount: 22 },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Popular Destinations</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          Destinations to explore
        </div>
      </div>
    </div>
  );
}