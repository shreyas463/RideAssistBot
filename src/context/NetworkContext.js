import React, { createContext, useState, useContext, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

// Create context
const NetworkContext = createContext({
  isConnected: true,
  checkConnection: () => {}
});

/**
 * Network provider component to track network connectivity
 */
export function NetworkProvider({ children }) {
  const [isConnected, setIsConnected] = useState(true);

  // Set up network listener
  useEffect(() => {
    // Initial check
    checkConnection();
    
    // Set up listener
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // Clean up listener
    return () => unsubscribe();
  }, []);

  // Function to manually check connection
  const checkConnection = async () => {
    try {
      const state = await NetInfo.fetch();
      setIsConnected(state.isConnected);
    } catch (error) {
      console.error('Error checking network connection:', error);
      // Default to connected if there's an error checking
      setIsConnected(true);
    }
  };

  return (
    <NetworkContext.Provider value={{ isConnected, checkConnection }}>
      {children}
    </NetworkContext.Provider>
  );
}

/**
 * Custom hook to use the network context
 */
export function useNetwork() {
  return useContext(NetworkContext);
} 