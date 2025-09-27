import React, { useState } from 'react';
import { Search, Plane, Train, Bus, Car, Clock, IndianRupee, ArrowRight } from 'lucide-react';
import Navigation from '../components/Navigation';

const TravelConnections: React.FC = () => {
  const [fromCity, setFromCity] = useState('Delhi');
  const [toCity, setToCity] = useState('Mumbai');
  const [selectedMode, setSelectedMode] = useState('All');
  const [sortBy, setSortBy] = useState('Price');

  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Jaipur', 'Goa', 'Kerala'];
  const transportModes = ['All', 'Flight', 'Train', 'Bus', 'Taxi'];
  const sortOptions = ['Price', 'Duration', 'Rating'];

  const connections = [
    {
      id: 1,
      mode: 'Flight',
      operator: 'IndiGo',
      duration: '2h 15m',
      price: 4500,
      departure: '08:30',
      arrival: '10:45',
      rating: 4.2,
      icon: Plane,
      color: 'purple'
    },
    {
      id: 2,
      mode: 'Flight',
      operator: 'SpiceJet',
      duration: '2h 20m',
      price: 3800,
      departure: '14:15',
      arrival: '16:35',
      rating: 4.0,
      icon: Plane,
      color: 'purple'
    },
    {
      id: 3,
      mode: 'Train',
      operator: 'Rajdhani Express',
      duration: '16h 30m',
      price: 2200,
      departure: '17:05',
      arrival: '09:35',
      rating: 4.5,
      icon: Train,
      color: 'blue'
    },
    {
      id: 4,
      mode: 'Train',
      operator: 'Mumbai Duronto',
      duration: '15h 50m',
      price: 1800,
      departure: '22:45',
      arrival: '14:35',
      rating: 4.1,
      icon: Train,
      color: 'blue'
    },
    {
      id: 5,
      mode: 'Bus',
      operator: 'Volvo AC Sleeper',
      duration: '24h 00m',
      price: 1200,
      departure: '20:00',
      arrival: '20:00',
      rating: 3.8,
      icon: Bus,
      color: 'green'
    },
    {
      id: 6,
      mode: 'Bus',
      operator: 'RedBus Premium',
      duration: '22h 30m',
      price: 1500,
      departure: '19:30',
      arrival: '18:00',
      rating: 4.0,
      icon: Bus,
      color: 'green'
    },
    {
      id: 7,
      mode: 'Taxi',
      operator: 'Ola Outstation',
      duration: '20h 00m',
      price: 8500,
      departure: 'Flexible',
      arrival: 'Flexible',
      rating: 4.3,
      icon: Car,
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'purple':
        return 'bg-purple-500 text-white';
      case 'blue':
        return 'bg-blue-500 text-white';
      case 'green':
        return 'bg-green-500 text-white';
      case 'orange':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const filteredConnections = connections.filter(connection => {
    return selectedMode === 'All' || connection.mode === selectedMode;
  });

  const sortedConnections = [...filteredConnections].sort((a, b) => {
    switch (sortBy) {
      case 'Price':
        return a.price - b.price;
      case 'Duration':
        return parseInt(a.duration) - parseInt(b.duration);
      case 'Rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const cheapest = filteredConnections.reduce((min, connection) => 
    connection.price < min.price ? connection : min, filteredConnections[0] || { price: 0 });

  const fastest = filteredConnections.reduce((min, connection) => 
    parseInt(connection.duration) < parseInt(min.duration) ? connection : min, filteredConnections[0] || { duration: '0h' });

  return (
    <div>
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Travel Connections</h1>
          <p className="text-gray-600">Compare and book travel options across India</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* From City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <select
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* To City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <select
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Transport Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {transportModes.map(mode => (
                  <option key={mode} value={mode}>{mode}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Quick Comparison */}
        {filteredConnections.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-800 font-medium">Cheapest Option</p>
                  <p className="text-green-600">{cheapest?.operator}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-800">₹{cheapest?.price?.toLocaleString()}</p>
                  <p className="text-green-600 text-sm">{cheapest?.duration}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-800 font-medium">Fastest Option</p>
                  <p className="text-blue-600">{fastest?.operator}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-800">{fastest?.duration}</p>
                  <p className="text-blue-600 text-sm">₹{fastest?.price?.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {fromCity} to {toCity} • {sortedConnections.length} options
          </p>
        </div>

        {/* Connections List */}
        <div className="space-y-4">
          {sortedConnections.map((connection) => {
            const IconComponent = connection.icon;
            return (
              <div key={connection.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClasses(connection.color)}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{connection.operator}</h3>
                      <p className="text-gray-600">{connection.mode}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <p className="text-xl font-bold text-gray-900">{connection.departure}</p>
                      <p className="text-gray-600 text-sm">{fromCity}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex-1 h-px bg-gray-300"></div>
                      <div className="text-center px-4">
                        <div className="flex items-center text-gray-600 mb-1">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm">{connection.duration}</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="flex-1 h-px bg-gray-300"></div>
                    </div>

                    <div className="text-center">
                      <p className="text-xl font-bold text-gray-900">{connection.arrival}</p>
                      <p className="text-gray-600 text-sm">{toCity}</p>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center text-gray-600 mb-2">
                        <IndianRupee className="w-4 h-4 mr-1" />
                        <span className="text-2xl font-bold text-gray-900">{connection.price.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex text-yellow-400 mr-1">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className={`w-3 h-3 ${i < Math.floor(connection.rating) ? 'bg-yellow-400' : 'bg-gray-200'} rounded-full mr-1`}></div>
                          ))}
                        </div>
                        <span className="text-gray-600 text-sm">{connection.rating}</span>
                      </div>
                    </div>

                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {sortedConnections.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Plane className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No connections found</h3>
            <p className="text-gray-600">Try selecting different cities or transport modes</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelConnections;