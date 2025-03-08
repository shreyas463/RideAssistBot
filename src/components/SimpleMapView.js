import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

/**
 * A simplified map component for testing
 */
const SimpleMapView = () => {
  // Default to San Francisco
  const defaultLocation = {
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map Test</Text>
      <MapView
        style={styles.map}
        initialRegion={defaultLocation}
      >
        <Marker
          coordinate={{
            latitude: defaultLocation.latitude,
            longitude: defaultLocation.longitude,
          }}
          title="San Francisco"
          description="Test Location"
        />
      </MapView>
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
  title: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 5,
    borderRadius: 5,
  },
});

export default SimpleMapView; 