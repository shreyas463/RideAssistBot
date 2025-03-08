import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import * as LocationService from '../services/LocationService';
import { useMockMode } from './MockModeContext';

// Create context
const LocationContext = createContext({
  userLocation: null,
  isTrackingLocation: false,
  startTracking: () => {},
  stopTracking: () => {},
  hasLocationPermission: false
});

/**
 * Location provider component
 */
export function LocationProvider({ children }) {
  const [userLocation, setUserLocation] = useState(null);
  const [isTrackingLocation, setIsTrackingLocation] = useState(false);
  const [locationWatcher, setLocationWatcher] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const { isMockModeEnabled } = useMockMode();

  // Check for location permissions on mount
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const hasPermission = await LocationService.requestLocationPermissions();
        setHasLocationPermission(hasPermission);
        
        if (!hasPermission && !isMockModeEnabled) {
          Alert.alert(
            'Location Permission Required',
            'RideAssistBot needs access to your location to provide accurate ride tracking.',
            [{ text: 'OK' }]
          );
        }
      } catch (error) {
        console.error('Error checking location permissions:', error);
        // In case of error, default to mock mode behavior
        setHasLocationPermission(false);
      }
    };
    
    checkPermissions();
  }, [isMockModeEnabled]);

  // Get initial location
  useEffect(() => {
    if (hasLocationPermission && !isMockModeEnabled) {
      const getInitialLocation = async () => {
        try {
          const location = await LocationService.getCurrentLocation();
          if (location) {
            setUserLocation(location);
          }
        } catch (error) {
          console.error('Error getting initial location:', error);
          // Fail gracefully
        }
      };
      
      getInitialLocation();
    }
  }, [hasLocationPermission, isMockModeEnabled]);

  // Start tracking location
  const startTracking = async () => {
    if (isMockModeEnabled) {
      // In mock mode, we don't need to track real location
      setIsTrackingLocation(true);
      return;
    }
    
    if (locationWatcher) {
      // Already tracking
      return;
    }
    
    try {
      const watcher = await LocationService.startLocationUpdates((location) => {
        setUserLocation(location);
      });
      
      if (watcher) {
        setLocationWatcher(watcher);
        setIsTrackingLocation(true);
      }
    } catch (error) {
      console.error('Error starting location tracking:', error);
      // Fail gracefully
      setIsTrackingLocation(false);
    }
  };

  // Stop tracking location
  const stopTracking = () => {
    try {
      if (locationWatcher) {
        LocationService.stopLocationUpdates(locationWatcher);
        setLocationWatcher(null);
      }
      
      setIsTrackingLocation(false);
    } catch (error) {
      console.error('Error stopping location tracking:', error);
      // Ensure we reset state even if there's an error
      setLocationWatcher(null);
      setIsTrackingLocation(false);
    }
  };

  return (
    <LocationContext.Provider 
      value={{ 
        userLocation,
        isTrackingLocation,
        startTracking,
        stopTracking,
        hasLocationPermission
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

/**
 * Custom hook to use the location context
 */
export function useLocation() {
  return useContext(LocationContext);
} 