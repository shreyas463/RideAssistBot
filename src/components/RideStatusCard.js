import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Title, Paragraph, Button, useTheme, Avatar, IconButton } from 'react-native-paper';
import { getRideStatusText } from '../models/Ride';
import { getPlaceholderImage } from '../utils/AssetUtils';
import SimpleMapView from './SimpleMapView';

/**
 * Component to display ride status information
 * 
 * @param {Object} props - Component props
 * @param {Object} props.ride - The ride object to display
 * @param {Function} props.onViewDetails - Function to call when view details is pressed
 * @returns {JSX.Element} The rendered component
 */
export default function RideStatusCard({ ride, onViewDetails }) {
  const theme = useTheme();
  const [showMap, setShowMap] = useState(false);
  
  if (!ride) {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Title>Ride Status</Title>
          <Paragraph>No active rides</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button disabled>View Details</Button>
        </Card.Actions>
      </Card>
    );
  }
  
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.headerContainer}>
          <Title>Ride Status</Title>
          <IconButton
            icon={showMap ? "map-marker-off" : "map-marker"}
            size={24}
            onPress={() => setShowMap(!showMap)}
            color={theme.colors.primary}
          />
        </View>
        <Paragraph style={styles.statusText}>{getRideStatusText(ride.status)}</Paragraph>
        
        {showMap && (
          <SimpleMapView />
        )}
        
        <View style={styles.driverContainer}>
          {ride.driver && (
            <Avatar.Image 
              size={50} 
              source={{ uri: ride.driver.photoUrl || getPlaceholderImage('DRIVER') }} 
              style={styles.driverAvatar}
            />
          )}
          <View style={styles.detailsContainer}>
            <Paragraph>
              <Paragraph style={styles.label}>Driver: </Paragraph>
              {ride.driver ? ride.driver.name : 'Not assigned'}
            </Paragraph>
            <Paragraph>
              <Paragraph style={styles.label}>Pickup: </Paragraph>
              {ride.pickupLocation}
            </Paragraph>
            <Paragraph>
              <Paragraph style={styles.label}>Dropoff: </Paragraph>
              {ride.dropoffLocation}
            </Paragraph>
          </View>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button 
          mode="text" 
          onPress={onViewDetails}
          color={theme.colors.primary}
        >
          View Details
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 4
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  statusText: {
    fontWeight: 'bold',
    marginVertical: 8
  },
  driverContainer: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center'
  },
  driverAvatar: {
    marginRight: 16
  },
  detailsContainer: {
    flex: 1
  },
  label: {
    fontWeight: 'bold'
  }
}); 