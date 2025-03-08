import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { Avatar } from 'react-native-paper';
import { getPlaceholderImage } from '../utils/AssetUtils';
import { useMockMode } from '../context/MockModeContext';
import { useLocation } from '../context/LocationContext';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

/**
 * Component to display a map with the driver's location and route
 * 
 * @param {Object} props - Component props
 * @param {Object} props.ride - The ride object
 * @returns {JSX.Element} The rendered component
 */
const RideMapView = ({ ride }) => {
  const { getDriverLocation } = useMockMode();
  const { userLocation } = useLocation();
  
  // Default to San Francisco if no locations provided
  const defaultLocation = {
    latitude: 37.7749,
    longitude: -122.4194,
  };

  // Use coordinates from ride object if available, otherwise use defaults
  const [pickupCoords, setPickupCoords] = useState(
    ride?.pickupCoordinates || {
      latitude: defaultLocation.latitude - 0.01,
      longitude: defaultLocation.longitude - 0.01,
    }
  );

  const [dropoffCoords, setDropoffCoords] = useState(
    ride?.dropoffCoordinates || {
      latitude: defaultLocation.latitude + 0.01,
      longitude: defaultLocation.longitude + 0.01,
    }
  );

  const [currentDriverLocation, setCurrentDriverLocation] = useState(
    getDriverLocation() || {
      latitude: defaultLocation.latitude - 0.02,
      longitude: defaultLocation.longitude - 0.02,
    }
  );

  // Update driver location when it changes
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const newLocation = getDriverLocation();
        if (newLocation) {
          setCurrentDriverLocation(newLocation);
        }
      } catch (error) {
        console.error('Error updating driver location:', error);
        // Continue with existing location
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [getDriverLocation]);

  // Calculate the region to display on the map
  const getMapRegion = () => {
    try {
      // Include user location in the points if available
      const points = [
        pickupCoords, 
        dropoffCoords, 
        currentDriverLocation,
        ...(userLocation ? [userLocation] : [])
      ];
      
      // Find min and max lat/lng to ensure all points are visible
      let minLat = Math.min(...points.map(p => p.latitude));
      let maxLat = Math.max(...points.map(p => p.latitude));
      let minLng = Math.min(...points.map(p => p.longitude));
      let maxLng = Math.max(...points.map(p => p.longitude));
      
      // Add some padding
      const paddingFactor = 0.2;
      const latDelta = (maxLat - minLat) * (1 + paddingFactor);
      const lngDelta = (maxLng - minLng) * (1 + paddingFactor);
      
      return {
        latitude: (minLat + maxLat) / 2,
        longitude: (minLng + maxLng) / 2,
        latitudeDelta: Math.max(latDelta, LATITUDE_DELTA),
        longitudeDelta: Math.max(lngDelta, LONGITUDE_DELTA),
      };
    } catch (error) {
      console.error('Error calculating map region:', error);
      // Return default region centered on San Francisco
      return {
        latitude: defaultLocation.latitude,
        longitude: defaultLocation.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
    }
  };

  // Calculate ETA based on distance
  const calculateETA = () => {
    try {
      // Simple distance-based calculation (would be more sophisticated in a real app)
      const distance = getDistanceFromLatLonInKm(
        currentDriverLocation.latitude,
        currentDriverLocation.longitude,
        pickupCoords.latitude,
        pickupCoords.longitude
      );
      
      // Assume average speed of 30 km/h
      const timeInMinutes = Math.round((distance / 30) * 60);
      return timeInMinutes <= 1 ? 'Arriving now' : `${timeInMinutes} min`;
    } catch (error) {
      console.error('Error calculating ETA:', error);
      return 'Calculating...';
    }
  };

  // Calculate distance between two points using Haversine formula
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    try {
      const R = 6371; // Radius of the earth in km
      const dLat = deg2rad(lat2 - lat1);
      const dLon = deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in km
    } catch (error) {
      console.error('Error calculating distance:', error);
      return 0;
    }
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={getMapRegion()}
      >
        {/* Driver Marker */}
        <Marker
          coordinate={currentDriverLocation}
          title={ride?.driver?.name || 'Driver'}
          description={`ETA: ${calculateETA()}`}
        >
          <Avatar.Image 
            size={40} 
            source={{ uri: ride?.driver?.photoUrl || getPlaceholderImage('DRIVER') }} 
          />
        </Marker>

        {/* User Location Marker (if available) */}
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="You"
            pinColor="blue"
          >
            <Avatar.Image 
              size={30} 
              source={{ uri: getPlaceholderImage('USER') }} 
            />
          </Marker>
        )}

        {/* Pickup Location Marker */}
        <Marker
          coordinate={pickupCoords}
          title="Pickup"
          description={ride?.pickupLocation || 'Pickup Location'}
          pinColor="green"
        />

        {/* Dropoff Location Marker */}
        <Marker
          coordinate={dropoffCoords}
          title="Dropoff"
          description={ride?.dropoffLocation || 'Dropoff Location'}
          pinColor="red"
        />

        {/* Route from driver to pickup */}
        <Polyline
          coordinates={[currentDriverLocation, pickupCoords]}
          strokeColor="#4285F4"
          strokeWidth={3}
          lineDashPattern={[1, 3]}
        />

        {/* Route from pickup to dropoff */}
        <Polyline
          coordinates={[pickupCoords, dropoffCoords]}
          strokeColor="#4285F4"
          strokeWidth={3}
        />
      </MapView>

      <View style={styles.etaContainer}>
        <Text style={styles.etaText}>
          Driver ETA: {calculateETA()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 8,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  etaContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  etaText: {
    fontWeight: 'bold',
    color: '#4285F4',
  },
});

export default RideMapView; 