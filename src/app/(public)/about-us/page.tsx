import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">About Map My Tour</h1>
        
        <div className="prose prose-lg mx-auto">
          <p className="text-xl text-gray-600 text-center mb-12">
            We're passionate about creating unforgettable travel experiences that connect you with the world's most amazing destinations.
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h2>Our Story</h2>
              <p>Founded in 2020, Map My Tour began as a dream to make travel accessible and memorable for everyone. We believe that travel is not just about visiting places, but about creating connections, understanding cultures, and making memories that last a lifetime.</p>
            </div>
            <div className="relative h-64">
              <Image src="/about-story.jpg" alt="Our Story" fill className="object-cover rounded-lg" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="relative h-64 order-2 md:order-1">
              <Image src="/about-mission.jpg" alt="Our Mission" fill className="object-cover rounded-lg" />
            </div>
            <div className="order-1 md:order-2">
              <h2>Our Mission</h2>
              <p>To inspire and enable people to explore the world through carefully curated tours and experiences that are safe, sustainable, and transformative.</p>
            </div>
          </div>

          <div className="text-center">
            <h2>Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3>Sustainability</h3>
                <p>We're committed to responsible tourism that protects our planet.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3>Community</h3>
                <p>Supporting local communities and creating meaningful connections.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">⭐</div>
                <h3>Excellence</h3>
                <p>Delivering exceptional experiences that exceed expectations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}