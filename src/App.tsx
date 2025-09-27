import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import TouristPlaces from './pages/TouristPlaces';
import Hotels from './pages/Hotels';
import Restaurants from './pages/Restaurants';
import TravelConnections from './pages/TravelConnections';
import TripPlanner from './pages/TripPlanner';
import Profile from './pages/Profile';
import WeatherReport from './pages/WeatherReport';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return !user ? <>{children}</> : <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
          <Routes>
            <Route path="/login" element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/places" element={
              <ProtectedRoute>
                <TouristPlaces />
              </ProtectedRoute>
            } />
            <Route path="/hotels" element={
              <ProtectedRoute>
                <Hotels />
              </ProtectedRoute>
            } />
            <Route path="/restaurants" element={
              <ProtectedRoute>
                <Restaurants />
              </ProtectedRoute>
            } />
            <Route path="/travel" element={
              <ProtectedRoute>
                <TravelConnections />
              </ProtectedRoute>
            } />
            <Route path="/planner" element={
              <ProtectedRoute>
                <TripPlanner />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/weather" element={
              <ProtectedRoute>
                <WeatherReport />
              </ProtectedRoute>
            } />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;