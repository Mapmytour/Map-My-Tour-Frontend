import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl">🗺️</div>
              <span className="text-xl font-bold">Map My Tour</span>
            </div>
            <p className="text-gray-400 mb-4">
              Discover amazing destinations and create unforgettable memories with our curated tours and experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">📘</a>
              <a href="#" className="text-gray-400 hover:text-white">📷</a>
              <a href="#" className="text-gray-400 hover:text-white">🐦</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/public/home" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link href="/public/tours" className="text-gray-400 hover:text-white">Tours</Link></li>
              <li><Link href="/public/destinations" className="text-gray-400 hover:text-white">Destinations</Link></li>
              <li><Link href="/public/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link href="/public/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/public/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              <li><Link href="/public/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link href="/public/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/public/contact" className="text-gray-400 hover:text-white">Help Center</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center space-x-2">
                <span>📍</span>
                <span>123 Adventure Street, Travel City</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✉️</span>
                <span>info@mapmytour.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Map My Tour. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}