import React, { useState } from 'react';
import { User, Mail, MapPin, Heart, Calendar, Star, Edit, Save, X } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    budget: user?.preferences.budget || 'medium',
    interests: user?.preferences.interests || [],
    cuisine: user?.preferences.cuisine || []
  });

  const budgetOptions = [
    { value: 'low', label: 'Budget Traveler (< ₹2000/day)', icon: '💰' },
    { value: 'medium', label: 'Moderate Spender (₹2000-5000/day)', icon: '💳' },
    { value: 'high', label: 'Luxury Traveler (> ₹5000/day)', icon: '💎' }
  ];

  const interestOptions = [
    'Historical', 'Beaches', 'Adventure', 'Shopping', 'Religious', 
    'Nature', 'Photography', 'Wildlife', 'Culture', 'Architecture'
  ];

  const cuisineOptions = [
    'Indian', 'North Indian', 'South Indian', 'Continental', 'Chinese', 
    'Italian', 'Mexican', 'Thai', 'Japanese', 'Mediterranean'
  ];

  const handleSave = () => {
    updateProfile({
      name: editForm.name,
      email: editForm.email,
      preferences: {
        budget: editForm.budget as 'low' | 'medium' | 'high',
        interests: editForm.interests,
        cuisine: editForm.cuisine
      }
    });
    setIsEditing(false);
  };

  const handleInterestToggle = (interest: string) => {
    setEditForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleCuisineToggle = (cuisine: string) => {
    setEditForm(prev => ({
      ...prev,
      cuisine: prev.cuisine.includes(cuisine)
        ? prev.cuisine.filter(c => c !== cuisine)
        : [...prev.cuisine, cuisine]
    }));
  };

  const stats = [
    { label: 'Places Visited', value: '24', icon: MapPin, color: 'text-orange-600' },
    { label: 'Reviews Written', value: '18', icon: Star, color: 'text-yellow-600' },
    { label: 'Trips Planned', value: '6', icon: Calendar, color: 'text-blue-600' },
    { label: 'Favorites', value: '32', icon: Heart, color: 'text-red-600' }
  ];

  const recentActivity = [
    { type: 'review', place: 'Taj Mahal', action: 'left a 5-star review', time: '2 days ago' },
    { type: 'favorite', place: 'Kerala Backwaters', action: 'added to favorites', time: '1 week ago' },
    { type: 'trip', place: 'Rajasthan Adventure', action: 'planned a new trip', time: '2 weeks ago' },
    { type: 'visit', place: 'Goa Beaches', action: 'marked as visited', time: '3 weeks ago' }
  ];

  return (
    <div>
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="text-xl font-bold text-gray-900 bg-transparent border-b border-orange-500 text-center focus:outline-none mb-2"
                  />
                ) : (
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{user?.name}</h2>
                )}
                <div className="flex items-center justify-center text-gray-600 mb-4">
                  <Mail className="w-4 h-4 mr-2" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-transparent border-b border-orange-500 focus:outline-none"
                    />
                  ) : (
                    <span>{user?.email}</span>
                  )}
                </div>
                
                {isEditing ? (
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSave}
                      className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-blue-500 text-white rounded-lg hover:from-orange-600 hover:to-blue-600 transition-all duration-200 mx-auto"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </button>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                      <IconComponent className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-gray-600">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Preferences and Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* Travel Preferences */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Travel Preferences</h3>
              
              {/* Budget Preference */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Budget Range</label>
                <div className="space-y-3">
                  {budgetOptions.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        id={option.value}
                        name="budget"
                        value={option.value}
                        checked={editForm.budget === option.value}
                        onChange={(e) => setEditForm(prev => ({ ...prev, budget: e.target.value }))}
                        disabled={!isEditing}
                        className="mr-3 text-orange-500 focus:ring-orange-500"
                      />
                      <label htmlFor={option.value} className="flex items-center text-gray-700">
                        <span className="mr-2">{option.icon}</span>
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Interests</label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => isEditing && handleInterestToggle(interest)}
                      disabled={!isEditing}
                      className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                        editForm.interests.includes(interest)
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      } ${!isEditing ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cuisine Preferences */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Cuisine Preferences</label>
                <div className="flex flex-wrap gap-2">
                  {cuisineOptions.map((cuisine) => (
                    <button
                      key={cuisine}
                      onClick={() => isEditing && handleCuisineToggle(cuisine)}
                      disabled={!isEditing}
                      className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                        editForm.cuisine.includes(cuisine)
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      } ${!isEditing ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      {cuisine}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'review' ? 'bg-yellow-100' :
                      activity.type === 'favorite' ? 'bg-red-100' :
                      activity.type === 'trip' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      {activity.type === 'review' && <Star className="w-5 h-5 text-yellow-600" />}
                      {activity.type === 'favorite' && <Heart className="w-5 h-5 text-red-600" />}
                      {activity.type === 'trip' && <Calendar className="w-5 h-5 text-blue-600" />}
                      {activity.type === 'visit' && <MapPin className="w-5 h-5 text-green-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">
                        You {activity.action} for <span className="font-medium">{activity.place}</span>
                      </p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;