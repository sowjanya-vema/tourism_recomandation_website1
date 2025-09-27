import React, { useState } from 'react';
import { Plus, MapPin, Calendar, Clock, Trash2, Save, Share, Edit } from 'lucide-react';
import Navigation from '../components/Navigation';

interface TripItem {
  id: string;
  type: 'place' | 'hotel' | 'restaurant';
  name: string;
  location: string;
  time: string;
  duration: string;
  notes?: string;
}

interface TripDay {
  date: string;
  items: TripItem[];
}

const TripPlanner: React.FC = () => {
  const [tripName, setTripName] = useState('My Rajasthan Adventure');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);

  const [tripDays, setTripDays] = useState<TripDay[]>([
    {
      date: '2024-02-15',
      items: [
        {
          id: '1',
          type: 'place',
          name: 'Hawa Mahal',
          location: 'Jaipur, Rajasthan',
          time: '09:00',
          duration: '2 hours',
          notes: 'Early morning visit to avoid crowds'
        },
        {
          id: '2',
          type: 'restaurant',
          name: 'Chokhi Dhani',
          location: 'Jaipur, Rajasthan',
          time: '12:30',
          duration: '1.5 hours',
          notes: 'Traditional Rajasthani lunch'
        },
        {
          id: '3',
          type: 'place',
          name: 'City Palace',
          location: 'Jaipur, Rajasthan',
          time: '15:00',
          duration: '3 hours'
        },
        {
          id: '4',
          type: 'hotel',
          name: 'Heritage Hotel Jaipur',
          location: 'Jaipur, Rajasthan',
          time: '19:00',
          duration: 'Overnight'
        }
      ]
    },
    {
      date: '2024-02-16',
      items: [
        {
          id: '5',
          type: 'place',
          name: 'Amber Fort',
          location: 'Amer, Jaipur',
          time: '08:00',
          duration: '4 hours',
          notes: 'Elephant ride to the fort'
        },
        {
          id: '6',
          type: 'restaurant',
          name: 'Peacock Rooftop Restaurant',
          location: 'Jaipur, Rajasthan',
          time: '13:00',
          duration: '1 hour'
        },
        {
          id: '7',
          type: 'place',
          name: 'Jal Mahal',
          location: 'Jaipur, Rajasthan',
          time: '16:00',
          duration: '1 hour',
          notes: 'Sunset photography'
        }
      ]
    },
    {
      date: '2024-02-17',
      items: []
    }
  ]);

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'place':
        return '🏛️';
      case 'hotel':
        return '🏨';
      case 'restaurant':
        return '🍽️';
      default:
        return '📍';
    }
  };

  const getItemColor = (type: string) => {
    switch (type) {
      case 'place':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'hotel':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'restaurant':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const addDay = () => {
    const lastDate = new Date(tripDays[tripDays.length - 1].date);
    const newDate = new Date(lastDate);
    newDate.setDate(lastDate.getDate() + 1);
    
    setTripDays([...tripDays, {
      date: newDate.toISOString().split('T')[0],
      items: []
    }]);
  };

  const removeItem = (dayIndex: number, itemId: string) => {
    const updatedDays = [...tripDays];
    updatedDays[dayIndex].items = updatedDays[dayIndex].items.filter(item => item.id !== itemId);
    setTripDays(updatedDays);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <input
                  type="text"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                  className="text-3xl font-bold text-gray-900 bg-transparent border-b-2 border-orange-500 focus:outline-none"
                  onBlur={() => setIsEditing(false)}
                  onKeyPress={(e) => e.key === 'Enter' && setIsEditing(false)}
                  autoFocus
                />
              ) : (
                <h1 
                  className="text-3xl font-bold text-gray-900 cursor-pointer hover:text-orange-600 transition-colors duration-200"
                  onClick={() => setIsEditing(true)}
                >
                  {tripName}
                </h1>
              )}
              <button 
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-orange-600 transition-colors duration-200"
              >
                <Edit className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Share className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-blue-500 text-white rounded-lg hover:from-orange-600 hover:to-blue-600 transition-all duration-200">
                <Save className="w-4 h-4" />
                <span>Save Trip</span>
              </button>
            </div>
          </div>
          <p className="text-gray-600">Plan your perfect itinerary day by day</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Day Selector */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Trip Days</h3>
                <button
                  onClick={addDay}
                  className="text-orange-600 hover:text-orange-700 transition-colors duration-200"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-2">
                {tripDays.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDay(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      selectedDay === index
                        ? 'bg-gradient-to-r from-orange-100 to-blue-100 text-orange-600 shadow-sm'
                        : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        selectedDay === index
                          ? 'bg-gradient-to-r from-orange-500 to-blue-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">Day {index + 1}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    {day.items.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1 ml-11">
                        {day.items.length} items planned
                      </p>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  <p className="mb-2">Trip Summary:</p>
                  <p>📅 {tripDays.length} days</p>
                  <p>📍 {tripDays.reduce((total, day) => total + day.items.filter(item => item.type === 'place').length, 0)} places</p>
                  <p>🏨 {tripDays.reduce((total, day) => total + day.items.filter(item => item.type === 'hotel').length, 0)} hotels</p>
                  <p>🍽️ {tripDays.reduce((total, day) => total + day.items.filter(item => item.type === 'restaurant').length, 0)} restaurants</p>
                </div>
              </div>
            </div>
          </div>

          {/* Day Details */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Day {selectedDay + 1}</h2>
                  <p className="text-gray-600">{formatDate(tripDays[selectedDay].date)}</p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-blue-500 text-white rounded-lg hover:from-orange-600 hover:to-blue-600 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Item</span>
                </button>
              </div>

              {tripDays[selectedDay].items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Calendar className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No plans for this day</h3>
                  <p className="text-gray-600 mb-4">Start building your itinerary by adding places, hotels, or restaurants</p>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-blue-500 text-white rounded-lg hover:from-orange-600 hover:to-blue-600 transition-all duration-200"
                  >
                    Add First Item
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {tripDays[selectedDay].items.map((item, itemIndex) => (
                    <div key={item.id} className="group relative">
                      {itemIndex > 0 && (
                        <div className="absolute left-6 -top-2 w-px h-4 bg-gradient-to-b from-gray-300 to-transparent"></div>
                      )}
                      
                      <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-xl border-2 border-gray-200">
                            {getItemIcon(item.type)}
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
                            <button
                              onClick={() => removeItem(selectedDay, item.id)}
                              className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="flex items-center text-gray-600 text-sm mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{item.location}</span>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{item.time}</span>
                            </div>
                            <span>•</span>
                            <span>{item.duration}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getItemColor(item.type)}`}>
                              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                            </span>
                          </div>
                          
                          {item.notes && (
                            <p className="text-sm text-gray-600 mt-2 bg-white p-2 rounded-lg border border-gray-200">
                              💡 {item.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Item Modal (simplified) */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Item to Day {selectedDay + 1}</h3>
              <p className="text-gray-600 mb-4">This is a demo. In the full version, you'd be able to search and add places, hotels, and restaurants from the database.</p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-blue-500 text-white rounded-lg hover:from-orange-600 hover:to-blue-600"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPlanner;