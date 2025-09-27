import React, { useState } from 'react';
import { Search, MapPin, Building, UtensilsCrossed, Plane, TrendingUp, Star, Heart, Calendar, CloudSun } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

  const quickAccessItems = [
    {
      title: 'Tourist Places',
      icon: MapPin,
      color: 'from-red-500 to-orange-500',
      count: '2,500+',
      description: 'Historical sites, beaches, adventures',
      href: '/places'
    },
    {
      title: 'Hotels',
      icon: Building,
      color: 'from-blue-500 to-indigo-500',
      count: '10,000+',
      description: 'Budget to luxury accommodations',
      href: '/hotels'
    },
    {
      title: 'Restaurants',
      icon: UtensilsCrossed,
      color: 'from-green-500 to-emerald-500',
      count: '5,000+',
      description: 'Local cuisines and dining options',
      href: '/restaurants'
    },
    {
      title: 'Travel Connections',
      icon: Plane,
      color: 'from-purple-500 to-pink-500',
      count: '1,000+',
      description: 'Flights, trains, buses, taxis',
      href: '/travel'
    },
    {
      title: 'Weather Report',
      icon: CloudSun,
      color: 'from-cyan-500 to-blue-500',
      count: '20+',
      description: 'Real-time weather across cities',
      href: '/weather'
    }
  ];

  const recommendations = [
    {
      id: 1,
      name: 'Taj Mahal',
      location: 'Agra, Uttar Pradesh',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg',
      category: 'Historical'
    },
    {
      id: 2,
      name: 'Kerala Backwaters',
      location: 'Alleppey, Kerala',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg',
      category: 'Nature'
    },
    {
      id: 3,
      name: 'Goa Beaches',
      location: 'Goa',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg',
      category: 'Beaches'
    },
    {
      id: 4,
      name: 'Golden Temple',
      location: 'Amritsar, Punjab',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/3581876/pexels-photo-3581876.jpeg',
      category: 'Religious'
    }
  ];

  const trendingDestinations = [
    { name: 'Rajasthan', growth: '+23%', image: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg' },
    { name: 'Himachal Pradesh', growth: '+18%', image: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg' },
    { name: 'Kerala', growth: '+15%', image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg' },
  ];

  return (
    <div>
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">Ready to explore incredible India? Let's plan your next adventure.</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search destinations, hotels, restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg"
            />
          </div>
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickAccessItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.href}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group cursor-pointer transform hover:-translate-y-1"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-3xl font-bold text-gray-900 mb-1">{item.count}</p>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </a>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personalized Recommendations */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
                <a href="/places" className="text-orange-600 hover:text-orange-700 font-medium">
                  View All
                </a>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.map((place) => (
                  <div key={place.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl mb-3">
                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition-all duration-200">
                        <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                      </div>
                      <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {place.category}
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{place.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{place.location}</p>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{place.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Destinations */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Trending Destinations</h3>
              </div>
              <div className="space-y-3">
                {trendingDestinations.map((destination, index) => (
                  <div key={index} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{destination.name}</p>
                      <p className="text-green-600 text-xs">{destination.growth} this month</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-orange-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Your Travel Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-orange-100">Places Visited</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-100">Reviews Written</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-100">Trips Planned</span>
                  <span className="font-semibold">3</span>
                </div>
              </div>
              <a
                href="/planner"
                className="inline-flex items-center mt-4 text-sm text-white hover:text-orange-100 transition-colors duration-200"
              >
                <Calendar className="w-4 h-4 mr-1" />
                Plan New Trip
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;