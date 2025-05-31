'use client';

import { useState } from 'react';
import { ChevronDownIcon, SearchIcon } from 'lucide-react';

type DropdownType = 'destination' | 'type' | 'duration' | 'category' | null;

export default function BookingSection() {
  // State for each dropdown
  const [destination, setDestination] = useState<string>('Select Destination');
  const [type, setType] = useState<string>('Adventure');
  const [duration, setDuration] = useState<string>('Duration');
  const [category, setCategory] = useState<string>('Luxury');
  
  // State to track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);
  
  // Toggle dropdown open/close
  const toggleDropdown = (dropdown: DropdownType) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  // Options for each dropdown
  const destinationOptions: string[] = ['Australia', 'Dubai', 'England', 'Sweden', 'Thailand', 'Egypt', 'Saudi Arab', 'Switzerland', 'Scandinavia', 'Western Europe', 'Indonesia', 'Italy'];
  const typeOptions: string[] = ['Beach', 'Group Tour', 'Couple Tour', 'Family Tour'];
  const durationOptions: string[] = ['1 day', '2 days', '3 days', '4 days', '5 days', '6 days', '7 days'];
  const categoryOptions: string[] = ['Delux', 'Economy'];

  return (
    <div className="booking-sec relative -mt-16 z-10 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto px-5">
        <form className="booking-form bg-white rounded-xl shadow-lg p-4 md:p-6 py-5 border-2 border-gray-900">
          <div className="input-wrap">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-2 items-center">
              {/* Destination Dropdown */}
              <div className="relative">
                <div className="flex items-center border-b border-gray-200 pb-2">
                  <div className="icon mr-3">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                    </svg>
                  </div>
                  <div className="search-input flex-grow">
                    <label className="block text-xs text-gray-500 font-medium">Destination</label>
                    <div 
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleDropdown('destination')}
                    >
                      <span className="text-sm font-medium">{destination}</span>
                      <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </div>
                {openDropdown === 'destination' && (
                  <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    <ul className="py-1">
                      {destinationOptions.map((option) => (
                        <li 
                          key={option} 
                          className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setDestination(option);
                            setOpenDropdown(null);
                          }}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Type Dropdown */}
              <div className="relative">
                <div className="flex items-center border-b border-gray-200 pb-2">
                  <div className="icon mr-3">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </div>
                  <div className="search-input flex-grow">
                    <label className="block text-xs text-gray-500 font-medium">Type</label>
                    <div 
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleDropdown('type')}
                    >
                      <span className="text-sm font-medium">{type}</span>
                      <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </div>
                {openDropdown === 'type' && (
                  <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    <ul className="py-1">
                      <li 
                        className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setType('Adventure');
                          setOpenDropdown(null);
                        }}
                      >
                        Adventure
                      </li>
                      {typeOptions.map((option) => (
                        <li 
                          key={option} 
                          className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setType(option);
                            setOpenDropdown(null);
                          }}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Duration Dropdown */}
              <div className="relative">
                <div className="flex items-center border-b border-gray-200 pb-2">
                  <div className="icon mr-3">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className="search-input flex-grow">
                    <label className="block text-xs text-gray-500 font-medium">Duration</label>
                    <div 
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleDropdown('duration')}
                    >
                      <span className="text-sm font-medium">{duration}</span>
                      <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </div>
                {openDropdown === 'duration' && (
                  <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    <ul className="py-1">
                      {durationOptions.map((option) => (
                        <li 
                          key={option} 
                          className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setDuration(option);
                            setOpenDropdown(null);
                          }}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Tour Category Dropdown */}
              <div className="relative">
                <div className="flex items-center border-b border-gray-200 pb-2">
                  <div className="icon mr-3">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div className="search-input flex-grow">
                    <label className="block text-xs text-gray-500 font-medium">Tour Category</label>
                    <div 
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleDropdown('category')}
                    >
                      <span className="text-sm font-medium">{category}</span>
                      <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </div>
                {openDropdown === 'category' && (
                  <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    <ul className="py-1">
                      <li 
                        className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setCategory('Luxury');
                          setOpenDropdown(null);
                        }}
                      >
                        Luxury
                      </li>
                      {categoryOptions.map((option) => (
                        <li 
                          key={option} 
                          className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setCategory(option);
                            setOpenDropdown(null);
                          }}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Search Button */}
              <div className="form-btn mt-2 lg:mt-0 flex justify-center">
                <button 
                  type="button" 
                  className="bg-black text-white rounded-full flex items-center justify-center w-full md:w-auto px-8 py-3 font-medium"
                >
                  <SearchIcon className="mr-2 h-5 w-5" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}