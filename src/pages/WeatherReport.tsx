import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, Eye, Gauge, MapPin, Calendar, RefreshCw } from 'lucide-react';
import Navigation from '../components/Navigation';

interface WeatherData {
  city: string;
  state: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  forecast: {
    day: string;
    high: number;
    low: number;
    condition: string;
    precipitation: number;
  }[];
}

const WeatherReport: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const cities = [
    'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Jaipur', 'Goa', 
    'Kerala', 'Manali', 'Shimla', 'Udaipur', 'Varanasi', 'Agra', 'Pune',
    'Hyderabad', 'Ahmedabad', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur'
  ];

  // Mock weather data that changes based on city and simulates real conditions
  const getWeatherData = (city: string): WeatherData => {
    const currentMonth = new Date().getMonth();
    const isWinter = currentMonth >= 11 || currentMonth <= 2;
    const isSummer = currentMonth >= 3 && currentMonth <= 6;
    const isMonsoon = currentMonth >= 6 && currentMonth <= 9;

    const cityWeatherMap: { [key: string]: Partial<WeatherData> } = {
      'Delhi': {
        temperature: isWinter ? 15 : isSummer ? 42 : 28,
        condition: isWinter ? 'Partly Cloudy' : isSummer ? 'Hot' : isMonsoon ? 'Rainy' : 'Clear',
        humidity: isWinter ? 45 : isSummer ? 25 : 75,
        state: 'Delhi'
      },
      'Mumbai': {
        temperature: isWinter ? 25 : isSummer ? 35 : 29,
        condition: isMonsoon ? 'Heavy Rain' : isWinter ? 'Pleasant' : 'Humid',
        humidity: isMonsoon ? 85 : 70,
        state: 'Maharashtra'
      },
      'Bangalore': {
        temperature: isWinter ? 20 : isSummer ? 32 : 24,
        condition: isMonsoon ? 'Light Rain' : 'Pleasant',
        humidity: 60,
        state: 'Karnataka'
      },
      'Chennai': {
        temperature: isWinter ? 26 : isSummer ? 38 : 30,
        condition: isWinter ? 'Warm' : isSummer ? 'Very Hot' : 'Rainy',
        humidity: 75,
        state: 'Tamil Nadu'
      },
      'Kolkata': {
        temperature: isWinter ? 22 : isSummer ? 36 : 28,
        condition: isMonsoon ? 'Thunderstorm' : isWinter ? 'Cool' : 'Hot & Humid',
        humidity: 80,
        state: 'West Bengal'
      },
      'Jaipur': {
        temperature: isWinter ? 18 : isSummer ? 45 : 32,
        condition: isWinter ? 'Cool' : isSummer ? 'Extremely Hot' : 'Warm',
        humidity: isWinter ? 35 : 45,
        state: 'Rajasthan'
      },
      'Goa': {
        temperature: isWinter ? 28 : isSummer ? 33 : 26,
        condition: isMonsoon ? 'Heavy Rain' : 'Tropical',
        humidity: isMonsoon ? 90 : 75,
        state: 'Goa'
      },
      'Kerala': {
        temperature: isWinter ? 26 : isSummer ? 32 : 25,
        condition: isMonsoon ? 'Monsoon' : 'Tropical',
        humidity: 85,
        state: 'Kerala'
      },
      'Manali': {
        temperature: isWinter ? -2 : isSummer ? 25 : 15,
        condition: isWinter ? 'Snow' : isSummer ? 'Pleasant' : 'Cool',
        humidity: 65,
        state: 'Himachal Pradesh'
      },
      'Shimla': {
        temperature: isWinter ? 5 : isSummer ? 22 : 12,
        condition: isWinter ? 'Cold' : 'Pleasant',
        humidity: 60,
        state: 'Himachal Pradesh'
      }
    };

    const baseData = cityWeatherMap[city] || {
      temperature: 25,
      condition: 'Clear',
      humidity: 60,
      state: 'India'
    };

    const temp = baseData.temperature || 25;
    
    return {
      city,
      state: baseData.state || 'India',
      temperature: temp,
      feelsLike: temp + Math.floor(Math.random() * 6) - 3,
      condition: baseData.condition || 'Clear',
      humidity: baseData.humidity || 60,
      windSpeed: Math.floor(Math.random() * 15) + 5,
      visibility: Math.floor(Math.random() * 5) + 8,
      pressure: Math.floor(Math.random() * 50) + 1000,
      uvIndex: isSummer ? Math.floor(Math.random() * 3) + 8 : Math.floor(Math.random() * 5) + 3,
      sunrise: '6:15 AM',
      sunset: '6:45 PM',
      forecast: [
        {
          day: 'Today',
          high: temp + 2,
          low: temp - 8,
          condition: baseData.condition || 'Clear',
          precipitation: isMonsoon ? Math.floor(Math.random() * 80) + 20 : Math.floor(Math.random() * 20)
        },
        {
          day: 'Tomorrow',
          high: temp + Math.floor(Math.random() * 4) - 2,
          low: temp - 8 + Math.floor(Math.random() * 4) - 2,
          condition: isMonsoon ? 'Rainy' : isWinter ? 'Partly Cloudy' : 'Sunny',
          precipitation: isMonsoon ? Math.floor(Math.random() * 70) + 30 : Math.floor(Math.random() * 15)
        },
        {
          day: 'Wed',
          high: temp + Math.floor(Math.random() * 6) - 3,
          low: temp - 8 + Math.floor(Math.random() * 4) - 2,
          condition: Math.random() > 0.5 ? 'Partly Cloudy' : 'Clear',
          precipitation: Math.floor(Math.random() * 30)
        },
        {
          day: 'Thu',
          high: temp + Math.floor(Math.random() * 6) - 3,
          low: temp - 8 + Math.floor(Math.random() * 4) - 2,
          condition: Math.random() > 0.6 ? 'Cloudy' : 'Sunny',
          precipitation: Math.floor(Math.random() * 25)
        },
        {
          day: 'Fri',
          high: temp + Math.floor(Math.random() * 6) - 3,
          low: temp - 8 + Math.floor(Math.random() * 4) - 2,
          condition: Math.random() > 0.7 ? 'Light Rain' : 'Clear',
          precipitation: Math.floor(Math.random() * 40)
        }
      ]
    };
  };

  const fetchWeather = async (city: string) => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    const data = getWeatherData(city);
    setWeatherData(data);
    setLastUpdated(new Date());
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('rain') || lowerCondition.includes('monsoon') || lowerCondition.includes('thunderstorm')) {
      return <CloudRain className="w-16 h-16 text-blue-500" />;
    } else if (lowerCondition.includes('cloud')) {
      return <Cloud className="w-16 h-16 text-gray-500" />;
    } else if (lowerCondition.includes('snow')) {
      return <Cloud className="w-16 h-16 text-blue-200" />;
    } else {
      return <Sun className="w-16 h-16 text-yellow-500" />;
    }
  };

  const getConditionColor = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('rain') || lowerCondition.includes('monsoon')) {
      return 'from-blue-500 to-blue-600';
    } else if (lowerCondition.includes('hot') || lowerCondition.includes('sunny')) {
      return 'from-orange-500 to-red-500';
    } else if (lowerCondition.includes('snow') || lowerCondition.includes('cold')) {
      return 'from-blue-300 to-blue-500';
    } else {
      return 'from-blue-400 to-blue-500';
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= 35) return 'text-red-600';
    if (temp >= 25) return 'text-orange-600';
    if (temp >= 15) return 'text-green-600';
    if (temp >= 5) return 'text-blue-600';
    return 'text-blue-800';
  };

  return (
    <div>
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Weather Report</h1>
          <p className="text-gray-600">Real-time weather conditions across Indian cities</p>
        </div>

        {/* City Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <MapPin className="w-5 h-5 text-gray-600" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
              </div>
              <button
                onClick={() => fetchWeather(selectedCity)}
                disabled={loading}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">Loading weather data...</span>
          </div>
        ) : weatherData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Current Weather */}
            <div className="lg:col-span-2">
              <div className={`bg-gradient-to-br ${getConditionColor(weatherData.condition)} rounded-2xl shadow-lg p-8 text-white mb-8`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold">{weatherData.city}</h2>
                    <p className="text-lg opacity-90">{weatherData.state}</p>
                    <p className="opacity-75">{new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                  {getWeatherIcon(weatherData.condition)}
                </div>
                
                <div className="flex items-end space-x-4 mb-6">
                  <span className="text-6xl font-bold">{weatherData.temperature}°</span>
                  <div className="pb-2">
                    <p className="text-xl opacity-90">{weatherData.condition}</p>
                    <p className="opacity-75">Feels like {weatherData.feelsLike}°C</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Sun className="w-5 h-5" />
                    <span>Sunrise: {weatherData.sunrise}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="w-5 h-5" />
                    <span>Sunset: {weatherData.sunset}</span>
                  </div>
                </div>
              </div>

              {/* Weather Details */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Weather Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Droplets className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{weatherData.humidity}%</p>
                    <p className="text-sm text-gray-600">Humidity</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Wind className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{weatherData.windSpeed}</p>
                    <p className="text-sm text-gray-600">km/h Wind</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Eye className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{weatherData.visibility}</p>
                    <p className="text-sm text-gray-600">km Visibility</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Gauge className="w-6 h-6 text-orange-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{weatherData.pressure}</p>
                    <p className="text-sm text-gray-600">hPa Pressure</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 5-Day Forecast */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">5-Day Forecast</h3>
                <div className="space-y-4">
                  {weatherData.forecast.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 flex items-center justify-center">
                          {getWeatherIcon(day.condition)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{day.day}</p>
                          <p className="text-xs text-gray-600">{day.condition}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className={`font-bold ${getTemperatureColor(day.high)}`}>{day.high}°</span>
                          <span className="text-gray-500">{day.low}°</span>
                        </div>
                        {day.precipitation > 0 && (
                          <p className="text-xs text-blue-600">{day.precipitation}% rain</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* UV Index */}
                <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">UV Index</span>
                    <span className="text-2xl font-bold text-orange-600">{weatherData.uvIndex}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 h-2 rounded-full"
                      style={{ width: `${Math.min(weatherData.uvIndex * 10, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {weatherData.uvIndex <= 2 ? 'Low' : 
                     weatherData.uvIndex <= 5 ? 'Moderate' : 
                     weatherData.uvIndex <= 7 ? 'High' : 
                     weatherData.uvIndex <= 10 ? 'Very High' : 'Extreme'}
                  </p>
                </div>

                {/* Travel Advisory */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Travel Advisory</h4>
                  <p className="text-sm text-blue-800">
                    {weatherData.condition.toLowerCase().includes('rain') || weatherData.condition.toLowerCase().includes('monsoon') ? 
                      'Carry umbrella and waterproof clothing. Roads may be slippery.' :
                     weatherData.temperature > 35 ? 
                      'Very hot weather. Stay hydrated and avoid outdoor activities during peak hours.' :
                     weatherData.temperature < 10 ? 
                      'Cold weather. Dress warmly and be cautious of icy conditions.' :
                      'Pleasant weather conditions for travel and outdoor activities.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherReport;