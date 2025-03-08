import React, { createContext, useState, useContext, useEffect } from 'react';
import { createRide, createDriver, RideStatus } from '../models/Ride';

// Create context
const MockModeContext = createContext({
  isMockModeEnabled: true,
  setMockModeEnabled: () => {},
  getMockRide: () => {},
  getMockResponses: () => [],
  getDriverLocation: () => {}
});

// Simple function to generate a random ID without using crypto
const generateSimpleId = (prefix) => {
  return `${prefix}-${Math.floor(Math.random() * 10000)}-${Date.now().toString().slice(-4)}`;
};

/**
 * Mock mode provider component
 */
export function MockModeProvider({ children }) {
  const [isMockModeEnabled, setMockModeEnabled] = useState(true);
  const [driverLocation, setDriverLocation] = useState(null);
  
  // Default locations (San Francisco area)
  const defaultLocations = {
    driver: { latitude: 37.7749, longitude: -122.4194 },
    pickup: { latitude: 37.7849, longitude: -122.4094 },
    dropoff: { latitude: 37.7649, longitude: -122.4294 }
  };
  
  // Simulate driver movement
  useEffect(() => {
    if (isMockModeEnabled) {
      // Initialize driver location
      setDriverLocation(defaultLocations.driver);
      
      // Update driver location every 5 seconds
      const interval = setInterval(() => {
        setDriverLocation(prev => {
          if (!prev) return defaultLocations.driver;
          
          // Move driver closer to pickup location
          const moveTowards = (prev.latitude < defaultLocations.pickup.latitude) ? 
            { ...prev, latitude: prev.latitude + 0.0005 } : 
            { ...prev, longitude: prev.longitude + 0.0005 };
            
          return moveTowards;
        });
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isMockModeEnabled]);

  // Get current driver location
  const getDriverLocation = () => {
    return driverLocation || defaultLocations.driver;
  };

  // Generate a mock ride
  const getMockRide = () => {
    const driver = createDriver(
      generateSimpleId('driver'),
      'John Smith',
      '+1-555-123-4567',
      'Toyota Camry',
      'ABC123',
      4.8
    );

    const ride = createRide(
      generateSimpleId('ride'),
      '123 Main St',
      '456 Market St',
      new Date(),
      RideStatus.DRIVER_ARRIVING,
      driver,
      'user123'
    );
    
    // Add location data for the map
    ride.pickupCoordinates = defaultLocations.pickup;
    ride.dropoffCoordinates = defaultLocations.dropoff;
    
    return ride;
  };

  // Mock responses for the chatbot
  const getMockResponses = () => [
    'I understand your concern. Let me check that for you.',
    'Thank you for reporting this issue. We\'ll look into it right away.',
    'Your driver has been notified about your concern.',
    'I\'ve updated your account with this information.',
    'Is there anything else I can help you with today?',
    'We apologize for the inconvenience. Would you like me to request a different driver?',
    'I\'ve issued a partial refund for this ride due to the delay.',
    'The system shows your driver should arrive in approximately 5 minutes.'
  ];

  return (
    <MockModeContext.Provider 
      value={{ 
        isMockModeEnabled, 
        setMockModeEnabled,
        getMockRide,
        getMockResponses,
        getDriverLocation
      }}
    >
      {children}
    </MockModeContext.Provider>
  );
}

/**
 * Custom hook to use the mock mode context
 */
export function useMockMode() {
  return useContext(MockModeContext);
} 