import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-cover bg-center" 
               style={{backgroundImage: "url('/hero-bg.jpg')"}}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <h1 className="text-6xl font-bold mb-6">Map My Tour</h1>
          <p className="text-xl mb-8">Discover Your Next Adventure</p>
          <div className="space-x-4">
            <Link href="/public/home" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-semibold">
              Explore Tours
            </Link>
            <Link href="/public/auth/register" className="border-2 border-white hover:bg-white hover:text-black px-8 py-3 rounded-lg text-lg font-semibold">
              Join Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Map My Tour?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                🗺️
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Planning</h3>
              <p>Plan your perfect trip with our intuitive tools and expert recommendations.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                🏔️
              </div>
              <h3 className="text-xl font-semibold mb-3">Adventure Tours</h3>
              <p>From trekking to cultural tours, find adventures that match your spirit.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                👥
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p>Connect with fellow travelers and share your amazing experiences.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}