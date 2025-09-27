import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Heart, Clock, IndianRupee, Map } from 'lucide-react';
import Navigation from '../components/Navigation';

const TouristPlaces: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedState, setSelectedState] = useState('All States');
  const [priceRange, setPriceRange] = useState('All');
  const [minRating, setMinRating] = useState(0);

  const categories = ['All', 'Historical', 'Beaches', 'Adventure', 'Shopping', 'Religious', 'Nature'];
  const states = ['All States', 'Rajasthan', 'Kerala', 'Goa', 'Uttar Pradesh', 'Himachal Pradesh', 'Tamil Nadu'];
  const priceRanges = ['All', 'Free', 'Under ₹50', '₹50-₹200', '₹200+'];

  const places = [
    {
      id: 1,
      name: 'Taj Mahal',
      location: 'Agra, Uttar Pradesh',
      category: 'Historical',
      rating: 4.8,
      reviews: 15420,
      entryFee: 50,
      openTime: '6:00 AM - 6:00 PM',
      image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg',
      description: 'A symbol of eternal love and one of the Seven Wonders of the World.',
      liked: true
    },
    {
      id: 2,
      name: 'Kerala Backwaters',
      location: 'Alleppey, Kerala',
      category: 'Nature',
      rating: 4.7,
      reviews: 8920,
      entryFee: 0,
      openTime: 'All day',
      image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg',
      description: 'Serene network of waterways perfect for houseboat cruising.',
      liked: false
    },
    {
      id: 3,
      name: 'Baga Beach',
      location: 'North Goa, Goa',
      category: 'Beaches',
      rating: 4.5,
      reviews: 12350,
      entryFee: 0,
      openTime: 'All day',
      image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg',
      description: 'Famous beach known for water sports and vibrant nightlife.',
      liked: false
    },
    {
      id: 4,
      name: 'Golden Temple',
      location: 'Amritsar, Punjab',
      category: 'Religious',
      rating: 4.9,
      reviews: 18670,
      entryFee: 0,
      openTime: '24 hours',
      image: 'https://images.pexels.com/photos/3581876/pexels-photo-3581876.jpeg',
      description: 'Sacred Sikh temple known for its golden dome and spiritual ambiance.',
      liked: true
    },
    {
      id: 5,
      name: 'Hawa Mahal',
      location: 'Jaipur, Rajasthan',
      category: 'Historical',
      rating: 4.6,
      reviews: 9840,
      entryFee: 50,
      openTime: '9:00 AM - 4:30 PM',
      image: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg',
      description: 'Palace of Winds with distinctive pink sandstone architecture.',
      liked: false
    },
    {
      id: 6,
      name: 'Manali',
      location: 'Himachal Pradesh',
      category: 'Adventure',
      rating: 4.4,
      reviews: 11230,
      entryFee: 0,
      openTime: 'All day',
      image: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg',
      description: 'Popular hill station perfect for trekking and adventure sports.',
      liked: true
    },
    {
      id: 7,
      name: 'Red Fort',
      location: 'Delhi',
      category: 'Historical',
      rating: 4.3,
      reviews: 22450,
      entryFee: 35,
      openTime: '9:30 AM - 4:30 PM',
      image: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg',
      description: 'Magnificent Mughal fortress and UNESCO World Heritage Site.',
      liked: false
    },
    {
      id: 8,
      name: 'Mysore Palace',
      location: 'Mysore, Karnataka',
      category: 'Historical',
      rating: 4.5,
      reviews: 18920,
      entryFee: 70,
      openTime: '10:00 AM - 5:30 PM',
      image: 'https://images.pexels.com/photos/3581876/pexels-photo-3581876.jpeg',
      description: 'Opulent royal palace known for its Indo-Saracenic architecture.',
      liked: true
    },
    {
      id: 9,
      name: 'Varanasi Ghats',
      location: 'Varanasi, Uttar Pradesh',
      category: 'Religious',
      rating: 4.7,
      reviews: 16780,
      entryFee: 0,
      openTime: '24 hours',
      image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg',
      description: 'Sacred steps leading to the holy Ganges River.',
      liked: false
    },
    {
      id: 10,
      name: 'Ladakh',
      location: 'Jammu & Kashmir',
      category: 'Adventure',
      rating: 4.8,
      reviews: 14560,
      entryFee: 0,
      openTime: 'All day',
      image: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg',
      description: 'High-altitude desert known for stunning landscapes and monasteries.',
      liked: true
    },
    {
      id: 11,
      name: 'Hampi',
      location: 'Karnataka',
      category: 'Historical',
      rating: 4.6,
      reviews: 12340,
      entryFee: 40,
      openTime: '6:00 AM - 6:00 PM',
      image: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg',
      description: 'Ancient ruins of the Vijayanagara Empire.',
      liked: false
    },
    {
      id: 12,
      name: 'Andaman Islands',
      location: 'Andaman & Nicobar Islands',
      category: 'Beaches',
      rating: 4.7,
      reviews: 9870,
      entryFee: 0,
      openTime: 'All day',
      image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg',
      description: 'Pristine tropical islands with crystal clear waters.',
      liked: true
    },
    {
      id: 13,
      name: 'Rishikesh',
      location: 'Uttarakhand',
      category: 'Adventure',
      rating: 4.5,
      reviews: 13450,
      entryFee: 0,
      openTime: 'All day',
      image: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg',
      description: 'Yoga capital of the world and adventure sports hub.',
      liked: false
    },
    {
      id: 14,
      name: 'Khajuraho Temples',
      location: 'Madhya Pradesh',
      category: 'Historical',
      rating: 4.4,
      reviews: 8920,
      entryFee: 40,
      openTime: '6:00 AM - 6:00 PM',
      image: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg',
      description: 'Medieval Hindu and Jain temples with intricate sculptures.',
      liked: true
    },
    {
      id: 15,
      name: 'Munnar',
      location: 'Kerala',
      category: 'Nature',
      rating: 4.6,
      reviews: 15670,
      entryFee: 0,
      openTime: 'All day',
      image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg',
      description: 'Hill station famous for tea plantations and scenic beauty.',
      liked: false
    },
    {
      id: 16,
      name: 'Ajanta Caves',
      location: 'Maharashtra',
      category: 'Historical',
      rating: 4.5,
      reviews: 11230,
      entryFee: 40,
      openTime: '9:00 AM - 5:30 PM',
      image: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg',
      description: 'Ancient Buddhist cave monuments with exquisite paintings.',
      liked: true
    },
    {
      id: 17,
      name: 'Coorg',
      location: 'Karnataka',
      category: 'Nature',
      rating: 4.4,
      reviews: 12890,
      entryFee: 0,
      openTime: 'All day',
      image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg',
      description: 'Coffee country with lush green hills and waterfalls.',
      liked: false
    },
    {
      id: 18,
      name: 'Pushkar',
      location: 'Rajasthan',
      category: 'Religious',
      rating: 4.3,
      reviews: 9560,
      entryFee: 0,
      openTime: 'All day',
      image: 'https://images.pexels.com/photos/3581876/pexels-photo-3581876.jpeg',
      description: 'Holy city with sacred lake and colorful markets.',
      liked: true
    }
  ];

  const filteredPlaces = places.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         place.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || place.category === selectedCategory;
    const matchesState = selectedState === 'All States' || place.location.includes(selectedState);
    const matchesRating = place.rating >= minRating;
    
    let matchesPrice = true;
    if (priceRange === 'Free') matchesPrice = place.entryFee === 0;
    else if (priceRange === 'Under ₹50') matchesPrice = place.entryFee < 50;
    else if (priceRange === '₹50-₹200') matchesPrice = place.entryFee >= 50 && place.entryFee <= 200;
    else if (priceRange === '₹200+') matchesPrice = place.entryFee > 200;

    return matchesSearch && matchesCategory && matchesState && matchesRating && matchesPrice;
  });

  return (
    <div>
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tourist Places in India</h1>
          <p className="text-gray-600">Explore incredible destinations across the country</p>
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
                  placeholder="Search places..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* State Filter */}
            <div>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
            Showing {filteredPlaces.length} places
          </p>
          <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200">
            <Map className="w-4 h-4" />
            <span>Map View</span>
          </button>
        </div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <div key={place.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition-all duration-200">
                  <Heart 
                    className={`w-4 h-4 ${place.liked ? 'text-red-500 fill-current' : 'text-gray-600'} hover:text-red-500`} 
                  />
                </div>
                <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {place.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{place.name}</h3>
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-gray-600 text-sm ml-1">{place.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{place.location}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{place.description}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex items-center">
                    <IndianRupee className="w-4 h-4 mr-1" />
                    <span>{place.entryFee === 0 ? 'Free' : `₹${place.entryFee}`}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{place.openTime}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{place.reviews.toLocaleString()} reviews</span>
                    <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-blue-500 text-white text-sm rounded-lg hover:from-orange-600 hover:to-blue-600 transition-all duration-200">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPlaces.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MapPin className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No places found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TouristPlaces;