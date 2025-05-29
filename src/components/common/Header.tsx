'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Search, ShoppingBag, Heart, Phone, ArrowRight } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      name: 'Home',
      href: '/',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Home Travel', href: '/home-travel' },
        { name: 'Home Tour', href: '/home-tour' },
        { name: 'Home Agency', href: '/home-agency' },
        { name: 'Home Yacht', href: '/home-yacht' },
      ]
    },
    {
      name: 'About Us',
      href: '/about',
      hasDropdown: false
    },
    {
      name: 'Destinations',
      href: '/destinations',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Popular Destinations', href: '/destinations/popular' },
        { name: 'Adventure Tours', href: '/destinations/adventure' },
        { name: 'Cultural Experiences', href: '/destinations/cultural' },
        { name: 'Beach Holidays', href: '/destinations/beach' },
        { name: 'Mountain Escapes', href: '/destinations/mountain' },
      ]
    },
    {
      name: 'Services',
      href: '/services',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Tour Planning', href: '/services/planning' },
        { name: 'Hotel Booking', href: '/services/hotels' },
        { name: 'Flight Booking', href: '/services/flights' },
        { name: 'Travel Insurance', href: '/services/insurance' },
        { name: 'Car Rental', href: '/services/car-rental' },
      ]
    },
    {
      name: 'Trip',
      href: '/trip',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Day Trips', href: '/trip/day-trips' },
        { name: 'Weekend Getaways', href: '/trip/weekend' },
        { name: 'Extended Tours', href: '/trip/extended' },
        { name: 'Custom Packages', href: '/trip/custom' },
      ]
    },
    {
      name: 'Pages',
      href: '/pages',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Gallery', href: '/gallery' },
        { name: 'Testimonials', href: '/testimonials' },
        { name: 'Team', href: '/team' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'FAQ', href: '/faq' },
      ]
    },
    {
      name: 'Blog',
      href: '/blog',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Travel Tips', href: '/blog/tips' },
        { name: 'Destinations Guide', href: '/blog/destinations' },
        { name: 'Adventure Stories', href: '/blog/stories' },
        { name: 'Travel News', href: '/blog/news' },
      ]
    },
    {
      name: 'Contact Us',
      href: '/contact',
      hasDropdown: false
    }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
        : 'bg-white'
    }`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="flex justify-center items-center py-4">
                    <div className="relative">
                        <img
                        src="/logo.png"
                        alt="Logo"
                        className="w-20 sm:w-24 md:w-28 lg:w-32 object-contain"
                        />
                    </div>
                </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.hasDropdown ? item.name : null)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-1 text-gray-700 hover:text-cyan-600 font-medium transition-colors duration-200 py-2">
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  )}
                </button>

                {/* Dropdown Menu */}
                {item.hasDropdown && (
                  <div className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 transition-all duration-300 ${
                    activeDropdown === item.name 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible translate-y-2'
                  }`}>
                    <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45"></div>
                    {item.dropdownItems?.map((dropdownItem) => (
                      <button
                        key={dropdownItem.name}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:text-cyan-600 hover:bg-cyan-50 transition-colors duration-200"
                      >
                        {dropdownItem.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Section - Search, Wishlist, Cart, CTA */}
          <div className="flex items-center space-x-4">

            {/* Request Quote Button */}
            <button className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group">
              <span>Request A Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-200"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 py-4">
            <div className="container mx-auto px-4">
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <div key={item.name} className="border-b border-gray-100 last:border-b-0">
                    <button className="flex items-center justify-between w-full text-left py-3 text-gray-700 hover:text-cyan-600 transition-colors duration-200">
                      <span className="font-medium">{item.name}</span>
                      {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                    </button>
                    
                    {item.hasDropdown && (
                      <div className="pl-4 pb-2 space-y-1">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <button
                            key={dropdownItem.name}
                            className="block w-full text-left py-2 text-sm text-gray-600 hover:text-cyan-600 transition-colors duration-200"
                          >
                            {dropdownItem.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile CTA Section */}
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                <button className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-3 rounded-full font-semibold flex items-center justify-center space-x-2">
                  <span>Request A Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}