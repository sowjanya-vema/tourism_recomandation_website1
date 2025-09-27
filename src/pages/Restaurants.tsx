import React, { useState } from 'react';
import { Search, MapPin, Star, Heart, Clock, IndianRupee, UtensilsCrossed } from 'lucide-react';
import Navigation from '../components/Navigation';

const Restaurants: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [priceRange, setPriceRange] = useState('All');
  const [minRating, setMinRating] = useState(0);

  const cuisines = ['All', 'Indian', 'North Indian', 'South Indian', 'Continental', 'Chinese', 'Italian', 'Mexican'];
  const cities = ['All Cities', 'Delhi', 'Mumbai', 'Bangalore', 'Jaipur', 'Goa', 'Kerala'];
  const priceRanges = ['All', 'Under ₹500', '₹500-₹1,000', '₹1,000-₹2,000', '₹2,000+'];

  const restaurants = [
    {
      id: 1,
      name: 'Karim\'s',
      location: 'Chandni Chowk, Delhi',
      cuisine: 'North Indian',
      rating: 4.4,
      reviews: 8920,
      averageCost: '₹400-₹800',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      description: 'Historic Mughlai restaurant famous for its kebabs and biryanis.',
      liked: true,
      contact: '+91 11 2326 9880',
      timings: '11:00 AM - 11:00 PM',
      specialties: ['Mutton Korma', 'Chicken Seekh Kebab', 'Mutton Burra']
    },
    {
      id: 2,
      name: 'Trishna',
      location: 'Fort, Mumbai',
      cuisine: 'Continental',
      rating: 4.6,
      reviews: 3240,
      averageCost: '₹2,500-₹3,500',
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
      description: 'Fine dining restaurant specializing in seafood and modern Indian cuisine.',
      liked: false,
      contact: '+91 22 2270 3213',
      timings: '12:00 PM - 2:30 PM, 7:00 PM - 11:30 PM',
      specialties: ['Koliwada Crab', 'Duck Khurchan', 'Soft Shell Crab']
    },
    {
      id: 3,
      name: 'MTR',
      location: 'Lalbagh, Bangalore',
      cuisine: 'South Indian',
      rating: 4.3,
      reviews: 12450,
      averageCost: '₹200-₹400',
      image: 'https://images.pexels.com/photos/5864245/pexels-photo-5864245.jpeg',
      description: 'Legendary South Indian restaurant serving authentic Karnataka cuisine.',
      liked: true,
      contact: '+91 80 2222 0022',
      timings: '6:30 AM - 11:00 AM, 12:30 PM - 8:30 PM',
      specialties: ['Masala Dosa', 'Filter Coffee', 'Rava Idli']
    },
    {
      id: 4,
      name: 'Chokhi Dhani Restaurant',
      location: 'Jaipur, Rajasthan',
      cuisine: 'Indian',
      rating: 4.5,
      reviews: 6780,
      averageCost: '₹800-₹1,200',
      image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg',
      description: 'Traditional Rajasthani village-themed restaurant with cultural performances.',
      liked: false,
      contact: '+91 141 277 0555',
      timings: '5:00 PM - 11:00 PM',
      specialties: ['Dal Baati Churma', 'Gatte ki Sabzi', 'Ker Sangri']
    },
    {
      id: 5,
      name: 'Fisherman\'s Wharf',
      location: 'Cavelossim, Goa',
      cuisine: 'Continental',
      rating: 4.2,
      reviews: 4560,
      averageCost: '₹1,000-₹1,500',
      image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg',
      description: 'Waterfront restaurant offering fresh seafood and Goan specialties.',
      liked: true,
      contact: '+91 832 287 1007',
      timings: '12:00 PM - 3:30 PM, 6:30 PM - 11:30 PM',
      specialties: ['Bebinca', 'Fish Curry Rice', 'Prawn Balchão']
    },
    {
      id: 6,
      name: 'Saravana Bhavan',
      location: 'T. Nagar, Chennai',
      cuisine: 'South Indian',
      rating: 4.1,
      reviews: 9870,
      averageCost: '₹150-₹300',
      image: 'https://images.pexels.com/photos/5639960/pexels-photo-5639960.jpeg',
      description: 'Popular vegetarian chain known for authentic South Indian food.',
      liked: false,
      contact: '+91 44 2434 0777',
      timings: '7:00 AM - 10:30 PM',
      specialties: ['Mini Tiffin', 'Pongal', 'Sambar Vada']
    },
    {
      id: 7,
      name: 'Bukhara',
      location: 'ITC Maurya, Delhi',
      cuisine: 'North Indian',
      rating: 4.7,
      reviews: 5420,
      averageCost: '₹3,000-₹4,500',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      description: 'World-renowned restaurant famous for its rustic North-West Frontier cuisine.',
      liked: true,
      contact: '+91 11 2611 2233',
      timings: '7:00 PM - 11:45 PM',
      specialties: ['Dal Bukhara', 'Sikandari Raan', 'Tandoori Chicken']
    },
    {
      id: 8,
      name: 'Wasabi by Morimoto',
      location: 'The Taj Mahal Palace, Mumbai',
      cuisine: 'Japanese',
      rating: 4.5,
      reviews: 2890,
      averageCost: '₹4,000-₹6,000',
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
      description: 'Premium Japanese restaurant by celebrity chef Masaharu Morimoto.',
      liked: false,
      contact: '+91 22 6665 3366',
      timings: '7:00 PM - 11:30 PM',
      specialties: ['Omakase', 'Black Cod', 'Tuna Tartare']
    },
    {
      id: 9,
      name: 'Koshy\'s',
      location: 'St. Mark\'s Road, Bangalore',
      cuisine: 'Continental',
      rating: 4.2,
      reviews: 7650,
      averageCost: '₹300-₹600',
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
      description: 'Iconic old-world restaurant serving Continental and Indian dishes since 1940.',
      liked: true,
      contact: '+91 80 2221 3793',
      timings: '8:30 AM - 11:00 PM',
      specialties: ['Mutton Pepper Fry', 'Chicken Steak', 'Caramel Custard']
    },
    {
      id: 10,
      name: 'Dakshin',
      location: 'ITC Park Sheraton, Chennai',
      cuisine: 'South Indian',
      rating: 4.6,
      reviews: 4320,
      averageCost: '₹1,500-₹2,500',
      image: 'https://images.pexels.com/photos/5864245/pexels-photo-5864245.jpeg',
      description: 'Upscale restaurant showcasing authentic South Indian regional cuisines.',
      liked: false,
      contact: '+91 44 2499 4101',
      timings: '12:30 PM - 2:45 PM, 7:30 PM - 11:45 PM',
      specialties: ['Chettinad Chicken', 'Appam with Stew', 'Payasam']
    },
    {
      id: 11,
      name: 'Lal Qila',
      location: 'Rajouri Garden, Delhi',
      cuisine: 'North Indian',
      rating: 4.3,
      reviews: 6890,
      averageCost: '₹600-₹1,000',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      description: 'Popular restaurant known for authentic Mughlai and Punjabi cuisine.',
      liked: true,
      contact: '+91 11 2545 5454',
      timings: '11:00 AM - 11:30 PM',
      specialties: ['Butter Chicken', 'Biryani', 'Kulfi']
    },
    {
      id: 12,
      name: 'Toit',
      location: 'Indiranagar, Bangalore',
      cuisine: 'Continental',
      rating: 4.4,
      reviews: 8920,
      averageCost: '₹800-₹1,200',
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
      description: 'Trendy microbrewery with craft beers and wood-fired pizzas.',
      liked: false,
      contact: '+91 80 4112 8294',
      timings: '12:00 PM - 1:00 AM',
      specialties: ['Craft Beer', 'Wood Fired Pizza', 'Pork Ribs']
    },
    {
      id: 13,
      name: 'Dum Pukht',
      location: 'ITC Maurya, Delhi',
      cuisine: 'North Indian',
      rating: 4.8,
      reviews: 3450,
      averageCost: '₹3,500-₹5,000',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      description: 'Legendary restaurant specializing in slow-cooked Awadhi cuisine.',
      liked: true,
      contact: '+91 11 2611 2233',
      timings: '7:00 PM - 11:45 PM',
      specialties: ['Dum Biryani', 'Galouti Kebab', 'Shahi Tukda']
    },
    {
      id: 14,
      name: 'Britannia & Co.',
      location: 'Ballard Estate, Mumbai',
      cuisine: 'Parsi',
      rating: 4.1,
      reviews: 5670,
      averageCost: '₹400-₹700',
      image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg',
      description: 'Historic Parsi restaurant serving traditional Iranian and Indian dishes.',
      liked: false,
      contact: '+91 22 2261 5264',
      timings: '11:30 AM - 4:00 PM',
      specialties: ['Berry Pulao', 'Dhansak', 'Caramel Custard']
    },
    {
      id: 15,
      name: 'Karavalli',
      location: 'The Gateway Hotel, Bangalore',
      cuisine: 'South Indian',
      rating: 4.5,
      reviews: 4890,
      averageCost: '₹1,200-₹2,000',
      image: 'https://images.pexels.com/photos/5864245/pexels-photo-5864245.jpeg',
      description: 'Award-winning restaurant specializing in coastal South Indian cuisine.',
      liked: true,
      contact: '+91 80 6660 4545',
      timings: '7:00 PM - 11:30 PM',
      specialties: ['Mangalorean Fish Curry', 'Neer Dosa', 'Solkadhi']
    },
    {
      id: 16,
      name: 'Spice Route',
      location: 'The Imperial, Delhi',
      cuisine: 'Asian',
      rating: 4.4,
      reviews: 3780,
      averageCost: '₹2,000-₹3,000',
      image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg',
      description: 'Stunning restaurant showcasing Southeast Asian cuisine and culture.',
      liked: false,
      contact: '+91 11 2334 1234',
      timings: '7:00 PM - 11:45 PM',
      specialties: ['Thai Green Curry', 'Vietnamese Pho', 'Indonesian Rendang']
    },
    {
      id: 17,
      name: 'Peshawri',
      location: 'ITC Grand Central, Mumbai',
      cuisine: 'North Indian',
      rating: 4.6,
      reviews: 4120,
      averageCost: '₹2,500-₹3,500',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      description: 'Rustic restaurant serving authentic North-West Frontier cuisine.',
      liked: true,
      contact: '+91 22 6634 4444',
      timings: '7:00 PM - 11:45 PM',
      specialties: ['Dal Peshawri', 'Burrah Kebab', 'Kheer']
    },
    {
      id: 18,
      name: 'Vidyarthi Bhavan',
      location: 'Basavanagudi, Bangalore',
      cuisine: 'South Indian',
      rating: 4.2,
      reviews: 11230,
      averageCost: '₹100-₹250',
      image: 'https://images.pexels.com/photos/5864245/pexels-photo-5864245.jpeg',
      description: 'Century-old restaurant famous for its crispy masala dosas.',
      liked: false,
      contact: '+91 80 2657 5588',
      timings: '6:30 AM - 11:30 AM, 2:30 PM - 7:30 PM',
      specialties: ['Masala Dosa', 'Filter Coffee', 'Vada']
    }
  ];

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = selectedCuisine === 'All' || restaurant.cuisine === selectedCuisine;
    const matchesCity = selectedCity === 'All Cities' || restaurant.location.includes(selectedCity);
    const matchesRating = restaurant.rating >= minRating;
    
    // Price filtering logic would be implemented here
    const matchesPrice = true; // Simplified for demo

    return matchesSearch && matchesCuisine && matchesCity && matchesRating && matchesPrice;
  });

  return (
    <div>
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Restaurants in India</h1>
          <p className="text-gray-600">Discover authentic flavors and culinary experiences</p>
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
                  placeholder="Search restaurants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Cuisine Filter */}
            <div>
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {cuisines.map(cuisine => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
            Showing {filteredRestaurants.length} restaurants
          </p>
        </div>

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition-all duration-200">
                  <Heart 
                    className={`w-4 h-4 ${restaurant.liked ? 'text-red-500 fill-current' : 'text-gray-600'} hover:text-red-500`} 
                  />
                </div>
                <div className="absolute bottom-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {restaurant.cuisine}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-gray-600 text-sm ml-1">{restaurant.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{restaurant.location}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{restaurant.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IndianRupee className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-green-600 font-medium">{restaurant.averageCost}</span>
                    <span className="text-gray-500 text-sm ml-1">for two</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Open</span>
                  </div>
                </div>
                
                {/* Specialties */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Must Try:</p>
                  <div className="flex flex-wrap gap-1">
                    {restaurant.specialties.slice(0, 2).map((specialty, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">{restaurant.reviews.toLocaleString()} reviews</span>
                    <span className="text-xs text-gray-500">{restaurant.contact}</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200">
                    View Menu
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <UtensilsCrossed className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No restaurants found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;