import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Heart, Wifi, Car, Coffee, Utensils, IndianRupee } from 'lucide-react';
import Navigation from '../components/Navigation';

const Hotels: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [priceRange, setPriceRange] = useState('All');
  const [minRating, setMinRating] = useState(0);

  const categories = ['All', 'Budget', 'Mid-range', 'Luxury', 'Resort', 'Heritage'];
  const cities = ['All Cities', 'Delhi', 'Mumbai', 'Bangalore', 'Jaipur', 'Goa', 'Kerala'];
  const priceRanges = ['All', 'Under ₹2,000', '₹2,000-₹5,000', '₹5,000-₹10,000', '₹10,000+'];

  const hotels = [
    {
      id: 1,
      name: 'The Oberoi, New Delhi',
      location: 'New Delhi, Delhi',
      category: 'Luxury',
      rating: 4.8,
      reviews: 2840,
      priceRange: '₹15,000-₹25,000',
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
      amenities: ['Wifi', 'Car', 'Coffee', 'Utensils'],
      description: 'Luxury hotel in the heart of Delhi with world-class amenities.',
      liked: true,
      contact: '+91 11 2436 3030'
    },
    {
      id: 2,
      name: 'Backpacker Panda',
      location: 'Manali, Himachal Pradesh',
      category: 'Budget',
      rating: 4.2,
      reviews: 1560,
      priceRange: '₹800-₹1,500',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      amenities: ['Wifi', 'Coffee'],
      description: 'Budget-friendly hostel perfect for backpackers and solo travelers.',
      liked: false,
      contact: '+91 90188 88888'
    },
    {
      id: 3,
      name: 'Club Mahindra Goa',
      location: 'Varca, Goa',
      category: 'Resort',
      rating: 4.5,
      reviews: 3420,
      priceRange: '₹8,000-₹12,000',
      image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
      amenities: ['Wifi', 'Car', 'Coffee', 'Utensils'],
      description: 'Beautiful beach resort with stunning sea views and excellent facilities.',
      liked: false,
      contact: '+91 832 274 5555'
    },
    {
      id: 4,
      name: 'Heritage Hotel Jaipur',
      location: 'Jaipur, Rajasthan',
      category: 'Heritage',
      rating: 4.6,
      reviews: 1980,
      priceRange: '₹6,000-₹10,000',
      image: 'https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg',
      amenities: ['Wifi', 'Car', 'Coffee', 'Utensils'],
      description: 'Traditional Rajasthani palace converted into a luxury heritage hotel.',
      liked: true,
      contact: '+91 141 237 4637'
    },
    {
      id: 5,
      name: 'The Gateway Hotel',
      location: 'Marine Drive, Mumbai',
      category: 'Mid-range',
      rating: 4.3,
      reviews: 2650,
      priceRange: '₹4,000-₹7,000',
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      amenities: ['Wifi', 'Car', 'Coffee', 'Utensils'],
      description: 'Modern hotel with excellent connectivity to Mumbai\'s business districts.',
      liked: false,
      contact: '+91 22 6654 4444'
    },
    {
      id: 6,
      name: 'Coconut Creek Resort',
      location: 'Bogmalo, Goa',
      category: 'Resort',
      rating: 4.4,
      reviews: 1890,
      priceRange: '₹5,000-₹8,000',
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
      amenities: ['Wifi', 'Car', 'Coffee'],
      description: 'Serene beach resort surrounded by coconut palms and pristine beaches.',
      liked: true,
      contact: '+91 832 255 4455'
    }
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'Wifi': return Wifi;
      case 'Car': return Car;
      case 'Coffee': return Coffee;
      case 'Utensils': return Utensils;
      default: return Wifi;
    }
  };

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || hotel.category === selectedCategory;
    const matchesCity = selectedCity === 'All Cities' || hotel.location.includes(selectedCity);
    const matchesRating = hotel.rating >= minRating;
    
    // Price filtering logic would be implemented here
    const matchesPrice = true; // Simplified for demo

    return matchesSearch && matchesCategory && matchesCity && matchesRating && matchesPrice;
  });

  return (
    <div>
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hotels in India</h1>
          <p className="text-gray-600">Find the perfect accommodation for your stay</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search hotels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {priceRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <select
                value={minRating.toString()}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="0">All Ratings</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {filteredHotels.length} hotels
          </p>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition-all duration-200">
                  <Heart 
                    className={`w-4 h-4 ${hotel.liked ? 'text-red-500 fill-current' : 'text-gray-600'} hover:text-red-500`} 
                  />
                </div>
                <div className="absolute bottom-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {hotel.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{hotel.name}</h3>
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-gray-600 text-sm ml-1">{hotel.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{hotel.location}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{hotel.description}</p>
                
                <div className="flex items-center mb-4">
                  <IndianRupee className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-green-600 font-medium">{hotel.priceRange}</span>
                  <span className="text-gray-500 text-sm ml-1">per night</span>
                </div>
                
                {/* Amenities */}
                <div className="flex space-x-2 mb-4">
                  {hotel.amenities.map((amenity, index) => {
                    const IconComponent = getAmenityIcon(amenity);
                    return (
                      <div key={index} className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                        <IconComponent className="w-4 h-4 text-gray-600" />
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">{hotel.reviews.toLocaleString()} reviews</span>
                    <span className="text-xs text-gray-500">{hotel.contact}</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MapPin className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hotels found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotels;