import * as Location from 'expo-location';

/**
 * Service for handling location-related functionality
 */

/**
 * Request location permissions from the user
 * 
 * @returns {Promise<boolean>} Whether permissions were granted
 */
export const requestLocationPermissions = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting location permissions:', error);
    return false;
  }
};

/**
 * Get the current location of the device
 * 
 * @returns {Promise<Object|null>} The current location or null if unavailable
 */
export const getCurrentLocation = async () => {
  try {
    const hasPermission = await requestLocationPermissions();
    
    if (!hasPermission) {
      console.log('Location permission not granted');
      return null;
    }
    
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error('Error getting current location:', error);
    return null;
  }
};

/**
 * Start watching the user's location with updates
 * 
 * @param {Function} callback - Function to call with location updates
 * @returns {Promise<Object|null>} The location watcher or null if unavailable
 */
export const startLocationUpdates = async (callback) => {
  try {
    const hasPermission = await requestLocationPermissions();
    
    if (!hasPermission) {
      console.log('Location permission not granted');
      return null;
    }
    
    // Start watching position
    const watcher = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Balanced,
        distanceInterval: 10, // minimum change (in meters) to trigger update
        timeInterval: 5000,   // minimum time (in ms) between updates
      },
      (location) => {
        callback({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    );
    
    return watcher;
  } catch (error) {
    console.error('Error starting location updates:', error);
    return null;
  }
};

/**
 * Stop watching the user's location
 * 
 * @param {Object} watcher - The location watcher to stop
 */
export const stopLocationUpdates = (watcher) => {
  if (watcher) {
    watcher.remove();
  }
}; 