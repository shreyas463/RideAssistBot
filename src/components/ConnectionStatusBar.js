import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNetwork } from '../context/NetworkContext';

/**
 * Component to display network connection status
 * 
 * @returns {JSX.Element|null} The rendered component or null if connected
 */
export default function ConnectionStatusBar() {
  const { isConnected } = useNetwork();
  
  if (isConnected) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Offline Mode</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F44336',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  }
}); 