import React, { createContext, useState, useContext } from 'react';
import { createRide, createDriver, RideStatus } from '../models/Ride';
import { v4 as uuidv4 } from 'uuid';

// Create context
const MockModeContext = createContext({
  isMockModeEnabled: true,
  setMockModeEnabled: () => {},
  getMockRide: () => {},
  getMockResponses: () => []
});

/**
 * Mock mode provider component
 */
export function MockModeProvider({ children }) {
  const [isMockModeEnabled, setMockModeEnabled] = useState(true);

  // Generate a mock ride
  const getMockRide = () => {
    const driver = createDriver(
      'driver-' + uuidv4().substring(0, 8),
      'John Smith',
      '+1-555-123-4567',
      'Toyota Camry',
      'ABC123',
      4.8
    );

    return createRide(
      'ride-' + uuidv4().substring(0, 8),
      '123 Main St',
      '456 Market St',
      new Date(),
      RideStatus.DRIVER_ARRIVING,
      driver,
      'user123'
    );
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
        getMockResponses
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